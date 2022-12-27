import { Button, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch } from "~/app/store";
import { LoginButton } from "~/app/templates/button";
import ResendConfirmationButton from "~/app/templates/button/components/ResendConfirmationButton";
import { PaperContent, Title } from "~/app/templates/content/";
import { Actions, Form, Section } from "~/app/templates/formbuilder";
import LoginField from "~/app/templates/formbuilder/components/LoginField";
import LoginMfaField from "~/app/templates/formbuilder/components/LoginMfaField";
import LoginNewPasswordField from "~/app/templates/formbuilder/components/LoginNewPasswordField";
import { useSnackBar } from "~/app/templates/snackbar";
import { authLogin } from "~/features/auth/actions/authLogin";
import { authLoginMfa } from "~/features/auth/actions/authLoginMfa";
import { authLoginNewPassword } from "~/features/auth/actions/authLoginNewPassword";
import { authSignUp } from "~/features/auth/actions/authSignUp";
import confirmationCodeSchema from "~/features/auth/form/confirmationCodeSchema";
import newPasswordSchema from "~/features/auth/form/newPasswordSchema";

const defaultValues = {
  password1: "",
  password2: "",
};
function LoginNewPassword() {
  const dispatch: AppDispatch = useDispatch();
  const { openSnackBar } = useSnackBar();
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    console.log(values);
    // openSnackBar({
    //   message: "login Success.",
    //   position: {
    //     vertical: "top",
    //     horizontal: "center",
    //   },
    //   variant: "success",
    // });
    try {
      const newPass = await dispatch(
        authLoginNewPassword({ newPassword: values.password1 })
      );
      console.log(
        "🚀 ~ file: newPass.tsx:35 ~ handleSubmit ~ newPass",
        newPass
      );
      navigate(`/`);
    } catch (e: any) {
      if (e.toString() === "MFA Required") {
        navigate(`/login/mfa`);
      }
      console.log(
        "🚀 ~ file: LoginMfa.tsx:42 ~ handleSubmit ~ e.toString()",
        e.toString()
      );
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
          <Title>Enter your new password</Title>
        </Grid>
        <Grid item xs={12} sm={6} md={4} p={3} sx={{ margin: "auto" }}>
          <PaperContent>
            <Form
              size="lg"
              defaultValues={defaultValues}
              validationSchema={newPasswordSchema}
              onSubmit={handleSubmit}
            >
              <Section name="">
                <LoginNewPasswordField
                  value={{
                    password1: "password1",
                    password2: "password2",
                  }}
                />
              </Section>

              <Actions>
                <LoginButton text="Submit" />
              </Actions>
            </Form>
          </PaperContent>
        </Grid>
      </Grid>
    </div>
  );
}

export default LoginNewPassword;
