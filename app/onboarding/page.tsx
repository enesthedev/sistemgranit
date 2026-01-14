import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { OnboardingForm } from "./form";

async function checkHasUsers(): Promise<boolean> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 1,
    });

    if (error) {
      console.error("Error checking users:", error);
      return true;
    }

    return (data?.users?.length ?? 0) > 0;
  } catch (error) {
    console.error("Error in checkHasUsers:", error);
    return true;
  }
}

export default async function OnboardingPage() {
  const hasUsers = await checkHasUsers();

  if (hasUsers) {
    redirect("/");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <OnboardingForm />
      </div>
    </div>
  );
}
