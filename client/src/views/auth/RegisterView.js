import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Page from "../../components/Page";
import { Alert, AlertTitle } from "@material-ui/lab";
import { signUp } from "../../store/actions/AuthActions";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const RegisterView = () => {
  const classes = useStyles();
  const authData = useSelector((state) => state.authData);
  const dispatch = useDispatch();

  const handleRegister = (email, password, setSubmitting) => {
    dispatch(signUp(email, password));
    setSubmitting(false);
  };

  return (
    <Page className={classes.root} title="Register">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Must be a valid email")
                .max(255)
                .required("Email is required"),
              password: Yup.string()
                .max(255)
                .required("password is required"),
            })}
            onSubmit={(values, { setSubmitting }) =>
              handleRegister(values.email, values.password, setSubmitting)
            }
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                  {authData.isAuthLoading && (
                    <CircularProgress
                      color="secondary"
                      style={{ marginTop: "5px" }}
                    />
                  )}
                  {authData.alertType &&
                    authData.alertMessage &&
                    authData.alertFor === "SIGNUP" && (
                      <Alert
                        severity={authData.alertType}
                        style={{ textAlign: "left" }}
                      >
                        <AlertTitle>Error</AlertTitle>
                        {authData.alertMessage}
                      </Alert>
                    )}
                </Box>

                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Have an account?{" "}
                  <Link component={RouterLink} to="/login" variant="h6">
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
