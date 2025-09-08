import { DEFAULT_ERROR_MESSAGE } from "@/constants/message-constants";
import { CustomError } from "@/utils/error";
import { createServerSupabase } from "@/utils/supabase-server";
import { NextRequest, NextResponse } from "next/server";
const { SERVER_ERROR } = DEFAULT_ERROR_MESSAGE;

const SAME_PASSWORD_CODE = 422;
export const POST = async (request: NextRequest) => {
  try {
    const supabase = await createServerSupabase();
    const { password } = await request.json();
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      if (error.status === SAME_PASSWORD_CODE) throw new CustomError("기존과 같은 비밀번호로 설정할 수 없습니다.", 400);
      throw new CustomError("비밀번호를 바꾸는데 실패했습니다. 다시 시도해 주세요.");
    }
    return NextResponse.json({ message: "비밀번호가 변경되었습니다." }, { status: 200 });
  } catch (error) {
    console.error(error);
    let errorMessage: string = SERVER_ERROR;
    let errorCode: number = 500;
    if (error instanceof CustomError) {
      errorMessage = error.message;
      errorCode = error.code ?? 500;
    }
    return NextResponse.json({ message: errorMessage }, { status: errorCode });
  }
};
