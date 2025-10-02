"use client";

import { useState } from "react";

interface FormField {
  label: string;
  placeholder: string;
  type: string;
  required: boolean;
}

interface MediaFormContent {
  basicFields: { [key: string]: FormField };
  mediaTypeOptions: Array<{ value: string; label: string }>;
  eventTypeOptions: Array<{ value: string; label: string }>;
  inPersonFields: { [key: string]: FormField };
  virtualFields: { [key: string]: FormField };
  submitButton: string;
}

interface MediaInquiryFormProps {
  formContent: MediaFormContent;
  onSubmit: (data: FormData) => Promise<void>;
  isSubmitting: boolean;
  errorMessage: string;
  onBack: () => void;
}

export default function MediaInquiryForm({
  formContent,
  onSubmit,
  isSubmitting,
  errorMessage,
  onBack,
}: MediaInquiryFormProps) {
  const [mediaType, setMediaType] = useState<string>("");
  const [eventType, setEventType] = useState<"inPerson" | "virtual" | "">("");
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMediaTypeChange = (type: string) => {
    setMediaType(type);
  };

  const handleEventTypeChange = (type: "inPerson" | "virtual") => {
    setEventType(type);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formDataToSubmit = new FormData(form);
    formDataToSubmit.append("mediaType", mediaType);
    formDataToSubmit.append("eventType", eventType);
    await onSubmit(formDataToSubmit);
  };

  const renderField = (key: string, field: FormField) => {
    if (field.type === "textarea") {
      return (
        <div key={key}>
          <label
            htmlFor={key}
            className="block text-lg font-semibold mb-3 text-white"
          >
            {field.label}
            {field.required && <span className="text-accent-300 ml-1">*</span>}
          </label>
          <textarea
            id={key}
            name={key}
            value={formData[key] || ""}
            onChange={handleInputChange}
            placeholder={field.placeholder}
            required={field.required}
            rows={4}
            className="w-full px-6 py-4 bg-white/90 border border-white/30 rounded-xl text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-4 focus:ring-accent-300/50 focus:border-accent-300 transition-all duration-300 text-lg resize-none"
          />
        </div>
      );
    }

    return (
      <div key={key}>
        <label
          htmlFor={key}
          className="block text-lg font-semibold mb-3 text-white"
        >
          {field.label}
          {field.required && <span className="text-accent-300 ml-1">*</span>}
        </label>
        <input
          type={field.type}
          id={key}
          name={key}
          value={formData[key] || ""}
          onChange={handleInputChange}
          placeholder={field.placeholder}
          required={field.required}
          className="w-full px-6 py-4 bg-white/90 border border-white/30 rounded-xl text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-4 focus:ring-accent-300/50 focus:border-accent-300 transition-all duration-300 text-lg"
        />
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl"
    >
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-xl">
          <p className="text-red-100 text-center font-semibold">
            {errorMessage}
          </p>
        </div>
      )}

      {/* Basic Fields */}
      <div className="space-y-6 mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">
          Contact Information
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(formContent.basicFields).map(([key, field]) =>
            renderField(key, field)
          )}
        </div>
      </div>

      {/* Media Type Selection */}
      <div className="mb-8">
        <label className="block text-lg font-semibold mb-4 text-white">
          Type <span className="text-accent-300 ml-1">*</span>
        </label>
        <div className="grid md:grid-cols-3 gap-4">
          {formContent.mediaTypeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleMediaTypeChange(option.value)}
              className={`p-6 rounded-xl border-2 transition-all duration-300 text-center font-semibold text-lg ${
                mediaType === option.value
                  ? "bg-accent-300/30 border-accent-300 text-white shadow-lg"
                  : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:border-white/30"
              }`}
            >
              <div className="flex items-center justify-center space-x-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    mediaType === option.value
                      ? "border-accent-300"
                      : "border-white/40"
                  }`}
                >
                  {mediaType === option.value && (
                    <div className="w-3 h-3 rounded-full bg-accent-300"></div>
                  )}
                </div>
                <span>{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Event Type Selection */}
      <div className="mb-8">
        <label className="block text-lg font-semibold mb-4 text-white">
          Event Format <span className="text-accent-300 ml-1">*</span>
        </label>
        <div className="grid md:grid-cols-2 gap-4">
          {formContent.eventTypeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                handleEventTypeChange(option.value as "inPerson" | "virtual")
              }
              className={`p-6 rounded-xl border-2 transition-all duration-300 text-center font-semibold text-lg ${
                eventType === option.value
                  ? "bg-accent-300/30 border-accent-300 text-white shadow-lg"
                  : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:border-white/30"
              }`}
            >
              <div className="flex items-center justify-center space-x-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    eventType === option.value
                      ? "border-accent-300"
                      : "border-white/40"
                  }`}
                >
                  {eventType === option.value && (
                    <div className="w-3 h-3 rounded-full bg-accent-300"></div>
                  )}
                </div>
                <span>{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Conditional Fields Based on Event Type */}
      {eventType && (
        <div className="space-y-6 mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            Additional Details
          </h3>
          <div className="grid md:grid-cols-1 gap-6">
            {eventType === "inPerson" &&
              Object.entries(formContent.inPersonFields).map(([key, field]) =>
                renderField(key, field)
              )}
            {eventType === "virtual" &&
              Object.entries(formContent.virtualFields).map(([key, field]) =>
                renderField(key, field)
              )}
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !mediaType || !eventType}
        className="w-full mt-8 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-accent-950 font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-accent-950/30 border-t-accent-950 rounded-full animate-spin"></div>
            <span>Submitting...</span>
          </div>
        ) : (
          formContent.submitButton
        )}
      </button>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={onBack}
          className="text-white/70 hover:text-white font-semibold transition-colors"
        >
          ← Back
        </button>
      </div>
    </form>
  );
}
