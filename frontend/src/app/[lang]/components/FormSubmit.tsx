"use client";
import { useState } from "react";
import { getStrapiURL } from "../utils/api-helpers";
import { ArrowRight } from "lucide-react";

export default function FormSubmit({
  placeholder,
}: {
  placeholder: string;
  text?: string;
}) {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // voorkom page reload

    const res = await fetch(getStrapiURL() + "/api/lead-form-submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: { email } }),
    });

    if (!res.ok) {
      return;
    }

    setSuccessMessage("Gelukt!");
    setEmail("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto flex flex-col gap-4"
    >
      {successMessage ? (
        <p>{successMessage}</p>
      ) : (
        <div className="flex border-b border-gray-800">
          <input
            type="email"
            required
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent border-none focus:outline-none px-2 py-3 text-lg"
          />
          <button
            type="submit"
            className="p-3 hover:text-primary transition"
            aria-label="Submit email"
          >
            <ArrowRight />
          </button>
        </div>
      )}
    </form>
  );
}
