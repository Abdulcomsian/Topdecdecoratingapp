import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Text, CheckBox } from "native-base";
import styles from "../../../assets/css/styles";
import SignatureComponent from "../../../components/SignatureComponent";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { connect } from "react-redux";
import { updateHealthReport } from "../../../Redux/action/summary/Summary";
import { insertIssueRecordForm } from "../../../Redux/action/auth/authActionTypes";
import * as ImagePicker from "expo-image-picker";
import { AssetsSelector } from "expo-images-picker";

var plus = require("../../../assets/authScreen/plus.png");
const IssueCard = (props) => {
  const { navigation, token, isSuccessMsg, isSuccess } = props;
  // const jobID = Math.floor(Math.random() * 100) + 1;
  const { plot_Id } = props.route.params;
  const jobID = plot_Id;
  console.log("Work Plot ID :", jobID);
  const tabId = props.route.params.tabName;
  console.log("Work Tab ID :", tabId);
  const [issueArray, setIssueArray] = useState([]);
  const [dynamicInput, setdynamicInput] = useState([]);
  const [contractorName, setContractorName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [nameOfOperative, setNameOfOperative] = useState("");
  const [recordSignature, setRecordSignature] = useState("");
  const [getSign, setGetSign] = useState(false);

  const addIssue = () => {
    setdynamicInput((oldArray) => [
      ...oldArray,
      {
        item: "",
        no: "",
        type: "",
        date: new Date().toLocaleDateString(),
        supervisor: "",
        signature: "",
      },
    ]);
  };
  const updateValue = (key, index, value) => {
    let preData = [...dynamicInput];
    preData[index][key] = value;
    setdynamicInput(preData);
  };

  const [signature, setSignature] = useState({
    bool: false,
    isSign: false,
    index: -1,
  });
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [show, setShow] = useState({
    isVisible: false,
    index: -1,
  });

  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow({ ...show, isVisible: false, index: -1 });
    let copyArr = [...dynamicInput];
    copyArr[show.index].date = currentDate.toLocaleDateString();
    setdynamicInput(copyArr);
  };

  const showDatepicker = (index = -1) => {
    setShow({ ...show, isVisible: true, index: index });
  };
  const [projectComment, setProjectComment] = useState("");
  const issueRecordForm = async () => {
    try {
      if (
        contractorName != "" &&
        projectName != "" &&
        nameOfOperative != "" &&
        dynamicInput != "" &&
        recordSignature != "" &&
        projectImagesComment != "" &&
        commentImages != ""
      ) {
        await props.createIssueRecordCardHandler(
          contractorName,
          projectName,
          nameOfOperative,
          dynamicInput,
          recordSignature,
          projectImagesComment,
          commentImages,
          jobID,
          tabId,
          token,
          props.route.params?.index
        );
        // props.updateHealthReport(props?.route?.params?.index);

        props.navigation.pop();
        alert("Issue Record Insert SuccessFully !");
      } else {
        alert("Please Insert All Fields CareFully !");
      }
    } catch (err) {
      alert(err.message);
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
            isVisible={show.isVisible}
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            display="default"
            onConfirm={onChange}
            onCancel={() => setShow({ isVisible: false, index: -1 })}
            format="DD-MM-YYYY"
          />
          {getSign ? (
            <SignatureComponent
              returnImage={(uri) => {
                setRecordSignature(uri);
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
                <Text style={styles.titleText}>
                  PERSONAL PROTECTIVE EQUIPMENT ISSUE RECORD CARD{" "}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "poppins-regular",
                    paddingTop: 10,
                    paddingBottom: 20,
                    textAlign: "center",
                  }}
                >
                  (ONE SHEET PER OPERATIVE / EMPLOYEE){" "}
                </Text>
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
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "poppins-bold",
                      paddingTop: 10,
                    }}
                  >
                    Name of Operative / Direct Employee:
                  </Text>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      style={styles.inputField}
                      placeholder={"Name of Operative / Direct Employee:"}
                      value={nameOfOperative}
                      onChangeText={(e) => setNameOfOperative(e)}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "poppins-regular",
                      paddingTop: 10,
                    }}
                  >
                    ALL SELF EMPLOYED/EMPLOYEES PROVIDED WITH PPE MUST TAKE
                    REASONABLE STEPS TO ENSURE PPE IS PROPERLY USED IN
                    ACCORDANCE WITH THE TRAINING RECEIVED. ANY LOSS OR DEFECT OF
                    THE P.P.E TO BE REPORTED TO YOUR SUPERVISOR.
                  </Text>
                  <Text
                    style={{
                      fontSize: 8,
                      fontFamily: "poppins-regular",
                      paddingTop: 10,
                    }}
                  >
                    1. I acknowledge receipt of the following items of personal
                    protective equipment issued to me, by appending my signature
                    adjacent to the item entered on this form.
                  </Text>
                  <Text
                    style={{
                      fontSize: 8,
                      fontFamily: "poppins-regular",
                      paddingTop: 10,
                    }}
                  >
                    2. I fully understand that I must wear the correct PPE as
                    identified in site rules and project/work activity risk
                    assessments when undertaking the work or using a particular
                    tool or equipment. This in accordance to the training I have
                    received.
                  </Text>
                  <Text
                    style={{
                      fontSize: 8,
                      fontFamily: "poppins-regular",
                      paddingTop: 10,
                    }}
                  >
                    3. I will ensure that the PPE is properly cared for and
                    maintained in accordance with instruction given. When not in
                    use my PPE will be kept secure in accommodation provided or
                    as advised.
                  </Text>
                  <Text
                    style={{
                      fontSize: 8,
                      fontFamily: "poppins-regular",
                      paddingTop: 10,
                      paddingBottom: 20,
                    }}
                  >
                    4. I will report all loss or defects to the issued PPE to my
                    supervisor.
                  </Text>
                  <View style={styles.tableViewContainer}>
                    <View style={styles.tableHeader}>
                      <View style={styles.headerHarmFulTitleView}>
                        <Text style={styles.headerTitle}>ITEM</Text>
                      </View>
                      <View style={styles.headerHarmFulTitleView}>
                        <Text style={styles.headerTitle}>No</Text>
                      </View>
                      <View style={styles.headerHarmFulTitleView}>
                        <Text style={styles.headerTitle}>TYPE/Ser No</Text>
                      </View>
                      <View style={styles.headerHarmFulTitleView}>
                        <Text style={styles.headerTitle}>DATE OF ISSUE</Text>
                      </View>
                      <View style={styles.headerHarmFulTitleView}>
                        <Text style={styles.headerTitle}>
                          NAME OF SUPERVISOR
                        </Text>
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
                        onPress={() => addIssue()}
                      >
                        <Image style={styles.plusBtn} source={plus} />
                      </TouchableOpacity>
                    </View>
                    {dynamicInput.map((item, index) => (
                      <View style={styles.tableBody} key={index}>
                        <View style={styles.inputHarmFullBodyContainer}>
                          <TextInput
                            style={styles.bodyTextInput}
                            placeholder={"Item"}
                            onChangeText={(txt) =>
                              updateValue("item", index, txt)
                            }
                            value={item.item}
                          />
                        </View>
                        <View style={styles.inputHarmFullBodyContainer}>
                          <TextInput
                            style={styles.bodyTextInput}
                            placeholder={"No"}
                            onChangeText={(txt) =>
                              updateValue("no", index, txt)
                            }
                            value={item.no}
                          />
                        </View>
                        <View style={styles.inputHarmFullBodyContainer}>
                          <TextInput
                            style={styles.bodyTextInput}
                            placeholder={"Type"}
                            onChangeText={(txt) =>
                              updateValue("type", index, txt)
                            }
                            value={item.type}
                          />
                        </View>
                        <View style={styles.inputHarmFullBodyContainer}>
                          <Text
                            onPress={() => showDatepicker(index)}
                            style={{
                              width: "90%",
                              height: 39,
                              borderBottomWidth: 1,
                              borderBottomColor: "#96A8B2",
                              padding: 5,
                              fontSize: 8,
                              color: "#96A8B2",
                              fontFamily: "poppins-regular",
                              paddingTop: 12,
                              marginRight: 5,
                            }}
                          >
                            {new Date(item.date).toLocaleDateString()}
                          </Text>
                        </View>
                        <View style={styles.inputHarmFullBodyContainer}>
                          <TextInput
                            style={styles.bodyTextInput}
                            placeholder={"Supervisor"}
                            onChangeText={(txt) =>
                              updateValue("supervisor", index, txt)
                            }
                            value={item.supervisor}
                          />
                        </View>
                      </View>
                    ))}
                    <View style={[styles.inputField, { height: 120 }]}>
                      <TouchableOpacity
                        onPress={() => setGetSign(true)}
                        style={[
                          styles.inputHarmFullBodyContainer,
                          {
                            width: "100%",
                          },
                        ]}
                      >
                        {recordSignature ? (
                          <Image
                            source={{ uri: recordSignature }}
                            style={{
                              marginTop: 10,
                              height: 100,
                              width: 100,
                              backgroundColor: "gray",
                            }}
                          />
                        ) : (
                          <Text
                            style={{
                              width: "100%",
                              height: 39,
                              borderBottomWidth: 1,
                              borderBottomColor: "#96A8B2",
                              padding: 5,
                              fontSize: 12,
                              color: "#96A8B2",
                              fontFamily: "poppins-regular",
                              paddingTop: 12,
                              marginRight: 5,
                            }}
                          >
                            Sign
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "poppins-bold",
                        paddingTop: 10,
                        paddingBottom: 20,
                        textAlign: "center",
                      }}
                    >
                      Once completed, please file a copy in the Site Folder and
                      send a copy to our Head Office.
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
                      onPress={() => issueRecordForm()}
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
  isScope: state.auth.isScope,
  isSuccessMsg: state.auth.isSuccessMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
  createIssueRecordCardHandler: (
    contractorName,
    projectName,
    nameOfOperative,
    dynamicInput,
    recordSignature,
    projectImagesComment,
    commentImages,
    jobID,
    tabId,
    token,
    index
  ) =>
    dispatch(
      insertIssueRecordForm(
        contractorName,
        projectName,
        nameOfOperative,
        dynamicInput,
        recordSignature,
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
export default connect(mapStateToProps, mapDispatchToProps)(IssueCard);
