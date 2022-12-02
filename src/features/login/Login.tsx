import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";

import { AppDispatch } from "~/app/store";
import { LoginButton } from "~/app/templates/button";
import { PaperContent, Title } from "~/app/templates/content/";
import { Actions, Form, Section } from "~/app/templates/formbuilder";
import LoginField from "~/app/templates/formbuilder/components/LoginField";
import { useSnackBar } from "~/app/templates/snackbar";
import { authLogin } from "~/features/auth/actions/authLogin";
import loginSchema from "~/features/login/data/form/loginSchema";

const defaultValues = {
  username: "",
  password: "",
};
function Login() {
  const dispatch: AppDispatch = useDispatch();
  const { openSnackBar } = useSnackBar();

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
        authLogin({ username: values.username, password: values.password })
      );
      console.log("🚀 ~ file: Login.tsx:35 ~ handleSubmit ~ user", user);
    } catch (e) {
      console.log("🚀 ~ file: Login.tsx ~ line 44 ~ handleSubmit ~ e", e);
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
