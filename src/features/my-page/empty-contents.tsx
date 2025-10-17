import { LuHeartOff } from "react-icons/lu";
const EmptyContents = ({ message }: { message: string }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center text-lg">
      <LuHeartOff size={"50px"} />
      <span className="mt-4">{message}</span>
    </div>
  );
};

export default EmptyContents;
