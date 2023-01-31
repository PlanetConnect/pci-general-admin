import { AuthProvider } from "oidc-react";
import { FC, PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "~/app/hooks";
import {
  getSavedLoginPath,
  setSavedLoginPath,
} from "~/features/auth/userSlice";

export const CognitoProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const savedLoginPath = useSelector(getSavedLoginPath);
  const oidcConfig = {
    onSignIn: () => {
      dispatch(setSavedLoginPath(""));
      navigate(savedLoginPath || "/", { replace: true });
    },

    autoSignIn: false,
    authority:
      "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_q0JLpYNG0",
    clientId: "3muheqms3g0t72fu3l8o5bfed5",
    redirectUri: "http://localhost:3001",
    responseType: "code",
    scope: "openid profile email",
    // revokeTokenTypes: ["refresh_token"],
    automaticSilentRenew: false,
    loadUserInfo: true,
    // filterProtocolClaims: true
  };

  return <AuthProvider {...oidcConfig}>{children}</AuthProvider>;
};
