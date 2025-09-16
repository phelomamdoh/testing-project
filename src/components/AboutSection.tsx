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

  // Icon mapping function
  const getIcon = (iconType: string) => {
    const iconProps = "w-6 h-6";

    switch (iconType) {
      case "book":
        return (
          <svg
            className={iconProps}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        );
      case "brain":
        return (
          <svg
            className={iconProps}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 18V5"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.997 5.125a4 4 0 0 1 2.526 5.77"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18 18a4 4 0 0 0 2-7.464"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18a4 4 0 0 1-2-7.464"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6.003 5.125a4 4 0 0 0-2.526 5.77"
            />
          </svg>
        );
      case "microphone":
        return (
          <svg
            className={iconProps}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        );
      case "award":
        return (
          <svg
            className={iconProps}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
        );
      case "advisor":
        return (
          <svg
            className={iconProps}
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
        );
      default:
        return null;
    }
  };

  // Color themes for each achievement card
  const getColorTheme = (index: number) => {
    const themes = [
      {
        bg: "bg-gradient-to-br from-primary-50 to-blue-50",
        border: "border-2 border-primary-200 hover:border-primary-300",
        iconBg: "bg-primary-100 text-primary-600 group-hover:bg-primary-200",
        textColor: "text-primary-900",
      },
      {
        bg: "bg-gradient-to-br from-accent-50 to-yellow-50",
        border: "border-2 border-accent-200 hover:border-accent-300",
        iconBg: "bg-accent-100 text-accent-600 group-hover:bg-accent-200",
        textColor: "text-accent-900",
      },
      {
        bg: "bg-gradient-to-br from-secondary-50 to-purple-50",
        border: "border-2 border-secondary-200 hover:border-secondary-300",
        iconBg:
          "bg-secondary-100 text-secondary-600 group-hover:bg-secondary-200",
        textColor: "text-secondary-900",
      },
      {
        bg: "bg-gradient-to-br from-green-50 to-emerald-50",
        border: "border-2 border-green-200 hover:border-green-300",
        iconBg: "bg-green-100 text-green-600 group-hover:bg-green-200",
        textColor: "text-green-900",
      },
      {
        bg: "bg-gradient-to-br from-rose-50 to-pink-50",
        border: "border-2 border-rose-200 hover:border-rose-300",
        iconBg: "bg-rose-100 text-rose-600 group-hover:bg-rose-200",
        textColor: "text-rose-900",
      },
    ];

    return themes[index % themes.length];
  };

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

        {/* Centered professional photo */}
        <div ref={photoRef} className="text-center mb-12">
          <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-primary-100 to-secondary-100 p-3">
            <Image
              src="/sherif.png"
              alt="Sherife AbdelMessih - Professional Photo"
              width={192}
              height={192}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Unified achievements grid */}
        <div
          ref={highlightsRef}
          className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {content.about.achievements.map((achievement, index) => {
            const colorTheme = getColorTheme(index);
            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) bioItemsRef.current[index] = el;
                }}
                className={`group p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ${colorTheme.bg} ${colorTheme.border}`}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`flex-shrink-0 p-3 rounded-lg ${colorTheme.iconBg} transition-colors duration-300`}
                  >
                    {getIcon(achievement.icon)}
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-bold text-lg mb-2 ${colorTheme.textColor}`}
                    >
                      {achievement.title}
                    </h3>
                    <p className="text-neutral-700 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
