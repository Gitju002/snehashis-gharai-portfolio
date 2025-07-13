"use client";

import React, { useState } from "react";
import Separator from "./ui/Separator";
import CircleButton from "./ui/CircleButton";

interface FormData {
  name: string;
  email: string;
  organization: string;
  services: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  organization?: string;
  services?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    organization: "",
    services: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "please enter a valid name";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "please enter a valid email";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "please enter a valid email format";
    }

    // Organization validation (optional field)
    if (
      formData.organization.trim() &&
      formData.organization.trim().length < 2
    ) {
      newErrors.organization = "please enter a valid organization name";
    }

    // Services validation
    if (!formData.services.trim()) {
      newErrors.services = "please enter a valid service";
    } else if (formData.services.trim().length < 3) {
      newErrors.services = "please describe the services you need";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "please enter a valid message";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form submitted:", formData);
      setIsSubmitted(true);

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        organization: "",
        services: "",
        message: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Thank you!</h2>
        <p className="text-text-secondary mb-6">
          Your message has been sent successfully. I&apos;ll get back to you
          soon.
        </p>
        <CircleButton
          text="Send Another Message"
          onClick={() => setIsSubmitted(false)}
          size="2xl"
          ariaLabel="Send Another Message"
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Separator width="100%" />
      <div className="flex gap-x-4">
        <h6>01</h6>
        <div className="space-y-2 flex-1">
          <label htmlFor="name" className="block">
            What&apos;s your name?
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="John Doe *"
            className="w-full bg-transparent border-none outline-none text-text-secondary placeholder-text-secondary"
            required
          />
          {errors.name && <h6 className="text-error">{errors.name}</h6>}
        </div>
      </div>

      <Separator width="100%" />
      <div className="flex gap-x-4">
        <h6>02</h6>
        <div className="space-y-2 flex-1">
          <label htmlFor="email" className="block">
            What&apos;s your email?
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john.doe@example.com *"
            className="w-full bg-transparent border-none outline-none text-text-secondary placeholder-text-secondary"
            required
          />
          {errors.email && <h6 className="text-error">{errors.email}</h6>}
        </div>
      </div>

      <Separator width="100%" />
      <div className="flex gap-x-4">
        <h6>03</h6>
        <div className="space-y-2 flex-1">
          <label htmlFor="organization" className="block">
            What&apos;s the name of your organization?
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleInputChange}
            placeholder="John Doe Inc."
            className="w-full bg-transparent border-none outline-none text-text-secondary placeholder-text-secondary"
          />
          {errors.organization && (
            <h6 className="text-error">{errors.organization}</h6>
          )}
        </div>
      </div>

      <Separator width="100%" />
      <div className="flex gap-x-4">
        <h6>04</h6>
        <div className="space-y-2 flex-1">
          <label htmlFor="services" className="block">
            What services are you looking for?
          </label>
          <input
            type="text"
            id="services"
            name="services"
            value={formData.services}
            onChange={handleInputChange}
            placeholder="Web Design, Web Development..."
            className="w-full bg-transparent border-none outline-none text-text-secondary placeholder-text-secondary"
            required
          />
          {errors.services && <h6 className="text-error">{errors.services}</h6>}
        </div>
      </div>

      <Separator width="100%" />
      <div className="flex gap-x-4">
        <h6>05</h6>
        <div className="space-y-2 flex-1">
          <label htmlFor="message" className="block">
            Write your message...
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Hello Snehashis, can you help me with... *"
            rows={4}
            className="w-full bg-transparent border-none outline-none text-text-secondary placeholder-text-secondary resize-none"
            required
          />
          {errors.message && <h6 className="text-error">{errors.message}</h6>}
        </div>
      </div>

      <Separator width="100%" />

      <div className="mt-6 text-center">
        <CircleButton
          text={isSubmitting ? "Sending..." : "Submit"}
          type="submit"
          size="2xl"
          disabled={isSubmitting}
          ariaLabel="Submit Contact Form"
        />
      </div>
    </form>
  );
};

export default ContactForm;
