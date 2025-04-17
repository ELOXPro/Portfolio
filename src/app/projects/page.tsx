"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { X, Star, Pointer } from "lucide-react";
import { api } from "@/trpc/react";

export type ProjectCardProps = {
  id?: string;
  name: string;
  type: string;
  category: string;
  description: string;
  url: string;
  tools: string[];
  img: string | null ;
};


export default function Projects() {
  const [titled, setTitle] = useState<string | undefined>();
  const { data: projects } = api.project.list.useQuery(titled);
  const { data: titles = [] } = api.title.list.useQuery();
  const [activeCard, setActiveCard] = useState<ProjectCardProps | null>(null);

  const ref = useRef(null);
  useOutsideClick(ref, () => setActiveCard(null));

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveCard(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Row packing logic (3 units per row on large screens)
  const rows = [];
  let currentRow: typeof projects = [];
  let currentWidth = 0;

  projects?.forEach((project) => {
    const width = project.type === "highlight" ? 2 : 1;
    if (currentWidth + width > 3) {
      rows.push(currentRow);
      currentRow = [];
      currentWidth = 0;
    }
    currentRow?.push(project);
    currentWidth += width;
  });

  if (currentRow.length) rows.push(currentRow);

  return (
    <>
      {/* BACKDROP */}
      <AnimatePresence>
        {activeCard && (
          <motion.div
            className="fixed inset-0 z-30 bg-background/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* EXPANDED CARD */}
      <AnimatePresence>
        {activeCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              layoutId={`card-${activeCard.id}`}
              ref={ref}
              className="relative w-full max-w-md overflow-hidden rounded-md border border-primary bg-background shadow-lg"
            >
              {activeCard.type === "highlight" && (
                <div className="absolute left-2 top-2 z-20">
                  <Star className="text-primary" size={16} />
                </div>
              )}
              <button
                onClick={() => setActiveCard(null)}
                className="absolute right-3 top-3 z-20 font-black text-primary duration-300 hover:text-secondary"
              >
                <X />
              </button>
              <div className="relative h-40 w-full">
                <img
                  src={activeCard.img as string | undefined}
                  alt={activeCard.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="relative p-4">
                <h2 className="text-xl font-bold capitalize text-primary">
                  {activeCard.name}
                </h2>
                <p className="my-2 max-h-16 w-full overflow-y-scroll text-sm text-foreground scrollbar-hide">
                  {activeCard.description}
                </p>
                <div className="flex w-full items-center gap-1 overflow-hidden">
                  <p className="text-xs font-bold text-foreground">ToolKit:</p>
                  {activeCard.tools.map((tool: string) => (
                    <div
                      key={tool}
                      className="h-[14px] rounded-full bg-gradient-to-br from-secondary to-primary to-60% px-1 text-[10px] font-medium capitalize tracking-tighter text-background"
                    >
                      {tool}
                    </div>
                  ))}
                </div>
                {activeCard.url.includes("http") ? (
                  <a
                    href={activeCard.url}
                    target="_blank"
                    className="mt-4 flex items-center text-sm font-medium tracking-tighter text-secondary duration-300 hover:tracking-widest"
                  >
                    <Pointer className="mr-2 h-4 w-4 rotate-90" />
                    <span>Visit Project</span>
                  </a>
                ) : (
                  <p className="mt-4 inline-block text-sm font-bold tracking-tighter text-secondary">
                    Work in Progress!
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GRID  */}
      <div className="flex w-[70%] h-[90%] flex-col gap-1 p-4">
        <div className="w-full flex justify-start items-center gap-2 px-2 pt-2 text-xs sm:text-sm font-bold text-primary bg-background overflow-x-scroll scrollbar-hide">
          <button
            className={`${titled === undefined ? "text-foreground" : ""} duration-300 hover:text-foreground`}
            onClick={() => setTitle(undefined)}
          >
            All
          </button>
          {titles.map((title, index) => (
            <button
              key={index}
              className={`${titled === title.id ? "text-foreground" : ""} capitalize duration-300 hover:text-foreground`}
              onClick={() => setTitle(title.id)}
            >
              {title.name}
            </button>
          ))}
        </div>
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-col gap-1 lg:flex-row"
          >
            {row.map((project) => {
              const flexClass =
                project.type === "highlight"
                  ? "lg:flex-[2]"
                  : "lg:flex-[1]";

              return (
                <motion.div
                  key={project.id}
                  layoutId={`card-${project.id}`}
                  className={flexClass}
                  onClick={() => setActiveCard(project)}
                >
                  <div
                    className="relative h-56 w-full cursor-pointer border border-primary bg-cover bg-center fill-primary 
                    tracking-tighter text-primary duration-300 hover:border-foreground hover:fill-foreground hover:tracking-widest hover:text-foreground"
                    style={{
                      backgroundImage: `url(${project.img})`,
                    }}
                  >
                    {project.type === "highlight" && (
                      <div className="absolute right-2 top-2 z-10">
                        <Star className="fill-inherit text-primary" size={16} />
                      </div>
                    )}
                    <h1 className="flex w-full text-center h-full items-center justify-center bg-background/70 text-2xl font-bold capitalize backdrop-blur-sm">
                      {project.name}
                    </h1>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
