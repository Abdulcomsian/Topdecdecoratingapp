import * as Actions from "../../actionTypes";
import axios from "axios";

var base_url = "https://airtimetesting.airtime4u.com/public/tajs/public/api/";

export const adminLogin = (email, password) => {
  return async (dispatch, getState) => {
    try {
      console.log(email, password);
      const body = { email, password };
      const request = await axios(base_url + "login", {
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
      console.log("Code :", code);
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
export const resetPassword = (id, password) => {
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
      // console.log(contractor)
      // console.log()
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
      //console.log(response);
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
      console.log("Body :",body);
      console.log("Token :",token);
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
  task_id,
  tab_id,
  token
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
      // console.log("Comleted Date :",completed_date)
      // console.log("JobSummary :",jobSummary)
      // console.log("Agent Name :",agentName)
      // console.log("Today Date :",todayDate)
      // console.log("Job ID :",task_id)
      // console.log("Tab Name :",tab_id)
      // console.log("Token :",token)

      const body = {
        contractor,
        project,
        block,
        reason,
        plotNumber,
        dateWritten,
        date_isue,
        supervisor,
        signature,
        todayDate,
        agentName,
        agentSignature,
        completed_date,
        task_id,
        tab_id,
        jobSummary,
      };
      const request = await axios(
        base_url + "supervisor/make/workflow/insert_handover",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
          },
          data: body,
        }
      );
      const response = request.data;
      //console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.CREATE_HAND_OVER_SHEET_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({
          type: Actions.CREATE_HAND_OVER_SHEET_FAIL,
          payload: response,
        });
      }
    } catch (err) {
      console.log("Error Response :", err);
      //throw new Error(err.message);
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
  task_id,
  tab_id,
  token
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

      const body = {
        client,
        project,
        block,
        sheetNumber,
        page,
        page2,
        reason,
        dateWritten,
        date_isue,
        plotNumber,
        supervisorName,
        signature,
        dateComplete,
        agentName,
        agentSignature,
        todayDate,
        task_id,
        tab_id,
        dynamicInput
      };
      
      const request = await axios(
        base_url + "supervisor/make/workflow/makeReadySheet",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
          },
          data: body,
        }
      );
      const response = request.data;
      //console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.CREATE_MAKE_READY_SHEET_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({
          type: Actions.CREATE_MAKE_READY_SHEET_FAIL,
          payload: response,
        });
      }
    } catch (err) {
      throw new Error(err.message);
      //console.log(err)
    }
  };
};
export const insertSnaggingForm = (
  block,
  plotNumber,
  dateIssue,
  dateComplete,
  wrrantySnagging,
  painterName,
  noOfPage,
  dynamicSnagInput,
  dateSnaggingIssue,
  dateSnaggingComplete,
  totalHours,
  dynamicSnagCompletedInput
) => {
  return async (dispatch, getState) => {
    try {
      console.log("Block :", block);
      console.log("Plot Number :", plotNumber);
      console.log("Date Issue :", dateIssue);
      console.log("Completed Date :", dateComplete);
      console.log("Wrannty Snagging :", wrrantySnagging);
      console.log("Painter Name :", painterName);
      console.log("No of Pages :", noOfPage);
      console.log("Snagging Issue By :", dateSnaggingIssue);
      console.log("Snagging Completed By :", dateSnaggingComplete);
      console.log("Total Hours :", totalHours);
    } catch (err) {
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
  task_id,
  tab_id,
  token
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


      const body = {
        contractor,
        project,
        sheet_number,
        page1,
        page2,
        block,
        plot_area_number,
        operative,
        data_issue,
        site_instruction_number,
        work_reason,
        supervisorName,
        supervisorSignature,
        dateSupervisor,
        managerName,
        managerSignature,
        dateManager,
        task_id,
        tab_id,
        dynamicInput,
        totalHours
      };
      
      const request = await axios(
        base_url + "supervisor/insert/workflow/RemendialSheet",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
          },
          data: body,
        }
      );
      const response = request.data;
      //console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.CREATE_REMEDIAL_WORK_SHEET_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({
          type: Actions.CREATE_REMEDIAL_WORK_SHEET_FAIL,
          payload: response,
        });
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
export const insertScopeForm = (
  dynamicInput,
  painter,
  signature,
  plotNumber,
  type,
  date,
  task_id,
  tab_id,
  token
) => {
  return async (dispatch, getState) => {
    try {
      console.log("Dynamic Input :", dynamicInput);
      console.log("Painter Name :", painter);
      console.log("Signature :", signature);
      console.log("Plot Number :", plotNumber);
      console.log("Type :", type);
      console.log("Date :", date);
      console.log("Job ID :", task_id);
      console.log("Tab Name :", tab_id);
      console.log("Token :", token);
      const body = {
        signature,
        date,
        type,
        painter,
        task_id,
        tab_id,
        dynamicInput
      };
      
      const request = await axios(
        base_url + "supervisor/make/workflow/insertScope",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
          },
          data: body,
        }
      );
      const response = request.data;
      //console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.CREATE_SCOPE_FORM_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({
          type: Actions.CREATE_SCOPE_FORM_FAIL,
          payload: response,
        });
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
export const insertWorkSheet = (
  mainContructor,
  contructorTitle,
  sheetNo,
  weekEnd,
  siteInstructionNo,
  plotNumber,
  descriptionWork,
  dynamicLabourInput,
  dynamicMaterialInput,
  dynamicPlantInput,
  dynamicManagmentInput,
  managerName,
  position,
  date
) => {
  return async (dispatch, getState) => {
    try {
      console.log("Main Contructor :", mainContructor);
      console.log("Constructor Title :", contructorTitle);
      console.log("Sheet No :", sheetNo);
      console.log("Week End :", weekEnd);
      console.log("Site Instruction Number :", siteInstructionNo);
      console.log("Plot Number :", plotNumber);
      console.log("Description Work :", descriptionWork);
      console.log("Labour Array :", dynamicLabourInput);
      console.log("Material Array :", dynamicMaterialInput);
      console.log("Plant Array :", dynamicPlantInput);
      console.log("Managment Array :", dynamicManagmentInput);
      console.log("Manager Name :", managerName);
      console.log("Position :", position);
      console.log("Today Date :", date);
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
export const insertDecorationRecord = (
  dynamicFirstInput,
  dynamicSeconfInput
) => {
  return async (dispatch, getState) => {
    try {
      console.log("Dynamic First Input :", dynamicFirstInput);
      console.log("Dynamic Second Input :", dynamicSeconfInput);
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
export const insertMiscoat = (mainContructor, projectName, dynamicInput) => {
  return async (dispatch, getState) => {
    try {
      console.log("Main Contructor :", mainContructor);
      console.log("Project Name :", projectName);
      console.log("Dynamic :", dynamicInput);
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
export const insertVerificationForm = (
  projectName,
  idRef,
  decoratorName,
  dynamicInput
) => {
  return async (dispatch, getState) => {
    try {
      console.log("Project Name :", projectName);
      console.log("Id Ref :", idRef);
      console.log("Decorator Name :", decoratorName);
      console.log("Dynamic :", dynamicInput);
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
