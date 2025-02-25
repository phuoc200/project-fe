import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, MessageCircle, User } from "lucide-react";
import Link from "next/link";
import Layout from "@/app/components/layout";

const blogs = [
  {
    id: 1,
    title: "Patient Education",
    content: `Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.

    Sleep is essential for maintaining good health and well-being. Lack of sleep can lead to various health issues including decreased cognitive function, weakened immune system, and increased risk of chronic diseases.

    Research has shown that adults need between 7-9 hours of quality sleep per night. However, many people struggle to get enough sleep due to various factors such as stress, work schedules, and lifestyle choices.

    The consequences of sleep deprivation can be severe and may include:
    - Impaired memory and concentration
    - Increased risk of accidents
    - Mood changes and irritability
    - Weakened immune system
    - Higher risk of chronic health conditions

    It's important to prioritize sleep and develop good sleep habits to maintain optimal health and well-being.`,
    image:
      "https://guidewaycare.com/wp-content/themes/yootheme/cache/a0/the-importance-of-patient-engagement-and-education-a0f83947.jpeg",
    author: "ADMIN",
    date: "JUNE 9, 2019",
    category: "Health & Wellness",
    comments: [
      {
        id: 1,
        author: "Dr. Michael Smith",
        content:
          "This is a crucial topic that needs more attention. Sleep deprivation is becoming increasingly common in our modern society.",
        date: "JUNE 9, 2019",
      },
      {
        id: 2,
        author: "Sarah Johnson",
        content:
          "Great article! I've been working on improving my sleep habits and have noticed a significant difference in my daily performance.",
        date: "JUNE 9, 2019",
      },
      {
        id: 3,
        author: "James Wilson",
        content:
          "The research cited here is very enlightening. Would love to see more articles on this topic.",
        date: "JUNE 9, 2019",
      },
    ],
  },
  {
    id: 2,
    title: "Medical Training",
    content:
      "Medical training is an essential component of healthcare education that prepares future healthcare professionals for the challenges they will face in their careers. It encompasses a wide range of disciplines, including medicine, nursing, pharmacy, and allied health professions.\n\nKey aspects of medical training include:\n\n1. Theoretical knowledge: Students learn about anatomy, physiology, pharmacology, and other fundamental sciences.\n\n2. Clinical skills: Hands-on training in patient examination, diagnostic procedures, and treatment techniques.\n\n3. Communication skills: Learning how to effectively communicate with patients, families, and other healthcare professionals.\n\n4. Ethics and professionalism: Understanding the ethical principles and professional standards that guide healthcare practice.\n\n5. Continuous learning: Emphasizing the importance of lifelong learning and staying updated with the latest medical advancements.\n\n6. Simulation-based training: Using advanced technology to simulate real-world medical scenarios for safe practice.\n\n7. Interprofessional education: Collaborating with students from different healthcare disciplines to improve teamwork and patient care.",
    image:
      "https://d2qr5s4kv79wo3.cloudfront.net/wp-content/uploads/2022/12/Importance-of-Medical-Training-Equipment-22-Dec.jpg",
    author: "ADMIN",
    date: "JUNE 9, 2019",
    category: "Health & Wellness",
    comments: [
      {
        id: 1,
        author: "Dr. Michael Smith",
        content:
          "This is a crucial topic that needs more attention. Sleep deprivation is becoming increasingly common in our modern society.",
        date: "JUNE 9, 2019",
      },
      {
        id: 2,
        author: "Sarah Johnson",
        content:
          "Great article! I've been working on improving my sleep habits and have noticed a significant difference in my daily performance.",
        date: "JUNE 9, 2019",
      },
      {
        id: 3,
        author: "James Wilson",
        content:
          "The research cited here is very enlightening. Would love to see more articles on this topic.",
        date: "JUNE 9, 2019",
      },
    ],
  },
  {
    id: 3,
    title: "Research Papers",
    content:
      "Research papers play a crucial role in advancing medical knowledge and improving patient care. They provide a structured way for researchers to share their findings, methodologies, and conclusions with the broader scientific community.\n\nKey components of medical research papers include:\n\n1. Abstract: A brief summary of the research, including objectives, methods, results, and conclusions.\n\n2. Introduction: Background information on the research topic and the study's objectives.\n\n3. Methods: Detailed description of the study design, data collection, and analysis techniques.\n\n4. Results: Presentation of the study's findings, often including statistical analyses and data visualizations.\n\n5. Discussion: Interpretation of the results, comparison with previous studies, and exploration of the implications.\n\n6. Conclusion: Summary of the main findings and their significance for clinical practice or future research.\n\n7. References: Citations of other relevant studies and sources used in the paper.\n\nReading and critically analyzing research papers is an essential skill for healthcare professionals to stay updated with the latest developments in their field and make evidence-based decisions in patient care.",
    image:
      "https://www.gammacompliance.com/media/wysiwyg/Blog/GammaComplianceSolutions-109687-Training-Medical-Staff-Blogbanner1.jpg",
    author: "ADMIN",
    date: "JUNE 9, 2019",
    category: "Health & Wellness",
    comments: [
      {
        id: 1,
        author: "Dr. Michael Smith",
        content:
          "This is a crucial topic that needs more attention. Sleep deprivation is becoming increasingly common in our modern society.",
        date: "JUNE 9, 2019",
      },
      {
        id: 2,
        author: "Sarah Johnson",
        content:
          "Great article! I've been working on improving my sleep habits and have noticed a significant difference in my daily performance.",
        date: "JUNE 9, 2019",
      },
      {
        id: 3,
        author: "James Wilson",
        content:
          "The research cited here is very enlightening. Would love to see more articles on this topic.",
        date: "JUNE 9, 2019",
      },
    ],
  },
];

const recentBlogs = [
  {
    id: 1,
    title: "Professional development resources for healthcare providers.",
    date: "MAY 22, 2019",
    author: "ADMIN",
    comments: 19,
    image:
      "https://guidewaycare.com/wp-content/themes/yootheme/cache/a0/the-importance-of-patient-engagement-and-education-a0f83947.jpeg",
  },
  {
    id: 2,
    title: "New Developments in Cardiac Surgery Techniques",
    date: "MAY 21, 2019",
    author: "ADMIN",
    comments: 15,
    image:
      "https://d2qr5s4kv79wo3.cloudfront.net/wp-content/uploads/2022/12/Importance-of-Medical-Training-Equipment-22-Dec.jpg",
  },
  {
    id: 3,
    title: "New Developments in Cardiac Surgery Techniques",
    date: "MAY 21, 2019",
    author: "ADMIN",
    comments: 15,
    image:
      "https://www.gammacompliance.com/media/wysiwyg/Blog/GammaComplianceSolutions-109687-Training-Medical-Staff-Blogbanner1.jpg",
  },
];

const categories = [
  { name: "Health & Wellness", count: 12 },
  { name: "Medical Research", count: 8 },
  { name: "Patient Care", count: 15 },
  { name: "Healthcare Technology", count: 10 },
];

export default async function BlogPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const blogId = parseInt(id, 10);
  const blog = blogs.find((b) => b.id === blogId);
  if (!blog) {
    notFound();
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="prose max-w-none">
              <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>
              <div className="flex items-center gap-4 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>{blog.comments.length} Comments</span>
                </div>
              </div>
              <Image
                src={blog.image || "/placeholder.svg"}
                alt={blog.title}
                width={800}
                height={400}
                className="w-full rounded-lg mb-6"
              />
              <div className="space-y-4">
                {blog.content.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Comments Section */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">
                  Comments ({blog.comments.length})
                </h2>
                <div className="space-y-6">
                  {blog.comments.map((comment) => (
                    <div key={comment.id} className="border-b pb-6">
                      <div className="flex items-center gap-4 mb-2">
                        {/* Avatar */}
                        <Image
                          src={`https://i.pravatar.cc/150?img=${comment.id}`} // Placeholder avatar URL
                          alt={`${comment.author}'s avatar`}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <span className="font-semibold">
                            {comment.author}
                          </span>
                          <span className="text-gray-600 text-sm ml-2">
                            {comment.date}
                          </span>
                        </div>
                      </div>
                      <p>{comment.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Categories */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    variant="outline"
                    className="w-full justify-between"
                  >
                    <span>{category.name}</span>
                    <span className="text-gray-500">({category.count})</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Recent Blog Posts */}
            <div>
              <h2 className="text-xl font-bold mb-4">Recent Blog</h2>
              <div className="space-y-4">
                {recentBlogs.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <Link href={`/blog/${post.id}`} className="group">
                        <div className="flex gap-4">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            width={100}
                            height={100}
                            className="rounded-lg object-cover transition-transform group-hover:scale-105"
                          />
                          <div>
                            <h3 className="font-medium line-clamp-2 group-hover:text-primary">
                              {post.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                              <CalendarDays className="w-4 h-4" />
                              <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.comments} Comments</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
