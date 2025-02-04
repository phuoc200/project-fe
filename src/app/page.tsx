import Layout from "./components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const upcomingActivities = [
    { id: 1, title: "Free Health Check-up Camp", date: "June 15, 2025" },
    { id: 2, title: "Seminar on Heart Health", date: "June 20, 2025" },
    { id: 3, title: "Blood Donation Drive", date: "June 25, 2025" },
  ];

  const newMachines = [
    {
      id: 1,
      name: "Advanced MRI Scanner",
      image:
        "https://i.fbcd.co/products/resized/resized-750-500/d44f3da6560418087428482b656a48a65e1b903e453745bcffca3dc4564d01a6.jpg",
    },
    {
      id: 2,
      name: "Robotic Surgery System",
      image:
        "https://www.medicaldevice-network.com/wp-content/uploads/sites/23/2020/03/cmr-surgical-versius-clinical-setup-4-arms-00013-2.jpg",
    },
    {
      id: 3,
      name: "AI-powered Diagnostic Tool",
      image:
        "https://regalmed.ae/wp-content/uploads/2024/09/The-Benefits-of-Using-AI-Powered-Diagnostic-Tools.png",
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Providence Clinic
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Providing cutting-edge medical services with a focus on patient care
            and advanced technology.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newMachines.map((machine) => (
              <Card key={machine.id}>
                <CardHeader>
                  <CardTitle>{machine.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    src={machine.image || "/placeholder.svg"}
                    alt={machine.name}
                    width={200}
                    height={200}
                    className="w-full h-auto"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Upcoming Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingActivities.map((activity) => (
              <Card key={activity.id}>
                <CardHeader>
                  <CardTitle>{activity.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{activity.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/scientific" className="group">
              <Card className="transition-transform group-hover:scale-105">
                <CardHeader>
                  <CardTitle>Scientific Application</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Explore our advanced scientific equipment and research
                    facilities.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/medical" className="group">
              <Card className="transition-transform group-hover:scale-105">
                <CardHeader>
                  <CardTitle>Medical Application</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Learn about our comprehensive medical services and
                    treatments.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/educational" className="group">
              <Card className="transition-transform group-hover:scale-105">
                <CardHeader>
                  <CardTitle>Educational Application</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Discover our educational programs, seminars, and practical
                    sessions.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/business" className="group">
              <Card className="transition-transform group-hover:scale-105">
                <CardHeader>
                  <CardTitle>Business Application</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Explore business opportunities and partnerships with
                    Providence Clinic.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
