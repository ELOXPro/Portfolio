"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { ProjectCardProps } from "@/app/projects/page";
import { Textarea } from "../ui/textarea";

export function AddProject() {
  const utils = api.useUtils();
  const [value, setValue] = useState<ProjectCardProps>({
    name: "",
    description: "",
    type: "",
    category: "",
    tools: [],
    url: "",
    img: "",
  });
  const [toolInput, setToolInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: titles } = api.title.list.useQuery();
  const addProject = api.project.add.useMutation({
    onSuccess: (data) => {
      if (data.result.includes("Added")) {
        toast.success(data.result, { duration: 1000 });
        setLoading(false);
        void utils.invalidate();
      } else {
        toast.error(data.result, { duration: 1000 });
        setLoading(false);
      }
    },
  });

  function handleChange(e: string | Date | undefined, name: string) {
    setValue({ ...value, [name]: e });
  }

  function handleAddTool() {
    const trimmedTool = toolInput.trim();
    if (trimmedTool && !value.tools.includes(trimmedTool)) {
      setValue((prev) => ({
        ...prev,
        tools: [...prev.tools, trimmedTool],
      }));
      setToolInput("");
    }
  }

  function handleRemoveTool(tool: string) {
    setValue((prev) => ({
      ...prev,
      tools: prev.tools.filter((t) => t !== tool),
    }));
  }

  function handleSubmit() {
    if (
      !value.name ||
      !value.description ||
      !value.type ||
      !value.url ||
      !value.category ||
      !value.tools.length
    ) {
      toast.error("Select all inputs", {
        duration: 1000,
        className: "!text-red-600",
      });
      return;
    }

    const fields = {
      name: value.name,
      type: value.type,
      description: value.description,
      url: value.url,
      category: value.category,
      tools: value.tools,
    };
    setLoading(true);
    void addProject.mutate(fields);
  }

  return (
    <div className="grid items-start gap-2 py-4">
      <Input
        value={value.name}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, name: e.target.value }))
        }
        placeholder="Enter a Title"
      />

      <Select onValueChange={(value) => handleChange(value, "type")}>
        <SelectTrigger>
          <SelectValue placeholder="Project Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="highlight">Highlight</SelectItem>
          <SelectItem value="sample">Sample</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleChange(value, "category")}>
        <SelectTrigger>
          <SelectValue placeholder="Project Category" />
        </SelectTrigger>
        <SelectContent>
          {titles?.map((title) => (
            <SelectItem key={title.id} value={title.id}>
              {title.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Textarea
        value={value.description}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, description: e.target.value }))
        }
        placeholder="Enter a Description"
      />

      <Input
        value={value.url}
        onChange={(e) => setValue((prev) => ({ ...prev, url: e.target.value }))}
        placeholder="Enter Project Url"
      />
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            value={toolInput}
            onChange={(e) => setToolInput(e.target.value)}
            placeholder="Add a tool (e.g., React)"
          />
          <Button type="button" onClick={handleAddTool}>
            Add Tool
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {value.tools.map((tool) => (
            <span
              key={tool}
              className="flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-sm"
            >
              {tool}
              <button
                type="button"
                onClick={() => handleRemoveTool(tool)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <Button disabled={loading} onClick={handleSubmit}>
        {loading ? "Adding..." : "Add"}
      </Button>
    </div>
  );
}
