import ProductCollection from "@/components/Product/ProductCollection";
import { getMostPopularProducts } from "@/lib/queries/product/getMostPopularProducts";
import { getNewestProducts } from "@/lib/queries/product/getNewestProducts";

export default function HomePage() {
  return (
    <main className="space-y-12">
      <ProductCollection
        title="Populaires"
        productsFetcher={getMostPopularProducts}
      />
      <ProductCollection 
        title="Nouveaux" 
        productsFetcher={getNewestProducts} 
      />
    </main>
  )
}

// Affiche la section des produits populaires
// Affiche aussi la section des produits nouveaux