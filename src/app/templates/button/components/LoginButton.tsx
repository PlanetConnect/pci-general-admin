import Button from "@mui/material/Button";

interface LoginButtonProps {
  size?: "medium" | "small";
  text?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const LoginButton = ({
  size = "medium",
  text = "Login",
  disabled = false,
  onClick,
}: LoginButtonProps) => {
  return (
    <Button
      type="submit"
      variant="contained"
      size={size}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default LoginButton;
