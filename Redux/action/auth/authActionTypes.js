import * as Actions from "../../actionTypes";
import axios from "axios";
import { Platform, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import * as RootNavigation from "../../../navigation/RootNavigation";
const base_url = "https://topdecdecoratingapp.com/api/";

export const resetLoginFlag = () => {
  return { type: Actions.RESET_LOGIN_FLAG };
};
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
      // console.log("Role :",response.user.role)
      if (response.success == true) {
        //ya ly kr dia set token ab aur bta
        await AsyncStorage.setItem("user", JSON.stringify({ ...response })); //yahi response aye ga na??
        //ak min mouse chor
        dispatch({
          type: Actions.LOGIN_SUCCESS,
          payload: response,
        });
      } else {
        console.log(response?.response?.request);
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const JustLoginInternally = (payload) => (dispatch) => {
  dispatch({
    type: Actions.LOGIN_SUCCESS,
    payload,
  });
};
export const logout = () => (dispatch) => {
  AsyncStorage.clear().then(() => {
    dispatch({
      type: Actions.LOGOUT,
    });
    setTimeout(() => {
      RootNavigation.navigationRef.current?.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Splash" }],
        })
      );
    }, 800);
  });
};
export const emailLink = (email) => {
  return async (dispatch, getState) => {
    let message = null;
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
        message = response;
        console.log(response?.response?.request);
        //throw new Error(response.message);
      }
    } catch (err) {
      message = err;
      console.log(err?.response?.request);
      //throw new Error(err.message);
    }
    return message;
  };
};
export const codeValidate = (code) => {
  return async (dispatch, getState) => {
    try {
      console.log("Code :", code);
      const body = { code };
      const request = await axios(base_url + "code_validate", {
        method: "POST",
        data: body,
      });
      const response = request.data;
      console.log("DATA", response.data);
      console.log(response.data.user);
      if (response.success == true) {
        dispatch({
          type: Actions.CODE_VALIDATE_SUCCESS,
          payload: response.data.user,
        });
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
export const resetPassword = (id, password, navigation) => {
  return async (dispatch, getState) => {
    try {
      const body = { id, password };
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
        Alert.alert("Success!", "Password reset");
        navigation.navigate("LoginScreen");
      } else {
        throw new Error(response.message);
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
      console.log(jobSummary);
      // console.log()
      const data = {
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
        data,
      });
      const response = request.data;
      //console.log(response);
      if (response.success == true) {
        dispatch({
          type: Actions.CREATE_NEW_JOB_SUCCESS,
          payload: response,
        });
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const searchJob = (reference_number, date, token) => {
  return async (dispatch, getState) => {
    try {
      console.log(date);
      const data = { reference_number, date };
      const request = await axios(base_url + "admin/search/job/refid", {
        method: "POST",
        headers: {
          authorization: "Bearer " + token,
        },
        data,
      });
      const response = request.data;
      console.log("Here Is the res",response);
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
export const createDecorator = (
  firstname,
  lastname,
  email,
  phone,
  password,
  token,
  photoID,
  cscsback,
  cscsfront
) => {
  return async (dispatch, getState) => {
    try {
      const formData = new FormData();
      //console.log({ firstname, lastname, email, phone, password, token, photoID, cscsback, cscsfront });
      formData.append("email", email);
      formData.append("password", password);
      formData.append("firstname", firstname);
      formData.append("phone", phone);
      formData.append("lastname", lastname);

      photoID &&
        formData.append("idcard", {
          // file: photoID,
          uri:
            Platform.OS === "android"
              ? photoID
              : photoID.replace("file://", ""),
          name: photoID.split("/").pop(),
          type: "image/png", // it may be necessary in Android.
        });
      cscsfront &&
        formData.append("cscsfront", {
          // uri: cscsfront,
          uri:
            Platform.OS === "android"
              ? cscsfront
              : cscsfront.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      cscsback &&
        formData.append("cscsback", {
          uri:
            Platform.OS === "android"
              ? cscsback
              : cscsback.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });

      console.log(formData);
      // const body = { email, password, firstname, phone, lastname };
      const request = await axios(
        "https://topdecdecoratingapp.com/api/admin/create/decorator",
        {
          method: "POST",
          data: formData,
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
            "Cache-Control": "no-cache",
            // Accept: 'application/json',
          },
        }
      );
      const response = request.data;
      console.log("API Response CREATE DECORATOR :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.CREATE_DECORATOR_SUCSESS,
          payload: response,
        });
      } else {
        throw new Error(response.message);
      }
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
      if (response.success == true) {
        dispatch({
          type: Actions.SEARCH_DECORATOR_SUCCESS,
          payload: response,
        });
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
export const createSupervisor = (name, email, password, phone, token) => {
  return async (dispatch, getState) => {
    try {
      const body = { email, password, name, phone };
      console.log("Body :", body);
      console.log("Token :", token);
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
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
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
        // dispatch({
        //   type: Actions.SEARCH_SUPERVISOR_FAIL,
        //   payload: response.data.user,
        // });
        throw new Error(response.message);
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
        // dispatch({
        //   type: Actions.UPDATE_SUPERVISOR_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
export const updateDecorator = (
  id,
  email,
  firstname,
  lastname,
  phone,
  photoID,
  cscsFront,
  cscsBack,
  status,
  token
) => {
  return async (dispatch, getState) => {
    try {
      // console.log("Decorator Id :",id)
      // console.log("Decorator Email :",email)
      // console.log("Decorator Name :",name)
      // console.log("Decorator Number :",number)
      // console.log("Decorator Status :",status)
      // console.log("Token :",token)

      const formData = new FormData();

      formData.append("id", id);
      formData.append("firstname", firstname);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("lastname", lastname);
      formData.append("status", status);

      if (photoID != "") {
        photoID.localUri &&
          formData.append("photoID", {
            // file: photoID,
            uri:
              Platform.OS === "android"
                ? photoID.localUri
                : photoID.localUri.replace("file://", ""),
            name: Math.random(0, 1000).toString(),
            type: "image/png", // it may be necessary in Android.
          });
      } else {
        formData.append("photoID", photoID);
      }
      if (cscsFront != "") {
        cscsFront.localUri &&
          formData.append("cscsFront", {
            // file: cscsFront,
            uri:
              Platform.OS === "android"
                ? cscsFront.localUri
                : cscsFront.localUri.replace("file://", ""),
            name: Math.random(0, 1000).toString(),
            type: "image/png", // it may be necessary in Android.
          });
      } else {
        formData.append("cscsFront", cscsFront);
      }
      if (cscsBack != "") {
        cscsBack.localUri &&
          formData.append("cscsBack", {
            // file: cscsBack,
            uri:
              Platform.OS === "android"
                ? cscsBack.localUri
                : cscsBack.localUri.replace("file://", ""),
            name: Math.random(0, 1000).toString(),
            type: "image/png", // it may be necessary in Android.
          });
      } else {
        formData.append("cscsBack", cscsBack);
      }

      console.log(formData);
      const body = { id, firstname, email, phone, lastname, status };
      const request = await axios(base_url + "admin/edit/editDecorator", {
        method: "POST",
        headers: {
          authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data, application/json",
          "Cache-Control": "no-cache",
        },
        data: formData,
      });
      const response = request.data;
      console.log("Update Response :", response);
      // console.log(response.data.user)
      if (response.success == true) {
        dispatch({
          type: Actions.UPDATE_DECORATOR_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.UPDATE_SUPERVISOR_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertHandOverForm = (
  contractor,
  project,
  block,
  reason,
  plotNumber,
  dateWritten,
  date_isue,
  supervisor,
  signature,
  completed_date,
  jobSummary,
  agentName,
  agentSignature,
  todayDate,
  projectImagesComment,
  commentImages,
  task_id,
  tab_id,
  token,
  index
) => {
  return async (dispatch, getState) => {
    try {
      // console.log("Contructor Name :",contractor)
      // console.log("Project Name :",project)
      // console.log("Block :",block)
      // console.log("Reason :",reason)
      // console.log("Plot No :",plotNumber)
      // console.log("Date Written :",dateWritten)
      // console.log("Date Issue :",date_isue)
      // console.log("Supervsior Name :",supervisor)
      // console.log("Supervsior Sign :",signature)
      // console.log("Comleted Date :",completed_date)
      // console.log("JobSummary :",jobSummary)
      // console.log("Agent Name :",agentName)
      // console.log("Agent Name :",agentSignature)
      // console.log("Today Date :",todayDate)
      // console.log("Job ID :",task_id)
      // console.log("Tab Name :",tab_id)
      // console.log("Token :",token)

      const formData = new FormData();
      formData.append("contractor", contractor);
      formData.append("project", project);
      formData.append("block", block);
      formData.append("reason", reason);
      formData.append("plotNumber", plotNumber);
      formData.append("dateWritten", dateWritten);
      formData.append("date_isue", date_isue);
      formData.append("supervisor", supervisor);

      signature &&
        formData.append("signature", {
          // file: signature,
          uri:
            Platform.OS === "android"
              ? signature
              : signature.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });

      formData.append("todayDate", todayDate);
      formData.append("agentName", agentName);

      agentSignature &&
        formData.append("agentSignature", {
          // file: agentSignature,
          uri:
            Platform.OS === "android"
              ? agentSignature
              : agentSignature.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });

      formData.append("completed_date", completed_date);
      formData.append("task_id", task_id);
      formData.append("tab_id", tab_id);
      // formData.append("projectComment",projectComment)

      jobSummary.forEach((item) => {
        formData.append(`jobSummary[]`, JSON.stringify([item]));
      });

      commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });

      console.log("Hand Over Form Data :", formData);
      const request = await axios(
        base_url + "supervisor/make/workflow/insert_handover",
        {
          method: "POST",
          data: formData,
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data, application/json",
            "Cache-Control": "no-cache",
          },
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.CREATE_HAND_OVER_SHEET_SUCCESS,
          payload: response,
        });
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertMakeReadyForm = (
  client,
  project,
  block,
  sheetNumber,
  page,
  page2,
  plotNumber,
  reason,
  dateWritten,
  date_isue,
  dynamicInput,
  supervisorName,
  signature,
  dateComplete,
  agentName,
  agentSignature,
  todayDate,
  projectImagesComment,
  commentImages,
  task_id,
  tab_id,
  token,
  index
) => {
  return async (dispatch, getState) => {
    try {
      // console.log("Client Name :", client);
      // console.log("Project Name :", project);
      // console.log("Block :", block);
      // console.log("Sheet Number :", sheetNumber);
      // console.log("Page 1 :", page);
      // console.log("Page 2 :", page2);
      // console.log("Plot Number :", plotNumber);
      // console.log("Reason :", reason);
      // console.log("Date Written :", dateWritten);
      // console.log("Date Issue :", date_isue);
      // console.log("Dynamic Input :", dynamicInput);
      // console.log("Supervisor Name :", supervisorName);
      // console.log("Supervisor Signature :", signature);
      // console.log("Completed Date :", dateComplete);
      // console.log("Agent Name :", agentName);
      // console.log("Agent Signature :", agentSignature);
      // console.log("Today Date :", todayDate);
      // console.log("Job ID :", task_id);
      // console.log("Tab ID :", tab_id);
      // console.log("Token :", token);

      const formData = new FormData();

      formData.append("client", client);
      formData.append("project", project);
      formData.append("block", block);
      formData.append("sheetNumber", sheetNumber);
      formData.append("page", page);
      formData.append("page2", page2);
      formData.append("reason", reason);
      formData.append("dateWritten", dateWritten);
      formData.append("date_isue", date_isue);
      formData.append("plotNumber", plotNumber);
      formData.append("supervisorName", supervisorName);

      signature &&
        formData.append("signature", {
          uri:
            Platform.OS === "android"
              ? signature
              : signature.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });

      formData.append("dateComplete", dateComplete);
      formData.append("agentName", agentName);

      agentSignature &&
        formData.append("agentSignature", {
          uri:
            Platform.OS === "android"
              ? agentSignature
              : agentSignature.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });

      formData.append("todayDate", todayDate);
      formData.append("task_id", task_id);
      formData.append("tab_id", tab_id);

      dynamicInput.forEach((item) => {
        formData.append(`dynamicInput[]`, JSON.stringify([item]));
      });

      commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });
      console.log(formData);
      // const body = {
      //   client,
      //   project,
      //   block,
      //   sheetNumber,
      //   page,
      //   page2,
      //   reason,
      //   dateWritten,
      //   date_isue,
      //   plotNumber,
      //   supervisorName,
      //   signature,
      //   dateComplete,
      //   agentName,
      //   agentSignature,
      //   todayDate,
      //   task_id,
      //   tab_id,
      //   dynamicInput,
      // };

      const request = await axios(
        base_url + "supervisor/make/workflow/makeReadySheet",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        // dispatch({
        //   type: Actions.UPDATE_PLOT_REPORT,
        //   payload: index,
        // });
        dispatch({
          type: Actions.CREATE_MAKE_READY_SHEET_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.CREATE_MAKE_READY_SHEET_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
      //console.log(err)
    }
  };
};
export const insertSnaggingForm = (
  block,
  plot_number,
  isue_date,
  completion_date,
  pre_w_snagging,
  painter,
  No_of_Pages,
  dynamicInput,
  snagging_isue_by,
  completed_by,
  hour,
  dynamicInputComplete,
  projectImagesComment,
  commentImages,
  task_id,
  tab_id,
  token,
  index
) => {
  return async (dispatch, getState) => {
    try {
      // console.log("Block :", block);
      // console.log("Plot Number :", plotNumber);
      // console.log("Date Issue :", dateIssue);
      // console.log("Completed Date :", dateComplete);
      // console.log("Wrannty Snagging :", wrrantySnagging);
      // console.log("Painter Name :", painterName);
      // console.log("No of Pages :", noOfPage);
      // console.log("Snagging Issue By :", dateSnaggingIssue);
      // console.log("Snagging Completed By :", dateSnaggingComplete);
      // console.log("Total Hours :", totalHours);
      // console.log("Dynamic Snagging Input :", dynamicSnagInput);
      // console.log("Dynamic Snagging Input Complete :", dynamicSnagCompletedInput);
      // console.log("Job ID :", jobID);
      // console.log("Tab Name :", tabId);
      // console.log("Token :", token);

      const formData = new FormData();

      formData.append("block", block);
      formData.append("plot_number", plot_number);
      formData.append("isue_date", isue_date);
      formData.append("completion_date", completion_date);
      formData.append("pre_w_snagging", pre_w_snagging);
      formData.append("painter", painter);
      formData.append("snagging_isue_by", snagging_isue_by);
      formData.append("completed_by", completed_by);
      formData.append("No_of_Pages", No_of_Pages);
      formData.append("hour", hour);
      formData.append("task_id", task_id);
      formData.append("tab_id", tab_id);

      dynamicInput.forEach((item) => {
        formData.append(`dynamicInput[]`, JSON.stringify([item]));
      });
      dynamicInputComplete.forEach((item) => {
        formData.append(`dynamicInputComplete[]`, JSON.stringify([item]));
      });

      commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });
      // const body = {
      //   block,
      //   plot_number,
      //   isue_date,
      //   completion_date,
      //   pre_w_snagging,
      //   painter,
      //   snagging_isue_by,
      //   completed_by,
      //   No_of_Pages,
      //   hour,
      //   task_id,
      //   tab_id,
      //   dynamicInput,
      //   dynamicInputComplete,
      // };
      console.log("Wrannty Sannging :", formData);
      const request = await axios(
        base_url + "supervisor/make/workflow/insertWarenty",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data, application/json",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      //console.log("Insert Response :", response);
      if (response.success == true) {
        // dispatch({
        //   type: Actions.UPDATE_PLOT_REPORT,
        //   payload: index,
        // });
        dispatch({
          type: Actions.CREATE_PRE_WRRANTY_FORM_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.CREATE_PRE_WRRANTY_FORM_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertAnsuranceForm = (
  project,
  unit,
  dynamicInput,
  dynamicInputcomplete,
  mc,
  md,
  sms,
  bscs,
  sitemanager_sign,
  activity_sign,
  projectImagesComment,
  commentImages,
  overallComment,
  task_id,
  tab_id,
  token,
  index
) => {
  return async (dispatch, getState) => {
    try {
      console.log("Project Name :", project);
      console.log("Unit Plot :", unit);
      console.log("Supervisor MC Sign :", mc);
      console.log("Supervisor MD Sign :", md);
      console.log("Supervisor SMS Sign :", sms);
      console.log("Supervisor BSCS Sign :", bscs);
      console.log("Job ID :", task_id);
      console.log("Tab Name :", tab_id);
      console.log("Inssurance Array :", dynamicInput);
      console.log("sitemanager_sign :", sitemanager_sign);
      console.log("activity_sign :", activity_sign);

      const formData = new FormData();

      formData.append("project", project);
      formData.append("unit", unit);
      formData.append("overallComment", overallComment);

      mc &&
        formData.append("mc", {
          // file: mc,
          uri: Platform.OS === "android" ? mc : mc.replace("file://", ""),
          name: mc.split("/").pop(),
          type: "image/jpeg", // it may be necessary in Android.
        });

      md &&
        formData.append("md", {
          // file: md,
          uri: Platform.OS === "android" ? md : md.replace("file://", ""),
          name: md.split("/").pop(),
          type: "image/jpeg", // it may be necessary in Android.
        });

      sms &&
        formData.append("sms", {
          // file: sms,
          uri: Platform.OS === "android" ? sms : sms.replace("file://", ""),
          name: sms.split("/").pop(),
          type: "image/jpeg", // it may be necessary in Android.
        });

      bscs &&
        formData.append("bscs", {
          // file: bscs,
          uri: Platform.OS === "android" ? bscs : bscs.replace("file://", ""),
          name: bscs.split("/").pop(),
          type: "image/jpeg", // it may be necessary in Android.
        });

      sitemanager_sign &&
        formData.append("sitemanager_sign", {
          // file: sitemanager_sign,
          uri:
            Platform.OS === "android"
              ? sitemanager_sign
              : sitemanager_sign.replace("file://", ""),
          name: sitemanager_sign.split("/").pop(),
          type: "image/jpeg", // it may be necessary in Android.
        });

      activity_sign &&
        formData.append("activity_sign", {
          // file: activity_sign,
          uri:
            Platform.OS === "android"
              ? activity_sign
              : activity_sign.replace("file://", ""),
          name: activity_sign.split("/").pop(),
          type: "image/jpeg", // it may be necessary in Android.
        });

      formData.append("task_id", task_id);
      formData.append("tab_id", tab_id);

      dynamicInput.forEach((item) => {
        formData.append(`dynamicInput[]`, JSON.stringify([item]));
      });

      dynamicInputcomplete.forEach((item) => {
        formData.append(`dynamicInputcomplete[]`, JSON.stringify([item]));
      });

      commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });

      // const body = {
      //   project,
      //   unit,
      //   mc,
      //   md,
      //   sms,
      //   bscs,
      //   task_id,
      //   tab_id,
      //   dynamicInput,
      //   dynamicInputcomplete,
      // };

      console.log("Quality Ansurance :", formData);

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/quaity",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data, application/json",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        // dispatch({
        //   type: Actions.UPDATE_PLOT_REPORT,
        //   payload: index,
        // });
        dispatch({
          type: Actions.CREATE_QUALITY_ANSURANCE_FORM_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.CREATE_QUALITY_ANSURANCE_FORM_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertRemedialForm = (
  contractor,
  project,
  operative,
  sheet_number,
  page1,
  page2,
  block,
  plot_area_number,
  data_issue,
  site_instruction_number,
  work_reason,
  dynamicInput,
  totalHours,
  supervisorName,
  supervisorSignature,
  dateSupervisor,
  managerName,
  managerSignature,
  dateManager,
  projectImagesComment,
  commentImages,
  task_id,
  tab_id,
  token,
  index
) => {
  return async (dispatch, getState) => {
    try {
      // console.log("Contructor Name :", contractor);
      // console.log("Project Name :", project);
      // console.log("Operative :", operative);
      // console.log("Sheet Number :", sheet_number);
      // console.log("Pages :", page1);
      // console.log("No of Pages :", page2);
      // console.log("Block :", block);
      // console.log("Plot Number :", plot_area_number);
      // console.log("Date Issue :", data_issue);
      // console.log("Instructor Number :", site_instruction_number);
      // console.log("Reason Work :", work_reason);
      // console.log("Dynamic Input :", dynamicInput);
      // console.log("Total Hours :", totalHours);
      // console.log("Supervisor Name :", supervisorName);
      // console.log("Supervisor Signature :", supervisorSignature);
      // console.log("Supervisor Date :", dateSupervisor);
      // console.log("Manager Name :", managerName);
      // console.log("Manager Signature :", managerSignature);
      // console.log("Manager Date :", dateManager);
      // console.log("Job ID :", task_id);
      // console.log("Tab Name :", tab_id);
      // console.log("Token :", token);

      const formData = new FormData();

      formData.append("contractor", contractor);
      formData.append("project", project);
      formData.append("sheet_number", sheet_number);
      formData.append("page1", page1);
      formData.append("page2", page2);
      formData.append("block", block);
      formData.append("plot_area_number", plot_area_number);
      formData.append("operative", operative);
      formData.append("data_issue", data_issue);
      formData.append("site_instruction_number", site_instruction_number);
      formData.append("work_reason", work_reason);
      formData.append("supervisorName", supervisorName);

      supervisorSignature &&
        formData.append("supervisorSignature", {
          // file: supervisorSignature,
          uri:
            Platform.OS === "android"
              ? supervisorSignature
              : supervisorSignature.replace("file://", ""),
          name: supervisorSignature.split("/").pop(),
          type: "image/jpeg", // it may be necessary in Android.
        });

      formData.append("dateSupervisor", dateSupervisor);
      formData.append("managerName", managerName);

      managerSignature &&
        formData.append("managerSignature", {
          // file: managerSignature,
          uri:
            Platform.OS === "android"
              ? managerSignature
              : managerSignature.replace("file://", ""),
          name: managerSignature.split("/").pop(),
          type: "image/jpeg", // it may be necessary in Android.
        });
      formData.append("dateManager", dateManager);
      formData.append("task_id", task_id);
      formData.append("tab_id", tab_id);

      dynamicInput.forEach((item) => {
        formData.append(`dynamicInput[]`, JSON.stringify([item]));
      });

      formData.append("totalHours", totalHours);

      commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });

      // const body = {
      //   contractor,
      //   project,
      //   sheet_number,
      //   page1,
      //   page2,
      //   block,
      //   plot_area_number,
      //   operative,
      //   data_issue,
      //   site_instruction_number,
      //   work_reason,
      //   supervisorName,
      //   supervisorSignature,
      //   dateSupervisor,
      //   managerName,
      //   managerSignature,
      //   dateManager,
      //   task_id,
      //   tab_id,
      //   dynamicInput,
      //   totalHours,
      // };
      console.log(formData);
      const request = await axios(
        base_url + "supervisor/insert/workflow/RemendialSheet",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
          },
          data: formData,
        }
      );
      const response = request.data;
      //console.log("Insert Response :", response);
      if (response.success == true) {
        // dispatch({
        //   type: Actions.UPDATE_PLOT_REPORT,
        //   payload: index,
        // });
        dispatch({
          type: Actions.CREATE_REMEDIAL_WORK_SHEET_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.CREATE_REMEDIAL_WORK_SHEET_FAIL,
        //   payload: response,
        // });
        console.log(response?.response?.request);
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertScopeForm = (
  dynamicInput,
  painter,
  signature,
  plot_number,
  type,
  date,
  projectImagesComment,
  commentImages,
  task_id,
  tab_id,
  token,
  index
) => {
  return async (dispatch, getState) => {
    try {
      // console.log("Dynamic Input :", dynamicInput);
      // console.log("Painter Name :", painter);
      // console.log("Signature :", signature);
      // console.log("Plot Number :", plotNumber);
      // console.log("Type :", type);
      //console.log("Date :", date);
      // console.log("Job ID :", task_id);
      // console.log("Tab Name :", tab_id);
      // console.log("Token :", token);

      const formData = new FormData();

      signature &&
        formData.append("signature", {
          // file: signature,
          uri:
            Platform.OS === "android"
              ? signature
              : signature.replace("file://", ""),
          name: signature.split("/").pop(),
          type: "image/jpeg", // it may be necessary in Android.
        });

      formData.append("date", date);
      formData.append("type", type);
      formData.append("painter", painter);
      formData.append("plot_number", plot_number);
      formData.append("task_id", task_id);
      formData.append("tab_id", tab_id);

      dynamicInput.forEach((item) => {
        formData.append(`dynamicInput[]`, JSON.stringify([item]));
      });

      commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });
      // const body = {
      //   signature,
      //   date,
      //   type,
      //   painter,
      //   plot_number,
      //   task_id,
      //   tab_id,
      //   dynamicInput,
      // };

      const request = await axios(
        base_url + "supervisor/make/workflow/insertScope",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        // dispatch({
        //   type: Actions.UPDATE_PLOT_REPORT,
        //   payload: index,
        // });
        dispatch({
          type: Actions.CREATE_SCOPE_FORM_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.CREATE_SCOPE_FORM_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertWorkSheet = (
  contractor,
  title,
  day_start,
  week_ending,
  indution,
  plot,
  description,
  LABOUR,
  MATERIALS,
  PLANTS,
  PRELIMINARIES,
  manager,
  sign,
  position,
  date,
  projectImagesComment,
  commentImages,
  task_id,
  tab_id,
  token,
  index
) => {
  return async (dispatch, getState) => {
    try {
      // console.log("Main Contructor :", contractor);
      // console.log("Constructor Title :", title);
      // console.log("Sheet No :", day_start);
      // console.log("Week End :", week_ending);
      // console.log("Site Instruction Number :", indution);
      // console.log("Plot Number :", plot);
      // console.log("Description Work :", description);
      // console.log("Labour Array :", LABOUR);
      // console.log("Material Array :", MATERIALS);
      // console.log("Plant Array :", PLANTS);
      // console.log("Managment Array :", PRELIMINARIES);
      // console.log("Manager Name :", manager);
      // console.log("Manager sign :", sign);
      // console.log("Position :", position);
      // console.log("Today Date :", date);
      // console.log("Job ID :", task_id);
      // console.log("Tab Name :", tab_id);
      // console.log("Token :", token);

      const formData = new FormData();

      formData.append("contractor", contractor);
      formData.append("title", title);
      formData.append("day_start", day_start);
      formData.append("week_ending", week_ending);
      formData.append("indution", indution);
      formData.append("plot", plot);
      formData.append("description", description);
      formData.append("manager", manager);

      sign &&
        formData.append("sign", {
          // file: sign,
          uri: Platform.OS === "android" ? sign : sign.replace("file://", ""),
          name: sign.split("/").pop(),
          type: "image/jpeg", // it may be necessary in Android.
        });

      formData.append("date", date);
      formData.append("position", position);
      formData.append("task_id", task_id);
      formData.append("tab_id", tab_id);

      LABOUR.forEach((item) => {
        formData.append(`LABOUR[]`, JSON.stringify([item]));
      });

      MATERIALS.forEach((item) => {
        formData.append(`MATERIALS[]`, JSON.stringify([item]));
      });

      PLANTS.forEach((item) => {
        formData.append(`PLANTS[]`, JSON.stringify([item]));
      });

      PRELIMINARIES.forEach((item) => {
        formData.append(`PRELIMINARIES[]`, JSON.stringify([item]));
      });

      commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });

      console.log("Token :", token);
      const request = await axios(
        base_url + "supervisor/insert/verification/accurate",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      //console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_ACCURATE_DAY_WOEK_SHEET_CREATE,
          payload: response,
        });
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertDecorationRecord = (
  jobSummary,
  jobSummarycomplete,
  projectImagesComment,
  commentImages,
  task_id,
  tab_id,
  token
) => {
  return async (dispatch, getState) => {
    try {
      // console.log("Dynamic First Input :", jobSummary);
      // console.log("Dynamic Second Input :", jobSummarycomplete);
      // console.log("Job ID :", task_id);
      // console.log("Tab Name :", tab_id);
      // console.log("Token :", token);
      // const body = {
      //   task_id,
      //   tab_id,
      //   jobSummary,
      //   jobSummarycomplete,
      // };

      const formData = new FormData();

      formData.append("task_id", task_id);
      formData.append("tab_id", tab_id);

      jobSummary.forEach((item) => {
        formData.append(`jobSummary[]`, JSON.stringify([item]));
      });

      jobSummarycomplete.forEach((item) => {
        formData.append(`jobSummarycomplete[]`, JSON.stringify([item]));
      });

      commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });

      console.log("Token :", token);
      console.log("Decoration Of Record :", formData);

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/decoration",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      //console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_DECORATION_RECORD_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.INSERT_DECORATION_RECORD_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertMiscoat = (
  contractor,
  project,
  jobSummary,
  projectImagesComment,
  commentImages,
  task_id,
  tab_id,
  token
) => {
  return async (dispatch, getState) => {
    try {
      // console.log("Main Contructor :", contractor);
      // console.log("Project Name :", project);
      // console.log("Dynamic :", jobSummary);
      // console.log("Job ID :", task_id);
      // console.log("Tab Name :", tab_id);
      // console.log("Token :", token);
      // const body = {
      //   contractor,
      //   project,
      //   task_id,
      //   tab_id,
      //   jobSummary,
      // };

      const formData = new FormData();

      formData.append("contractor", contractor);
      formData.append("project", project);
      formData.append("task_id", task_id);
      formData.append("tab_id", tab_id);

      jobSummary.forEach((item) => {
        formData.append(`jobSummary[]`, JSON.stringify([item]));
      });

      commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });

      console.log("MisCoat :", formData);

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/Miscoat",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      //console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_MISCOAT_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.INSERT_MISCOAT_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertSiteInstruction = (
  contractor,
  instruction,
  raised_by,
  date,
  details,
  condition,
  supervisor,
  s_date,
  projectImagesComment,
  commentImages,
  task_id,
  tab_id,
  token
) => {
  return async (dispatch, getState) => {
    try {
      // console.log("Contractor Name :", contractor);
      // console.log("Instruction No :", instruction);
      // console.log("Raised By :", raised_by);
      // console.log("Date :", date);
      // console.log("Description :", details);
      // console.log("Special Notes :", condition);
      // console.log("Supervisor Name :", supervisor);
      // console.log("Supervisor Date :", s_date);
      // console.log("Job ID :", task_id);
      // console.log("Tab Name :", tab_id);
      // console.log("Token :", token);

      const formData = new FormData();

      formData.append("contractor", contractor);
      formData.append("instruction", instruction);
      formData.append("raised_by", raised_by);
      formData.append("date", date);
      formData.append("details", details);
      formData.append("condition", condition);
      formData.append("s_date", s_date);
      formData.append("task_id", task_id);
      formData.append("tab_id", tab_id);
      formData.append("supervisor", supervisor);

      commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });
      // const body = {
      //   contractor,
      //   instruction,
      //   raised_by,
      //   date,
      //   details,
      //   condition,
      //   s_date,
      //   task_id,
      //   tab_id,
      //   supervisor,
      // };
      // console.log("Token :",token)
      //       console.log("Site Instruction :",formData)

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/Instruction",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      //console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_SITE_INSTRUCTION_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.INSERT_SITE_INSTRUCTION_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertVerificationForm = (
  project,
  id_ref,
  decorator,
  PRELIMINARIES,
  projectImagesComment,
  commentImages,
  task_id,
  tab_id,
  token
) => {
  return async (dispatch, getState) => {
    try {
      // console.log("Project Name :", project);
      // console.log("Id Ref :", id_ref);
      // console.log("Decorator Name :", decorator);
      // console.log("Dynamic :", PRELIMINARIES);
      // console.log("Job ID :", task_id);
      // console.log("Tab Name :", tab_id);
      // console.log("Token :", token);

      const formData = new FormData();

      formData.append("project", project);
      formData.append("id_ref", id_ref);
      formData.append("decorator", decorator);
      formData.append("task_id", task_id);
      formData.append("tab_id", tab_id);

      PRELIMINARIES.forEach((item) => {
        formData.append(`PRELIMINARIES[]`, JSON.stringify([item]));
      });

      commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });
      // const body = {
      //   project,
      //   id_ref,
      //   decorator,
      //   task_id,
      //   tab_id,
      //   PRELIMINARIES,
      // };

      const request = await axios(
        base_url + "supervisor/insert/verification/verrify_worksheet",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_VERIFICATION_WORK_SUCCESS,
          payload: response,
        });
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertAccidentForm = (
  Name_Of_Person,
  Incident_Date,
  Location_of_Incident,
  Investigation_Date,
  Occupation,
  incidentArray,
  Name_of_Injured_Person,
  Age,
  Sex,
  Employee,
  Address,
  Phone,
  Nature_of_Injury,
  callingDetails,
  dynamicInput,
  Witness_Statement,
  Whom_Accident_Reported,
  When_Accident_Reported,
  Supervisor_Name,
  Supervisor_Signature,
  Supervisor_Date,
  Whom_Management_Reported,
  Manager_Date_Report,
  Comment_Initial_Investigation,
  Action_Requried,
  Action_Performed,
  managmentArray,
  Manager_Name,
  Manager_sign,
  Manager_date,
  projectImagesComment,
  commentImages,
  task_id,
  tab_id,
  token,
  index
) => {
  return async (dispatch, getState) => {
    try {
      // console.log("Name Of Person :", Name_Of_Person);
      // console.log("Incident Date :", Incident_Date);
      // console.log("Location of Incident :", Location_of_Incident);
      // console.log("Investigation Date :", Investigation_Date);
      console.log("Type of Incident :", incidentArray);
      // console.log("Name of Injured Person :", Name_of_Injured_Person);
      // console.log("Age :", Age);
      // console.log("Sex :", Sex);
      // console.log("Employee :", Employee);
      // console.log("State of Injured Person :", Address);
      // console.log("Phone Number :", Phone);
      // console.log("Occupation :", Occupation);
      // console.log("Nature of Injury :", Nature_of_Injury);
      // console.log("Ambulance Details :", callingDetails);
      // console.log("Dynamic Input :", dynamicInput);
      // console.log("Witness Statement :", Witness_Statement);
      // console.log("Whom Accident Reported :", Whom_Accident_Reported);
      // console.log("When Accident Reported :", When_Accident_Reported);
      // console.log("Supervisor Name :", Supervisor_Name);
      // console.log("Supervisor Signature :", Supervisor_Signature);
      // console.log("Supervisor Date :", Supervisor_Date);
      // console.log("Whom Management Reported :", Whom_Management_Reported);
      // console.log("Manager Date Report :", Manager_Date_Report);
      // console.log("Comment Initial Investigation :", Comment_Initial_Investigation);
      // console.log("Action Requried :", Action_Requried);
      // console.log("Actiion Performed :", Action_Performed);
      // console.log("Claender day :", managmentArray);
      // console.log("Manager Name :", Manager_Name);
      // console.log("Manager Signature :", Manager_sign);
      // console.log("Manager Date :", Manager_date);

      const formData = new FormData();

      formData.append("Name_Of_Person", Name_Of_Person);
      formData.append("Incident_Date", Incident_Date);
      formData.append("Location_of_Incident", Location_of_Incident);
      formData.append("Investigation_Date", Investigation_Date);

      incidentArray.forEach((item) => {
        formData.append(`incidentArray[]`, JSON.stringify([item]));
      });
      // formData.append(`incidentArray`,JSON.stringify(incidentArray));

      formData.append("Name_of_Injured_Person", Name_of_Injured_Person);
      formData.append("Age", Age);
      formData.append("Sex", Sex);

      // formData.append(`Employee`,JSON.stringify(Employee));
      Employee.forEach((item) => {
        formData.append(`Employee[]`, JSON.stringify([item]));
      });

      formData.append("Address", Address);
      formData.append("Phone", Phone);
      formData.append("Occupation", Occupation);

      formData.append("Nature_of_Injury", Nature_of_Injury);
      formData.append("Witness_Statement", Witness_Statement);
      formData.append("Whom_Accident_Reported", Whom_Accident_Reported);
      formData.append("When_Accident_Reported", When_Accident_Reported);
      formData.append("Supervisor_Name", Supervisor_Name);

      Supervisor_Signature &&
        formData.append("Supervisor_Signature", {
          // file: Supervisor_Signature,
          uri:
            Platform.OS === "android"
              ? Supervisor_Signature
              : Supervisor_Signature.replace("file://", ""),
          name: Supervisor_Signature.split("/").pop(),
          type: "image/jpeg", // it may be necessary in Android.
        });

      formData.append("Supervisor_Date", Supervisor_Date);
      formData.append("Whom_Management_Reported", Whom_Management_Reported);
      formData.append("Manager_Date_Report", Manager_Date_Report);
      formData.append(
        "Comment_Initial_Investigation",
        Comment_Initial_Investigation
      );
      formData.append("Action_Requried", Action_Requried);
      formData.append("Action_Performed", Action_Performed);
      formData.append("Manager_Name", Manager_Name);

      Manager_sign &&
        formData.append("Manager_sign", {
          // file: Manager_sign,
          uri:
            Platform.OS === "android"
              ? Manager_sign
              : Manager_sign.replace("file://", ""),
          name: Manager_sign.split("/").pop(),
          type: "image/jpeg", // it may be necessary in Android.
        });

      formData.append("Manager_date", Manager_date);
      formData.append("task_id", task_id);
      formData.append("tab_id", tab_id);

      callingDetails.forEach((item) => {
        formData.append(`callingDetails[]`, JSON.stringify([item]));
      });

      dynamicInput.forEach((item) => {
        formData.append(`dynamicInput[]`, JSON.stringify([item]));
      });

      commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });

      console.log(formData);

      // const body = {
      //   Name_Of_Person,
      //   Incident_Date,
      //   Location_of_Incident,
      //   Investigation_Date,
      //   Type_of_Incident,
      //   Name_of_Injured_Person,
      //   Age,
      //   Sex,
      //   Employee,
      //   Address,
      //   Phone,
      //   Occupation,
      //   Nature_of_Injury,
      //   Witness_Statement,
      //   Whom_Accident_Reported,
      //   When_Accident_Reported,
      //   Supervisor_Name,
      //   Supervisor_Signature,
      //   Supervisor_Date,
      //   Whom_Management_Reported,
      //   Manager_Date_Report,
      //   Comment_Initial_Investigation,
      //   Action_Requried,
      //   Action_Performed,
      //   Manager_Name,
      //   Manager_sign,
      //   Manager_date,
      //   task_id,
      //   tab_id,
      //   Ambulance_Details,
      //   Dynamic_Input,
      // };

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/accident",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_VERIFICATION_WORK_SUCCESS,
          payload: response,
        });
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertCleanUpForm = (
  contractor,
  project,
  operation,
  date,
  jobSummary,
  signature,
  date1,
  projectImagesComment,
  commentImages,
  task_id,
  tab_id,
  token,
  index
) => {
  return async (dispatch, getState) => {
    try {
      // console.log("Contractor Name :", contractor);
      // console.log("Project Name :", project);
      // console.log("Operatives :", operation);
      // console.log("Date :", date);
      // console.log("Array:", jobSummary);
      // console.log("Supervisor Sign :", signature);
      // console.log("Supervisor Date :", date1);
      // console.log("Job ID :", task_id);
      // console.log("Tab Name :", tab_id);
      // console.log("Token :", token);

      const formData = new FormData();

      formData.append("contractor", contractor);
      formData.append("project", project);
      formData.append("operation", operation);
      formData.append("date", date);
      signature &&
        formData.append("signature", {
          // file: signature,
          uri:
            Platform.OS === "android"
              ? signature
              : signature.replace("file://", ""),
          name: signature.split("/").pop(),
          type: "image/jpeg", // it may be necessary in Android.
        });
      formData.append("date1", date1);
      formData.append("task_id", task_id);
      formData.append("tab_id", tab_id);

      jobSummary.forEach((item) => {
        formData.append(`jobSummary[]`, JSON.stringify([item]));
      });

      commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/cleanup",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_CLEAN_UP_FORM_SUCCESS,
          payload: response,
        });
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertElectricalEquipemntForm = (
  contractor,
  project,
  supervisor,
  date,
  jobSummary,
  projectImagesComment,
  commentImages,
  task_id,
  tab_id,
  token,
  index
) => {
  return async (dispatch, getState) => {
    try {
      // console.log("Name Of Contractor :", contractor);
      // console.log("Project Name :", project);
      // console.log("Supervisor Sign :", supervisor);
      // console.log("Date :", date);
      // console.log("Dynamic Input :", jobSummary);
      // console.log("Job ID :", task_id);
      // console.log("Tab Name :", tab_id);
      // console.log("Token :", token);

      const formData = new FormData();

      formData.append("contractor", contractor);
      formData.append("project", project);

      supervisor &&
        formData.append("supervisor", {
          // file: supervisor,
          uri:
            Platform.OS === "android"
              ? supervisor
              : supervisor.replace("file://", ""),
          name: supervisor.split("/").pop(),
          type: "image/jpeg", // it may be necessary in Android.
        });

      formData.append("date", date);
      formData.append("task_id", task_id);
      formData.append("tab_id", tab_id);

      jobSummary.forEach((item) => {
        formData.append(`jobSummary[]`, JSON.stringify([item]));
      });

      commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });
      // formData.append("jobSummary",jobSummary)

      // const body = {
      //   contractor,
      //   project,
      //   supervisor,
      //   date,
      //   task_id,
      //   tab_id,
      //   jobSummary,
      // };

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/electric_equipment",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_ELECTRICAL_EQUIPMENT_FORM_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.INSERT_ELECTRICAL_EQUIPMENT_FORM_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertFridayPackForm = (
  contractor,
  project,
  supervisor,
  jobSummary,
  week_ending,
  date,
  furhter_comment,
  projectImagesComment,
  commentImages,
  task_id,
  tab_id,
  token,
  index
) => {
  return async (dispatch, getState) => {
    try {
      // console.log("Name Of Contractor :", contractor);
      // console.log("Project Name :", project);
      // console.log("Supervisor Sign :", supervisor);
      // console.log("Document Row :", jobSummary);
      // console.log("Week Ending :", week_ending);
      // console.log("further Comments :", furhter_comment);
      // console.log("Date :", date);
      // console.log("Job ID :", task_id);
      // console.log("Tab Name :", tab_id);
      // console.log("Token :", token);

      const formData = new FormData();

      formData.append("contractor", contractor);
      formData.append("project", project);
      formData.append("week_ending", week_ending);

      supervisor &&
        formData.append("supervisor", {
          // file: supervisor,
          uri:
            Platform.OS === "android"
              ? supervisor
              : supervisor.replace("file://", ""),
          name: supervisor.split("/").pop(),
          type: "image/jpeg", // it may be necessary in Android.
        });

      formData.append("furhter_comment", furhter_comment);
      formData.append("date", date);
      formData.append("task_id", task_id);
      formData.append("tab_id", tab_id);

      jobSummary.forEach((item) => {
        formData.append(`jobSummary[]`, JSON.stringify([item]));
      });

      commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/friday_pack",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_ELECTRICAL_EQUIPMENT_FORM_SUCCESS,
          payload: response,
        });
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertHarmFulForm = (
  contractor,
  project,
  date,
  jobSummary,
  projectImagesComment,
  commentImages,
  task_id,
  tab_id,
  token,
  index
) => {
  return async (dispatch, getState) => {
    try {
      // console.log("Name Of Contractor :", contractor);
      // console.log("Project Name :", project);
      // console.log("Date :", date);
      // console.log("Dynamic Input  :", jobSummary);
      // console.log("Job ID :", task_id);
      // console.log("Tab Name :", tab_id);
      // console.log("Token :", token);

      const formData = new FormData();

      formData.append("contractor", contractor);
      formData.append("project", project);
      formData.append("date", date);
      formData.append("tab_id", tab_id);
      formData.append("task_id", task_id);

      jobSummary.forEach((item) => {
        formData.append(`jobSummary[]`, JSON.stringify([item]));
      });

      commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });

      // const body = {
      //   contractor,
      //   project,
      //   date,
      //   tab_id,
      //   task_id,
      //   jobSummary,
      // };

      console.log(formData);
      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/harmfulSubstance",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      //console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_HARMFUL_SUBSTANCE_FORM_SUCCESS,
          payload: response,
        });
      } else {
        console.log(response?.response?.request);
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertHealthSafetyForm = (
  Contractor,
  Supervisor,
  Date,
  Address,
  Action,
  Inspection_Name,
  Inspection_For,
  Inspection_Date,
  inspectionSignature,
  Document,
  projectImagesComment,
  commentImages,
  task_id,
  tab_id,
  token,
  index
) => {
  return async (dispatch, getState) => {
    try {
      // console.log("Contractor Name :", Contractor);
      // console.log("Site Supervisor :", Supervisor);
      // console.log("Date :", Date);
      // console.log("Project Address :", Address);
      // console.log("Array:", Action);
      // console.log("Inspection Name :", Inspection_Name);
      // console.log("Inspection For :", Inspection_For);
      // console.log("Inspection Date :", Inspection_Date);
      // console.log("Inspection Signature :", inspectionSignature);
      // console.log("Document Array :", Document);
      // console.log("Job ID :", task_id);
      // console.log("Tab Name :", tab_id);
      // console.log("Token :", token);

      const formData = new FormData();

      formData.append("Contractor", Contractor);
      formData.append("Supervisor", Supervisor);
      formData.append("Date", Date);
      formData.append("Address", Address);
      formData.append("Inspection_Name", Inspection_Name);
      formData.append("Inspection_For", Inspection_For);
      formData.append("Inspection_Date", Inspection_Date);

      inspectionSignature &&
        formData.append("inspectionSignature", {
          // file: inspectionSignature,
          uri:
            Platform.OS === "android"
              ? inspectionSignature
              : inspectionSignature.replace("file://", ""),
          name: inspectionSignature.split("/").pop(),
          type: "image/jpeg", // it may be necessary in Android.
        });

      formData.append("task_id", task_id);
      formData.append("tab_id", tab_id);

      Action.forEach((item) => {
        formData.append(`Action[]`, JSON.stringify([item]));
      });

      Document.forEach((item) => {
        formData.append(`Document[]`, JSON.stringify([item]));
      });

      // formData.append(`Document`,JSON.stringify(Document));
      commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });
      console.log(formData);
      // const body = {
      //   Contractor,
      //   Supervisor,
      //   Date,
      //   Address,
      //   Inspection_Name,
      //   Inspection_For,
      //   Inspection_Date,
      //   Inspection_Signature,
      //   task_id,
      //   tab_id,
      //   Action,
      //   Document,
      // };

      const request = await axios(
        base_url +
          "supervisor/insert/healthAndSecurity/HealthAndSAfetyInspection",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_TBT_HEALTHSAFETY_FORM_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.INSERT_HARMFUL_SUBSTANCE_FORM_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertHouseKeepingForm = (
  contractor,
  project,
  week,
  jobSummary,
  Supervisor,
  date,
  projectImagesComment,
  commentImages,
  task_id,
  tab_id,
  token,
  index
) => {
  return async (dispatch, getState) => {
    try {
      // console.log("Main Contractor  :", contractor);
      // console.log("Project Name :", project);
      // console.log("Week Commencing :", week);
      // console.log("Check List Attay :", jobSummary);
      // console.log("Supervisor Sign :", Supervisor);
      // console.log("Supervisor Date :", date);

      const formData = new FormData();

      formData.append("contractor", contractor);
      formData.append("project", project);
      formData.append("week", week);

      Supervisor &&
        formData.append("Supervisor", {
          // file: Supervisor,
          uri:
            Platform.OS === "android"
              ? Supervisor
              : Supervisor.replace("file://", ""),
          name: Supervisor.split("/").pop(),
          type: "image/jpeg", // it may be necessary in Android.
        });

      formData.append("date", date);
      formData.append("task_id", task_id);
      formData.append("tab_id", tab_id);

      jobSummary.forEach((item) => {
        formData.append(`jobSummary[]`, JSON.stringify([item]));
      });

      commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });
      // formData.append("jobSummary",jobSummary)

      // const body = {
      //   contractor,
      //   project,
      //   week,
      //   Supervisor,
      //   date,
      //   task_id,
      //   tab_id,
      //   jobSummary,
      // };

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/housekeepings",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_HOUSE_KEEPING_FORM_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.INSERT_HOUSE_KEEPING_FORM_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertLAdderCheckListForm = (
  contractor,
  project,
  supervisor,
  date,
  next_inspection,
  comment,
  jobSummary,
  projectImagesComment,
  commentImages,
  task_id,
  tab_id,
  token,
  index
) => {
  return async (dispatch, getState) => {
    try {
      // console.log("Main Contractor  :", contractor);
      // console.log("Project Name :", project);
      // console.log("Supervisor Sign :", supervisor);
      // console.log("Date Complete :", date);
      // console.log("Next Inspection Date :", next_inspection);
      // console.log("Further Comments :", comment);
      // console.log("Array :", jobSummary);
      // console.log("Job ID :", task_id);
      // console.log("Tab Name :", tab_id);
      // console.log("Token :", token);

      const formData = new FormData();

      formData.append("contractor", contractor);
      formData.append("project", project);
      formData.append("date", date);

      supervisor &&
        formData.append("supervisor", {
          // file: supervisor,
          uri:
            Platform.OS === "android"
              ? supervisor
              : supervisor.replace("file://", ""),
          name: supervisor.split("/").pop(),
          type: "image/jpeg", // it may be necessary in Android.
        });

      formData.append("next_inspection", next_inspection);
      formData.append("comment", comment);
      formData.append("task_id", task_id);
      formData.append("tab_id", tab_id);

      jobSummary.forEach((item) => {
        formData.append(`jobSummary[]`, JSON.stringify([item]));
      });
      // formData.append("jobSummary",jobSummary)
      commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });
      console.log(formData);
      // const body = {
      //   contractor,
      //   project,
      //   date,
      //   supervisor,
      //   next_inspection,
      //   comment,
      //   task_id,
      //   tab_id,
      //   jobSummary,
      // };

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/Ladders",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_LADDER_CHECKLIST_FORM_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.INSERT_LADDER_CHECKLIST_FORM_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
export const insertMethodStatementForm = (
  title,
  contractor,
  project,
  ref,
  jobSummary,
  supervisor,
  supervisor_sign,
  isSign,
  projectImagesComment,
  commentImages,
  task_id,
  tab_id,
  token,
  index
) => {
  return async (dispatch, getState) => {
    try {
      //   console.log("Statement Title  :", title);
      // console.log("Main Contractor  :", contractor);
      // console.log("Project Name :", project);
      // console.log("Ref No :", ref);
      // console.log("Name Of Supervisor :", supervisor);
      // console.log("Supervisor Sign :", supervisor_sign);
      // console.log("Array Data :", jobSummary);
      // console.log("Job ID :", task_id);
      // console.log("Tab Name :", tab_id);
      // console.log("Token :", token);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("contractor", contractor);
      formData.append("project", project);
      formData.append("ref", ref);
      formData.append("supervisor", supervisor);

      supervisor_sign &&
        formData.append("supervisor_sign", {
          // file: supervisor_sign,
          uri:
            Platform.OS === "android"
              ? supervisor_sign
              : supervisor_sign.replace("file://", ""),
          name: supervisor_sign.split("/").pop(),
          type: "image/jpeg", // it may be necessary in Android.
        });

      isSign &&
        formData.append("isSign", {
          // file: isSign,
          uri:
            Platform.OS === "android" ? isSign : isSign.replace("file://", ""),
          name: isSign.split("/").pop(),
          type: "image/jpeg", // it may be necessary in Android.
        });

      formData.append("task_id", task_id);
      formData.append("tab_id", tab_id);

      jobSummary.forEach((item) => {
        formData.append(`jobSummary[]`, JSON.stringify([item]));
      });

      commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });
      // const body = {
      //   title,
      //   contractor,
      //   project,
      //   ref,
      //   supervisor,
      //   supervisor_sign,
      //   task_id,
      //   tab_id,
      //   jobSummary,
      // };

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/methodStatement",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
          },
          data: formData,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_METHOD_STATEMENT_FORM_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.INSERT_METHOD_STATEMENT_FORM_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
export const insertIssueRecordForm = (
  contractor,
  project,
  employees,
  jobSummary,
  recordSignature,
  projectImagesComment,
  commentImages,
  task_id,
  tab_id,
  token,
  index
) => {
  return async (dispatch, getState) => {
    try {
      // console.log("Main contractor  :", contractor);
      // console.log("Project Name :", project);
      // console.log("Operative Name :", employees);
      // console.log("Array :", jobSummary);
      // console.log("Job ID :", jobID);
      // console.log("Tab Name :", tabId);
      // console.log("Token :", token);

      const formData = new FormData();

      formData.append("contractor", contractor);
      formData.append("employees", employees);
      formData.append("project", project);
      formData.append("task_id", task_id);
      formData.append("tab_id", tab_id);

      recordSignature &&
        formData.append("recordSignature", {
          // file: recordSignature,
          uri:
            Platform.OS === "android"
              ? recordSignature
              : recordSignature.replace("file://", ""),
          name: recordSignature.split("/").pop(),
          type: "image/jpeg", // it may be necessary in Android.
        });

      jobSummary.forEach((item) => {
        formData.append(`jobSummary[]`, JSON.stringify([item]));
      });

      commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });
      // const body = {
      //   contractor,
      //   employees,
      //   project,
      //   task_id,
      //   tab_id,
      //   jobSummary,
      // };

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/personal_protective",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data, application/json",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_PERSONAL_PROTECTIVE_FORM_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.INSERT_PERSONAL_PROTECTIVE_FORM_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
export const insertPuwerInspectionForm = (
  contractor,
  project,
  comments,
  supervisor,
  date,
  jobSummary,
  projectImagesComment,
  commentImages,
  task_id,
  tab_id,
  token,
  index
) => {
  return async (dispatch, getState) => {
    try {
      // console.log("Main Contractor  :", contractor);
      // console.log("Project Name :", project);
      // console.log("Further Comments :", comments);
      // console.log("Supervisor Sign :", supervisor);
      // console.log("Supervisor Date :", date);
      // console.log("Array Data :", puwerArrayList);
      // console.log("Job ID :", task_id);
      // console.log("Tab Name :", tab_id);
      // console.log("Token :", token);

      const formData = new FormData();

      formData.append("contractor", contractor);
      formData.append("project", project);
      formData.append("comments", comments);

      supervisor &&
        formData.append("supervisor", {
          // file: supervisor,
          uri:
            Platform.OS === "android"
              ? supervisor
              : supervisor.replace("file://", ""),
          name: supervisor.split("/").pop(),
          type: "image/jpeg", // it may be necessary in Android.
        });

      formData.append("date", date);
      formData.append("task_id", task_id);
      formData.append("tab_id", tab_id);

      jobSummary.forEach((item) => {
        formData.append(`jobSummary[]`, JSON.stringify([item]));
      });

      projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });
      // const body = {
      //   contractor,
      //   project,
      //   comments,
      //   supervisor,
      //   date,
      //   task_id,
      //   tab_id,
      //   jobSummary,
      // };
      commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });
      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/Puwer",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data, application/json",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      // if (response.success == true) {
      //   dispatch({
      //     type: Actions.INSERT_METHOD_STATEMENT_FORM_SUCCESS,
      //     payload: response,
      //   });
      // } else {
      //   // dispatch({
      //   //   type: Actions.INSERT_METHOD_STATEMENT_FORM_FAIL,
      //   //   payload: response,
      //   // });
      //   throw new Error(response.message);
      // }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertOnSiteDecorationForm = (
  contractor,
  project,
  jobSummary,
  onSiteSignature,
  projectImagesComment,
  commentImages,
  task_id,
  tab_id,
  token,
  index
) => {
  return async (dispatch, getState) => {
    try {
      //   console.log("Statement Title  :", title);
      // console.log("Main Contractor  :", contractor);
      // console.log("Project Name :", project);
      // console.log("Ref No :", ref);
      // console.log("Name Of Supervisor :", supervisor);
      // console.log("Supervisor Sign :", supervisor_sign);
      // console.log("Array Data :", jobSummary);
      // console.log("Job ID :", task_id);
      // console.log("Tab Name :", tab_id);
      // console.log("Token :", token);

      const formData = new FormData();

      formData.append("contractor", contractor);
      formData.append("project", project);
      formData.append("task_id", task_id);
      formData.append("tab_id", tab_id);

      onSiteSignature &&
        formData.append("onSiteSignature", {
          // file: onSiteSignature,
          uri:
            Platform.OS === "android"
              ? onSiteSignature
              : onSiteSignature.replace("file://", ""),
          name: onSiteSignature.split("/").pop(),
          type: "image/jpeg", // it may be necessary in Android.
        });

      jobSummary.forEach((item) => {
        formData.append(`jobSummary[]`, JSON.stringify([item]));
      });

      projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });
      commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });
      // const body = {
      //   contractor,
      //   project,
      //   task_id,
      //   tab_id,
      //   jobSummary,
      // };

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/top_decorting",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data, application/json",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_ON_SITE_DECORATION_FORM_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.INSERT_ON_SITE_DECORATION_FORM_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertRecordOfProject = (
  surname,
  mobile,
  firstname,
  job,
  address,
  cscscard,
  detail,
  nexttokin,
  relation_to_kin,
  kincontact,
  contractor,
  project,
  jobSummary,
  projectImagesComment,
  commentImages,
  task_id,
  tab_id,
  token,
  index
) => {
  return async (dispatch, getState) => {
    try {
      // console.log("Surname :", surname);
      // console.log("Mobile  :", mobile);
      // console.log("First Name :", firstname);
      // console.log("Job:", job);
      // console.log("Address :", address);
      // console.log("Card No :", cscscard);
      // console.log("Detail :", detail);
      // console.log("Next to Kin  :", nexttokin);
      // console.log("Realation  :", relation_to_kin);
      // console.log("Kin Contact :", kincontact);
      // console.log("Contractor Name :", contractor);
      // console.log("Project Name :", project);
      // console.log("Job Summary thi :", jobSummary);
      // console.log("Job ID :", task_id);
      // console.log("Tab Name :", tab_id);
      console.log("Token :", token);

      const formData = new FormData();

      formData.append("surname", surname);
      formData.append("firstname", firstname);
      formData.append("relation_to_kin", relation_to_kin);
      formData.append("mobile", mobile);
      formData.append("job", job);
      formData.append("address", address);
      formData.append("cscscard", cscscard);
      formData.append("project", project);
      formData.append("detail", detail);
      formData.append("nexttokin", nexttokin);
      formData.append("kincontact", kincontact);
      formData.append("contractor", contractor);
      formData.append("task_id", task_id);
      formData.append("tab_id", tab_id);

      jobSummary.forEach((item) => {
        formData.append(`jobSummary[]`, JSON.stringify([item]));
      });

      projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });
      commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });
      console.log(formData);
      // const body = {
      //   surname,
      //   firstname,
      //   relation_to_kin,
      //   mobile,
      //   job,
      //   address,
      //   cscscard,
      //   detail,
      //   nexttokin,
      //   kincontact,
      //   contractor,
      //   project,
      //   task_id,
      //   tab_id,
      //   jobSummary,
      // };

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/IntroTraining",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data, application/json",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      // console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_RECORD_OF_PROJECT_FORM_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.INSERT_RECORD_OF_PROJECT_FORM_FAIL,
        //   payload: response,
        // });
        console.log(response?.response?.request);
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertDailyBreifingForm = (
  Contractor,
  Project,
  Supervisor,
  Statment,
  Date,
  Daily,
  Job_Safe,
  Brefily,
  Operative,
  Hazrd,
  saveStartSignature,
  projectImagesComment,
  commentImages,
  task_id,
  tab_id,
  token,
  index
) => {
  return async (dispatch, getState) => {
    try {
      // console.log("Main Contractor :", Contractor);
      // console.log("Project Name :", Project);
      // console.log("Supervisor Name :", Supervisor);
      // console.log("Statment Number :", Statment);
      // console.log("Date :", Date);
      // console.log("Daily array :", Daily);
      // console.log("Job Safe Array :", Job_Safe);
      // console.log("Brefily Array :", Brefily);
      // console.log("Operative Array :", Operative);
      // console.log("Hazrd Array :", Hazrd);
      // console.log("Job ID :", task_id);
      // console.log("Tab Name :", tab_id);
      // console.log("Token :", token);

      const formData = new FormData();

      formData.append("Contractor", Contractor);
      formData.append("Project", Project);
      formData.append("Supervisor", Supervisor);
      formData.append("Statment", Statment);
      formData.append("Date", Date);
      formData.append("task_id", task_id);
      formData.append("tab_id", tab_id);

      Daily.forEach((item) => {
        formData.append(`Daily[]`, JSON.stringify([item]));
      });

      Job_Safe.forEach((item) => {
        formData.append(`Job_Safe[]`, JSON.stringify([item]));
      });

      Brefily.forEach((item) => {
        formData.append(`Brefily[]`, JSON.stringify([item]));
      });

      Operative.forEach((item) => {
        formData.append(`Operative[]`, JSON.stringify([item]));
      });

      Hazrd.forEach((item) => {
        formData.append(`Hazrd[]`, JSON.stringify([item]));
      });

      saveStartSignature &&
        formData.append("saveStartSignature", {
          // file: saveStartSignature,
          uri:
            Platform.OS === "android"
              ? saveStartSignature
              : saveStartSignature.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });

      projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });
      commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      // formData.append("Contractor",Contractor)
      // formData.append("Contractor",Contractor)

      // const body = {
      //   Contractor,
      //   Project,
      //   Supervisor,
      //   Statment,
      //   Date,
      //   task_id,
      //   tab_id,
      //   Daily,
      //   Job_Safe,
      //   Brefily,
      //   Operative,
      //   Hazrd,
      // };
      console.log(formData);
      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/DailyBreifing",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data, application/json",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_TBT_DAILYBREIFING_FORM_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.INSERT_ON_SITE_DECORATION_FORM_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertTBTCOSH = (data, token, index) => {
  return async (dispatch, getState) => {
    try {
      console.log("array :", data);
      // console.log("Job ID :", jobID);
      // console.log("Tab Name :", tabId);
      //console.log("Token :", token);

      const formData = new FormData();

      formData.append("contractor", data.contractor);
      formData.append("project", data.project);
      formData.append("supervisor", data.supervisor);
      formData.append("date", data.date);
      formData.append("comments", data.comments);
      formData.append("task_id", data.task_id);
      formData.append("tab_id", data.tab_id);

      data.tbtSign &&
        formData.append("tbtSign", {
          // file: signature,
          uri:
            Platform.OS === "android"
              ? data.tbtSign
              : data.tbtSign.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });

      data.jobSummary.forEach((item) => {
        formData.append(`jobSummary[]`, JSON.stringify([item]));
      });

      data.projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });
      data.commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });
      console.log("Form Data", formData);

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/COSHH",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data, application/json",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_TBT_COSH_FORM_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.INSERT_ON_SITE_DECORATION_FORM_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertTbtFire = (data, token, index) => {
  return async (dispatch, getState) => {
    try {
      console.log("array :", data);
      console.log("Token :", token);

      // const body = {
      //   contractor,
      //   project,
      //   task_id,
      //   tab_id,
      //   jobSummary,
      // };

      const formData = new FormData();

      formData.append("contractor", data.contractor);
      formData.append("project", data.project);
      formData.append("supervisor", data.supervisor);
      formData.append("date", data.date);
      formData.append("comments", data.comments);
      formData.append("task_id", data.task_id);
      formData.append("tab_id", data.tab_id);

      data.tbtSign &&
        formData.append("tbtSign", {
          // file: signature,
          uri:
            Platform.OS === "android"
              ? data.tbtSign
              : data.tbtSign.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      data.jobSummary.forEach((item) => {
        formData.append(`jobSummary[]`, JSON.stringify([item]));
      });

      data.projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });
      data.commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      console.log("Form Data :", formData);
      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/fire_safety",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data, application/json",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_TBT_FIRE_FORM_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.INSERT_ON_SITE_DECORATION_FORM_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertTbtSlip = (data, token, index) => {
  return async (dispatch, getState) => {
    try {
      // console.log("array :", data);
      // console.log("Token :", token);

      // const body = {
      //   contractor,
      //   project,
      //   task_id,
      //   tab_id,
      //   jobSummary,
      // };

      const formData = new FormData();

      formData.append("contractor", data.contractor);
      formData.append("project", data.project);
      formData.append("supervisor", data.supervisor);
      formData.append("date", data.date);
      formData.append("comments", data.comments);
      formData.append("task_id", data.task_id);
      formData.append("tab_id", data.tab_id);
      data.tbtSign &&
        formData.append("tbtSign", {
          // file: signature,
          uri:
            Platform.OS === "android"
              ? data.tbtSign
              : data.tbtSign.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      data.jobSummary.forEach((item) => {
        formData.append(`jobSummary[]`, JSON.stringify([item]));
      });

      data.projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });
      data.commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/SlitTrip",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data, application/json",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_TBT_SLIP_FORM_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.INSERT_ON_SITE_DECORATION_FORM_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
export const insertTbtCovid = (data, token, index) => {
  return async (dispatch, getState) => {
    try {
      // console.log("array :", data);
      // console.log("Token :", token);

      // const body = {
      //   contractor,
      //   project,
      //   task_id,
      //   tab_id,
      //   jobSummary,
      // };
      const formData = new FormData();

      formData.append("contractor", data.contractor);
      formData.append("project", data.project);
      formData.append("supervisor", data.supervisor);
      formData.append("date", data.date);
      formData.append("comments", data.comments);
      formData.append("task_id", data.task_id);
      formData.append("tab_id", data.tab_id);

      data.tbtSign &&
        formData.append("tbtSign", {
          // file: signature,
          uri:
            Platform.OS === "android"
              ? data.tbtSign
              : data.tbtSign.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      data.jobSummary.forEach((item) => {
        formData.append(`jobSummary[]`, JSON.stringify([item]));
      });

      data.projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });
      data.commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/covid",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data, application/json",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_ON_SITE_DECORATION_FORM_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.INSERT_ON_SITE_DECORATION_FORM_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertTbtHouseKeepingForm = (data, token, index) => {
  return async (dispatch, getState) => {
    try {
      console.log("array :", data);
      console.log("Token :", token);

      // const body = {
      //   contractor,
      //   project,
      //   task_id,
      //   tab_id,
      //   jobSummary,
      // };

      const formData = new FormData();

      formData.append("contractor", data.contractor);
      formData.append("project", data.project);
      formData.append("supervisor", data.supervisor);
      formData.append("date", data.date);
      formData.append("comments", data.comments);
      formData.append("task_id", data.task_id);
      formData.append("tab_id", data.tab_id);
      data.tbtSign &&
        formData.append("tbtSign", {
          // file: signature,
          uri:
            Platform.OS === "android"
              ? data.tbtSign
              : data.tbtSign.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      data.jobSummary.forEach((item) => {
        formData.append(`jobSummary[]`, JSON.stringify([item]));
      });

      data.projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });
      data.commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/housekeepingTB",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data, application/json",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_TBT_HOUSEKEEPING_FORM_SUCCESS,
          payload: response,
        });
      } else {
        //   dispatch({
        //     type: Actions.INSERT_ON_SITE_DECORATION_FORM_FAIL,
        //     payload: response,
        //   });
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertTbtMobileForm = (data, token, index) => {
  return async (dispatch, getState) => {
    try {
      // console.log("array :", data);
      // console.log("Token :", token);

      // const body = {
      //   contractor,
      //   project,
      //   task_id,
      //   tab_id,
      //   jobSummary,
      // };

      const formData = new FormData();

      formData.append("contractor", data.contractor);
      formData.append("project", data.project);
      formData.append("supervisor", data.supervisor);
      formData.append("date", data.date);
      formData.append("comments", data.comments);
      formData.append("task_id", data.task_id);
      formData.append("tab_id", data.tab_id);
      data.tbtSign &&
        formData.append("tbtSign", {
          // file: signature,
          uri:
            Platform.OS === "android"
              ? data.tbtSign
              : data.tbtSign.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      data.jobSummary.forEach((item) => {
        formData.append(`jobSummary[]`, JSON.stringify([item]));
      });

      data.projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });
      data.commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/MobileEvelated",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data, application/json",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_TBT_MOBILE_FORM_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.INSERT_ON_SITE_DECORATION_FORM_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
export const insertTbtRespiratory = (data, token, index) => {
  return async (dispatch, getState) => {
    try {
      // console.log("array :", data);
      // console.log("Token :", token);

      // const body = {
      //   contractor,
      //   project,
      //   task_id,
      //   tab_id,
      //   jobSummary,
      // };
      const formData = new FormData();

      formData.append("contractor", data.contractor);
      formData.append("project", data.project);
      formData.append("supervisor", data.supervisor);
      formData.append("date", data.date);
      formData.append("comments", data.comments);
      formData.append("task_id", data.task_id);
      formData.append("tab_id", data.tab_id);

      data.tbtSign &&
        formData.append("tbtSign", {
          // file: signature,
          uri:
            Platform.OS === "android"
              ? data.tbtSign
              : data.tbtSign.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });

      data.jobSummary.forEach((item) => {
        formData.append(`jobSummary[]`, JSON.stringify([item]));
      });

      data.projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });
      data.commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/DustMask",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data, application/json",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_TBT_RESPIRATORY_FORM_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.INSERT_ON_SITE_DECORATION_FORM_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
export const insertTbtSilicaDust = (data, token, index) => {
  return async (dispatch, getState) => {
    try {
      // console.log("array :", data);
      // console.log("Token :", token);

      // const body = {
      //   contractor,
      //   project,
      //   task_id,
      //   tab_id,
      //   jobSummary,
      // };
      const formData = new FormData();

      formData.append("contractor", data.contractor);
      formData.append("project", data.project);
      formData.append("supervisor", data.supervisor);
      formData.append("date", data.date);
      formData.append("comments", data.comments);
      formData.append("task_id", data.task_id);
      formData.append("tab_id", data.tab_id);

      data.tbtSign &&
        formData.append("tbtSign", {
          // file: signature,
          uri:
            Platform.OS === "android"
              ? data.tbtSign
              : data.tbtSign.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });

      data.jobSummary.forEach((item) => {
        formData.append(`jobSummary[]`, JSON.stringify([item]));
      });

      data.projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });
      data.commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      console.log(formData);

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/SilicaDust",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data, application/json",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_TBT_SILICA_FORM_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.INSERT_ON_SITE_DECORATION_FORM_FAIL,
        //   payload: response,
        // });
        console.log(response?.response?.request);
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertTbtDrugs = (data, token, index) => {
  return async (dispatch, getState) => {
    try {
      // console.log("array :", data);
      // console.log("Token :", token);

      // const body = {
      //   contractor,
      //   project,
      //   task_id,
      //   tab_id,
      //   jobSummary,
      // };

      const formData = new FormData();

      formData.append("contractor", data.contractor);
      formData.append("project", data.project);

      data.signature &&
        formData.append("signature", {
          // file: signature,
          uri:
            Platform.OS === "android"
              ? data.signature
              : data.signature.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });

      formData.append("supervisor", data.supervisor);
      formData.append("date", data.date);
      formData.append("comments", data.comments);
      formData.append("task_id", data.task_id);
      formData.append("tab_id", data.tab_id);

      data.tbtSign &&
        formData.append("tbtSign", {
          // file: signature,
          uri:
            Platform.OS === "android"
              ? data.tbtSign
              : data.tbtSign.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });

      data.jobSummary.forEach((item) => {
        formData.append(`jobSummary[]`, JSON.stringify([item]));
      });

      data.projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });
      data.commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/DrugAndAlcohol",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data, application/json",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );

      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_TBT_DRUGS_FORM_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.INSERT_ON_SITE_DECORATION_FORM_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
export const insertTbtVolience = (data, token, index) => {
  return async (dispatch, getState) => {
    try {
      // console.log("array :", data);
      // console.log("Token :", token);

      const formData = new FormData();

      formData.append("date", data.date);
      formData.append("supervisor", data.supervisor);
      data.signature &&
        formData.append("signature", {
          // file: signature,
          uri:
            Platform.OS === "android"
              ? data.signature
              : data.signature.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });

      formData.append("task_id", data.task_id);
      formData.append("tab_id", data.tab_id);

      data.tbtSign &&
        formData.append("tbtSign", {
          // file: signature,
          uri:
            Platform.OS === "android"
              ? data.tbtSign
              : data.tbtSign.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });

      data.jobSummary.forEach((item) => {
        formData.append(`jobSummary[]`, JSON.stringify([item]));
      });

      data.projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });
      data.commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/VoilenceAndAggression",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data, application/json",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_TBT_VOLIENCE_FORM_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.INSERT_ON_SITE_DECORATION_FORM_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertTbtWorking = (data, token, index) => {
  return async (dispatch, getState) => {
    try {
      console.log("array :", data);
      console.log("Token :", token);

      // const body = {
      //   contractor,
      //   project,
      //   task_id,
      //   tab_id,
      //   jobSummary,
      // };

      const formData = new FormData();

      formData.append("contractor", data.contractor);
      formData.append("project", data.project);
      formData.append("meeting", data.meeting);
      formData.append("date", data.date);
      formData.append("comments", data.comments);
      formData.append("task_id", data.task_id);
      formData.append("tab_id", data.tab_id);

      data.tbtSign &&
        formData.append("tbtSign", {
          // file: tbtSign,
          uri:
            Platform.OS === "android"
              ? data.tbtSign
              : data.tbtSign.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });

      data.jobSummary.forEach((item) => {
        formData.append(`jobSummary[]`, JSON.stringify([item]));
      });

      data.projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });
      data.commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/WorkingAtHeight",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data, application/json",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_TBT_WORKING_FORM_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.INSERT_ON_SITE_DECORATION_FORM_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertTbtRegister = (
  client,
  project,
  subject,
  outline,
  date,
  start,
  finish,
  jobSummary,
  supervisor,
  signature,
  tbtSign,
  projectImagesComment,
  commentImages,
  task_id,
  tab_id,
  token,
  index
) => {
  return async (dispatch, getState) => {
    try {
      // console.log("Client :", client);
      // console.log("Project :", project);
      // console.log("Subject :", subject);
      // console.log("outline :", outline);
      // console.log("Register Date :", date);
      // console.log("Start Time :", start);
      // console.log("Finish Time :", finish);
      // console.log("Array :", jobSummary);
      // console.log("Supervisor Name :", supervisor);
      // console.log("Supervisor Signature :", signature);
      // console.log("Job ID :", task_id);
      // console.log("Tab Name :", tab_id);
      // console.log("Token :", token);

      const formData = new FormData();

      formData.append("client", client);
      formData.append("project", project);
      formData.append("subject", subject);
      formData.append("date", date);
      formData.append("outline", outline);
      formData.append("start", start);
      formData.append("finish", finish);
      formData.append("supervisor", supervisor);
      signature &&
        formData.append("signature", {
          // file: signature,
          uri:
            Platform.OS === "android"
              ? signature
              : signature.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });

      formData.append("task_id", task_id);
      formData.append("tab_id", tab_id);

      tbtSign &&
        formData.append("tbtSign", {
          // file: tbtSign,
          uri:
            Platform.OS === "android"
              ? tbtSign
              : tbtSign.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });

      jobSummary.forEach((item) => {
        formData.append(`jobSummary[]`, JSON.stringify([item]));
      });

      projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });
      commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });
      // const body = {
      //   client,
      //   project,
      //   subject,
      //   date,
      //   outline,
      //   start,
      //   finish,
      //   supervisor,
      //   signature,
      //   task_id,
      //   tab_id,
      //   jobSummary,
      // };
      console.log(formData);
      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/ToolBoxRegister",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data, application/json",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_TBT_TOOLBOX_FORM_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.INSERT_ON_SITE_DECORATION_FORM_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const insertTbtInventory = (
  contractor,
  project,
  supervisor,
  date,
  jobSummary,
  projectImagesComment,
  commentImages,
  task_id,
  tab_id,
  token,
  index
) => {
  return async (dispatch, getState) => {
    try {
      console.log("Main contractor :", contractor);
      console.log("project Name :", project);
      console.log("Supervisor Sign :", supervisor);
      console.log("Supervisor date :", date);
      console.log("Array:", jobSummary);
      console.log("Job ID :", task_id);
      console.log("Tab Name :", tab_id);
      console.log("Token :", token);

      const formData = new FormData();

      formData.append("contractor", contractor);
      formData.append("project", project);
      formData.append("date", date);

      supervisor &&
        formData.append("supervisor", {
          // file: supervisor,
          uri:
            Platform.OS === "android"
              ? supervisor
              : supervisor.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });

      jobSummary.forEach((item) => {
        formData.append(`jobSummary[]`, JSON.stringify([item]));
      });
      formData.append("task_id", task_id);
      formData.append("tab_id", tab_id);

      projectImagesComment.forEach((element) => {
        formData.append("projectImagesComment[]", {
          uri:
            Platform.OS === "android"
              ? element.image
              : element.image.replace("file://", ""),
          name: Math.random(0, 1000).toString(),
          type: "image/png", // it may be necessary in Android.
        });
      });
      commentImages.forEach((item) => {
        formData.append(`commentImages[]`, JSON.stringify([item]));
      });
      // const body = {
      //   contractor,
      //   project,
      //   date,
      //   supervisor,
      //   jobSummary,
      //   task_id,
      //   tab_id,
      //   jobSummary,
      // };

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/WorkingAtHeightEquip",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data, application/json",
            "Cache-Control": "no-cache",
          },
          data: formData,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.INSERT_TBT_INVENTORY_FORM_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.INSERT_ON_SITE_DECORATION_FORM_FAIL,
        //   payload: response,
        // });
        console.log(response?.response?.request);
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};

export const updateWorkFlowTopTabs = (plot_id, token) => {
  return async (dispatch, getState) => {
    try {
      console.log(plot_id, token);
      const body = {
        plot_id,
      };

      const request = await axios(
        base_url + "supervisor/search/job/taskDatails",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
          },
          data: body,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        // if(response?.data?.user.find(el=>el.tab_id==='Miscoat')){
        // _returnUpdatedArray(getState.summary.misCoat)
        dispatch({
          type: Actions.UPDATE_MISCOT_WORKFLOW,
          payload: response?.data?.user.find((el) => el.tab_id === "Miscoat")
            ? _returnUpdatedArray(
                getState().summary.misCoat,
                response?.data?.user.find((el) => el.tab_id === "Miscoat")
              )
            : getState().summary.misCoat,
        });
        //  } else if(response?.data?.user.find(el=>el.tab_id==='Decoration')){
        dispatch({
          type: Actions.UPDATE_DECORATION_WORKFLOW,
          payload: response?.data?.user.find((el) => el.tab_id === "Decoration")
            ? _returnUpdatedArray(
                getState().summary.decorationArray,
                response?.data?.user.find((el) => el.tab_id === "Decoration")
              )
            : getState().summary.decorationArray,
        });
        //  } else if(response?.data?.user.find(el=>el.tab_id==='Snag')){
        dispatch({
          type: Actions.UPDATE_SNAG_WORKFLOW,
          // payload: _returnUpdatedArray(getState().summary.snagArray,null)
          payload: response?.data?.user.find((el) => el.tab_id === "Sang")
            ? _returnUpdatedArray(
                getState().summary.snagArray,
                response?.data?.user.find((el) => el.tab_id === "Sang")
              )
            : getState().summary.snagArray,
        });
        //   }
      } else {
        dispatch({
          type: Actions.UPDATE_MISCOT_WORKFLOW,
          payload: _returnUpdatedArray(getState().summary.misCoat, null),
        });
        //  } else if(response?.data?.user.find(el=>el.tab_id==='Decoration')){
        dispatch({
          type: Actions.UPDATE_DECORATION_WORKFLOW,
          payload: _returnUpdatedArray(
            getState().summary.decorationArray,
            null
          ),
        });
        //  } else if(response?.data?.user.find(el=>el.tab_id==='Snag')){
        dispatch({
          type: Actions.UPDATE_SNAG_WORKFLOW,
          payload: _returnUpdatedArray(getState().summary.snagArray, null),
          //payload: response?.data?.user.find(el=>el.tab_id==='Sang')?_returnUpdatedArray(getState().summary.snagArray,response?.data?.user.find(el=>el.tab_id==='Sang')):getState().summary.snagArray,
        });
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const updateVerificationTopTabs = (plot_id, token) => {
  return async (dispatch, getState) => {
    try {
      console.log("Verification Plot Id :", plot_id);
      const body = {
        plot_id,
      };

      const request = await axios(
        base_url + "supervisor/search/job/taskDatails/verificationOfWork",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
          },
          data: body,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        // if(response?.data?.user.find(el=>el.tab_id==='Miscoat')){
        // _returnUpdatedArray(getState.summary.misCoat)
        dispatch({
          type: Actions.UPDATE_MISCOT_VERIFICATION,
          payload: response?.data?.user.find((el) => el.tab_id === "Miscoat")
            ? _returnUpdatedArray(
                getState().summary.verificationMiscoatInfo,
                response?.data?.user.find((el) => el.tab_id === "Miscoat")
              )
            : getState().summary.verificationMiscoatInfo,
        });
        //  } else if(response?.data?.user.find(el=>el.tab_id==='Decoration')){
        dispatch({
          type: Actions.UPDATE_DECORATION_VERIFICATION,
          payload: response?.data?.user.find((el) => el.tab_id === "Decoration")
            ? _returnUpdatedArray(
                getState().summary.verificationDecorationInfo,
                response?.data?.user.find((el) => el.tab_id === "Decoration")
              )
            : getState().summary.verificationDecorationInfo,
        });
        //  } else if(response?.data?.user.find(el=>el.tab_id==='Snag')){
        dispatch({
          type: Actions.UPDATE_SNAG_VERIFICATION,
          payload: response?.data?.user.find((el) => el.tab_id === "Snag")
            ? _returnUpdatedArray(
                getState().summary.verificationSngInfo,
                response?.data?.user.find((el) => el.tab_id === "Snag")
              )
            : getState().summary.verificationSngInfo,
        });
        //   }
      } else {
        dispatch({
          type: Actions.UPDATE_MISCOT_VERIFICATION,
          payload: _returnUpdatedArray(
            getState().summary.verificationMiscoatInfo,
            null
          ),
        });
        //  } else if(response?.data?.user.find(el=>el.tab_id==='Decoration')){
        dispatch({
          type: Actions.UPDATE_DECORATION_VERIFICATION,
          payload: _returnUpdatedArray(
            getState().summary.verificationDecorationInfo,
            null
          ),
        });
        //  } else if(response?.data?.user.find(el=>el.tab_id==='Snag')){
        dispatch({
          type: Actions.UPDATE_SNAG_VERIFICATION,
          payload: _returnUpdatedArray(
            getState().summary.verificationSngInfo,
            null
          ),
        });
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
export const updateHealthTopTabs = (plot_id, token) => {
  //return console.log({plot_id, tab_id, token })
  return async (dispatch, getState) => {
    try {
      const body = {
        plot_id,
      };
      console.log("HEalth & Safety :", token);
      const request = await axios(
        base_url + "supervisor/search/job/taskDatails/healthAndSafety",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
          },
          data: body,
        }
      );
      const response = request.data;
      console.log("Insert Response :", response);
      if (response.success == true) {
        // if(response?.data?.user.find(el=>el.tab_id==='Miscoat')){
        // _returnUpdatedArray(getState.summary.misCoat)
        dispatch({
          type: Actions.UPDATE_MISCOT_HEALTH,
          payload: response?.data?.user.find((el) => el.tab_id === "Miscoat")
            ? _returnUpdatedArray(
                getState().summary.healthAndSafetyMisCoat,
                response?.data?.user.find((el) => el.tab_id === "Miscoat")
              )
            : getState().summary.healthAndSafetyMisCoat,
        });
        //  } else if(response?.data?.user.find(el=>el.tab_id==='Decoration')){
        dispatch({
          type: Actions.UPDATE_DECORATION_HEALTH,
          payload: response?.data?.user.find((el) => el.tab_id === "Decoration")
            ? _returnUpdatedArray(
                getState().summary.healthAndSafetyDecoration,
                response?.data?.user.find((el) => el.tab_id === "Decoration")
              )
            : getState().summary.healthAndSafetyDecoration,
        });
        //  } else if(response?.data?.user.find(el=>el.tab_id==='Snag')){
        dispatch({
          type: Actions.UPDATE_SNAG_HEALTH,
          payload: response?.data?.user.find((el) => el.tab_id === "Sang")
            ? _returnUpdatedArray(
                getState().summary.healthAndSafetySnag,
                response?.data?.user.find((el) => el.tab_id === "Sang")
              )
            : getState().summary.healthAndSafetySnag,
        });
        //   }
      } else {
        dispatch({
          type: Actions.UPDATE_MISCOT_HEALTH,
          payload: _returnUpdatedArray(
            getState().summary.healthAndSafetyMisCoat,
            null
          ),
        });
        //  } else if(response?.data?.user.find(el=>el.tab_id==='Decoration')){
        dispatch({
          type: Actions.UPDATE_DECORATION_HEALTH,
          payload: _returnUpdatedArray(
            getState().summary.healthAndSafetyDecoration,
            null
          ),
        });
        //  } else if(response?.data?.user.find(el=>el.tab_id==='Snag')){
        dispatch({
          type: Actions.UPDATE_SNAG_HEALTH,
          payload: _returnUpdatedArray(
            getState().summary.healthAndSafetySnag,
            null
          ),
        });
      }
    } catch (err) {
      console.log(err?.response?.request);
      throw new Error(err.message);
    }
  };
};
const _returnUpdatedArray = (oldArr, updated) => {
  console.log("here");
  let copyData = [...oldArr];
  console.log("Copy Data :", copyData);
  oldArr.forEach((el, index) => {
    if (updated?.hasOwnProperty(el?.url)) {
      copyData[index].tickSign = updated[el.url] === "1" ? true : false;
    } else {
      copyData[index].tickSign = false;
    }
  });
  return copyData;
};
