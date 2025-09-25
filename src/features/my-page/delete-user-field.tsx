"use client";

import useDeleteUser from "@/features/my-page/hook/use-delete-user";

const DeleteUserField = () => {
  const { handleDeleteUser } = useDeleteUser();

  return (
    <button type="button" className="text-sm" onClick={handleDeleteUser}>
      회원탈퇴
    </button>
  );
};

export default DeleteUserField;
