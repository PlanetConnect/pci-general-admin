import { Grid } from "@mui/material";

import { LoginButton } from "~/app/templates/button";
import { PaperContent, Title } from "~/app/templates/content/";
import { Actions, Form, Header, Section } from "~/app/templates/formbuilder";
import LoginField from "~/app/templates/formbuilder/components/LoginField";
import { useSnackBar } from "~/app/templates/snackbar";
import loginSchema from "~/features/login/data/form/loginSchema";

const defaultValues = {
  username: "",
  password: "",
};
function Login() {
  const { openSnackBar } = useSnackBar();

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
