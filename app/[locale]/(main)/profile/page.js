// import { redirect } from "next/navigation"

// export default function ProfilePage() {
//   redirect("/profile/products")
// }


import { redirect } from "next/navigation";

export default async function ProfilePage({ searchParams }) {
  const params = await searchParams;

  const query = new URLSearchParams();

  if (params?.payment) {
    query.set("payment", params.payment);
  }

  if (params?.order_id) {
    query.set("order_id", params.order_id);
  }

  if (params?.amount) {
    query.set("amount", params.amount);
  }

  if (params?.currency) {
    query.set("currency", params.currency);
  }

  const queryString = query.toString();

  redirect(
    `/profile/products${queryString ? `?${queryString}` : ""}`
  );
}