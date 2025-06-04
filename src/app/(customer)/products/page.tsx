import AsyncProductList from "@/components/Product/AsyncProductList"
import { ProductCardSkeleton } from "@/components/Product/ProductCardSkeleton"
import { getProducts } from "@/lib/queries/product/getProducts"
import { Suspense } from "react"

export default function ProductsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Suspense
        fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }
      >
        <AsyncProductList productsFetcher={getProducts} />
      </Suspense>
    </div>
  )
}
