import { PageHeader } from "@/app/admin/_components/PageHeader";
import { ProductForm } from "@/app/admin/_components/Product/ProductForm";

export default function NewProductPage() {
  return (
    <>
      <PageHeader>Add Product</PageHeader>
      <ProductForm />
    </>
  )
}
