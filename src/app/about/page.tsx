import Layout from "../components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">About Providence Clinic</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-xl text-gray-600 mb-6">
              Providence Clinic has been at the forefront of medical care and
              innovation since its establishment in 1990. Our mission is to
              provide high-quality, compassionate healthcare services to our
              community while advancing medical research and education.
            </p>
            <p className="text-xl text-gray-600 mb-6">
              With state-of-the-art facilities and a team of dedicated
              healthcare professionals, we strive to deliver the best possible
              care to our patients. Our commitment to excellence extends beyond
              patient care to include cutting-edge research and comprehensive
              educational programs.
            </p>
            <p className="text-xl text-gray-600">
              At Providence Clinic, we believe in a holistic approach to
              healthcare, combining advanced medical technology with
              personalized care to ensure the best outcomes for our patients.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Core Values</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    We strive for excellence in all aspects of our work, from
                    patient care to research and education.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Compassion</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    We treat our patients and colleagues with empathy, respect,
                    and kindness.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    We embrace new technologies and methodologies to continually
                    improve our services and patient outcomes.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Integrity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    We uphold the highest ethical standards in all our practices
                    and interactions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
