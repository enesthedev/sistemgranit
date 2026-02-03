"use server";

import { createClient } from "@/supabase/server";
import { PageViewData, EventData, SessionData } from "@/lib/analytics/types";

export async function logPageView(
  data: PageViewData,
  sessionData?: Partial<SessionData>,
  isNewSession: boolean = false,
) {
  const supabase = await createClient();

  try {
    // 1. Log Page View
    const { error: pvError } = await supabase.from("page_views").insert(data);
    if (pvError) {
      console.error("[Server Action] Page view insert failed:", pvError);
    }

    // 2. Handle Session
    if (sessionData) {
      if (isNewSession) {
        // Create new session
        const { error: sessionError } = await supabase
          .from("sessions")
          .insert(sessionData as any);
        if (sessionError)
          console.error("[Server Action] Session insert failed:", sessionError);
      } else {
        // Update existing session
        const { id, ...updateData } = sessionData;

        if (id) {
          const { error: updateError } = await supabase
            .from("sessions")
            .update(updateData)
            .eq("id", id);

          if (updateError)
            console.error(
              "[Server Action] Session update failed:",
              updateError,
            );
        }
      }
    }
  } catch (error) {
    console.error("[Server Action] Analytics error:", error);
  }
}

export async function logEvent(data: EventData) {
  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("analytics_events")
      .insert(data as any);
    if (error) console.error("[Server Action] Event insert failed:", error);
  } catch (e) {
    console.error("[Server Action] Event log error:", e);
  }
}
