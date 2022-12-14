import { CognitoUser } from "amazon-cognito-identity-js";
import { useSelector } from "react-redux";

import { AppDispatch, RootState } from "~/app/store";
import {
  getCognitoUser,
  getUsername,
  resetTokens,
} from "~/features/auth/authSlice";
import { getUser } from "~/features/auth/userSlice";
import { userPool } from "~/features/auth/utils/userPool";

export const authLogout =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const user = getUser(getState());

    if (user) {
      const userData = {
        Username: user?.username,
        Pool: userPool,
      };
      const cognitoUser = new CognitoUser(userData);

      cognitoUser.signOut();
      console.log("logout success");
      dispatch(resetTokens());
    }
  };
