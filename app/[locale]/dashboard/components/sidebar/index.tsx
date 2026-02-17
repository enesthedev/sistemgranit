"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/app/components/ui/sidebar";
import { mainNavigation, ROUTES } from "@/app/routes";
import { Link } from "@/lib/i18n/navigation";
import Image from "next/image";
import * as React from "react";
import { NavMain } from "./nav-main";
import { NavUser, type CurrentUser } from "./nav-user";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: CurrentUser;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href={ROUTES.DASHBOARD}>
              <Image
                src="/sistem-catalog.png"
                alt="Logo"
                width={75}
                height={75}
              />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={mainNavigation} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
