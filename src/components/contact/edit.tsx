'use client';

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

// Define the type for a Contact
interface Contact {
  id: string;
  title: string;
  type: "social" | "contact";
  url: string;
}

export function EditContact() {
  const utils = api.useUtils();
  const { data: contacts = [] } = api.contact.list.useQuery<Contact[]>();
  const [selected, setSelected] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(false);

  const editContact = api.contact.edit.useMutation({
    onSuccess: (data) => {
      toast[data.result === "Updated" ? "success" : "error"](data.result, { duration: 1000 });
      void utils.contact.list.invalidate();
      setLoading(false);
    },
  });

  const handleChange = (field: string, value: string) => {
    if (selected) {
      setSelected((prev) => (prev ? { ...prev, [field]: value } : null));
    }
  };

  const handleSubmit = () => {
    if (!selected?.title || !selected?.type || !selected?.url) {
      toast.error("Please fill all fields", { duration: 1000 });
      return;
    }
    setLoading(true);
    editContact.mutate(selected);
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <Select
        onValueChange={(id) => {
          const contact = contacts.find((c) => c.id === id);
          if (contact) setSelected(contact);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a contact to edit" />
        </SelectTrigger>
        <SelectContent>
          {contacts.map((c) => (
            <SelectItem className="capitalize" key={c.id} value={c.id}>
              {c.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="mt-2 border-b border-primary w-full" />

      {selected ? (
        <>
          <Input
            value={selected.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Contact Title"
          />
          <Select
            value={selected.type}
            onValueChange={(val) => handleChange("type", val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Contact Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="social">Social</SelectItem>
              <SelectItem value="contact">Contact</SelectItem>
            </SelectContent>
          </Select>
          <Input
            value={selected.url}
            onChange={(e) => handleChange("url", e.target.value)}
            placeholder="Contact URL"
          />
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Updating..." : "Update Contact"}
          </Button>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          Select a contact to edit
        </div>
      )}
    </div>
  );
}
