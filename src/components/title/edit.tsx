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

// Define the Title type
interface Title {
  id: string;
  name: string;
}

export function EditTitle() {
  const utils = api.useUtils();
  const { data: titles = [] } = api.title.list.useQuery();
  const [selected, setSelected] = useState<Title | null>(null); // Proper typing for selected
  const [loading, setLoading] = useState(false);

  const editTitle = api.title.edit.useMutation({
    onSuccess: (data) => {
      toast[data.result === "Updated" ? "success" : "error"](data.result, {
        duration: 1000,
      });
      void utils.title.list.invalidate();
      setLoading(false);
    },
    onError: () => {
      toast.error("Something went wrong", { duration: 1000 });
      setLoading(false);
    },
  });

  const handleChange = (field: keyof Title, value: string) => { // Use keyof Title for safer property access
    setSelected((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSubmit = () => {
    if (!selected?.name?.trim()) {
      toast.error("Title name cannot be empty", {
        duration: 1000,
        className: "!text-red-600",
      });
      return;
    }

    setLoading(true);
    editTitle.mutate({ id: selected.id, name: selected.name });
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <Select
        onValueChange={(id) => {
          const found = titles.find((t) => t.id === id);
          if (found) setSelected(found);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a title to edit" />
        </SelectTrigger>
        <SelectContent>
          {titles.map((t) => (
            <SelectItem key={t.id} value={t.id}>
              {t.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selected && (
        <>
          <Input
            placeholder="New title name"
            value={selected.name}
            onChange={(e) => handleChange("name", e.target.value)} // Type-safe change handler
          />
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Updating..." : "Update Title"}
          </Button>
        </>
      )}
    </div>
  );
}
