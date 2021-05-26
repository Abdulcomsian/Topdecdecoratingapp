import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  CheckBox,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Text } from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";
import { insertRemedialForm } from "../../Redux/action/auth/authActionTypes";
import { connect } from "react-redux";
import SignatureComponent from "../../components/SignatureComponent";
import { AssetsSelector } from "expo-images-picker";
import * as ImagePicker from "expo-image-picker";

var plus = require("../../assets/authScreen/plus.png");
const RemedialWork = (props) => {
  const { navigation, token, isSuccessMsg, isRemedial, isJobId } = props;
  const { plot_Id } = props.route.params;
  const jobID = plot_Id;
  const tabId = props.route.params.tabName;
  const [data, setData] = useState({
    area: "",
    description: "",
    photo: "",
  });
  const [dynamicInput, setdynamicInput] = useState([]);
  const [dateIssue, setIssueDate] = useState(new Date().toLocaleDateString());
  const [dateSupervisor, setSupervisorDate] = useState(
    new Date().toLocaleDateString()
  );
  const [dateManager, setManagerDate] = useState(
    new Date().toLocaleDateString()
  );
  const [showIssue, setIssueShow] = useState(false);
  const [showSupervisor, setSupervisorShow] = useState(false);
  const [showManager, setManagerShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [contructorName, setContructorName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [operative, setOperative] = useState("");
  const [sheetNumber, setSheetNumber] = useState("");
  const [pageOff, setPageOff] = useState("");
  const [pageSecond, setPageSecond] = useState("");
  const [block, setBlock] = useState("");
  const [plotNumber, setPlotNumber] = useState("");
  const [instructionNumber, setInstructionNumber] = useState("");
  const [reasonWork, setReasonWork] = useState("");
  const [totalHours, setTotalHours] = useState("");
  const [supervisorName, setSupervisorName] = useState("");
  const [supervisorSignature, setSupervisorSignature] = useState("");
  const [managerName, setManagerName] = useState("");
  const [managerSignature, setManagerSignature] = useState("");
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
    index: -1,
  });

  /**Issue Date */
  const onIssueChange = (selectedDate) => {
    const currentDate = selectedDate;
    setIssueShow(false);
    setIssueDate(new Date(currentDate).toLocaleDateString());
  };
  /**Supervisor Date */
  const onSupervisorDateChange = (selectedDate) => {
    const currentDate = selectedDate;
    setSupervisorShow(false);
    setSupervisorDate(new Date(currentDate).toLocaleDateString());
  };
  /**Manager Date */
  const onManagerDateChange = (selectedDate) => {
    const currentDate = selectedDate;
    setManagerShow(false);
    setManagerDate(new Date(currentDate).toLocaleDateString());
  };
  const showMode = (currentMode, type) => {
    if (type == "IssueDate") {
      setIssueShow(true);
      setMode(currentMode);
    } else if (type == "SupervisorDate") {
      setSupervisorShow(true);
      setMode(currentMode);
    } else {
      setManagerShow(true);
      setMode(currentMode);
    }
  };
  const showDatepicker = (type) => {
    console.log(type);
    if (type == "DateIssue") {
      showMode("date", "IssueDate");
    } else if (type == "SupervisorDate") {
      showMode("date", "SupervisorDate");
    } else {
      showMode("date", "ManagerDate");
    }
  };
  const addRow = () => {
    setdynamicInput((oldArray) => [...oldArray, data]);
    setData({ area: "", description: "", photo: "" });
  };

  const updateValue = (key, index, value) => {
    let preData = [...dynamicInput];
    preData[index][key] = value;
    setdynamicInput(preData);
  };
  const [projectComment, setProjectComment] = useState("");
  const remedialFormInsert = async () => {
    try {
      if (
        contructorName != "" &&
        projectName != "" &&
        operative != "" &&
        sheetNumber != "" &&
        pageOff != "" &&
        pageSecond != "" &&
        block != "" &&
        plotNumber != "" &&
        instructionNumber != "" &&
        reasonWork != "" &&
        totalHours != "" &&
        supervisorName != "" &&
        managerName != "" &&
        managerSignature != "" &&
        supervisorSignature != "" &&
        projectImagesComment != "" &&
        commentImages != ""
      ) {
        await props.createRemedialHandler(
          contructorName,
          projectName,
          operative,
          sheetNumber,
          pageOff,
          pageSecond,
          block,
          plotNumber,
          dateIssue,
          instructionNumber,
          reasonWork,
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
          jobID,
          tabId,
          token,
          props.route.params?.index
        );
        alert("Remedial Work Sheet Insert SuccessFully !");
        navigation.pop();
      } else {
        alert("Please Insert All Fields CareFully !");
        return false;
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const CancelPicker = (type) => {
    console.log(type);
    if (type == "issue") {
      setIssueShow(false);
    } else if (type == "supervisorDate") {
      setSupervisorShow(false);
    } else setShowComplete(false);
  };
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
              maxSelections: 3,
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
            isVisible={showIssue}
            testID="dateTimePicker"
            value={dateIssue}
            mode={mode}
            display="default"
            onConfirm={onIssueChange}
            onCancel={() => CancelPicker("issue")}
            format="DD-MM-YYYY"
          />

          <DateTimePicker
            isVisible={showSupervisor}
            testID="dateTimePicker"
            value={dateSupervisor}
            mode={mode}
            display="default"
            onConfirm={onSupervisorDateChange}
            onCancel={() => CancelPicker("supervisorDate")}
            format="DD-MM-YYYY"
          />

          <DateTimePicker
            isVisible={showManager}
            testID="dateTimePicker"
            value={dateManager}
            mode={mode}
            display="default"
            onConfirm={onManagerDateChange}
            onCancel={() => CancelPicker("managerDate")}
            format="DD-MM-YYYY"
          />
          {signature.bool ? (
            <SignatureComponent
              returnImage={(uri) => {
                if (signature.agent.bool) {
                  setSignature({
                    ...signature,
                    agent: { ...signature.agent, bool: false, uri: uri },
                    bool: false,
                  });
                  setManagerSignature(uri);
                } else {
                  setSignature({
                    ...signature,
                    normal: { ...signature.normal, bool: false, uri: uri },
                    bool: false,
                  });
                  setSupervisorSignature(uri);
                }
              }}
            />
          ) : (
            <>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>REMEDIAL WORK SHEET</Text>
              </View>
              <ScrollView style={{ width: "100%", marginBottom: 80 }}>
                <View style={styles.formConatiner}>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      value={contructorName}
                      onChangeText={(e) => setContructorName(e)}
                      style={styles.inputField}
                      placeholder={"Main Contractor Name"}
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
                      value={operative}
                      onChangeText={(e) => setOperative(e)}
                      style={styles.inputField}
                      placeholder={"Operative"}
                    />
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      value={sheetNumber}
                      onChangeText={(e) => setSheetNumber(e)}
                      style={styles.inputField}
                      placeholder={"Sheet Number"}
                    />
                  </View>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "40%" }}>
                      <TextInput
                        value={pageOff}
                        onChangeText={(e) => setPageOff(e)}
                        style={styles.inputField}
                        placeholder={"Page"}
                      />
                    </View>
                    <Text
                      style={{
                        color: "#4F4F4F",
                        fontSize: 12,
                        fontFamily: "poppins-semiBold",
                      }}
                    >
                      Off
                    </Text>
                    <View style={{ width: "40%" }}>
                      <TextInput
                        value={pageSecond}
                        onChangeText={(e) => setPageSecond(e)}
                        style={styles.inputField}
                        placeholder={"Page"}
                      />
                    </View>
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      value={block}
                      onChangeText={(e) => setBlock(e)}
                      style={styles.inputField}
                      placeholder={"Block"}
                    />
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      value={plotNumber}
                      onChangeText={(e) => setPlotNumber(e)}
                      style={styles.inputField}
                      placeholder={"Plot/Area Number"}
                    />
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <Text
                      onPress={() => showDatepicker("DateIssue")}
                      style={[styles.inputField, { paddingTop: 15 }]}
                    >
                      {new Date(dateIssue).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      value={instructionNumber}
                      onChangeText={(e) => setInstructionNumber(e)}
                      style={styles.inputField}
                      placeholder={"Site Instruction Number"}
                    />
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      value={reasonWork}
                      onChangeText={(e) => setReasonWork(e)}
                      style={styles.inputField}
                      placeholder={" Reason for Work"}
                    />
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
                      <Text style={styles.headerTitle}>NUMBER OF PHOTO</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    {dynamicInput.length > 0 &&
                      dynamicInput.map((el, index) => (
                        <View style={styles.tableBody} key={index}>
                          <View style={styles.inputBodyContainer}>
                            <TextInput
                              onChangeText={(txt) =>
                                updateValue("area", index, txt)
                              }
                              value={el.area}
                              style={styles.bodyTextInput}
                              placeholder={"Area/unit"}
                            />
                          </View>
                          <View style={styles.inputBodyContainer}>
                            <TextInput
                              onChangeText={(txt) =>
                                updateValue("description", index, txt)
                              }
                              value={el.description}
                              style={styles.bodyTextInput}
                              placeholder={"Description"}
                            />
                          </View>
                          <View style={styles.inputBodyContainer}>
                            <TextInput
                              onChangeText={(txt) =>
                                updateValue("photo", index, txt)
                              }
                              value={el.photo}
                              style={styles.bodyTextInput}
                              placeholder={"No of photo"}
                            />
                          </View>
                        </View>
                      ))}
                  </View>
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
                          !dynamicInput[dynamicInput.length - 1].area &&
                          !dynamicInput[dynamicInput.length - 1].description &&
                          !dynamicInput[dynamicInput.length - 1].photo
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
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      value={totalHours}
                      onChangeText={(e) => setTotalHours(e)}
                      style={styles.inputField}
                      placeholder={"Hours"}
                    />
                  </View>
                  <Text
                    style={{
                      paddingTop: 20,
                      paddingBottom: 20,
                      color: "#96A8B2",
                      fontSize: 12,
                    }}
                  >
                    I can confirm by signing this form that I have inspect the
                    above Areas/Units and they are completed.{" "}
                  </Text>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      value={supervisorName}
                      onChangeText={(e) => setSupervisorName(e)}
                      style={styles.inputField}
                      placeholder={"Supervisor"}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      setSignature({
                        ...signature,
                        bool: true,
                        normal: { ...signature.normal, bool: true },
                        agent: { ...signature.agent, bool: false },
                      })
                    }
                    style={styles.inputFieldContainer}
                  >
                    {signature.normal.uri ? (
                      <Image
                        style={{
                          marginTop: 20,
                          height: 100,
                          width: 100,
                          backgroundColor: "gray",
                        }}
                        source={{ uri: signature.normal.uri }}
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
                  <View style={styles.inputFieldContainer}>
                    <Text
                      onPress={() => showDatepicker("SupervisorDate")}
                      style={[styles.inputField, { paddingTop: 15 }]}
                    >
                      {new Date(dateSupervisor).toLocaleDateString()}
                    </Text>
                  </View>
                  <Text
                    style={{
                      paddingTop: 20,
                      paddingBottom: 20,
                      color: "#96A8B2",
                      fontSize: 12,
                    }}
                  >
                    I have checked these areas / units and I can confirm they
                    are remedial work.
                  </Text>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      value={managerName}
                      onChangeText={(e) => setManagerName(e)}
                      style={styles.inputField}
                      placeholder={"Site Manager (Print name)"}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      setSignature({
                        ...signature,
                        bool: true,
                        normal: { ...signature.normal, bool: false },
                        agent: { ...signature.agent, bool: true },
                      })
                    }
                    style={styles.inputFieldContainer}
                  >
                    {signature.agent.uri ? (
                      <Image
                        style={{
                          marginTop: 20,
                          height: 100,
                          width: 100,
                          backgroundColor: "gray",
                        }}
                        source={{ uri: signature.agent.uri }}
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
                  <View style={styles.inputFieldContainer}>
                    <Text
                      onPress={() => showDatepicker("ManagerDate")}
                      style={[styles.inputField, { paddingTop: 15 }]}
                    >
                      {new Date(dateManager).toLocaleDateString()}
                    </Text>
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
                            style={[styles.tableBody, { marginBottom: 20 }]}
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
                      height: ".5%",
                      marginBottom: 20,
                      marginTop: 20,
                    }}
                  ></View>
                  <View style={styles.btnContainer}>
                    <TouchableOpacity
                      style={styles.commonBtn}
                      onPress={() => remedialFormInsert()}
                    >
                      <Text style={styles.commonText}>Save</Text>
                    </TouchableOpacity>
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
  isRemedial: state.auth.isRemedial,
  isSuccessMsg: state.auth.isSuccessMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
  createRemedialHandler: (
    contructorName,
    projectName,
    operative,
    sheetNumber,
    pageOff,
    pageSecond,
    block,
    plotNumber,
    dateIssue,
    instructionNumber,
    reasonWork,
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
    jobID,
    tabId,
    token,
    index
  ) =>
    dispatch(
      insertRemedialForm(
        contructorName,
        projectName,
        operative,
        sheetNumber,
        pageOff,
        pageSecond,
        block,
        plotNumber,
        dateIssue,
        instructionNumber,
        reasonWork,
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
        jobID,
        tabId,
        token,
        index
      )
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(RemedialWork);
const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#1073AC",
  },
  buttonClose: {
    backgroundColor: "#1073AC",
  },
  textStyle: {
    color: "white",
    textAlign: "center",
    fontFamily: "poppins-semiBold",
    fontSize: 10,
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
    width: "33.3%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 8,
    textAlign: "center",
    fontFamily: "poppins-bold",
  },
  inputBodyContainer: {
    width: "33.3%",
    justifyContent: "center",
    alignItems: "center",
  },
  bodyTextInput: {
    width: "90%",
    borderBottomWidth: 1,
    borderBottomColor: "#96A8B2",
    padding: 5,
    fontSize: 10,
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
