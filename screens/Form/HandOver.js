import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, CheckBox, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { Text } from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";
import { insertHandOverForm } from "../../Redux/action/auth/authActionTypes";
import { connect } from "react-redux";
import SignatureComponent from "../../components/SignatureComponent";

var plus = require("../../assets/authScreen/plus.png");
const HandOverForm = (props) => {
  const { navigation, token, isHandOver, isSuccessMsg, isJobId } = props;
  const { plot_Id } = props.route.params;
  const jobID = plot_Id;
  const tabId = props.route.params.tabName;
  const [dynamicInput, setdynamicInput] = useState([{ area: "", description: "", completed: "", comments: "" }]);
  const [date, setDate] = useState(new Date());
  const [dateIssue, setDateIssue] = useState(new Date());
  const [dateComplete, setDateComplete] = useState(new Date());
  const [todayDate, setTodayDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [showIssue, setShowIssue] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [showToday, setShowToday] = useState(false);
  const [contructorName, setContructorName] = useState("");
  const [project, setProject] = useState("");
  const [block, setBlock] = useState("");
  const [reason, setReason] = useState("");
  const [plotNumber, setPlotNumber] = useState("");
  const [supervisorName, setSupervisorName] = useState("");
  const [supervisorSignature, setSupervisorSignature] = useState("");
  const [agentName, setAgentName] = useState("");
  const [agentSignature, setAgentSignature] = useState("");

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

  const [data, setData] = useState({
    area: "",
    description: "",
    completed: "",
    comments: "",
  });
  /* Add Dynamic Input value & Add New Row*/
  const addRow = () => {
    setdynamicInput((oldArray) => [...oldArray, { area: "", description: "", completed: "", comments: "" }]);

  };
  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(new Date(currentDate).toLocaleDateString());
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
  /* Update Dynamic Input value & Set To another Array*/
  const updateValue = (key, index, value) => {
    let preData = [...dynamicInput];
    preData[index][key] = value;
    setdynamicInput(preData);
  };
  const handOverFormInsert = async () => {
    //console.log("HandOver Token :", jobID);
    try{
    if (contructorName != "" && project != "" && block != "" && reason != "" && plotNumber != "" && supervisorName != "" && dynamicInput && agentName != "") {
      await props.createHandOverHandler(
        contructorName,
        project,
        block,
        reason,
        plotNumber,
        date,
        dateIssue,
        supervisorName,
        supervisorSignature,
        dateComplete,
        dynamicInput,
        agentName,
        agentSignature,
        todayDate,
        jobID,
        tabId,
        token,
        props.route?.params?.index
      );
      alert("Hand Over Form Insert SuccessFully !");
      navigation.goBack();
    } else {
      alert("Please Insert All Fields CareFully !");
      return false;
    }
    } catch(err){
      alert(err.message)
    }
  };
  return (
    <View style={styles.mainContainer}>
      <DateTimePicker
        isVisible={show}
        testID='dateTimePicker'
        value={date}
        mode={mode}
        display='default'
        onCancel={() => {}}
        onConfirm={onChange}
        format='DD-MM-YYYY'
      />
      <DateTimePicker
        isVisible={showIssue}
        testID='dateTimePicker'
        value={dateIssue}
        mode={mode}
        display='default'
        onCancel={() => {}}
        onConfirm={onIssueChange}
        format='DD-MM-YYYY'
      />

      <DateTimePicker
        isVisible={showComplete}
        testID='dateTimePicker'
        value={dateComplete}
        mode={mode}
        display='default'
        onCancel={() => {}}
        onConfirm={onCompleteChange}
        format='DD-MM-YYYY'
      />
      <DateTimePicker
        isVisible={showToday}
        testID='dateTimePicker'
        value={todayDate}
        mode={mode}
        display='default'
        onCancel={() => {}}
        onConfirm={onTodayDate}
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
            <Text style={styles.titleText}>HAND OVER SHEET</Text>
          </View>
          <ScrollView style={{ height: "100%" }}>
            <View style={styles.formConatiner}>
              <View style={styles.inputFieldContainer}>
                <TextInput value={contructorName} onChangeText={(e) => setContructorName(e)} style={styles.inputField} placeholder={"Main Contractor Name"} />
              </View>
              <View style={styles.inputFieldContainer}>
                <TextInput value={project} onChangeText={(e) => setProject(e)} style={styles.inputField} placeholder={"Project"} />
              </View>
              <View style={styles.inputFieldContainer}>
                <TextInput value={block} onChangeText={(e) => setBlock(e)} style={styles.inputField} placeholder={"Block"} />
              </View>
              <View style={styles.inputFieldContainer}>
                <TextInput value={reason} onChangeText={(e) => setReason(e)} style={styles.inputField} placeholder={"Reason"} />
              </View>
              <View style={styles.inputFieldContainer}>
                <TextInput value={plotNumber} onChangeText={(e) => setPlotNumber(e)} style={styles.inputField} placeholder={"Plot/Area Number"} />
              </View>
              <View style={styles.inputFieldContainer}>
                <Text onPress={() => showDatepicker("Date")} style={styles.inputField}>
                  {new Date(date).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.inputFieldContainer}>
                <Text onPress={() => showDatepicker("DateIssue")} style={styles.inputField}>
                  {new Date(dateIssue).toLocaleDateString()}
                </Text>
              </View>
              <Text
                style={{
                  paddingTop: 20,
                  paddingBottom: 20,
                  color: "#96A8B2",
                  fontSize: 12,
                }}>
                The decoration to the following Areas/Units have been completed and are now ready for your inspection.{" "}
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
                  <Image style={{ marginTop:10,height: 100, width: 100, backgroundColor: "gray" }} source={{ uri: signature.normal.uri }} />
                :
                <Text style={{height: 52,
                  width: "100%",
                  borderBottomWidth: 1,
                  borderBottomColor: "#96A8B2",
                  padding: 5,
                  fontSize: 12,
                  color: "#96A8B2",
                  fontFamily: "poppins-regular",paddingTop:15}}>Supervisor Signature</Text>}
                
              </TouchableOpacity>
              <View style={styles.inputFieldContainer}>
                <Text onPress={() => showDatepicker("CompleteDate")} style={styles.inputField}>
                  {new Date(dateComplete).toLocaleDateString()}
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
                  <Text style={styles.headerTitle}>COMPLETED YES/NO </Text>
                </View>
                <View style={styles.headerTitleView}>
                  <Text style={styles.headerTitle}>Contractors COMMENTS </Text>
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
                          value={el.area}
                          onChangeText={(txt) => updateValue("area", index, txt)}
                          style={styles.bodyTextInput}
                          placeholder={"Area/unit"}
                        />
                      </View>
                      <View style={styles.inputBodyContainer}>
                        <TextInput
                          value={el.description}
                          onChangeText={(txt) => updateValue("description", index, txt)}
                          style={styles.bodyTextInput}
                          placeholder={"Description"}
                        />
                      </View>
                      <View style={styles.inputBodyContainer}>
                        <TextInput
                          value={el.completed}
                          onChangeText={(txt) => updateValue("completed", index, txt)}
                          style={styles.bodyTextInput}
                          placeholder={"Yes / No"}
                        />
                      </View>
                      <View style={styles.inputBodyContainer}>
                        <TextInput
                          value={el.comments}
                          onChangeText={(txt) => updateValue("comments", index, txt)}
                          style={styles.bodyTextInput}
                          placeholder={"Comments"}
                        />
                      </View>
                      <View style={styles.inputBodyContainer}>
                        <TouchableOpacity style={styles.addBtn} onPress={() => {
                          if(dynamicInput.length>0 && !dynamicInput[dynamicInput.length-1].area && !dynamicInput[dynamicInput.length-1].description && !dynamicInput[dynamicInput.length-1].completed && !dynamicInput[dynamicInput.length-1].comments){
                            alert("Please Enter All Value and then move to next Item Add !")
                          }
                          else {
                            addRow()
                          }
                        }}>
                          <Image style={styles.plusBtn} source={plus} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
              </View>
              <Text
                style={{
                  paddingTop: 20,
                  paddingBottom: 20,
                  color: "#96A8B2",
                  fontSize: 12,
                }}>
                I can confirm by signing this form that I have inspect the above Areas/Units and they are completed.{" "}
              </Text>
              <View style={styles.inputFieldContainer}>
                <TextInput value={agentName} onChangeText={(e) => setAgentName(e)} style={styles.inputField} placeholder={"Site Agent (Print name)"} />
              </View>
              <TouchableOpacity
                onPress={() =>
                  setSignature({ ...signature, bool: true, normal: { ...signature.normal, bool: false }, agent: { ...signature.agent, bool: true } })
                }
                style={styles.inputFieldContainer}>
                {/* <TextInput style={styles.inputField} placeholder={"Signature"} editable={false} /> */}
                {signature.agent.uri ?
                <Image style={{ marginTop:10,height: 100, width: 100, backgroundColor: "gray" }} source={{ uri: signature.agent.uri }} />
               : <Text style={{height: 52,
                  width: "100%",
                  borderBottomWidth: 1,
                  borderBottomColor: "#96A8B2",
                  padding: 5,
                  fontSize: 12,
                  color: "#96A8B2",
                  fontFamily: "poppins-regular",paddingTop:15}}>Agent Signature</Text>}
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
                <TouchableOpacity style={styles.commonBtn} onPress={() => handOverFormInsert()}>
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
  isHandOver: state.auth.isHandOver,
  isSuccessMsg: state.auth.isSuccessMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
  createHandOverHandler: (
    contructorName,
    project,
    block,
    reason,
    plotNumber,
    date,
    dateIssue,
    supervisorName,
    supervisorSignature,
    dateComplete,
    dynamicInput,
    agentName,
    agentSignature,
    todayDate,
    tabId,
    jobID,
    token,
    index
  ) =>
    dispatch(
      insertHandOverForm(
        contructorName,
        project,
        block,
        reason,
        plotNumber,
        date,
        dateIssue,
        supervisorName,
        supervisorSignature,
        dateComplete,
        dynamicInput,
        agentName,
        agentSignature,
        todayDate,
        tabId,
        jobID,
        token,
        index
      )
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(HandOverForm);
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
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 8,
    textAlign: "center",
    fontFamily: "poppins-bold",
  },
  inputBodyContainer: {
    width: "20%",
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
