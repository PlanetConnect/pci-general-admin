import MuiAlert from "@mui/material/Alert";

interface AlertProps {
  severity?: "success" | "info" | "warning" | "error";
  children: React.ReactNode;
}

const Alert = ({ severity = "info", children }: AlertProps) => {
  return <MuiAlert severity={severity}>{children}</MuiAlert>;
};

export default Alert;
