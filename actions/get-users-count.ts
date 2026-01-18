'use server';

import { createAdminClient } from '@/lib/supabase/admin';

export async function getUsersCount(): Promise<number> {
  try {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({
      perPage: 1,
      page: 1,
    });

    if (error) {
      console.error('Error checking users:', error.message);
      return 0;
    }

    return data?.users?.length ?? 0;
  } catch {
    return 0;
  }
}
