"use client";

import { useState } from "react";
import Link from "next/link";
import { submitSpeakingMediaInquiry } from "@/app/actions/speaking-media-inquiry";
import SpeakingEventForm from "@/components/SpeakingEventForm";
import MediaInquiryForm from "@/components/MediaInquiryForm";
import { content } from "@/content";

type FlowStep = "selectOption" | "form" | "success";

export default function SpeakingMediaPage() {
  const [currentStep, setCurrentStep] = useState<FlowStep>("selectOption");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const speakingMediaContent = content.speakingMedia;

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    setCurrentStep("form");
  };

  const handleBack = () => {
    if (currentStep === "form") {
      setCurrentStep("selectOption");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      formData.append("inquiryType", selectedOption);
      const result = await submitSpeakingMediaInquiry(formData);

      if (result.success) {
        setCurrentStep("success");
      } else {
        setErrorMessage(
          result.message || "Submission failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCurrentStep("selectOption");
    setSelectedOption("");
    setErrorMessage("");
  };

  // Step 1: Select option
  if (currentStep === "selectOption") {
    return (
      <main className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 flex items-center justify-center relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:50px_50px]"></div>
        </div>

        {/* Back to Home */}
        <Link
          href="/"
          className="absolute top-8 left-8 text-white/80 hover:text-white transition-colors flex items-center space-x-2 z-20"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="font-semibold">Back to Home</span>
        </Link>

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 w-full">
          <div className="text-center mb-16 fade-in">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
              {speakingMediaContent.title}
            </h1>
            <p className="text-2xl text-accent-300 font-medium">
              Please select an option
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto fade-in">
            {speakingMediaContent.options.map((option, index) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className="group relative bg-white/10 backdrop-blur-sm rounded-3xl p-10 border-2 border-white/20 hover:border-accent-300 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center space-y-6">
                  <div className="flex-shrink-0 bg-white/20 rounded-full p-6 group-hover:bg-accent-300/30 transition-all duration-300">
                    {option.icon === "microphone" ? (
                      <svg
                        className="w-16 h-16 text-accent-300 group-hover:text-accent-200 transition-colors"
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
                    ) : (
                      <svg
                        className="w-16 h-16 text-accent-300 group-hover:text-accent-200 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent-200 transition-colors">
                      {option.title}
                    </h3>
                    <p className="text-white/70 text-lg group-hover:text-white/90 transition-colors">
                      {option.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <svg
                      className="w-8 h-8 text-white/40 group-hover:text-accent-300 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent-300/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary-300/20 rounded-full blur-2xl"></div>
      </main>
    );
  }

  // Step 2: Form
  if (currentStep === "form") {
    const selectedOptionData = speakingMediaContent.options.find(
      (opt) => opt.id === selectedOption
    );

    return (
      <main className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 flex items-center justify-center relative overflow-hidden py-12">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:50px_50px]"></div>
        </div>

        {/* Back button */}
        <button
          onClick={handleBack}
          className="absolute top-8 left-8 text-white/80 hover:text-white transition-colors flex items-center space-x-2 z-20"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="font-semibold">Back</span>
        </button>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 w-full">
          <div className="text-center mb-12 fade-in">
            <div className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <span className="text-accent-300 font-semibold text-lg">
                {selectedOptionData?.title}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              {selectedOption === "speaking"
                ? "Event Information"
                : "Contact Information"}
            </h1>
            <p className="text-xl text-white/80">
              Please provide your details and we'll get back to you soon
            </p>
          </div>

          <div className="fade-in">
            {selectedOption === "speaking" ? (
              <SpeakingEventForm
                formContent={speakingMediaContent.speakingForm}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                errorMessage={errorMessage}
                onBack={handleBack}
              />
            ) : (
              <MediaInquiryForm
                formContent={speakingMediaContent.mediaForm}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                errorMessage={errorMessage}
                onBack={handleBack}
              />
            )}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent-300/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary-300/20 rounded-full blur-2xl"></div>
      </main>
    );
  }

  // Step 3: Success message
  if (currentStep === "success") {
    return (
      <main className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 flex items-center justify-center relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:50px_50px]"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 w-full text-center">
          <div className="fade-in bg-white/10 backdrop-blur-sm rounded-3xl p-12 md:p-16 border border-white/20 shadow-2xl">
            <div className="w-24 h-24 bg-accent-300 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <svg
                className="w-14 h-14 text-accent-950"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-5xl font-serif font-bold mb-6 text-white">
              {speakingMediaContent.successMessage.title}
            </h1>

            <p className="text-2xl mb-12 leading-relaxed text-white/90">
              {speakingMediaContent.successMessage.content}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetForm}
                className="bg-white/20 hover:bg-white/30 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 text-lg"
              >
                Submit Another Inquiry
              </button>
              <Link
                href="/"
                className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-accent-950 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 text-lg"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent-300/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary-300/20 rounded-full blur-2xl"></div>
      </main>
    );
  }

  return null;
}
