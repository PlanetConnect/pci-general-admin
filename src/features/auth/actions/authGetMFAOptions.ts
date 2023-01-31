import { AppDispatch, RootState } from "~/app/store";
import { getCognitoUser } from "~/features/auth/actions/getCognitoUser";

export const authGetMFAOptions =
  () => (dispatch: AppDispatch, getState: () => RootState) =>
    new Promise((resolve, reject) => {
      const cognitoUser = dispatch(getCognitoUser());
      if (!cognitoUser) return reject();

      cognitoUser.getMFAOptions(function(err, mfaOptions) {
        if (err) {
          reject(err);
          return;
        }
        console.log('MFA options for user ' + mfaOptions);
        resolve(mfaOptions);
    });
