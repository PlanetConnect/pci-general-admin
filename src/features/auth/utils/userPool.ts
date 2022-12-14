import { CognitoUserPool } from "amazon-cognito-identity-js";

export const userPool = new CognitoUserPool({
  UserPoolId: import.meta.env.VITE_APP_COGNITO_USER_POOL_ID as string,
  ClientId: import.meta.env.VITE_APP_COGNITO_CLIENT_ID as string,
});
