import Swal from "sweetalert2";
import { ALERT_COLORS } from "@/utils/alert";

type ConfirmDialogProps = {
  title: string;
  text: string;
  confirmCallbackFunc: () => void;
};

export const confirmDialog = async ({ title, text, confirmCallbackFunc }: ConfirmDialogProps) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: ALERT_COLORS.info,
    cancelButtonColor: ALERT_COLORS.error,
    cancelButtonText: "닫기",
    confirmButtonText: "확인",
  }).then((result) => {
    if (result.isConfirmed) confirmCallbackFunc();
  });
};
