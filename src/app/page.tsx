"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MediaSection from "@/components/MediaSection";
import LeadersSection from "@/components/LeadersSection";
import BooksSection from "@/components/BooksSection";
import CourseContentSection from "@/components/CourseContentSection";
import MITTestimonialSection from "@/components/MITTestimonialSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import RegistrationSection from "@/components/RegistrationSection";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Initialize GSAP animations
    gsap.fromTo(
      ".fade-in",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".fade-in",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <HeroSection />
      <AboutSection />
      <MediaSection />
      <LeadersSection />
      <BooksSection />
      <CourseContentSection />
      <MITTestimonialSection />
      <TestimonialsSection />
      <RegistrationSection />
      <Footer />
    </main>
  );
}
