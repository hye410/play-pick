"use client";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { SIGN_IN } from "@/constants/path-constants";
import { alert } from "@/utils/alert";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const { WARNING } = ALERT_TYPE;

const MyPageError = ({ error }: { error: Error }) => {
  const router = useRouter();
  useEffect(() => {
    alert({
      type: WARNING,
      message: error.message,
    }).then(() => router.replace(SIGN_IN));
  }, []);

  return <div />;
};

export default MyPageError;
