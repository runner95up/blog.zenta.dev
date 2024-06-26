import { StudioHeader } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { defaultLayout } from "@/lib/config";
import { options, prisma } from "@/lib/server";
import { cn } from "@/lib/utils";
import { AuthProvider, ToastProvider } from "@/provider";
import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaTags } from "react-icons/fa6";
import { GiPostStamp } from "react-icons/gi";
import { IoSettings } from "react-icons/io5";
import { PiStackSimpleFill } from "react-icons/pi";
import { RiDashboard3Fill } from "react-icons/ri";
import styles from "./style.module.css";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME || "Next.js App",
  description: "Generated by create next  app",
};

export default async function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);
  // if (!session) {
  //   redirect("/auth/signin");
  // }

  const find = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  if (!find) {
    redirect("/auth/signout");
  }

  const navItems = [
    {
      label: "Dashboard",
      href: "/studio",
      icon: RiDashboard3Fill,
      color: "blue",
      btnStyle: styles.btn_studio_dashboard,
    },
    {
      label: "Tags",
      href: "/studio/tags",
      icon: FaTags,
      color: "green",
      btnStyle: styles.btn_studio_tags,
    },
    {
      label: "Stacks",
      href: "/studio/stacks",
      icon: PiStackSimpleFill,
      color: "red",
      btnStyle: styles.btn_studio_stacks,
    },
    {
      label: "Posts",
      href: "/studio/posts",
      icon: GiPostStamp,
      color: "purple",
      btnStyle: styles.btn_studio_posts,
    },
    {
      label: "Settings",
      href: "/studio/settings",
      icon: IoSettings,
      color: "yellow",
      btnStyle: styles.btn_studio_settings,
    },
  ] as const;
  return (
    <AuthProvider session={session}>
      <ToastProvider>
        <StudioHeader />
        <div className="px-4 ">
          <ResizablePanelGroup
            direction="horizontal"
            className="border rounded-xl"
          >
            <ResizablePanel
              defaultSize={defaultLayout[0]}
              className={`flex flex-col items-start  p-2 gap-2 bg-`}
            >
              {navItems.map((item, index) => (
                <Link href={item.href} key={index} className="w-full">
                  <Button
                    role="button"
                    variant="link"
                    className={cn("p-2 w-full gap-2", item.btnStyle)}
                  >
                    <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                    <p className="text-white">{item.label}</p>
                  </Button>
                </Link>
              ))}
            </ResizablePanel>
            {children}
          </ResizablePanelGroup>
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}
