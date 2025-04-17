"use client";

import { api } from "@/trpc/react";
import { Pointer } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavButtonProps = {
  title: string;
  variant: string;
};

export default function NavButton({ title, variant }: NavButtonProps) {
  const path = usePathname();
  const { data: other } = api.other.find.useQuery();
  const titled =
    title === "home"
      ? "/"
      : title === "resume"
        ? `${other ? other.resume : "/#"}`
        : `/${title.toLowerCase()}`;

  return (
    <Link
      href={titled}
      target={title ==="resume" ? "_blank" : "_self"} 
      className={`flex text-sm font-bold capitalize tracking-tighter hover:tracking-widest hover:text-foreground
        ${variant === "primary" ? "text-primary" : "text-secondary"} items-center justify-center duration-700
        ${path === titled ? "tracking-widest text-foreground" : ""}`}
    >
      {path === titled && <Pointer className="mr-2 h-4 w-4 rotate-90" />}
      {title}
    </Link>
  );
}
