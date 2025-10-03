"use client";

import { useState } from "react";
import { submitSpeakingMediaInquiry } from "@/app/actions/speaking-media-inquiry";
import SpeakingEventForm from "@/components/SpeakingEventForm";
import MediaInquiryForm from "@/components/MediaInquiryForm";

interface SpeakingMediaContent {
  title: string;
  options: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
  speakingForm: any;
  mediaForm: any;
  successMessage: {
    title: string;
    content: string;
  };
}

interface SpeakingMediaSectionProps {
  content: SpeakingMediaContent;
}

type FlowStep = "selectOption" | "form" | "success";

export default function SpeakingMediaSection({
  content,
}: SpeakingMediaSectionProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>("selectOption");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  // Step 1: Select Option
  if (currentStep === "selectOption") {
    return (
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-6">
              {content.title}
            </h2>
            <p className="text-xl text-neutral-600">
              Choose the type of inquiry you'd like to make
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {content.options.map((option, index) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className="group relative bg-white rounded-2xl p-10 border-2 border-neutral-200 hover:border-primary-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl text-left"
              >
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="flex-shrink-0 bg-primary-50 rounded-full p-6 group-hover:bg-primary-100 transition-all duration-300">
                    {option.icon === "microphone" ? (
                      <svg
                        className="w-16 h-16 text-primary-600 group-hover:text-primary-700 transition-colors"
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
                        className="w-16 h-16 text-secondary-600 group-hover:text-secondary-700 transition-colors"
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
                    <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary-700 transition-colors">
                      {option.title}
                    </h3>
                    <p className="text-neutral-600 text-lg">
                      {option.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Step 2: Form
  if (currentStep === "form") {
    const selectedOptionData = content.options.find(
      (opt) => opt.id === selectedOption
    );

    return (
      <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:50px_50px]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 fade-in">
            <div className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <span className="text-accent-300 font-semibold text-lg">
                {selectedOptionData?.title}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              {selectedOption === "speaking"
                ? "Event Information"
                : "Media Inquiry"}
            </h2>
            <p className="text-xl text-white/80">
              Please provide your details and we'll get back to you soon
            </p>
          </div>

          <div className="fade-in">
            {selectedOption === "speaking" ? (
              <SpeakingEventForm
                formContent={content.speakingForm}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                errorMessage={errorMessage}
                onBack={handleBack}
              />
            ) : (
              <MediaInquiryForm
                formContent={content.mediaForm}
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
      </section>
    );
  }

  // Step 3: Success
  if (currentStep === "success") {
    return (
      <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:50px_50px]"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
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

            <h2 className="text-5xl font-serif font-bold mb-6 text-white">
              {content.successMessage.title}
            </h2>

            <p className="text-2xl mb-12 leading-relaxed text-white/90">
              {content.successMessage.content}
            </p>

            <button
              onClick={resetForm}
              className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-accent-950 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 text-lg"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent-300/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary-300/20 rounded-full blur-2xl"></div>
      </section>
    );
  }

  return null;
}
