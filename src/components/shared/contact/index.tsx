"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getApiUrl } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import ScheduleCall from "./schedule";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subscribe: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // Simulate sending form data (Replace with actual email service)
    try {
      const response = await fetch(`${getApiUrl()}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "", subscribe: false });
      } else {
        setError("Failed to send the message. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
          Get in Touch
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700/30 dark:text-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700/30 dark:text-gray-100"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-900 dark:text-gray-100"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="mt-1 block w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700/30 dark:text-gray-100"
            />
          </div>

          <div className="flex items-center">
            <Checkbox
              id="subscribe"
              name="subscribe"
              checked={formData.subscribe}
              onCheckedChange={(checked: boolean) =>
                setFormData({ ...formData, subscribe: checked })
              }
            />
            <label
              htmlFor="subscribe"
              className="ml-2 block text-sm font-medium text-gray-900 dark:text-gray-100"
            >
              Subscribe to my newsletter ?
            </label>
          </div>

          {/* Submit Button */}
          <Button
            variant="outline"
            type="submit"
            disabled={loading}
            className="w-full bg-gray-100 dark:bg-gray-700/30 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
          >
            {loading ? "Sending..." : "Send Message"}
          </Button>

          {/* Error/Success Message */}
          {success && (
            <p className="text-green-500 text-center mt-4">
              Message sent successfully!
            </p>
          )}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>

        {/* Schedule a Call */}
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Or
          </h3>
          <ScheduleCall />
        </div>
      </div>
    </section>
  );
};

export default Contact;
