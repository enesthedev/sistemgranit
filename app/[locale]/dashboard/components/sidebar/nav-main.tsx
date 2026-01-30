"use client";

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { getLocalizedPaths } from "@/lib/i18n/utils/get-localized-paths";
import { Button } from "@/app/components/ui/button";
import { ROUTES } from "@/app/routes";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const pathname = usePathname();

  const isActive = (url: string): boolean => {
    const localizedPaths = getLocalizedPaths(url);
    const dashboardPaths = getLocalizedPaths(ROUTES.DASHBOARD);
    const isDashboard = dashboardPaths.includes(url);
    const currentPath = pathname as string;

    if (isDashboard) {
      return localizedPaths.includes(currentPath);
    }
    return (
      localizedPaths.includes(currentPath) ||
      localizedPaths.some((p) => currentPath.startsWith(`${p}/`))
    );
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              asChild
              tooltip="Hızlı Oluştur"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <Link href={ROUTES.PRODUCTS.NEW}>
                <IconCirclePlusFilled />
                <span>Hızlı Oluştur</span>
              </Link>
            </SidebarMenuButton>
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <IconMail />
              <span className="sr-only">Gelen Kutusu</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => {
            const active = isActive(item.url);
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={active}
                >
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <Link href={item.url as any}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
