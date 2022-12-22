import Button from "@mui/material/Button";

interface LoginButtonProps {
  size?: "medium" | "small";
  text?: string;
  disabled?: boolean;
}

const LoginButton = ({
  size = "medium",
  text = "Login",
  disabled = false,
}: LoginButtonProps) => {
  return (
    <Button type="submit" variant="contained" size={size} disabled={disabled}>
      {text}
    </Button>
  );
};

export default LoginButton;
