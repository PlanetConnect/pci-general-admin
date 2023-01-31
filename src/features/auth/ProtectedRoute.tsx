import { FC, PropsWithChildren, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { useAppDispatch } from "~/app/hooks";
import { getUser } from "~/features/auth/userSlice";
import { setSavedLoginPath } from "~/features/persist/persistSlice";

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();

  const user = useSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(setSavedLoginPath(location.pathname));
      navigate("/login");
    }
  }, [user]);

  if (!user) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
