"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function AddContact() {
  const utils = api.useUtils();
  const [form, setForm] = useState({ title: "", type: "", url: "" });
  const [loading, setLoading] = useState(false);

  const addContact = api.contact.add.useMutation({
    onSuccess: (data) => {
      toast[data.result === "Added" ? "success" : "error"](data.result, { duration: 1000 });
      void utils.contact.list.invalidate();
      setForm({ title: "", type: "", url: "" });
      setLoading(false);
    },
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.title || !form.type || !form.url) {
      toast.error("Please fill all fields", { duration: 1000 });
      return;
    }
    setLoading(true);
    addContact.mutate(form);
  };

  return (
    <div className="space-y-2 max-w-md mx-auto">
      <Input
        placeholder="Contact Title"
        value={form.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />
      <Select onValueChange={(val) => handleChange("type", val)}>
        <SelectTrigger>
          <SelectValue placeholder="Select Contact Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="social">Social</SelectItem>
          <SelectItem value="contact">Contact</SelectItem>
        </SelectContent>
      </Select>
      <Input
        placeholder="Contact URL"
        value={form.url}
        onChange={(e) => handleChange("url", e.target.value)}
      />
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Adding..." : "Add Contact"}
      </Button>
    </div>
  );
}
