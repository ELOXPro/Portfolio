"use client";

import { useSparkles } from "@/app/sparklesContext";
import { Sparkles } from "lucide-react";

export default function SparklesToggle() {
  const { visible, toggle } = useSparkles();

  return (
    <button onClick={toggle}>
      <Sparkles
        className={`${visible ? "fill-none text-muted-foreground" : "fill-primary text-primary"} mt-4 h-6 w-6 hover:text-foreground hover:fill-foreground duration-300`}
      />
    </button>
  );
}
