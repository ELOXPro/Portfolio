'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { ProjectCardProps } from "@/app/projects/page";

export function EditProject() {
  const utils = api.useUtils();
  const [value, setValue] = useState<ProjectCardProps | null>(null);
  const [toolInput, setToolInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: projects } = api.project.list.useQuery({
    featured: false,
  });

  const { data: titles } = api.title.list.useQuery();

  const editProject = api.project.edit.useMutation({
    onSuccess: (data) => {
      if (data.result === "Updated") {
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
    if (!value) return;
    setValue({ ...value, [name]: e });
  }

  function handleAddTool() {
    if (!value) return;
    const trimmedTool = toolInput.trim();
    if (trimmedTool && !value.tools.includes(trimmedTool)) {
      setValue((prev) =>
        prev ? { ...prev, tools: [...prev.tools, trimmedTool] } : null,
      );
      setToolInput("");
    }
  }

  function handleRemoveTool(tool: string) {
    if (!value) return;
    setValue((prev) =>
      prev ? { ...prev, tools: prev.tools.filter((t) => t !== tool) } : null,
    );
  }

  function handleSubmit() {
    if (!value) return;

    const { name, description, type, url, category, tools, img } = value;

    if (!name || !description || !type || !url || !category || !tools.length) {
      toast.error("Select all inputs", {
        duration: 1000,
        className: "!text-red-600",
      });
      return;
    }

    const fields = {
      id: value.id as string,
      name,
      type,
      description,
      url,
      category,
      tools,
      img: img ?? undefined,
    };

    setLoading(true);
    void editProject.mutate(fields);
  }

  return (
    <div className="mx-auto max-w-xl space-y-4 p-4">
      <h2 className="text-xl font-semibold">Edit Project</h2>

      <Select
        onValueChange={(projectId) => {
          const selected = projects?.find((p) => p.id === projectId);
          if (selected) setValue(selected as ProjectCardProps);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a Project" />
        </SelectTrigger>
        <SelectContent className="capitalize">
          {projects?.map((project) => (
            <SelectItem key={project.id} value={project.id}>
              {project.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="mt-2 border-b border-primary w-full" />

      {value ? (
        <>
          <Input
            value={value.name}
            onChange={(e) => handleChange(e.target.value, "name")}
            placeholder="Enter a Title"
          />

          <Select
            value={value.type}
            onValueChange={(val) => handleChange(val, "type")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Project Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="highlight">Highlight</SelectItem>
              <SelectItem value="sample">Sample</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={value.category}
            onValueChange={(val) => handleChange(val, "category")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Project Category" />
            </SelectTrigger>
            <SelectContent>
              {titles?.map((title) => (
                <SelectItem className="capitalize" key={title.id} value={title.id}>
                  {title.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Textarea
            value={value.description}
            onChange={(e) => handleChange(e.target.value, "description")}
            placeholder="Enter a Description"
          />

          <Input
            value={value.url}
            onChange={(e) => handleChange(e.target.value, "url")}
            placeholder="Enter Project URL"
          />

          {/* Tools */}
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

          {/* Image Upload */}
          <div className="space-y-2">
            {value.img ? (
              <div className="flex flex-col items-center gap-2">
                <div className="h-32 w-full overflow-hidden rounded-md border border-dashed border-secondary p-1">
                  <img
                    src={value.img}
                    alt="Cover"
                    className="h-full w-full rounded-md object-cover"
                  />
                </div>
                <Button
                  variant="destructive"
                  type="button"
                  onClick={() => handleChange("", "img")}
                >
                  <Trash size={16} />
                </Button>
              </div>
            ) : (
              <CldUploadWidget
                uploadPreset="portfolio"
                options={{
                  sources: ["local", "url", "google_drive", "dropbox"],
                  multiple: false,
                }}
                onSuccess={(results: CloudinaryUploadWidgetResults) => {
                  if (typeof results.info !== "string") {
                    const url = results.info?.secure_url;
                    if (url) {
                      handleChange(url, "img");
                      toast.success("Cover Image Updated", { duration: 1000 });
                    }
                  } else {
                    toast.error("Invalid response from Cloudinary", {
                      duration: 1000,
                    });
                  }
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="text-sm font-semibold tracking-tighter text-foreground duration-300 hover:tracking-widest"
                  >
                    Upload Cover Image
                  </button>
                )}
              </CldUploadWidget>
            )}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Updating..." : "Update Project"}
          </Button>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          Select a project to edit
        </div>
      )}
    </div>
  );
}
