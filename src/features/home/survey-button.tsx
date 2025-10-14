"use client";

import Button from "@/components/button";
import { useRouter } from "next/navigation";

const SurveyButton = () => {
  const router = useRouter();
  const moveToSurvey = () => {
    router.push("/survey");
  };
  return (
    <div className="mx-auto mt-4 w-[80%] min-w-[260px] text-center sm:w-1/2 lg:w-1/3">
      <Button onClick={moveToSurvey} size="large">
        취향에 맞는 콘텐츠 찾기
      </Button>
    </div>
  );
};

export default SurveyButton;
