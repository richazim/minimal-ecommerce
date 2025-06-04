import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

export default async function AsyncProductList({
    productsFetcher,
  }: {
    productsFetcher: () => Promise<Product[]>;
  }) {
    const products = await productsFetcher();
    console.log(products)
  
    return (
      <>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </>
    );
  }
  