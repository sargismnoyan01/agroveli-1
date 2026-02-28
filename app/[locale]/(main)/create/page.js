import { Suspense } from "react";
import CreateProductForm from "@/components/create/CreateProductForm";

export default function Create() {

  return(
    <Suspense fallback="">
      <CreateProductForm/>
    </Suspense>
  )
}