import Layout from "../components/layout";
import Image from "next/image";
import { TestimonialsCarousel } from "../components/testimonials-carousel";

export default function AboutPage() {
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
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">
          About Providence Clinic
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <Image
              src="https://providencemedicalgroupkc.com/wp-content/uploads/2022/04/visitr-809x675.png"
              alt="Providence Clinic Doctors"
              width={500}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-4">
              We are Providence Clinic
            </h2>
            <p className="text-base text-gray-600 mb-6">
              At Providence Clinic, we are dedicated to providing exceptional
              healthcare services to our community. Since our founding in 1990,
              we have been committed to innovation, excellence, and
              compassionate care.
            </p>
            <p className="text-base text-gray-600 mb-6">
              Our team of highly skilled doctors and medical professionals work
              tirelessly to ensure the best possible outcomes for our patients.
              We believe in a holistic approach to medicine, combining
              state-of-the-art technology with a personal touch.
            </p>
            <p className="text-base text-gray-600">
              Thank you for trusting us with your health. We look forward to
              serving you and your loved ones with the highest level of care.
            </p>
          </div>
        </div>
      </div>
      <TestimonialsCarousel />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Qualified Doctors</h1>
        <p className="text-gray-500 max-w-2xl mx-auto mb-8">
          Separated they live in. A small river named Duden flows by their place
          and supplies it with the necessary regeliaria. It is a paradisematic
          country.
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
                I am an ambitious workaholic, but apart from that, pretty simple
                person.
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
