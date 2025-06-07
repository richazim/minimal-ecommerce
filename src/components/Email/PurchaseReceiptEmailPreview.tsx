import PurchaseReceiptEmail from "./PurchaseReceiptEmail"

const previewProps = {
  product: {
    name: "Product name",
    description: "Some description",
    imagePath:
      "/products/5aba7442-e4a5-4d2e-bfa7-5bd358cdad64-02 - What Is Next.js.jpg",
  },
  order: {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    pricePaidInCents: 10000,
  },
  downloadVerificationId: crypto.randomUUID(),
}

export default function Preview() {
  return <PurchaseReceiptEmail {...previewProps} />
}

