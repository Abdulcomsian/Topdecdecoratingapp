import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  CheckBox,
  TextInput,
  ScrollView,
} from "react-native";
import { Text } from "native-base";
import styles from "../../../assets/css/styles";
import DateTimePicker from "react-native-modal-datetime-picker";
import SignatureComponent from "../../../components/SignatureComponent";
import { insertAccidentForm } from "../../../Redux/action/auth/authActionTypes";
import { connect } from "react-redux";
import { updateHealthReport } from "../../../Redux/action/summary/Summary";
import { TabRouter } from "react-navigation";
import * as ImagePicker from "expo-image-picker";
import { AssetsSelector } from "expo-images-picker";

var mainImage = require("../../../assets/authScreen/logo.jpeg");
var plus = require("../../../assets/authScreen/plus.png");
const AccidentReport = (props) => {
  const { navigation, token, isSuccess, isSuccessMsg, isJobId } = props;
  // const jobID = Math.floor(Math.random() * 100) + 1;
  const { plot_Id } = props.route.params;
  const jobID = plot_Id;
  console.log("Work Plot ID :", jobID);
  const tabId = props.route.params.tabName;
  console.log("Work Tab ID :", tabId);
  const [nameOfPerson, setNameOfPerson] = useState("");
  const [locationOfIncident, setLocationOfIncident] = useState("");
  const [nameOfInjuredPerson, setNameOfInjuredPerson] = useState("");
  const [ageOfInjuredPerson, setAgeOfInjuredPerson] = useState("");
  const [sexOfInjuredPerson, setSexOfInjuredPerson] = useState("");
  const [stateOfInjuredPerson, setStateOfInjuredPerson] = useState("");
  const [telephonNumber, setTelephoneNumber] = useState("");
  const [occupationInjured, setOccupationInjured] = useState("");
  const [natureOfInjury, setNatureOfInjury] = useState("");
  const [witnessStatement, setWitnessStatement] = useState("");
  const [whomAccidentReported, setwhomAccidentReported] = useState("");
  const [whenAccidentReported, setwhenAccidentReported] = useState("");
  const [supervisorName, setSupervisorName] = useState("");
  const [signature, setSignature] = useState({
    bool: false,
    supervisor: {
      bool: false,
      uri: "",
    },
    manager: {
      bool: false,
      uri: "",
    },
    index: -1,
  });
  const [mangementWhomAccidentReported, setMangementWhomAccidentReported] =
    useState("");
  const [managerInitialNotes, setManagerInitialNotes] = useState("");
  const [actionRequried, setActionRequried] = useState("");
  const [actionPerformed, setActionPerformed] = useState("");
  const [managerName, setManagerName] = useState("");
  const [managerSignature, setManagerSignature] = useState("");
  const [injuredPersonStatement, setInjuredPersonStatement] = useState("");
  const [supervisorSignature, setSupervisorSignature] = useState("");
  const [callingDetails, setCallingDetails] = useState([
    {
      title: "Was an ambulance called?",
      yes: false,
      no: false,
      incidentNo: "",
    },
    {
      title: "Where the police called?",
      yes: false,
      no: false,
      incidentNo: "",
    },
    {
      title: "Was Medical treatment sought?",
      yes: false,
      no: false,
      incidentNo: "",
    },
    {
      title: "Was Trauma counselling offered?",
      yes: false,
      no: false,
      incidentNo: "",
    },
  ]);
  const [dateIncident, setDateIncident] = useState("");
  const [timeIncident, setTimeIncident] = useState("");
  const [dateInvestigation, setDateInvestigation] = useState("");
  const [timeInvestigation, setTimeInvestigation] = useState("");
  const [dateSupervisor, setDateSupervisor] = useState("");
  const [dateReport, setDateReport] = useState("");
  const [timeReport, setTimeReport] = useState("");
  const [dateManager, setDateManager] = useState("");
  const [mode, setMode] = useState("date");
  const [showIncident, setShowIncident] = useState(false);
  const [showInvestigation, setShowInvestigation] = useState(false);
  const [showSupervisor, setShowSupervisor] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showManager, setShowManager] = useState(false);
  const [dynamicInput, setdynamicInput] = useState([]);
  const [incidentArray, setIncidentarray] = useState([
    { title: "Fatality", check: false },
    { title: "Under ‘7’day injury", check: false },
    { title: "No time lost", check: false },
    { title: "Major Injury", check: false },
    { title: "In hospital more than 24hrs", check: false },
    { title: "Member of public/contractor injured ", check: false },
    { title: "Over ‘7’ day injury", check: false },
    { title: "Dangerous Occurrences", check: false },
    { title: "Became unconscious", check: false },
    { title: "Reportable disease", check: false },
    { title: "Damage Incident", check: false },
    { title: "Needed resuscitation", check: false },
  ]);
  const [employee, setEmployee] = useState([
    { title: "Employee", check: false },
    { title: "Self Employed", check: false },
    { title: "Trainee", check: false },
    { title: "Trade Contractor", check: false },
    { title: "Others (please state)", check: false },
  ]);
  const [managmentArray, setManagmentArray] = useState([
    {
      title:
        "Will the injured person be off work for more than 7 calendar days?",
      yes: false,
      no: false,
    },
    {
      title: "Have all possible actions been taken to prevent Re-occurrence?",
      yes: false,
      no: false,
    },
  ]);
  const [data, setData] = useState({
    name: "",
    number: "",
  });
  const addRow = () => {
    setdynamicInput((oldArray) => [...oldArray, data]);
    setData({ name: "", number: "" });
  };
  const updateValue = (key, index, value) => {
    let preData = [...dynamicInput];
    preData[index][key] = value;
    setdynamicInput(preData);
  };
  // const [fatality,setfatality] = useState(false)
  // const [overDaysInjury, setoverDaysInjury] = useState(false)
  // const [timeLost,settimeLost] = useState(false)
  // const [majorInjury, setmajorInjury] = useState(false)
  // const [hospital, sethospital] = useState(false)
  // const [publicInjury, setpublicInjury] = useState(false)
  // const [underDaysInjury, setunderDaysInjury] = useState(false)
  // const [dangerousOccurrences, setdangerousOccurrences] = useState(false)
  // const [becameUnconscious, setbecameUnconscious] = useState(false)
  // const [reportDiesase, setReportDiesase] = useState(false)
  // const [damaghIncident, setdamaghIncident] = useState(false)
  // const [neededResuscitation, setneededResuscitation] = useState(false)
  // const [employee, setEmployee] = useState(false)
  // const [selfEmployee, setselfEmployee] = useState(false)
  // const [trainee, settrainee] = useState(false)
  // const [tradeContructor, settradeContructor] = useState(false)
  // const [otherEmployee, setOtheemployee] = useState(false)
  // const [yesAmbullanceCall, setYes] = useState(false)

  const showMode = (currentMode, type) => {
    if (type == "Date") {
      setShowIncident(true);
      setMode(currentMode);
    } else if (type == "DateInvestigation") {
      setShowInvestigation(true);
      setMode(currentMode);
    } else if (type == "DateSupervisor") {
      setShowSupervisor(true);
      setMode(currentMode);
    } else if (type == "DateReport") {
      setShowReport(true);
      setMode(currentMode);
    } else {
      setShowManager(true);
      setMode(currentMode);
    }
  };
  const showDatepicker = (type) => {
    if (type == "Date") {
      showMode("date", "Date");
    } else if (type == "DateInvestigation") {
      showMode("date", "DateInvestigation");
    } else if (type == "DateSupervisor") {
      showMode("date", "DateSupervisor");
    } else if (type == "DateReport") {
      showMode("date", "DateReport");
    } else {
      showMode("date", "DateManager");
    }
  };
  const onIncidentChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowIncident(false);
    setDateIncident(new Date(currentDate).toLocaleDateString());
    setTimeIncident(new Date(currentDate).toLocaleTimeString())
  };
  const onInvestigationChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowInvestigation(false);
    setDateInvestigation(new Date(currentDate).toLocaleDateString());
    setTimeInvestigation(new Date(currentDate).toLocaleTimeString())
  };
  const onSupervisorDateChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowSupervisor(false);
    setDateSupervisor(new Date(currentDate).toLocaleDateString());
  };
  const onReportDateChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowReport(false);
    setDateReport(new Date(currentDate).toLocaleDateString());
    setTimeReport(new Date(currentDate).toLocaleTimeString());
  };
  const onManagerDateChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowManager(false);
    setDateManager(new Date(currentDate).toLocaleDateString());
  };

  const checkedEmployeeValue = (key, index, value) => {
    let preData = [...employee];
    console.log("Emplopyee Key :", preData[index][key]);
    if (preData[index][key] === false) {
      preData[index][key] = true;
      setEmployee(preData);
    } else {
      preData[index][key] = false;
      setEmployee(preData);
    }
  };
  const checkedAmbulanceValue = (key, index, value) => {
    let preData = [...callingDetails];
    if (key == "yes") {
      preData[index][key] = true;
      preData[index]["no"] = false;
      setCallingDetails(preData);
    } else {
      preData[index][key] = true;
      preData[index]["yes"] = false;
      setCallingDetails(preData);
    }
  };
  const checkedIncidentValue = (key, index, value) => {
    let preData = [...incidentArray];
    if (preData[index][key] === false) {
      preData[index][key] = true;
      setIncidentarray(preData);
    } else {
      preData[index][key] = false;
      setIncidentarray(preData);
    }
  };
  const checkIncidentNo = (key, index, value) => {
    let preData = [...callingDetails];
    preData[index][key] = value;
    setCallingDetails(preData);
  };
  const calendarDayChange = (key, index, value) => {
    let preData = [...managmentArray];
    if (key == "yes") {
      preData[index][key] = true;
      preData[index]["no"] = false;
      setManagmentArray(preData);
    } else {
      preData[index][key] = true;
      preData[index]["yes"] = false;
      setManagmentArray(preData);
    }
  };
  const reOccuranceChange = (type) => {
    if (type == "yes") {
      setReOccurance({ ...reOccurance, yes: true, no: false });
    } else {
      setReOccurance({ ...reOccurance, yes: false, no: true });
    }
  };
  const [projectComment, setProjectComment] = useState("");
  const incidentFormInsert = async () => {
    if (
      nameOfInjuredPerson != "" &&
      dateIncident != "" &&
      locationOfIncident != "" &&
      occupationInjured != "" &&
      incidentArray != "" &&
      ageOfInjuredPerson !== "" &&
      sexOfInjuredPerson !== "" &&
      employee != "" &&
      stateOfInjuredPerson != "" &&
      telephonNumber != "" &&
      natureOfInjury != "" &&
      callingDetails != "" &&
      dynamicInput !== "" &&
      witnessStatement !== "" &&
      whomAccidentReported !== "" &&
      whenAccidentReported !== "" &&
      supervisorName !== "" &&
      supervisorSignature !== "" &&
      dateSupervisor !== "" &&
      mangementWhomAccidentReported !== "" &&
      dateReport !== "" &&
      managerInitialNotes !== "" &&
      actionRequried !== "" &&
      actionPerformed !== "" &&
      managmentArray !== "" &&
      managerName !== "" &&
      managerSignature !== "" &&
      dateManager !== "" &&
      projectImagesComment != "" &&
      commentImages != ""
    ) {
      await props.createAccidentHandler(
        nameOfPerson,
        dateIncident,
        locationOfIncident,
        dateInvestigation,
        occupationInjured,
        incidentArray,
        nameOfInjuredPerson,
        ageOfInjuredPerson,
        sexOfInjuredPerson,
        employee,
        stateOfInjuredPerson,
        telephonNumber,
        natureOfInjury,
        callingDetails,
        dynamicInput,
        witnessStatement,
        whomAccidentReported,
        whenAccidentReported,
        supervisorName,
        supervisorSignature,
        dateSupervisor,
        mangementWhomAccidentReported,
        dateReport,
        managerInitialNotes,
        actionRequried,
        actionPerformed,
        managmentArray,
        managerName,
        managerSignature,
        dateManager,
        projectImagesComment,
        commentImages,
        jobID,
        tabId,
        token,
        props.route.params?.index
      );
      // props.updateHealthReport(props?.route?.params?.index);
      alert("Accident Inccident Report Insert SuccessFully !");
      props.navigation.pop();
    } else {
      alert("Please Insert All Fields CareFully !");
      return false;
    }
  };
  const CancelPicker = (type) => {
    console.log(type);
    if (type == "showIncident") {
      setShowIncident(false);
    } else if (type == "showInvestigation") {
      setShowInvestigation(false);
    } else if (type == "showSupervisor") {
      setShowSupervisor(false);
    } else if (type == "showReport") {
      setShowReport(false);
    } else {
      setShowManager(false);
    }
  };

  // console.log(employee);
  const [projectImages, setProjectImages] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const onDone = (data) => {
    let copydata = [...projectImagesComment];
    copydata[signature.index].image = data[0].uri;
    setProjectImagesComment([...copydata]);
    setSignature({ ...signature, index: -1 });
    setIsShow(false);
  };

  const goBack = () => {
    setIsShow(false);
  };
  const uploadPhotoImage = async (index) => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    setSignature({ ...signature, index: index });
    setIsShow(true);
  };
  // console.log("Pick Project :",projectImages)
  const _textStyle = {
    color: "white",
  };
  const _buttonStyle = {
    backgroundColor: "#1073AC",
    borderRadius: 5,
  };
  const [projectImagesComment, setProjectImagesComment] = useState([]);
  const [commentImages, setCommentImages] = useState([]);
  const addImagesCommentRow = () => {
    setProjectImagesComment((oldArray) => [
      ...oldArray,
      { image: "", comment: "" },
    ]);
  };
  const updateProjectCommentValue = (key, index, value) => {
    let preData = [...projectImagesComment];
    preData[index][key] = value;
    setProjectImagesComment([...preData]);

    let commentData = preData.map((item, index) => {
      return { comment: item.comment };
    });
    setCommentImages(commentData);
  };
  return (
    <View style={styles.mainContainer}>
      {isShow ? (
        <View style={{ flex: 1 }}>
          <AssetsSelector
            options={{
              assetsType: ["photo", "video"],
              maxSelections: 1,
              margin: 2,
              portraitCols: 4,
              landscapeCols: 5,
              widgetWidth: 100,
              widgetBgColor: "white",
              videoIcon: {
                iconName: "ios-videocam",
                color: "tomato",
                size: 20,
              },
              selectedIcon: {
                iconName: "ios-checkmark-circle-outline",
                color: "white",
                bg: "#0eb14970",
                size: 26,
              },
              spinnerColor: "black",
              onError: () => {},
              noAssets: () => (
                <View>
                  <Text></Text>
                </View>
              ),
              defaultTopNavigator: {
                continueText: "Finish",
                goBackText: "Back",
                selectedText: "Selected",
                midTextColor: "tomato",
                buttonStyle: _buttonStyle,
                buttonTextStyle: _textStyle,
                backFunction: goBack,
                doneFunction: (data) => onDone(data),
              },
            }}
          />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <DateTimePicker
            isVisible={showIncident}
            testID="dateTimePicker"
            value={dateIncident}
            mode={Platform.OS === 'ios' ? "datetime" : "datetime"}
            display="default"
            onConfirm={onIncidentChange}
            onCancel={() => CancelPicker("showIncident")}
            format="DD-MM-YYYY"
          />
          <DateTimePicker
            isVisible={showInvestigation}
            testID="dateTimePicker"
            value={dateInvestigation}
            mode={Platform.OS === 'ios' ? "datetime" : "datetime"}
            display="default"
            onConfirm={onInvestigationChange}
            onCancel={() => CancelPicker("showInvestigation")}
            format="DD-MM-YYYY"
          />
          <DateTimePicker
            isVisible={showSupervisor}
            testID="dateTimePicker"
            value={dateSupervisor}
            mode={Platform.OS === 'ios' ? "datetime" : "date"}
            display="default"
            onConfirm={onSupervisorDateChange}
            onCancel={() => CancelPicker("showSupervisor")}
            format="DD-MM-YYYY"
          />
          <DateTimePicker
            isVisible={showReport}
            testID="dateTimePicker"
            value={dateReport}
            mode={Platform.OS === 'ios' ? "datetime" : "datetime"}
            display="default"
            onConfirm={onReportDateChange}
            onCancel={() => CancelPicker("showReport")}
            format="DD-MM-YYYY"
          />
          <DateTimePicker
            isVisible={showManager}
            testID="dateTimePicker"
            value={dateManager}
            mode={Platform.OS === 'ios' ? "datetime" : "date"}
            display="default"
            onConfirm={onManagerDateChange}
            onCancel={() => CancelPicker("showManager")}
            format="DD-MM-YYYY"
          />
          {signature.bool ? (
            <SignatureComponent
              returnImage={(uri) => {
                if (signature.supervisor.bool) {
                  setSignature({
                    ...signature,
                    supervisor: {
                      ...signature.supervisor,
                      bool: false,
                      uri: uri,
                    },
                    bool: false,
                  });
                  setSupervisorSignature(uri);
                } else {
                  setSignature({
                    ...signature,
                    manager: { ...signature.manager, bool: false, uri: uri },
                    bool: false,
                  });
                  setManagerSignature(uri);
                }
              }}
            />
          ) : (
            <>
              <View style={styles.imageView}>
                <Image source={mainImage} style={styles.bannerImage} />
              </View>
              <View
                style={{
                  paddingTop: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.titleText}>
                  Accident/Incident Report Form
                </Text>
              </View>
              <ScrollView>
                <View style={styles.formCodnatiner}>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      style={styles.inputField}
                      placeholder={"Full name of person completing this report"}
                      onChangeText={(e) => setNameOfPerson(e)}
                      value={nameOfPerson}
                    />
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TouchableOpacity onPress={() => showDatepicker("Date")}>
                      <TextInput
                        editable={false}
                        value={
                          dateIncident
                            ? dateIncident  + " " + timeIncident
                            : ""
                        }
                        style={styles.inputField}
                        placeholder={"Date and Time of Incident"}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      style={styles.inputField}
                      placeholder={"Location of Incident"}
                      onChangeText={(e) => setLocationOfIncident(e)}
                      value={locationOfIncident}
                    />
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TouchableOpacity
                      onPress={() => showDatepicker("DateInvestigation")}
                    >
                      <TextInput
                        editable={false}
                        value={
                          dateInvestigation
                            ? dateInvestigation + " " + timeInvestigation
                            : ""
                        }
                        style={styles.inputField}
                        placeholder={"Date and Time Investigation commenced"}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{ paddingTop: 20, paddingBottom: 20 }}>
                    <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                      TYPE OF INCIDENT{" "}
                      <Text
                        style={{ fontFamily: "poppins-regular", fontSize: 10 }}
                      >
                        (please tick relevant boxes)
                      </Text>
                    </Text>
                  </View>
                  <View style={styles.checkBoxDiv}>
                    <View
                      style={[
                        styles.firstCheckBoxRow,
                        { flexDirection: "column" },
                      ]}
                    >
                      {incidentArray.map((item, index) => (
                        <View style={styles.parentCheckBox}>
                          <View style={styles.leftCheckBox}>
                            <CheckBox
                              value={item.check}
                              onValueChange={() =>
                                checkedIncidentValue("check", index, true)
                              }
                            />
                          </View>
                          <View style={styles.rightCheckBox}>
                            <Text style={styles.accidentText}>
                              {item.title}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                  <View style={{ paddingTop: 20, paddingBottom: 10 }}>
                    <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                      THE INJURED PERSON
                    </Text>
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      style={styles.inputField}
                      placeholder={"Name of Injured Person"}
                      onChangeText={(e) => setNameOfInjuredPerson(e)}
                      value={nameOfInjuredPerson}
                    />
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      onChangeText={(e) =>
                        setAgeOfInjuredPerson(e.replace(/[^0-9]/g, ""))
                      }
                      value={ageOfInjuredPerson}
                      style={styles.inputField}
                      placeholder={"Age"}
                    />
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      onChangeText={(e) => setSexOfInjuredPerson(e)}
                      value={sexOfInjuredPerson}
                      style={styles.inputField}
                      placeholder={"Sex"}
                    />
                  </View>
                  <View style={styles.checkBoxDiv}>
                    <View
                      style={[
                        styles.firstCheckBoxRow,
                        { flexDirection: "column" },
                      ]}
                    >
                      {employee.map((item, index) => (
                        <View style={styles.parentCheckBox}>
                          <View style={styles.leftCheckBox}>
                            <CheckBox
                              value={item.check}
                              onValueChange={() =>
                                checkedEmployeeValue("check", index, true)
                              }
                            />
                          </View>
                          <View style={styles.rightCheckBox}>
                            <Text style={styles.accidentText}>
                              {item.title}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      style={styles.inputField}
                      placeholder={"(Please State) Injured Person Name"}
                      onChangeText={(e) => setStateOfInjuredPerson(e)}
                      value={stateOfInjuredPerson}
                    />
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      style={styles.inputField}
                      placeholder={"Telephone Number"}
                      onChangeText={(e) =>
                        setTelephoneNumber(e.replace(/[^0-9]/g, ""))
                      }
                      value={telephonNumber}
                    />
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      style={styles.inputField}
                      placeholder={"Occupation when Injured"}
                      onChangeText={(e) => setOccupationInjured(e)}
                      value={occupationInjured}
                    />
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      style={styles.inputField}
                      placeholder={
                        "Nature of Injury or condition, And the part of the body affected"
                      }
                      onChangeText={(e) => setNatureOfInjury(e)}
                      value={natureOfInjury}
                    />
                  </View>
                  <View style={styles.callingDetailsView}>
                    <View style={{ flexDirection: "column" }}>
                      {callingDetails.map((item, index) => (
                        <View style={styles.detailsContactView} key={index}>
                          <View style={styles.instructionView}>
                            <Text
                              style={{
                                fontFamily: "poppins-bold",
                                fontSize: 10,
                              }}
                            >
                              {item.title}
                            </Text>
                          </View>
                          <View style={styles.checkBoxView}>
                            <View style={styles.firstCheckBoxRow}>
                              <View style={styles.parentCheckBox}>
                                <View style={styles.leftCheckBox}>
                                  <CheckBox
                                    value={item.no}
                                    onValueChange={() =>
                                      checkedAmbulanceValue("no", index, "true")
                                    }
                                  />
                                </View>
                                <View style={styles.rightCheckBox}>
                                  <Text style={styles.accidentText}>No</Text>
                                </View>
                              </View>
                              <View style={styles.parentCheckBox}>
                                <View style={styles.leftCheckBox}>
                                  <CheckBox
                                    value={item.yes}
                                    onValueChange={() =>
                                      checkedAmbulanceValue(
                                        "yes",
                                        index,
                                        "true"
                                      )
                                    }
                                  />
                                </View>
                                <View style={styles.rightCheckBox}>
                                  <Text style={styles.accidentText}>Yes</Text>
                                </View>
                              </View>
                            </View>
                          </View>
                          <View style={styles.numberView}>
                            <View style={styles.inputFieldContainer}>
                              <TextInput
                                style={styles.inputField}
                                placeholder={"Incident No"}
                                onChangeText={(txt) =>
                                  checkIncidentNo(
                                    "incidentNo",
                                    index,
                                    txt.replace(/[^0-9]/g, "")
                                  )
                                }
                              />
                            </View>
                          </View>
                        </View>
                      ))}
                    </View>
                    <View style={styles.inputFieldContainer}>
                      <TextInput
                        multiline={true}
                        numberOfLines={4}
                        style={styles.inputField}
                        placeholder={"INJURED PERSON STATEMENT"}
                        onChangeText={(e) => setInjuredPersonStatement(e)}
                        value={injuredPersonStatement}
                      />
                    </View>
                    <View style={styles.witnessStatementView}>
                      <Text
                        style={{
                          fontFamily: "poppins-bold",
                          fontSize: 12,
                          paddingTop: 10,
                        }}
                      >
                        Witness’s names and contact number (attach witness
                        statements if available)
                      </Text>
                      <View
                        style={{
                          justifyContent: "flex-end",
                          width: "100%",
                          alignItems: "flex-end",
                          marginBottom: 10,
                        }}
                      ></View>
                      <View style={styles.tableViewContainer}>
                        <View style={styles.tableHeader}>
                          <View style={styles.headerWitnessTitleView}>
                            <Text style={styles.headerWitnessTitle}>NAME</Text>
                          </View>
                          <View style={styles.headerWitnessTitleView}>
                            <Text style={styles.headerWitnessTitle}>
                              NUMBER
                            </Text>
                          </View>
                        </View>
                        <View style={{ flexDirection: "column" }}>
                          {dynamicInput.length > 0 &&
                            dynamicInput.map((el, index) => (
                              <View style={styles.tableBody} key={index}>
                                <View style={styles.inputWitnessBodyContainer}>
                                  <TextInput
                                    value={el.name}
                                    onChangeText={(txt) =>
                                      updateValue("name", index, txt)
                                    }
                                    style={styles.bodyTextInput}
                                    placeholder={"Name"}
                                  />
                                </View>
                                <View style={styles.inputWitnessBodyContainer}>
                                  <TextInput
                                    value={el.number}
                                    onChangeText={(txt) =>
                                      updateValue(
                                        "number",
                                        index,
                                        txt.replace(/[^0-9]/g, "")
                                      )
                                    }
                                    style={styles.bodyTextInput}
                                    placeholder={"Number"}
                                  />
                                </View>
                              </View>
                            ))}
                          <View
                            style={{
                              width: "100%",
                              justifyContent: "flex-end",
                              alignItems: "flex-end",
                              marginTop: 20,
                            }}
                          >
                            <TouchableOpacity
                              style={[styles.addBtn, { marginRight: 20 }]}
                              onPress={() => {
                                if (
                                  dynamicInput.length > 0 &&
                                  !dynamicInput[dynamicInput.length - 1].name &&
                                  !dynamicInput[dynamicInput.length - 1].number
                                ) {
                                  alert(
                                    "Please Enter All Value and then move to next Item Add !"
                                  );
                                } else {
                                  addRow();
                                }
                              }}
                            >
                              <Image style={styles.plusBtn} source={plus} />
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View style={styles.inputFieldContainer}>
                          <TextInput
                            multiline={true}
                            numberOfLines={4}
                            style={styles.inputField}
                            placeholder={"WITNESS STATEMENT"}
                            onChangeText={(e) => setWitnessStatement(e)}
                            value={witnessStatement}
                          />
                        </View>
                        <View style={styles.inputFieldContainer}>
                          <TextInput
                            multiline={true}
                            numberOfLines={4}
                            style={styles.inputField}
                            placeholder={"To whom was the accident reported?"}
                            onChangeText={(e) => setwhomAccidentReported(e)}
                            value={whomAccidentReported}
                          />
                        </View>
                        <View style={styles.inputFieldContainer}>
                          <TextInput
                            multiline={true}
                            numberOfLines={4}
                            style={styles.inputField}
                            placeholder={"When was the accident reported?"}
                            onChangeText={(e) => setwhenAccidentReported(e)}
                            value={whenAccidentReported}
                          />
                        </View>
                        <View style={styles.inputFieldContainer}>
                          <TextInput
                            multiline={true}
                            numberOfLines={4}
                            style={styles.inputField}
                            placeholder={"Supervisor Name"}
                            onChangeText={(e) => setSupervisorName(e)}
                            value={supervisorName}
                          />
                        </View>
                        <View style={styles.inputFieldContainer}>
                          <TouchableOpacity
                            onPress={() =>
                              setSignature({
                                ...signature,
                                bool: true,
                                supervisor: {
                                  ...signature.supervisor,
                                  bool: true,
                                },
                                manager: { ...signature.manager, bool: false },
                              })
                            }
                            style={styles.inputFieldContainer}
                          >
                            {/* <TextInput style={styles.inputField} placeholder={"Signature"} editable={false} /> */}
                            {signature.supervisor.uri ? (
                              <Image
                                style={{
                                  marginTop: 10,
                                  height: 100,
                                  width: 100,
                                  backgroundColor: "gray",
                                }}
                                source={{ uri: signature.supervisor.uri }}
                              />
                            ) : (
                              <Text
                                style={{
                                  height: 52,
                                  width: "100%",
                                  borderBottomWidth: 1,
                                  borderBottomColor: "#96A8B2",
                                  padding: 5,
                                  fontSize: 12,
                                  color: "#96A8B2",
                                  fontFamily: "poppins-regular",
                                  paddingTop: 15,
                                }}
                              >
                                Supervisor Signature
                              </Text>
                            )}
                          </TouchableOpacity>
                        </View>
                        <View style={styles.inputFieldContainer}>
                          <TouchableOpacity
                            onPress={() => showDatepicker("DateSupervisor")}
                          >
                            <TextInput
                              editable={false}
                              value={
                                dateSupervisor
                                  ? new Date(
                                      dateSupervisor
                                    ).toLocaleDateString()
                                  : ""
                              }
                              style={styles.inputField}
                              placeholder={"Date"}
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            width: "100%",
                            height: 2,
                            backgroundColor: "#000",
                            marginTop: 20,
                          }}
                        ></View>
                        <Text
                          style={{
                            fontFamily: "poppins-bold",
                            fontSize: 12,
                            paddingTop: 10,
                          }}
                        >
                          MANAGEMENT USE ONLY
                        </Text>
                        <View style={styles.inputFieldContainer}>
                          <TextInput
                            style={styles.inputField}
                            placeholder={"To whom was the accident reported?"}
                            onChangeText={(e) =>
                              setMangementWhomAccidentReported(e)
                            }
                            value={mangementWhomAccidentReported}
                          />
                        </View>
                        <View style={styles.inputFieldContainer}>
                          <TouchableOpacity
                            onPress={() => showDatepicker("DateReport")}
                          >
                            <TextInput
                              editable={false}
                              value={
                                dateReport
                                  ? dateReport + " " + timeReport
                                  : ""
                              }
                              style={styles.inputField}
                              placeholder={"Date and Time accident reported"}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.inputFieldContainer}>
                          <TextInput
                            multiline={true}
                            numberOfLines={4}
                            style={styles.inputField}
                            placeholder={
                              "Manager/Director comment and initial investigation notes"
                            }
                            onChangeText={(e) => setManagerInitialNotes(e)}
                            value={managerInitialNotes}
                          />
                        </View>
                        <View style={styles.inputFieldContainer}>
                          <TextInput
                            multiline={true}
                            numberOfLines={4}
                            style={styles.inputField}
                            placeholder={
                              "Manager/Director follow up action required"
                            }
                            onChangeText={(e) => setActionRequried(e)}
                            value={actionRequried}
                          />
                        </View>
                        <View style={styles.inputFieldContainer}>
                          <TextInput
                            style={styles.inputField}
                            placeholder={
                              "Follow up action to be performed by whom?"
                            }
                            onChangeText={(e) => setActionPerformed(e)}
                            value={actionPerformed}
                          />
                        </View>
                        <View>
                          {managmentArray.map((item, index) => (
                            <View style={styles.detailsContactView} key={index}>
                              <View style={styles.instructionManagmentView}>
                                <Text
                                  style={{
                                    fontFamily: "poppins-bold",
                                    fontSize: 10,
                                  }}
                                >
                                  {item.title}
                                </Text>
                              </View>
                              <View style={styles.checkBoxManagmentView}>
                                <View style={styles.firstCheckBoxRow}>
                                  <View style={styles.parentCheckBox}>
                                    <View style={styles.leftCheckBox}>
                                      <CheckBox
                                        value={item.no}
                                        onValueChange={() =>
                                          calendarDayChange("no", index, "true")
                                        }
                                      />
                                    </View>
                                    <View style={styles.rightCheckBox}>
                                      <Text style={styles.accidentText}>
                                        No
                                      </Text>
                                    </View>
                                  </View>
                                  <View style={styles.parentCheckBox}>
                                    <View style={styles.leftCheckBox}>
                                      <CheckBox
                                        value={item.yes}
                                        onValueChange={() =>
                                          calendarDayChange(
                                            "yes",
                                            index,
                                            "true"
                                          )
                                        }
                                      />
                                    </View>
                                    <View style={styles.rightCheckBox}>
                                      <Text style={styles.accidentText}>
                                        Yes
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              </View>
                            </View>
                          ))}
                        </View>
                        <View style={styles.inputFieldContainer}>
                          <TextInput
                            style={styles.inputField}
                            placeholder={"Manager/Director Name"}
                            onChangeText={(e) => setManagerName(e)}
                            value={managerName}
                          />
                        </View>
                        <View style={styles.inputFieldContainer}>
                          <TouchableOpacity
                            onPress={() =>
                              setSignature({
                                ...signature,
                                bool: true,
                                manager: { ...signature.manager, bool: true },
                                supervisor: {
                                  ...signature.supervisor,
                                  bool: false,
                                },
                              })
                            }
                            style={styles.inputFieldContainer}
                          >
                            {/* <TextInput style={styles.inputField} placeholder={"Signature"} editable={false} /> */}
                            {signature.manager.uri ? (
                              <Image
                                style={{
                                  marginTop: 10,
                                  height: 100,
                                  width: 100,
                                  backgroundColor: "gray",
                                }}
                                source={{ uri: signature.manager.uri }}
                              />
                            ) : (
                              <Text
                                style={{
                                  height: 52,
                                  width: "100%",
                                  borderBottomWidth: 1,
                                  borderBottomColor: "#96A8B2",
                                  padding: 5,
                                  fontSize: 12,
                                  color: "#96A8B2",
                                  fontFamily: "poppins-regular",
                                  paddingTop: 15,
                                }}
                              >
                                Manager Signature
                              </Text>
                            )}
                          </TouchableOpacity>
                        </View>
                        <View style={styles.inputFieldContainer}>
                          <TouchableOpacity
                            onPress={() => showDatepicker("DateManager")}
                          >
                            <TextInput
                              editable={false}
                              value={
                                dateManager
                                  ? new Date(dateManager).toLocaleDateString()
                                  : ""
                              }
                              style={styles.inputField}
                              placeholder={"Date"}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 10 }}>
                          <Text
                            style={{
                              marginBottom: 10,
                              fontFamily: "poppins-semiBold",
                            }}
                          >
                            Project Images
                          </Text>
                          <View
                            style={[
                              styles.tableViewContainer,
                              { paddingLeft: 0, paddingRight: 0 },
                            ]}
                          >
                            <View style={styles.tableHeader}>
                              <View style={{ width: "50%" }}>
                                <Text style={styles.headerTitle}>Image</Text>
                              </View>
                              <View style={{ width: "50%" }}>
                                <Text style={styles.headerTitle}>Comment</Text>
                              </View>
                            </View>
                          </View>
                          <View
                            style={{
                              width: "100%",
                              justifyContent: "flex-end",
                              alignItems: "flex-end",
                              marginRight: 50,
                              marginTop: 20,
                            }}
                          >
                            <TouchableOpacity
                              style={[styles.addBtn]}
                              onPress={() => {
                                if (
                                  projectImagesComment.length > 0 &&
                                  !projectImagesComment[
                                    projectImagesComment.length - 1
                                  ].image &&
                                  !projectImagesComment[
                                    projectImagesComment.length - 1
                                  ].comment
                                ) {
                                  alert(
                                    "Please Enter All Value and then move to next Item Add !"
                                  );
                                } else {
                                  addImagesCommentRow();
                                }
                              }}
                            >
                              <Image style={styles.plusBtn} source={plus} />
                            </TouchableOpacity>
                          </View>
                          <View style={{ flexDirection: "column" }}>
                            {projectImagesComment.length > 0 &&
                              projectImagesComment.map((el, index) => (
                                <View
                                  style={[
                                    styles.tableBody,
                                    { marginBottom: 20 },
                                  ]}
                                  key={index}
                                >
                                  {el.image != "" ? (
                                    <View
                                      style={{
                                        width: "50%",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Image
                                        style={{
                                          width: 50,
                                          height: 50,
                                          marginRight: 10,
                                        }}
                                        source={{ uri: el.image }}
                                        key={index}
                                      />
                                    </View>
                                  ) : (
                                    <View style={{ width: "50%" }}>
                                      <TouchableOpacity
                                        style={[
                                          styles.button,
                                          styles.buttonOpen,
                                          { width: "90%" },
                                        ]}
                                        onPress={() => uploadPhotoImage(index)}
                                      >
                                        <Text style={styles.textStyle}>
                                          Add Image
                                        </Text>
                                      </TouchableOpacity>
                                    </View>
                                  )}

                                  <View style={{ width: "50%" }}>
                                    <TextInput
                                      value={el.comment}
                                      onChangeText={(txt) =>
                                        updateProjectCommentValue(
                                          "comment",
                                          index,
                                          txt
                                        )
                                      }
                                      style={styles.bodyTextInput}
                                      placeholder={"Comment"}
                                    />
                                  </View>
                                </View>
                              ))}
                          </View>
                        </View>
                        <View
                          style={{
                            backgroundColor: "#000",
                            width: "100%",
                            height: ".2%",
                            marginBottom: 20,
                            marginTop: 20,
                          }}
                        ></View>
                        <View style={styles.btnContainer}>
                          <TouchableOpacity
                            style={styles.commonBtn}
                            onPress={() => incidentFormInsert()}
                          >
                            <Text style={styles.commonText}>Save</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </>
          )}
        </View>
      )}
    </View>
  );
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
  isSuccess: state.auth.isSuccess,
  isSuccessMsg: state.auth.isSuccessMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
  createAccidentHandler: (
    nameOfPerson,
    dateIncident,
    locationOfIncident,
    dateInvestigation,
    occupationInjured,
    incidentArray,
    nameOfInjuredPerson,
    ageOfInjuredPerson,
    sexOfInjuredPerson,
    employee,
    stateOfInjuredPerson,
    telephonNumber,
    natureOfInjury,
    callingDetails,
    dynamicInput,
    witnessStatement,
    whomAccidentReported,
    whenAccidentReported,
    supervisorName,
    supervisorSignature,
    dateSupervisor,
    mangementWhomAccidentReported,
    dateReport,
    managerInitialNotes,
    actionRequried,
    actionPerformed,
    managmentArray,
    managerName,
    managerSignature,
    dateManager,
    projectImagesComment,
    commentImages,
    jobID,
    tabId,
    token,
    index
  ) =>
    dispatch(
      insertAccidentForm(
        nameOfPerson,
        dateIncident,
        locationOfIncident,
        dateInvestigation,
        occupationInjured,
        incidentArray,
        nameOfInjuredPerson,
        ageOfInjuredPerson,
        sexOfInjuredPerson,
        employee,
        stateOfInjuredPerson,
        telephonNumber,
        natureOfInjury,
        callingDetails,
        dynamicInput,
        witnessStatement,
        whomAccidentReported,
        whenAccidentReported,
        supervisorName,
        supervisorSignature,
        dateSupervisor,
        mangementWhomAccidentReported,
        dateReport,
        managerInitialNotes,
        actionRequried,
        actionPerformed,
        managmentArray,
        managerName,
        managerSignature,
        dateManager,
        projectImagesComment,
        commentImages,
        jobID,
        tabId,
        token,
        index
      )
    ),
  // updateHealthReport: (index) => dispatch(updateHealthReport(index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AccidentReport);
