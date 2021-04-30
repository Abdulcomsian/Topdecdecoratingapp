import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, CheckBox, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { Text } from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";
import { insertMakeReadyForm } from "../../Redux/action/auth/authActionTypes";
import SignatureComponent from "../../components/SignatureComponent";
import { connect } from "react-redux";

var plus = require("../../assets/authScreen/plus.png");
const MakeReady = (props) => {
  const { navigation, token, isMakeReady, isSuccessMsg, isJobId } = props;
  const jobID = "123456";
  const tabId = props.route.params.tabName;
  const [dynamicInput, setdynamicInput] = useState([]);
  const [data, setData] = useState({
    area: "",
    description: "",
    photos: "",
    corrected: "",
    completed: "",
  });
  const [clientName, setClientName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [block, setBlock] = useState("");
  const [sheetNo, setSheetNo] = useState("");
  const [pageOff, setPageOff] = useState("");
  const [pageSecond, setPageSecond] = useState("");
  const [plotNumber, setPlotNumber] = useState("");
  const [reason, setReason] = useState("");
  const [dateWritten, setDateWritten] = useState(new Date());
  const [dateIssue, setDateIssue] = useState(new Date());
  const [supervisorName, setSupervisorName] = useState("");
  const [supervisorSignature, setSupervisorSignature] = useState("");
  const [dateComplete, setDateComplete] = useState(new Date());
  const [agentName, setAgentName] = useState("");
  const [agentSignature, setAgentSignature] = useState("");
  const [todayDate, setTodayDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [showIssue, setShowIssue] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [showToday, setShowToday] = useState(false);
  const [show, setShow] = useState(false);

  const [signature, setSignature] = useState({
    bool: false,
    agent: {
      bool: false,
      uri: "",
    },
    normal: {
      bool: false,
      uri: "",
    },
  });

  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDateWritten(new Date(currentDate).toLocaleDateString());
  };
  const onIssueChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowIssue(false);
    setDateIssue(new Date(currentDate).toLocaleDateString());
  };
  const onCompleteChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowComplete(false);
    setDateComplete(new Date(currentDate).toLocaleDateString());
  };
  const onTodayDate = (selectedDate) => {
    const currentDate = selectedDate;
    setShowToday(false);
    setTodayDate(new Date(currentDate).toLocaleDateString());
  };
  const showMode = (currentMode, type) => {
    if (type == "Date") {
      setShow(true);
      setMode(currentMode);
    } else if (type == "IssueDate") {
      setShowIssue(true);
      setMode(currentMode);
    } else if (type == "CompleteDate") {
      setShowComplete(true);
      setMode(currentMode);
    } else {
      setShowToday(true);
      setMode(currentMode);
    }
  };
  const showDatepicker = (type) => {
    if (type == "Date") {
      showMode("date", "Date");
    } else if (type == "DateIssue") {
      showMode("date", "IssueDate");
    } else if (type == "CompleteDate") {
      showMode("date", "CompleteDate");
    } else {
      showMode("date", "TodayDate");
    }
  };
  const addRow = () => {
    setdynamicInput((oldArray) => [...oldArray, data]);
    setData({
      area: "",
      description: "",
      photos: "",
      corrected: "",
      completed: "",
    });
  };

  const updateValue = (key, index, value) => {
    let preData = [...dynamicInput];
    preData[index][key] = value;
    setdynamicInput(preData);
  };
  const makeReadyFormInsert = () => {
    if (
      clientName != "" &&
      projectName != "" &&
      block != "" &&
      sheetNo != "" &&
      pageOff != "" &&
      pageSecond != "" &&
      plotNumber &&
      reason != "" &&
      supervisorName != "" &&
      agentName != ""
    ) {
      props.createMakeReadyHandler(
        clientName,
        projectName,
        block,
        sheetNo,
        pageOff,
        pageSecond,
        plotNumber,
        reason,
        dateWritten,
        dateIssue,
        dynamicInput,
        supervisorName,
        supervisorSignature,
        dateComplete,
        agentName,
        agentSignature,
        todayDate,
        jobID,
        tabId,
        token,
        props.route.params?.index
      );
    } else {
      alert("Please Insert All Fields CareFully !");
      return false;
    }
  };
  useEffect(() => {
    if (isMakeReady) {
      if (isSuccessMsg) {
        alert(isSuccessMsg);
        navigation.pop();
      }
    } else {
      if (isSuccessMsg) {
        alert(isSuccessMsg);
        return false;
      }
    }
  }, [isMakeReady,isSuccessMsg]);
  const CancelPicker = (type) =>{
    console.log(type)
    if(type=="show"){
      setShow(false)
    } else if(type=="issue") {
      setShowIssue(false)
    } else if(type=="complete") {
      setShowComplete(false)
    } else {
      setShowToday(false)
    }
  }
  return (
    <View style={styles.mainContainer}>
      <DateTimePicker
        isVisible={show}
        testID='dateTimePicker'
        value={dateWritten}
        mode={mode}
        display='default'
        onCancel={() => CancelPicker("show")}
        onConfirm={onChange}
        format='DD-MM-YYYY'
      />

      <DateTimePicker
        isVisible={showIssue}
        testID='dateTimePicker'
        value={dateIssue}
        mode={mode}
        display='default'
        onCancel={() => CancelPicker("issue")}
        onConfirm={onIssueChange}
        format='DD-MM-YYYY'
      />

      <DateTimePicker
        isVisible={showComplete}
        testID='dateTimePicker'
        value={dateComplete}
        mode={mode}
        display='default'
        onConfirm={onCompleteChange}
        onCancel={() => CancelPicker("complete")}
        format='DD-MM-YYYY'
      />

      <DateTimePicker
        isVisible={showToday}
        testID='dateTimePicker'
        value={todayDate}
        mode={mode}
        display='default'
        onConfirm={onTodayDate}
        onCancel={() => CancelPicker("today")}
        format='DD-MM-YYYY'
      />
      {signature.bool ? (
        <SignatureComponent
          returnImage={(uri) => {
            if (signature.agent.bool) {
              setSignature({ ...signature, agent: { ...signature.agent, bool: false, uri: uri }, bool: false });
              setAgentSignature(uri);
            } else {
              setSignature({ ...signature, normal: { ...signature.normal, bool: false, uri: uri }, bool: false });
              setSupervisorSignature(uri);
            }
          }}
        />
      ) : (
        <>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>MAKE READY SHEET</Text>
          </View>
          <ScrollView style={{ height: "100%" }}>
            <View style={styles.formConatiner}>
              <View style={styles.inputFieldContainer}>
                <TextInput value={clientName} onChangeText={(e) => setClientName(e)} style={styles.inputField} placeholder={"Client"} />
              </View>
              <View style={styles.inputFieldContainer}>
                <TextInput value={projectName} onChangeText={(e) => setProjectName(e)} style={styles.inputField} placeholder={"Project"} />
              </View>
              <View style={styles.inputFieldContainer}>
                <TextInput value={block} onChangeText={(e) => setBlock(e)} style={styles.inputField} placeholder={"Block"} />
              </View>
              <View style={styles.inputFieldContainer}>
                <TextInput value={sheetNo} onChangeText={(e) => setSheetNo(e)} style={styles.inputField} placeholder={"Sheet Number"} />
              </View>
              <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ width: "40%" }}>
                  <TextInput value={pageOff} onChangeText={(e) => setPageOff(e)} style={styles.inputField} placeholder={"Page"} />
                </View>
                <Text style={{ color: "#4F4F4F", fontSize: 12, fontFamily: "poppins-semiBold" }}>Off</Text>
                <View style={{ width: "40%" }}>
                  <TextInput value={pageSecond} onChangeText={(e) => setPageSecond(e)} style={styles.inputField} placeholder={"Page"} />
                </View>
              </View>
              <View style={styles.inputFieldContainer}>
                <TextInput value={plotNumber} onChangeText={(e) => setPlotNumber(e)} style={styles.inputField} placeholder={"Plot/Area Number"} />
              </View>
              <View style={styles.inputFieldContainer}>
                <TextInput value={reason} onChangeText={(e) => setReason(e)} style={styles.inputField} placeholder={"Reason"} />
              </View>
              <View style={styles.inputFieldContainer}>
                <Text onPress={() => showDatepicker("Date")} style={styles.inputField}>
                  {new Date(dateWritten).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.inputFieldContainer}>
                <Text onPress={() => showDatepicker("DateIssue")} style={styles.inputField}>
                  {new Date(dateIssue).toLocaleDateString()}
                </Text>
              </View>
            </View>
            <View style={styles.tableViewContainer}>
              <View style={styles.tableHeader}>
                <View style={styles.headerTitleView}>
                  <Text style={styles.headerTitle}>AREA/UNITS</Text>
                </View>
                <View style={styles.headerTitleView}>
                  <Text style={styles.headerTitle}>DESCRIPTION</Text>
                </View>
                <View style={styles.headerTitleView}>
                  <Text style={styles.headerTitle}>Number of Photos</Text>
                </View>
                <View style={styles.headerTitleView}>
                  <Text style={styles.headerTitle}>Contractor Corrected Yes/No</Text>
                </View>
                <View style={styles.headerTitleView}>
                  <Text style={styles.headerTitle}>Top Dec Completed Yes/No</Text>
                </View>
                <View style={styles.headerTitleView}>
                  <Text style={styles.headerTitle}>Action </Text>
                </View>
              </View>
              <View style={{ flexDirection: "column" }}>
                {dynamicInput.length > 0 &&
                  dynamicInput.map((el, index) => (
                    <View style={styles.tableBody} key={index}>
                      <View style={styles.inputBodyContainer}>
                        <TextInput
                          onChangeText={(txt) => updateValue("area", index, txt)}
                          value={el.area}
                          style={styles.bodyTextInput}
                          placeholder={"Area/unit"}
                        />
                      </View>
                      <View style={styles.inputBodyContainer}>
                        <TextInput
                          onChangeText={(txt) => updateValue("description", index, txt)}
                          value={el.description}
                          style={styles.bodyTextInput}
                          placeholder={"Description"}
                        />
                      </View>
                      <View style={styles.inputBodyContainer}>
                        <TextInput
                          onChangeText={(txt) => updateValue("photos", index, txt)}
                          value={el.photos}
                          style={styles.bodyTextInput}
                          placeholder={"No of Photos"}
                        />
                      </View>
                      <View style={styles.inputBodyContainer}>
                        <TextInput
                          onChangeText={(txt) => updateValue("corrected", index, txt)}
                          value={el.corrected}
                          style={styles.bodyTextInput}
                          placeholder={"Corrected"}
                        />
                      </View>
                      <View style={styles.inputBodyContainer}>
                        <TextInput
                          onChangeText={(txt) => updateValue("completed", index, txt)}
                          value={el.completed}
                          style={styles.bodyTextInput}
                          placeholder={"Completed"}
                        />
                      </View>
                    </View>
                  ))}
              </View>
              <View style={styles.tableBody}>
                <View style={styles.inputBodyContainer}>
                  <TextInput onChangeText={(txt) => setData({ ...data, area: txt })} style={styles.bodyTextInput} placeholder={"Area/unit"} value={data.area} />
                </View>
                <View style={styles.inputBodyContainer}>
                  <TextInput
                    onChangeText={(txt) => setData({ ...data, description: txt })}
                    value={data.description}
                    style={styles.bodyTextInput}
                    placeholder={"Description"}
                  />
                </View>
                <View style={styles.inputBodyContainer}>
                  <TextInput
                    onChangeText={(txt) => setData({ ...data, photos: txt })}
                    value={data.photos}
                    style={styles.bodyTextInput}
                    placeholder={"No of Photos"}
                  />
                </View>
                <View style={styles.inputBodyContainer}>
                  <TextInput
                    onChangeText={(txt) => setData({ ...data, corrected: txt })}
                    value={data.corrected}
                    style={styles.bodyTextInput}
                    placeholder={"Corrected"}
                  />
                </View>
                <View style={styles.inputBodyContainer}>
                  <TextInput
                    onChangeText={(txt) => setData({ ...data, completed: txt })}
                    value={data.completed}
                    style={styles.bodyTextInput}
                    placeholder={"Completed"}
                  />
                </View>
                <View style={styles.inputBodyContainer}>
                  <TouchableOpacity style={styles.addBtn} onPress={() => addRow()}>
                    <Image style={styles.plusBtn} source={plus} />
                  </TouchableOpacity>
                </View>
              </View>
              <Text
                style={{
                  paddingTop: 20,
                  paddingBottom: 20,
                  color: "#96A8B2",
                  fontSize: 12,
                }}>
                I can confirm that I have checked these areas / units and they are not ready for decoration (see description above)
              </Text>
              <View style={styles.inputFieldContainer}>
                <TextInput value={supervisorName} onChangeText={(e) => setSupervisorName(e)} style={styles.inputField} placeholder={"Supervisor"} />
              </View>
              <TouchableOpacity
                onPress={() =>
                  setSignature({ ...signature, bool: true, normal: { ...signature.normal, bool: true }, agent: { ...signature.agent, bool: false } })
                }
                style={styles.inputFieldContainer}>
                {/* <TextInput style={styles.inputField} placeholder={"Signature"} editable={false} /> */}
                {signature.normal.uri ?
                <Image style={{ marginTop:10, height: 100, width: 100, backgroundColor: "gray" }} source={{ uri: signature.normal.uri }} />
                :<Text style={{height: 52,
                  width: "100%",
                  borderBottomWidth: 1,
                  borderBottomColor: "#96A8B2",
                  padding: 5,
                  fontSize: 12,
                  color: "#96A8B2",
                  fontFamily: "poppins-regular",paddingTop:15}}>Supervisor Signature</Text>
                }
              </TouchableOpacity>
              <View style={styles.inputFieldContainer}>
                <Text onPress={() => showDatepicker("CompleteDate")} style={styles.inputField}>
                  {new Date(dateComplete).toLocaleDateString()}
                </Text>
              </View>
              <Text
                style={{
                  paddingTop: 20,
                  paddingBottom: 20,
                  color: "#96A8B2",
                  fontSize: 12,
                }}>
                I can confirm that correction have been made to all the above areas and now ready for you to commence decoration.{" "}
              </Text>
              <View style={styles.inputFieldContainer}>
                <TextInput value={agentName} onChangeText={(e) => setAgentName(e)} style={styles.inputField} placeholder={"Site Agent (Print name)"} />
              </View>
              <TouchableOpacity
                onPress={() =>
                  setSignature({ ...signature, bool: true, normal: { ...signature.normal, bool: false }, agent: { ...signature.agent, bool: true } })
                }
                style={styles.inputFieldContainer}>
                  {signature.agent.uri ?
                <Image style={{ marginTop:10,height: 100, width: 100, backgroundColor: "gray" }} source={{ uri: signature.agent.uri }} />
                :<Text style={{height: 52,
                  width: "100%",
                  borderBottomWidth: 1,
                  borderBottomColor: "#96A8B2",
                  padding: 5,
                  fontSize: 12,
                  color: "#96A8B2",
                  fontFamily: "poppins-regular",paddingTop:15}}>Agent Signature</Text>
                }
              </TouchableOpacity>
              <View style={styles.inputFieldContainer}>
                <Text onPress={() => showDatepicker("TodayDate")} style={styles.inputField}>
                  {new Date(todayDate).toLocaleDateString()}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "#000",
                  width: "100%",
                  height: ".5%",
                  marginBottom: 20,
                  marginTop: 20,
                }}></View>
              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.commonBtn} onPress={() => makeReadyFormInsert()}>
                  <Text style={styles.commonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
  isMakeReady: state.auth.isMakeReady,
  isSuccessMsg: state.auth.isSuccessMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
  createMakeReadyHandler: (
    clientName,
    projectName,
    block,
    sheetNo,
    pageOff,
    pageSecond,
    plotNumber,
    reason,
    dateWritten,
    dateIssue,
    dynamicInput,
    supervisorName,
    supervisorSignature,
    dateComplete,
    agentName,
    agentSignature,
    todayDate,
    jobID,
    tabId,
    token,
    index
  ) =>
    dispatch(
      insertMakeReadyForm(
        clientName,
        projectName,
        block,
        sheetNo,
        pageOff,
        pageSecond,
        plotNumber,
        reason,
        dateWritten,
        dateIssue,
        dynamicInput,
        supervisorName,
        supervisorSignature,
        dateComplete,
        agentName,
        agentSignature,
        todayDate,
        jobID,
        tabId,
        token,
        index
      )
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(MakeReady);

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
  },
  titleContainer: {
    height: "5%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  titleText: {
    color: "#4F4F4F",
    fontSize: 18,
    fontFamily: "poppins-semiBold",
  },
  formConatiner: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 30,
  },
  inputFieldContainer: {
    width: "100%",
  },
  inputField: {
    height: 52,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#96A8B2",
    padding: 5,
    fontSize: 12,
    color: "#96A8B2",
    fontFamily: "poppins-regular",
  },
  inputContainer: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  tableHeader: {
    flexDirection: "row",
    width: "100%",
    marginTop: 30,
    borderWidth: 1,
  },
  headerTitleView: {
    width: "16.6%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 8,
    textAlign: "center",
    fontFamily: "poppins-bold",
  },
  inputBodyContainer: {
    width: "16.6%",
    justifyContent: "center",
    alignItems: "center",
  },
  bodyTextInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#96A8B2",
    padding: 5,
    fontSize: 12,
    color: "#96A8B2",
    marginLeft: 2,
    marginRight: 2,
    fontFamily: "poppins-regular",
  },
  tableBody: {
    width: "100%",
    flexDirection: "row",
  },
  plusBtn: {
    width: 12,
    height: 12,
    justifyContent: "center",
  },
  addBtn: {
    justifyContent: "center",
    backgroundColor: "#F6F9FB",
    borderWidth: 1,
    borderColor: "#E2ECF2",
    padding: 5,
    borderRadius: 14,
  },
  tableViewContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  btnContainer: {
    width: "100%",
    height: "15%",
    marginBottom: 20,
  },
  commonBtn: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 3,
    borderColor: "#1073AC",
  },
  commonText: {
    color: "#1073AC",
    fontSize: 18,
    fontFamily: "poppins-semiBold",
  },
});
