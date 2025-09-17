"use client";

import { content } from "@/content";

export default function CourseContentSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:40px_40px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 fade-in">
            {content.courseContent.title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {content.courseContent.modules.map((module, index) => (
            <div key={index} className="fade-in group">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 border border-white/20">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-lg leading-relaxed">{module}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16 fade-in">
          <div className="inline-block bg-accent-500 text-accent-950 px-8 py-4 rounded-full font-bold text-lg transform hover:scale-105 transition-transform duration-300 shadow-xl">
            8 Hours of transformational Content
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-accent-300/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-secondary-300/20 rounded-full blur-2xl"></div>
    </section>
  );
}
