import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import Nav from "@/components/nav";
import MaxWidthWrapper from "@/components/max-width-wrapper";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Foodbase",
  description: "Your online personal cookbook",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn("font-normal", inter.className)}>
        <body>
          <Nav />
          <MaxWidthWrapper className="min-h-[calc(100vh-60px)] border-x border-x-gray-200">
            {children}
          </MaxWidthWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
