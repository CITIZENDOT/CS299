import * as actionTypes from "./actionTypes";

export const pageLoader = () => {
  return {
    type: actionTypes.PAGE_LOADER,
  };
};

export const authLoader = () => {
  return {
    type: actionTypes.AUTH_LOADER,
  };
};
