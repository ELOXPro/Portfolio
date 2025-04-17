"use client";

import { api } from "@/trpc/react";


export default function Credits() {

  const { data: info = [] } = api.credit.list.useQuery();

  return (
    <div className="flex h-full w-full flex-col p-8 justify-between gap-2">
      {info.map((item, index) => (
        <div
          key={index}
          className="flex flex-col gap-1 items-end justify-center text-primary capitalize"
        >
          <p className="text-sm font-extrabold">{item.inspiration}</p>
          <a href={item.url} className="text-sm font-light tracking-tighter duration-300 hover:tracking-widest">{item.credit}</a>
        </div>
      ))}
    </div>
  );
}
