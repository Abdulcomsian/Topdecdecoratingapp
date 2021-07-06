import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { CheckBox, Text } from "native-base";
import styles from "../../../assets/css/styles";
import { color } from "react-native-reanimated";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SignatureComponent from "../../../components/SignatureComponent";
import { connect } from "react-redux";
import { insertTbtRegister } from "../../../Redux/action/auth/authActionTypes";
import { updateHealthReport } from "../../../Redux/action/summary/Summary";
import * as ImagePicker from "expo-image-picker";
import { AssetsSelector } from "expo-images-picker";

var mainImage = require("../../../assets/authScreen/logo.jpeg");
var plus = require("../../../assets/authScreen/plus.png");
const TBTREGISTER = (props) => {
  const { navigation, token, isOnSite, isSuccessMsg, isJobId } = props;
  // const jobID = Math.floor(Math.random() * 100) + 1;
  const { plot_Id } = props.route.params;
  const jobID = plot_Id;
  console.log("Work Plot ID :", jobID);
  const tabId = props.route.params.tabName;
  console.log("Work Tab ID :", tabId);
  const [toolBoxArray, setToolBoxArray] = useState([]);
  const addToolBox = () => {
    setToolBoxArray((oldArray) => [
      ...oldArray,
      {
        name: "",
        sign: "",
        date_1: "",
        action: "",
        translator: "",
      },
    ]);
  };

  const [show, setShow] = useState({
    isVisible: false,
    index: -1,
  });
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [registerDate, setRegisterDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [finishTime, setFinishTime] = useState("");

  const [startTimeShow, setStartTimeShow] = useState("");
  const [finalTimeShow, setFinalTimeShow] = useState("");
  const [registerDateShow, setRegisterDateShow] = useState("");

  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow({ ...show, isVisible: false, index: -1 });
    let copyArr = [...toolBoxArray];
    copyArr[show.index].date_1 = currentDate.toLocaleDateString();
    setToolBoxArray(copyArr);
  };

  const onStartTimeChange = (selectedDate) => {
    console.log(selectedDate);
    const currentDate = selectedDate;
    setStartTimeShow(false);
    setStartTime(new Date(currentDate).toLocaleTimeString());
    console.log(startTime);
  };

  const onFinishTimeChange = (selectedDate) => {
    const currentDate = selectedDate;
    setFinalTimeShow(false);
    setFinishTime(new Date(currentDate).toLocaleTimeString());
  };

  const onRegisterDateChange = (selectedDate) => {
    const currentDate = selectedDate;
    setRegisterDateShow(false);
    setRegisterDate(new Date(currentDate).toLocaleDateString());
  };

  const showDatepicker = (index = -1) => {
    setShow({ ...show, isVisible: true, index: index });
  };
  const [signature, setSignature] = useState({
    bool: false,
    bool: false,
    isSign: {
      bool: false,
      uri: "",
    },
    bscsSignature: {
      bool: false,
      uri: "",
    },
    index: -1,
  });
  const [isSign, setIsSign] = useState("");
  const [bscsSignature, setBscsSignature] = useState("");
  const [client, setClient] = useState("");
  const [projectName, setProjectName] = useState("");
  const [subject, setSubject] = useState("");
  const [outline, setOutline] = useState("");
  const [supervisorName, setSupervisorName] = useState("");
  const [projectComment, setProjectComment] = useState("");
  const tbtRegisterFormInsert = async () => {
    try {
      console.log("Try Token :", token);

      if (
        client != "" &&
        projectName != "" &&
        subject != "" &&
        outline != "" &&
        registerDate != "" &&
        startTime != "" &&
        finishTime != "" &&
        toolBoxArray != "" &&
        supervisorName != "" &&
        bscsSignature != "" &&
        isSign != "" &&
        projectImagesComment != "" &&
        commentImages != ""
      ) {
        await props.creatTbtRegisterHandler(
          client,
          projectName,
          subject,
          outline,
          registerDate,
          startTime,
          finishTime,
          toolBoxArray,
          supervisorName,
          bscsSignature,
          isSign,
          projectImagesComment,
          commentImages,
          jobID,
          tabId,
          token,
          props.route.params?.index
        );
        // props.updateHealthReport(props?.route?.params?.index);
        props.navigation.pop();
        alert("TBT REGISTER Insert SuccessFully !");
      } else {
        alert("Please Insert All Fields CareFully !");
      }
    } catch (err) {
      alert(err.message);
    }
  };
  const updateToolBoxArray = (key, index, value) => {
    let preData = [...toolBoxArray];
    preData[index][key] = value;
    setToolBoxArray(preData);
  };
  const [projectImages, setProjectImages] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const onDone = (dataImage) => {
    let copydata = [...projectImagesComment];
    copydata[signature.index].image = dataImage[0].uri;
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
  // console.log("Pick Project :",projectImages)
  const _textStyle = {
    color: "white",
  };
  const _buttonStyle = {
    backgroundColor: "#1073AC",
    borderRadius: 5,
  };
  console.log("Project Iamges :", projectImages);
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
          <DateTimePickerModal
            isVisible={show.isVisible}
            testID="dateTimePicker"
            value={date}
            mode={Platform.OS === "ios" ? "date" : "date"}
            display="default"
            onConfirm={onChange}
            onCancel={() => setShow({ isVisible: false, index: -1 })}
            format="DD-MM-YYYY"
          />
          <DateTimePickerModal
            isVisible={registerDateShow}
            testID="dateTimePicker"
            value={registerDate}
            mode={Platform.OS === "ios" ? "date" : "date"}
            display="default"
            onConfirm={onRegisterDateChange}
            onCancel={() => setRegisterDateShow(false)}
            format="DD-MM-YYYY"
          />
          <DateTimePickerModal
            isVisible={startTimeShow}
            testID="dateTimePicker"
            value={startTime}
            mode={Platform.OS === "ios" ? "time" : "time"}
            locale="en_GB"
            display="default"
            onConfirm={onStartTimeChange}
            onCancel={() => setStartTimeShow(false)}
          />

          <DateTimePickerModal
            isVisible={finalTimeShow}
            testID="dateTimePicker"
            value={finishTime}
            mode={Platform.OS === "ios" ? "time" : "time"}
            locale="en_GB"
            display="default"
            onConfirm={onFinishTimeChange}
            onCancel={() => setFinalTimeShow(false)}
          />
          {signature.bool ? (
            <SignatureComponent
              returnImage={(uri) => {
                if (signature.isSign.bool) {
                  setSignature({
                    ...signature,
                    supervisor: { ...signature.isSign, bool: false, uri: uri },
                    bool: false,
                  });
                  setIsSign(uri);
                } else {
                  setSignature({
                    ...signature,
                    manager: {
                      ...signature.bscsSignature,
                      bool: false,
                      uri: uri,
                    },
                    bool: false,
                  });
                  setBscsSignature(uri);
                }
              }}
            />
          ) : (
            <>
              <View style={styles.imageView}>
                <Image source={mainImage} style={styles.bannerImage} />
              </View>
              <View
                style={{
                  paddingTop: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.titleText}>
                  Site Tool Box Talk Register
                </Text>
              </View>
              <ScrollView>
                <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      style={styles.inputField}
                      placeholder={"Client"}
                      value={client}
                      onChangeText={(e) => setClient(e)}
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
                      placeholder={"Subject"}
                      value={subject}
                      onChangeText={(e) => setSubject(e)}
                    />
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      style={styles.inputField}
                      placeholder={"Outline"}
                      value={outline}
                      onChangeText={(e) => setOutline(e)}
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
                      onPress={() => setRegisterDateShow(true)}
                    >
                      <Text
                        style={{
                          width: "100%",
                          fontSize: 12,
                          color: "#96A8B2",
                          fontFamily: "poppins-regular",
                        }}
                      >
                        {registerDate ? registerDate : "Date"}
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
                      onPress={() => setStartTimeShow(true)}
                    >
                      <Text
                        style={{
                          width: "100%",
                          fontSize: 12,
                          color: "#96A8B2",
                          fontFamily: "poppins-regular",
                        }}
                      >
                        {startTime ? startTime : "Start time"}
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
                      onPress={() => setFinalTimeShow(true)}
                    >
                      <Text
                        style={{
                          width: "100%",
                          fontSize: 12,
                          color: "#96A8B2",
                          fontFamily: "poppins-regular",
                        }}
                      >
                        {finishTime ? finishTime : "Finish time"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={{ fontFamily: "poppins-bold", fontSize: 10 }}>
                    I confirm that I have received the above tool box talk
                  </Text>
                  <View style={styles.tableViewContainer}>
                    <View style={styles.tableHeader}>
                      <View style={styles.headerInspectionTitleView}>
                        <Text style={styles.headerTitle}>Print Name</Text>
                      </View>
                      <View style={styles.headerInspectionTitleView}>
                        <Text style={styles.headerTitle}>Date</Text>
                      </View>
                      <View style={styles.headerInspectionTitleView}>
                        <Text style={styles.headerTitle}>
                          Translation required (Yes/No)
                        </Text>
                      </View>
                      <View style={styles.headerInspectionTitleView}>
                        <Text style={styles.headerTitle}>
                          Name of Translator
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
                        onPress={() => {
                          if (
                            toolBoxArray.length > 0 &&
                            !toolBoxArray[toolBoxArray.length - 1].name &&
                            !toolBoxArray[toolBoxArray.length - 1].signature &&
                            !toolBoxArray[toolBoxArray.length - 1].date_1 &&
                            !toolBoxArray[toolBoxArray.length - 1].action &&
                            !toolBoxArray[toolBoxArray.length - 1].translator
                          ) {
                            alert(
                              "Please Enter All Value and then move to next Item Add !"
                            );
                          } else {
                            addToolBox();
                          }
                        }}
                      >
                        <Image style={styles.plusBtn} source={plus} />
                      </TouchableOpacity>
                    </View>
                    {toolBoxArray.length > 0 &&
                      toolBoxArray.map((el, index) => (
                        <View style={styles.tableBody} key={index}>
                          <View style={styles.inputInspectionBodyContainer}>
                            <TextInput
                              style={styles.bodyTextInput}
                              placeholder={"Name"}
                              value={el.name}
                              onChangeText={(txt) =>
                                updateToolBoxArray("name", index, txt)
                              }
                            />
                          </View>
                          <View style={[styles.inputInspectionBodyContainer,{
                                borderBottomWidth: 1,
                                borderBottomColor: "#96A8B2",}]}>
                            <Text
                              onPress={() => showDatepicker(index)}
                              style={{
                                fontSize: 8,
                                color: "#96A8B2",
                                fontFamily: "poppins-regular",
                              }}
                            >
                                   {
                          el.date_1
                            ? el.date_1
                            : "Date"
                        }
                              
                            </Text>
                          </View>
                          <View style={styles.inputInspectionBodyContainer}>
                            <TextInput
                              style={styles.bodyTextInput}
                              placeholder={"Yes / No"}
                              value={el.action}
                              onChangeText={(txt) =>
                                updateToolBoxArray("action", index, txt)
                              }
                            />
                          </View>
                          <View style={styles.inputInspectionBodyContainer}>
                            <TextInput
                              style={styles.bodyTextInput}
                              placeholder={"Name Of Translator"}
                              value={el.translator}
                              onChangeText={(txt) =>
                                updateToolBoxArray("translator", index, txt)
                              }
                            />
                          </View>
                        </View>
                      ))}
                  </View>
                  <View style={[styles.inputFieldContainer,{
                                borderBottomWidth: 1,
                                borderBottomColor: "#96A8B2",}]}>
                    <TouchableOpacity
                      onPress={() =>
                        setSignature({
                          ...signature,
                          bool: true,
                          isSign: { ...signature.isSign, bool: true },
                          bscsSignature: {
                            ...signature.bscsSignature,
                            bool: false,
                          },
                        })
                      }
                      style={{
                        width: "100%",
                      }}
                    >
                      {isSign ? (
                        <Image
                          source={{ uri: isSign }}
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
                  <Text
                    style={{
                      fontFamily: "poppins-bold",
                      fontSize: 10,
                      paddingTop: 20,
                    }}
                  >
                    I confirm that I have given the above toolbox talk.
                  </Text>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      style={styles.inputField}
                      placeholder={"Name of Supervisor"}
                      value={supervisorName}
                      onChangeText={(e) => setSupervisorName(e)}
                    />
                  </View>
                  <View style={[styles.inputFieldContainer,{
                                borderBottomWidth: 1,
                                borderBottomColor: "#96A8B2",}]}>
                    <TouchableOpacity
                      onPress={() =>
                        setSignature({
                          ...signature,
                          bool: true,
                          isSign: { ...signature.isSign, bool: false },
                          bscsSignature: {
                            ...signature.bscsSignature,
                            bool: true,
                          },
                        })
                      }
                      style={{
                        width: "100%",
                      }}
                    >
                      {bscsSignature ? (
                        <Image
                          source={{ uri: bscsSignature }}
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
                          Supervisor BSCS Signature
                        </Text>
                      )}
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

                  <Text
                    style={{
                      fontFamily: "poppins-bold",
                      fontSize: 10,
                      paddingTop: 20,
                      textAlign: "center",
                    }}
                  >
                    Once completed, please file a copy in the Site Folder and
                    send a copy to our Office. Also, please give a copy to the
                    Site Staff.
                  </Text>
                  <View style={styles.btnContainer}>
                    <TouchableOpacity
                      style={styles.commonBtn}
                      onPress={() => tbtRegisterFormInsert()}
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
  isOnSite: state.auth.isOnSite,
  isSuccessMsg: state.auth.isSuccessMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
  creatTbtRegisterHandler: (
    client,
    projectName,
    subject,
    outline,
    registerDate,
    startTime,
    finishTime,
    toolBoxArray,
    bscsSignature,
    isSign,
    projectImagesComment,
    commentImages,
    jobID,
    tabId,
    token,
    index
  ) =>
    dispatch(
      insertTbtRegister(
        client,
        projectName,
        subject,
        outline,
        registerDate,
        startTime,
        finishTime,
        toolBoxArray,
        bscsSignature,
        isSign,
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
export default connect(mapStateToProps, mapDispatchToProps)(TBTREGISTER);
