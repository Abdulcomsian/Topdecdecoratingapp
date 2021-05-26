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
import { insertMakeReadyForm } from "../../Redux/action/auth/authActionTypes";
import SignatureComponent from "../../components/SignatureComponent";
import { connect } from "react-redux";
import { AssetsSelector } from "expo-images-picker";
import * as ImagePicker from "expo-image-picker";

var plus = require("../../assets/authScreen/plus.png");
const MakeReady = (props) => {
  const { navigation, token, isMakeReady, isSuccessMsg, isJobId } = props;
  //const jobID = Math.floor(Math.random() * 100) + 1;
  const { plot_Id } = props.route.params;
  const jobID = plot_Id;
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
  const [dateWritten, setDateWritten] = useState(
    new Date().toLocaleDateString()
  );
  const [dateIssue, setDateIssue] = useState(new Date().toLocaleDateString());
  const [supervisorName, setSupervisorName] = useState("");
  const [projectComment, setProjectComment] = useState("");
  const [supervisorSignature, setSupervisorSignature] = useState("");
  const [dateComplete, setDateComplete] = useState(
    new Date().toLocaleDateString()
  );
  const [agentName, setAgentName] = useState("");
  const [agentSignature, setAgentSignature] = useState("");
  const [todayDate, setTodayDate] = useState(new Date().toLocaleDateString());
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
    index: -1,
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
  const makeReadyFormInsert = async () => {
    try {
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
        agentName != "" &&
        supervisorSignature != "" &&
        agentSignature != "" &&
        dateWritten != "" &&
        dateIssue != "" &&
        dynamicInput != "" &&
        dateComplete != "" &&
        todayDate != "" &&
        projectImagesComment != "" &&
        commentImages != ""
      ) {
        await props.createMakeReadyHandler(
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
          projectImagesComment,
          commentImages,
          jobID,
          tabId,
          token,
          props.route.params?.index
        );
        alert("Make Ready Sheet Insert SuccessFully !");
        navigation.goBack();
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
    if (type == "show") {
      setShow(false);
    } else if (type == "issue") {
      setShowIssue(false);
    } else if (type == "complete") {
      setShowComplete(false);
    } else {
      setShowToday(false);
    }
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
  // console.log("Pick Project :", commentImages);
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
            isVisible={show}
            testID="dateTimePicker"
            value={dateWritten}
            mode={mode}
            display="default"
            onCancel={() => CancelPicker("show")}
            onConfirm={onChange}
            format="DD-MM-YYYY"
          />

          <DateTimePicker
            isVisible={showIssue}
            testID="dateTimePicker"
            value={dateIssue}
            mode={mode}
            display="default"
            onCancel={() => CancelPicker("issue")}
            onConfirm={onIssueChange}
            format="DD-MM-YYYY"
          />

          <DateTimePicker
            isVisible={showComplete}
            testID="dateTimePicker"
            value={dateComplete}
            mode={mode}
            display="default"
            onConfirm={onCompleteChange}
            onCancel={() => CancelPicker("complete")}
            format="DD-MM-YYYY"
          />

          <DateTimePicker
            isVisible={showToday}
            testID="dateTimePicker"
            value={todayDate}
            mode={mode}
            display="default"
            onConfirm={onTodayDate}
            onCancel={() => CancelPicker("today")}
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
                  setAgentSignature(uri);
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
                <Text style={styles.titleText}>MAKE READY SHEET</Text>
              </View>
              <ScrollView style={{ height: "100%" }}>
                <View style={styles.formConatiner}>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      value={clientName}
                      onChangeText={(e) => setClientName(e)}
                      style={styles.inputField}
                      placeholder={"Client"}
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
                      value={block}
                      onChangeText={(e) => setBlock(e)}
                      style={styles.inputField}
                      placeholder={"Block"}
                    />
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      value={sheetNo}
                      onChangeText={(e) => setSheetNo(e)}
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
                      value={plotNumber}
                      onChangeText={(e) => setPlotNumber(e)}
                      style={styles.inputField}
                      placeholder={"Plot/Area Number"}
                    />
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      value={reason}
                      onChangeText={(e) => setReason(e)}
                      style={styles.inputField}
                      placeholder={"Reason"}
                    />
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <Text
                      onPress={() => showDatepicker("Date")}
                      style={styles.inputField}
                    >
                      {new Date(dateWritten).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <Text
                      onPress={() => showDatepicker("DateIssue")}
                      style={styles.inputField}
                    >
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
                      <Text style={styles.headerTitle}>
                        Contractor Corrected Yes/No
                      </Text>
                    </View>
                    <View style={styles.headerTitleView}>
                      <Text style={styles.headerTitle}>
                        Top Dec Completed Yes/No
                      </Text>
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
                                updateValue("photos", index, txt)
                              }
                              value={el.photos}
                              style={styles.bodyTextInput}
                              placeholder={"No of Photos"}
                            />
                          </View>
                          <View style={styles.inputBodyContainer}>
                            <TextInput
                              onChangeText={(txt) =>
                                updateValue("corrected", index, txt)
                              }
                              value={el.corrected}
                              style={styles.bodyTextInput}
                              placeholder={"Corrected"}
                            />
                          </View>
                          <View style={styles.inputBodyContainer}>
                            <TextInput
                              onChangeText={(txt) =>
                                updateValue("completed", index, txt)
                              }
                              value={el.completed}
                              style={styles.bodyTextInput}
                              placeholder={"Completed"}
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
                          !dynamicInput[dynamicInput.length - 1].completed &&
                          !dynamicInput[dynamicInput.length - 1].comments
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
                  <Text
                    style={{
                      paddingTop: 20,
                      paddingBottom: 20,
                      color: "#96A8B2",
                      fontSize: 12,
                    }}
                  >
                    I can confirm that I have checked these areas / units and
                    they are not ready for decoration (see description above)
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
                    {/* <TextInput style={styles.inputField} placeholder={"Signature"} editable={false} /> */}
                    {signature.normal.uri ? (
                      <Image
                        style={{
                          marginTop: 10,
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
                      onPress={() => showDatepicker("CompleteDate")}
                      style={styles.inputField}
                    >
                      {new Date(dateComplete).toLocaleDateString()}
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
                    I can confirm that correction have been made to all the
                    above areas and now ready for you to commence decoration.{" "}
                  </Text>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      value={agentName}
                      onChangeText={(e) => setAgentName(e)}
                      style={styles.inputField}
                      placeholder={"Site Agent (Print name)"}
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
                          marginTop: 10,
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
                        Agent Signature
                      </Text>
                    )}
                  </TouchableOpacity>
                  <View style={styles.inputFieldContainer}>
                    <Text
                      onPress={() => showDatepicker("TodayDate")}
                      style={styles.inputField}
                    >
                      {new Date(todayDate).toLocaleDateString()}
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
                      onPress={() => makeReadyFormInsert()}
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
    projectImagesComment,
    commentImages,
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
        projectImagesComment,
        commentImages,
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
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
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
