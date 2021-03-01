import "react-perfect-scrollbar/dist/css/styles.css";
import React from "react";
import { useRoutes } from "react-router-dom";
import { Grid, ThemeProvider } from "@material-ui/core";
import GlobalStyles from "./components/GlobalStyles";
import theme from "./theme";
import routes from "./routes";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "./store/actions/AuthActions";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loader = () => {
  return (
    <Grid
      container
      style={{
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Grid>
  );
};

const App = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const routing = useRoutes(routes(isAuthenticated));
  const isPageLoading = useSelector((state) => state.isPageLoading);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {isPageLoading ? <Loader /> : routing}
    </ThemeProvider>
  );
};

export default App;
