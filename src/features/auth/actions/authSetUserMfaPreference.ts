import { AppDispatch, RootState } from "~/app/store";
import { getCognitoUser } from "~/features/auth/actions/getCognitoUser";

export const authSetUserMfaPreference =
  (enabled = true) =>
  (dispatch: AppDispatch, getState: () => RootState) =>
    new Promise((resolve, reject) => {
      const cognitoUser = dispatch(getCognitoUser());
      if (!cognitoUser) return reject();

      const totpMfaSettings = {
        PreferredMfa: enabled,
        Enabled: enabled,
      };

      cognitoUser.setUserMfaPreference(
        null,
        totpMfaSettings,
        function (err, result) {
          if (err) {
            reject(err);
            return;
          }
          console.log("result " + result);
          resolve(result);
        }
      );
    });
