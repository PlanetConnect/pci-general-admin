import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch } from "~/app/store";
import { LoginButton } from "~/app/templates/button";
import { PaperContent, Title } from "~/app/templates/content/";
import { Actions, Form, Section } from "~/app/templates/formbuilder";
import LoginField from "~/app/templates/formbuilder/components/LoginField";
import SignupField from "~/app/templates/formbuilder/components/SignupField";
import { useSnackBar } from "~/app/templates/snackbar";
import { authLogin } from "~/features/auth/actions/authLogin";
import { authSignUp } from "~/features/auth/actions/authSignUp";
import loginSchema from "~/features/auth/form/loginSchema";

const defaultValues = {
  email: "",
  password: "",
  phone: "",
};
function Signup() {
  const dispatch: AppDispatch = useDispatch();
  const { openSnackBar } = useSnackBar();
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
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
      const user = await dispatch(
        authSignUp({
          email: values.email,
          password: values.password,
          phone: values.phone,
        })
      );
      console.log("🚀 ~ file: Signup.tsx:44 ~ handleSubmit ~ user", user);
      navigate(`/login/mfa`);
    } catch (e: any) {
      console.log("🚀 ~ file: Signup.tsx:47 ~ handleSubmit ~ e", e);
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
                <SignupField
                  value={{
                    email: "email",
                    password: "password",
                    phone: "phone",
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

export default Signup;
