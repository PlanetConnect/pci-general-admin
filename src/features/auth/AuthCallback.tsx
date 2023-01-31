import { Button, Grid } from "@mui/material";
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
    if (code) {
      userManager.signinRedirectCallback().then((user) => {
        console.log("user", user);
        dispatch(setAccessToken(user.access_token));
        dispatch(setRefreshToken(user.refresh_token || ""));
        dispatch(setExpiresAt(user.expires_at || 0));
        // if (savedLoginPath) {
        //   dispatch(setSavedLoginPath(""));
        //   navigate(savedLoginPath);
        // } else {
        //   navigate(`/`);
        // }
      });
    }
  }, [code]);
  // const auth = useAuth();

  const savedLoginPath = useSelector(getSavedLoginPath);

  const [buttonDisabled, setButtonDisabled] = useState(false);

  return <div className="main">noone</div>;
}

export default AuthCallback;
