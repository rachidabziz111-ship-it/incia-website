import { createClient } from "next-sanity";
import Header from "@/components/Header";
import ProductsPageClient from "@/components/ProductsPageClient";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-03-09",
  useCdn: false,
});

async function getProducts() {
  try {
    const query = `*[_type == "product" && targetMarket in ["wholesale", "both"]] | order(_createdAt desc) {
      "id": _id, name, description, price, minOrder,
      "image": image.asset->url
    }`;
    return await client.fetch(query, {}, { cache: "no-store" }) || [];
  } catch {
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <>
      <Header />
      <ProductsPageClient products={products} />
    </>
  );
}
