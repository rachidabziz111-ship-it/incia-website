import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import HomeSections from "@/components/HomeSections";
import { client } from "@/sanity/lib/client";

async function getProducts() {
  try {
    const query = `*[_type == "product" && targetMarket in ["wholesale", "both"]] | order(_createdAt desc)[0...4] {
      "id": _id, name, price, minOrder,
      "image": image.asset->url, description
    }`;
    return await client.fetch(query) || [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();
  return (
    <main className="min-h-screen selection:bg-[#C8A96E] selection:text-[#0a3b33]">
      <Header />
      <HeroSlider />
      <HomeSections products={products} />
    </main>
  );
}
