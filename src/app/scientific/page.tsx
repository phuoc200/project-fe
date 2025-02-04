import Layout from "../components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const scientificEquipment = [
  {
    id: 1,
    name: "Microscope",
    description: "High-powered microscope for detailed cellular analysis",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Blood Pressure Monitor",
    description: "Advanced digital blood pressure monitoring system",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "ECG Machine",
    description: "12-lead ECG machine for comprehensive heart monitoring",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Cardiac Event Monitor",
    description: "Portable device for long-term cardiac monitoring",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Pulse Oximeter",
    description: "Non-invasive device to measure blood oxygen levels",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Medical Exam Table",
    description: "Ergonomic and adjustable examination table",
    image: "/placeholder.svg?height=200&width=200",
  },
];

export default function ScientificPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Scientific Application</h1>
        <p className="text-xl text-gray-600 mb-8">
          Explore our state-of-the-art scientific equipment used in various
          medical procedures and research.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scientificEquipment.map((equipment) => (
            <Card key={equipment.id}>
              <CardHeader>
                <CardTitle>{equipment.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src={equipment.image || "/placeholder.svg"}
                  alt={equipment.name}
                  width={200}
                  height={200}
                  className="w-full h-auto mb-4"
                />
                <p className="text-gray-600">{equipment.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
