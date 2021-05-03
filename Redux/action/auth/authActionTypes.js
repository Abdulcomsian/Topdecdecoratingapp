import * as Actions from "../../actionTypes";
import axios from "axios";

var base_url = "https://airtimetesting.airtime4u.com/public/tajs/public/api/";

export const resetLoginFlag = () => {
  return { type: Actions.RESET_LOGIN_FLAG };
};
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
      // console.log("Role :",response.user.role)
      if (response.success == true) {
        dispatch({
          type: Actions.LOGIN_SUCCESS,
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
        throw new Error(response.message);
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
        throw new Error(response.message);
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
        throw new Error(response.message);
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
  email,
  phone,
  password,
  token
) => {
  return async (dispatch, getState) => {
    try {
      // console.log("firstname :", firstname);
      // console.log("lastname :", lastname);
      // console.log("email :", email);
      // console.log("phone :", phone);
      // console.log("password :", password);
      // console.log("Token :", token);

      const body = { email, password, firstname, phone, lastname };
      const request = await axios(base_url + "admin/create/decorator", {
        method: "POST",
        headers: {
          authorization: "Bearer " + token,
        },
        data: body,
      });
      const response = request.data;
      console.log("API Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.CREATE_DECORATOR_SUCSESS,
          payload: response,
        });
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      console.log("API Error :", err.message);
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
      console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.UPDATE_PLOT_REPORT,
          payload: index,
        });
        dispatch({
          type: Actions.CREATE_HAND_OVER_SHEET_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.CREATE_HAND_OVER_SHEET_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
      console.log("Error Response :", err);
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
        dynamicInput,
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
      console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.UPDATE_PLOT_REPORT,
          payload: index,
        });
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
      const body = {
        block,
        plot_number,
        isue_date,
        completion_date,
        pre_w_snagging,
        painter,
        snagging_isue_by,
        completed_by,
        No_of_Pages,
        hour,
        task_id,
        tab_id,
        dynamicInput,
        dynamicInputComplete,
      };

      const request = await axios(
        base_url + "supervisor/make/workflow/insertWarenty",
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
          type: Actions.UPDATE_PLOT_REPORT,
          payload: index,
        });
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
      console.log("Insert Error Response :", err.message);
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
      console.log("Activity Array :", dynamicInputcomplete);
      console.log("Token :", token);
      const body = {
        project,
        unit,
        mc,
        md,
        sms,
        bscs,
        task_id,
        tab_id,
        dynamicInput,
        dynamicInputcomplete,
      };

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/quaity",
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
          type: Actions.UPDATE_PLOT_REPORT,
          payload: index,
        });
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
      console.log("Insert Error Response :", err.message);
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
        totalHours,
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
          type: Actions.UPDATE_PLOT_REPORT,
          payload: index,
        });
        dispatch({
          type: Actions.CREATE_REMEDIAL_WORK_SHEET_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.CREATE_REMEDIAL_WORK_SHEET_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
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
      // console.log("Date :", date);
      // console.log("Job ID :", task_id);
      // console.log("Tab Name :", tab_id);
      // console.log("Token :", token);
      const body = {
        signature,
        date,
        type,
        painter,
        task_id,
        tab_id,
        dynamicInput,
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
      console.log("Insert Response :", response);
      if (response.success == true) {
        dispatch({
          type: Actions.UPDATE_PLOT_REPORT,
          payload: index,
        });
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
      const body = {
        contractor,
        title,
        day_start,
        week_ending,
        indution,
        plot,
        description,
        manager,
        sign,
        date,
        position,
        task_id,
        tab_id,
        LABOUR,
        MATERIALS,
        PLANTS,
        PRELIMINARIES,
      };

      const request = await axios(
        base_url + "supervisor/insert/verification/accurate",
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
          type: Actions.UPDATE_PLOT_REPORT,
          payload: index,
        });
        dispatch({
          type: Actions.INSERT_ACCURATE_DAY_WOEK_SHEET_CREATE,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.INSERT_ACCURATE_DAY_WOEK_SHEET_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
      console.log("Erroe :", err.message);
      throw new Error(err.message);
    }
  };
};
export const insertDecorationRecord = (
  jobSummary,
  jobSummarycomplete,
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
      const body = {
        task_id,
        tab_id,
        jobSummary,
        jobSummarycomplete,
      };

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/decoration",
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
      console.log("error:", err.message);
      throw new Error(err.message);
    }
  };
};
export const insertMiscoat = (
  contractor,
  project,
  jobSummary,
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
      const body = {
        contractor,
        project,
        task_id,
        tab_id,
        jobSummary,
      };

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/Miscoat",
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
      console.log("error:", err.message);
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
      const body = {
        contractor,
        instruction,
        raised_by,
        date,
        details,
        condition,
        s_date,
        task_id,
        tab_id,
        supervisor,
      };

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/Instruction",
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
      // console.log("error:", err.message);
      throw new Error(err.message);
    }
  };
};
export const insertVerificationForm = (
  project,
  id_ref,
  decorator,
  PRELIMINARIES,
  task_id,
  tab_id,
  token
) => {
  return async (dispatch, getState) => {
    try {
      console.log("Project Name :", project);
      console.log("Id Ref :", id_ref);
      console.log("Decorator Name :", decorator);
      console.log("Dynamic :", PRELIMINARIES);
      console.log("Job ID :", task_id);
      console.log("Tab Name :", tab_id);
      console.log("Token :", token);

      const body = {
        project,
        id_ref,
        decorator,
        task_id,
        tab_id,
        PRELIMINARIES,
      };

      const request = await axios(
        base_url + "supervisor/insert/verification/verrify_worksheet",
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
        dispatch({
          type: Actions.INSERT_VERIFICATION_WORK_SUCCESS,
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
export const insertCleanUpForm = (
  contractor,
  project,
  operation,
  date,
  jobSummary,
  signature,
  date1,
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

      const body = {
        contractor,
        project,
        operation,
        date,
        signature,
        date1,
        task_id,
        tab_id,
        jobSummary,
      };

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/cleanup",
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
          type: Actions.INSERT_CLEAN_UP_FORM_SUCCESS,
          payload: response,
        });
      } else {
        // dispatch({
        //   type: Actions.INSERT_CLEAN_UP_FORM_FAIL,
        //   payload: response,
        // });
        throw new Error(response.message);
      }
    } catch (err) {
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

      const body = {
        contractor,
        project,
        supervisor,
        date,
        task_id,
        tab_id,
        jobSummary,
      };

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/electric_equipment",
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
  task_id,
  tab_id,
  token,
  index
) => {
  return async (dispatch, getState) => {
    try {
      console.log("Name Of Contractor :", contractor);
      console.log("Project Name :", project);
      console.log("Supervisor Sign :", supervisor);
      console.log("Document Row :", jobSummary);
      console.log("Week Ending :", week_ending);
      console.log("further Comments :", furhter_comment);
      console.log("Date :", date);
      console.log("Job ID :", task_id);
      console.log("Tab Name :", tab_id);
      console.log("Token :", token);
      const body = {
        contractor,
        project,
        week_ending,
        supervisor,
        furhter_comment,
        date,
        task_id,
        tab_id,
        jobSummary,
      };

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/friday_pack",
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
      throw new Error(err.message);
    }
  };
};
export const insertHarmFulForm = (
  contractor,
  project,
  date,
  jobSummary,
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

      const body = {
        contractor,
        project,
        date,
        tab_id,
        task_id,
        jobSummary,
      };

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/harmfulSubstance",
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
          type: Actions.INSERT_HARMFUL_SUBSTANCE_FORM_SUCCESS,
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
  Inspection_Signature,
  Document,
  task_id,
  tab_id,
  token,
  index
) => {
  return async (dispatch, getState) => {
    try {
      console.log("Contractor Name :", Contractor);
      console.log("Site Supervisor :", Supervisor);
      console.log("Date :", Date);
      console.log("Project Address :", Address);
      console.log("Array:", Action);
      console.log("Inspection Name :", Inspection_Name);
      console.log("Inspection For :", Inspection_For);
      console.log("Inspection Date :", Inspection_Date);
      console.log("Inspection Signature :", Inspection_Signature);
      console.log("Document Array :", Document);
      console.log("Job ID :", task_id);
      console.log("Tab Name :", tab_id);
      console.log("Token :", token);

      const body = {
        Contractor,
        Supervisor,
        Date,
        Address,
        Inspection_Name,
        Inspection_For,
        Inspection_Date,
        Inspection_Signature,
        task_id,
        tab_id,
        Action,
        Document,
      };

      const request = await axios(base_url + "supervisor/insert/healthAndSecurity/HealthAndSAfetyInspection", {
        method: "POST",
        headers: {
          authorization: "Bearer " + token,
        },
        data: body,
      });
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
        console.log("error:", response.message);
      }
    } catch (err) {
      console.log("error:", err.message);
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
  task_id,
  tab_id,
  token,
  index
) => {
  return async (dispatch, getState) => {
    try {
      console.log("Main Contractor  :", contractor);
      console.log("Project Name :", project);
      console.log("Week Commencing :", week);
      console.log("Check List Attay :", jobSummary);
      console.log("Supervisor Sign :", Supervisor);
      console.log("Supervisor Date :", date);

      const body = {
        contractor,
        project,
        week,
        Supervisor,
        date,
        task_id,
        tab_id,
        jobSummary,
      };

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/housekeepings",
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

      const body = {
        contractor,
        project,
        date,
        supervisor,
        next_inspection,
        comment,
        task_id,
        tab_id,
        jobSummary,
      };

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/Ladders",
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

      const body = {
        title,
        contractor,
        project,
        ref,
        supervisor,
        supervisor_sign,
        task_id,
        tab_id,
        jobSummary,
      };

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/methodStatement",
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

      const body = {
        contractor,
        employees,
        project,
        task_id,
        tab_id,
        jobSummary,
      };

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/personal_protective",
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

      const body = {
        contractor,
        project,
        comments,
        supervisor,
        date,
        task_id,
        tab_id,
        jobSummary,
      };

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/Puwer",
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
      throw new Error(err.message);
    }
  };
};
export const insertOnSiteDecorationForm = (
  contractor,
  project,
  jobSummary,
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

      const body = {
        contractor,
        project,
        task_id,
        tab_id,
        jobSummary,
      };

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/top_decorting",
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
      // console.log("Token :", token);

      const body = {
        surname,
        firstname,
        relation_to_kin,
        mobile,
        job,
        address,
        cscscard,
        detail,
        nexttokin,
        kincontact,
        contractor,
        project,
        task_id,
        tab_id,
        jobSummary,
      };

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/IntroTraining",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
          },
          data: body,
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
        throw new Error(response.message);
      }
    } catch (err) {
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

      const body = {
        Contractor,
        Project,
        Supervisor,
        Statment,
        Date,
        task_id,
        tab_id,
        Daily,
        Job_Safe,
        Brefily,
        Operative,
        Hazrd
      };

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/DailyBreifing",
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

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/COSHH",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
          },
          data: data,
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

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/fire_safety",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
          },
          data: data,
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

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/SlitTrip",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
          },
          data: data,
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

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/covid",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
          },
          data: data,
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

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/housekeepingTB",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
          },
          data: data,
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

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/MobileEvelated",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
          },
          data: data,
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

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/DustMask",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
          },
          data: data,
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

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/SilicaDust",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
          },
          data: data,
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
        throw new Error(response.message);
      }
    } catch (err) {
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

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/DrugAndAlcohol",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
          },
          data: data,
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

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/VoilenceAndAggression",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
          },
          data: data,
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

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/WorkingAtHeight",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
          },
          data: data,
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

      const body = {
        client,
        project,
        subject,
        date,
        outline,
        start,
        finish,
        supervisor,
        signature,
        task_id,
        tab_id,
        jobSummary
      };

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/ToolBoxRegister",
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

      const body = {
        contractor,
        project,
        date,
        supervisor,
        jobSummary,
        task_id,
        tab_id,
        jobSummary
      };

      const request = await axios(
        base_url + "supervisor/insert/healthAndSecurity/WorkingAtHeightEquip",
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
        dispatch({
          type: Actions.INSERT_TBT_INVENTORY_FORM_SUCCESS,
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
