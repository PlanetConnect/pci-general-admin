import { AppDispatch, RootState } from "~/app/store";
import { getCognitoUser } from "~/features/auth/userSlice";

interface authLoginNewPasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export const authChangePassword =
  ({ oldPassword, newPassword }: authLoginNewPasswordPayload) =>
  (dispatch: AppDispatch, getState: () => RootState) =>
    new Promise((resolve, reject) => {
      const cognitoUser = getCognitoUser(getState());

      cognitoUser?.changePassword(
        oldPassword,
        newPassword,
        function (err, result) {
          if (err) {
            // alert(err.message || JSON.stringify(err));
            reject(err.message);
            return;
          }
          console.log("call result: " + result);
          resolve(result);
        }
      );
    });
