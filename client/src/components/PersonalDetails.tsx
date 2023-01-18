import {
  Button,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { useRef, useState } from "react";
import { Clear, ResetTv, Save } from "@mui/icons-material";
import { useUserContext } from "../controller/userController/userContext";
const PersonalDetails = () => {
  const { user, setUser } = useUserContext();

  const [displayName, setDisplayName] = useState(user?.displayName);
  const [email, setEmail] = useState(user?.email);
  const [newPassword, setNewPassword] = useState(user?.email);
  const [confirmNewPassword, setConfirmNewPassword] = useState(user?.email);

  const onSaveChanges = () => {};

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
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
              label="email"
              type={"email"}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={newPassword}
              onChange={({ target: { value } }) => setNewPassword(value)}
              label="Password"
              type="password"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={confirmNewPassword}
              onChange={({ target: { value } }) => setConfirmNewPassword(value)}
              label="Confirm password"
              type="password"
              fullWidth
              error={!!newPassword && newPassword === confirmNewPassword}
            />
          </Grid>
        </Grid>
      </Paper>
      <Stack direction={"row"} spacing={3}>
        <Button
          color="secondary"
          variant={"contained"}
          startIcon={<Save />}
          onClick={onSaveChanges}
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
