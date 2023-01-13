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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useUserContext } from "../controller/userController/userContext";

const loginUser = async (
  email: React.MutableRefObject<any>,
  password: React.MutableRefObject<any>,
  enqueueSnackbar: any,
  navigate: any,
  setUser: any
) => {
  try {
    const auth = getAuth();

    const user = await signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    );
    console.log(user);
    setUser(user.user);
    enqueueSnackbar("Successful login!", { variant: "success" });
    navigate("/");
  } catch (error: any) {
    enqueueSnackbar(error.message, { variant: "error" });
  }
};

const Login = () => {
  const theme = useTheme();
  const { setUser } = useUserContext();
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
  const avatarStyle = { backgroundColor: theme.palette.primary.main };
  const btnstyle = { margin: "8px 0" };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid>
          <Avatar style={avatarStyle}>
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
          style={btnstyle}
          fullWidth
          onClick={() =>
            loginUser(email, password, enqueueSnackbar, navigate, setUser)
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
