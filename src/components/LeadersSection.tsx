"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/content";

gsap.registerPlugin(ScrollTrigger);

export default function LeadersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const leadersRef = useRef<HTMLDivElement>(null);

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

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Leaders animation (staggered)
      gsap.fromTo(
        leadersRef.current?.children || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: leadersRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:40px_40px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-serif font-bold mb-6"
          >
            {content.leaders.title}
          </h2>
          <p
            ref={subtitleRef}
            className="text-xl text-white/80 max-w-3xl mx-auto"
          >
            {content.leaders.subtitle}
          </p>
        </div>

        <div ref={leadersRef} className="grid md:grid-cols-3 gap-8">
          {content.leaders.items.map((leader, index) => (
            <div key={index} className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
                {/* Leader photo */}
                <div className="mb-6 overflow-hidden rounded-xl">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Leader info */}
                <div className="text-center">
                  <h3 className="text-2xl font-serif font-bold mb-2">
                    {leader.name}
                  </h3>
                  <p className="text-accent-300 font-semibold mb-3 text-lg">
                    {leader.title}
                  </p>
                  <p className="text-white/80 leading-relaxed text-sm">
                    {leader.description}
                  </p>
                </div>

                {/* Decorative element */}
                <div className="flex justify-center mt-6">
                  <div className="w-12 h-1 bg-gradient-to-r from-accent-400 to-accent-600 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievement highlight */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-accent-500/20 border border-accent-300/30 rounded-full px-8 py-4">
            <span className="text-accent-200 font-bold text-lg">
              ✨ Honored by multiple heads of state worldwide
            </span>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-accent-300/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-secondary-300/20 rounded-full blur-2xl"></div>
    </section>
  );
}
