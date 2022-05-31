import { useSnackbar } from "notistack";

interface SnackBarProps {
  position: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
  variant: "success" | "error" | "warning" | "info";
  message: string;
  autoHideDuration?: number;
}

export const useSnackBar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const openSnackBar = (props: SnackBarProps) => {
    enqueueSnackbar(props.message, {
      anchorOrigin: props.position,
      variant: props.variant,
      autoHideDuration: props.autoHideDuration ? props.autoHideDuration : 5000,
    });
  };

  return { openSnackBar };
};
