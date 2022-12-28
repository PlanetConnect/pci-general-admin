import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch } from "~/app/store";
import { LoginButton } from "~/app/templates/button";
import { PaperContent, Title } from "~/app/templates/content/";
import { Actions, Form, Section } from "~/app/templates/formbuilder";
import LoginField from "~/app/templates/formbuilder/components/LoginField";
import { useSnackBar } from "~/app/templates/snackbar";
import { authLogin } from "~/features/auth/actions/authLogin";
import loginSchema from "~/features/auth/form/loginSchema";
import {
  getSavedLoginPath,
  setSavedLoginPath,
} from "~/features/auth/userSlice";

const defaultValues = {
  email: "",
  password: "",
};
function Login() {
  const dispatch: AppDispatch = useDispatch();
  const { openSnackBar } = useSnackBar();
  const navigate = useNavigate();

  const savedLoginPath = useSelector(getSavedLoginPath);

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleSubmit = async (values: any) => {
    console.log(values);

    try {
      setButtonDisabled(true);
      const user = await dispatch(
        authLogin({ email: values.email, password: values.password })
      );
      openSnackBar({
        message: "login Success.",
        position: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "success",
      });
      setButtonDisabled(false);

      if (savedLoginPath) {
        dispatch(setSavedLoginPath(""));
        navigate(savedLoginPath);
      } else {
        navigate(`/`);
      }
    } catch (e: any) {
      setButtonDisabled(false);
      openSnackBar({
        message: "login failed. Error: " + e.toString(),
        position: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "error",
      });
      if (e.toString() === "MFA Required") {
        navigate(`/login/mfa`);
      }
      if (e.toString() === "New Password Required") {
        navigate(`/login/newPassword`);
      }
    }
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
                    email: "email",
                    password: "password",
                  }}
                />
              </Section>

              <Actions>
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => {
                    navigate(`/login/forgotPassword`);
                  }}
                  disabled={buttonDisabled}
                >
                  Forgot Password?
                </Button>
                <LoginButton disabled={buttonDisabled} />
              </Actions>
            </Form>
          </PaperContent>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
