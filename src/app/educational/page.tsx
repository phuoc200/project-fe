import Layout from "../components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const educationalActivities = [
  {
    id: 1,
    type: "Seminar",
    title: "Advances in Cardiology",
    date: "July 15, 2025",
    time: "10:00 AM - 12:00 PM",
  },
  {
    id: 2,
    type: "Practical",
    title: "Basic Life Support Training",
    date: "July 20, 2025",
    time: "2:00 PM - 5:00 PM",
  },
  {
    id: 3,
    type: "Lecture",
    title: "Understanding Diabetes Management",
    date: "July 25, 2025",
    time: "11:00 AM - 1:00 PM",
  },
  {
    id: 4,
    type: "Workshop",
    title: "Medical Ethics and Patient Care",
    date: "August 1, 2025",
    time: "9:00 AM - 4:00 PM",
  },
];

const staffMembers = [
  {
    id: 1,
    name: "Dr. Jane Smith",
    specialization: "Cardiology",
    experience: "15 years",
  },
  {
    id: 2,
    name: "Dr. John Doe",
    specialization: "Endocrinology",
    experience: "12 years",
  },
  {
    id: 3,
    name: "Dr. Emily Brown",
    specialization: "Neurology",
    experience: "10 years",
  },
  {
    id: 4,
    name: "Dr. Michael Lee",
    specialization: "Pediatrics",
    experience: "8 years",
  },
];

export default function EducationalPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Educational Application</h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover our educational programs, seminars, and practical sessions
          designed to enhance medical knowledge and skills.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            Upcoming Educational Activities
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {educationalActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.type}</TableCell>
                  <TableCell>{activity.title}</TableCell>
                  <TableCell>{activity.date}</TableCell>
                  <TableCell>{activity.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Our Staff</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staffMembers.map((staff) => (
              <Card key={staff.id}>
                <CardHeader>
                  <CardTitle>{staff.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Specialization: {staff.specialization}
                  </p>
                  <p className="text-gray-600">
                    Experience: {staff.experience}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
