import * as actionTypes from "./actions/actionTypes";

const initialState = {
  isPageLoading: false,
  isAuthenticated: false,
  userData: {
    email: null,
    accessToken: null,
  },
  authData: {
    isAuthLoading: false,
    alertMessage: null,
    alertType: null,
    alertFor: null,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PAGE_LOADER:
      return {
        ...state,
        userData: {
          ...state.userData,
        },
        authData: {
          ...state.authData,
        },
        isPageLoading: true,
      };

    case actionTypes.AUTH_LOADER:
      return {
        ...state,
        userData: {
          ...state.userData,
        },
        authData: {
          ...state.authData,
          isAuthLoading: true,
        },
      };

    case actionTypes.AUTH:
      const isPageLoading =
        "isPageLoading" in action ? action.isPageLoading : state.isPageLoading;
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        isPageLoading: isPageLoading,
        userData: {
          ...state.userData,
          email: action.email,
          accessToken: action.accessToken,
        },
        authData: {
          ...state.authData,
          isAuthLoading: false,
          alertMessage: action.alertMessage,
          alertType: action.alertType,
          alertFor: action.alertFor,
        },
      };

    default:
      return state;
  }
};

export default reducer;
