import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, CheckBox, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { Text } from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";
import { insertSnaggingForm } from "../../Redux/action/auth/authActionTypes";
import { connect } from "react-redux";

var plus = require("../../assets/authScreen/plus.png");
const WrantySannging = (props) => {
  const { navigation, token, isSuccess, isSuccessMsg, isJobId } = props;
  const jobID = isJobId;
  const tabId = props.route.params.tabName;
  const [dateIssue, setDateIssue] = useState(new Date());
  const [dateComplete, setDateComplete] = useState(new Date());
  const [dateSnaggingIssue, setDateSnaggingIssue] = useState(new Date());
  const [dateSnaggingComplete, setDateSnaggingComplete] = useState(new Date());
  const [showIssue, setShowIssue] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [showSnaggingIssue, setShowSnaggingIssue] = useState(false);
  const [showSnaggingComplete, setShowSnaggingComplete] = useState(false);
  const [mode, setMode] = useState("date");
  const [dynamicSnagInput, setdynamicSnagInput] = useState([]);
  const [dynamicSnagCompletedInput, setdynamicSnagCompleteInput] = useState([]);
  const [block, setBlock] = useState("");
  const [plotNumber, setPlotNumber] = useState("");
  const [wrrantySnagging, setWrrantySnagging] = useState("");
  const [painterName, setPainterName] = useState("");
  const [noOfPage, setNoOfPage] = useState("");
  const [totalHours, setTotalHours] = useState("");

  const [dataSnag, setDataSnag] = useState({
    location: "",
    description: "",
  });
  const [dataCompletedSnag, setDataCompletetedSnag] = useState({
    location: "",
    description: "",
  });
  const addSnagRow = () => {
    setdynamicSnagInput((oldArray) => [...oldArray, dataSnag]);
    setDataSnag({ location: "", description: "" });
  };
  const addSnagCompletedRow = () => {
    setdynamicSnagCompleteInput((oldArray) => [...oldArray, dataCompletedSnag]);
    setDataCompletetedSnag({ location: "", description: "" });
  };
  /* Update Dynamic Snag Input value & Set To another Array*/
  const updateValue = (key, index, value) => {
    let preData = [...dynamicSnagInput];
    preData[index][key] = value;
    setdynamicSnagInput(preData);
  };
  /* Update Dynamic Snag Completed Input value & Set To another Array*/
  const updateCompletedValue = (key, index, value) => {
    let preData = [...dynamicSnagCompletedInput];
    preData[index][key] = value;
    setdynamicSnagCompleteInput(preData);
  };
  /**Issue Date */
  const onIssueChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowIssue(Platform.OS === "ios" ? true : false);
    setDateIssue(new Date(currentDate).toLocaleDateString());
  };
  /**Completed Date */
  const onCompleteChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowComplete(Platform.OS === "ios" ? true : false);
    setDateComplete(new Date(currentDate).toLocaleDateString());
  };
  /**Snagging Issue Date */
  const onSnaggingIssueChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowSnaggingIssue(Platform.OS === "ios" ? true : false);
    setDateSnaggingIssue(new Date(currentDate).toLocaleDateString());
  };
  /**Snagging Completed Date */
  const onSnaggingCompleteChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowSnaggingComplete(Platform.OS === "ios" ? true : false);
    setDateSnaggingComplete(new Date(currentDate).toLocaleDateString());
  };
  const showMode = (currentMode, type) => {
    if (type == "IssueDate") {
      setShowIssue(true);
      setMode(currentMode);
    } else if (type == "CompleteDate") {
      setShowComplete(true);
      setMode(currentMode);
    } else if (type == "SnaggingIssue") {
      setShowSnaggingIssue(true);
      setMode(currentMode);
    } else {
      setShowSnaggingComplete(true);
      setMode(currentMode);
    }
  };
  const showDatepicker = (type) => {
    console.log(type);
    if (type == "DateIssue") {
      showMode("date", "IssueDate");
    } else if (type == "CompleteDate") {
      showMode("date", "CompleteDate");
    } else if (type == "SnaggingIssue") {
      showMode("date", "SnaggingIssue");
    } else {
      showMode("date", "SnaggingCompleted");
    }
  };
  const snaggingFormInsert = () => {
    if (block != "" && plotNumber != "" && wrrantySnagging != "" && painterName != "" && noOfPage != "" && totalHours) {
      props.createSnaggingHandler(
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
        dynamicSnagCompletedInput,
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
  }, [isSuccess, isSuccessMsg]);
  return (
    <View style={styles.mainContainer}>
      <DateTimePicker
        isVisible={showIssue}
        testID='dateTimePicker'
        value={dateIssue}
        mode={mode}
        display='default'
        onConfirm={onIssueChange}
        onCancel={() => {}}
        format='DD-MM-YYYY'
      />
      <DateTimePicker
        isVisible={showComplete}
        testID='dateTimePicker'
        value={dateComplete}
        mode={mode}
        display='default'
        onConfirm={onCompleteChange}
        onCancel={() => {}}
        format='DD-MM-YYYY'
      />
      <DateTimePicker
        isVisible={showSnaggingIssue}
        testID='dateTimePicker'
        value={dateSnaggingIssue}
        mode={mode}
        display='default'
        onConfirm={onSnaggingIssueChange}
        onCancel={() => {}}
        format='DD-MM-YYYY'
      />
      <DateTimePicker
        isVisible={showSnaggingComplete}
        testID='dateTimePicker'
        value={dateSnaggingComplete}
        mode={mode}
        display='default'
        onConfirm={onSnaggingCompleteChange}
        onCancel={() => {}}
        format='DD-MM-YYYY'
      />
      <ScrollView style={{ height: "100%" }}>
        <View style={styles.formConatiner}>
          <View style={styles.inputFieldContainer}>
            <TextInput value={block} onChangeText={(e) => setBlock(e)} style={styles.inputField} placeholder={"Block"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput value={plotNumber} onChangeText={(e) => setPlotNumber(e)} style={styles.inputField} placeholder={"Plot No"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <Text onPress={() => showDatepicker("DateIssue")} style={styles.inputField}>
              {new Date(dateIssue).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.inputFieldContainer}>
            <Text onPress={() => showDatepicker("CompleteDate")} style={styles.inputField}>
              {new Date(dateComplete).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Snagging to be completed within 24 hours</Text>
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput value={wrrantySnagging} onChangeText={(e) => setWrrantySnagging(e)} style={styles.inputField} placeholder={"Pre- warranty snagging"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput value={painterName} onChangeText={(e) => setPainterName(e)} style={styles.inputField} placeholder={"Painter’s name"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput value={noOfPage} onChangeText={(e) => setNoOfPage(e)} style={styles.inputField} placeholder={"No of page"} />
          </View>
          <View style={styles.tableViewContainer}>
            <View style={styles.tableHeader}>
              <View style={styles.headerTitleView}>
                <Text style={styles.headerTitle}>Location</Text>
              </View>
              <View style={styles.headerTitleView}>
                <Text style={styles.headerTitle}>Snag Description</Text>
              </View>
              <View style={styles.headerTitleView}>
                <Text style={styles.headerTitle}>Action</Text>
              </View>
            </View>
            <View style={{ flexDirection: "column" }}>
              {dynamicSnagInput.length > 0 &&
                dynamicSnagInput.map((el, index) => (
                  <View style={styles.tableBody} key={index}>
                    <View style={styles.inputBodyContainer}>
                      <TextInput
                        value={el.location}
                        onChangeText={(txt) => updateValue("location", index, txt)}
                        style={styles.bodyTextInput}
                        placeholder={"Location"}
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
                  </View>
                ))}
            </View>
            <View style={styles.tableBody}>
              <View style={styles.inputBodyContainer}>
                <TextInput
                  value={dataSnag.location}
                  onChangeText={(txt) => setDataSnag({ ...dataSnag, location: txt })}
                  style={styles.bodyTextInput}
                  placeholder={"Location"}
                />
              </View>
              <View style={styles.inputBodyContainer}>
                <TextInput
                  value={dataSnag.description}
                  onChangeText={(txt) => setDataSnag({ ...dataSnag, description: txt })}
                  style={styles.bodyTextInput}
                  placeholder={"Description"}
                />
              </View>
              <View
                style={{
                  width: "33.3%",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <TouchableOpacity style={styles.addBtn} onPress={() => addSnagRow()}>
                  <Image style={styles.plusBtn} source={plus} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.inputFieldContainer}>
            <Text onPress={() => showDatepicker("SnaggingIssue")} style={styles.inputField}>
              {new Date(dateSnaggingIssue).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.inputFieldContainer}>
            <Text onPress={() => showDatepicker("SnaggingCompleted")} style={styles.inputField}>
              {new Date(dateSnaggingComplete).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput value={totalHours} onChangeText={(e) => setTotalHours(e)} style={styles.inputField} placeholder={"Hours"} />
          </View>
          <View style={styles.tableViewContainer}>
            <View style={styles.tableHeader}>
              <View style={styles.headerTitleView}>
                <Text style={styles.headerTitle}>Location</Text>
              </View>
              <View style={styles.headerTitleView}>
                <Text style={styles.headerTitle}>Snag Description</Text>
              </View>
              <View style={styles.headerTitleView}>
                <Text style={styles.headerTitle}>Action</Text>
              </View>
            </View>
            <View style={{ flexDirection: "column" }}>
              {dynamicSnagCompletedInput.length > 0 &&
                dynamicSnagCompletedInput.map((el, index) => (
                  <View style={styles.tableBody} key={index}>
                    <View style={styles.inputBodyContainer}>
                      <TextInput
                        value={el.location}
                        onChangeText={(txt) => updateCompletedValue("location", index, txt)}
                        style={styles.bodyTextInput}
                        placeholder={"Location"}
                      />
                    </View>
                    <View style={styles.inputBodyContainer}>
                      <TextInput
                        value={el.description}
                        onChangeText={(txt) => updateCompletedValue("description", index, txt)}
                        style={styles.bodyTextInput}
                        placeholder={"Description"}
                      />
                    </View>
                  </View>
                ))}
            </View>
            <View style={styles.tableBody}>
              <View style={styles.inputBodyContainer}>
                <TextInput
                  value={dataCompletedSnag.location}
                  onChangeText={(txt) =>
                    setDataCompletetedSnag({
                      ...dataCompletedSnag,
                      location: txt,
                    })
                  }
                  style={styles.bodyTextInput}
                  placeholder={"Location"}
                />
              </View>
              <View style={styles.inputBodyContainer}>
                <TextInput
                  value={dataCompletedSnag.description}
                  onChangeText={(txt) =>
                    setDataCompletetedSnag({
                      ...dataCompletedSnag,
                      description: txt,
                    })
                  }
                  style={styles.bodyTextInput}
                  placeholder={"Description"}
                />
              </View>
              <View
                style={{
                  width: "33.3%",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <TouchableOpacity style={styles.addBtn} onPress={() => addSnagCompletedRow()}>
                  <Image style={styles.plusBtn} source={plus} />
                </TouchableOpacity>
              </View>
            </View>
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
            <TouchableOpacity style={styles.commonBtn} onPress={() => snaggingFormInsert()}>
              <Text style={styles.commonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  createSnaggingHandler: (
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
    dynamicSnagCompletedInput,
    jobID,
    tabId,
    token,
    index
  ) =>
    dispatch(
      insertSnaggingForm(
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
        dynamicSnagCompletedInput,
        jobID,
        tabId,
        token,
        index
      )
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(WrantySannging);
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
    textAlign: "center",
  },
  titleText: {
    color: "#4F4F4F",
    fontSize: 18,
    fontFamily: "poppins-semiBold",
    textAlign: "center",
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
    width: "33.3%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: "poppins-bold",
  },
  inputBodyContainer: {
    width: "33.3%",
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
    marginBottom: 20,
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
  infoAbout: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
  },
  commonView: {
    height: "100%",
    width: "50%",
    flexDirection: "row",
    paddingTop: 10,
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
