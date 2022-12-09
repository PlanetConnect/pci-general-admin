import { CognitoUser } from "amazon-cognito-identity-js";
import { useSelector } from "react-redux";

import { AppDispatch } from "~/app/store";
import { getUsername, resetTokens } from "~/features/auth/loginSlice";
import { userPool } from "~/features/auth/utils/userPool";

export const authLogout = () => (dispatch: AppDispatch) =>
  new Promise((resolve, reject) => {
    const username = useSelector(getUsername);

    const userData = {
      Username: username,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    if (cognitoUser !== null) {
      cognitoUser.signOut();
      dispatch(resetTokens());
    }
  });
