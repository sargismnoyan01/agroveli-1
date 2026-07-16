"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

import { topUpSchema } from "@/lib/validations/topUp";

import { useTopUpBalanceMutation } from "@/lib/store/services/authApi";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
export default function TopUpPage() {
  const t = useTranslations("TopUp");

  const form = useForm({
  resolver: zodResolver(topUpSchema),
  defaultValues: {
    amount: "",
  },
});

const [topUpBalance, { isLoading }] = useTopUpBalanceMutation();

const onSubmit = async (data) => {
  try {
    const result = await topUpBalance({
      amount: Number(data.amount),
    }).unwrap();

   if (result?.url) {
  window.location.href = result.url;
} else {
  toast.error(t("failed"));
}
  } catch (error) {
  console.error(error);
  toast.error(t("failed"));
}
};

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.12)] bg-card p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          {t("title")}
        </h1>

        <p className="text-center text-muted-foreground mb-8">
          {t("description")}
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("amount")}</FormLabel>

        <FormControl>
  <div className="relative">
    <Input
    autoFocus
      type="number"
      placeholder={t("placeholder")}
    //   min={1}
    //   max={10000}
      step="0.01"
      className="pr-12"
      {...field}
    />

    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
      ₾
    </span>
  </div>
</FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

<Button
  type="submit"
  disabled={isLoading}
  className="w-full bg-[#0F6A4F] hover:bg-[#0d5a44] text-white"
>
  {isLoading ? (
    <>
      <Loader2 className="h-4 w-4 animate-spin" />
      {t("processing")}
    </>
  ) : (
    t("button")
  )}
</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}