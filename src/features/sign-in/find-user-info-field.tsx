"use client";

import { FIND_PASSWORD, SIGN_UP } from "@/constants/path-constants";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

type FindField = {
  name: string;
  onClick: () => void;
};

const FindUserInfoField = () => {
  const router = useRouter();
  const findField: FindField[] = useMemo(
    () => [
      {
        name: "비밀번호 찾기",
        onClick: () => router.push(FIND_PASSWORD),
      },
      {
        name: "회원가입",
        onClick: () => router.push(SIGN_UP),
      },
    ],
    [router],
  );

  return (
    <ul className="mt-10 flex gap-4">
      {findField.map((field) => (
        <li key={`find_${field.name}`}>
          <button onClick={field.onClick}>{field.name}</button>
        </li>
      ))}
    </ul>
  );
};

export default FindUserInfoField;
