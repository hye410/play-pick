"use client";

import { ALERT_TYPE } from "@/constants/alert-constants";
import { DELETE_USER_MESSAGE } from "@/constants/message-constants";
import { deleteUser } from "@/features/my-page/api/services";
import { getSignOut } from "@/features/layout/api/server-services";
import { confirmDialog } from "@/utils/confirm-dialog";

const { ERROR, SUCCESS } = ALERT_TYPE;
const { DELETE_CONFIRM, DELETE_WARNING } = DELETE_USER_MESSAGE;
const DeleteUser = () => {
  const requestUserDelete = async () => {
    try {
      const res = await deleteUser();
      await getSignOut()
        .then(() =>
          alert({
            type: SUCCESS,
            message: res,
          }),
        )
        .finally(() => window.location.replace("/"));
    } catch (error) {
      alert({
        type: ERROR,
        message: error as string,
      });
    }
  };

  const handleDeleteUser = () => {
    confirmDialog({
      title: DELETE_CONFIRM,
      text: DELETE_WARNING,
      confirmCallbackFunc: requestUserDelete,
    });
  };

  return (
    <button type="button" className="text-sm" onClick={handleDeleteUser}>
      회원탈퇴
    </button>
  );
};

export default DeleteUser;
