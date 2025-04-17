"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { api } from "@/trpc/react";

export function AddCredit() {
  const utils = api.useUtils();
  const [form, setForm] = useState({ inspiration: "", url: "", credit: "" });
  const [loading, setLoading] = useState(false);

  const addCredit = api.credit.add.useMutation({
    onSuccess: (data) => {
      toast[data.result === "Added" ? "success" : "error"](data.result, {
        duration: 1000,
      });
      void utils.credit.list.invalidate();
      setForm({ inspiration: "", url: "", credit: "" });
      setLoading(false);
    },
    onError: () => {
      toast.error("Something went wrong", { duration: 1000 });
      setLoading(false);
    },
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const { inspiration, url, credit } = form;
    if (!inspiration || !url || !credit) {
      toast.error("All fields are required", {
        duration: 1000,
        className: "!text-red-600",
      });
      return;
    }

    setLoading(true);
    addCredit.mutate(form);
  };

  return (
    <div className="space-y-2 max-w-md mx-auto">
      <Input
        placeholder="Inspiration"
        value={form.inspiration}
        onChange={(e) => handleChange("inspiration", e.target.value)}
      />
      <Input
        placeholder="URL"
        value={form.url}
        onChange={(e) => handleChange("url", e.target.value)}
      />
      <Input
        placeholder="Credit"
        value={form.credit}
        onChange={(e) => handleChange("credit", e.target.value)}
      />
      <Button disabled={loading} onClick={handleSubmit}>
        {loading ? "Adding..." : "Add Credit"}
      </Button>
    </div>
  );
}
