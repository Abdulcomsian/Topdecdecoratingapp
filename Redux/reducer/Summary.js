import * as actions from "./../actionTypes";
const INITIAL_STATE = {
  plotInfo: [
    { tickSign: false, text: "Hover Over Form", chekecd: false, url: "HandOverForm" },
    { tickSign: false, text: "Make Ready Sheet", chekecd: false, url: "MakeReady" },
    { tickSign: false, text: "Mist Coat", chekecd: false, url: "WranntySannging" },
    { tickSign: false, text: "Quality Inssurance", chekecd: false, url: "QualityInssurance" },
    { tickSign: false, text: "Remedial Wrok Sheet", chekecd: false, url: "RemedialWork" },
    { tickSign: false, text: "Scope", chekecd: false, url: "Scope" },
  ],
  summaryReport: [
    { ploatName: "Workflow", url: "SelectSummaryDetail" },
    { ploatName: "Work Flow", url: "PlotDetails" },
    { ploatName: "Verification of works", url: "VerificationDetails" },
    { ploatName: "Purchase order request" },
    { ploatName: "Health and Safety", url: "HealthSafety" },
  ],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.UPDATE_PLOT_REPORT:
      let copyData = [...state.plotInfo];
      copyData[action.payload].tickSign = true;
      return {
        ...state,
        plotInfo: copyData,
      };
    default:
      return state;
  }
};
