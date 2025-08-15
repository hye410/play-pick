"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const SurveyButton = () => {
  const router = useRouter();
  const moveToSurvey = () => {
    router.push("/survey");
  };
  return (
    <div className="text-center">
      <Button onClick={moveToSurvey} size="large">
        취향에 맞는 콘텐츠 찾기
      </Button>
    </div>
  );
};

export default SurveyButton;
