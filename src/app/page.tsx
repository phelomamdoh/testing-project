"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import Footer from "@/components/Footer";
import { content } from "@/content";

export default function Home() {
  const authorPhotoRef = useRef<HTMLDivElement>(null);
  const authorNameRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [
      authorPhotoRef.current,
      authorNameRef.current,
      ctaButtonRef.current,
    ].filter(Boolean);

    if (elements.length > 0) {
      const tl = gsap.timeline();

      // Set initial states
      gsap.set(elements, { opacity: 0, y: 50 });

      // Animate elements in sequence
      tl.to(authorPhotoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      })
        .to(
          authorNameRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          ctaButtonRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.2"
        );
    }
  }, []);
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:50px_50px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-center">
            {/* Centered Content */}
            <div className="text-center">
              {/* Author Photo */}
              <div className="mb-8" ref={authorPhotoRef}>
                <div className="w-48 h-48 mx-auto mb-6 rounded-full border-4 border-white/30 overflow-hidden shadow-2xl">
                  <Image
                    src={content.homeHero.authorImage}
                    alt={content.homeHero.authorName}
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Author Name & Title */}
              <div className="mb-8" ref={authorNameRef}>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
                  {content.homeHero.authorName}
                </h2>
                <p className="text-xl md:text-2xl text-accent-300 font-medium mb-4">
                  {content.homeHero.authorTitle}
                </p>
              </div>

              {/* CTA Button */}
              <div ref={ctaButtonRef}>
                <Link href={content.homeHero.ctaLink}>
                  <button className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-accent-950 font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-xl shadow-xl cursor-pointer">
                    {content.homeHero.ctaText}
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
                        d="M7 17l9.2-9.2M16.2 7.8v8.4m0-8.4H7.8"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements for visual interest */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-accent-300/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-20 w-16 h-16 bg-primary-300/20 rounded-full blur-xl animate-pulse delay-500"></div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <div className="flex flex-col">
            <svg
              className="w-6 h-6 text-accent-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 10l5 5 5-5"
              />
            </svg>
            <svg
              className="w-6 h-6 text-accent-300 -mt-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 10l5 5 5-5"
              />
            </svg>
          </div>
          <span className="text-accent-300 text-sm mt-2 font-medium">
            Scroll Down
          </span>
        </div>
      </section>

      {/* Books Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-6">
              {content.books.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {content.books.items.map((book, index) => (
              <div key={index} className="group">
                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    {/* Book cover */}
                    <div className="mx-auto mb-6 inline-block rounded-lg shadow-xl overflow-hidden">
                      <Image
                        src={book.image}
                        alt={`${book.title} - Book Cover`}
                        width={192}
                        height={256}
                        className="max-w-48 max-h-64 w-auto h-auto object-contain"
                      />
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-2">
                      {book.title}
                    </h3>
                    <p className="text-neutral-600 mb-6 text-md">
                      {book.subtitle}
                    </p>
                    <div className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                      View on Amazon →
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
