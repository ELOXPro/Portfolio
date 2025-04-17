"use client";

import { SparklesCore } from "@/components/ui/sparkles";
import { useTheme } from "next-themes";

export default function BackgroundSparkles() {
  const { theme } = useTheme();

  return (
    <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.8}
        particleDensity={100}
        className="absolute top-0 -z-10 h-full w-full"
        particleColor={theme === "light" ? "#1d4ed8" : "#dc2626"}
      />
  );
}
