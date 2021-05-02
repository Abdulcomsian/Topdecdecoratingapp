import * as Actions from "../actionTypes";
import { AsyncStorage } from 'react-native';

const initialState = {
    // token: localStorage.getItem("token"),
    isLogin: false,
    isLoginMsg: null,
    token: null,
    createSuperVisor: false,
    createSuperVisorMsg: null,
    supervisorName: null,
    supervisorEmail:null,
    supervisorNumber:null,
    supervisorPassword:null,
    supervisorStatus:false,
    isJob:false,
    isJobMsg:null,
    createDecorator: false,
    createDecoratorMsg: null,
    isSeacrh: false,
    supervisorArray : [],
    decoratorArray : [],
    isUpdate:true,
    isUpdateMsg:null,
    isSuccess:true,
    isSuccessMsg:null,
    isCode:null,
    isValidateUserID:null,
    isResetSucces: false,
    isResetMsg:null,
    isUser: null,
    role:null,
    isUserID: null,
    isJobId: null,
    isHandOver:false,
    isMakeReady: false,
    isMisCoat: false,
    isQuality: false,
    isRemedial: false,
    isScope: false,
    isDayWork: false,
    isDecoration: false,
    isVerifyMiscoat: false,
    isSiteInstruction: false,
    isVerifyWork: false,
    isMethod: false
};

export default (state = initialState, action)=> {
    //  const { type,payload } = action;
      switch (action.type) {
            case Actions.LOGIN_SUCCESS:
                console.log("LOGIN SUCCESS")
                return{
                    ...state,
                    isLogin: true,
                    isLoginMsg: action.payload.message,
                    role: action.payload.user.role,
                    token: action.payload.data.split("|")[1],
                    isUserID: action.payload.user.id
                    
                }
                case Actions.RESET_LOGIN_FLAG:
                    return{
                        ...state,
                        isLogin: false,
                    }
            case Actions.LOGIN_FAIL:
             alert("Wrong Credential")
                return{
                    ...state,
                    isLogin: false,
                    isLoginMsg: action.payload.message,
                }
            case Actions.CREATE_SUPERVISOR_SUCSESS:
             console.log("CREATE SUPERVISOR")
                return{
                    ...state,
                    createSuperVisor: true,
                    createSuperVisorMsg: action.payload.message
                }
            case Actions.CREATE_SUPERVISOR_FAIL:
             console.log("CREATE SUPERVISOR FAIL")
                return{
                    ...state,
                    createSuperVisor: false,
                    createSuperVisorMsg : action.payload.message
                }
            case Actions.CREATE_NEW_JOB_SUCCESS:
            //  alert("Job Saved SuccessFully")
                return{
                    ...state,
                    isJob: true,
                    isJobMsg : action.payload.message,
                    isJobId : action.payload.data.user.id
                }
            case Actions.CREATE_NEW_JOB_FAIL:
             console.log("CREATE_NEW_JOB_FAIL")
                return{
                    ...state,
                    isJob: false,
                    isJobMsg : action.payload.message
                }
            case Actions.CREATE_DECORATOR_SUCSESS:
             alert("Decorator Create SuccessFully !")
                return{
                    ...state,
                    createDecorator: true,
                    createDecoratorMsg : action.payload.message
                }
            case Actions.CREATE_DECORATOR_FAIL:
                alert("Decorator Creation Failed !")
                return{
                    ...state,
                    icreateDecorator: false,
                    createDecoratorMsg : action.payload.message
                }
                case Actions.SEARCH_DECORATOR_SUCCESS:
                    console.log("SEARCH_DECORATOR_SUCCESS",action.payload)
                       return{
                           ...state,
                           isSeacrh: true,
                           decoratorArray : action.payload
                       }
            case Actions.SEARCH_SUPERVISOR_SUCCESS:
             console.log("SEARCH_SUPERVISOR_SUCCESS",action.payload)
                return{
                    ...state,
                    isSeacrh: true,
                    supervisorArray : action.payload
                }
            case Actions.UPDATE_SUPERVISOR_SUCCESS:
             console.log("UPDATE_SUPERVISOR_SUCCESS",action.payload)
                return{
                    ...state,
                    isUpdate: true,
                    isUpdateMsg : action.payload.message
                }
            case Actions.FORGOT_EMAIL_CHECK_SUCCESS:
             console.log("FORGOT_EMAIL_CHECK_SUCCESS",action.payload)
                return{
                    ...state,
                    isSuccess: true,
                    isSuccessMsg : action.payload.message,
                    isCode : action.payload.data.user
                }
            case Actions.CODE_VALIDATE_SUCCESS:
             console.log("CODE_VALIDATE_SUCCESS",action.payload)
                return{
                    ...state,
                    isSuccess: true,
                    isValidateUserID : action.payload,
                }
            case Actions.FORGOT_EMAIL_CHECK_FAIL:
             console.log("FORGOT_EMAIL_CHECK_FAIL",action.payload)
                return{
                    ...state,
                    isSuccess: false,
                    isValidateUserID : action.payload,
                }
            case Actions.RESET_PASSWORD_SUCCESS:
             console.log("RESET_PASSWORD_SUCCESS",action.payload)
                return{
                    ...state,
                    isResetSucces: true,
                    isResetMsg : action.payload.message,
                }
            case Actions.RESET_PASSWORD_FAIL:
             console.log("RESET_PASSWORD_FAIL",action.payload)
                return{
                    ...state,
                    isResetSucces: false,
                    isResetMsg : action.payload.message,
                }
            case Actions.CREATE_HAND_OVER_SHEET_SUCCESS:
             console.log("CREATE_HAND_OVER_SHEET_SUCCESS",action.payload)
                return{
                    ...state,
                    isHandOver: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.CREATE_HAND_OVER_SHEET_FAIL:
             console.log("CREATE_HAND_OVER_SHEET_FAIL",action.payload)
                return{
                    ...state,
                    isHandOver: false,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.CREATE_MAKE_READY_SHEET_SUCCESS:
             console.log("CREATE_MAKE_READY_SHEET_SUCCESS",action.payload)
                return{
                    ...state,
                    isMakeReady: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.CREATE_MAKE_READY_SHEET_FAIL:
             console.log("CREATE_MAKE_READY_SHEET_FAIL",action.payload)
                return{
                    ...state,
                    isMakeReady: false,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.CREATE_REMEDIAL_WORK_SHEET_SUCCESS:
             console.log("CREATE_REMEDIAL_WORK_SHEET_SUCCESS",action.payload)
                return{
                    ...state,
                    isRemedial: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.CREATE_REMEDIAL_WORK_SHEET_FAIL:
             console.log("CREATE_REMEDIAL_WORK_SHEET_FAIL",action.payload)
                return{
                    ...state,
                    isRemedial: false,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.CREATE_SCOPE_FORM_SUCCESS:
             console.log("CREATE_SCOPE_FORM_SUCCESS",action.payload)
                return{
                    ...state,
                    isScope: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.CREATE_SCOPE_FORM_FAIL:
             console.log("CREATE_SCOPE_FORM_FAIL",action.payload)
                return{
                    ...state,
                    isScope: false,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.CREATE_PRE_WRRANTY_FORM_SUCCESS:
             console.log("CREATE_PRE_WRRANTY_FORM_SUCCESS",action.payload)
                return{
                    ...state,
                    isSuccess: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.CREATE_PRE_WRRANTY_FORM_FAIL:
             console.log("CREATE_PRE_WRRANTY_FORM_FAIL",action.payload)
                return{
                    ...state,
                    isSuccess: false,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.CREATE_QUALITY_ANSURANCE_FORM_SUCCESS:
             console.log("CREATE_QUALITY_ANSURANCE_FORM_SUCCESS",action.payload)
                return{
                    ...state,
                    isQuality: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.CREATE_QUALITY_ANSURANCE_FORM_FAIL:
             console.log("CREATE_QUALITY_ANSURANCE_FORM_FAIL",action.payload)
                return{
                    ...state,
                    isQuality: false,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_ACCURATE_DAY_WOEK_SHEET_CREATE:
             console.log("INSERT_ACCURATE_DAY_WOEK_SHEET_CREATE",action.payload)
                return{
                    ...state,
                    isDayWork: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_ACCURATE_DAY_WOEK_SHEET_FAIL:
             console.log("INSERT_ACCURATE_DAY_WOEK_SHEET_FAIL",action.payload)
                return{
                    ...state,
                    isDayWork: false,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_DECORATION_RECORD_SUCCESS:
             console.log("INSERT_DECORATION_RECORD_SUCCESS",action.payload)
                return{
                    ...state,
                    isDecoration: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_DECORATION_RECORD_FAIL:
             console.log("INSERT_DECORATION_RECORD_FAIL",action.payload)
                return{
                    ...state,
                    isDecoration: false,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_MISCOAT_SUCCESS:
             console.log("INSERT_MISCOAT_SUCCESS",action.payload)
                return{
                    ...state,
                    isVerifyMiscoat: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_MISCOAT_FAIL:
             console.log("INSERT_MISCOAT_FAIL",action.payload)
                return{
                    ...state,
                    isVerifyMiscoat: false,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_SITE_INSTRUCTION_SUCCESS:
             console.log("INSERT_SITE_INSTRUCTION_SUCCESS",action.payload)
                return{
                    ...state,
                    isSiteInstruction: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_SITE_INSTRUCTION_FAIL:
             console.log("INSERT_SITE_INSTRUCTION_FAIL",action.payload)
                return{
                    ...state,
                    isSiteInstruction: false,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_VERIFICATION_WORK_SUCCESS:
             console.log("INSERT_VERIFICATION_WORK_SUCCESS",action.payload)
                return{
                    ...state,
                    isVerifyWork: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_VERIFICATION_WORK_FAIL:
             console.log("INSERT_VERIFICATION_WORK_FAIL",action.payload)
                return{
                    ...state,
                    isVerifyWork: false,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_CLEAN_UP_FORM_SUCCESS:
             console.log("INSERT_CLEAN_UP_FORM_SUCCESS",action.payload)
                return{
                    ...state,
                    isSuccess: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_CLEAN_UP_FORM_FAIL:
             console.log("INSERT_CLEAN_UP_FORM_FAIL",action.payload)
                return{
                    ...state,
                    isSuccess: false,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_ELECTRICAL_EQUIPMENT_FORM_SUCCESS:
             console.log("INSERT_ELECTRICAL_EQUIPMENT_FORM_SUCCESS",action.payload)
                return{
                    ...state,
                    isSuccess: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_ELECTRICAL_EQUIPMENT_FORM_FAIL:
             console.log("INSERT_ELECTRICAL_EQUIPMENT_FORM_FAIL",action.payload)
                return{
                    ...state,
                    isSuccess: false,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_HARMFUL_SUBSTANCE_FORM_SUCCESS:
             console.log("INSERT_HARMFUL_SUBSTANCE_FORM_SUCCESS",action.payload)
                return{
                    ...state,
                    isSuccess: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_HARMFUL_SUBSTANCE_FORM_FAIL:
             console.log("INSERT_HARMFUL_SUBSTANCE_FORM_FAIL",action.payload)
                return{
                    ...state,
                    isSuccess: false,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_HOUSE_KEEPING_FORM_SUCCESS:
             console.log("INSERT_HOUSE_KEEPING_FORM_SUCCESS",action.payload)
                return{
                    ...state,
                    isSuccess: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_HOUSE_KEEPING_FORM_FAIL:
             console.log("INSERT_HOUSE_KEEPING_FORM_FAIL",action.payload)
                return{
                    ...state,
                    isSuccess: false,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_METHOD_STATEMENT_FORM_SUCCESS:
             console.log("INSERT_METHOD_STATEMENT_FORM_SUCCESS",action.payload)
                return{
                    ...state,
                    isMethod: true,
                    isSuccessMsg : action.payload.message,
                   
                }
            case Actions.INSERT_METHOD_STATEMENT_FORM_FAIL:
             console.log("INSERT_METHOD_STATEMENT_FORM_SUCCESS",action.payload)
                return{
                    ...state,
                    isMethod: false,
                    isSuccessMsg : action.payload.message,
                   
                }
            case Actions.INSERT_ON_SITE_DECORATION_FORM_SUCCESS:
             console.log("INSERT_ON_SITE_DECORATION_FORM_SUCCESS",action.payload)
                return{
                    ...state,
                    isOnSite: true,
                    isSuccessMsg : action.payload.message,
                   
                }
            case Actions.INSERT_ON_SITE_DECORATION_FORM_FAIL:
             console.log("INSERT_ON_SITE_DECORATION_FORM_FAIL",action.payload)
                return{
                    ...state,
                    isOnSite: false,
                    isSuccessMsg : action.payload.message,
                   
                }
            case Actions.INSERT_RECORD_OF_PROJECT_FORM_SUCCESS:
             console.log("INSERT_RECORD_OF_PROJECT_FORM_SUCCESS",action.payload)
                return{
                    ...state,
                    isOnSite: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_LADDER_CHECKLIST_FORM_SUCCESS:
             console.log("INSERT_LADDER_CHECKLIST_FORM_SUCCESS",action.payload)
                return{
                    ...state,
                    isOnSite: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_PERSONAL_PROTECTIVE_FORM_SUCCESS:
             console.log("INSERT_PERSONAL_PROTECTIVE_FORM_SUCCESS",action.payload)
                return{
                    ...state,
                    isOnSite: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_TBT_COSH_FORM_SUCCESS:
             console.log("INSERT_TBT_COSH_FORM_SUCCESS",action.payload)
                return{
                    ...state,
                    isOnSite: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_TBT_FIRE_FORM_SUCCESS:
             console.log("INSERT_TBT_FIRE_FORM_SUCCESS",action.payload)
                return{
                    ...state,
                    isOnSite: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_TBT_SLIP_FORM_SUCCESS:
             console.log("INSERT_TBT_SLIP_FORM_SUCCESS",action.payload)
                return{
                    ...state,
                    isOnSite: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_TBT_COVID_FORM_SUCCESS:
             console.log("INSERT_TBT_COVID_FORM_SUCCESS",action.payload)
                return{
                    ...state,
                    isOnSite: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_TBT_HOUSEKEEPING_FORM_SUCCESS:
             console.log("INSERT_TBT_HOUSEKEEPING_FORM_SUCCESS",action.payload)
                return{
                    ...state,
                    isOnSite: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_TBT_MOBILE_FORM_SUCCESS:
             console.log("INSERT_TBT_MOBILE_FORM_SUCCESS",action.payload)
                return{
                    ...state,
                    isOnSite: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_TBT_RESPIRATORY_FORM_SUCCESS:
             console.log("INSERT_TBT_RESPIRATORY_FORM_SUCCESS",action.payload)
                return{
                    ...state,
                    isOnSite: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_TBT_SILICA_FORM_SUCCESS:
             console.log("INSERT_TBT_SILICA_FORM_SUCCESS",action.payload)
                return{
                    ...state,
                    isOnSite: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_TBT_DRUGS_FORM_SUCCESS:
             console.log("INSERT_TBT_DRUGS_FORM_SUCCESS",action.payload)
                return{
                    ...state,
                    isOnSite: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_TBT_VOLIENCE_FORM_SUCCESS:
             console.log("INSERT_TBT_VOLIENCE_FORM_SUCCESS",action.payload)
                return{
                    ...state,
                    isOnSite: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.INSERT_TBT_WORKING_FORM_SUCCESS:
             console.log("INSERT_TBT_WORKING_FORM_SUCCESS",action.payload)
                return{
                    ...state,
                    isOnSite: true,
                    isSuccessMsg : action.payload.message,
                }
            default:
            return state;
      }
  }