import * as Actions from "../../actionTypes";
import axios from "axios";

var base_url = "https://airtimetesting.airtime4u.com/public/tajs/public/api/";

export const adminLogin = (email, password) => {
  return async (dispatch, getState) => {
    try {
      console.log(email, password);
      const body = { email, password };
      const request = await axios(base_url + "admin/login", {
        method: "POST",
        data: body,
      });

      const response = request.data;
      if (response.success == true) {
        dispatch({
          type: Actions.LOGIN_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({
          type: Actions.LOGIN_FAIL,
          payload: response,
        });
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
export const emailLink = (email) => {
  return async (dispatch, getState) => {
    try {
      console.log("Action Email :", email);
      const body = { email };
      const request = await axios(base_url + "resetPasswordlink", {
        method: "POST",
        data: body,
      });
      const response = request.data;
      console.log(response);
      if (response.success == true) {
        dispatch({
          type: Actions.FORGOT_EMAIL_CHECK_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({
          type: Actions.FORGOT_EMAIL_CHECK_FAIL,
          payload: response,
        });
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
export const codeValidate = (code) => {
  return async (dispatch, getState) => {
    try {
      console.log("Code :",code);
      const body = { code };
      const request = await axios(base_url + "code_validate", {
        method: "POST",
        data: body,
      });
      const response = request.data; 
      console.log(response.data.user[0].id);
      if (response.success == true) {
        dispatch({
          type: Actions.CODE_VALIDATE_SUCCESS,
          payload: response.data.user[0].id,
        });
      } else {
        dispatch({
          type: Actions.CODE_VALIDATE_FAIL,
          payload: response.data.user[0].id,
        });
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
export const resetPassword = (id,password) => {
  return async (dispatch, getState) => {
    try {
      const body = { id,password };
      const request = await axios(base_url + "newpassword_user", {
        method: "POST",
        data: body,
      });
      const response = request.data;
      console.log(response);
      if (response.success == true) {
        dispatch({
          type: Actions.RESET_PASSWORD_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({
          type: Actions.RESET_PASSWORD_FAIL,
          payload: response,
        });
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
export const createNewJobCreation = (
  contractor,
  project,
  weeks,
  supervisor_id,
  start_date,
  jobSummary,
  token
) => {
  return async (dispatch, getState) => {
    try {
      const body = {
        contractor,
        project,
        weeks,
        supervisor_id,
        start_date,
        jobSummary,
      };
      const request = await axios(base_url + "admin/create/job", {
        method: "POST",
        headers: {
          authorization: "Bearer " + token,
        },
        data: body,
      });
      const response = request.data;
      console.log(response)
      if (response.success == true) {
        dispatch({
          type: Actions.CREATE_NEW_JOB_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({
          type: Actions.CREATE_NEW_JOB_FAIL,
          payload: response,
        });
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
export const searchJob = (reference_number, date, token) => {
  return async (dispatch, getState) => {
    try {
      console.log(date);
      const body = { reference_number, date };
      const request = await axios(base_url + "admin/search/job/refid", {
        method: "POST",
        headers: {
          authorization: "Bearer " + token,
        },
        data: body,
      });
      const response = request.data;
      console.log(response);
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
export const createDecorator = (
  firstname,
  lastname,
  id_card,
  cscs_front,
  cscs_back,
  email,
  phone,
  password,
  token
) => {
  return async (dispatch, getState) => {
    try {
      console.log("firstname :", firstname);
      console.log("lastname :", lastname);
      console.log("id_card :", id_card);
      console.log("cscs_front :", cscs_front);
      console.log("cscs_back :", cscs_back);
      console.log("email :", email);
      console.log("phone :", phone);
      console.log("password :", password);
      console.log("Token :", token);

      const body = { id_card };
      const request = await axios(base_url + "admin/create/decorator", {
        method: "POST",
        headers: {
          authorization: "Bearer " + token,
          "content-type": "multipart/form-data",
        },
        data: id_card,
      })
        .then((response) => {
          console.log("then Response :", response);
        })
        .catch((error) => {
          console.log("then Error :", error);
        });
      const response = request;
      console.log("API Response :", response);
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
export const searchDecorator = (id, token) => {
  return async (dispatch, getState) => {
    try {
      console.log("ID :", id);
      console.log("Token :", token);
      const body = { id };
      const request = await axios(base_url + "admin/search/decorator", {
        method: "POST",
        headers: {
          authorization: "Bearer " + token,
        },
        data: body,
      });
      const response = request.data;
      console.log(response);
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
export const createSupervisor = (name, email, password, phone, token) => {
  return async (dispatch, getState) => {
    try {
      const body = { email, password, name, phone };
      const request = await axios(base_url + "admin/create/supervisor", {
        method: "POST",
        headers: {
          authorization: "Bearer " + token,
        },
        data: body,
      });
      const response = request.data;
      if (response.success == true) {
        dispatch({
          type: Actions.CREATE_SUPERVISOR_SUCSESS,
          payload: response,
        });
      } else {
        dispatch({
          type: Actions.CREATE_SUPERVISOR_FAIL,
          payload: response,
        });
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
export const searchSupervisor = (id, name, email, token) => {
  return async (dispatch, getState) => {
    try {
      console.log("Supervisor Name :", name);
      console.log("Supervisor ID :", id);
      console.log("Supervisor Email :", email);
      console.log("Token :", token);
      const body = { id, name, email };
      const request = await axios(base_url + "admin/search/supervisor", {
        method: "POST",
        headers: {
          authorization: "Bearer " + token,
        },
        data: body,
      });
      const response = request.data;
      // console.log(response.data.user)
      if (response.success == true) {
        dispatch({
          type: Actions.SEARCH_SUPERVISOR_SUCCESS,
          payload: response.data.user,
        });
      } else {
        dispatch({
          type: Actions.SEARCH_SUPERVISOR_FAIL,
          payload: response.data.user,
        });
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
export const updateSupervisor = (id, email, name, number, status, token) => {
  return async (dispatch, getState) => {
    try {
      const body = { id, email, name, number, status };
      const request = await axios(base_url + "admin/edit/supervisor", {
        method: "POST",
        headers: {
          authorization: "Bearer " + token,
        },
        data: body,
      });
      const response = request.data;
      console.log("Update Response :", response);
      // console.log(response.data.user)
      if (response.success == true) {
        dispatch({
          type: Actions.UPDATE_SUPERVISOR_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({
          type: Actions.UPDATE_SUPERVISOR_FAIL,
          payload: response,
        });
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
