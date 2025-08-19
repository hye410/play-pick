import { SUPABASE_API_KEY, SUPABASE_URL } from "@/constants/path-constants";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createServerSupabase = async () => {
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL!, SUPABASE_API_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
};
