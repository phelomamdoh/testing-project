"use client";

import { content } from "@/content";

export default function MITTestimonialSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-neutral-50 to-primary-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-4 fade-in">
            {content.mitTestimonial.title}
          </h2>
          <p className="text-lg text-neutral-600 max-w-4xl mx-auto fade-in">
            {content.mitTestimonial.subtitle}
          </p>
        </div>

        <div className="fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Quote decoration */}
            <div className="absolute top-6 left-6 text-6xl text-primary-200 font-serif leading-none">
              &ldquo;
            </div>
            <div className="absolute bottom-6 right-6 text-6xl text-primary-200 font-serif leading-none transform rotate-180">
              &rdquo;
            </div>

            {/* MIT Logo placeholder */}
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-2 rounded-full font-bold text-lg">
                MIT
              </div>
            </div>

            <blockquote className="text-xl md:text-2xl text-neutral-700 text-center leading-relaxed mb-8 relative z-10 font-serif italic">
              {content.mitTestimonial.quote}
            </blockquote>

            <div className="text-center border-t border-neutral-200 pt-6">
              <cite className="not-italic">
                <div className="font-bold text-xl text-neutral-900 mb-1">
                  {content.mitTestimonial.author}
                </div>
                <div className="text-primary-600 font-semibold text-lg">
                  {content.mitTestimonial.position}
                </div>
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
