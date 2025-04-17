"use client";

import { api } from "@/trpc/react";

import RoleTitle from "./ui/title";

export function Titles() {
  const { data: titles = [] } = api.title.list.useQuery();

  return (
    <div className="w-full flex flex-wrap gap-1">
    {titles.map((title, index) => (
      <RoleTitle title={title.name} key={index} />
    ))}
  </div>
  );
}
