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

export function DeleteContact() {
  const utils = api.useUtils();
  const { data: contacts = [] } = api.contact.list.useQuery();
  const [selectedId, setSelectedId] = useState("");

  const deleteContact = api.contact.delete.useMutation({
    onSuccess: (data) => {
      toast[data.result === "Deleted" ? "success" : "error"](data.result, {
        duration: 1000,
      });
      void utils.contact.list.invalidate();
      setSelectedId("");
    },
  });

  const handleDelete = () => {
    if (selectedId) deleteContact.mutate(selectedId);
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <Select onValueChange={(id) => setSelectedId(id)}>
        <SelectTrigger>
          <SelectValue placeholder="Select a contact to delete" />
        </SelectTrigger>
        <SelectContent>
          {contacts.map((c) => (
            <SelectItem key={c.id} value={c.id}>
              {c.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedId && (
        <Button variant="destructive" onClick={handleDelete}>
          Delete Contact
        </Button>
      )}
    </div>
  );
}
