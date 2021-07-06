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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { insertAnsuranceForm } from "../../Redux/action/auth/authActionTypes";
import { connect } from "react-redux";
import SignatureComponent from "../../components/SignatureComponent";
import * as ImagePicker from "expo-image-picker";
import { AssetsSelector } from "expo-images-picker";

var plus = require("../../assets/authScreen/plus.png");
const QualityInssurance = (props) => {
  const { navigation, token, isSuccessMsg, isQuality, isJobId } = props;
  const { plot_Id } = props.route.params;
  const jobID = plot_Id;
  const tabId = props.route.params.tabName;
  const [issuranceArray, setInsuraanceArray] = useState([
    {
      title: "Inspection prior to Mist coat (Make Ready Sheet)",
      dateComplte: "",
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title: "Mist Coat (1st coat)",
      dateComplte: "",
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title:
        "Ensure all areas are mist coated properly for e.g. uneven paint application (Snag Sheet)",
      dateComplte: "",
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title: "Inspect Prior to Main Decoration (Make Ready Sheet)",
      dateComplte: "",
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title: "Apply 1st coat of Undercoat to woodworks",
      secondTitle: "Apply 2rd coat to walls and ceilings ",
      dateComplte: "",
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title: "Apply 2nd coat to woodworks",
      secondTitle: "3rd coat to walls and ceilings",
      dateComplte: "",
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title: "Hoover all dust and debris before final coat to woodworks.",
      dateComplte: "",
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title: "Apply 3rd/final coat to the woodworks",
      dateComplte: "",
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title:
        "In the event where the decorators do get paint on the fittings,furniture’s, floors or any unpainted surfaces, these should be left paint free.",
      dateComplte: "",
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title:
        "Supervisor to issue a Snag Sheet to the decorator/s after they have completed their decoration works",
      dateComplte: "",
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title:
        "Supervisor to ensure that items flagged on the snag sheets are all completed during the de-snag/inspection.",
      dateComplte: "",
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title:
        "Hand over units/plots (Hand over sheets to be signed by site managers to confirm that quality is met).",
      dateComplte: "",
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title:
        "Site Managers Snag (inspection of units by site manager by issuing supervisor with their written snag sheet/s).",
      dateComplte: "",
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title: "Site Managers De-snag",
      dateComplte: "",
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title:
        "Builders/Client Final Snag (inspection of units by issuing written snag sheet/s)",
      dateComplte: "",
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title: "Builders/Client De-snag ",
      dateComplte: "",
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title: "Hand over sheets for final visit to units/plots",
      dateComplte: "",
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
  ]);
  const [keyArray, setKeyArray] = useState([
    { keys: "C =", keyDetails: "Completed (Quality met)" },
    { keys: "D =", keyDetails: "Design Failure" },
    { keys: "M =", keyDetails: "Material Failure" },
    { keys: "P =", keyDetails: "Plant Failure" },
    { keys: "ShapePT =", keyDetails: "Proceeding Trade" },
    { keys: "Q =", keyDetails: "Quality Failure" },
    { keys: "S =", keyDetails: "System of work Failure" },
    { keys: "O = ", keyDetails: "Others" },
  ]);
  const [activityArray, setActivityArray] = useState([
    { activity: "Mist Coat", date: "", sign: "" },
    {
      activity: "Main Decoration",
      date: "",
      sign: "",
    },
    {
      activity: "Site Managers Snag",
      date: "",
      sign: "",
    },
    {
      activity: "Builders/Client Snag ",
      date: "",
      sign: "",
    },
  ]);
  const [newRow, setNewRow] = useState([]);

  const addRow = () => {
    setNewRow((oldArray) => [
      ...oldArray,
      { area: "1", description: "2", yes: "no", comments: "hi" },
    ]);
  };
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState({
    isVisible: false,
    index: -1,
  });
  const [showActivity, setShowActivity] = useState({
    isVisible: false,
    index: -1,
  });

  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow({ ...show, isVisible: false, index: -1 });
    let copyArr = [...issuranceArray];
    copyArr[show.index].dateComplte = currentDate.toLocaleDateString();
    setInsuraanceArray(copyArr);
  };
  const showDatepicker = (index = -1) => {
    setShow({ ...show, isVisible: true, index: index });
  };
  const showActivityDatepicker = (index = -1) => {
    setShowActivity({ ...showActivity, isVisible: true, index: index });
  };
  const updateValue = (key, index, value) => {
    let preData = [...issuranceArray];
    preData[index][key] = value;
    setInsuraanceArray(preData);
  };
  const onActivityChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowActivity({ ...showActivity, isVisible: false, index: -1 });
    let copyArr = [...activityArray];
    copyArr[showActivity.index].date = currentDate.toLocaleDateString();
    setActivityArray(copyArr);
  };
  const [projectName, setProjectName] = useState("");
  const [unitPlot, setUnitPlot] = useState("");
  const [mcSign, setMcSign] = useState("");
  const [mdSign, setMdSign] = useState("");
  const [smsSign, setSmsSign] = useState("");
  const [bscsSign, setBscsSign] = useState("");
  const [siteManagerSign, setSiteManagerSign] = useState("");
  const [activitySign, setActivitySign] = useState("");
  const [overallComment, setOverAllComments] = useState("");
  const [projectComment, setProjectComment] = useState("");

  const qualityAnsuranceFormInsert = async () => {
    try {
      if (
        projectName != "" &&
        unitPlot != "" &&
        mcSign != "" &&
        activityArray != "" &&
        mdSign != "" &&
        issuranceArray != "" &&
        smsSign != "" &&
        bscsSign != "" &&
        siteManagerSign != "" &&
        activitySign != "" &&
        projectImagesComment != "" &&
        commentImages != "" &&
        overallComment != ""
      ) {
        await props.createAnsuranceHandler(
          projectName,
          unitPlot,
          issuranceArray,
          activityArray,
          mcSign,
          mdSign,
          smsSign,
          bscsSign,
          siteManagerSign,
          activitySign,
          projectImagesComment,
          commentImages,
          overallComment,
          jobID,
          tabId,
          token,
          props.route.params?.index
        );
        alert("Quality Ansurance Insert SuccessFully !");
        navigation.pop();
      } else {
        alert("Please Insert All Fields CareFully !");
        return false;
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const [signature, setSignature] = useState({
    bool: false,
    mc: {
      bool: false,
      uri: "",
    },
    md: {
      bool: false,
      uri: "",
    },
    sms: {
      bool: false,
      uri: "",
    },
    bscs: {
      bool: false,
      uri: "",
    },
    siteManagerSign: {
      bool: false,
      uri: "",
    },
    activitySign: {
      bool: false,
      uri: "",
    },
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
            isVisible={show.isVisible}
            testID="dateTimePicker"
            value={date}
            mode={Platform.OS === "ios" ? "date" : "date"}
            display="default"
            onCancel={() => setShow({ isVisible: false, index: -1 })}
            onConfirm={(date) => onChange(date)}
            format="DD-MM-YYYY"
          />
          <DateTimePickerModal
            isVisible={showActivity.isVisible}
            testID="dateTimePicker"
            value={date}
            mode={Platform.OS === "ios" ? "date" : "date"}
            display="default"
            onCancel={() => setShowActivity({ isVisible: false, index: -1 })}
            onConfirm={(date) => onActivityChange(date)}
            format="DD-MM-YYYY"
          />
          {signature.bool ? (
            <SignatureComponent
              returnImage={(uri) => {
                let data = signature.isUpperSign
                  ? [...issuranceArray]
                  : [...activityArray];
                if (signature.mc.bool) {
                  setSignature({
                    ...signature,
                    mc: { ...signature.mc, bool: false, uri: uri },
                    bool: false,
                  });
                  setMcSign(uri);
                } else if (signature.md.bool) {
                  setSignature({
                    ...signature,
                    md: { ...signature.md, bool: false, uri: uri },
                    bool: false,
                  });
                  setMdSign(uri);
                } else if (signature.sms.bool) {
                  setSignature({
                    ...signature,
                    sms: { ...signature.sms, bool: false, uri: uri },
                    bool: false,
                  });
                  setSmsSign(uri);
                } else if (signature.bscs.bool) {
                  setSignature({
                    ...signature,
                    bscs: { ...signature.bscs, bool: false, uri: uri },
                    bool: false,
                  });
                  setBscsSign(uri);
                } else if (signature.siteManagerSign.bool) {
                  setSignature({
                    ...signature,
                    siteManagerSign: {
                      ...signature.siteManagerSign,
                      bool: false,
                      uri: uri,
                    },
                    bool: false,
                  });
                  setSiteManagerSign(uri);
                } else {
                  setSignature({
                    ...signature,
                    activitySign: {
                      ...signature.activitySign,
                      bool: false,
                      uri: uri,
                    },
                    bool: false,
                  });
                  setActivitySign(uri);
                }
              }}
            />
          ) : (
            <>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>
                  Quality Assurance Inpection CheckList
                </Text>
              </View>
              <ScrollView style={{ flex: 1 }}>
                <View style={styles.formConatiner}>
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
                      value={unitPlot}
                      onChangeText={(e) =>
                        setUnitPlot(e.replace(/[^0-9]/g, ""))
                      }
                      style={styles.inputField}
                      placeholder={"Unit/Plot"}
                    />
                  </View>
                </View>
                <View style={styles.tableViewContainer}>
                  <View style={styles.tableHeader}>
                    <View style={styles.headerTitleView}>
                      <Text style={styles.headerTitle}>Activity</Text>
                    </View>
                    <View style={styles.headerTitleView}>
                      <Text style={styles.headerTitle}>Date Completed</Text>
                    </View>
                    <View style={styles.headerTitleView}>
                      <Text style={styles.headerTitle}>Key Letter </Text>
                    </View>
                    <View style={styles.headerTitleView}>
                      <Text style={styles.headerTitle}>Comments</Text>
                    </View>
                  </View>
                  <View style={{ width: "100%" }}>
                    {issuranceArray.length > 0 &&
                      issuranceArray.map((item, index) => (
                        <View
                          style={{
                            marginBottom: 20,
                            paddingRight: 20,
                            paddingLeft: 20,
                          }}
                        >
                          <View style={styles.activityTitleView}>
                            <Text
                              style={{
                                fontSize: 10,
                                fontFamily: "poppins-semiBold",
                              }}
                            >
                              {item.title}
                            </Text>
                            {item.secondTitle && (
                              <Text
                                style={{
                                  fontSize: 10,
                                  fontFamily: "poppins-semiBold",
                                }}
                              >
                                {item.title}
                              </Text>
                            )}
                          </View>
                          <View style={styles.tableBody}>
                            <View style={styles.inputBodyContainer}>
                              <TouchableOpacity
                                style={{
                                  height: 52,
                                  width: "100%",
                                  borderBottomWidth: 1,
                                  borderBottomColor: "#96A8B2",
                                  padding: 5,
                                  fontSize: 8,
                                  color: "#96A8B2",
                                  fontFamily: "poppins-regular",
                                  paddingTop: 15,
                                }}
                                onPress={() => showDatepicker(index)}
                              >
                                <Text
                                  style={{
                                    width: "100%",
                                    fontSize: 8,
                                    color: "#96A8B2",
                                    fontFamily: "poppins-regular",
                                  }}
                                >
                                  {item.dateComplte
                                    ? item.dateComplte
                                    : "Date Completed "}
                                </Text>
                              </TouchableOpacity>
                            </View>
                            <View style={styles.inputBodyContainer}>
                              <TextInput
                                style={styles.bodyTextInput}
                                placeholder={"Key Letter"}
                                onChangeText={(txt) =>
                                  updateValue("keyLetter", index, txt)
                                }
                                value={item.keyLetter}
                              />
                            </View>
                            <View style={styles.inputBodyContainer}>
                              <TextInput
                                style={styles.bodyTextInput}
                                placeholder={"Comments"}
                                onChangeText={(txt) =>
                                  updateValue("comment", index, txt)
                                }
                                value={item.comment}
                              />
                            </View>
                          </View>
                        </View>
                      ))}
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        setSignature({
                          bool: true,
                          mc: { ...signature.mc, bool: false },
                          md: { ...signature.md, bool: false },
                          sms: { ...signature.sms, bool: false },
                          bscs: { ...signature.bscs, bool: false },
                          siteManagerSign: {
                            ...signature.siteManagerSign,
                            bool: true,
                          },
                          activitySign: {
                            ...signature.activitySign,
                            bool: false,
                          },
                        })
                      }
                      style={{
                        width: "100%",
                      }}
                    >
                      {signature.siteManagerSign.uri ? (
                        <Image
                          source={{ uri: signature.siteManagerSign.uri }}
                          style={{
                            marginBottom: 20,
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
                          Site Manager to Sign
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text
                      style={{ fontSize: 10, fontFamily: "poppins-semiBold" }}
                    >
                      Overall comments once all the above is completed:{" "}
                    </Text>
                  </View>
                  <View style={[styles.inputBodyContainer, { width: "100%" }]}>
                    <TextInput
                      style={[styles.bodyTextInput, { width: "100%" }]}
                      placeholder={"Overall Comments"}
                      value={overallComment}
                      onChangeText={(e) => setOverAllComments(e)}
                    />
                  </View>
                  <View style={styles.tableHeader}>
                    <View style={styles.headerCompletionTitleView}>
                      <Text style={styles.headerCompletionTitle}>KEY</Text>
                    </View>
                    <View style={styles.headerCompletionTitleView}>
                      <Text style={styles.headerCompletionTitle}>
                        Site Mannagers to sign after Completion
                      </Text>
                    </View>
                  </View>
                  <View style={styles.keyActivityDiv}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={styles.keyDiv}>
                        {keyArray.map((item, index) => (
                          <View style={styles.keyTextView}>
                            <Text
                              style={{
                                fontSize: 10,
                                fontFamily: "poppins-semiBold",
                              }}
                            >
                              {item.keys}
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                fontFamily: "poppins-regular",
                              }}
                            >
                              {item.keyDetails}
                            </Text>
                          </View>
                        ))}
                      </View>
                      <View style={styles.activityDiv}>
                        <View style={styles.tableActivityHeader}>
                          <View style={styles.headerActivityTitleView}>
                            <Text style={styles.headerActivityTitle}>
                              Activity
                            </Text>
                          </View>
                          <View style={styles.headerActivityTitleView}>
                            <Text style={styles.headerActivityTitle}>Date</Text>
                          </View>
                        </View>
                        <View style={styles.tableActivityBody}>
                          <View style={styles.activityListView}>
                            {activityArray.length > 0 &&
                              activityArray.map((item, index) => (
                                <View
                                  style={{
                                    flexDirection: "row",
                                    width: "100%",
                                  }}
                                  key={index}
                                >
                                  <View
                                    style={[
                                      styles.activityTitle,
                                      { width: "50%" },
                                    ]}
                                  >
                                    <Text
                                      style={{
                                        fontSize: 8,
                                        fontFamily: "poppins-semiBold",
                                        paddingTop: 8,
                                      }}
                                    >
                                      {item.activity}
                                    </Text>
                                  </View>

                                  <View
                                    style={{ width: "50%", marginRight: 5 }}
                                  >
                                    <TouchableOpacity
                                      style={{
                                        width: "100%",
                                        borderBottomWidth: 1,
                                        borderBottomColor: "#96A8B2",
                                        padding: 5,
                                        fontSize: 12,
                                        color: "#96A8B2",
                                        fontFamily: "poppins-regular",
                                        paddingTop: 15,
                                      }}
                                      onPress={() =>
                                        showActivityDatepicker(index)
                                      }
                                    >
                                      <Text
                                        style={{
                                          width: "100%",
                                          fontSize: 12,
                                          color: "#96A8B2",
                                          fontFamily: "poppins-regular",
                                        }}
                                      >
                                        {item.date ? item.date : "Date"}
                                      </Text>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              ))}
                          </View>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        setSignature({
                          bool: true,
                          mc: { ...signature.mc, bool: false },
                          md: { ...signature.md, bool: false },
                          sms: { ...signature.sms, bool: false },
                          bscs: { ...signature.bscs, bool: false },
                          siteManagerSign: {
                            ...signature.siteManagerSign,
                            bool: false,
                          },
                          activitySign: {
                            ...signature.activitySign,
                            bool: true,
                          },
                        })
                      }
                      style={{
                        width: "100%",
                      }}
                    >
                      {signature.activitySign.uri ? (
                        <Image
                          source={{ uri: signature.activitySign.uri }}
                          style={{
                            height: 100,
                            width: 100,
                            backgroundColor: "gray",
                            marginLeft: 10,
                            marginTop: 10,
                          }}
                        />
                      ) : (
                        <Text
                          style={{
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
                          Sign
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      paddingTop: 20,
                      paddingBottom: 20,
                      color: "#96A8B2",
                      fontSize: 12,
                      fontFamily: "poppins-semiBold",
                      textAlign: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#96A8B2",
                        fontSize: 12,
                        fontFamily: "poppins-semiBold",
                      }}
                    >
                      Quality Insurance
                    </Text>{" "}
                    is an audit process to verify that the quality of work
                    performed is what was inspected and reported.
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "poppins-semiBold",
                      color: "#000",
                    }}
                  >
                    Supervisor Sign
                  </Text>
                  <View style={styles.inputFieldContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        setSignature({
                          bool: true,
                          mc: { ...signature.mc, bool: true },
                          md: { ...signature.md, bool: false },
                          sms: { ...signature.sms, bool: false },
                          bscs: { ...signature.bscs, bool: false },
                          siteManagerSign: {
                            ...signature.siteManagerSign,
                            bool: false,
                          },
                          activitySign: {
                            ...signature.activitySign,
                            bool: false,
                          },
                        })
                      }
                      style={{
                        width: "100%",
                      }}
                    >
                      {signature.mc.uri ? (
                        <Image
                          source={{ uri: signature.mc.uri }}
                          style={{
                            marginBottom: 20,
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
                          Supervisor MC Signature
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        setSignature({
                          bool: true,
                          mc: { ...signature.mc, bool: false },
                          md: { ...signature.md, bool: true },
                          sms: { ...signature.sms, bool: false },
                          bscs: { ...signature.bscs, bool: false },
                          siteManagerSign: {
                            ...signature.siteManagerSign,
                            bool: false,
                          },
                          activitySign: {
                            ...signature.activitySign,
                            bool: false,
                          },
                        })
                      }
                      style={{
                        width: "100%",
                      }}
                    >
                      {signature.md.uri ? (
                        <Image
                          source={{ uri: signature.md.uri }}
                          style={{
                            marginBottom: 20,
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
                          Supervisor MD Signature
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        setSignature({
                          bool: true,
                          mc: { ...signature.mc, bool: false },
                          md: { ...signature.md, bool: false },
                          sms: { ...signature.sms, bool: true },
                          bscs: { ...signature.bscs, bool: false },
                          siteManagerSign: {
                            ...signature.siteManagerSign,
                            bool: false,
                          },
                          activitySign: {
                            ...signature.activitySign,
                            bool: false,
                          },
                        })
                      }
                      style={{
                        width: "100%",
                      }}
                    >
                      {signature.sms.uri ? (
                        <Image
                          source={{ uri: signature.sms.uri }}
                          style={{
                            marginBottom: 20,
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
                          Supervisor SMS Signature
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        setSignature({
                          bool: true,
                          mc: { ...signature.mc, bool: false },
                          md: { ...signature.md, bool: false },
                          sms: { ...signature.sms, bool: false },
                          bscs: { ...signature.bscs, bool: true },
                          siteManagerSign: {
                            ...signature.siteManagerSign,
                            bool: false,
                          },
                          activitySign: {
                            ...signature.activitySign,
                            bool: false,
                          },
                        })
                      }
                      style={{
                        width: "100%",
                      }}
                    >
                      {signature.bscs.uri ? (
                        <Image
                          source={{ uri: signature.bscs.uri }}
                          style={{
                            marginBottom: 20,
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
                            style={[
                              styles.tableBody,
                              { marginBottom: 20, marginLeft: 0 },
                            ]}
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
                      height: ".1%",
                      marginTop: 10,
                    }}
                  ></View>
                  <View style={styles.btnContainer}>
                    <TouchableOpacity
                      style={styles.commonBtn}
                      onPress={() => qualityAnsuranceFormInsert()}
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
  isQuality: state.auth.isQuality,
  isSuccessMsg: state.auth.isSuccessMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
  createAnsuranceHandler: (
    projectName,
    unitPlot,
    issuranceArray,
    activityArray,
    mcSign,
    mdSign,
    smsSign,
    bscsSign,
    siteManagerSign,
    activitySign,
    projectImagesComment,
    commentImages,
    overallComment,
    jobID,
    tabId,
    token,
    index
  ) =>
    dispatch(
      insertAnsuranceForm(
        projectName,
        unitPlot,
        issuranceArray,
        activityArray,
        mcSign,
        mdSign,
        smsSign,
        bscsSign,
        siteManagerSign,
        activitySign,
        projectImagesComment,
        commentImages,
        overallComment,
        jobID,
        tabId,
        token,
        index
      )
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(QualityInssurance);
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
    paddingLeft: 20,
    paddingRight: 20,
  },
  titleText: {
    color: "#4F4F4F",
    fontSize: 18,
    fontFamily: "poppins-semiBold",
    textAlign: "center",
  },
  formConatiner: {
    paddingRight: 20,
    paddingLeft: 20,
  },
  inputFieldContainer: {
    width: "100%",
  },
  inputField: {
    height: 40,
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
    height: 30,
    marginBottom: 10,
  },
  tableActivityHeader: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
  },
  headerTitleView: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerCompletionTitleView: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerActivityTitleView: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 8,
    textAlign: "center",
    fontFamily: "poppins-bold",
  },
  headerCompletionTitle: {
    fontSize: 8,
    textAlign: "center",
    fontFamily: "poppins-bold",
  },
  headerActivityTitle: {
    fontSize: 8,
    textAlign: "center",
    fontFamily: "poppins-bold",
  },
  inputBodyContainer: {
    width: "20%",
  },

  bodyTextInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#96A8B2",
    padding: 5,
    fontSize: 12,
    color: "#96A8B2",
    marginLeft: 5,
    marginRight: 5,
    fontFamily: "poppins-regular",
  },
  tableBody: {
    width: "100%",
    flexDirection: "row",
    marginLeft: "20%",
  },
  tableActivityBody: {
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
    width: "100%",
  },
  keyActivityDiv: {
    width: "100%",
  },
  keyDiv: {
    width: "30%",
    height: "100%",
    paddingTop: 10,
  },
  activityDiv: {
    width: "70%",
    paddingLeft: 20,
  },
  keyTextView: {
    flexDirection: "row",
    paddingLeft: 10,
  },
  activityListView: {
    width: "100%",
  },
  activityInputView: {
    width: "60%",
    height: "100%",
  },
  activityTitle: {
    height: 40,
    width: "100%",
    padding: 10,
  },
  btnContainer: {
    width: "100%",
    marginBottom: 20,
    marginTop: 20,
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
