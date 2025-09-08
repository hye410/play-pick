import type { User } from "@/types/user-types";
import { createClientSuperbase } from "@/utils/supabase-client";
import { useEffect, useState } from "react";

const supabase = createClientSuperbase();

export const useAuthStatus = (initialState: boolean = false) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(initialState);
  const [user, setUser] = useState<null | User>(null);
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setIsLoggedIn(!!session);
      if (!!session) {
        const user = session.user;
        setUser({ id: user.id, lastSignInAt: user.last_sign_in_at, email: user.email });
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    isLoggedIn,
    user,
  };
};
