import * as Actions  from "../../actionTypes";
import axios from 'axios';



var base_url="https://airtimetesting.airtime4u.com/public/tajs/public/api/"
export const adminLogin = (email, password)  => {
    return async (dispatch, getState) =>{
        try{
            console.log(email,password)
            const body = { email, password }
            const request = await axios(base_url+'admin/login',{
                method:'POST',
                data:body,
            });
        
            const response=request.data;
            if(response.success==true){
                dispatch ({
                  type: Actions.LOGIN_SUCCESS,
                  payload: response
                })
              }
              else{
                dispatch ({
                  type: Actions.LOGIN_FAIL,
                  payload: response
                })
              }
        }
        catch(err){
            throw new Error(err.message)
        }
    }
  };
export const createDecorator = (firstname,lastname,photoID,cscsFront,cscsBack,email,phone,password,token)  => {
    return async (dispatch, getState) =>{
      try{
      const body = { email,password,firstname,phone,photoID,lastname,cscsFront,cscsBack }
      const request = await axios(base_url+'admin/create/decorator',{
        method:'POST',
        headers: {
          'authorization': 'Bearer '+token,
        },
        data:body,
    });
    const response=request.data;
    console.log(response)
    }
    catch(err){
      console.log(err)
    }
  }
  };
export const createSupervisor = (name,email,password,phone,token)  => {
  return async (dispatch, getState) =>{
    try{
      const body = { email,password,name,phone}
      const request = await axios(base_url+'admin/create/supervisor',{
          method:'POST',
          headers: {
            'authorization': 'Bearer '+token,
          },
          data:body,
      });
        const response=request.data;
        if(response.success==true){
          dispatch ({
            type: Actions.CREATE_SUPERVISOR_SUCSESS,
            payload: response
          })
        }
        else{
          dispatch ({
            type: Actions.CREATE_SUPERVISOR_FAIL,
            payload: response
          })
        }
      }
      catch(err){
        throw new Error(err.message)
      }
  }
}; 
export const createNewJobCreation = (contractor,project,weeks,supervisor_id,start_date,jobSummary,token) =>{
  return async (dispatch, getState) =>{
    try{
      const body = { contractor,project,weeks,supervisor_id,start_date,jobSummary }
      const request = await axios(base_url+'admin/create/job',{
          method:'POST',
          headers: {
            'authorization': 'Bearer '+token,
          },
          data:body,
      });
      const response=request.data;
      console.log(response)
    }
    catch(err){
      console.log(err)
    }
  }
}
export const searchSupervisor = (supervisorName,supervisorId,supervisorEmail) =>{
  return async (dispatch, getState) =>{
    try{
      console.log("Supervisor Name :",supervisorName)
      console.log("Supervisor ID :",supervisorId)
      console.log("Supervisor Email :",supervisorEmail)
    }
    catch(err){
      throw new Error(err.message)
    }
}
}

export const searchDecorator = (id) =>{
  return async (dispatch, getState) =>{
    try{
      console.log("search Decorator ID :",id)
    }
    catch(err){
      throw new Error(err.message)
    }
}
}