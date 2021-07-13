import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { Text } from "native-base";
import { connect } from "react-redux";
import { createNewJobCreation } from "../../Redux/action/auth/authActionTypes";
import axios from "axios";
import { Picker } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Fragment } from "react";
import { getCustomData } from "../../lib/utils";
var plus = require("../../assets/authScreen/plus.png");
const NewJob = (props) => {
  const { navigation, isJobId, isJob, isJobMsg, token } = props;
  const [constructorName, setConstructorName] = useState("");
  const [constructorNameErr, setConstructorNameErr] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectNameErr, setProjectNameErr] = useState("");
  const [weekProject, setWeekProject] = useState("");
  const [weekProjectErr, setWeekProjectErr] = useState("");
  const [dynamicInput, setdynamicInput] = useState([]);
  const [dynamicInputErr, setdynamicInputErr] = useState("");
  const [supervisorData, setSupervisorData] = useState([]);
  const [supervisorDataErr, setSupervisorDataErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [dateErr, setDateErr] = useState("");
  const [show, setShow] = useState(false);
  const addInput = () => {
    // setdynamicInput((oldArray) => [...oldArray, data]);
    // setData({
    //   qty: "",
    //   description: "",
    // });
    setdynamicInput((oldArray) => [...oldArray, { qty: "", description: "" }]);
  };
  const [selectedValue, setSelectedValue] = useState("");

  const updateValue = (key, index, value) => {
    let preData = [...dynamicInput];
    preData[index][key] = value;
    setdynamicInput(preData);
  };
  console.log(dynamicInput);
  const newJob = async () => {
    console.log(selectedValue);
    try {
      if (
        constructorName != "" &&
        projectName != "" &&
        weekProject != "" &&
        selectedValue != "" &&
        date != "" &&
        dynamicInput.length > 0
      ) {
        const tDate = new Date(date);
        const day = tDate.getDate();
        const month = tDate.getMonth() + 1;
        const year = tDate.getFullYear();
        const newDate =
          (day < 10 ? "0" + day : day) +
          "/" +
          (month < 10 ? "0" + month : month) +
          "/" +
          year;
        console.log("Date", newDate);
        await props.createNewJobHandler(
          constructorName,
          projectName,
          weekProject,
          selectedValue,
          newDate,
          dynamicInput,
          token
        );
        props.navigation.navigate("MainScreen");
        alert("Job Saved Successfully");
      } else {
        constructorName === "" &&
          setConstructorNameErr("Contractor Name is required");
        selectedValue === "" && setSupervisorDataErr("Supervisor is required");
        weekProject === "" && setWeekProjectErr("Number of weeks is required");
        projectName === "" && setProjectNameErr("Project Name is required");
        date === "" && setDateErr("Date is required");
        dynamicInput.length === 0 && setdynamicInputErr("Job Summary required");
        //alert("Please Enter All Missing Fields CareFully !");
      }
    } catch (err) {
      alert(err.message);
    }
  };
  const onChange = (selectedDate) => {
    const currentDate = selectedDate;

    setShow(false);
    dateErr && setDateErr("");
    
    setDate(new Date(currentDate));
  };
  const showDatepicker = () => {
    setShow(true);
  };

  useEffect(() => {
    try {
      const body = {};
      (async () => {
        setLoading(true);
        console.log("Tokn", token);
        const request = await axios(
          "https://topdecdecoratingapp.com/api/admin/view/Supervisors",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
            },
            data: body,
          }
        );
        const response = await request.data.data.user;
        setSupervisorData(request.data.data.user);
        setLoading(false);
      })();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, []);
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color="#1073AC" size="small" />
      </View>
    );
  } else {
    return (
      <Fragment>
        <DateTimePickerModal
          isVisible={show}
          date={date ? date : new Date()}
          mode={"date"}
          is24Hour={true}
          display="default"
          onConfirm={(date) => onChange(date)}
          onCancel={() => setShow(false)}
          cancelTextIOS="Cancel"
          confirmTextIOS="Confirm"
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.mainContainer}>
            {/* <View style={styles.dateTimeContainer}>
          <Text style={styles.refText}>Date: 12-2-2021</Text>
          <Text style={styles.refText}>Ref id: 10099499</Text>
        </View> */}

            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Input job details</Text>
            </View>
            <ScrollView>
              <View style={styles.formConatiner}>
                <View
                  style={
                    constructorNameErr
                      ? {
                          ...styles.inputFieldContainer,
                          borderBottomColor: "red",
                        }
                      : styles.inputFieldContainer
                  }
                >
                  <TextInput
                    style={styles.inputField}
                    placeholder={"Main Contractor Name"}
                    value={constructorName}
                    onChangeText={(e) => {
                      setConstructorName(e);
                      constructorNameErr && setConstructorNameErr("");
                    }}
                  />
                </View>

                {constructorNameErr !== "" && (
                  <Text style={styles.err}>{constructorNameErr}</Text>
                )}

                <View
                  style={
                    projectNameErr
                      ? {
                          ...styles.inputFieldContainer,
                          borderBottomColor: "red",
                        }
                      : styles.inputFieldContainer
                  }
                >
                  <TextInput
                    style={styles.inputField}
                    placeholder={"Project Name"}
                    value={projectName}
                    onChangeText={(e) => {
                      setProjectName(e);
                      projectNameErr && setProjectNameErr("");
                    }}
                  />
                </View>
                {projectNameErr !== "" && (
                  <Text style={styles.err}>{projectNameErr}</Text>
                )}

                <View
                  style={
                    weekProjectErr
                      ? {
                          ...styles.inputFieldContainer,
                          borderBottomColor: "red",
                        }
                      : styles.inputFieldContainer
                  }
                >
                  <TextInput
                    style={styles.inputField}
                    placeholder={"Number of weeks for project"}
                    value={weekProject}
                    onChangeText={(e) => {
                      setWeekProject(e.replace(/[^0-9]/g, ""));
                      weekProjectErr && setWeekProjectErr("");
                    }}
                  />
                </View>

                {weekProjectErr !== "" && (
                  <Text style={styles.err}>{weekProjectErr}</Text>
                )}

                <View
                  style={
                    supervisorDataErr
                      ? {
                          ...styles.inputFieldContainer,
                          borderBottomColor: "red",
                        }
                      : styles.inputFieldContainer
                  }
                >
                  <Picker
                    mode="dropdown"
                    placeholder="Select Supervisor Name"
                    // iosIcon={<Icon name='arrow-down' />}
                    itemTextStyle={{
                      color: "#96A8B2",
                      fontFamily: "poppins-regular",
                      padding: 0,
                      margin: 0,
                    }}
                    textStyle={{
                      color: "#96A8B2",
                      fontSize: 16,
                      fontFamily: "poppins-regular",
                      padding: 0,
                      margin: 0,
                    }}
                    style={{
                      color: "#96A8B2",
                      padding: 0,
                      margin: 0,
                    }}
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => {
                      supervisorDataErr && setSupervisorDataErr("");
                      setSelectedValue(itemValue);
                    }}
                  >
                    <Picker.Item
                      style={{
                        fontFamily: "poppins-regular",
                        padding: 0,
                        margin: 0,
                      }}
                      label="Select Supervisor Name"
                      value="Select Supervisor Name"
                    />
                    {supervisorData &&
                      supervisorData.map((item, index) => (
                        <Picker.Item
                          key={"PickItem" + index}
                          style={{
                            fontFamily: "poppins-regular",
                            padding: 0,
                            margin: 0,
                          }}
                          label={item.name.toString()}
                          value={item?.id.toString()}
                        />
                      ))}
                  </Picker>
                </View>

                {supervisorDataErr !== "" && (
                  <Text style={styles.err}>{supervisorDataErr}</Text>
                )}
                <View
                  style={
                    dateErr
                      ? {
                          ...styles.inputFieldContainer,
                          borderBottomColor: "red",
                        }
                      : styles.inputFieldContainer
                  }
                >
                  <Text
                    onPress={showDatepicker}
                    style={{
                      width: "100%",
                      height: 60,
                      paddingTop: 20,
                      fontSize: 16,
                      color: "#96A8B2",
                      fontFamily: "poppins-regular",
                    }}
                  >
                    {date ? getCustomData(date) : "Date"}
                  </Text>
                </View>

                {dateErr !== "" && <Text style={styles.err}>{dateErr}</Text>}
                <View style={styles.titleContainer}>
                  <Text style={styles.titleText}>Job Summary</Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                >
                  <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => {
                      if (
                        dynamicInput.length > 0 &&
                        !dynamicInput[dynamicInput.length - 1].qty &&
                        !dynamicInput[dynamicInput.length - 1].description
                      ) {
                        // alert(
                        //   );
                        setdynamicInputErr(
                          "Please Enter All Value and then move to next Item Add !"
                        );
                      } else {
                        addInput();
                      }
                    }}
                  >
                    <Image style={styles.plusBtn} source={plus} />
                  </TouchableOpacity>
                </View>

                {dynamicInput.length > 0 && (
                  <View
                    style={[styles.dynamicInput, { flexDirection: "column" }]}
                  >
                    {dynamicInput.map((el, index) => (
                      <Fragment key={"dynamicInput" + index}>
                        <View style={styles.inputContainer}>
                          <TextInput
                            onChangeText={(txt) => {
                              updateValue(
                                "qty",
                                index,
                                txt.replace(/[^0-9]/g, "")
                              );
                              dynamicInputErr && setdynamicInputErr("");
                            }}
                            style={styles.quantityInput}
                            value={el.qty}
                            placeholder={"Quantity"}
                          />
                          <TextInput
                            onChangeText={(txt) => {
                              updateValue("description", index, txt);
                              dynamicInputErr && setdynamicInputErr("");
                            }}
                            style={styles.descriptionInput}
                            value={el.description}
                            placeholder={"Description"}
                          />
                        </View>
                      </Fragment>
                    ))}
                  </View>
                )}
                {dynamicInputErr !== "" && (
                  <Text style={styles.err}>{dynamicInputErr}</Text>
                )}

                <View style={styles.btnContainer}>
                  {/* <TouchableOpacity
                style={styles.commonBtn}
                onPress={() => navigation.navigate("TotalSummary")}
            >
                <Text style={styles.commonText}>Save</Text>
            </TouchableOpacity> */}
                  {/* <TouchableOpacity
                style={styles.commonBtn}
                onPress={() => navigation.navigate("SelectSummary")}
            >
                <Text style={styles.commonText}>Save</Text>
            </TouchableOpacity> */}
                  <TouchableOpacity style={styles.commonBtn} onPress={newJob}>
                    <Text style={styles.commonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Fragment>
    );
  }
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
  isJob: state.auth.isJob,
  isJobMsg: state.auth.isJobMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
  createNewJobHandler: (
    constructorName,
    projectName,
    weekProject,
    assignSupervisor,
    date,
    dynamicInput,
    token
  ) =>
    dispatch(
      createNewJobCreation(
        constructorName,
        projectName,
        weekProject,
        assignSupervisor,
        date,
        dynamicInput,
        token
      )
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(NewJob);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    height: "100%",
    width: "100%",
  },
  dateTimeContainer: {
    height: "10%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  refText: {
    fontSize: 12,
    color: "#96A8B2",
    fontFamily: "poppins-medium",
  },
  titleContainer: {
    height: "5%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  titleText: {
    color: "#4F4F4F",
    fontSize: 18,
    fontFamily: "poppins-semiBold",
  },
  formConatiner: {
    width: "100%",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  inputFieldContainer: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#96A8B2",
  },
  inputField: {
    height: 60,
    width: "100%",
    padding: 5,
    fontSize: 16,
    color: "#96A8B2",
    fontFamily: "poppins-regular",
  },
  inputContainer: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  err: { color: "red" },
  quantityInput: {
    width: "50%",
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: "#96A8B2",
    padding: 5,
    fontSize: 12,
    marginRight: 20,
    fontFamily: "poppins-regular",
  },
  descriptionInput: {
    width: "50%",
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: "#96A8B2",
    padding: 5,
    fontSize: 12,
    fontFamily: "poppins-regular",
  },
  addBtn: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#F6F9FB",
    borderWidth: 1,
    borderColor: "#E2ECF2",
    padding: 15,
    borderRadius: 14,
  },
  dynamicInput: {
    width: "100%",
    flexDirection: "row",
    marginTop: 30,
    position: "relative",
  },
  plusBtn: {
    width: 18,
    height: 18,
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
  btnContainer: {
    width: "100%",
    marginTop: 50,
    height: "15%",
    marginBottom: 20,
  },
});
