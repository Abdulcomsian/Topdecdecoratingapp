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
import { insertSnaggingForm } from "../../Redux/action/auth/authActionTypes";
import { connect } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { AssetsSelector } from "expo-images-picker";

var plus = require("../../assets/authScreen/plus.png");
const WrantySannging = (props) => {
  const { navigation, token, isSuccess, isSuccessMsg, isJobId } = props;
  const { plot_Id } = props.route.params;
  const jobID = plot_Id;
  const tabId = props.route.params.tabName;
  const [dateIssue, setDateIssue] = useState(new Date().toLocaleDateString());
  const [dateComplete, setDateComplete] = useState(
    new Date().toLocaleDateString()
  );
  const [dateSnaggingIssue, setDateSnaggingIssue] = useState(
    new Date().toLocaleDateString()
  );
  const [dateSnaggingComplete, setDateSnaggingComplete] = useState(
    new Date().toLocaleDateString()
  );
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
  const [projectComment, setProjectComment] = useState("");

  const [dataSnag, setDataSnag] = useState({
    location: "",
    description: "",
  });
  const [dataCompletedSnag, setDataCompletetedSnag] = useState({
    location: "",
    description: "",
  });
  const [signature, setSignature] = useState({
    index: -1,
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
  const onIssueChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowIssue(false);
    setDateIssue(new Date(currentDate).toLocaleDateString());
  };
  /**Completed Date */
  const onCompleteChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowComplete(false);
    setDateComplete(new Date(currentDate).toLocaleDateString());
  };
  /**Snagging Issue Date */
  const onSnaggingIssueChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowSnaggingIssue(false);
    setDateSnaggingIssue(new Date(currentDate).toLocaleDateString());
  };
  /**Snagging Completed Date */
  const onSnaggingCompleteChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowSnaggingComplete(false);
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
  const snaggingFormInsert = async () => {
    try {
      if (
        block != "" &&
        plotNumber != "" &&
        wrrantySnagging != "" &&
        painterName != "" &&
        noOfPage != "" &&
        totalHours != "" &&
        projectImagesComment != "" &&
        commentImages != ""
      ) {
        await props.createSnaggingHandler(
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
          projectImagesComment,
          commentImages,
          jobID,
          tabId,
          token,
          props.route.params?.index
        );
        alert("Wrannty Sangging Insert SuccessFully !");
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
      setShowIssue(false);
    } else if (type == "complete") {
      setShowComplete(false);
    } else if (type == "dateSnaggingIssue") {
      setShowSnaggingIssue(false);
    } else {
      setShowSnaggingComplete(false);
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
            isVisible={showSnaggingIssue}
            testID="dateTimePicker"
            value={dateSnaggingIssue}
            mode={mode}
            display="default"
            onConfirm={onSnaggingIssueChange}
            onCancel={() => CancelPicker("dateSnaggingIssue")}
            format="DD-MM-YYYY"
          />
          <DateTimePicker
            isVisible={showSnaggingComplete}
            testID="dateTimePicker"
            value={dateSnaggingComplete}
            mode={mode}
            display="default"
            onConfirm={onSnaggingCompleteChange}
            onCancel={() => CancelPicker("dateSnaggingComplete")}
            format="DD-MM-YYYY"
          />
          <ScrollView style={{ height: "100%" }}>
            <View style={styles.formConatiner}>
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
                  placeholder={"Plot No"}
                />
              </View>
              <View style={styles.inputFieldContainer}>
                <Text
                  onPress={() => showDatepicker("DateIssue")}
                  style={styles.inputField}
                >
                  {new Date(dateIssue).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.inputFieldContainer}>
                <Text
                  onPress={() => showDatepicker("CompleteDate")}
                  style={styles.inputField}
                >
                  {new Date(dateComplete).toLocaleDateString()}
                </Text>
              </View>

              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>
                  Snagging to be completed within 24 hours
                </Text>
              </View>
              <View style={styles.inputFieldContainer}>
                <TextInput
                  value={wrrantySnagging}
                  onChangeText={(e) => setWrrantySnagging(e)}
                  style={styles.inputField}
                  placeholder={"Pre- warranty snagging"}
                />
              </View>
              <View style={styles.inputFieldContainer}>
                <TextInput
                  value={painterName}
                  onChangeText={(e) => setPainterName(e)}
                  style={styles.inputField}
                  placeholder={"Painter’s name"}
                />
              </View>
              <View style={styles.inputFieldContainer}>
                <TextInput
                  value={noOfPage}
                  onChangeText={(e) => setNoOfPage(e)}
                  style={styles.inputField}
                  placeholder={"No of page"}
                />
              </View>
              <View style={styles.tableViewContainer}>
                <View style={styles.tableHeader}>
                  <View style={styles.headerTitleView}>
                    <Text style={styles.headerTitle}>Location</Text>
                  </View>
                  <View style={styles.headerTitleView}>
                    <Text style={styles.headerTitle}>Snag Description</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "column" }}>
                  {dynamicSnagInput.length > 0 &&
                    dynamicSnagInput.map((el, index) => (
                      <View style={styles.tableBody} key={index}>
                        <View style={styles.inputBodyContainer}>
                          <TextInput
                            value={el.location}
                            onChangeText={(txt) =>
                              updateValue("location", index, txt)
                            }
                            style={styles.bodyTextInput}
                            placeholder={"Location"}
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
                      </View>
                    ))}
                </View>
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
                      dynamicSnagInput.length > 0 &&
                      !dynamicSnagInput[dynamicSnagInput.length - 1].location &&
                      !dynamicSnagInput[dynamicSnagInput.length - 1].description
                    ) {
                      alert(
                        "Please Enter All Value and then move to next Item Add !"
                      );
                    } else {
                      addSnagRow();
                    }
                  }}
                >
                  <Image style={styles.plusBtn} source={plus} />
                </TouchableOpacity>
              </View>
              <View style={styles.inputFieldContainer}>
                <Text
                  onPress={() => showDatepicker("SnaggingIssue")}
                  style={styles.inputField}
                >
                  {new Date(dateSnaggingIssue).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.inputFieldContainer}>
                <Text
                  onPress={() => showDatepicker("SnaggingCompleted")}
                  style={styles.inputField}
                >
                  {new Date(dateSnaggingComplete).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.inputFieldContainer}>
                <TextInput
                  value={totalHours}
                  onChangeText={(e) => setTotalHours(e)}
                  style={styles.inputField}
                  placeholder={"Hours"}
                />
              </View>
              <View style={styles.tableViewContainer}>
                <View style={styles.tableHeader}>
                  <View style={styles.headerTitleView}>
                    <Text style={styles.headerTitle}>Location</Text>
                  </View>
                  <View style={styles.headerTitleView}>
                    <Text style={styles.headerTitle}>Snag Description</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "column" }}>
                  {dynamicSnagCompletedInput.length > 0 &&
                    dynamicSnagCompletedInput.map((el, index) => (
                      <View style={styles.tableBody} key={index}>
                        <View style={styles.inputBodyContainer}>
                          <TextInput
                            value={el.location}
                            onChangeText={(txt) =>
                              updateCompletedValue("location", index, txt)
                            }
                            style={styles.bodyTextInput}
                            placeholder={"Location"}
                          />
                        </View>
                        <View style={styles.inputBodyContainer}>
                          <TextInput
                            value={el.description}
                            onChangeText={(txt) =>
                              updateCompletedValue("description", index, txt)
                            }
                            style={styles.bodyTextInput}
                            placeholder={"Description"}
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
                  }}
                >
                  <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => {
                      if (
                        dynamicSnagCompletedInput.length > 0 &&
                        !dynamicSnagCompletedInput[
                          dynamicSnagCompletedInput.length - 1
                        ].location &&
                        !dynamicSnagCompletedInput[
                          dynamicSnagCompletedInput.length - 1
                        ].description
                      ) {
                        alert(
                          "Please Enter All Value and then move to next Item Add !"
                        );
                      } else {
                        addSnagCompletedRow();
                      }
                    }}
                  >
                    <Image style={styles.plusBtn} source={plus} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{ marginBottom: 10, fontFamily: "poppins-semiBold" }}
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
                        !projectImagesComment[projectImagesComment.length - 1]
                          .image &&
                        !projectImagesComment[projectImagesComment.length - 1]
                          .comment
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
                              <Text style={styles.textStyle}>Add Image</Text>
                            </TouchableOpacity>
                          </View>
                        )}

                        <View style={{ width: "50%" }}>
                          <TextInput
                            value={el.comment}
                            onChangeText={(txt) =>
                              updateProjectCommentValue("comment", index, txt)
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
                  onPress={() => snaggingFormInsert()}
                >
                  <Text style={styles.commonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
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
    projectImagesComment,
    commentImages,
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
        projectImagesComment,
        commentImages,
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
    marginBottom: 10,
  },
  headerTitleView: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: "poppins-bold",
  },
  inputBodyContainer: {
    width: "50%",
  },
  bodyTextInput: {
    width: "90%",
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
    marginRight: 20,
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
