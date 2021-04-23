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
    isUpdate:true,
    isUpdateMsg:null,
    isSuccess:true,
    isSuccessMsg:null,
    isCode:null,
    isValidateUserID:null,
    isResetSucces: false,
    isResetMsg:null,
    isUser: null,
    role:null
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
                    role: action.payload.role,
                    token: action.payload.data.split("|")[1],
                    
                }
            case Actions.LOGIN_FAIL:
             console.log("LOGIN FAIL")
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
             console.log("CREATE_NEW_JOB_SUCCESS")
                return{
                    ...state,
                    isJob: true,
                    isJobMsg : action.payload.message
                }
            case Actions.CREATE_NEW_JOB_FAIL:
             console.log("CREATE_NEW_JOB_FAIL")
                return{
                    ...state,
                    isJob: false,
                    isJobMsg : action.payload.message
                }
            case Actions.CREATE_DECORATOR_SUCSESS:
             console.log("CREATE_DECORATOR_SUCSESS")
                return{
                    ...state,
                    createDecorator: true,
                    createDecoratorMsg : action.payload.message
                }
            case Actions.CREATE_NEW_JOB_FAIL:
             console.log("CREATE_NEW_JOB_FAIL")
                return{
                    ...state,
                    icreateDecorator: false,
                    createDecoratorMsg : action.payload.message
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
                    isSuccess: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.CREATE_HAND_OVER_SHEET_FAIL:
             console.log("CREATE_HAND_OVER_SHEET_FAIL",action.payload)
                return{
                    ...state,
                    isSuccess: false,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.CREATE_MAKE_READY_SHEET_SUCCESS:
             console.log("CREATE_MAKE_READY_SHEET_SUCCESS",action.payload)
                return{
                    ...state,
                    isSuccess: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.CREATE_MAKE_READY_SHEET_FAIL:
             console.log("CREATE_MAKE_READY_SHEET_FAIL",action.payload)
                return{
                    ...state,
                    isSuccess: false,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.CREATE_REMEDIAL_WORK_SHEET_SUCCESS:
             console.log("CREATE_REMEDIAL_WORK_SHEET_SUCCESS",action.payload)
                return{
                    ...state,
                    isSuccess: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.CREATE_REMEDIAL_WORK_SHEET_FAIL:
             console.log("CREATE_REMEDIAL_WORK_SHEET_FAIL",action.payload)
                return{
                    ...state,
                    isSuccess: false,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.CREATE_SCOPE_FORM_SUCCESS:
             console.log("CREATE_SCOPE_FORM_SUCCESS",action.payload)
                return{
                    ...state,
                    isSuccess: true,
                    isSuccessMsg : action.payload.message,
                }
            case Actions.CREATE_SCOPE_FORM_FAIL:
             console.log("CREATE_SCOPE_FORM_FAIL",action.payload)
                return{
                    ...state,
                    isSuccess: false,
                    isSuccessMsg : action.payload.message,
                }
            default:
            return state;
      }
  }