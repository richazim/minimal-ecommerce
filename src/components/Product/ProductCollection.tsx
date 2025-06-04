import { ProductCollectionProps } from "@/types/product";
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import AsyncProductList from "./AsyncProductList";


function ProductCollection({
  productsFetcher,
  title,
}: ProductCollectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button variant="outline" asChild>
          <Link href="/products" className="space-x-2">
            <span>View All</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <AsyncProductList productsFetcher={productsFetcher} />
        </Suspense>
      </div>
    </div>
  );
}

export default ProductCollection;