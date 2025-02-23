import axios from 'axios'
import { useNavigate } from "react-router-dom";

import { useState } from "react"
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Container,
  Box,
  Avatar,
  Snackbar,
  Alert,
  Link,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Grid2,
} from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import { motion } from "framer-motion"

// Create a custom theme with black and yellow colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#FFD700", // Yellow
    },
    secondary: {
      main: "#000000", // Black
    },
    background: {
      default: "#000000",
      paper: "#111111",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#CCCCCC",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: "none",
          fontSize: "1rem",
          padding: "10px 20px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#FFD700",
            },
            "&:hover fieldset": {
              borderColor: "#FFD700",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#FFD700",
            },
          },
        },
      },
    },
  },
})

const MotionContainer = motion(Container)
const MotionPaper = motion(Paper)

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [alert, setAlert] = useState({ open: false, message: "", severity: "info" })

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isLogin) {
        await loginUser({ username, password })
      } else {
        await signupUser({ username, email, password })
      }
    } catch (error) {
      setAlert({
        open: true,
        message: error.message || "An error occurred",
        severity: "error",
      })
    }
  }
  function resetForm() {
    setEmail("");
    setUsername("");
    setPassword("");
  }
  const loginUser = async (credentials) => {
    try {
      const response = await fetch("http://localhost:8080/userLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()
      //console.log(data);
      if (!response.ok) throw new Error(data.message || "Login failed")
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      setAlert({
        open: true,
        message: "Login successful!",
        severity: "success",
      })
      resetForm();
      navigate("/dairy");
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        severity: "error",
      })
    }
  }

  const signupUser = async (userData) => {
    try {
      const response = await fetch("http://localhost:8080/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.message || "Signup failed")

      setAlert({
        open: true,
        message: "Account created successfully! Please log in.",
        severity: "success",
      })
      setIsLogin(true)
      resetForm()
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        severity: "error",
      })
    }
  }


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MotionContainer
        component="main"
        maxWidth="xs"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <MotionPaper
          elevation={6}
          sx={{
            p: 4,
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 4,
            backgroundColor: "background.paper",
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main", color: "secondary.main" }}>
            {isLogin ? <LockOutlinedIcon /> : <PersonAddIcon />}
          </Avatar>
          <Typography component="h1" variant="h5" color="text.primary">
            {isLogin ? "Log In" : "Sign Up"}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                  InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
                  InputProps={{ style: { color: theme.palette.text.primary } }}
                />
              </Grid>
              {!isLogin && (
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
                    InputProps={{ style: { color: theme.palette.text.primary } }}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
                  InputProps={{ style: { color: theme.palette.text.primary } }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLogin ? "Log In" : "Sign Up"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  component={motion.button}
                  variant="body2"
                  onClick={() => { setIsLogin(!isLogin) }}
                  sx={{ color: "primary.main", cursor: "pointer", backgroundColor: "secondary.main" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </MotionPaper>

        <Snackbar
          open={alert.open}
          autoHideDuration={6000}
          onClose={() => setAlert({ ...alert, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity={alert.severity}
            onClose={() => setAlert({ ...alert, open: false })}
            sx={{ width: "100%", bgcolor: "background.paper", color: "text.primary" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      </MotionContainer>
    </ThemeProvider>
  )
}

export default LoginPage;

