import { GuestHeader } from "@/components/navigation";
import type { Metadata } from "next";
import { ReactNode } from "react";
export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME || "Next.js App",
  description: "Generated by create next app",
};

export default function SSGLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <GuestHeader />
      {children}
    </>
  );
}
