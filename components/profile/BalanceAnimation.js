"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useDispatch } from "react-redux";
import {
  authApi,
  useGetProfileQuery,
  useLazyFlittPaymentSuccessQuery,
} from "@/lib/store/services/authApi";
import styles from "./BalanceAnimation.module.css";

export const BALANCE_CREDITED_EVENT = "agroveli-balance-credited";

const PENDING_KEY = "pendingBalancePayment";
const TARGET_SELECTOR = "[data-profile-balance]";
const SMALL_COIN_COUNT = 9;

const COIN_BURSTS = Array.from({ length: SMALL_COIN_COUNT }, (_, index) => {
  const angle = (index / SMALL_COIN_COUNT) * Math.PI * 2 - Math.PI / 2;
  const distance = 82 + (index % 3) * 16;
  return {
    x: `${Math.round(Math.cos(angle) * distance)}px`,
    y: `${Math.round(Math.sin(angle) * distance)}px`,
  };
});

function readPending() {
  try {
    return JSON.parse(sessionStorage.getItem(PENDING_KEY) || "null");
  } catch {
    return null;
  }
}

function getOrderId(searchParams) {
  return (
    searchParams.get("order_id") ||
    searchParams.get("orderId") ||
    searchParams.get("orderid") ||
    ""
  );
}

function getPaymentStatus(searchParams) {
  return (
    searchParams.get("payment") ||
    searchParams.get("status") ||
    ""
  ).toLowerCase();
}

function isCancelReturn(searchParams) {
  return ["cancel", "fail", "failure", "declined", "error"].includes(
    getPaymentStatus(searchParams)
  );
}

function isReturnFromTopUp(searchParams) {
  if (isCancelReturn(searchParams)) return false;
  if (getPaymentStatus(searchParams) === "success") return true;
  if (getOrderId(searchParams)) return true;
  return false;
}

function getTopUpAmount(searchParams) {
  const fromUrl = Number(searchParams.get("amount"));
  if (fromUrl > 0) return fromUrl;

  const fromPending = Number(readPending()?.amount);
  return fromPending > 0 ? fromPending : 0;
}

function formatAmount(amount) {
  const value = Number(amount);
  if (!value || !Number.isFinite(value)) return "₾";
  const formatted = Number.isInteger(value)
    ? String(value)
    : value.toFixed(2);
  return `+${formatted} ₾`;
}

function getVisibleBalance() {
  return [...document.querySelectorAll(TARGET_SELECTOR)].find((el) => {
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  });
}

function getTargetPoint() {
  const target = getVisibleBalance();
  if (!target) return { x: "160px", y: "220px" };
  const rect = target.getBoundingClientRect();
  return {
    x: `${Math.round(rect.left + rect.width / 2)}px`,
    y: `${Math.round(rect.top + rect.height / 2)}px`,
  };
}

export default function BalanceAnimation() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { data: profile, isSuccess: profileReady, isFetching } =
    useGetProfileQuery();
  const [confirmSuccess] = useLazyFlittPaymentSuccessQuery();

  const [playing, setPlaying] = useState(false);
  const [amount, setAmount] = useState(0);
  const [target, setTarget] = useState({ x: "50%", y: "50%" });
  const playingRef = useRef(false);
  const completedRef = useRef(false);
  const confirmedOrderRef = useRef("");

  useEffect(() => {
    if (!isReturnFromTopUp(searchParams)) return;
    if (pathname.startsWith("/profile")) return;

    const next = new URLSearchParams();
    const orderId = getOrderId(searchParams);
    const status = getPaymentStatus(searchParams) || "success";
    const topUpAmount = getTopUpAmount(searchParams);

    next.set("payment", status);
    if (orderId) next.set("order_id", orderId);
    if (topUpAmount) next.set("amount", String(topUpAmount));

    router.replace(`/profile/products?${next.toString()}`);
  }, [pathname, searchParams, router]);

  useEffect(() => {
    const orderId = getOrderId(searchParams);
    if (!orderId || isCancelReturn(searchParams)) return;
    if (confirmedOrderRef.current === orderId) return;
    confirmedOrderRef.current = orderId;
    confirmSuccess(orderId);
  }, [searchParams, confirmSuccess]);

  useEffect(() => {
    if (playingRef.current || completedRef.current) return;
    if (!pathname.startsWith("/profile")) return;
    if (!isReturnFromTopUp(searchParams)) return;
    if (!profileReady || isFetching || !profile) return;

    const topUpAmount = getTopUpAmount(searchParams);
    if (!topUpAmount) return;

    let cancelled = false;
    let startTimer;
    let tries = 0;

    const timer = window.setInterval(() => {
      if (cancelled) {
        window.clearInterval(timer);
        return;
      }

      tries += 1;
      if (!getVisibleBalance()) {
        if (tries >= 150) window.clearInterval(timer);
        return;
      }

      window.clearInterval(timer);
      startTimer = window.setTimeout(() => {
        if (cancelled || playingRef.current || completedRef.current) return;
        playingRef.current = true;
        setAmount(topUpAmount);
        setTarget(getTargetPoint());
        setPlaying(true);
      }, 250);
    }, 100);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      if (startTimer) window.clearTimeout(startTimer);
    };
  }, [pathname, searchParams, profileReady, isFetching, profile]);

  useEffect(() => {
    if (!playing) return;

    const finish = () => {
      if (completedRef.current) return;
      completedRef.current = true;

      const pending = readPending();
      const topUpAmount = Number(pending?.amount) || amount;
      const balanceBefore = Number(
        pending?.balanceBefore ?? profile?.info?.coin ?? 0
      );

      const balance = getVisibleBalance();
      if (balance) {
        balance.classList.add(styles.balancePulse);
        window.setTimeout(() => {
          balance.classList.remove(styles.balancePulse);
        }, 700);
      }

      window.dispatchEvent(
        new CustomEvent(BALANCE_CREDITED_EVENT, {
          detail: { coin: balanceBefore + topUpAmount },
        })
      );

      dispatch(authApi.util.invalidateTags(["User"]));
      sessionStorage.removeItem(PENDING_KEY);
      playingRef.current = false;
      setPlaying(false);
      router.replace(pathname, { scroll: false });
    };

    const timeout = window.setTimeout(finish, 2700);
    return () => window.clearTimeout(timeout);
  }, [playing, amount, profile, dispatch, router, pathname]);

  if (!playing) return null;

  return (
    <div className={styles.layer} aria-hidden="true">
      <div className={styles.bigCoin}>
        <div className={styles.rim}>
          <div className={styles.face}>
            <span className={styles.amount}>{formatAmount(amount)}</span>
          </div>
        </div>
      </div>

      {COIN_BURSTS.map((burst, index) => (
        <div
          key={index}
          className={styles.smallCoin}
          style={{
            "--bx": burst.x,
            "--by": burst.y,
            "--tx": target.x,
            "--ty": target.y,
            "--delay": `${1.15 + index * 0.04}s`,
          }}
        >
          <div className={styles.rim}>
            <div className={styles.face}>₾</div>
          </div>
        </div>
      ))}
    </div>
  );
}
