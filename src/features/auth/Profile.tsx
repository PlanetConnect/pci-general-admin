import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
// import * as AWS from "aws-sdk/global";
import { useSelector } from "react-redux";

import { useAppDispatch } from "~/app/hooks";
import { PaperContent } from "~/app/templates/content/";
import { getCognitoUser } from "~/features/auth/actions/getCognitoUser";
import { getUser } from "~/features/auth/userSlice";

const settings = {
  columnVisibility: { field: false, modified_time: false },
  isCheckBoxEnabled: false,
  pageSize: 25,
  rowIdField: "field",
};

function Profile() {
  const dispatch = useAppDispatch();
  const user = useSelector(getUser);

  return (
    <PaperContent>
      <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="h5">Profile</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>{user?.username}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="h5">Security</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Password</TableCell>
              <TableCell>**********</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Multi Factor Enabled</TableCell>
              <TableCell>true</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ paddingLeft: 5 }}>Phone</TableCell>
              <TableCell>true</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ paddingLeft: 5 }}>
                Authenticator (TOTP)
              </TableCell>
              <TableCell>true</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          // const userData = await dispatch(authSetUserMfaPreference(true));
          // console.log(
          //   "🚀 ~ file: Profile.tsx:68 ~ Profile ~ userData",
          //   userData
          // );
          const cognitoUser = dispatch(getCognitoUser());
          if (!cognitoUser) return;

          cognitoUser.associateSoftwareToken({
            onFailure: (err) => {
              console.log(
                "🚀 ~ file: Profile.tsx:68 ~ Profile ~ err",
                err.message
              );
            },
            associateSecretCode: (secretCode) => {
              console.log(
                "🚀 ~ file: Profile.tsx:68 ~ Profile ~ secretCode",
                secretCode
              );
            },
          });

          // const cognitoIdToken = new CognitoIdToken({ IdToken: idToken });
          // const cognitoAccessToken = new CognitoAccessToken({
          //   AccessToken: accessToken,
          // });
          // const cognitoRefreshToken = new CognitoRefreshToken({
          //   RefreshToken: refreshToken,
          // });
          // const cognitoUserSession = new CognitoUserSession({
          //   IdToken: cognitoIdToken,
          //   AccessToken: cognitoAccessToken,
          //   RefreshToken: cognitoRefreshToken,
          // });
          // cognitoUser.setSignInUserSession(cognitoUserSession);

          // cognitoUser.getUserAttributes((err, result) => {
          //   if (err) {
          //     console.log(
          //       "🚀 ~ file: Profile.tsx:68 ~ Profile ~ err",
          //       err.message
          //     );
          //     return;
          //   }
          //   console.log("🚀 ~ file: Profile.tsx:71 ~ Profile ~ result", result);
          // });

          // const authenticationData = {
          //   Username: "test@email.com",
          //   Password: "Password1234!",
          // };
          // const authenticationDetails = new AuthenticationDetails(
          //   authenticationData
          // );
          // const poolData = {
          //   UserPoolId: COGNITO_USER_POOL_ID, // Your user pool id here
          //   ClientId: CLIENT_ID, // Your client id here
          // };
          // const userPool = new CognitoUserPool(poolData);
          // const userData = {
          //   Username: "test@email.com",
          //   Pool: userPool,
          // };
          // const cognitoUser = new CognitoUser(userData);
          // cognitoUser.authenticateUser(authenticationDetails, {
          //   onSuccess: function (result) {
          //     const accessToken = result.getAccessToken().getJwtToken();
          //     console.log(
          //       "🚀 ~ file: Profile.tsx:106 ~ Profile ~ accessToken",
          //       accessToken
          //     );
          //   },
          //   onFailure: function (err) {
          //     alert(err.message || JSON.stringify(err));
          //   },
          // });

          // cognitoUser.changePassword(
          //   "Password1!",
          //   "Password2!",
          //   function (err, result) {
          //     if (err) {
          //       alert(err.message || JSON.stringify(err));
          //       return;
          //     }
          //     console.log("call result: " + result);
          //   }
          // );

          // const attributeList = [];

          // const attribute = new CognitoUserAttribute({
          //   Name: "nickname",
          //   Value: "joe",
          // });
          // attributeList.push(attribute);

          // cognitoUser.updateAttributes(attributeList, function (err, result) {
          //   if (err) {
          //     alert(err.message || JSON.stringify(err));
          //     return;
          //   }
          //   console.log("call result: " + result);
          // });
        }}
      >
        TEST
      </Button>
    </PaperContent>
  );
}

export default Profile;
