import { Grid } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch } from "~/app/store";
import { LoginButton } from "~/app/templates/button";
import { PaperContent, Title } from "~/app/templates/content/";
import { Actions, Form, Section } from "~/app/templates/formbuilder";
import ForgotPasswordEmailField from "~/app/templates/formbuilder/components/ForgotPasswordEmailField";
import LoginMfaField from "~/app/templates/formbuilder/components/LoginMfaField";
import LoginNewPasswordField from "~/app/templates/formbuilder/components/LoginNewPasswordField";
import { useSnackBar } from "~/app/templates/snackbar";
import { authConfirmPassword } from "~/features/auth/actions/authConfirmPassword";
import { authForgotPassword } from "~/features/auth/actions/authForgotPassword";
import forgotPasswordSchema from "~/features/auth/form/forgotPasswordSchema";

const defaultValues = {
  email: "",
  code: "",
  password1: "",
  password2: "",
};
function ForgotPassword() {
  const dispatch: AppDispatch = useDispatch();
  const { openSnackBar } = useSnackBar();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = async (values: any) => {
    try {
      if (email === "") {
        setEmail(values.email);
        await dispatch(
          authForgotPassword({
            email: values.email,
          })
        );
      } else {
        const result = await dispatch(
          authConfirmPassword({
            code: values.code,
            newPassword: values.password1,
          })
        );

        if (result === "success") {
          navigate(`/login`);
          openSnackBar({
            message: "Password Updated. Please login with new password.",
            position: {
              vertical: "top",
              horizontal: "center",
            },
            variant: "success",
          });
        }
      }
    } catch (e: any) {
      openSnackBar({
        message: "email failed. Error: " + e.toString(),
        position: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "error",
      });
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
          <Title>Forgot Password?</Title>
        </Grid>
        <Grid item xs={12} sm={6} md={4} p={3} sx={{ margin: "auto" }}>
          <PaperContent>
            <Form
              size="lg"
              defaultValues={defaultValues}
              validationSchema={forgotPasswordSchema}
              onSubmit={handleSubmit}
            >
              {email === "" && (
                <Section name="">
                  <ForgotPasswordEmailField
                    value={{
                      email: "email",
                    }}
                  />
                </Section>
              )}
              {email !== "" && (
                <Section name="">
                  <LoginMfaField
                    value={{
                      code: "code",
                    }}
                  />
                  <LoginNewPasswordField
                    value={{
                      password1: "password1",
                      password2: "password2",
                    }}
                  />
                </Section>
              )}

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

export default ForgotPassword;
