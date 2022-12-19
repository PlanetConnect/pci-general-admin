import { CognitoUser } from "amazon-cognito-identity-js";

import { AppDispatch, RootState } from "~/app/store";
import { resetTokens } from "~/features/auth/authSlice";
import { getUser, resetUser } from "~/features/auth/userSlice";
import { userPool } from "~/features/auth/utils/userPool";

export const authLogout =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const user = getUser(getState());
    console.log("🚀 ~ file: authLogout.ts:11 ~ user", user);

    if (user) {
      const userData = {
        Username: user?.data?.username,
        Pool: userPool,
      };
      console.log("🚀 ~ file: authLogout.ts:18 ~ userData", userData);
      const cognitoUser = new CognitoUser(userData);

      cognitoUser.signOut();
      console.log("logout success");
      dispatch(resetTokens());
      dispatch(resetUser());
    }
  };
