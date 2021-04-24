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
import DateTimePicker from "@react-native-community/datetimepicker";

var mainImage = require("../../../assets/authScreen/Accurate-daywork-sheet-docx.png");
var plus = require("../../../assets/authScreen/plus.png");
const AccidentReport = () => {

    const [nameOfPerson, setNameOfPerson] = useState("")
    const [locationOfIncident, setLocationOfIncident] = useState("")
    const [nameOfInjuredPerson, setNameOfInjuredPerson] = useState("")
    const [ageOfInjuredPerson, setAgeOfInjuredPerson] = useState("")
    const [sexOfInjuredPerson, setSexOfInjuredPerson] = useState("")
    const [stateOfInjuredPerson, setStateOfInjuredPerson] = useState("") 
    const [telephonNumber, setTelephoneNumber] = useState("") 
    const [occupationInjured, setOccupationInjured] = useState("") 
    const [natureOfInjury, setNatureOfInjury] = useState("")
    const [witnessStatement, setWitnessStatement] = useState("")
    const [whomAccidentReported, setwhomAccidentReported] = useState("") 
    const [whenAccidentReported, setwhenAccidentReported] = useState("")
    const [supervisorName, setSupervisorName] = useState("")
    const [mangementWhomAccidentReported, setMangementWhomAccidentReported] = useState("") 
    const [managerInitialNotes, setManagerInitialNotes] = useState("") 
    const [actionRequried, setActionRequried] = useState("") 
    const [actionPerformed, setActionPerformed] = useState("") 
    const [managerName, setManagerName] = useState("") 
    const [managerSignature, setManagerSignature] = useState("") 
    const [injuredPersonStatement, setInjuredPersonStatement] = useState("") 
    const [supervisorSignature, setSupervisorSignature] = useState("") 
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
  const [dateIncident, setDateIncident] = useState(new Date());
  const [dateInvestigation, setDateInvestigation] = useState(new Date());
  const [dateSupervisor, setDateSupervisor] = useState(new Date());
  const [dateReport, setDateReport] = useState(new Date());
  const [dateManager, setDateManager] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [showIncident, setShowIncident] = useState(false);
  const [showInvestigation, setShowInvestigation] = useState(false);
  const [showSupervisor, setShowSupervisor] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showManager, setShowManager] = useState(false);
  const [dynamicInput, setdynamicInput] = useState([]);
  const [incidentArray, setIncidentarray] = useState({
    fatality: false,
    overDaysInjury: false,
    timeLost: false,
    majorInjury: false,
    hospital: false,
    publicInjury: false,
    underDaysInjury: false,
    dangerousOccurrences: false,
    becameUnconscious: false,
    reportDiesase: false,
    damaghIncident: false,
    neededResuscitation: false,
  });
  const [employee, setEmployee] = useState({
    employeed: false,
    selfEmployee: false,
    trainee: false,
    tradeContructor: false,
    otherEmployee: false,
  });
  const [calendarDay, setCalendarDay] = useState({
    yes: false,
    no: false,
  });
  const [reOccurance, setReOccurance] = useState({
    yes: false,
    no: false,
  });
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
  // const [fatality,setFatality] = useState(false)
  // const [overDaysInjury, setOverDaysInjury] = useState(false)
  // const [timeLost,setTimeLost] = useState(false)
  // const [majorInjury, setMajorInjury] = useState(false)
  // const [hospital, setHospital] = useState(false)
  // const [publicInjury, setPublicInjury] = useState(false)
  // const [underDaysInjury, setUnderDaysInjury] = useState(false)
  // const [dangerousOccurrences, setDangerousOccurrences] = useState(false)
  // const [becameUnconscious, setBecameUnconscious] = useState(false)
  // const [reportDiesase, setReportDiesase] = useState(false)
  // const [damaghIncident, setDamaghIncident] = useState(false)
  // const [neededResuscitation, setNeededResuscitation] = useState(false)
  // const [employee, setEmployee] = useState(false)
  // const [selfEmployee, setSelfEmployee] = useState(false)
  // const [trainee, setTrainee] = useState(false)
  // const [tradeContructor, setTradeContructor] = useState(false)
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
  const onIncidentChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowIncident(Platform.OS === "ios" ? true : false);
    setDateIncident(new Date(currentDate).toLocaleDateString());
  };
  const onInvestigationChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowInvestigation(Platform.OS === "ios" ? true : false);
    setDateInvestigation(new Date(currentDate).toLocaleDateString());
  };
  const onSupervisorDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowSupervisor(Platform.OS === "ios" ? true : false);
    setDateSupervisor(new Date(currentDate).toLocaleDateString());
  };
  const onReportDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowReport(Platform.OS === "ios" ? true : false);
    setDateReport(new Date(currentDate).toLocaleDateString());
  };
  const onManagerDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowManager(Platform.OS === "ios" ? true : false);
    setDateManager(new Date(currentDate).toLocaleDateString());
  };
  const checkedIncidentValue = (type) => {
    if (type == "fatality") {
      setIncidentarray({
        ...incidentArray,
        fatality: true,
        overDaysInjury: false,
        timeLost: false,
        majorInjury: false,
        hospital: false,
        publicInjury: false,
        underDaysInjury: false,
        dangerousOccurrences: false,
        becameUnconscious: false,
        reportDiesase: false,
        damaghIncident: false,
        neededResuscitation: false,
      });
    } else if (type == "underDaysInjury") {
      setIncidentarray({
        ...incidentArray,
        fatality: false,
        overDaysInjury: false,
        timeLost: false,
        majorInjury: false,
        hospital: false,
        publicInjury: false,
        underDaysInjury: true,
        dangerousOccurrences: false,
        becameUnconscious: false,
        reportDiesase: false,
        damaghIncident: false,
        neededResuscitation: false,
      });
    } else if (type == "timeLost") {
      setIncidentarray({
        ...incidentArray,
        fatality: false,
        overDaysInjury: false,
        timeLost: true,
        majorInjury: false,
        hospital: false,
        publicInjury: false,
        underDaysInjury: false,
        dangerousOccurrences: false,
        becameUnconscious: false,
        reportDiesase: false,
        damaghIncident: false,
        neededResuscitation: false,
      });
    } else if (type == "majorInjury") {
      setIncidentarray({
        ...incidentArray,
        fatality: false,
        overDaysInjury: false,
        timeLost: false,
        majorInjury: true,
        hospital: false,
        publicInjury: false,
        underDaysInjury: false,
        dangerousOccurrences: false,
        becameUnconscious: false,
        reportDiesase: false,
        damaghIncident: false,
        neededResuscitation: false,
      });
    } else if (type == "hospital") {
      setIncidentarray({
        ...incidentArray,
        fatality: false,
        overDaysInjury: false,
        timeLost: false,
        majorInjury: false,
        hospital: true,
        publicInjury: false,
        underDaysInjury: false,
        dangerousOccurrences: false,
        becameUnconscious: false,
        reportDiesase: false,
        damaghIncident: false,
        neededResuscitation: false,
      });
    } else if (type == "publicInjury") {
      setIncidentarray({
        ...incidentArray,
        fatality: false,
        overDaysInjury: false,
        timeLost: false,
        majorInjury: false,
        hospital: false,
        publicInjury: true,
        underDaysInjury: false,
        dangerousOccurrences: false,
        becameUnconscious: false,
        reportDiesase: false,
        damaghIncident: false,
        neededResuscitation: false,
      });
    } else if (type == "overDaysInjury") {
      setIncidentarray({
        ...incidentArray,
        fatality: false,
        overDaysInjury: true,
        timeLost: false,
        majorInjury: false,
        hospital: false,
        publicInjury: false,
        underDaysInjury: false,
        dangerousOccurrences: false,
        becameUnconscious: false,
        reportDiesase: false,
        damaghIncident: false,
        neededResuscitation: false,
      });
    } else if (type == "danegerousOccurrences") {
      setIncidentarray({
        ...incidentArray,
        fatality: false,
        overDaysInjury: false,
        timeLost: false,
        majorInjury: false,
        hospital: false,
        publicInjury: false,
        underDaysInjury: false,
        dangerousOccurrences: true,
        becameUnconscious: false,
        reportDiesase: false,
        damaghIncident: false,
        neededResuscitation: false,
      });
    } else if (type == "becameUnconscious") {
      setIncidentarray({
        ...incidentArray,
        fatality: false,
        overDaysInjury: false,
        timeLost: false,
        majorInjury: false,
        hospital: false,
        publicInjury: false,
        underDaysInjury: false,
        dangerousOccurrences: false,
        becameUnconscious: true,
        reportDiesase: false,
        damaghIncident: false,
        neededResuscitation: false,
      });
    } else if (type == "reportDiesase") {
      setIncidentarray({
        ...incidentArray,
        fatality: false,
        overDaysInjury: false,
        timeLost: false,
        majorInjury: false,
        hospital: false,
        publicInjury: false,
        underDaysInjury: false,
        dangerousOccurrences: false,
        becameUnconscious: false,
        reportDiesase: true,
        damaghIncident: false,
        neededResuscitation: false,
      });
    } else if (type == "damaghIncident") {
      setIncidentarray({
        ...incidentArray,
        fatality: false,
        overDaysInjury: false,
        timeLost: false,
        majorInjury: false,
        hospital: false,
        publicInjury: false,
        underDaysInjury: false,
        dangerousOccurrences: false,
        becameUnconscious: false,
        reportDiesase: false,
        damaghIncident: true,
        neededResuscitation: false,
      });
    } else {
      setIncidentarray({
        ...incidentArray,
        fatality: false,
        overDaysInjury: false,
        timeLost: false,
        majorInjury: false,
        hospital: false,
        publicInjury: false,
        underDaysInjury: false,
        dangerousOccurrences: false,
        becameUnconscious: false,
        reportDiesase: false,
        damaghIncident: false,
        neededResuscitation: true,
      });
    }
  };
  const checkedEmployeeValue = (type) => {
    if (type == "employeed") {
      setEmployee({
        ...employee,
        employeed: true,
        selfEmployee: false,
        trainee: false,
        tradeContructor: false,
        otherEmployee: false,
      });
    } else if (type == "selfEmployee") {
      setEmployee({
        ...employee,
        employeed: false,
        selfEmployee: true,
        trainee: false,
        tradeContructor: false,
        otherEmployee: false,
      });
    } else if (type == "trainee") {
      setEmployee({
        ...employee,
        employeed: false,
        selfEmployee: false,
        trainee: true,
        tradeContructor: false,
        otherEmployee: false,
      });
    } else if (type == "tradeContructor") {
      setEmployee({
        ...employee,
        employeed: false,
        selfEmployee: false,
        trainee: false,
        tradeContructor: true,
        otherEmployee: false,
      });
    } else {
      setEmployee({
        ...employee,
        employeed: false,
        selfEmployee: false,
        trainee: false,
        tradeContructor: false,
        otherEmployee: true,
      });
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
  const checkIncidentNo = (key, index, value) => {
    let preData = [...callingDetails];
    preData[index][key] = value;
    setCallingDetails(preData);
  };
  const calendarDayChange = (type) => {
    if (type == "yes") {
      setCalendarDay({ ...calendarDay, yes: true, no: false });
    } else {
      setCalendarDay({ ...calendarDay, yes: false, no: true });
    }
  };
  const reOccuranceChange = (type) => {
    if (type == "yes") {
      setReOccurance({ ...reOccurance, yes: true, no: false });
    } else {
      setReOccurance({ ...reOccurance, yes: false, no: true });
    }
  };
  const incidentFormInsert = () =>{
    console.log("Name Of Person :",nameOfInjuredPerson)
    console.log("Incident Date :",dateIncident)
    console.log("Location of Incident :",locationOfIncident)
    console.log("Investigation Date :",dateInvestigation)
    console.log("Type of Incident :",incidentArray)
    console.log("Name of Injured Person :",nameOfInjuredPerson)
    console.log("Age :",ageOfInjuredPerson)
    console.log("Sex :",sexOfInjuredPerson)
    console.log("Employee :",employee)
    console.log("State of Injured Person :",stateOfInjuredPerson)
    console.log("Phone Number :",telephonNumber)
    console.log("Occupation :",occupationInjured)
    console.log("Nature of Injury :",natureOfInjury)
    console.log("Ambulance Details :",callingDetails)
    console.log("Statement Of Injured Person :",stateOfInjuredPerson)
    console.log("Dynamic Input :",dynamicInput)
    console.log("Witness Statement :",witnessStatement)
    console.log("Whom Accident Reported :",whomAccidentReported)
    console.log("When Accident Reported :",whenAccidentReported)
    console.log("Supervisor Name :",supervisorName)
    console.log("Supervisor Signature :",supervisorSignature)
    console.log("Supervisor Date :",dateSupervisor)
    console.log("Whom Management Reported :",mangementWhomAccidentReported)
    console.log("Manager Date Report :",dateReport)
    console.log("Comment Initial Investigation :",managerInitialNotes)
    console.log("Action Requried :",actionRequried)
    console.log("Actiion Performed :",actionPerformed)
    console.log("Claender day :",calendarDay)
    console.log("Re Occurance :",reOccurance)
    console.log("Manager Name :",managerName)
    console.log("Manager Signature :",managerSignature)
    console.log("Manager Date :",dateManager)
  }
  return (
    <View style={styles.mainContainer}>
      {showIncident && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateIncident}
          mode={mode}
          display="default"
          onChange={onIncidentChange}
          format="DD-MM-YYYY"
        />
      )}
      {showInvestigation && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateInvestigation}
          mode={mode}
          display="default"
          onChange={onInvestigationChange}
          format="DD-MM-YYYY"
        />
      )}
      {showSupervisor && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateSupervisor}
          mode={mode}
          display="default"
          onChange={onSupervisorDateChange}
          format="DD-MM-YYYY"
        />
      )}
      {showReport && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateReport}
          mode={mode}
          display="default"
          onChange={onReportDateChange}
          format="DD-MM-YYYY"
        />
      )}
      {showManager && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateManager}
          mode={mode}
          display="default"
          onChange={onManagerDateChange}
          format="DD-MM-YYYY"
        />
      )}
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
        <Text style={styles.titleText}>Accident/Incident Report Form</Text>
      </View>
      <ScrollView>
        <View style={styles.formCodnatiner}>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Full name of person completing this report"}
              onChangeText={(e)=>setNameOfPerson(e)}
              value={nameOfPerson}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <Text
              onPress={() => showDatepicker("Date")}
              style={[styles.inputField, { paddingTop: 15 }]}
            >
              {new Date(dateIncident).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Location of Incident"}
              onChangeText={(e)=>setLocationOfIncident(e)}
              value={locationOfIncident}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <Text
              onPress={() => showDatepicker("DateInvestigation")}
              style={[styles.inputField, { paddingTop: 15 }]}
            >
              {new Date(dateInvestigation).toLocaleDateString()}
            </Text>
          </View>
          <View style={{ paddingTop: 20, paddingBottom: 20 }}>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
              TYPE OF INCIDENT{" "}
              <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}>
                (please tick relevant boxes)
              </Text>
            </Text>
          </View>
          <View style={styles.checkBoxDiv}>
            <View style={styles.firstCheckBoxRow}>
              <View style={styles.parentCheckBox}>
                <View style={styles.leftCheckBox}>
                  <CheckBox
                    value={incidentArray.fatality}
                    onValueChange={() => checkedIncidentValue("fatality")}
                  />
                </View>
                <View style={styles.rightCheckBox}>
                  <Text style={styles.accidentText}>Fatality</Text>
                </View>
              </View>
              <View style={styles.parentCheckBox}>
                <View style={styles.leftCheckBox}>
                  <CheckBox
                    value={incidentArray.underDaysInjury}
                    onValueChange={() =>
                      checkedIncidentValue("underDaysInjury")
                    }
                  />
                </View>
                <View style={styles.rightCheckBox}>
                  <Text style={styles.accidentText}>Under ‘7’day injury</Text>
                </View>
              </View>
              <View style={styles.parentCheckBox}>
                <View style={styles.leftCheckBox}>
                  <CheckBox
                    value={incidentArray.timeLost}
                    onValueChange={() => checkedIncidentValue("timeLost")}
                  />
                </View>
                <View style={styles.rightCheckBox}>
                  <Text style={styles.accidentText}>No time lost</Text>
                </View>
              </View>
            </View>
            <View style={styles.firstCheckBoxRow}>
              <View style={styles.parentCheckBox}>
                <View style={styles.leftCheckBox}>
                  <CheckBox
                    value={incidentArray.majorInjury}
                    onValueChange={() => checkedIncidentValue("majorInjury")}
                  />
                </View>
                <View style={styles.rightCheckBox}>
                  <Text style={styles.accidentText}>Major Injury</Text>
                </View>
              </View>
              <View style={styles.parentCheckBox}>
                <View style={styles.leftCheckBox}>
                  <CheckBox
                    value={incidentArray.hospital}
                    onValueChange={() => checkedIncidentValue("hospital")}
                  />
                </View>
                <View style={styles.rightCheckBox}>
                  <Text style={styles.accidentText}>
                    In hospital more than 24hrs
                  </Text>
                </View>
              </View>
              <View style={styles.parentCheckBox}>
                <View style={styles.leftCheckBox}>
                  <CheckBox
                    value={incidentArray.publicInjury}
                    onValueChange={() => checkedIncidentValue("publicInjury")}
                  />
                </View>
                <View style={styles.rightCheckBox}>
                  <Text style={styles.accidentText}>
                    Member of public/contractor injured{" "}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.firstCheckBoxRow}>
              <View style={styles.parentCheckBox}>
                <View style={styles.leftCheckBox}>
                  <CheckBox
                    value={incidentArray.overDaysInjury}
                    onValueChange={() => checkedIncidentValue("overDaysInjury")}
                  />
                </View>
                <View style={styles.rightCheckBox}>
                  <Text style={styles.accidentText}>Over ‘7’ day injury</Text>
                </View>
              </View>
              <View style={styles.parentCheckBox}>
                <View style={styles.leftCheckBox}>
                  <CheckBox
                    value={incidentArray.dangerousOccurrences}
                    onValueChange={() =>
                      checkedIncidentValue("danegerousOccurrences")
                    }
                  />
                </View>
                <View style={styles.rightCheckBox}>
                  <Text style={styles.accidentText}>
                    Dangerous Occurrences{" "}
                  </Text>
                </View>
              </View>
              <View style={styles.parentCheckBox}>
                <View style={styles.leftCheckBox}>
                  <CheckBox
                    value={incidentArray.becameUnconscious}
                    onValueChange={() =>
                      checkedIncidentValue("becameUnconscious")
                    }
                  />
                </View>
                <View style={styles.rightCheckBox}>
                  <Text style={styles.accidentText}>Became unconscious</Text>
                </View>
              </View>
            </View>
            <View style={styles.firstCheckBoxRow}>
              <View style={styles.parentCheckBox}>
                <View style={styles.leftCheckBox}>
                  <CheckBox
                    value={incidentArray.reportDiesase}
                    onValueChange={() => checkedIncidentValue("reportDiesase")}
                  />
                </View>
                <View style={styles.rightCheckBox}>
                  <Text style={styles.accidentText}>Reportable disease</Text>
                </View>
              </View>
              <View style={styles.parentCheckBox}>
                <View style={styles.leftCheckBox}>
                  <CheckBox
                    value={incidentArray.damaghIncident}
                    onValueChange={() => checkedIncidentValue("damaghIncident")}
                  />
                </View>
                <View style={styles.rightCheckBox}>
                  <Text style={styles.accidentText}>Damage Incident</Text>
                </View>
              </View>
              <View style={styles.parentCheckBox}>
                <View style={styles.leftCheckBox}>
                  <CheckBox
                    value={incidentArray.neededResuscitation}
                    onValueChange={() =>
                      checkedIncidentValue("neededResuscitation")
                    }
                  />
                </View>
                <View style={styles.rightCheckBox}>
                  <Text style={styles.accidentText}>Needed resuscitation</Text>
                </View>
              </View>
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
              onChangeText={(e)=>setNameOfInjuredPerson(e)}
              value={nameOfInjuredPerson}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput onChangeText={(e)=>setAgeOfInjuredPerson(e)}
              value={ageOfInjuredPerson} style={styles.inputField} placeholder={"Age"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput onChangeText={(e)=>setSexOfInjuredPerson(e)}
              value={sexOfInjuredPerson} style={styles.inputField} placeholder={"Sex"} />
          </View>
          <View style={styles.checkBoxDiv}>
            <View style={styles.firstCheckBoxRow}>
              <View style={styles.parentCheckBox}>
                <View style={styles.leftCheckBox}>
                  <CheckBox
                    value={employee.employeed}
                    onValueChange={() => checkedEmployeeValue("employeed")}
                  />
                </View>
                <View style={styles.rightCheckBox}>
                  <Text style={styles.accidentText}>Employee</Text>
                </View>
              </View>
              <View style={styles.parentCheckBox}>
                <View style={styles.leftCheckBox}>
                  <CheckBox
                    value={employee.selfEmployee}
                    onValueChange={() => checkedEmployeeValue("selfEmployee")}
                  />
                </View>
                <View style={styles.rightCheckBox}>
                  <Text style={styles.accidentText}>Self Employed</Text>
                </View>
              </View>
              <View style={styles.parentCheckBox}>
                <View style={styles.leftCheckBox}>
                  <CheckBox
                    value={employee.trainee}
                    onValueChange={() => checkedEmployeeValue("trainee")}
                  />
                </View>
                <View style={styles.rightCheckBox}>
                  <Text style={styles.accidentText}>Trainee</Text>
                </View>
              </View>
            </View>
            <View style={styles.firstCheckBoxRow}>
              <View style={styles.parentCheckBox}>
                <View style={styles.leftCheckBox}>
                  <CheckBox
                    value={employee.tradeContructor}
                    onValueChange={() =>
                      checkedEmployeeValue("tradeContructor")
                    }
                  />
                </View>
                <View style={styles.rightCheckBox}>
                  <Text style={styles.accidentText}>Trade Contracto</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"(Please State) Injured Person Name"}
              onChangeText={(e)=>setStateOfInjuredPerson(e)}
              value={stateOfInjuredPerson}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Telephone Number"}
              onChangeText={(e)=>setTelephoneNumber(e)}
              value={telephonNumber}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Occupation when Injured"}
              onChangeText={(e)=>setOccupationInjured(e)}
              value={occupationInjured}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={
                "Nature of Injury or condition, And the part of the body affected"
              }
              onChangeText={(e)=>setNatureOfInjury(e)}
              value={natureOfInjury}
            />
          </View>
          <View style={styles.callingDetailsView}>
            <View style={{ flexDirection: "column" }}>
              {callingDetails.map((item, index) => (
                <View style={styles.detailsContactView} key={index}>
                  <View style={styles.instructionView}>
                    <Text style={{ fontFamily: "poppins-bold", fontSize: 10 }}>
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
                              checkedAmbulanceValue("yes", index, "true")
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
                          checkIncidentNo("incidentNo", index, txt)
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
                onChangeText={(e)=>setInjuredPersonStatement(e)}
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
                Witness’s names and contact number (attach witness statements if
                available)
              </Text>
              <View
                style={{
                  justifyContent: "flex-end",
                  width: "100%",
                  alignItems: "flex-end",
                  marginBottom: 10,
                }}
              >
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={() => addRow()}
                >
                  <Image style={styles.plusBtn} source={plus} />
                </TouchableOpacity>
              </View>
              <View style={styles.tableViewContainer}>
                <View style={styles.tableHeader}>
                  <View style={styles.headerWitnessTitleView}>
                    <Text style={styles.headerWitnessTitle}>NAME</Text>
                  </View>
                  <View style={styles.headerWitnessTitleView}>
                    <Text style={styles.headerWitnessTitle}>NUMBER</Text>
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
                              updateValue("completed", index, txt)
                            }
                            style={styles.bodyTextInput}
                            placeholder={"Name"}
                          />
                        </View>
                        <View style={styles.inputWitnessBodyContainer}>
                          <TextInput
                            value={el.number}
                            onChangeText={(txt) =>
                              updateValue("completed", index, txt)
                            }
                            style={styles.bodyTextInput}
                            placeholder={"Number"}
                          />
                        </View>
                      </View>
                    ))}
                  <View style={styles.tableBody}>
                    <View style={styles.inputWitnessBodyContainer}>
                      <TextInput
                        style={styles.bodyTextInput}
                        placeholder={"Name"}
                        onChangeText={(txt) => setData({ ...data, name: txt })}
                        value={data.name}
                      />
                    </View>
                    <View style={styles.inputWitnessBodyContainer}>
                      <TextInput
                        style={styles.bodyTextInput}
                        placeholder={"Number"}
                        onChangeText={(txt) =>
                          setData({ ...data, number: txt })
                        }
                        value={data.number}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.inputFieldContainer}>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.inputField}
                    placeholder={"WITNESS STATEMENT"}
                    onChangeText={(e)=>setWitnessStatement(e)}
                value={witnessStatement}
                  />
                </View>
                <View style={styles.inputFieldContainer}>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.inputField}
                    placeholder={"To whom was the accident reported?"}
                    onChangeText={(e)=>setwhomAccidentReported(e)}
              value={whomAccidentReported}
                  />
                </View>
                <View style={styles.inputFieldContainer}>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.inputField}
                    placeholder={"When was the accident reported?"}
                    onChangeText={(e)=>setwhenAccidentReported(e)}
              value={whenAccidentReported}
                  />
                </View>
                <View style={styles.inputFieldContainer}>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.inputField}
                    placeholder={"Supervisor Name"}
                    onChangeText={(e)=>setSupervisorName(e)}
              value={supervisorName}
                  />
                </View>
                <View style={styles.inputFieldContainer}>
                  <TextInput
                    style={styles.inputField}
                    placeholder={"Signature"}
                    onChangeText={(e)=>setSupervisorSignature(e)}
              value={supervisorSignature}
                  />
                </View>
                <View style={styles.inputFieldContainer}>
                  <Text
                    onPress={() => showDatepicker("DateSupervisor")}
                    style={[styles.inputField, { paddingTop: 15 }]}
                  >
                    {new Date(dateSupervisor).toLocaleDateString()}
                  </Text>
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
                    onChangeText={(e)=>setMangementWhomAccidentReported(e)}
              value={mangementWhomAccidentReported}
                  />
                </View>
                <View style={styles.inputFieldContainer}>
                  <Text
                    onPress={() => showDatepicker("DateReport")}
                    style={[styles.inputField, { paddingTop: 15 }]}
                  >
                    {new Date(dateReport).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.inputFieldContainer}>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.inputField}
                    placeholder={
                      "Manager/Director comment and initial investigation notes"
                    }
                    onChangeText={(e)=>setManagerInitialNotes(e)}
              value={managerInitialNotes}
                  />
                </View>
                <View style={styles.inputFieldContainer}>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.inputField}
                    placeholder={"Manager/Director follow up action required"}
                    onChangeText={(e)=>setActionRequried(e)}
              value={actionRequried}
                  />
                </View>
                <View style={styles.inputFieldContainer}>
                  <TextInput
                    style={styles.inputField}
                    placeholder={"Follow up action to be performed by whom?"}
                    onChangeText={(e)=>setActionPerformed(e)}
              value={actionPerformed}
                  />
                </View>
                <View style={styles.detailsContactView}>
                  <View style={styles.instructionManagmentView}>
                    <Text style={{ fontFamily: "poppins-bold", fontSize: 10 }}>
                      Will the injured person be off work for more than 7
                      calendar days?
                    </Text>
                  </View>
                  <View style={styles.checkBoxManagmentView}>
                    <View style={styles.firstCheckBoxRow}>
                      <View style={styles.parentCheckBox}>
                        <View style={styles.leftCheckBox}>
                          <CheckBox
                            value={calendarDay.no}
                            onValueChange={() => calendarDayChange("no")}
                          />
                        </View>
                        <View style={styles.rightCheckBox}>
                          <Text style={styles.accidentText}>No</Text>
                        </View>
                      </View>
                      <View style={styles.parentCheckBox}>
                        <View style={styles.leftCheckBox}>
                          <CheckBox
                            value={calendarDay.yes}
                            onValueChange={() => calendarDayChange("yes")}
                          />
                        </View>
                        <View style={styles.rightCheckBox}>
                          <Text style={styles.accidentText}>Yes</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.detailsContactView}>
                  <View style={styles.instructionManagmentView}>
                    <Text style={{ fontFamily: "poppins-bold", fontSize: 10 }}>
                      Have all possible actions been taken to prevent
                      Re-occurrence?
                    </Text>
                  </View>
                  <View style={styles.checkBoxManagmentView}>
                    <View style={styles.firstCheckBoxRow}>
                      <View style={styles.parentCheckBox}>
                        <View style={styles.leftCheckBox}>
                          <CheckBox
                            value={reOccurance.no}
                            onValueChange={() => reOccuranceChange("no")}
                          />
                        </View>
                        <View style={styles.rightCheckBox}>
                          <Text style={styles.accidentText}>No</Text>
                        </View>
                      </View>
                      <View style={styles.parentCheckBox}>
                        <View style={styles.leftCheckBox}>
                          <CheckBox
                            value={reOccurance.yes}
                            onValueChange={() => reOccuranceChange("yes")}
                          />
                        </View>
                        <View style={styles.rightCheckBox}>
                          <Text style={styles.accidentText}>Yes</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.inputFieldContainer}>
                  <TextInput
                    style={styles.inputField}
                    placeholder={"Manager/Director Name"}
                    onChangeText={(e)=>setManagerName(e)}
              value={managerName}
                  />
                </View>
                <View style={styles.inputFieldContainer}>
                  <TextInput
                    style={styles.inputField}
                    placeholder={"Signature"}
                    onChangeText={(e)=>setManagerSignature(e)}
                    value={managerSignature}
                  />
                </View>
                <View style={styles.inputFieldContainer}>
                  <Text
                    onPress={() => showDatepicker("DateManager")}
                    style={[styles.inputField, { paddingTop: 15 }]}
                  >
                    {new Date(dateManager).toLocaleDateString()}
                  </Text>
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
    </View>
  );
};
export default AccidentReport;
