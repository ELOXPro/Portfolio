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

// Define the type for a Credit
interface Credit {
  id: string;
  inspiration: string;
  url: string;
  credit: string;
}

export function EditCredit() {
  const utils = api.useUtils();
  const { data: credits = [] } = api.credit.list.useQuery<Credit[]>(); // Type the query response as Credit[]
  const [selected, setSelected] = useState<Credit | null>(null); // Type the selected state
  const [loading, setLoading] = useState(false);

  const editCredit = api.credit.edit.useMutation({
    onSuccess: (data) => {
      toast[data.result === "Updated" ? "success" : "error"](data.result, {
        duration: 1000,
      });
      void utils.credit.list.invalidate();
      setLoading(false);
    },
    onError: () => {
      toast.error("Something went wrong", { duration: 1000 });
      setLoading(false);
    },
  });

  const handleChange = (field: string, value: string) => {
    if (selected) {
      setSelected((prev) => (prev ? { ...prev, [field]: value } : null));
    }
  };

  const handleSubmit = () => {
    if (
      !selected?.inspiration?.trim() ||
      !selected?.url?.trim() ||
      !selected?.credit?.trim()
    ) {
      toast.error("All fields are required", {
        duration: 1000,
        className: "!text-red-600",
      });
      return;
    }

    setLoading(true);
    editCredit.mutate(selected);
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <Select
        onValueChange={(id) => {
          const credit = credits.find((c) => c.id === id);
          if (credit) setSelected(credit);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a credit to edit" />
        </SelectTrigger>
        <SelectContent>
          {credits.map((c) => (
            <SelectItem key={c.id} value={c.id}>
              {c.inspiration}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selected && (
        <>
          <Input
            value={selected.inspiration}
            onChange={(e) => handleChange("inspiration", e.target.value)}
            placeholder="Inspiration"
          />
          <Input
            value={selected.url}
            onChange={(e) => handleChange("url", e.target.value)}
            placeholder="URL"
          />
          <Input
            value={selected.credit}
            onChange={(e) => handleChange("credit", e.target.value)}
            placeholder="Credit"
          />
          <Button disabled={loading} onClick={handleSubmit}>
            {loading ? "Updating..." : "Update Credit"}
          </Button>
        </>
      )}
    </div>
  );
}
