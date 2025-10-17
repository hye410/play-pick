"use client";

import useDeleteUser from "@/features/my-page/hook/use-delete-user";
import clsx from "clsx";

type DeleteUserFiledProps = {
  isGuestAccount: boolean;
};
const DeleteUserField = ({ isGuestAccount = false }: DeleteUserFiledProps) => {
  const { handleDeleteUser } = useDeleteUser();

  return (
    <div className="mb-auto text-center">
      <button
        type="button"
        className={clsx("text-[12px] sm:text-sm", isGuestAccount && "cursor-not-allowed line-through")}
        onClick={handleDeleteUser}
        disabled={isGuestAccount}
      >
        회원탈퇴
      </button>
    </div>
  );
};

export default DeleteUserField;
