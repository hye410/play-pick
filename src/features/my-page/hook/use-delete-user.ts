import { getSignOut } from "@/features/layout/api/server-actions";
import { deleteUser } from "@/features/my-page/api/server-actions";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { DELETE_USER_MESSAGE } from "@/constants/message-constants";
import { confirmDialog } from "@/utils/confirm-dialog";
import { alert } from "@/utils/alert";

const { ERROR, SUCCESS } = ALERT_TYPE;
const { DELETE_CONFIRM, DELETE_WARNING } = DELETE_USER_MESSAGE;

const useDeleteUser = () => {
  const requestSignout = async () => {
    await getSignOut();
    window.location.replace("/");
  };

  const requestUserDelete = async () => {
    const res = await deleteUser();
    if (res.success) {
      alert({
        type: SUCCESS,
        message: res.message as string,
      }).then(() => requestSignout());
    } else
      alert({
        type: ERROR,
        message: res.message as string,
      });
  };

  const handleDeleteUser = () => {
    confirmDialog({
      title: DELETE_CONFIRM,
      text: DELETE_WARNING,
      confirmCallbackFunc: requestUserDelete,
    });
  };

  return {
    handleDeleteUser,
  };
};
export default useDeleteUser;
