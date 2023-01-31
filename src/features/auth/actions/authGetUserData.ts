import { AppDispatch, RootState } from "~/app/store";
import { getCognitoUser } from "~/features/auth/actions/getCognitoUser";

export const authGetUserData =
  () => (dispatch: AppDispatch, getState: () => RootState) =>
    new Promise((resolve, reject) => {
      const cognitoUser = dispatch(getCognitoUser());
      if (!cognitoUser) return reject();

      cognitoUser.getUserData(function (err, userData) {
        if (err) {
          reject(err);
          return;
        }
        console.log("userData " + userData);
        resolve(userData);
      });
    });
