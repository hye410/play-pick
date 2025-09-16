"use client";
import Button from "@/components/button";
import { BiSolidError } from "react-icons/bi";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

let isResetting = false;

const Error = ({ error, reset }: ErrorProps) => {
  const handleReset = () => {
    if (isResetting) return;
    isResetting = true;
    reset();
    setTimeout(() => {
      isResetting = false;
    }, 1000);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <BiSolidError size={100} />
      <span className="font-semibold">{error.message}</span>
      <div>
        <Button size="small" onClick={handleReset}>
          다시 시도하기
        </Button>
      </div>
    </div>
  );
};

export default Error;
