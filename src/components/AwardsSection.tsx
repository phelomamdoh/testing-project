import React from "react";
import { content } from "@/content";

const AwardsSection: React.FC = () => {
  const { awards } = content;

  const getIcon = () => {
    return (
      <svg
        className="w-12 h-12 text-amber-500 group-hover:text-yellow-400 transition-colors duration-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        style={{
          filter: "drop-shadow(0 2px 4px rgba(245, 158, 11, 0.3))",
        }}
      >
        <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
        <circle cx="12" cy="8" r="6" />
      </svg>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {awards.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Awards Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {awards.items.map((award, index) => (
            <div key={index} className="group relative h-full">
              {/* Award Card */}
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center border border-gray-100 group-hover:border-gray-200 h-full flex flex-col justify-between min-h-[320px]">
                {/* Top Content */}
                <div className="flex flex-col items-center">
                  {/* Icon */}
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-full group-hover:from-amber-100 group-hover:to-yellow-100 transition-colors duration-300 shadow-lg ring-1 ring-amber-200/30">
                      {getIcon()}
                    </div>
                  </div>

                  {/* Award Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight min-h-[3.5rem] flex items-center">
                    {award.title}
                  </h3>
                </div>

                {/* Organization - Bottom Content */}
                <div className="space-y-2 mt-auto">
                  <p className="text-lg font-semibold text-gray-700">
                    {award.organization}
                  </p>
                  <p className="text-sm text-gray-500 font-medium">
                    {award.location}
                  </p>
                </div>

                {/* Decorative Element */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-yellow-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
