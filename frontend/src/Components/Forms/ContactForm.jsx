import { createContactInquiry } from "@/Services/contact";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.name.trim().length < 5) {
      toast.error("name must be more than 5 try to enter first and last name");
    }
    if (!emailRegex.test(formData.email)) {
      toast.error("plase enter a valid email");
    }
    if (formData.subject < 5) {
      toast.error("enter a valid subject");
    }
    if (formData.message < 5) {
      toast.error(" please explain more in your message");
    }
    try {
      const response = await createContactInquiry(formData);
      if (response.data) {
        toast.success(response.message);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch {
      toast.error("something went wrong please try again later");
    }
  };
  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      {/* Name */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="font-manrope text-sm font-bold text-dark-card dark:text-gray-200"
        >
          Name
        </label>

        <input
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
          id="name"
          type="text"
          placeholder="Your name"
          className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent px-4 py-3 outline-none transition focus:border-gold-dark"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="font-manrope text-sm font-bold text-dark-card dark:text-gray-200"
        >
          Email
        </label>

        <input
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
          id="email"
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent px-4 py-3 outline-none transition focus:border-gold-dark"
        />
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="subject"
          className="font-manrope text-sm font-bold text-dark-card dark:text-gray-200"
        >
          Subject
        </label>

        <input
          value={formData.subject}
          onChange={(e) =>
            setFormData({
              ...formData,
              subject: e.target.value,
            })
          }
          id="subject"
          type="text"
          placeholder="What is this about?"
          className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent px-4 py-3 outline-none transition focus:border-gold-dark"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="font-manrope text-sm font-bold text-dark-card dark:text-gray-200"
        >
          Message
        </label>

        <textarea
          value={formData.message}
          onChange={(e) =>
            setFormData({
              ...formData,
              message: e.target.value,
            })
          }
          id="message"
          rows="5"
          placeholder="Tell us how we can help..."
          className="w-full resize-none rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent px-4 py-3 outline-none transition focus:border-gold-dark"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-gold-dark px-6 py-3.5 font-manrope font-bold text-white transition hover:opacity-90 active:scale-[0.98]"
      >
        Send Message
      </button>
    </form>
  );
}
