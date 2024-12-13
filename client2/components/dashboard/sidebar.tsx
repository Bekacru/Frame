"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import authClient from "@/lib/auth-client";
import {
  Briefcase,
  FileText,
  FolderKanban,
  Info,
  Link,
  LogOut,
  MessageSquare,
  User,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { icon: FileText, label: "Articles", href: "/dashboard/articles" },
  { icon: FolderKanban, label: "Projects", href: "/dashboard/projects" },
  {
    icon: MessageSquare,
    label: "Testimonials",
    href: "/dashboard/testimonials",
  },
  { icon: Briefcase, label: "Skills", href: "/dashboard/skills" },
  { icon: Info, label: "About", href: "/dashboard/about" },
  { icon: Link, label: "Links", href: "/dashboard/links" },
  { icon: User, label: "Profile", href: "/dashboard/" },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const signout = await authClient.signOut();
      if (signout.data?.success) {
        router.push("/");
      }

      console.log("Logging out...");
    } catch (err: unknown) {
      alert(`Error while logging out ${err}`);
    }
  };

  const session = authClient.useSession();

  return (
    <Sidebar className="border-r bg-white dark:bg-gray-800">
      <SidebarHeader className="border-b px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Portfolio Dashboard
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="md:hidden"
        >
          <X className="h-6 w-6 text-gray-900 dark:text-white" />
          <span className="sr-only">Close Sidebar</span>
        </Button>
      </SidebarHeader>
      <SidebarContent className="flex flex-col h-[calc(100vh-5rem)]">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <a
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition duration-300 ease-in-out"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="mt-auto">
          <Separator className="my-4" />
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={handleLogout} className="w-full">
                    <div className="flex items-center gap-3 px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition duration-300 ease-in-out">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={
                            session.data?.user.image
                              ? (session.data?.user.image as string)
                              : `/nerd.png?height=32&width=32`
                          }
                          alt="User"
                        />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {session.data?.user.name
                            ? session.data?.user.name
                            : "User Name"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Logout
                        </span>
                      </div>
                      <LogOut className="h-5 w-5 ml-auto" />
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
