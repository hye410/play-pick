import { ALERT_TYPE } from "@/constants/alert-constants";
import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2";
const { SUCCESS, ERROR, INFO, WARNING } = ALERT_TYPE;
type AlertProps = {
  type: (typeof ALERT_TYPE)[keyof typeof ALERT_TYPE];
  message: string;
};

export const ALERT_COLORS = {
  [SUCCESS]: "#28a745",
  [ERROR]: "#D32F2F",
  [WARNING]: "#ffc107",
  [INFO]: "#17a2b8",
};

export const alert = ({ type, message }: AlertProps): Promise<SweetAlertResult> => {
  return Swal.fire({
    title: type.toUpperCase(),
    html: message || "오류가 발생했습니다.",
    icon: type as SweetAlertIcon,
    iconColor: ALERT_COLORS[type],
    confirmButtonText: "확인",
    confirmButtonColor: ALERT_COLORS[type],
  });
};
