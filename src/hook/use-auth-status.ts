import { createClientSuperbase } from "@/utils/supabase-client";
import { useEffect, useState } from "react";

const supabase = createClientSuperbase();

export const useAuthStatus = (initialState: boolean = false) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(initialState);
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return {
    isLoggedIn,
  };
};
