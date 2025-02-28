"use client";

import * as React from "react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    image:
      "https://thedigitalhealthstore.com/cdn/shop/files/doctors-medical-gear.jpg?v=1634658928&width=4000",
    title: "Welcome to Providence Clinic",
    description:
      "At Providence Clinic, we prioritize your health with innovative healthcare technology, ensuring a personalized and seamless experience from consultation to treatment. Our expert team and advanced solutions are dedicated to enhancing your well-being.",
  },
  {
    id: 2,
    image:
      "https://thedigitalhealthstore.com/cdn/shop/files/TDHS-Home_Hero--10.webp?v=1696346876&width=4000",
    title: "Advanced Medical Equipment",
    description:
      "Explore our extensive range of high-quality, state-of-the-art medical devices, designed to deliver precision, reliability, and optimal results. Our equipment empowers healthcare professionals to provide the best care possible with cutting-edge technology.",
  },
  {
    id: 3,
    image:
      "https://thedigitalhealthstore.com/cdn/shop/files/TDHS-Home_Hero--06.webp?v=1696346101&width=4000",
    title: "Professional Healthcare",
    description:
      "Experience world-class healthcare services backed by expert professionals and the latest in medical technology. We are committed to delivering exceptional care, ensuring that your health needs are met with the highest standards of professionalism and innovation.",
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  // const previousSlide = () => {
  //   setCurrentSlide((current) =>
  //     current === 0 ? slides.length - 1 : current - 1
  //   );
  // };

  const nextSlide = () => {
    setCurrentSlide((current) =>
      current === slides.length - 1 ? 0 : current + 1
    );
  };

  React.useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []); // Removed nextSlide from dependencies

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: currentSlide === index ? 1 : 0 }}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              {slide.title}
            </h2>
            <p className="text-xl md:text-2xl max-w-2xl">{slide.description}</p>
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-8 h-0.5 rounded-full transition-all ${
              currentSlide === index ? "bg-white w-4" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
