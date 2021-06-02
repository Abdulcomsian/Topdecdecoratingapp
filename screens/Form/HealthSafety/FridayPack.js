import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  ScrollView,
  CheckBox,
  TouchableOpacity,
  Image,
} from "react-native";
import { Text } from "native-base";
import styles from "../../../assets/css/styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { insertFridayPackForm } from "../../../Redux/action/auth/authActionTypes";
import { connect } from "react-redux";
import SignatureComponent from "../../../components/SignatureComponent";
import { updateHealthReport } from "../../../Redux/action/summary/Summary";
import * as ImagePicker from "expo-image-picker";
import { AssetsSelector } from "expo-images-picker";

var plus = require("../../../assets/authScreen/plus.png");
const FridayPack = (props) => {
  const { navigation, token, isSuccess, isSuccessMsg, isJobId } = props;
  // const jobID = Math.floor(Math.random() * 100) + 1;
  const { plot_Id } = props.route.params;
  const jobID = plot_Id;
  console.log("Work Plot ID :", jobID);
  const tabId = props.route.params.tabName;
  console.log("Work Tab ID :", tabId);
  const [getSign, setGetSign] = useState(false);
  const [documentRow, setDocumentRow] = useState([
    {
      title: "Record of on-site Decorators (Name & CSCS Card Details)",
      yes: false,
      no: false,
      other: false,
      commet: "",
    },
    {
      title: "Method Statement Register",
      yes: false,
      no: false,
      other: false,
      commet: "",
    },
    {
      title: "Safe Start Briefing",
      yes: false,
      no: false,
      other: false,
      commet: "",
    },
    {
      title: "Housekeeping Checklist",
      yes: false,
      no: false,
      other: false,
      commet: "",
    },
    {
      title: "Electrical Equipment Record",
      yes: false,
      no: false,
      other: false,
      commet: "",
    },
    {
      title: "Harmful Substance Register",
      yes: false,
      no: false,
      other: false,
      commet: "",
    },
    {
      title: "Health and Safety Inspection and Monitoring Form",
      yes: false,
      no: false,
      other: false,
      commet: "",
    },
    {
      title: "Personal Protective Equipment Issued Record",
      yes: false,
      no: false,
      other: false,
      commet: "",
    },
    {
      title: "PUWER Inspection Checklist / Register",
      yes: false,
      no: false,
      other: false,
      commet: "",
    },
    {
      title: "Toolbox Talk (Please list topic discussed)",
      yes: false,
      no: false,
      other: false,
      commet: "",
    },
    {
      title: "Working at Height Equipment / Inventory Control  ",
      yes: false,
      no: false,
      other: false,
      commet: "",
    },
    {
      title: "Ladders and Podium Step Inspection Checklist ",
      yes: false,
      no: false,
      other: false,
      commet: "",
    },
  ]);
  const [date, setDate] = useState("");
  const [show, setShow] = useState(false);
  const [contractorName, setContractorName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [weekEnding, setWeekEnding] = useState("");
  const [furtherComments, setFurtherComments] = useState("");
  const [supervisorSign, setSupervisorSign] = useState("");
  const checkedValue = (value, index, key) => {
    console.log("here !");
    if (key == "no") {
      let copyArray = [...documentRow];
      copyArray[index][key] = true;
      copyArray[index]["yes"] = false;
      copyArray[index]["other"] = false;
      setDocumentRow(copyArray);
    } else if (key == "yes") {
      let copyArray = [...documentRow];
      copyArray[index][key] = true;
      copyArray[index]["no"] = false;
      copyArray[index]["other"] = false;
      setDocumentRow(copyArray);
    } else {
      let copyArray = [...documentRow];
      copyArray[index][key] = true;
      copyArray[index]["no"] = false;
      copyArray[index]["yes"] = false;
      setDocumentRow(copyArray);
    }
  };
  const updateCommentValue = (key, index, value) => {
    let preData = [...documentRow];
    preData[index][key] = value;
    setDocumentRow(preData);
  };
  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(new Date(currentDate).toLocaleDateString());
  };
  const showDatepicker = () => {
    setShow(true);
  };
  const [projectComment, setProjectComment] = useState("");
  const fridayPackFormInsert = async () => {
    console.log("Name Of Contractor :", contractorName);
    console.log("Project Name :", projectName);
    console.log("Supervisor Sign :", supervisorSign);
    console.log("Document Row :", documentRow);
    console.log("Week Ending :", weekEnding);
    console.log("further Comments :", furtherComments);
    console.log("Date :", date);
    try {
      if (
        contractorName != "" &&
        projectName != "" &&
        supervisorSign != "" &&
        documentRow != "" &&
        weekEnding != "" &&
        furtherComments !== "" &&
        date !== "" &&
        projectImagesComment != "" &&
        commentImages != ""
      ) {
        await props.createFridayPackHandler(
          contractorName,
          projectName,
          supervisorSign,
          documentRow,
          weekEnding,
          date,
          furtherComments,
          projectImagesComment,
          commentImages,
          jobID,
          tabId,
          token,
          props.route.params?.index
        );
        // props.updateHealthReport(props?.route?.params?.index);
        alert("Friday Pack Insert SuccessFully !");
        props.navigation.pop();
      } else {
        alert("Please Insert All Fields CareFully !");
        return false;
      }
    } catch (err) {
      alert(err.message);
    }
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
          <DateTimePickerModal
            isVisible={show}
            testID="dateTimePicker"
            value={date}
            mode={Platform.OS === 'ios' ? "datetime" : "date"}
            display="default"
            onConfirm={onChange}
            onCancel={() => setShow(false)}
            format="DD-MM-YYYY"
          />
          {getSign ? (
            <SignatureComponent
              returnImage={(uri) => {
                setSupervisorSign(uri);
                setGetSign(false);
              }}
            />
          ) : (
            <>
              <View
                style={{
                  paddingTop: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.titleText}>FRIDAY PACK</Text>
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
                      style={styles.inputField}
                      placeholder={"Project"}
                      value={projectName}
                      onChangeText={(e) => setProjectName(e)}
                    />
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      style={styles.inputField}
                      placeholder={"Week Ending"}
                      value={weekEnding}
                      onChangeText={(e) => setWeekEnding(e)}
                    />
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    {documentRow.map((item, index) => (
                      <View
                        style={styles.detailsInstructionContactView}
                        key={index}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <View style={styles.instructionFridayView}>
                            <Text
                              style={{
                                fontFamily: "poppins-bold",
                                fontSize: 10,
                              }}
                            >
                              {item.title}
                            </Text>
                          </View>
                          <View style={styles.checkBoxInstructionView}>
                            <View style={styles.firstInstructionCheckBoxRow}>
                              <View style={styles.parentCheckBox}>
                                <View style={styles.leftCheckBox}>
                                  <CheckBox
                                    value={item.no}
                                    onValueChange={() =>
                                      checkedValue("No", index, "no")
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
                                      checkedValue("Yes", index, "yes")
                                    }
                                  />
                                </View>
                                <View style={styles.rightCheckBox}>
                                  <Text style={styles.accidentText}>Yes</Text>
                                </View>
                              </View>
                              <View style={styles.parentCheckBox}>
                                <View style={styles.leftCheckBox}>
                                  <CheckBox
                                    value={item.other}
                                    onValueChange={() =>
                                      checkedValue("other", index, "other")
                                    }
                                  />
                                </View>
                                <View style={styles.rightCheckBox}>
                                  <Text style={styles.accidentText}>N/A</Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                        <View style={styles.inputFieldContainer}>
                          <TextInput
                            style={styles.inputField}
                            placeholder={"Comments"}
                            value={item.commet}
                            onChangeText={(txt) =>
                              updateCommentValue("commet", index, txt)
                            }
                          />
                        </View>
                      </View>
                    ))}
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      multiline={true}
                      numberOfLines={4}
                      style={styles.inputField}
                      placeholder={"Any Further Comments"}
                      value={furtherComments}
                      onChangeText={(e) => setFurtherComments(e)}
                    />
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TouchableOpacity
                      onPress={() => setGetSign(true)}
                      style={styles.inputFieldContainer}
                    >
                      {supervisorSign ? (
                        <Image
                          style={{
                            marginTop: 20,
                            height: 100,
                            width: 100,
                            backgroundColor: "gray",
                          }}
                          source={{ uri: supervisorSign }}
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
                          Signature
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                  <View style={styles.inputFieldContainer}>
                  <TouchableOpacity  onPress={() => showDatepicker()}>
                      <TextInput
                        editable={false}
                        value={date ? new Date(date).toLocaleDateString() : ""}
                        style={styles.inputField}
                        placeholder={"Date"}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      fontFamily: "poppins-bold",
                      fontSize: 12,
                      paddingTop: 10,
                      textAlign: "center",
                    }}
                  >
                    Once completed, please file a copy in the Site Folder and
                    send a copy to our Head Office.
                  </Text>
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
                      onPress={() => fridayPackFormInsert()}
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
  createFridayPackHandler: (
    contractorName,
    projectName,
    supervisorSign,
    documentRow,
    weekEnding,
    date,
    furtherComments,
    projectImagesComment,
    commentImages,
    jobID,
    tabId,
    token,
    index
  ) =>
    dispatch(
      insertFridayPackForm(
        contractorName,
        projectName,
        supervisorSign,
        documentRow,
        weekEnding,
        date,
        furtherComments,
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
export default connect(mapStateToProps, mapDispatchToProps)(FridayPack);
