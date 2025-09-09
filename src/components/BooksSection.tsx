"use client";

import Image from "next/image";
import { content } from "@/content";

export default function BooksSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-6 fade-in">
            {content.books.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {content.books.items.map((book, index) => (
            <div key={index} className="fade-in group">
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
                <p className="text-neutral-600 mb-6 text-md">{book.subtitle}</p>

                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-full hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Get on Amazon
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
