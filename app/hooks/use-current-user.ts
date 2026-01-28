"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/supabase/browser";

export interface CurrentUser {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string | null;
}

export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const fetchUser = async () => {
      try {
        const {
          data: { user: authUser },
          error,
        } = await supabase.auth.getUser();

        if (error || !authUser) {
          setUser(null);
          return;
        }

        setUser({
          id: authUser.id,
          email: authUser.email ?? "",
          displayName:
            authUser.user_metadata?.displayName ??
            authUser.email?.split("@")[0] ??
            "Kullanıcı",
          avatarUrl: authUser.user_metadata?.avatar_url ?? null,
        });
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") {
        setUser(null);
      } else if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? "",
          displayName:
            session.user.user_metadata?.displayName ??
            session.user.email?.split("@")[0] ??
            "Kullanıcı",
          avatarUrl: session.user.user_metadata?.avatar_url ?? null,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
