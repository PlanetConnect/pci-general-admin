import { AppDispatch, RootState } from "~/app/store";
import { getCognitoUser } from "~/features/auth/actions/getCognitoUser";

export const authAssociateSoftwareToken =
  (enabled = true) =>
  (dispatch: AppDispatch, getState: () => RootState) =>
    new Promise((resolve, reject) => {
      const cognitoUser = dispatch(getCognitoUser());
      if (!cognitoUser) return reject();

      cognitoUser.associateSoftwareToken({
        onFailure: (err) => {
          console.log("🚀 ~ file: Profile.tsx:68 ~ Profile ~ err", err.message);
          reject(err);
        },
        associateSecretCode: (secretCode) => {
          console.log(
            "🚀 ~ file: Profile.tsx:68 ~ Profile ~ secretCode",
            secretCode
          );
          resolve(secretCode);
        },
      });
    });
