import { AppDispatch, RootState } from "~/app/store";
import { resetTokens } from "~/features/auth/authSlice";
import { getUser, resetUser } from "~/features/auth/userSlice";

export const authLogout =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const user = getUser(getState());

    if (user?.username) {
      // const userData = {
      //   Username: user?.username,
      //   Pool: userPool,
      // };
      // const cognitoUser = new CognitoUser(userData);

      // cognitoUser.signOut();
      console.log("logout success");
      dispatch(resetTokens());
      dispatch(resetUser());
    }
  };
