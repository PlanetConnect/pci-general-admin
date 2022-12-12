import { CognitoUser } from "amazon-cognito-identity-js";

import { AppDispatch, RootState } from "~/app/store";
import { getCognitoUser } from "~/features/auth/loginSlice";

export const startupAsync =
  (user?: CognitoUser) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    console.log("startup async");
    //TODO: check if user is logged in
    if (!user) {
      return "no user";
    } else {
      //TODO: if user is logged in and access token is expired, then refresh

      return "user";
    }
  };
