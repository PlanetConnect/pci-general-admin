import {
  CognitoAccessToken,
  CognitoIdToken,
  CognitoRefreshToken,
  CognitoUser,
  CognitoUserSession,
} from "amazon-cognito-identity-js";

import { AppDispatch, RootState } from "~/app/store";
import {
  getAccessToken,
  getIdToken,
  getRefreshToken,
} from "~/features/auth/authSlice";
import { getUser } from "~/features/auth/userSlice";
import { userPool } from "~/features/auth/utils/userPool";

export const getCognitoUser =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const user = getUser(getState());
    const idToken = getIdToken(getState());
    const accessToken = getAccessToken(getState());
    const refreshToken = getRefreshToken(getState());
    if (!user?.username || !idToken || !accessToken || !refreshToken)
      return null;

    const userData = {
      Username: user.username,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    const cognitoIdToken = new CognitoIdToken({ IdToken: idToken });
    const cognitoAccessToken = new CognitoAccessToken({
      AccessToken: accessToken,
    });
    const cognitoRefreshToken = new CognitoRefreshToken({
      RefreshToken: refreshToken,
    });
    const cognitoUserSession = new CognitoUserSession({
      IdToken: cognitoIdToken,
      AccessToken: cognitoAccessToken,
      RefreshToken: cognitoRefreshToken,
    });
    cognitoUser.setSignInUserSession(cognitoUserSession);

    return cognitoUser;
  };
