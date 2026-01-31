import { AppSidebar } from "./components/sidebar";
import { SidebarInset, SidebarProvider } from "@/app/components/ui/sidebar";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  const currentUser = {
    id: user.id,
    email: user.email ?? "",
    displayName:
      user.user_metadata?.displayName ??
      user.email?.split("@")[0] ??
      "Kullanıcı",
    avatarUrl: user.user_metadata?.avatar_url ?? null,
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" user={currentUser} />
      <SidebarInset>
        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
