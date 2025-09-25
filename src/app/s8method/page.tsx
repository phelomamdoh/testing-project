"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { s8MethodContent } from "@/content";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MediaSection from "@/components/MediaSection";
import LeadersSection from "@/components/LeadersSection";
import BooksSection from "@/components/BooksSection";
import CourseContentSection from "@/components/CourseContentSection";
import MITTestimonialSection from "@/components/MITTestimonialSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import RegistrationSection from "@/components/RegistrationSection";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function S8Method() {
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
      <HeroSection heroContent={s8MethodContent.hero} />
      <AboutSection />
      <MediaSection />
      <LeadersSection />
      <BooksSection />
      <CourseContentSection courseContent={s8MethodContent.courseContent} />
      <MITTestimonialSection />
      <TestimonialsSection testimonialsContent={s8MethodContent.testimonials} />
      <PricingSection pricingContent={s8MethodContent.pricing} />
      <RegistrationSection registrationContent={s8MethodContent.registration} />
      <Footer />
    </main>
  );
}
