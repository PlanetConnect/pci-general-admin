import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";

import { AppDispatch } from "~/app/store";
import { authResendConfirmationCode } from "~/features/auth/actions/authResendConfirmationCode";

interface LoginButtonProps {
  size?: "medium" | "small";
}

const ResendConfirmationButton = ({ size = "medium" }: LoginButtonProps) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <Button
      type="submit"
      variant="contained"
      size={size}
      onClick={() => {
        dispatch(authResendConfirmationCode());
      }}
    >
      Resend Verification Code
    </Button>
  );
};

export default ResendConfirmationButton;
