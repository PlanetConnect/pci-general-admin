import { Grid } from "@mui/material";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from "amazon-cognito-identity-js";
import { useDispatch } from "react-redux";
import { promisify } from "util";

import { LoginButton } from "~/app/templates/button";
import { PaperContent, Title } from "~/app/templates/content/";
import { Actions, Form, Section } from "~/app/templates/formbuilder";
import LoginField from "~/app/templates/formbuilder/components/LoginField";
import { useSnackBar } from "~/app/templates/snackbar";
import { authSignUp } from "~/features/auth/actions/authSignUp";
import loginSchema from "~/features/login/data/form/loginSchema";

const defaultValues = {
  username: "",
  password: "",
};
function Login() {
  const dispatch = useDispatch();
  const { openSnackBar } = useSnackBar();
  const userPool = new CognitoUserPool({
    UserPoolId: "us-east-1_jhilt0pUg",
    ClientId: "4bsrth7sjh5um6km5qoqo4pj0d",
  });

  const handleSubmit = (values: any) => {
    console.log(values);
    openSnackBar({
      message: "login Success.",
      position: {
        vertical: "top",
        horizontal: "center",
      },
      variant: "success",
    });
    try {
      dispatch(authSignUp(values.username, values.password));
    } catch (e) {
      console.log("🚀 ~ file: Login.tsx ~ line 44 ~ handleSubmit ~ e", e);
    }

    // const authenticationData = {
    //   Username: values.username,
    //   Password: values.password,
    // };

    // const authenticationDetails = new AuthenticationDetails(authenticationData);

    // const userData = {
    //   Username: values.username,
    //   Pool: userPool,
    // };
    // const cognitoUser = new CognitoUser(userData);
    // cognitoUser.authenticateUser(authenticationDetails, {
    //   onSuccess: function (result) {
    //     console.log(
    //       "🚀 ~ file: Login.tsx ~ line 73 ~ handleSubmit ~ result",
    //       result
    //     );
    //     const accessToken = result.getAccessToken().getJwtToken();
    //     console.log(
    //       "🚀 ~ file: Login.tsx ~ line 78 ~ handleSubmit ~ result.getAccessToken()",
    //       result.getAccessToken()
    //     );
    //     console.log(
    //       "🚀 ~ file: Login.tsx ~ line 78 ~ handleSubmit ~ accessToken",
    //       accessToken
    //     );
    //   },

    //   onFailure: function (err) {
    //     alert(err.message || JSON.stringify(err));
    //   },
    // });
  };
  return (
    <div className="main">
      <Grid container>
        <Grid
          item
          xs={12}
          pt={2}
          sx={{
            width: 1,
            backgroundColor: "black",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Title>Login as admin</Title>
        </Grid>
        <Grid item xs={12} sm={6} md={4} p={3} sx={{ margin: "auto" }}>
          <PaperContent>
            <Form
              size="lg"
              defaultValues={defaultValues}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
            >
              <Section name="">
                <LoginField
                  value={{
                    username: "username",
                    password: "password",
                  }}
                />
              </Section>

              <Actions>
                <LoginButton />
              </Actions>
            </Form>
          </PaperContent>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
