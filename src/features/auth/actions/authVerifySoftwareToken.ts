import { AppDispatch, RootState } from "~/app/store";
import { getCognitoUser } from "~/features/auth/actions/getCognitoUser";

export const authVerifySoftwareToken =
  (totpCode: string, friendlyDeviceName: string) =>
  (dispatch: AppDispatch, getState: () => RootState) =>
    new Promise((resolve, reject) => {
      const cognitoUser = dispatch(getCognitoUser());
      if (!cognitoUser) return reject();
      if (!totpCode) return reject(new Error("TOTP code is required"));
      if (!friendlyDeviceName)
        return reject(new Error("Friendly device name is required"));

      cognitoUser.verifySoftwareToken(totpCode, friendlyDeviceName, {
        onFailure: (err) => {
          console.log("🚀 ~ file: Profile.tsx:68 ~ Profile ~ err", err.message);
          reject(err);
        },
        onSuccess: (result) => {
          console.log("🚀 ~ file: Profile.tsx:68 ~ Profile ~ result", result);
          resolve(result);
        },
      });
    });
