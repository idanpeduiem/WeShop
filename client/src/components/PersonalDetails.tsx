import { Button, Grid, Paper, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { Clear, Save } from "@mui/icons-material";
import { useUserContext } from "../controller/userController/userContext";
import { firebase } from "../utils/firebase";
import { useSnackbar } from "notistack";
const PersonalDetails = () => {
  const { user } = useUserContext();
  const { enqueueSnackbar } = useSnackbar();

  const [displayName, setDisplayName] = useState(user?.displayName);
  const [email, setEmail] = useState(user?.email);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const onSaveChanges = async (newPassword: string, displayName: string) => {
    try {
      await firebase.updatePassword(newPassword);
      await firebase.updateProfile(displayName);
      enqueueSnackbar("Successful update!", { variant: "success" });
    } catch (e: any) {
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };

  const checkProviderId = (providerId: string) =>
    providerId === user?.providerData[0].providerId;

  const onDiscardChanges = () => {
    setDisplayName(user?.displayName);
    setEmail(user?.email);
    setNewPassword("");
    setConfirmNewPassword("");
  };
  return (
    <Stack spacing={2}>
      <Paper variant={"outlined"}>
        <Grid container spacing={2} padding={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              value={displayName}
              onChange={({ target: { value } }) => setDisplayName(value)}
              variant="outlined"
              label="User name"
              fullWidth
              error={!displayName}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
              label="email"
              type={"email"}
              disabled={true}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        {!checkProviderId("google.com") && (
          <Grid container spacing={2} padding={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={newPassword}
                onChange={({ target: { value } }) => setNewPassword(value)}
                label="Password"
                type="password"
                fullWidth
                error={!newPassword}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={confirmNewPassword}
                onChange={({ target: { value } }) =>
                  setConfirmNewPassword(value)
                }
                label="Confirm password"
                type="password"
                fullWidth
                error={!newPassword || newPassword !== confirmNewPassword}
              />
            </Grid>
          </Grid>
        )}
      </Paper>
      <Stack direction={"row"} spacing={3}>
        <Button
          color="secondary"
          variant={"contained"}
          startIcon={<Save />}
          disabled={
            checkProviderId("google.com")
              ? !displayName
              : !displayName ||
                !newPassword ||
                newPassword !== confirmNewPassword
          }
          onClick={() =>
            confirmNewPassword &&
            displayName &&
            onSaveChanges(confirmNewPassword, displayName)
          }
        >
          Save
        </Button>
        <Button startIcon={<Clear />} onClick={onDiscardChanges}>
          Discard
        </Button>
      </Stack>
    </Stack>
  );
};

export default PersonalDetails;
