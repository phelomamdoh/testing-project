"use client";

import { useState } from "react";
import { registerForHappinessCode } from "@/app/actions/happiness-code-registration";
import { registerForS8Method } from "@/app/actions/s8-method-registration";

interface FormField {
  label: string;
  placeholder: string;
  type: string;
  required: boolean;
}

interface SuccessMessage {
  title: string;
  content?: string;
  instapay?: string;
  paymentDetails?: string;
}

interface RegistrationContent {
  courseName: string;
  title: string;
  fields: {
    [key: string]: FormField;
  };
  submitButton: string;
  successMessage: SuccessMessage;
}

interface RegistrationSectionProps {
  registrationContent: RegistrationContent;
}

export default function RegistrationSection({
  registrationContent,
}: RegistrationSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      // Create FormData from the form
      const form = e.target as HTMLFormElement;
      const formDataToSubmit = new FormData(form);

      // Call the appropriate server action based on course name
      const result =
        registrationContent.courseName === "happinesscode"
          ? await registerForHappinessCode(formDataToSubmit)
          : await registerForS8Method(formDataToSubmit);

      if (result.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(
          result.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
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
              {registrationContent.successMessage.title}
            </h2>

            {registrationContent.successMessage.content && (
              <p className="text-xl mb-6 leading-relaxed">
                {registrationContent.successMessage.content}
              </p>
            )}
            {registrationContent.successMessage.instapay && (
              <p className="text-lg font-bold mb-6">
                {registrationContent.successMessage.instapay}
              </p>
            )}

            {registrationContent.successMessage.paymentDetails && (
              <div className="bg-white/20 rounded-xl p-6 mb-6 text-lg font-semibold">
                {registrationContent.successMessage.paymentDetails}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="registration-section"
      className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:50px_50px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 fade-in">
            {registrationContent.title}
          </h2>
          <p className="text-xl text-white/80 fade-in">
            Secure your spot in this transformative journey
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
              {Object.entries(registrationContent.fields).map(
                ([key, field]) => (
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
                )
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-8 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-accent-950 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-accent-950/30 border-t-accent-950 rounded-full animate-spin"></div>
                  <span>Registering...</span>
                </div>
              ) : (
                registrationContent.submitButton
              )}
            </button>

            <p className="text-center text-white/70 mt-6 text-sm">
              By registering, you agree to our terms and conditions
            </p>
          </form>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-accent-300/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary-300/20 rounded-full blur-2xl"></div>
    </section>
  );
}
