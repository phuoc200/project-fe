import Layout from "../components/layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

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

const doctors = [
  {
    name: "Dr. Lloyd Wilson",
    specialty: "NEUROLOGIST",
    image: "https://medipls.netlify.app/img/doc-1.jpg",
  },
  {
    name: "Dr. Rachel Parker",
    specialty: "OPHTHALMOLOGIST",
    image: "https://medipls.netlify.app/img/doc-2.jpg",
  },
  {
    name: "Dr. Ian Smith",
    specialty: "DENTIST",
    image: "https://medipls.netlify.app/img/doc-3.jpg",
  },
  {
    name: "Dr. Alicia Henderson",
    specialty: "PEDIATRICIAN",
    image: "https://medipls.netlify.app/img/doc-4.jpg",
  },
];

export default function EducationalPage() {
  return (
    <Layout>
      <div className="relative w-full h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-[#1A2B47] transition-opacity duration-1000">
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
            <h2 className="text-4xl md:text-7xl font-bold mb-4">
              Essential Skills for Educators
            </h2>
            <div>
              <CheckCircle className="w-12 h-12 mt-10 mb-8 text-white" />
            </div>
            <p className="text-xl font-semibold text-[#FED519] md:text-6xl max-w-2xl">
              Looking to the future of learning
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-12 text-center">
        <p className="text-black text-base font-semibold">
          At PROVIDENCE, we are committed to shaping the future of healthcare
          education. Our ‘Essential Skills’ courses are internationally
          recognised and are constantly being reviewed and enhanced based on
          feedback from our learners and consultation with experts from around
          the world. Read on to find out more about the educational philosophy
          behind our courses, or browse all courses to see what’s on offer.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-4 items-center ">
          <Image
            src="https://amee.org/wp-content/uploads/2024/02/Course-images.jpg"
            alt="Providence Clinic Doctors"
            width={500}
            height={400}
            className="rounded-lg"
          />
          <Image
            src="https://amee.org/wp-content/uploads/2024/08/Course-images-4-1024x576-1.jpg"
            alt="Providence Clinic Doctors"
            width={500}
            height={400}
            className="rounded-lg"
          />
        </div>
        <div className="max-w-xl font-semibold">
          <p className="text-sm">ESSENTIAL SKILLS COURSES</p>
          <h2 className="text-6xl my-4">Building on a Legacy of Excellence</h2>
          <p className="text-base leading-8 text-[#494b51] mb-6">
            For the past twenty years, PROVIDENCE’s ESME courses have offered
            participants unparalleled access to expertise and resources. ESME
            courses aim to bridge the gap between short, workshop-style training
            and formal postgraduate programmes, offering an introduction to key
            educational theories and principles that remains grounded in
            educational practice.
          </p>
          <p className="text-base leading-8 text-[#494b51] mb-6">
            What sets PROVIDENCE apart from other providers is our global
            network of educators and our ability to adapt swiftly to emerging
            trends, ensuring our courses remain relevant and impactful.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-12">
          <h2 className="text-4xl font-bold mb-6 text-center text-primary">
            Upcoming Educational Activities
          </h2>
          <div className="overflow-hidden rounded-2xl shadow-lg border border-border">
            <Table className="w-full border-collapse">
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead className="text-left p-4 text-lg">Type</TableHead>
                  <TableHead className="text-left p-4 text-lg">Title</TableHead>
                  <TableHead className="text-left p-4 text-lg">Date</TableHead>
                  <TableHead className="text-left p-4 text-lg">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {educationalActivities.map((activity, index) => (
                  <TableRow
                    key={activity.id}
                    className={
                      index % 2 === 0 ? "bg-accent/30" : "bg-background"
                    }
                  >
                    <TableCell className="p-4">{activity.type}</TableCell>
                    <TableCell className="p-4 font-medium">
                      {activity.title}
                    </TableCell>
                    <TableCell className="p-4">{activity.date}</TableCell>
                    <TableCell className="p-4">{activity.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Qualified Doctors</h1>
          <p className="text-gray-500 max-w-2xl mx-auto mb-8">
            Separated they live in. A small river named Duden flows by their
            place and supplies it with the necessary regeliaria. It is a
            paradisematic country.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {doctors.map((doctor, index) => (
              <div key={index} className="text-center">
                <div className="relative w-full h-64 mb-4">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <h2 className="text-xl font-semibold">{doctor.name}</h2>
                <p className="text-blue-600 font-bold text-sm">
                  {doctor.specialty}
                </p>
                <p className="text-gray-500 mt-2 text-sm">
                  I am an ambitious workaholic, but apart from that, pretty
                  simple person.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
