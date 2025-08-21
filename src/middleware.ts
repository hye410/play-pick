import { NextResponse, NextRequest } from "next/server";
import { createServerSupabase } from "@/utils/supabase-server";
import { UPDATE_PASSWORD } from "./constants/path-constants";

export const middleware = async (request: NextRequest) => {
  const supabase = await createServerSupabase();
  const { pathname } = request.nextUrl;
  const code = request.nextUrl.searchParams.get("code");

  if (pathname === UPDATE_PASSWORD) {
    if (code) return NextResponse.next();
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return NextResponse.redirect(new URL("/", request.url));
  return NextResponse.next();
};

export const config = {
  matcher: ["/update-password", "/my-page"],
};
