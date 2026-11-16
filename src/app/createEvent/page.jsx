"use client";

import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  CirclePlus,
  Image as ImageIcon,
  Mail,
  MapPin,
  PencilLine,
  Sparkles,
  Tag,
} from "lucide-react";

import { getTodayInputValue } from "@/lib/events";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const initialFormData = {
  title: "",
  category: "Donation",
  date: "",
  location: "",
  thumbnail: "",
  description: "",
};

const CreateEventPage = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const dateInputRef = useRef(null);

  useEffect(() => {
    if (dateInputRef.current) {
      dateInputRef.current.min = getTodayInputValue();
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setTermsAccepted(false);
    setFeedback(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.date || formData.date < getTodayInputValue()) {
      setFeedback({
        type: "error",
        message: "Please choose today or a future date.",
      });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch(`${API_URL}/createEvent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Failed to publish the event.");
      }

      resetForm();
      setFeedback({
        type: "success",
        message: "Event published successfully!",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error.message || "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/50 focus:border-brand-accent focus:bg-card focus:ring-4 focus:ring-brand-soft";

  const labelStyle = "mb-2 block text-sm font-semibold text-brand-ink/80";

  const iconStyle =
    "pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-brand-muted/70";

  return (
    <main className="min-h-[calc(100svh-104px)] bg-brand-surface px-4 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-xs font-semibold text-brand-ink">
            <Sparkles size={16} aria-hidden="true" />
            Make a Difference
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-brand-ink sm:text-4xl">
            Create a Community Event
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-brand-muted sm:text-base">
            Bring people together for a meaningful cause. Create an event,
            invite volunteers, and make a positive impact in your community.
          </p>
        </div>

        {/* Form Card */}
        <div className="overflow-hidden rounded-[32px] border border-border bg-card shadow-[0_30px_70px_-45px_rgba(10,61,43,0.5)]">
          {/* Card Header */}
          <div className="border-b border-border bg-brand-soft/40 px-6 py-6 sm:px-9">
            <h2 className="text-lg font-bold text-brand-ink">Event Information</h2>
            <p className="mt-1 text-sm text-brand-muted">
              Fill in the details to publish your community event.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            onReset={resetForm}
            className="space-y-7 p-6 sm:p-9"
          >
            {/* Event Title */}
            <div>
              <label htmlFor="event-title" className={labelStyle}>
                Event Title <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <PencilLine
                  className={iconStyle}
                  size={19}
                  aria-hidden="true"
                />

                <input
                  id="event-title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Winter Clothes Distribution - Dhaka"
                  className={`${inputStyle} pl-11`}
                />
              </div>
            </div>

            {/* Event Type and Date */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="event-category" className={labelStyle}>
                  Event Category <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Tag className={iconStyle} size={19} aria-hidden="true" />

                  <select
                    id="event-category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className={`${inputStyle} appearance-none pr-11 pl-11`}
                  >
                    <option value="Donation">Donation</option>
                    <option value="Environment">Environment</option>
                    <option value="Education">Education</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Community Support">Community Support</option>
                    <option value="Animal Welfare">Animal Welfare</option>
                  </select>

                  <ChevronDown
                    className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-brand-muted/70"
                    size={18}
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="event-date" className={labelStyle}>
                  Event Date <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <CalendarDays
                    className={iconStyle}
                    size={19}
                    aria-hidden="true"
                  />

                  <input
                    id="event-date"
                    ref={dateInputRef}
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className={`${inputStyle} pl-11`}
                  />
                </div>

                <p className="mt-2 text-xs text-brand-muted/70">
                  Choose today or a future date.
                </p>
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="event-location" className={labelStyle}>
                Event Location <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <MapPin className={iconStyle} size={19} aria-hidden="true" />

                <input
                  id="event-location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Ramna Park, Dhaka"
                  className={`${inputStyle} pl-11`}
                />
              </div>
            </div>

            {/* Thumbnail URL */}
            <div>
              <label htmlFor="event-thumbnail" className={labelStyle}>
                Event Thumbnail Image URL{" "}
                <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <ImageIcon
                  className={iconStyle}
                  size={19}
                  aria-hidden="true"
                />

                <input
                  id="event-thumbnail"
                  name="thumbnail"
                  type="url"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  required
                  placeholder="https://images.unsplash.com/photo-..."
                  className={`${inputStyle} pl-11`}
                />
              </div>

              <p className="mt-2 text-xs text-brand-muted/70">
                Use a high-quality image that represents your event.
              </p>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="event-description" className={labelStyle}>
                Event Description <span className="text-red-500">*</span>
              </label>

              <textarea
                id="event-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Describe your event, its purpose, volunteer requirements, and how people can contribute..."
                className={`${inputStyle} resize-y`}
              />

              <p className="mt-2 text-xs text-brand-muted/70">
                Make your description clear and engaging.
              </p>
            </div>

            {/* Organizer Information */}
            <div className="rounded-xl border border-border bg-brand-soft/40 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-brand-ink">
                  <Mail size={20} aria-hidden="true" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-brand-ink">
                    Event Organizer
                  </h3>
                  <p className="mt-1 text-xs text-brand-muted">
                    Your registered account will be attached to this event.
                  </p>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                id="event-terms"
                name="terms"
                type="checkbox"
                value="accepted"
                checked={termsAccepted}
                onChange={(event) => setTermsAccepted(event.target.checked)}
                required
                className="mt-1 h-4 w-4 accent-brand"
              />

              <label
                htmlFor="event-terms"
                className="text-xs leading-6 text-brand-muted"
              >
                I confirm that the information provided is accurate and
                this event follows HelpHive&apos;s community guidelines.
              </label>
            </div>

            {/* Submission Feedback */}
            {feedback && (
              <div
                role={feedback.type === "error" ? "alert" : "status"}
                aria-live="polite"
                className={`rounded-xl border px-4 py-3 text-sm font-medium ${
                  feedback.type === "error"
                    ? "border-red-200 bg-red-50 text-red-600"
                    : "border-brand-accent/30 bg-brand-soft text-brand-ink"
                }`}
              >
                {feedback.message}
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
              <button
                type="reset"
                className="rounded-full border border-border px-7 py-3 text-sm font-semibold text-brand-ink transition hover:bg-brand-soft/60"
              >
                Reset Form
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-3 text-sm font-bold text-white shadow-[0_16px_30px_-18px_rgba(10,61,43,0.7)] transition duration-300 hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <CirclePlus size={20} aria-hidden="true" />
                {isSubmitting ? "Publishing..." : "Publish Community Event"}
              </button>
            </div>
          </form>
        </div>

        {/* Bottom Note */}
        <p className="mt-6 text-center text-xs text-brand-muted/70">
          Every small action creates a bigger impact. Thank you for being
          part of HelpHive.
        </p>
      </div>
    </main>
  );
};

export default CreateEventPage;
