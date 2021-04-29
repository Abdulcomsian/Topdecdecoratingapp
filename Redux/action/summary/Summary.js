import * as actions from "./../../actionTypes";

export const updatePlotReport = (payload) => {
  return {
    type: actions.UPDATE_PLOT_REPORT,
    payload,
  };
};
export const updateHealthReport = (payload) => {
  return {
    type: actions.UPDATE_HEALTH_REPORT,
    payload,
  };
};
export const updateVerificationReport = (payload) => {
  return {
    type: actions.UPDATE_VERIFICATION_REPORT,
    payload,
  };
};
