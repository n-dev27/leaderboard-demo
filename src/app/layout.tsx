"use client";

import { createContext, Context, useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { fontMono, fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { LayoutContextType } from "@/types";

import "@/styles/globals.css";

export const LayoutContext: Context<LayoutContextType | ""> = createContext<
  LayoutContextType | ""
>("");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    const storedLabel = localStorage.getItem("label");
    if (storedLabel) {
      setLabel(storedLabel);
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{siteConfig.name}</title>
        <meta name="description" content={siteConfig.description} />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable
        )}
      >
        <LayoutContext.Provider value={{ label, setLabel }}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster />
            <div className="relative flex min-h-screen flex-col">
              <main className="flex-1">{children}</main>
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </LayoutContext.Provider>
      </body>
    </html>
  );
}
