"use client";

import { useState } from "react";
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

export function DeleteTitle() {
  const utils = api.useUtils();
  const { data: titles = [] } = api.title.list.useQuery();
  const [selectedId, setSelectedId] = useState("");

  const deleteTitle = api.title.delete.useMutation({
    onSuccess: (data) => {
      toast[data.result === "Deleted" ? "success" : "error"](data.result, { duration: 1000 });
      void utils.title.list.invalidate();
      setSelectedId("");
    },
  });

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <Select onValueChange={(id) => setSelectedId(id)}>
        <SelectTrigger>
          <SelectValue placeholder="Select a title to delete" />
        </SelectTrigger>
        <SelectContent>
          {titles.map((t) => (
            <SelectItem key={t.id} value={t.id}>
              {t.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="mt-2 border-b border-primary w-full" />

      {selectedId ? (
        <Button variant="destructive" onClick={() => deleteTitle.mutate(selectedId)}>
          Delete Title
        </Button>
      ) : (
        <div className="flex justify-center items-center h-full">
          Select a title to delete
        </div>
      )}
    </div>
  );
}
