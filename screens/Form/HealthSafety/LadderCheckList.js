import React, { useState } from "react";
import {
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  CheckBox,
} from "react-native";
import { Text } from "native-base";
import styles from "../../../assets/css/styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SignatureComponent from "../../../components/SignatureComponent";
import { insertLAdderCheckListForm } from "../../../Redux/action/auth/authActionTypes";
import { connect } from "react-redux";
import { updateHealthReport } from "../../../Redux/action/summary/Summary";
import * as ImagePicker from "expo-image-picker";
import { AssetsSelector } from "expo-images-picker";

var mainImage = require("../../../assets/authScreen/Accurate-daywork-sheet-docx.png");
const LadderCheckList = (props) => {
  const { navigation, token, isSuccessMsg, isSuccess } = props;
  // const jobID = Math.floor(Math.random() * 100) + 1;
  const { plot_Id } = props.route.params;
  const jobID = plot_Id;
  console.log("Work Plot ID :", jobID);
  const tabId = props.route.params.tabName;
  console.log("Work Tab ID :", tabId);
  const [getSign, setGetSign] = useState(false);
  const [ladderArrayList, setLadderArrayList] = useState([
    {
      title: "1. Training",
      subTitle:
        "Have all staff who will use podium stepladders been trained in their use?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "2. Site conditions",
      subTitle:
        "Is the floor area where the podium stepladders are to be used free from obstacles, debris, trailing cables, etc?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle:
        "Will the podium stepladder be erected on a flat stable surface?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "3. Pre-assembly checks",
      subTitle:
        "Do the podium stepladders have a label fitted containing a company number and a test date as well as a manufacturer’s label?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Have all welds been checked for cracks or other damage?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle:
        "Have all tubes been checked for a sign of physical damage i.e. cracks, distortion or excessive dents?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle:
        "Is the working platform free from contamination, cracking, holes or other damage, including any missing or damaged rivet fixings?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Is there an absence of sharp edges or splinters?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle:
        "Is the stepladder free from paint or decoration which could obscure damage? (There should only be clear varnish on the ladder, so defects aren’t hidden.)",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle:
        "Are all required nails, screws, bolts, tie rods and rivets present and firmly fixed?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "If the stepladder has a non-slip base, is it undamaged?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Are the stepladder feet in good condition?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Have previous repairs been carried out to a high standard?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Do all fittings appear to be of an approved type?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Check for tightness of rungs.",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Check all rivets and fastenings.",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Check for corrosion.",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle:
        "Check anti-slip end pieces are in good condition and are not loose.",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Check visually for flaws and cracks.",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Check non-slip bases for damage or wear.",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle:
        "Check stepladders are not wobbly when positioned as this demonstrates side strain.",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Check hinge brackets/spreaders are not loose or bent.",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle:
        "Check stop on the hinge bracket/spreaders is not broken and is fully effective.",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "check hinges are not loose.",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "4. Checks during/after assembly and before use",
      subTitle:
        "Are all castors secure and their fixing bolts tightened correctly?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle:
        "Do all wheel brakes operate and lock the wheels and castors into position?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle:
        "Is there free movement of all hinge points of the podium step?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle:
        "Will the total load (1 person plus tools & materials) be more than the manufacturer’s stated safe working load?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle:
        "Are the podium stepladder’s locking mechanisms operating and locking correctly? (Ladder claws and locks, gate claw and lock, rear folding frame elbow locking joints and the platform locking tabs.)",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle:
        "Are the castors pointing outwards and the wheel brakes locked prior to access?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Is the ladder section located correctly and secure?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle:
        "Is the podium stepladder correctly positioned to avoid over-reaching?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle:
        "Is the podium stepladder correctly positioned to avoid over reaching?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Is the working platform set at the correct height?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle:
        "Is the safety gate shut and locked once staff are on the platform?",
      yes: false,
      no: false,
      other: false,
    },
  ]);
  const [dateTimeComplete, setDateTimeComplete] = useState(
    new Date().toLocaleDateString()
  );
  const [nextDateInspection, setNextDateInspection] = useState(
    new Date().toLocaleDateString()
  );
  const [showDateTimeComplete, setShowDateTimeComplete] = useState(false);
  const [showNextDateInspection, setShowNextDateInspection] = useState(false);
  const [furtherComments, setFurtherComments] = useState("");
  const [contractorName, setContractorName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [supervisorSign, setSupervisorSign] = useState("");

  const showDateCompletePicker = () => {
    setShowDateTimeComplete(true);
  };
  const onDateCompleteChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowDateTimeComplete(false);
    setDateTimeComplete(new Date(currentDate).toLocaleDateString());
  };
  const onNextDateInspectionChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowNextDateInspection(false);
    setNextDateInspection(new Date(currentDate).toLocaleDateString());
  };
  const showNextDateInspectionPicker = () => {
    setShowNextDateInspection(true);
  };
  const updateLadderArrayList = (key, index, value) => {
    let preData = [...ladderArrayList];
    preData[index][key] = value;
    setLadderArrayList(preData);
  };
  const checkedValue = (index, key) => {
    if (key == "yes") {
      let copyArray = [...ladderArrayList];
      copyArray[index][key] = true;
      copyArray[index]["no"] = false;
      copyArray[index]["other"] = false;
      setLadderArrayList(copyArray);
    } else if (key == "no") {
      let copyArray = [...ladderArrayList];
      copyArray[index][key] = true;
      copyArray[index]["yes"] = false;
      copyArray[index]["other"] = false;
      setLadderArrayList(copyArray);
    } else {
      let copyArray = [...ladderArrayList];
      copyArray[index][key] = true;
      copyArray[index]["no"] = false;
      copyArray[index]["yes"] = false;
      setLadderArrayList(copyArray);
    }
  };
  const ladderCheckListForm = async () => {
    try {
      if (
        contractorName != "" &&
        projectName != "" &&
        supervisorSign != "" &&
        dateTimeComplete != "" &&
        nextDateInspection != "" &&
        furtherComments != "" &&
        ladderArrayList
      ) {
        await props.createLadderCheckListHandler(
          contractorName,
          projectName,
          supervisorSign,
          dateTimeComplete,
          nextDateInspection,
          furtherComments,
          ladderArrayList,
          jobID,
          tabId,
          token,
          props.route.params?.index
        );
        // props.updateHealthReport(props?.route?.params?.index);
        alert("Ladder Check List Insert SuccessFully !");
        props.navigation.pop();
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
    setProjectImages(data);
    setIsShow(false);
  };

  const goBack = () => {
    setIsShow(false);
  };
  const uploadPhotoImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
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
            isVisible={showDateTimeComplete}
            testID="dateTimePicker"
            value={dateTimeComplete}
            mode={"datetime"}
            display="default"
            onConfirm={onDateCompleteChange}
            onCancel={() => setShowDateTimeComplete(false)}
            format="DD-MM-YYYY"
          />
          <DateTimePickerModal
            isVisible={showNextDateInspection}
            testID="dateTimePicker"
            value={nextDateInspection}
            mode={"date"}
            display="default"
            onConfirm={onNextDateInspectionChange}
            onCancel={() => setShowNextDateInspection(false)}
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
                  LADDERS / PODIUM STEPLADDER INSPECTION CHECKLIST
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
                      value={projectName}
                      onChangeText={(e) => setProjectName(e)}
                      style={styles.inputField}
                      placeholder={"Project"}
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
                    <Text
                      onPress={() => showDateCompletePicker()}
                      style={{
                        width: "100%",
                        height: 60,
                        borderBottomWidth: 1,
                        borderBottomColor: "#96A8B2",
                        paddingTop: 20,
                        fontSize: 12,
                        color: "#96A8B2",
                        fontFamily: "poppins-regular",
                      }}
                    >
                      {new Date(dateTimeComplete).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <Text
                      onPress={() => showNextDateInspectionPicker()}
                      style={{
                        width: "100%",
                        height: 60,
                        borderBottomWidth: 1,
                        borderBottomColor: "#96A8B2",
                        paddingTop: 20,
                        fontSize: 12,
                        color: "#96A8B2",
                        fontFamily: "poppins-regular",
                      }}
                    >
                      {new Date(nextDateInspection).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={styles.tableCheckListViewContainer}>
                    <View style={styles.tableHeader}>
                      <View style={styles.headerLadderListTitleView}>
                        <Text style={styles.headerTitle}>ITEMS</Text>
                      </View>
                      <View style={styles.headerLadderListTitleView}>
                        <Text style={styles.headerTitle}>Yes</Text>
                      </View>
                      <View style={styles.headerLadderListTitleView}>
                        <Text style={styles.headerTitle}>No</Text>
                      </View>
                      <View style={styles.headerLadderListTitleView}>
                        <Text style={styles.headerTitle}>N/a</Text>
                      </View>
                    </View>
                    {ladderArrayList.map((item, index) =>
                      item.title != "" ? (
                        <View key={index}>
                          <View>
                            <Text
                              style={{
                                fontSize: 12,
                                fontFamily: "poppins-bold",
                                paddingTop: 10,
                                paddingBottom: 20,
                              }}
                            >
                              {item.title}
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                fontFamily: "poppins-regular",
                              }}
                            >
                              {item.subTitle}
                            </Text>
                          </View>
                          <View style={styles.tableBody}>
                            <View style={styles.inputLadderBodyContainer}>
                              <CheckBox
                                value={item.yes}
                                onValueChange={() => checkedValue(index, "yes")}
                              />
                            </View>
                            <View style={styles.inputLadderBodyContainer}>
                              <CheckBox
                                value={item.no}
                                onValueChange={() => checkedValue(index, "no")}
                              />
                            </View>
                            <View style={styles.inputLadderBodyContainer}>
                              <CheckBox
                                value={item.other}
                                onValueChange={() =>
                                  checkedValue(index, "other")
                                }
                              />
                            </View>
                          </View>
                        </View>
                      ) : (
                        <View key={index}>
                          <View>
                            <Text
                              style={{
                                fontSize: 12,
                                fontFamily: "poppins-regular",
                              }}
                            >
                              {item.subTitle}
                            </Text>
                          </View>
                          <View style={styles.tableBody}>
                            <View style={styles.inputLadderBodyContainer}>
                              <CheckBox
                                value={item.yes}
                                onValueChange={() => checkedValue(index, "yes")}
                              />
                            </View>
                            <View style={styles.inputLadderBodyContainer}>
                              <CheckBox
                                value={item.no}
                                onValueChange={() => checkedValue(index, "no")}
                              />
                            </View>
                            <View style={styles.inputLadderBodyContainer}>
                              <CheckBox
                                value={item.other}
                                onValueChange={() =>
                                  checkedValue(index, "other")
                                }
                              />
                            </View>
                          </View>
                        </View>
                      )
                    )}
                    <View style={styles.inputFieldContainer}>
                      <TextInput
                        multiline={true}
                        numberOfLines={4}
                        style={styles.inputField}
                        placeholder={
                          "Comments/further information/action to be taken"
                        }
                        value={furtherComments}
                        onChangeText={(e) => setFurtherComments(e)}
                      />
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
                    {projectImages != "" ? (
                      <View style={{ flexDirection: "row" }}>
                        {/* <Text>Hello</Text> */}
                        {projectImages.map((item, index) => (
                          <Image
                            style={{ width: 50, height: 50, marginRight: 10 }}
                            source={{ uri: item.uri }}
                            key={index}
                          />
                        ))}
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={[
                          styles.button,
                          styles.buttonOpen,
                          { width: "100%" },
                        ]}
                        onPress={() => uploadPhotoImage()}
                      >
                        <Text style={styles.textStyle}>Add Images</Text>
                      </TouchableOpacity>
                    )}
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
                      onPress={() => ladderCheckListForm()}
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
  createLadderCheckListHandler: (
    contractorName,
    projectName,
    supervisorSign,
    dateTimeComplete,
    nextDateInspection,
    furtherComments,
    ladderArrayList,
    jobID,
    tabId,
    token,
    index
  ) =>
    dispatch(
      insertLAdderCheckListForm(
        contractorName,
        projectName,
        supervisorSign,
        dateTimeComplete,
        nextDateInspection,
        furtherComments,
        ladderArrayList,
        jobID,
        tabId,
        token,
        index
      )
    ),
  // updateHealthReport: (index) => dispatch(updateHealthReport(index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LadderCheckList);
