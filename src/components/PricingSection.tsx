"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PricingContent {
  title: string;
  subtitle: string;
  cardTitle: string;
  cardSubtitle: string;
  originalPrice: string;
  discountedPrice: string;
  currency: string;
  period: string;
  paymentNote: string;
  features: string[];
  ctaText: string;
  discount: string;
}

interface PricingSectionProps {
  pricingContent: PricingContent;
}

export default function PricingSection({
  pricingContent,
}: PricingSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLUListElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const price = priceRef.current;
    const features = featuresRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;

    if (!section || !card || !price || !features || !title || !subtitle) return;

    // Title and subtitle animations with faster timing
    gsap.fromTo(
      title,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      subtitle,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        delay: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Card entrance animation
    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 50,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Price animation with bounce effect
    gsap.fromTo(
      price,
      {
        opacity: 0,
        scale: 0.5,
        rotation: -10,
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 0.3,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Features stagger animation
    gsap.fromTo(
      features.children,
      {
        opacity: 0,
        x: -30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.6,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Floating animation for card
    gsap.to(card, {
      y: -10,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  const scrollToRegistration = () => {
    const registrationSection = document.getElementById("registration-section");
    if (registrationSection) {
      registrationSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="pricing-section"
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-neutral-50 via-white to-primary-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary-300 rounded-full blur-3xl"></div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-accent-400 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-secondary-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-4"
          >
            {pricingContent.title}
          </h2>
          <p
            ref={subtitleRef}
            className="text-xl text-neutral-600 max-w-2xl mx-auto"
          >
            {pricingContent.subtitle}
          </p>
        </div>

        {/* Pricing Card */}
        <div className="flex justify-center">
          <div
            ref={cardRef}
            className="relative bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden max-w-lg w-full"
          >
            {/* Discount Badge */}
            <div className="absolute top-6 right-6 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg transform rotate-12">
              {pricingContent.discount}
            </div>

            {/* Card Header */}
            <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-accent-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {pricingContent.cardTitle}
              </h3>
              <p className="text-primary-100">{pricingContent.cardSubtitle}</p>
            </div>

            {/* Pricing */}
            <div ref={priceRef} className="p-8 text-center">
              <div className="mb-4">
                <span className="text-2xl text-neutral-500 line-through">
                  {pricingContent.originalPrice} {pricingContent.currency}{" "}
                  {pricingContent.period}
                </span>
              </div>
              <div className="mb-2">
                <span className="sm:text-5xl text-4xl font-bold text-primary-700">
                  {pricingContent.discountedPrice} {pricingContent.currency}
                </span>
                <span className="text-lg sm:text-xl text-neutral-600 ml-2">
                  {pricingContent.period}
                </span>
              </div>
              <p className="text-sm text-accent-600 font-semibold bg-accent-50 px-3 py-1 rounded-full inline-block">
                {pricingContent.paymentNote}
              </p>
            </div>

            {/* Features */}
            <div className="px-8 pb-8">
              <ul ref={featuresRef} className="space-y-4">
                {pricingContent.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <svg
                        className="w-4 h-4 text-primary-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-neutral-700 leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="p-8 pt-0">
              <button
                onClick={scrollToRegistration}
                className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-base sm:text-lg group relative overflow-hidden cursor-pointer"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {pricingContent.ctaText}
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </button>
            </div>

            {/* Security Badge */}
            <div className="px-8 pb-8">
              <div className="flex items-center justify-center text-sm text-neutral-500">
                <svg
                  className="w-4 h-4 mr-2 text-primary-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Secure registration
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Limited time offer
          </p>
        </div>
      </div>
    </section>
  );
}
