"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { api } from "@/trpc/react";

export function AddTitle() {
  const utils = api.useUtils();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const addTitle = api.title.add.useMutation({
    onSuccess: (data) => {
      toast[data.result === "Added" ? "success" : "error"](data.result, {
        duration: 1000,
      });
      void utils.title.list.invalidate();
      setName("");
      setLoading(false);
    },
    onError: () => {
      toast.error("Something went wrong", { duration: 1000 });
      setLoading(false);
    },
  });

  const handleSubmit = () => {
    if (!name.trim()) {
      toast.error("Title name is required", {
        duration: 1000,
        className: "!text-red-600",
      });
      return;
    }

    setLoading(true);
    addTitle.mutate(name);
  };

  return (
    <div className="space-y-2 max-w-md mx-auto">
      <Input
        placeholder="Title name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Adding..." : "Add Title"}
      </Button>
    </div>
  );
}
