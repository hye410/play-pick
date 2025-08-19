import { SUPABASE_API_KEY, SUPABASE_URL } from "@/constants/path-constants";
import { createBrowserClient } from "@supabase/ssr";
export const createClientSuperbase = () => {
  return createBrowserClient(SUPABASE_URL!, SUPABASE_API_KEY!);
};
