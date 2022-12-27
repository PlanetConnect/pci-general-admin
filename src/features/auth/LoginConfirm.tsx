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
import { useSnackBar } from "~/app/templates/snackbar";
import { authLogin } from "~/features/auth/actions/authLogin";
import { authLoginConfirm } from "~/features/auth/actions/authLoginConfirm";
import { authLoginMfa } from "~/features/auth/actions/authLoginMfa";
import { authSignUp } from "~/features/auth/actions/authSignUp";
import confirmationCodeSchema from "~/features/auth/form/confirmationCodeSchema";

const defaultValues = {
  code: "",
};
function LoginConfirm() {
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
      const mfa = await dispatch(authLoginConfirm({ code: values.code }));
      console.log("🚀 ~ file: mfa.tsx:35 ~ handleSubmit ~ mfa", mfa);
      navigate(`/`);
    } catch (e: any) {
      if (e.toString() === "MFA Required") {
        navigate(`/login/mfa`);
      }
      console.log(
        "🚀 ~ file: Login.tsx ~ line 44 ~ handleSubmit ~ e",
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
          <Title>Enter your verification code</Title>
        </Grid>
        <Grid item xs={12} sm={6} md={4} p={3} sx={{ margin: "auto" }}>
          <PaperContent>
            <Form
              size="lg"
              defaultValues={defaultValues}
              validationSchema={confirmationCodeSchema}
              onSubmit={handleSubmit}
            >
              <Section name="">
                <LoginMfaField
                  value={{
                    code: "code",
                  }}
                />
              </Section>
              <ResendConfirmationButton />

              <Actions>
                <LoginButton text="Submit Verification Code" />
              </Actions>
            </Form>
          </PaperContent>
        </Grid>
      </Grid>
    </div>
  );
}

export default LoginConfirm;
