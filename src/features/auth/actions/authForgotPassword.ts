import { AppDispatch, RootState } from "~/app/store";
import { getCognitoUser } from "~/features/auth/actions/getCognitoUser";

interface authLoginNewPasswordPayload {
  email: string;
}

export const authForgotPassword =
  ({ email }: authLoginNewPasswordPayload) =>
  (dispatch: AppDispatch, getState: () => RootState) =>
    new Promise((resolve, reject) => {
      const cognitoUser = dispatch(getCognitoUser());

      cognitoUser?.forgotPassword({
        onSuccess: function (data) {
          // successfully initiated reset password request
          console.log("CodeDeliveryData from forgotPassword: " + data);
          resolve(data);
        },
        onFailure: function (err) {
          alert(err.message || JSON.stringify(err));
          reject(err.message);
        },
      });
    });
