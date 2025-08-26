import Swal, { SweetAlertOptions, SweetAlertResult } from "sweetalert2";

type ModalProps = {
  html: string | HTMLBodyElement;
  width?: string | number;
  showConfirmButton?: boolean;
  showCloseButton?: boolean;
  showCancelButton?: boolean;
  focusConfirm?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  heightAuto?: boolean;
};

export const modal = ({
  html,
  width = "70%",
  showCloseButton = false,
  showCancelButton = false,
  showConfirmButton = false,
  focusConfirm = false,
  confirmButtonText = "확인",
  cancelButtonText = "취소",
  heightAuto = true,
}: ModalProps): Promise<SweetAlertResult> => {
  return Swal.fire({
    html: html,
    showCloseButton: showCloseButton,
    showCancelButton: showCancelButton,
    focusConfirm: focusConfirm,
    showConfirmButton: showConfirmButton,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
    heightAuto: heightAuto,
    width: width,
  });
};
