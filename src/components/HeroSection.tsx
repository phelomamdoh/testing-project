"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { content } from "@/content";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (titleRef.current && subtitleRef.current) {
      const tl = gsap.timeline();

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      ).fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600"
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:50px_50px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className="my-8">
          {/* Sherife's professional photo */}
          <div className="w-48 h-48 mx-auto mb-8 rounded-full border-4 border-white/30 overflow-hidden shadow-2xl">
            <Image
              src="/sherif.png"
              alt="Sherife AbdelMessih"
              width={192}
              height={192}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        <h1
          ref={titleRef}
          className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight"
        >
          {content.hero.title}
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-4 font-medium"
        >
          {content.hero.subtitle}
        </p>

        <div className="fade-in space-y-6 mb-8">
          {/* Enhanced description with icon */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-accent-400/20 p-3 rounded-full backdrop-blur-sm border border-accent-300/30">
              <svg
                className="w-6 h-6 text-accent-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div className="bg-gradient-to-r from-accent-300 to-yellow-300 bg-clip-text text-transparent">
              <p className="text-xl md:text-3xl font-bold tracking-wide">
                {content.hero.description}
              </p>
            </div>
          </div>

          {/* Subtle session details badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <svg
              className="w-4 h-4 text-accent-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm md:text-base text-white/90 font-medium">
              {content.hero.sessionDetails}
            </span>
          </div>
        </div>

        {/* Powerful catchphrase section */}
        <div className="fade-in mb-12 space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 leading-tight">
              {content.hero.catchphrase}
            </h2>
            <p className="text-xl md:text-2xl text-white/90 font-medium italic">
              {content.hero.catchphraseSubtitle}
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="fade-in mb-16">
          <button
            onClick={() => {
              const pricingSection = document.querySelector("#pricing-section");
              if (pricingSection) {
                const elementPosition =
                  pricingSection.getBoundingClientRect().top;
                const offsetPosition =
                  elementPosition + window.pageYOffset + 300;

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                });
              }
            }}
            className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-accent-950 font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-xl shadow-xl cursor-pointer"
          >
            Secure Your Spot Now
            <svg
              className="ml-2 w-6 h-6 inline-block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent-300/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-20 w-16 h-16 bg-primary-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
    </section>
  );
}
