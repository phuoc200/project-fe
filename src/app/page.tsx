import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Layout from "./components/layout";
import { HeroCarousel } from "./components/hero-carousel";
import { TestimonialsCarousel } from "./components/testimonials-carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const featuredProducts = [
  {
    id: 1,
    name: "BodyTrace Blood Pressure Monitor (BT106)",
    brand: "BodyTrace",
    price: 2327808,
    originalPrice: 2586453,
    discount: 10,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-18%20at%2004.12.04-OGPeuodkzcnG49loBCTvbUW1f9UwNH.png",
  },
  {
    id: 2,
    name: "Smart Meter iBloodPressure Blood Pressure Monitor (SMBP802)",
    brand: "Smart Meter",
    price: 3258673,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-18%20at%2004.12.04-OGPeuodkzcnG49loBCTvbUW1f9UwNH.png",
  },
  {
    id: 3,
    name: "Smart Meter iGlucose Blood Glucose Monitoring System (GM291)",
    brand: "Smart Meter",
    price: 2560589,
    originalPrice: 3983133,
    discount: 36,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-18%20at%2004.12.04-OGPeuodkzcnG49loBCTvbUW1f9UwNH.png",
  },
  {
    id: 4,
    name: "Transtek TeleRPM 4G Blood Pressure Monitor Gen 2",
    brand: "Transtek MioConnect",
    price: 2276079,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-18%20at%2004.12.04-OGPeuodkzcnG49loBCTvbUW1f9UwNH.png",
  },
];

const upcomingActivities = [
  {
    id: 1,
    title: "Free Health Check-up Camp",
    date: "June 15, 2025",
    image: "/placeholder.svg?height=200&width=300",
    description:
      "Comprehensive health screening including blood pressure, glucose, and BMI measurements.",
  },
  {
    id: 2,
    title: "Medical Equipment Training",
    date: "June 20, 2025",
    image: "/placeholder.svg?height=200&width=300",
    description:
      "Learn how to effectively use our latest medical devices for better patient care.",
  },
  {
    id: 3,
    title: "Healthcare Technology Seminar",
    date: "June 25, 2025",
    image: "/placeholder.svg?height=200&width=300",
    description:
      "Discover the latest innovations in medical technology and their applications.",
  },
];

const educationalResources = [
  {
    id: 1,
    title: "Patient Education",
    description:
      "Access comprehensive guides and materials for better health management.",
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    title: "Medical Training",
    description: "Professional development resources for healthcare providers.",
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    title: "Research Papers",
    description: "Latest medical research and clinical studies.",
    icon: "/placeholder.svg?height=40&width=40",
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function HomePage() {
  return (
    <Layout>
      <HeroCarousel />

      {/* Introduction Section */}
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

      {/* Featured Products */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="relative rounded-lg shadow-sm p-4"
              >
                {product.discount && (
                  <div className="absolute top-2 left-2 bg-[#BA0C2F] text-white text-xs font-bold px-2 py-1 rounded">
                    Up to {product.discount}% off!
                  </div>
                )}
                <Link href={`/products/${product.id}`}>
                  <div className="aspect-[291/400] mb-4 bg-gray-100 rounded-lg p-4">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={291}
                      height={400}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
                  <h3 className="font-medium mb-2 line-clamp-2 hover:text-blue-600">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-semibold">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </Link>
                <Button className="w-full bg-black hover:bg-gray-800">
                  Add to cart
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsCarousel />

      {/* Educational Resources */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Educational Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {educationalResources.map((resource) => (
              <Card key={resource.id}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src={resource.icon || "/placeholder.svg"}
                      alt={resource.title}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <CardTitle>{resource.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{resource.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Activities */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Upcoming Activities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingActivities.map((activity) => (
              <Card key={activity.id}>
                <div className="relative h-48 mb-4">
                  <Image
                    src={activity.image || "/placeholder.svg"}
                    alt={activity.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{activity.title}</CardTitle>
                  <p className="text-blue-600">{activity.date}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{activity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
