import Button from "@mui/material/Button";

interface LoginButtonProps {
  size?: "medium" | "small";
}

const LoginButton = ({ size = "medium" }: LoginButtonProps) => {
  return (
    <Button type="submit" variant="contained" size={size}>
      Login
    </Button>
  );
};

export default LoginButton;
