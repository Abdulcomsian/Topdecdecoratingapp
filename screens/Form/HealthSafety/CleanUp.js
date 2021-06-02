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
import { updateHealthReport } from "../../../Redux/action/summary/Summary";
import * as ImagePicker from "expo-image-picker";
import { AssetsSelector } from "expo-images-picker";

var plus = require("../../../assets/authScreen/plus.png");
const CleanUp = (props) => {
  const { navigation, token, isSuccess, isSuccessMsg, isJobId } = props;
  // const jobID = Math.floor(Math.random() * 100) + 1;
  const { plot_Id } = props.route.params;
  const jobID = plot_Id;
  console.log("Work Plot ID :", jobID);
  const tabId = props.route.params.tabName;
  console.log("Work Tab ID :", tabId);
  const [date, setDate] = useState("");
  const [dateSupervisor, setDateSupervisor] = useState("");
  const [mode, setMode] = useState("date");
  const [showDate, setShowDate] = useState(false);
  const [showSupervisor, setShowSupervisor] = useState(false);
  const [dynamicInput, setdynamicInput] = useState([]);
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
  const [projectComment, setProjectComment] = useState("");
  const cleanUpFormInsert = async () => {
    // console.log("Name Of Contractor :", contractorName);
    // console.log("Project Name :", projectName);
    // console.log("Name of Operatives :", nameOperatives);
    // console.log("Date :", date);
    // console.log("Dynamic Input :", dynamicInput);
    // console.log("Supervisor Sign :", supervisorSignature);
    // console.log("Supervisor Date :", dateSupervisor);
    try {
      if (
        contractorName != "" &&
        projectName != "" &&
        nameOperatives != "" &&
        date != "" &&
        dynamicInput != "" &&
        supervisorSignature !== "" &&
        dateSupervisor !== "" &&
        projectImagesComment != "" &&
        commentImages != ""
      ) {
        await props.createCleanUpHandler(
          contractorName,
          projectName,
          nameOperatives,
          date,
          dynamicInput,
          supervisorSignature,
          dateSupervisor,
          projectImagesComment,
          commentImages,
          jobID,
          tabId,
          token,
          props.route.params?.index
        );
        // props.updateHealthReport(props?.route?.params?.index);
        alert("Clean Up Insert SuccessFully !");
        props.navigation.pop();
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
    copyArr[showCompleteDate.index].completed_date =
      currentDate.toLocaleDateString();
    setdynamicInput(copyArr);
  };
  const [signature, setSignature] = useState({
    index: -1,
  });
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
            isVisible={showDate}
            testID="dateTimePicker"
            value={date}
            mode={Platform.OS === 'ios' ? "datetime" : "date"}
            display="default"
            onCancel={() => CancelPicker("date")}
            onConfirm={onDateChange}
            format="DD-MM-YYYY"
          />
          <DateTimePicker
            isVisible={showSupervisor}
            testID="dateTimePicker"
            value={dateSupervisor}
            mode={Platform.OS === 'ios' ? "datetime" : "date"}
            display="default"
            onCancel={() => CancelPicker("dateSupervisor")}
            onConfirm={onSupervisorChange}
            format="DD-MM-YYYY"
          />
          <DateTimePicker
            isVisible={showCompleteDate.isVisible}
            testID="dateTimePicker"
            value={dateComplete}
            mode={Platform.OS === 'ios' ? "datetime" : "date"}
            display="default"
            onCancel={() =>
              setShowCompleteDate({ isVisible: false, index: -1 })
            }
            onConfirm={onChange}
            format="DD-MM-YYYY"
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
                    <TouchableOpacity onPress={() => showDatepicker("Date")}>
                      <TextInput
                        editable={false}
                        value={date ? new Date(date).toLocaleDateString() : ""}
                        style={styles.inputField}
                        placeholder={"Date & Time of issue"}
                      />
                    </TouchableOpacity>
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
                    <View style={{ flexDirection: "column" }}>
                      {dynamicInput.length > 0 &&
                        dynamicInput.map((el, index) => (
                          <View style={styles.tableBody} key={index}>
                            <View style={styles.inputCleanBodyContainer}>
                              <TextInput
                                value={el.block}
                                onChangeText={(txt) =>
                                  updateValue("block", index, txt)
                                }
                                style={styles.bodyTextInput}
                                placeholder={"Block"}
                              />
                            </View>
                            <View style={styles.inputCleanBodyContainer}>
                              <TextInput
                                value={el.level}
                                onChangeText={(txt) =>
                                  updateValue("level", index, txt)
                                }
                                style={styles.bodyTextInput}
                                placeholder={"Level"}
                              />
                            </View>
                            <View style={styles.inputCleanBodyContainer}>
                              <TextInput
                                value={el.plot}
                                onChangeText={(txt) =>
                                  updateValue("plot", index, txt)
                                }
                                style={styles.bodyTextInput}
                                placeholder={"Plots"}
                              />
                            </View>
                            <View style={styles.inputCleanBodyContainer}>
                              <TextInput
                                value={el.area}
                                onChangeText={(txt) =>
                                  updateValue("area", index, txt)
                                }
                                style={styles.bodyTextInput}
                                placeholder={"Area"}
                              />
                            </View>
                            <View style={styles.inputCleanBodyContainer}>
                              <TextInput
                                value={el.items}
                                onChangeText={(txt) =>
                                  updateValue("items", index, txt)
                                }
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
                                {new Date(
                                  el.completed_date
                                ).toLocaleDateString()}
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
                    <View
                      style={{
                        width: "100%",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    >
                      <TouchableOpacity
                        style={[styles.addBtn, { marginRight: 20 }]}
                        onPress={() => {
                          if (
                            dynamicInput.length > 0 &&
                            !dynamicInput[dynamicInput.length - 1].block &&
                            !dynamicInput[dynamicInput.length - 1].level &&
                            !dynamicInput[dynamicInput.length - 1].plot &&
                            !dynamicInput[dynamicInput.length - 1].area &&
                            !dynamicInput[dynamicInput.length - 1].items &&
                            !dynamicInput[dynamicInput.length - 1].comment
                          ) {
                            alert(
                              "Please Enter All Value and then move to next Item Add !"
                            );
                          } else {
                            addCleanUpRow();
                          }
                        }}
                      >
                        <Image style={styles.plusBtn} source={plus} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.inputFieldContainer}>
                      <TouchableOpacity
                        onPress={() => setGetSign(true)}
                        style={styles.inputFieldContainer}
                      >
                        {supervisorSignature ? (
                          <Image
                            style={{
                              marginTop: 20,
                              height: 100,
                              width: 100,
                              backgroundColor: "gray",
                            }}
                            source={{ uri: supervisorSignature }}
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
                              ? new Date(dateSupervisor).toLocaleDateString()
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
                      Once completed, please file a copy in the Site Folder and
                      send a copy to our Head Office.{" "}
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
  createCleanUpHandler: (
    contractorName,
    projectName,
    nameOperatives,
    date,
    dynamicInput,
    supervisorSignature,
    dateSupervisor,
    projectImagesComment,
    commentImages,
    jobID,
    tabId,
    token,
    index
  ) =>
    dispatch(
      insertCleanUpForm(
        contractorName,
        projectName,
        nameOperatives,
        date,
        dynamicInput,
        supervisorSignature,
        dateSupervisor,
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
export default connect(mapStateToProps, mapDispatchToProps)(CleanUp);
