import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  CheckBox,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { AssetsSelector } from "expo-images-picker";
import { Text } from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";
import { insertHandOverForm } from "../../Redux/action/auth/authActionTypes";
import { connect } from "react-redux";
import SignatureComponent from "../../components/SignatureComponent";
import * as ImagePicker from "expo-image-picker";

var plus = require("../../assets/authScreen/plus.png");
var base_url = "https://airtimetesting.airtime4u.com/public/tajs/public/api/";
const HandOverForm = (props) => {
  const { navigation, token, isHandOver, isSuccessMsg, isJobId } = props;
  const { plot_Id } = props.route.params;
  const jobID = plot_Id;
  const tabId = props.route.params.tabName;
  const [dynamicInput, setdynamicInput] = useState([]);
  const [date, setDate] = useState("");
  const [dateIssue, setDateIssue] = useState("");
  const [dateComplete, setDateComplete] = useState("");
  const [todayDate, setTodayDate] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [showIssue, setShowIssue] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [showToday, setShowToday] = useState(false);
  const [contructorName, setContructorName] = useState("");
  const [projectComment, setProjectComment] = useState("");
  const [project, setProject] = useState("");
  const [block, setBlock] = useState("");
  const [reason, setReason] = useState("");
  const [plotNumber, setPlotNumber] = useState("");
  const [supervisorName, setSupervisorName] = useState("");
  const [supervisorSignature, setSupervisorSignature] = useState("");
  const [agentName, setAgentName] = useState("");
  const [agentSignature, setAgentSignature] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
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

  const [data, setData] = useState({
    area: "",
    description: "",
    completed: "",
    comments: "",
  });
  /* Add Dynamic Input value & Add New Row*/
  const addRow = () => {
    setdynamicInput((oldArray) => [
      ...oldArray,
      { area: "", description: "", completed: "", comments: "" },
    ]);
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
    try {
      if (
        contructorName != "" &&
        project != "" &&
        block != "" &&
        reason != "" &&
        plotNumber != "" &&
        supervisorName != "" &&
        dynamicInput &&
        agentName != "" &&
        supervisorSignature !== "" &&
        agentSignature !== "" &&
        projectImagesComment != "" &&
        commentImages != ""
      ) {
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
          projectImagesComment,
          commentImages,
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
    } catch (err) {
      alert(err.message);
    }
  };
  const [projectImages, setProjectImages] = useState("");
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
    console.log("Index :", index);
    setSignature({ ...signature, index: index });
    setIsShow(true);
  };

  const _textStyle = {
    color: "white",
  };
  const _buttonStyle = {
    backgroundColor: "#1073AC",
    borderRadius: 5,
  };
  // console.log("Project Iamges :",projectImages)

  const [projectImagesComment, setProjectImagesComment] = useState([]);
  const [commentImages, setCommentImages] = useState([]);
  const addImagesCommentRow = () => {
    setProjectImagesComment((oldArray) => [
      ...oldArray,
      { image: "", comment: "" },
    ]);
  };
  const updateProjectCommentValue = (key, index, value) => {
    console.log(index);
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
            isVisible={show}
            testID="dateTimePicker"
            value={date}
            mode={Platform.OS === "ios" ? "date" : "date"}
            display="default"
            onCancel={() => {}}
            onConfirm={onChange}
            format="DD-MM-YYYY"
          />
          <DateTimePicker
            isVisible={showIssue}
            testID="dateTimePicker"
            value={dateIssue}
            mode={Platform.OS === "ios" ? "date" : "date"}
            display="default"
            onCancel={() => {}}
            onConfirm={onIssueChange}
            format="DD-MM-YYYY"
          />

          <DateTimePicker
            isVisible={showComplete}
            testID="dateTimePicker"
            value={dateComplete}
            mode={Platform.OS === "ios" ? "date" : "date"}
            display="default"
            onCancel={() => {}}
            onConfirm={onCompleteChange}
            format="DD-MM-YYYY"
          />
          <DateTimePicker
            isVisible={showToday}
            testID="dateTimePicker"
            value={todayDate}
            mode={Platform.OS === "ios" ? "date" : "date"}
            display="default"
            onCancel={() => {}}
            onConfirm={onTodayDate}
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
                <Text style={styles.titleText}>HAND OVER SHEET</Text>
              </View>
              <ScrollView style={{ width: "100%" }}>
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
                      value={project}
                      onChangeText={(e) => setProject(e)}
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
                      value={reason}
                      onChangeText={(e) => setReason(e)}
                      style={styles.inputField}
                      placeholder={"Reason"}
                    />
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      value={plotNumber}
                      onChangeText={(e) =>
                        setPlotNumber(e.replace(/[^0-9]/g, ""))
                      }
                      style={styles.inputField}
                      placeholder={"Plot/Area Number"}
                    />
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TouchableOpacity
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
                      onPress={() => showDatepicker("Date")}
                    >
                      <Text
                        style={{
                          width: "100%",
                          fontSize: 12,
                          color: "#96A8B2",
                          fontFamily: "poppins-regular",
                        }}
                      >
                        {date ? date : "Date Written"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TouchableOpacity
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
                      onPress={() => showDatepicker("DateIssue")}
                    >
                      <Text
                        style={{
                          width: "100%",
                          fontSize: 12,
                          color: "#96A8B2",
                          fontFamily: "poppins-regular",
                        }}
                      >
                        {dateIssue ? dateIssue : "Date Issue to Site Agent"}
                      </Text>
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
                    The decoration to the following Areas/Units have been
                    completed and are now ready for your inspection.{" "}
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
                    <TouchableOpacity
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
                      onPress={() => showDatepicker("CompleteDate")}
                    >
                      <Text
                        style={{
                          width: "100%",
                          fontSize: 12,
                          color: "#96A8B2",
                          fontFamily: "poppins-regular",
                        }}
                      >
                        {dateComplete ? dateComplete : "Date Work Completed"}
                      </Text>
                    </TouchableOpacity>
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
                      <Text style={styles.headerTitle}>
                        Contractors COMMENTS{" "}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    {dynamicInput.length > 0 &&
                      dynamicInput.map((el, index) => (
                        <View style={styles.tableBody} key={index}>
                          <View style={styles.inputBodyContainer}>
                            <TextInput
                              value={el.area}
                              onChangeText={(txt) =>
                                updateValue("area", index, txt)
                              }
                              style={styles.bodyTextInput}
                              placeholder={"Area/unit"}
                            />
                          </View>
                          <View style={styles.inputBodyContainer}>
                            <TextInput
                              value={el.description}
                              onChangeText={(txt) =>
                                updateValue("description", index, txt)
                              }
                              style={styles.bodyTextInput}
                              placeholder={"Description"}
                            />
                          </View>
                          <View style={styles.inputBodyContainer}>
                            <TextInput
                              value={el.completed}
                              onChangeText={(txt) =>
                                updateValue("completed", index, txt)
                              }
                              style={styles.bodyTextInput}
                              placeholder={"Yes / No"}
                            />
                          </View>
                          <View style={styles.inputBodyContainer}>
                            <TextInput
                              value={el.comments}
                              onChangeText={(txt) =>
                                updateValue("comments", index, txt)
                              }
                              style={styles.bodyTextInput}
                              placeholder={"Comments"}
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
                    I can confirm by signing this form that I have inspect the
                    above Areas/Units and they are completed.{" "}
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
                    <TouchableOpacity
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
                      onPress={() => showDatepicker("TodayDate")}
                    >
                      <Text
                        style={{
                          width: "100%",
                          fontSize: 12,
                          color: "#96A8B2",
                          fontFamily: "poppins-regular",
                        }}
                      >
                        {todayDate ? todayDate : "Date"}
                      </Text>
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
                      onPress={() => handOverFormInsert()}
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
    projectImagesComment,
    commentImages,
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
        projectImagesComment,
        commentImages,
        tabId,
        jobID,
        token,
        index
      )
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(HandOverForm);
const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "poppins-semiBold",
  },
  mainContainer: {
    flex: 1,
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
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 8,
    textAlign: "center",
    fontFamily: "poppins-bold",
  },
  inputBodyContainer: {
    width: "25%",
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
    marginBottom: 80,
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
