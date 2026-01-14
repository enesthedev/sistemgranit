import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const supabase = createAdminClient();

    const { count, error } = await supabase
      .from("auth.users")
      .select("*", { count: "exact", head: true });

    if (error) {
      const { data: usersData, error: listError } =
        await supabase.auth.admin.listUsers({
          page: 1,
          perPage: 1,
        });

      if (listError) {
        console.error("Error checking users:", listError);
        return NextResponse.json({ hasUsers: true }, { status: 200 });
      }

      return NextResponse.json({
        hasUsers: (usersData?.users?.length ?? 0) > 0,
      });
    }

    return NextResponse.json({ hasUsers: (count ?? 0) > 0 });
  } catch (error) {
    console.error("Error in has-users API:", error);
    return NextResponse.json({ hasUsers: true }, { status: 200 });
  }
}
