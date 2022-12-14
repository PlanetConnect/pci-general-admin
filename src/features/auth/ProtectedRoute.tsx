import { FC, PropsWithChildren, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { useAppDispatch } from "~/app/store";
import { getUser, setSavedLoginPath } from "~/features/auth/userSlice";

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useSelector(getUser);
  useEffect(() => {
    if (!user) {
      dispatch(setSavedLoginPath(location.pathname));
      navigate("/login", { replace: true });
    }
  }, []);
  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
