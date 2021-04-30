import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { CheckBox, Text } from "native-base";
import styles from "../../../assets/css/styles";
import DateTimePicker from "react-native-modal-datetime-picker";
import SignatureComponent from "../../../components/SignatureComponent";
import { insertCleanUpForm } from "../../../Redux/action/auth/authActionTypes";
import { connect } from "react-redux";

var plus = require("../../../assets/authScreen/plus.png");
const CleanUp = (props) => {
  const { navigation, token, isSuccess, isSuccessMsg, isJobId } = props;
  const jobID = Math.floor(Math.random() * 100) + 1;
  const tabId = props.route.params.tabName;
  const [date, setDate] = useState(new Date());
  const [dateSupervisor, setDateSupervisor] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [showDate, setShowDate] = useState(false);
  const [showSupervisor, setShowSupervisor] = useState(false);
  const [dynamicInput, setdynamicInput] = useState([
    {
      block: "",
      level: "",
      plot: "",
      area: "",
      items: "",
      completed_date: new Date().toLocaleDateString(),
      comment: "",
    },
  ]);
  const [supervisorSignature, setSupervisorSignature] = useState("");
  const [contractorName, setContractorName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [nameOperatives, setNameOperatives] = useState("");
  const [getSign, setGetSign] = useState(false);
  const addCleanUpRow = () => {
    setdynamicInput((oldArray) => [
      ...oldArray,
      {
        block: "",
        level: "",
        plot: "",
        area: "",
        items: "",
        completed_date: new Date().toLocaleDateString(),
        comment: "",
      },
    ]);
  };
  const updateValue = (key, index, value) => {
    let preData = [...dynamicInput];
    preData[index][key] = value;
    setdynamicInput(preData);
  };
  const showMode = (currentMode, type) => {
    if (type == "Date") {
      setShowDate(true);
      setMode(currentMode);
    } else {
      setShowSupervisor(true);
      setMode(currentMode);
    }
  };
  const showDatepicker = (type) => {
    if (type == "Date") {
      showMode("date", "Date");
    } else {
      showMode("date", "DateSupervisor");
    }
  };
  const onDateChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowDate(false);
    setDate(new Date(currentDate).toLocaleDateString());
  };
  const onSupervisorChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowSupervisor(false);
    setDateSupervisor(new Date(currentDate).toLocaleDateString());
  };
  const cleanUpFormInsert = () => {
    // console.log("Name Of Contractor :", contractorName);
    // console.log("Project Name :", projectName);
    // console.log("Name of Operatives :", nameOperatives);
    // console.log("Date :", date);
    // console.log("Dynamic Input :", dynamicInput);
    // console.log("Supervisor Sign :", supervisorSignature);
    // console.log("Supervisor Date :", dateSupervisor);
    if (contractorName != "" && projectName != "" && nameOperatives != "" && date != "" && dynamicInput != "" && supervisorSignature!=="" && dateSupervisor !== "") {
      props.createCleanUpHandler(contractorName, projectName, nameOperatives, date, dynamicInput, supervisorSignature,dateSupervisor, jobID, tabId, token, props.route.params?.index);
    } else {
      alert("Please Insert All Fields CareFully !");
      return false;
    }
  };
  const CancelPicker = (type) => {
    console.log(type);
    if (type == "date") {
      setShowDate(false);
    } else if (type == "dateComplete") {
      setShowCompleteDate(false);
    } else {
      setShowSupervisor(false);
    }
  };
  const [showCompleteDate, setShowCompleteDate] = useState({
    isVisible: false,
    index: -1,
  });
  const showCompleteDatepicker = (index = -1) => {
    setShowCompleteDate({ ...showCompleteDate, isVisible: true, index: index });
  };
  const [dateComplete, setDateComplete] = useState(new Date(1598051730000));
  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowCompleteDate({ ...showCompleteDate, isVisible: false, index: -1 });
    let copyArr = [...dynamicInput];
    copyArr[showCompleteDate.index].completed_date = currentDate.toLocaleDateString();
    setdynamicInput(copyArr);
  };
  useEffect(() => {
    if (isSuccess) {
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
  }, [isSuccess,isSuccessMsg]);
  return (
    <View style={styles.mainContainer}>
      <DateTimePicker
        isVisible={showDate}
        testID="dateTimePicker"
        value={date}
        mode={mode}
        display="default"
        onCancel={() => CancelPicker("date")}
        onConfirm={onDateChange}
        format="DD-MM-YYYY"
      />
      <DateTimePicker
        isVisible={showSupervisor}
        testID="dateTimePicker"
        value={dateSupervisor}
        mode={mode}
        display="default"
        onCancel={() => CancelPicker("dateSupervisor")}
        onConfirm={onSupervisorChange}
        format="DD-MM-YYYY"
      />
      <DateTimePicker
        isVisible={showCompleteDate.isVisible}
        date={dateComplete ? dateComplete : new Date()}
        mode={"date"}
        is24Hour={true}
        display="default"
        onConfirm={(date) => onChange(date)}
        onCancel={() => setShowCompleteDate({ isVisible: false, index: -1 })}
        cancelTextIOS="Cancel"
        confirmTextIOS="Confirm"
      />
      {getSign ? (
        <SignatureComponent
          returnImage={(uri) => {
            setSupervisorSignature(uri);
            setGetSign(false);
          }}
        />
      ) : (
        <>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Notice to Clean up</Text>
      </View>
      <ScrollView>
        <View style={styles.formCodnatiner}>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Main Contractor"}
              value={contractorName}
              onChangeText={(e) => setContractorName(e)}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              value={projectName}
              onChangeText={(e) => setProjectName(e)}
              style={styles.inputField}
              placeholder={"Project"}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              value={nameOperatives}
              onChangeText={(e) => setNameOperatives(e)}
              style={styles.inputField}
              placeholder={"Name of Operative/s"}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <Text
              onPress={() => showDatepicker("Date")}
              style={[styles.inputField, { paddingTop: 15 }]}
            >
              {new Date(date).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.tableViewContainer}>
            <View style={styles.tableHeader}>
              <View style={styles.headerCleanTitleView}>
                <Text style={styles.headerTitle}>Block</Text>
              </View>
              <View style={styles.headerCleanTitleView}>
                <Text style={styles.headerTitle}>Level</Text>
              </View>
              <View style={styles.headerCleanTitleView}>
                <Text style={styles.headerTitle}>Plot/s</Text>
              </View>
              <View style={styles.headerCleanTitleView}>
                <Text style={styles.headerTitle}>Areas</Text>
              </View>
              <View style={styles.headerCleanTitleView}>
                <Text style={styles.headerTitle}>Item Clean</Text>
              </View>
              <View style={styles.headerCleanTitleView}>
                <Text style={styles.headerTitle}>Date completed</Text>
              </View>
              <View style={styles.headerCleanTitleView}>
                <Text style={styles.headerTitle}>Comments</Text>
              </View>
            </View>
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
                onPress={() => addCleanUpRow()}
              >
                <Image style={styles.plusBtn} source={plus} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "column" }}>
              {dynamicInput.length > 0 &&
                dynamicInput.map((el, index) => (
                  <View style={styles.tableBody} key={index}>
                    <View style={styles.inputCleanBodyContainer}>
                      <TextInput
                        value={el.block}
                        onChangeText={(txt) => updateValue("block", index, txt)}
                        style={styles.bodyTextInput}
                        placeholder={"Block"}
                      />
                    </View>
                    <View style={styles.inputCleanBodyContainer}>
                      <TextInput
                        value={el.level}
                        onChangeText={(txt) => updateValue("level", index, txt)}
                        style={styles.bodyTextInput}
                        placeholder={"Level"}
                      />
                    </View>
                    <View style={styles.inputCleanBodyContainer}>
                      <TextInput
                        value={el.plot}
                        onChangeText={(txt) => updateValue("plot", index, txt)}
                        style={styles.bodyTextInput}
                        placeholder={"Plots"}
                      />
                    </View>
                    <View style={styles.inputCleanBodyContainer}>
                      <TextInput
                        value={el.area}
                        onChangeText={(txt) => updateValue("area", index, txt)}
                        style={styles.bodyTextInput}
                        placeholder={"Area"}
                      />
                    </View>
                    <View style={styles.inputCleanBodyContainer}>
                      <TextInput
                        value={el.items}
                        onChangeText={(txt) => updateValue("items", index, txt)}
                        style={styles.bodyTextInput}
                        placeholder={"Clean"}
                      />
                    </View>
                    <View style={styles.inputCleanBodyContainer}>
                      <Text
                        onPress={() => showCompleteDatepicker(index)}
                        style={{
                          height: 40,
                          borderBottomWidth: 1,
                          borderBottomColor: "#96A8B2",
                          fontSize: 8,
                          color: "#96A8B2",
                          fontFamily: "poppins-regular",
                          paddingTop: 13,
                        }}
                      >
                        {new Date(el.completed_date).toLocaleDateString()}
                      </Text>
                    </View>
                    <View style={styles.inputCleanBodyContainer}>
                      <TextInput
                        value={el.comment}
                        onChangeText={(txt) =>
                          updateValue("comment", index, txt)
                        }
                        style={styles.bodyTextInput}
                        placeholder={"Comments"}
                      />
                    </View>
                  </View>
                ))}
            </View>
            <View style={styles.inputFieldContainer}>
            <TouchableOpacity onPress={() => setGetSign(true)} style={styles.inputFieldContainer}>
                {supervisorSignature ?
                <Image style={{ marginTop:20, height: 100, width: 100, backgroundColor: "gray" }} source={{ uri: supervisorSignature }} />
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
              Once completed, please file a copy in the Site Folder and send a
              copy to our Head Office.{" "}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#000",
              width: "100%",
              height: 2,
              marginBottom: 20,
              marginTop: 20,
            }}
          ></View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.commonBtn}
              onPress={() => cleanUpFormInsert()}
            >
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
  isSuccess: state.auth.isSuccess,
  isSuccessMsg: state.auth.isSuccessMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
  createCleanUpHandler: (contractorName, projectName, nameOperatives, date, dynamicInput, supervisorSignature,dateSupervisor, jobID, tabId, token,index) =>
    dispatch(insertCleanUpForm(contractorName, projectName, nameOperatives, date, dynamicInput, supervisorSignature,dateSupervisor, jobID, tabId, token, index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CleanUp);

