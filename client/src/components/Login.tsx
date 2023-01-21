import React, { useRef } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/Lock";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useTheme } from "@mui/material/styles";
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useUserContext } from "../controller/userController/userContext";
import { RoutePaths } from "../App";

const loginUser = async (
  email: React.MutableRefObject<any>,
  password: React.MutableRefObject<any>,
  onSuccess: (user: User) => void,
  onError: (error: any) => void
) => {
  try {
    const auth = getAuth();
    await setPersistence(auth, browserSessionPersistence);

    const user: UserCredential = await signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    );

    if (user.user == null) throw new Error();
    onSuccess(user.user);
  } catch (error: any) {
    onError(error);
  }
};

const Login = () => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const email: React.MutableRefObject<any> = useRef(null);
  const password: React.MutableRefObject<any> = useRef(null);
  const paperStyle = {
    padding: 20,
    height: "60vh",
    width: "35vh",
    margin: "auto",
    backgroundColor: theme.palette.background.paper,
  };
  return (
    <Grid>
      <Paper elevation={3} style={paperStyle}>
        <Grid>
          <Avatar sx={{ backgroundColor: theme.palette.primary.main }}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <TextField
          inputRef={email}
          label="Email"
          placeholder="Enter email"
          fullWidth
          required
        />
        <TextField
          inputRef={password}
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
        />
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{ margin: "8px 0" }}
          fullWidth
          onClick={() =>
            loginUser(
              email,
              password,
              () => {
                enqueueSnackbar("Successful login!", { variant: "success" });
                navigate(RoutePaths.HOME);
              },
              (error) => {
                enqueueSnackbar(error.message, { variant: "error" });
              }
            )
          }
        >
          Sign in
        </Button>
        <Typography>
          <Link href="#">Forgot password ?</Link>
        </Typography>
        <Typography>
          {" "}
          Do you have an account ?<Link href="/Signup">Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
