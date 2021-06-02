import * as actions from "./../actionTypes";
const INITIAL_STATE = {
  misCoat: [
    {
      tickSign: false,
      text: "Hand Over Form",
      chekecd: false,
      url: "HandOverForm",
    },
    {
      tickSign: false,
      text: "Make Ready Sheet",
      chekecd: false,
      url: "MakeReady",
    },
    {
      tickSign: false,
      text: "Pre Warranty Snagging",
      chekecd: false,
      url: "WranntySannging",
    },
    {
      tickSign: false,
      text: "Quality Assurance",
      chekecd: false,
      url: "QualityInssurance",
    },
    {
      tickSign: false,
      text: "Remedial Work Sheet",
      chekecd: false,
      url: "RemedialWork",
    },
    { tickSign: false, text: "Scope", chekecd: false, url: "Scope" },
  ],
  decorationArray: [
    {
      tickSign: false,
      text: "Hand Over Form",
      chekecd: false,
      url: "HandOverForm",
    },
    {
      tickSign: false,
      text: "Make Ready Sheet",
      chekecd: false,
      url: "MakeReady",
    },
    {
      tickSign: false,
      text: "Pre Warranty Snagging",
      chekecd: false,
      url: "WranntySannging",
    },
    {
      tickSign: false,
      text: "Quality Assurance",
      chekecd: false,
      url: "QualityInssurance",
    },
    {
      tickSign: false,
      text: "Remedial Wrok Sheet",
      chekecd: false,
      url: "RemedialWork",
    },
    { tickSign: false, text: "Scope", chekecd: false, url: "Scope" },
  ],
  snagArray: [
    {
      tickSign: false,
      text: "Hand Over Form",
      chekecd: false,
      url: "HandOverForm",
    },
    {
      tickSign: false,
      text: "Make Ready Sheet",
      chekecd: false,
      url: "MakeReady",
    },
    {
      tickSign: false,
      text: "Pre Warranty Snagging",
      chekecd: false,
      url: "WranntySannging",
    },
    {
      tickSign: false,
      text: "Quality Assurance",
      chekecd: false,
      url: "QualityInssurance",
    },
    {
      tickSign: false,
      text: "Remedial Wrok Sheet",
      chekecd: false,
      url: "RemedialWork",
    },
    { tickSign: false, text: "Scope", chekecd: false, url: "Scope" },
  ],
  verificationMiscoatInfo: [
    { tickSign: false, text: "Day Work Sheet", chekecd: false, url: "DayWork" },
    {
      tickSign: false,
      text: "Decoration Record",
      chekecd: false,
      url: "DecorationRecord",
    },
    { tickSign: false, text: "Mis Coat", chekecd: false, url: "MisCoat" },
    {
      tickSign: false,
      text: "Site Instruction",
      chekecd: false,
      url: "SiteInstruction",
    },
    {
      tickSign: false,
      text: "Verification Of Work",
      chekecd: false,
      url: "VerificationWork",
    },
  ],
  verificationDecorationInfo: [
    { tickSign: false, text: "Day Work Sheet", chekecd: false, url: "DayWork" },
    {
      tickSign: false,
      text: "Decoration Record",
      chekecd: false,
      url: "DecorationRecord",
    },
    { tickSign: false, text: "Mis Coat", chekecd: false, url: "MisCoat" },
    {
      tickSign: false,
      text: "Site Instruction",
      chekecd: false,
      url: "SiteInstruction",
    },
    {
      tickSign: false,
      text: "Verification Of Work",
      chekecd: false,
      url: "VerificationWork",
    },
  ],
  verificationSngInfo: [
    { tickSign: false, text: "Day Work Sheet", chekecd: false, url: "DayWork" },
    {
      tickSign: false,
      text: "Decoration Record",
      chekecd: false,
      url: "DecorationRecord",
    },
    { tickSign: false, text: "Mis Coat", chekecd: false, url: "MisCoat" },
    {
      tickSign: false,
      text: "Site Instruction",
      chekecd: false,
      url: "SiteInstruction",
    },
    {
      tickSign: false,
      text: "Verification Of Work",
      chekecd: false,
      url: "VerificationWork",
    },
  ],
  summaryReport: [
    // { ploatName: "Workflow", url: "SelectSummaryDetail" },
    { ploatName: "Work Flow", url: "PlotDetails" },
    { ploatName: "Verification of works", url: "VerificationDetails" },
    // { ploatName: "Purchase order request" },
    { ploatName: "Health and Safety", url: "HealthSafety" },
  ],
  healthAndSafetyMisCoat: [
    {
      tickSign: false,
      text: "Accident Report",
      chekecd: false,
      url: "AccidentReport",
    },
    {
      tickSign: false,
      text: "Notice Clean Up",
      chekecd: false,
      url: "CleanUp",
    },
    {
      tickSign: false,
      text: "Electrical Equipment",
      chekecd: false,
      url: "ElectricalEquipment",
    },
    { tickSign: false, text: "Friday Pack", chekecd: false, url: "FridayPack" },
    {
      tickSign: false,
      text: "Harmful Substance",
      chekecd: false,
      url: "HarmFulSubstance",
    },
    {
      tickSign: false,
      text: "Health Safety Inspection",
      chekecd: false,
      url: "HealthSafetyInspection",
    },
    {
      tickSign: false,
      text: "Housekeping Checklist",
      chekecd: false,
      url: "HouseKepping",
    },
    {
      tickSign: false,
      text: "Ladder Checklist",
      chekecd: false,
      url: "LadderCheckList",
    },
    {
      tickSign: false,
      text: "Method Statement Register",
      chekecd: false,
      url: "MethodStatement",
    },
    {
      tickSign: false,
      text: "Personal Protective Equipment",
      chekecd: false,
      url: "IssueCard",
    },
    {
      tickSign: false,
      text: "Power Inspection Checklist",
      chekecd: false,
      url: "PowerInspection",
    },
    {
      tickSign: false,
      text: "On-Site Decoration",
      chekecd: false,
      url: "SiteDecoration",
    },
    {
      tickSign: false,
      text: "Record Of Project",
      chekecd: false,
      url: "RecordofProject",
    },
    {
      tickSign: false,
      text: "Daily Briefing Form",
      chekecd: false,
      url: "DailyBreifing",
    },
    {
      tickSign: true,
      text: "Safe Work Procedure",
      chekecd: false,
      url: "SafeWork",
    },
    { tickSign: false, text: "TBT_COSHH", chekecd: false, url: "TBTCOSHH" },
    { tickSign: false, text: "TBT_FIRE", chekecd: false, url: "TBTFIRE" },
    { tickSign: false, text: "TBT_SLIP", chekecd: false, url: "TBTSLIP" },
    { tickSign: false, text: "TBT_COVID", chekecd: false, url: "Covid" },
    {
      tickSign: false,
      text: "TBT_HOUSEKEEPING",
      chekecd: false,
      url: "Tbthouse",
    },
    {
      tickSign: false,
      text: "TBT_MOBILEELEVATED",
      chekecd: false,
      url: "Tbtmobile",
    },
    {
      tickSign: false,
      text: "TBT_RESPIRATORY",
      chekecd: false,
      url: "Tbtrespiratory",
    },
    { tickSign: false, text: "TBT_SILICA", chekecd: false, url: "Tbtsilica" },
    { tickSign: false, text: "TBT_DRUGS", chekecd: false, url: "Tbtdrugs" },
    {
      tickSign: false,
      text: "TBT_VIOLENCE",
      chekecd: false,
      url: "Tbtvolience",
    },
    { tickSign: false, text: "TBT_WORKING", chekecd: false, url: "Tbtworking" },
    {
      tickSign: false,
      text: "TBT_TALKREGISTER",
      chekecd: false,
      url: "TbtRegister",
    },
    {
      tickSign: false,
      text: "TBT_INVENTORY",
      chekecd: false,
      url: "TbtInventory",
    },
  ],
  healthAndSafetyDecoration: [
    {
      tickSign: false,
      text: "Accident Report",
      chekecd: false,
      url: "AccidentReport",
    },
    {
      tickSign: false,
      text: "Notice Clean Up",
      chekecd: false,
      url: "CleanUp",
    },
    {
      tickSign: false,
      text: "Electrical Equipment",
      chekecd: false,
      url: "ElectricalEquipment",
    },
    { tickSign: false, text: "Friday Pack", chekecd: false, url: "FridayPack" },
    {
      tickSign: false,
      text: "Harmful Substance",
      chekecd: false,
      url: "HarmFulSubstance",
    },
    {
      tickSign: false,
      text: "Health Safety Inspection",
      chekecd: false,
      url: "HealthSafetyInspection",
    },
    {
      tickSign: false,
      text: "Housekeping Checklist",
      chekecd: false,
      url: "HouseKepping",
    },
    {
      tickSign: false,
      text: "Ladder Checklist",
      chekecd: false,
      url: "LadderCheckList",
    },
    {
      tickSign: false,
      text: "Method Statement Register",
      chekecd: false,
      url: "MethodStatement",
    },
    {
      tickSign: false,
      text: "Personal Protective Equipment",
      chekecd: false,
      url: "IssueCard",
    },
    {
      tickSign: false,
      text: "Power Inspection Checklist",
      chekecd: false,
      url: "PowerInspection",
    },
    {
      tickSign: false,
      text: "On-Site Decoration",
      chekecd: false,
      url: "SiteDecoration",
    },
    {
      tickSign: false,
      text: "Record Of Project",
      chekecd: false,
      url: "RecordofProject",
    },
    {
      tickSign: false,
      text: "Daily Briefing Form",
      chekecd: false,
      url: "DailyBreifing",
    },
    {
      tickSign: true,
      text: "Safe Work Procedure",
      chekecd: false,
      url: "SafeWork",
    },
    { tickSign: false, text: "TBT_COSHH", chekecd: false, url: "TBTCOSHH" },
    { tickSign: false, text: "TBT_FIRE", chekecd: false, url: "TBTFIRE" },
    { tickSign: false, text: "TBT_SLIP", chekecd: false, url: "TBTSLIP" },
    { tickSign: false, text: "TBT_COVID", chekecd: false, url: "Covid" },
    {
      tickSign: false,
      text: "TBT_HOSEKEEPING",
      chekecd: false,
      url: "Tbthouse",
    },
    {
      tickSign: false,
      text: "TBT_MOBILEEVELATED",
      chekecd: false,
      url: "Tbtmobile",
    },
    {
      tickSign: false,
      text: "TBT_RESPIRATORY",
      chekecd: false,
      url: "Tbtrespiratory",
    },
    { tickSign: false, text: "TBT_SILICA", chekecd: false, url: "Tbtsilica" },
    { tickSign: false, text: "TBT_DRUGS", chekecd: false, url: "Tbtdrugs" },
    {
      tickSign: false,
      text: "TBT_VOLIENCE",
      chekecd: false,
      url: "Tbtvolience",
    },
    { tickSign: false, text: "TBT_WORKING", chekecd: false, url: "Tbtworking" },
    {
      tickSign: false,
      text: "TBT_TALKREGISTER",
      chekecd: false,
      url: "TbtRegister",
    },
    {
      tickSign: false,
      text: "TBT_INVENTORY",
      chekecd: false,
      url: "TbtInventory",
    },
  ],
  healthAndSafetySnag: [
    {
      tickSign: false,
      text: "Accident Report",
      chekecd: false,
      url: "AccidentReport",
    },
    {
      tickSign: false,
      text: "Notice Clean Up",
      chekecd: false,
      url: "CleanUp",
    },
    {
      tickSign: false,
      text: "Electrical Equipment",
      chekecd: false,
      url: "ElectricalEquipment",
    },
    { tickSign: false, text: "Friday Pack", chekecd: false, url: "FridayPack" },
    {
      tickSign: false,
      text: "Harmful Substance",
      chekecd: false,
      url: "HarmFulSubstance",
    },
    {
      tickSign: false,
      text: "Health Safety Inspection",
      chekecd: false,
      url: "HealthSafetyInspection",
    },
    {
      tickSign: false,
      text: "Housekeping Checklist",
      chekecd: false,
      url: "HouseKepping",
    },
    {
      tickSign: false,
      text: "Ladder Checklist",
      chekecd: false,
      url: "LadderCheckList",
    },
    {
      tickSign: false,
      text: "Method Statement Register",
      chekecd: false,
      url: "MethodStatement",
    },
    {
      tickSign: false,
      text: "Personal Protective Equipment",
      chekecd: false,
      url: "IssueCard",
    },
    {
      tickSign: false,
      text: "Power Inspection Checklist",
      chekecd: false,
      url: "PowerInspection",
    },
    {
      tickSign: false,
      text: "On-Site Decoration",
      chekecd: false,
      url: "SiteDecoration",
    },
    {
      tickSign: false,
      text: "Record Of Project",
      chekecd: false,
      url: "RecordofProject",
    },
    {
      tickSign: false,
      text: "Daily Briefing Form",
      chekecd: false,
      url: "DailyBreifing",
    },
    {
      tickSign: true,
      text: "Safe Work Procedure",
      chekecd: false,
      url: "SafeWork",
    },
    { tickSign: false, text: "TBT_COSHH", chekecd: false, url: "TBTCOSHH" },
    { tickSign: false, text: "TBT_FIRE", chekecd: false, url: "TBTFIRE" },
    { tickSign: false, text: "TBT_SLIP", chekecd: false, url: "TBTSLIP" },
    { tickSign: false, text: "TBT_COVID", chekecd: false, url: "Covid" },
    {
      tickSign: false,
      text: "TBT_HOSEKEEPING",
      chekecd: false,
      url: "Tbthouse",
    },
    {
      tickSign: false,
      text: "TBT_MOBILEEVELATED",
      chekecd: false,
      url: "Tbtmobile",
    },
    {
      tickSign: false,
      text: "TBT_RESPIRATORY",
      chekecd: false,
      url: "Tbtrespiratory",
    },
    { tickSign: false, text: "TBT_SILICA", chekecd: false, url: "Tbtsilica" },
    { tickSign: false, text: "TBT_DRUGS", chekecd: false, url: "Tbtdrugs" },
    {
      tickSign: false,
      text: "TBT_VOLIENCE",
      chekecd: false,
      url: "Tbtvolience",
    },
    { tickSign: false, text: "TBT_WORKING", chekecd: false, url: "Tbtworking" },
    {
      tickSign: false,
      text: "TBT_TALKREGISTER",
      chekecd: false,
      url: "TbtRegister",
    },
    {
      tickSign: false,
      text: "TBT_INVENTORY",
      chekecd: false,
      url: "TbtInventory",
    },
  ],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.UPDATE_HEALTH_REPORT:
      let copyData1 = [...state.healthAndSafety];
      copyData1[action.payload].tickSign = true;
      return {
        ...state,
        healthAndSafety: copyData1,
      };

    case actions.UPDATE_PLOT_REPORT:
      let copyData2 = [...state.plotInfo];
      copyData2[action.payload].tickSign = true;
      return {
        ...state,
        plotInfo: copyData2,
      };
    case actions.UPDATE_VERIFICATION_REPORT:
      let copyData3 = [...state.verificationInfo];
      copyData3[action.payload].tickSign = true;
      return {
        ...state,
        verificationInfo: copyData3,
      };

    case actions.UPDATE_MISCOT_WORKFLOW:
      return {
        ...state,
        misCoat: action.payload,
      };
    case actions.UPDATE_DECORATION_WORKFLOW:
      return {
        ...state,
        decorationArray: action.payload,
      };
    case actions.UPDATE_SNAG_WORKFLOW:
      return {
        ...state,
        snagArray: action.payload,
      };

      case actions.UPDATE_MISCOT_VERIFICATION:
        return {
          ...state,
          verificationMiscoatInfo: action.payload,
        };
      case actions.UPDATE_DECORATION_VERIFICATION:
        return {
          ...state,
          verificationDecorationInfo: action.payload,
        };
      case actions.UPDATE_SNAG_VERIFICATION:
        return {
          ...state,
          verificationSngInfo: action.payload,
        };
        case actions.UPDATE_MISCOT_HEALTH:
          return {
            ...state,
            healthAndSafetyMisCoat: action.payload,
          };
        case actions.UPDATE_DECORATION_HEALTH:
          return {
            ...state,
            healthAndSafetyDecoration: action.payload,
          };
        case actions.UPDATE_SNAG_HEALTH:
          return {
            ...state,
            healthAndSafetySnag: action.payload,
          };
    default:
      return state;
  }
};
