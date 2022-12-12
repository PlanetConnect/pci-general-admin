import { CognitoUser } from "amazon-cognito-identity-js";
import { useSelector } from "react-redux";

import { AppDispatch, RootState } from "~/app/store";
import {
  getCognitoUser,
  getUsername,
  resetTokens,
} from "~/features/auth/loginSlice";
import { userPool } from "~/features/auth/utils/userPool";

export const authLogout =
  () => (dispatch: AppDispatch, getState: () => RootState) =>
    new Promise((resolve, reject) => {
      const user = getCognitoUser(getState());

      // const username = useSelector(getUsername);

      const userData = {
        Username: user?.username,
        Pool: userPool,
      };
      const cognitoUser = new CognitoUser(userData);

      if (cognitoUser !== null) {
        cognitoUser.signOut();
        console.log("logout success");
        dispatch(resetTokens());
      }
    });
