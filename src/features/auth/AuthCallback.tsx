import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useAuth } from "oidc-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { AppDispatch } from "~/app/store";
import { LoginButton } from "~/app/templates/button";
import { PaperContent, Title } from "~/app/templates/content/";
import { Actions, Form, Section } from "~/app/templates/formbuilder";
import LoginField from "~/app/templates/formbuilder/components/LoginField";
import { useSnackBar } from "~/app/templates/snackbar";
import {
  setAccessToken,
  setExpiresAt,
  setRefreshToken,
} from "~/features/auth/authSlice";
// import { authLogin } from "~/features/auth/actions/authLogin";
import loginSchema from "~/features/auth/form/loginSchema";
import {
  getSavedLoginPath,
  setSavedLoginPath,
} from "~/features/auth/userSlice";
import { userManager } from "~/features/auth/utils/userManager";
import { queryApi } from "~/services/queryApi";

const defaultValues = {
  email: "",
  password: "",
};
function AuthCallback() {
  const dispatch: AppDispatch = useDispatch();
  const { openSnackBar } = useSnackBar();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const error_description = params.get("error_description");
  const error = params.get("error");

  const code = params.get("code");

  useEffect(() => {
    (async () => {
      if (code) {
        const user = await userManager.signinRedirectCallback();
        console.log("user", user);
        dispatch(setAccessToken(user.access_token));
        dispatch(setRefreshToken(user.refresh_token || ""));
        dispatch(setExpiresAt(user.expires_at || 0));
        // load me from api
        const me = await dispatch(queryApi.endpoints.getMe.initiate());
        if (savedLoginPath) {
          dispatch(setSavedLoginPath(""));
          navigate(savedLoginPath);
        } else {
          navigate(`/`);
        }
      }
    })();
  }, [code]);
  // const auth = useAuth();

  const savedLoginPath = useSelector(getSavedLoginPath);

  const [buttonDisabled, setButtonDisabled] = useState(false);

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
            {error || error_description ? (
              <>
                <Typography
                  variant="h5"
                  color="error"
                >{`Error: ${error}`}</Typography>
                <Typography
                  variant="h5"
                  color="error"
                >{`${error_description}`}</Typography>
              </>
            ) : (
              <Box p={10} sx={{ textAlign: "center" }}>
                <CircularProgress />
                <Typography variant="h5" pt={3}>
                  Loading...
                </Typography>
              </Box>
            )}
          </PaperContent>
        </Grid>
      </Grid>
    </div>
  );
}

export default AuthCallback;
