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
    isJobMsg:null
};

export default (state = initialState, action)=> {
    //  const { type,payload } = action;
      switch (action.type) {
            case Actions.LOGIN_SUCCESS:
                console.log("LOGIN SUCCESS")
                return{
                    ...state,
                    isLogin: true,
                    token: action.payload.data.split("|")[1],
                    
                }
            case Actions.LOGIN_FAIL:
             console.log("LOGIN FAIL")
                return{
                    ...state,
                    isLogin: false,
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
                    createSuperVisorMsg : action.payload.message.email
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
            default:
            return state;
      }
  }