"use client";

import { content } from "@/content";

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-6 fade-in">
            {content.testimonials.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {content.testimonials.items.map((testimonial, index) => (
            <div key={index} className="fade-in">
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                {/* Quote decoration */}
                <div className="text-4xl text-primary-300 font-serif mb-4 leading-none">
                  &ldquo;
                </div>

                <blockquote className="text-lg text-neutral-700 leading-relaxed mb-6 flex-1 italic">
                  {testimonial.quote}
                </blockquote>

                <div className="flex items-center justify-between border-t border-primary-200 pt-4">
                  <cite className="not-italic font-semibold text-primary-700 text-lg">
                    — {testimonial.author}
                  </cite>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-5 h-5 text-accent-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
