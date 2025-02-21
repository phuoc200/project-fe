"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    quote:
      "We love using Providence Clinic devices. We use them with all our patients at the practice.",
    author: "Dr. Sarah Johnson",
    location: "Primary Care Clinic, New York",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "The quality and reliability of their medical equipment has significantly improved our patient care.",
    author: "Dr. Michael Chen",
    location: "Family Medicine Center, Chicago",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "Excellent support and training. The devices are user-friendly and accurate.",
    author: "Dr. Emily Brown",
    location: "Healthcare Partners, Los Angeles",
    rating: 5,
  },
];

export function TestimonialsCarousel() {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const previousSlide = () => {
    setCurrentSlide((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((current) =>
      current === testimonials.length - 1 ? 0 : current + 1
    );
  };

  return (
    <div className="bg-[linear-gradient(225deg,_rgba(51,_59,_67,_0.88)_8%,_rgba(41,_47,_54,_1)_56%,_rgba(20,_20,_20,_1)_92%)] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-400 mb-8">
          Testimonials
        </h2>

        <div className="relative">
          <div className="overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="transition-opacity duration-500 text-center"
                style={{
                  opacity: currentSlide === index ? 1 : 0,
                  display: currentSlide === index ? "block" : "none",
                }}
              >
                <div className="flex justify-center text-[#585c61] mb-4">
                  <Quote className="h-10 w-10"></Quote>
                </div>
                <blockquote className="text-2xl md:text-4xl text-white font-light mb-8 max-w-4xl mx-auto">
                  {testimonial.quote}
                </blockquote>
                <div className="flex justify-center mb-12 gap-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-8 h-8  text-white fill-current"
                    />
                  ))}
                </div>
                <div className="text-white mb-14">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-gray-400">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={previousSlide}
              className="text-white border-white/20 bg-transparent hover:bg-white/10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index ? "bg-white w-4" : "bg-white/50"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="text-white border-white/20 bg-transparent hover:bg-white/10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
