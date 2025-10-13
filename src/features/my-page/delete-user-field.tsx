"use client";

import useDeleteUser from "@/features/my-page/hook/use-delete-user";

const DeleteUserField = () => {
  const { handleDeleteUser } = useDeleteUser();

  return (
    <div className="mb-auto text-center">
      <button type="button" className="text-[12px] sm:text-sm" onClick={handleDeleteUser}>
        회원탈퇴
      </button>
    </div>
  );
};

export default DeleteUserField;
