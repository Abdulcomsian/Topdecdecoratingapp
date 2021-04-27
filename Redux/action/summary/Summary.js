import * as actions from "./../../actionTypes";

export const updatePlotReport = (payload) => {
  return {
    type: actions.UPDATE_PLOT_REPORT,
    payload,
  };
};
