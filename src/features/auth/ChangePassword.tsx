import { useDispatch } from "react-redux";

import { AppDispatch } from "~/app/store";
import { CancelButton, LoginButton } from "~/app/templates/button";
import { Actions, Form, Section } from "~/app/templates/formbuilder";
import ChangePasswordField from "~/app/templates/formbuilder/components/ChangePasswordField";
import { useSnackBar } from "~/app/templates/snackbar";
import { authChangePassword } from "~/features/auth/actions/authChangePassword";
import changePasswordSchema from "~/features/auth/form/changePasswordSchema";

const defaultValues = {
  oldPassword: "",
  password1: "",
  password2: "",
};
function ChangePassword({ onSubmit }: { onSubmit: () => void }) {
  const dispatch: AppDispatch = useDispatch();
  const { openSnackBar } = useSnackBar();

  const handleSubmit = async (values: any) => {
    try {
      await dispatch(
        authChangePassword({
          oldPassword: values.oldPassword,
          newPassword: values.password1,
        })
      );

      onSubmit();
      openSnackBar({
        message: "Password Update Success.",
        position: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "success",
      });
    } catch (e: any) {
      openSnackBar({
        message: "Password Update Failed: " + e.toString(),
        position: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "error",
      });
    }
  };
  return (
    <Form
      size="lg"
      defaultValues={defaultValues}
      validationSchema={changePasswordSchema}
      onSubmit={handleSubmit}
    >
      <Section name="">
        <ChangePasswordField
          value={{
            oldPassword: "oldPassword",
            password1: "password1",
            password2: "password2",
          }}
        />
      </Section>

      <Actions>
        <CancelButton onClick={onSubmit} />
        <LoginButton text="Submit" />
      </Actions>
    </Form>
  );
}

export default ChangePassword;
