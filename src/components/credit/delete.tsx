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

export function DeleteCredit() {
  const utils = api.useUtils();
  const { data: credits = [] } = api.credit.list.useQuery();
  const [selectedId, setSelectedId] = useState("");

  const deleteCredit = api.credit.delete.useMutation({
    onSuccess: (data) => {
      toast[data.result === "Deleted" ? "success" : "error"](data.result, {
        duration: 1000,
      });
      void utils.credit.list.invalidate();
      setSelectedId("");
    },
  });

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <Select onValueChange={(id) => setSelectedId(id)}>
        <SelectTrigger>
          <SelectValue placeholder="Select a credit to delete" />
        </SelectTrigger>
        <SelectContent>
          {credits.map((c) => (
            <SelectItem className="capitalize" key={c.id} value={c.id}>
              {c.inspiration}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedId ? (
        <Button variant="destructive" onClick={() => deleteCredit.mutate(selectedId)}>
          Delete Credit
        </Button>
      ) : (
        <div className="flex justify-center items-center h-full">
          Select a credit to delete
        </div>
      )}
    </div>
  );
}
