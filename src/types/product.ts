export type Product = {
    id: string;
    name: string;
    priceInCents: number;
    filePath: string;
    imagePath: string;
    description: string;
    isAvailableForPurchase: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export type ProductCollectionProps = {
    title: string;
    productsFetcher: () => Promise<Product[]>;
};

export type ProductCardProps = {
    id: string
    name: string
    priceInCents: number
    description: string
    imagePath: string
  }