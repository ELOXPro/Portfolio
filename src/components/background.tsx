"use client";

import { useSparkles } from "@/app/sparklesContext";
import dynamic from "next/dynamic";

const Sparkles = dynamic(() => import("@/components/sparkles"), { ssr: false });

export default function Home() {
  const { visible } = useSparkles();

  return <>{visible && <Sparkles />}</>;
}
