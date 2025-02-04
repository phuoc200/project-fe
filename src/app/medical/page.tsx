import Layout from "../components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const medicineCategories = [
  {
    id: 1,
    name: "Antibiotics",
    description: "Medicines used to treat bacterial infections",
  },
  { id: 2, name: "Analgesics", description: "Pain-relieving medications" },
  {
    id: 3,
    name: "Antihypertensives",
    description: "Medications for treating high blood pressure",
  },
  {
    id: 4,
    name: "Antidiabetics",
    description: "Medicines used to control blood sugar levels",
  },
  {
    id: 5,
    name: "Antihistamines",
    description: "Drugs used to treat allergies",
  },
  {
    id: 6,
    name: "Antidepressants",
    description: "Medications for treating depression and anxiety disorders",
  },
];

export default function MedicalPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Medical Application</h1>
        <p className="text-xl text-gray-600 mb-8">
          Explore our comprehensive range of medicines and treatments available
          at Providence Clinic.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {medicineCategories.map((category) => (
            <Card key={category.id}>
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
