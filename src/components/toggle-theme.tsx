"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { iconStyle } from "@/styles/styles";

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (theme === "light") {
    return (
      <button onClick={() => setTheme("dark")}>
        <Moon className={iconStyle} />
      </button>
    );
  } else {
    return (
      <button onClick={() => setTheme("light")}>
        <Sun className={iconStyle} />
      </button>
    );
  }
};
