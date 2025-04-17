import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { Providers } from "./providers";
import BackgroundSparkles from "@/components/background";
import NavButton from "@/components/ui/nav-button";
import { ThemeToggle } from "@/components/toggle-theme";
import SparklesToggle from "@/components/toggle-sparkles";
import { SparklesProvider } from "./sparklesContext";
import Link from "next/link";
import { iconStyle } from "@/styles/styles";
import { ShieldUser } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { Titles } from "@/components/titles";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Eloi Iradukunda || Portfolio",
  description: "Eloi Iradukunda's portfolio",
  icons: [{ rel: "icon", url: "/logo.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const date = new Date().getFullYear();
  const pages = ["home", "projects", "contact", "credits", "resume"];

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`bg-background font-sans duration-700 ${inter.variable}`}
      >
        <TRPCReactProvider>
          <Providers>
            <SparklesProvider>
              <main className="flex select-none flex-col">
                <div className="max-w-screen flex h-screen min-h-screen w-full overflow-hidden">
                  {/* Name & Titles */}
                  <div
                    className="absolute z-20 flex w-full flex-col gap-1 pl-2 pt-2 sm:w-[30%] sm:gap-2
                    sm:pl-8 sm:pt-8"
                  >
                    <div
                      className="bg-gradient-to-tr from-secondary to-primary to-60% 
                      bg-clip-text text-4xl font-light tracking-tighter text-transparent md:text-3xl lg:text-5xl"
                    >
                      Eloi Iradukunda
                    </div>
                    <Titles />
                  </div>
                  {/* Side-Menu */}
                  <div
                    className="absolute top-[20%] z-20 flex flex-col items-start justify-start gap-2 pl-2 sm:top-1/4 
                    sm:pl-8"
                  >
                    {pages.map((title, index) => (
                      <NavButton
                        key={index}
                        title={title}
                        variant={title === "resume" ? "secondary" : "primary"}
                      />
                    ))}
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <ThemeToggle />
                      <SparklesToggle />
                      <Link href="/admin" className={iconStyle}>
                        <ShieldUser />
                      </Link>
                    </div>
                  </div>
                  <div className="absolute flex w-full flex-col gap-10 "></div>

                  {/* Main Content Area */}
                  <div className="relative pt-20 sm:pt-0 min-h-full w-full overflow-y-scroll scrollbar-hide">
                    {children}
                  </div>
                </div>
                <div className="absolute bottom-0 w-full py-2 sm:py-4 text-center text-xs font-bold tracking-tighter text-primary">
                  &copy; {date} Eloi Iradukunda, All Rights Reserved
                </div>
              </main>
              <BackgroundSparkles />
            </SparklesProvider>
          </Providers>
        </TRPCReactProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
