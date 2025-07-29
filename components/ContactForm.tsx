
import React, { useState } from "react";
import Separator from "./ui/Separator";
import CircleButton from "./ui/CircleButton";
import Magnetic from "./ui/Magnetic";

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

interface FormField {
  id: string;
  label: string;
  placeholder: string;
  type: "text" | "email" | "textarea";
  required: boolean;
  rows?: number;
}

const ContactForm: React.FC = () => {
  // Form field configurations
  const formFields: FormField[] = [
    {
      id: "name",
      label: "What's your name?",
      placeholder: "John Doe *",
      type: "text",
      required: true,
    },
    {
      id: "email",
      label: "What's your email?",
      placeholder: "john.doe@example.com *",
      type: "email",
      required: true,
    },
    {
      id: "organization",
      label: "What's the name of your organization?",
      placeholder: "John Doe Inc.",
      type: "text",
      required: false,
    },
    {
      id: "services",
      label: "What services are you looking for?",
      placeholder: "Web Design, Web Development...",
      type: "text",
      required: true,
    },
    {
      id: "message",
      label: "Write your message...",
      placeholder: "Hello Snehashis, can you help me with... *",
      type: "textarea",
      required: true,
      rows: 4,
    },
  ];

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
    const validationRules = {
      name: (value: string) => {
        if (!value.trim()) return "please enter a valid name";
        if (value.trim().length < 2)
          return "name must be at least 2 characters";
        return null;
      },
      email: (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) return "please enter a valid email";
        if (!emailRegex.test(value)) return "please enter a valid email format";
        return null;
      },
      organization: (value: string) => {
        if (value.trim() && value.trim().length < 2) {
          return "please enter a valid organization name";
        }
        return null;
      },
      services: (value: string) => {
        if (!value.trim()) return "please enter a valid service";
        if (value.trim().length < 3)
          return "please describe the services you need";
        return null;
      },
      message: (value: string) => {
        if (!value.trim()) return "please enter a valid message";
        if (value.trim().length < 10)
          return "message must be at least 10 characters";
        return null;
      },
    };

    const newErrors = Object.keys(validationRules).reduce((acc, field) => {
      const fieldKey = field as keyof FormData;
      const validator = validationRules[fieldKey];
      const error = validator(formData[fieldKey]);
      if (error) {
        acc[fieldKey] = error;
      }
      return acc;
    }, {} as FormErrors);

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
      setFormData(
        formFields.reduce((acc, field) => {
          acc[field.id as keyof FormData] = "";
          return acc;
        }, {} as FormData)
      );
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
        <Magnetic>
          <CircleButton
            onClick={() => setIsSubmitted(false)}
            size="2xl"
            ariaLabel="Send Another Message"
          >
            Send Another Message
          </CircleButton>
        </Magnetic>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {formFields.map((field, index) => (
        <React.Fragment key={field.id}>
          <Separator width="100%" />
          <div className="flex gap-x-4">
            <h6>{String(index + 1).padStart(2, "0")}</h6>
            <div className="space-y-2 flex-1">
              <label htmlFor={field.id} className="block">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.id}
                  name={field.id}
                  value={formData[field.id as keyof FormData]}
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                  rows={field.rows}
                  className="w-full bg-transparent border-none outline-none text-text-secondary placeholder-text-secondary resize-none"
                  required={field.required}
                />
              ) : (
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  value={formData[field.id as keyof FormData]}
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                  className="w-full bg-transparent border-none outline-none text-text-secondary placeholder-text-secondary"
                  required={field.required}
                />
              )}
              {errors[field.id as keyof FormErrors] && (
                <h6 className="text-error">
                  {errors[field.id as keyof FormErrors]}
                </h6>
              )}
            </div>
          </div>
        </React.Fragment>
      ))}

      <Separator width="100%" />
      <div className="mt-6 text-center">
        <Magnetic>
          <CircleButton
            type="submit"
            size="2xl"
            disabled={isSubmitting}
            ariaLabel="Submit Contact Form"
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </CircleButton>
        </Magnetic>
      </div>
    </form>
  );
};

export default ContactForm;


