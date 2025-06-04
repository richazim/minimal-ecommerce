"use server"
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import { sleep } from "@/lib/utils/sleep";

export default async function AsyncProductList({
    productsFetcher,
  }: {
    productsFetcher: () => Promise<Product[]>;
  }) {

    const products = await productsFetcher()
    await sleep(2000) // Pour faire lancer les composants de suspense pendant 2 secondes
    

    return (
      <>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </>
    );
  }
  