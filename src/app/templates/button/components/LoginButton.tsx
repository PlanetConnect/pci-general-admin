import Button from "@mui/material/Button";

interface LoginButtonProps {
  size?: "medium" | "small";
  text?: string;
}

const LoginButton = ({ size = "medium", text = "Login" }: LoginButtonProps) => {
  return (
    <Button type="submit" variant="contained" size={size}>
      {text}
    </Button>
  );
};

export default LoginButton;
