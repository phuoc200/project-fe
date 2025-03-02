"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import Layout from "./components/layout";
import { HeroCarousel } from "./components/hero-carousel";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { ProductGrid } from "./components/product-grid";
import { useProduct } from "@/hooks/use-products";

const educationalResources = [
  {
    id: 1,
    title: "Patient Education",
    description:
      "Access comprehensive guides and materials for better health management.",
    image:
      "https://guidewaycare.com/wp-content/themes/yootheme/cache/a0/the-importance-of-patient-engagement-and-education-a0f83947.jpeg",
    date: "MARCH 1, 2025",
    author: "ADMIN",
    comments: 3,
  },
  {
    id: 2,
    title: "Medical Training",
    description: "Professional development resources for healthcare providers.",
    image:
      "https://d2qr5s4kv79wo3.cloudfront.net/wp-content/uploads/2022/12/Importance-of-Medical-Training-Equipment-22-Dec.jpg",
    date: "MARCH 1, 2025",
    author: "ADMIN",
    comments: 3,
  },
  {
    id: 3,
    title: "Research Papers",
    description: "Latest medical research and clinical studies.",
    image:
      "https://www.gammacompliance.com/media/wysiwyg/Blog/GammaComplianceSolutions-109687-Training-Medical-Staff-Blogbanner1.jpg",
    date: "MARCH 1, 2025",
    author: "ADMIN",
    comments: 3,
  },
];

export default function HomePage() {
  const { products, loading, error, fetchProducts } = useProduct();

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <Layout>
      <HeroCarousel />
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">
            Welcome to Providence Clinic
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Providence Clinic is your trusted partner in healthcare technology.
            We provide cutting-edge medical equipment and comprehensive
            healthcare solutions to improve patient care and clinical outcomes.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">LTE Devices</h2>
              <p className="text-gray-600 mt-2">
                Get our app FREE for a year with any LTE device
              </p>
            </div>
            <Link
              href="/products"
              className="text-[#2A2B2A] hover:underline flex items-center gap-2"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <ProductGrid products={products.slice(0, 4)} viewType="grid" />
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Educational Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {educationalResources.map((resource) => (
              <div key={resource.id} className="group">
                <Link href={`/blog/${resource.id}`} className="block">
                  <div className="relative mb-4">
                    <Image
                      src={resource.image || "/placeholder.svg"}
                      alt={resource.title}
                      width={400}
                      height={300}
                      className="w-full aspect-[4/3] object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{resource.date}</span>
                      <span>{resource.author}</span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {resource.comments}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600">{resource.description}</p>
                    <Button className="bg-black text-white rounded-full">
                      Read more
                    </Button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
