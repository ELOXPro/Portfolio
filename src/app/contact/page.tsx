"use client";

import {
  Facebook,
  Github,
  Instagram,
  Link,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { api } from "@/trpc/react";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({
    names: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  

  const { data: info = [] } = api.contact.list.useQuery();

  const handleSubmit = () => {

    if (!form.names || !form.email || !form.message) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    emailjs
      .send(
        "elox_pro",
        "template_i7n355h",
        {
          from_name: form.names,
          to_name: "Eloi",
          from_email: form.email,
          to_email: "iradeloi41@gmail.com",
          from_phone: "",
          message: form.message,
        },
        "LA35jViYUIgiv9AR5",
      )
      .then(
        () => {
          setLoading(false);
          toast.success("Thank you. I will get back to you as soon as possible.");
          setForm({
            names: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          toast.error("Ahh, something went wrong. Please try again.");
        },
      );
  };

  return (
    <div className="flex h-[95vh] w-[70%] flex-col p-8">
      <div className="flex h-1/2 w-full flex-col justify-center gap-1 text-sm text-primary">
          <div className="text-xs">Name:</div>
          <input
            name="names"
            value={form.names}
            onChange={handleChange}
            className="w-full sm:w-2/3 appearance-none border border-primary bg-transparent p-1 text-foreground decoration-inherit focus:outline-none"
          />
          <div className="text-xs">Email / Phone Number:</div>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full sm:w-2/3 appearance-none border border-primary bg-transparent p-1 text-foreground decoration-inherit focus:outline-none"
          />
          <div className="text-xs">Quick Message:</div>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="h-1/2 w-full sm:w-2/3 appearance-none border border-primary bg-transparent p-1 text-foreground decoration-inherit focus:outline-none"
          />
        <button
          disabled={loading}
          onClick={handleSubmit}
          className={`mt-2 w-fit bg-transparent p-1 font-bold tracking-tighter ${loading ? "text-muted cursor-not-allowed" : "text-primary"}  duration-300 hover:tracking-widest`}
        >
          Quick Submit
        </button>
      </div>
      <div className="mt-4 flex h-1/2 w-full flex-col justify-start text-primary">
        <div className="flex h-1/2 w-full flex-col items-end text-sm">
          <div className="font-black">Contacts:</div>
          <div className="mt-2 grid w-1/2 grid-cols-2 items-end gap-1 overflow-y-scroll font-medium capitalize scrollbar-hide">
            {info.map(
              (item, index) =>
                item.type === "contact" && (
                  <a
                    href={item.url}
                    className="flex h-8 items-center justify-end overflow-clip tracking-tighter duration-300 hover:tracking-widest"
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                  >
                    {item.title === "email" ? (
                      <Mail className="mr-1 h-4 w-4" />
                    ) : item.title.includes("0") ? (
                      <Phone className="mr-1 h-4 w-4" />
                    ) : item.title === "whatsapp" ? (
                      <MessageCircle className="mr-1 h-4 w-4" />
                    ) : (
                      <Link className="mr-1 h-4 w-4" />
                    )}
                    <div className="text-ellipsis text-right">{item.title}</div>
                  </a>
                ),
            )}
          </div>
        </div>
        <div className="flex h-1/2 w-full flex-col items-start text-sm">
          <div className="font-black">Socials:</div>
          <div className="mt-2 grid w-1/2 grid-cols-3 justify-end gap-1 overflow-y-scroll font-medium capitalize scrollbar-hide">
            {info.map(
              (item, index) =>
                item.type === "social" && (
                  <a
                    href={item.url}
                    className="flex h-8 items-center justify-start overflow-clip tracking-tighter duration-300 hover:tracking-widest"
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                  >
                    {item.title === "instagram" ? (
                      <Instagram className="mr-1 h-4 w-4" />
                    ) : item.title === "facebook" ? (
                      <Facebook className="mr-1 h-4 w-4" />
                    ) : item.title === "github" ? (
                      <Github className="mr-1 h-4 w-4" />
                    ) : item.title === "linkedin" ? (
                      <Linkedin className="mr-1 h-4 w-4" />
                    ) : item.title === "twitter" ? (
                      <Twitter className="mr-1 h-4 w-4" />
                    ) : item.title === "youtube" ? (
                      <Youtube className="mr-1 h-4 w-4" />
                    ) : (
                      <Link className="mr-1 h-4 w-4" />
                    )}
                    <div className="text-ellipsis text-left">{item.title}</div>
                  </a>
                ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
