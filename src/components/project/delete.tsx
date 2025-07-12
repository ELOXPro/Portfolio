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

export function DeleteProject() {
  const utils = api.useUtils();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { data: projects } = api.project.list.useQuery({
    featured: false,
  });

  const deleteProject = api.project.delete.useMutation({
    onSuccess: (data) => {
      if (data.result === "Deleted") {
        toast.success("Project deleted successfully", {
          duration: 1000,
          className: "!text-green-600",
        });
        setSelectedId(null);
        void utils.invalidate();
      } else {
        toast.error("Failed to delete project", {
          duration: 1000,
          className: "!text-red-600",
        });
      }
      setLoading(false);
    },
  });

  const handleDelete = () => {
    if (!selectedId) {
      toast.error("Please select a project");
      return;
    }

    const confirmDelete = confirm(
      "Are you sure you want to delete this project?",
    );
    if (!confirmDelete) return;

    setLoading(true);
    deleteProject.mutate(selectedId);
  };

  return (
    <div className="mx-auto max-w-xl space-y-4 p-4">
      <h2 className="text-xl font-semibold">Delete Project</h2>

      <Select
        onValueChange={(val) => setSelectedId(val)}
        value={selectedId ?? ""}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a Project to Delete" />
        </SelectTrigger>
        <SelectContent>
          {projects?.map((project) => (
              <SelectItem
                className="capitalize"
                key={project.id}
                value={project.id}
              >
                {project.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <div className="mt-2 w-full border-b border-primary" />

      {selectedId ? (
        <Button
          onClick={handleDelete}
          disabled={loading}
          variant="destructive"
          className="w-full"
        >
          {loading ? "Deleting..." : "Delete Project"}
        </Button>
      ) : (
        <div className="flex h-full items-center justify-center">
          Select a project to delete
        </div>
      )}
    </div>
  );
}
