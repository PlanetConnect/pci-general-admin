import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";

interface UserIconBadgeProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const UserIconBadge = ({ onClick }: UserIconBadgeProps) => {
  return (
    <IconButton
      size="large"
      edge="end"
      aria-label="account of current user"
      aria-haspopup="true"
      color="inherit"
      onClick={onClick}
    >
      <AccountCircle />
    </IconButton>
  );
};

export default UserIconBadge;
