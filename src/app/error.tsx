"use client";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { BiSolidError } from "react-icons/bi";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

let isResetting = false;

const Error = ({ error, reset }: ErrorProps) => {
  const router = useRouter();
  const handleReset = () => {
    if (isResetting) return;
    isResetting = true;
    reset();
    setTimeout(() => {
      isResetting = false;
    }, 1000);
  };

  const moveToHome = () => {
    router.replace("/");
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <BiSolidError size={100} />
      <span className="whitespace-pre-line font-semibold">{error.message}</span>
      <div className="flex items-center justify-center gap-6">
        <div className="w-[150px]">
          <Button size="small" onClick={handleReset}>
            다시 시도하기
          </Button>
        </div>
        <div className="w-[150px]">
          <Button size="small" color="secondary" onClick={moveToHome}>
            HOME
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error;
