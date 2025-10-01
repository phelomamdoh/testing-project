"use client";

import { useState } from "react";
import { submitSpeakingMediaInquiry } from "@/app/actions/speaking-media-inquiry";

interface SpeakingMediaContent {
  title: string;
  buttonText: string;
  options: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
  form: {
    fields: {
      [key: string]: {
        label: string;
        placeholder: string;
        type: string;
        required: boolean;
      };
    };
    submitButton: string;
  };
  successMessage: {
    title: string;
    content: string;
  };
}

interface SpeakingMediaInquiriesSectionProps {
  content: SpeakingMediaContent;
}

type FlowStep = "initial" | "selectOption" | "form" | "success";

export default function SpeakingMediaInquiriesSection({
  content,
}: SpeakingMediaInquiriesSectionProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>("initial");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleButtonClick = () => {
    setCurrentStep("selectOption");
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    setCurrentStep("form");
  };

  const handleBack = () => {
    if (currentStep === "form") {
      setCurrentStep("selectOption");
    } else if (currentStep === "selectOption") {
      setCurrentStep("initial");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const form = e.target as HTMLFormElement;
      const formDataToSubmit = new FormData(form);
      formDataToSubmit.append("inquiryType", selectedOption);

      const result = await submitSpeakingMediaInquiry(formDataToSubmit);

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

  // Initial state - just the button
  if (currentStep === "initial") {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <button
              onClick={handleButtonClick}
              className="inline-flex items-center justify-center bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-lg"
            >
              <svg
                className="w-6 h-6 mr-3"
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
              {content.buttonText}
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Step 2: Select option
  if (currentStep === "selectOption") {
    return (
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-4">
              {content.title}
            </h2>
            <p className="text-xl text-neutral-600">Please select an option</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {content.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className="group relative bg-white rounded-2xl p-8 border-2 border-neutral-200 hover:border-primary-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl text-left"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {option.icon === "microphone" ? (
                      <svg
                        className="w-12 h-12 text-primary-600 group-hover:text-primary-700 transition-colors"
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
                        className="w-12 h-12 text-secondary-600 group-hover:text-secondary-700 transition-colors"
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
                    <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors">
                      {option.title}
                    </h3>
                    <p className="text-neutral-600">{option.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-neutral-400 group-hover:text-primary-600 transition-colors"
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

          <div className="text-center">
            <button
              onClick={handleBack}
              className="text-neutral-600 hover:text-neutral-900 font-semibold transition-colors"
            >
              ← Back
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Step 3: Form
  if (currentStep === "form") {
    const selectedOptionData = content.options.find(
      (opt) => opt.id === selectedOption
    );

    return (
      <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:50px_50px]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              {selectedOptionData?.title}
            </h2>
            <p className="text-xl text-white/80">
              Please provide your contact information
            </p>
          </div>

          <div className="fade-in">
            <form
              onSubmit={handleSubmit}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              {errorMessage && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-xl">
                  <p className="text-red-100 text-center font-semibold">
                    {errorMessage}
                  </p>
                </div>
              )}

              <div className="grid md:grid-cols-1 gap-6">
                {Object.entries(content.form.fields).map(([key, field]) => (
                  <div key={key}>
                    <label
                      htmlFor={key}
                      className="block text-lg font-semibold mb-3 text-white"
                    >
                      {field.label}
                      {field.required && (
                        <span className="text-accent-300 ml-1">*</span>
                      )}
                    </label>
                    <input
                      type={field.type}
                      id={key}
                      name={key}
                      value={formData[key as keyof typeof formData]}
                      onChange={handleInputChange}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full px-6 py-4 bg-white/90 border border-white/30 rounded-xl text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-4 focus:ring-accent-300/50 focus:border-accent-300 transition-all duration-300 text-lg"
                    />
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-8 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-accent-950 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-accent-950/30 border-t-accent-950 rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  content.form.submitButton
                )}
              </button>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-white/70 hover:text-white font-semibold transition-colors"
                >
                  ← Back
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent-300/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary-300/20 rounded-full blur-2xl"></div>
      </section>
    );
  }

  // Step 4: Success message
  if (currentStep === "success") {
    return (
      <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="fade-in bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-4xl font-serif font-bold mb-6">
              {content.successMessage.title}
            </h2>

            <p className="text-xl mb-6 leading-relaxed">
              {content.successMessage.content}
            </p>

            <button
              onClick={() => {
                setCurrentStep("initial");
                setSelectedOption("");
                setFormData({ name: "", mobile: "", email: "" });
                setErrorMessage("");
              }}
              className="mt-4 bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
