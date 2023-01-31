import { Grid, Typography } from "@mui/material";

import { LoginButton } from "~/app/templates/button";
import { PaperContent, Title } from "~/app/templates/content/";
import { userManager } from "~/features/auth/utils/userManager";

function Login() {
  const handleLogin = async () => {
    userManager.signinRedirect();
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
            <Typography variant="h6" component="h1" mb={2}>
              Login to Admin Portal
            </Typography>
            <LoginButton onClick={handleLogin} />
          </PaperContent>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
