import {
  CognitoUserAttribute,
  CognitoUserPool,
} from "amazon-cognito-identity-js";

const userPool = new CognitoUserPool({
  UserPoolId: "us-east-1_jhilt0pUg",
  ClientId: "4bsrth7sjh5um6km5qoqo4pj0d",
});

const signUp = (username: string, password: string) => {
  new Promise((resolve, reject) => {
    const emailAttribute = new CognitoUserAttribute({
      Name: "email",
      Value: username,
    });

    const attributes = [emailAttribute];
    return userPool.signUp(
      username,
      password,
      attributes,
      [],
      (err, result) => {
        if (err) {
          console.log("signup err", err);
          reject(err);
          return;
        }
        console.log("signup result", result);
        resolve(result);
      }
    );
  });
};

export const authSignUp =
  (username: string, password: string) => async (dispatch, getState) => {
    signUp(username, password);
  };
