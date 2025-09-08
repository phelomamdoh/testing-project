"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/content";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const bioItemsRef = useRef<HTMLDivElement[]>([]);

  // Key highlights about Sherife
  const keyHighlights = [
    {
      icon: "🎓",
      title: "MIT Scientist",
      description: "Advanced degree from world's top university",
    },
    {
      icon: "📚",
      title: "Bestselling Author",
      description: "2 books reaching #1 in multiple countries",
    },
    {
      icon: "🌟",
      title: "Trusted Advisor",
      description: "Advises billionaires, celebrities & world champions",
    },
  ];

  useEffect(() => {
    if (sectionRef.current) {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Photo animation
      gsap.fromTo(
        photoRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: photoRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Highlights animation (staggered)
      gsap.fromTo(
        highlightsRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: highlightsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Bio items animation (staggered)
      gsap.fromTo(
        bioItemsRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bioItemsRef.current[0],
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-6"
          >
            {content.about.title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left column - Photo and highlights */}
          <div className="text-center lg:text-left">
            {/* Smaller professional photo */}
            <div ref={photoRef} className="mb-8">
              <div className="w-64 h-64 mx-auto rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-primary-100 to-secondary-100 p-3">
                <Image
                  src="/sherif.png"
                  alt="Sherife AbdelMessih - Professional Photo"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>

            {/* Key highlights */}
            <div ref={highlightsRef} className="space-y-4">
              {keyHighlights.map((highlight, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{highlight.icon}</span>
                    <div className="text-left">
                      <h3 className="font-bold text-neutral-900 text-lg">
                        {highlight.title}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Bio content */}
          <div className="space-y-6">
            {content.about.bio.map((item, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) bioItemsRef.current[index] = el;
                }}
                className="flex items-start space-x-4 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex-shrink-0 w-3 h-3 bg-primary-500 rounded-full mt-2"></div>
                <p className="text-neutral-700 text-lg leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
