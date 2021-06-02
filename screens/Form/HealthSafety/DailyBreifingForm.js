import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  CheckBox,
} from "react-native";
import { Text } from "native-base";
import styles from "../../../assets/css/styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SignatureComponent from "../../../components/SignatureComponent";
import { connect } from "react-redux";
import { updateHealthReport } from "../../../Redux/action/summary/Summary";
import { insertDailyBreifingForm } from "../../../Redux/action/auth/authActionTypes";
import * as ImagePicker from "expo-image-picker";
import { AssetsSelector } from "expo-images-picker";

var mainImage = require("../../../assets/authScreen/Accurate-daywork-sheet-docx.png");
var work = require("../../../assets/authScreen/work.png");
var lift = require("../../../assets/authScreen/lifting.png");
var tools = require("../../../assets/authScreen/tools.png");
var harmful = require("../../../assets/authScreen/harmful.png");
var ppe = require("../../../assets/authScreen/ppe.png");
var keeping = require("../../../assets/authScreen/keeping.png");
var health = require("../../../assets/authScreen/health.png");
var traffic = require("../../../assets/authScreen/traffic.png");
var enviornments = require("../../../assets/authScreen/enviornment.png");
var permit = require("../../../assets/authScreen/permit.png");
var weather = require("../../../assets/authScreen/weather.png");

var plus = require("../../../assets/authScreen/plus.png");
const DailyBreifingForm = (props) => {
  const { navigation, token, isSuccessMsg, isSuccess } = props;
  // const jobID = Math.floor(Math.random() * 100) + 1;
  const { plot_Id } = props.route.params;
  const jobID = plot_Id;
  console.log("Work Plot ID :", jobID);
  const tabId = props.route.params.tabName;
  console.log("Work Tab ID :", tabId);
  const [hazrdArray, setHazrdArray] = useState([]);
  const addHazrdArray = () => {
    setHazrdArray((oldArray) => [
      ...oldArray,
      { hazrd: "", action: "", responsible: "" },
    ]);
  };
  const updateValue = (key, index, value) => {
    let preData = [...hazrdArray];
    preData[index][key] = value;
    setHazrdArray(preData);
  };
  const [dailyArray, setDailyArray] = useState([
    { title: "Supervision", check: false },
    { title: "RiskAssessment", check: false },
    { title: "Method Statement", check: false },
    { title: "Training", check: false },
    { title: "COSHH Assessment", check: false },
    { title: "Plant/Equip certificate", check: false },
    { title: "Exclusion Zones", check: false },
    { title: "Signage", check: false },
    { title: "P.P.E", check: false },
    { title: "Mobile tower checklist", check: false },
    { title: "Emergency procedure", check: false },
    { title: "Hot works", check: false },
    { title: "Drugs & Alcohol", check: false },
    { title: "House keeping", check: false },
    { title: "Permit to work", check: false },
    { title: "Language", check: false },
  ]);
  const [jobSafetyArray, setJobSafetyArray] = useState([
    { title: "Work at Height", image: work, check: false },
    { title: "Lifting", image: lift, check: false },
    { title: "Work at Height", image: work, check: false },
    { title: "Electricity", image: work, check: false },
    { title: "Tool & Equipment", image: tools, check: false },
    { title: "Harmful Substances", image: harmful, check: false },
    { title: "PPE", image: ppe, check: false },
    { title: "House- keeping", image: keeping, check: false },
    { title: "Manual Handling", image: work, check: false },
    { title: "Health Hazard", image: health, check: false },
    { title: "Traffic Safety", image: traffic, check: false },
    { title: "Environmental Hazard", image: enviornments, check: false },
    { title: "Permits to Work", image: permit, check: false },
    { title: "Weather Conditions", image: weather, check: false },
  ]);
  const [berifingArray, setBerifingArray] = useState([
    { title: "Have the right skills for the job", check: false },
    { title: "Need a signed permit to work?", check: false },
    {
      title: "Impact onto others working around us? Who are they?",
      check: false,
    },
    { title: "Segregated form others working around us?", check: false },
    { title: "Feel good and fit for work? ", check: false },
    {
      title:
        "Notice any changes to work since the method statement was drafted? ",
      check: false,
    },
  ]);
  const [operativeArray, setOperativeArray] = useState([]);
  const addOperativeArray = () =>
    setOperativeArray((oldArray) => [...oldArray, { name: "", sign: "" }]);
  const updateOperativeValue = (key, index, value) => {
    let preData = [...operativeArray];
    preData[index][key] = value;
    setOperativeArray(preData);
  };
  const checkedDailyValue = (key, index) => {
    let preData = [...dailyArray];
    if (preData[index][key]) {
      preData[index][key] = false;
    } else {
      preData[index][key] = true;
    }

    setDailyArray(preData);
  };
  const checkedBreiflyValue = (key, index) => {
    let preData = [...berifingArray];
    if (preData[index][key]) {
      preData[index][key] = false;
    } else {
      preData[index][key] = true;
    }

    setBerifingArray(preData);
  };
  const checkedJobValue = (key, index) => {
    let preData = [...jobSafetyArray];
    if (preData[index][key]) {
      preData[index][key] = false;
    } else {
      preData[index][key] = true;
    }
    setJobSafetyArray(preData);
  };
  const [date, setDate] = useState("");
  const [show, setShow] = useState(false);
  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(new Date(currentDate).toLocaleDateString());
  };
  const showDatepicker = () => {
    setShow(true);
  };
  const [mainContractor, setMainContractor] = useState("");
  const [projectName, setProjectName] = useState("");
  const [supervisorName, setSupervisorName] = useState("");
  const [statementNumber, setStatementNumber] = useState("");
  const [safeStartSiganture, setSafeStartSiganture] = useState("");
  const [getSign, setGetSign] = useState(false);

  const [projectComment, setProjectComment] = useState("");
  const dailyBrefilyFormInsert = async () => {
    try {
      console.log("Try Token :", token);
      if (
        mainContractor != "" &&
        projectName != "" &&
        projectName != "" &&
        supervisorName != "" &&
        statementNumber != "" &&
        date != "" &&
        dailyArray != "" &&
        jobSafetyArray != "" &&
        berifingArray != "" &&
        operativeArray != "" &&
        hazrdArray != "" &&
        safeStartSiganture != "" &&
        projectImagesComment != "" &&
        commentImages != ""
      ) {
        await props.createDailyBreifingHandler(
          mainContractor,
          projectName,
          supervisorName,
          statementNumber,
          date,
          dailyArray,
          jobSafetyArray,
          berifingArray,
          operativeArray,
          hazrdArray,
          safeStartSiganture,
          projectImagesComment,
          commentImages,
          jobID,
          tabId,
          token,
          props.route.params?.index
        );
        // props.updateHealthReport(props?.route?.params?.index);
        alert("Daily Breifing Insert SuccessFully !");
        props.navigation.pop();
      }
    } catch (err) {
      alert(err.message);
    }
  };
  const [signature, setSignature] = useState({
    bool: false,
    isSign: false,
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
                setSafeStartSiganture(uri);
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
                  Top Dec’s Daily Briefing Form - SAFE START
                </Text>
              </View>
              <ScrollView>
                <View style={styles.formCodnatiner}>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      style={styles.inputField}
                      placeholder={"Main Contractor"}
                      value={mainContractor}
                      onChangeText={(e) => setMainContractor(e)}
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
                      placeholder={"Supervisor"}
                      value={supervisorName}
                      onChangeText={(e) => setSupervisorName(e)}
                    />
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      style={styles.inputField}
                      placeholder={"Method statement No"}
                      value={statementNumber}
                      onChangeText={(e) => setStatementNumber(e.replace(/[^0-9]/g, ""))}
                    />
                  </View>
                  <View style={styles.inputFieldContainer}>

                  <TouchableOpacity onPress={() => showDatepicker()}>
                      <TextInput
                        editable={false}
                        value={date ? new Date(date).toLocaleDateString() : ""}
                        style={styles.inputField}
                        placeholder={"Date"}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={{ marginTop: 20 }}>
                    <Text
                      style={{
                        fontFamily: "poppins-bold",
                        fontSize: 10,
                        textAlign: "center",
                      }}
                    >
                      Before each Team Briefing……Ask yourself do I need to
                      discuss!
                    </Text>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "column",
                        marginTop: 10,
                      }}
                    >
                      {dailyArray.map((item, index) => (
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            marginBottom: 10,
                          }}
                          key={index}
                        >
                          <View style={{ width: "90%" }}>
                            <Text
                              style={{
                                fontFamily: "poppins-semiBold",
                                fontSize: 10,
                              }}
                            >
                              {item.title}
                            </Text>
                          </View>
                          <View
                            style={{
                              width: "10%",
                              justifyContent: "flex-end",
                              alignItems: "flex-end",
                            }}
                          >
                            <CheckBox
                              value={item.check}
                              onValueChange={() =>
                                checkedDailyValue("check", index)
                              }
                            />
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: "poppins-bold", fontSize: 10 }}>
                      During the briefing ask EVERYONE……Do WE…?
                    </Text>
                    {berifingArray.map((item, index) => (
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          marginTop: 10,
                        }}
                      >
                        <View style={{ width: "100%", flexDirection: "row" }}>
                          <View style={{ width: "90%" }}>
                            <Text
                              style={{
                                fontFamily: "poppins-semiBold",
                                fontSize: 10,
                              }}
                            >
                              {item.title}
                            </Text>
                          </View>
                          <View
                            style={{
                              width: "10%",
                              justifyContent: "flex-end",
                              alignItems: "flex-end",
                            }}
                          >
                            <CheckBox
                              value={item.check}
                              onValueChange={() =>
                                checkedBreiflyValue("check", index)
                              }
                            />
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                  <View style={{ marginTop: 20, marginBottom: 20 }}>
                    <Text style={{ fontFamily: "poppins-bold", fontSize: 10 }}>
                      Ask which ‘keys’ WE need to complete this job safely…
                    </Text>
                    {jobSafetyArray.map((item, index) => (
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          marginTop: 10,
                        }}
                        key={index}
                      >
                        <View style={{ width: "100%", flexDirection: "row" }}>
                          <View style={{ width: "60%" }}>
                            <Text
                              style={{
                                fontFamily: "poppins-semiBold",
                                fontSize: 10,
                              }}
                            >
                              {item.title}
                            </Text>
                          </View>
                          <View
                            style={{
                              width: "30%",
                              justifyContent: "flex-end",
                              alignItems: "flex-end",
                              paddingRight: 20,
                            }}
                          >
                            <Image
                              style={{ height: 50, width: 50 }}
                              source={item.image}
                            />
                          </View>
                          <View
                            style={{
                              width: "10%",
                              justifyContent: "flex-start",
                              alignItems: "flex-start",
                              paddingRight: 30,
                            }}
                          >
                            <CheckBox
                              value={item.check}
                              onValueChange={() =>
                                checkedJobValue("check", index)
                              }
                            />
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                  <View style={styles.tableViewContainer}>
                    <View style={styles.tableHeader}>
                      <View style={styles.headerProjectTitleView}>
                        <Text style={styles.headerTitle}>
                          What are the Hazards?
                        </Text>
                      </View>
                      <View style={styles.headerProjectTitleView}>
                        <Text style={styles.headerTitle}>
                          What are the Actions?
                        </Text>
                      </View>
                      <View style={styles.headerProjectTitleView}>
                        <Text style={styles.headerTitle}>
                          Who (name) will do it?
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableHeader}>
                      <View style={styles.headerProjectTitleView}>
                        <Text style={styles.headerTitle}>HAZARD</Text>
                      </View>
                      <View style={styles.headerProjectTitleView}>
                        <Text style={styles.headerTitle}>ACTION</Text>
                      </View>
                      <View style={styles.headerProjectTitleView}>
                        <Text style={styles.headerTitle}>
                          WHO IS RESPONSIBLE
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
                        onPress={() => addHazrdArray()}
                      >
                        <Image style={styles.plusBtn} source={plus} />
                      </TouchableOpacity>
                    </View>
                    {hazrdArray.map((item, index) => (
                      <View style={styles.tableBody} key={index}>
                        <View style={styles.inputHazrdBodyContainer}>
                          <TextInput
                            style={styles.bodyTextInput}
                            placeholder={"HAZARD"}
                            value={item.hazrd}
                            onChangeText={(txt) =>
                              updateValue("hazrd", index, txt)
                            }
                          />
                        </View>
                        <View style={styles.inputHazrdBodyContainer}>
                          <TextInput
                            style={styles.bodyTextInput}
                            placeholder={"ACTION"}
                            value={item.action}
                            onChangeText={(txt) =>
                              updateValue("action", index, txt)
                            }
                          />
                        </View>
                        <View style={styles.inputHazrdBodyContainer}>
                          <TextInput
                            style={styles.bodyTextInput}
                            placeholder={"WHO IS RESPONSIBLE"}
                            value={item.responsible}
                            onChangeText={(txt) =>
                              updateValue("responsible", index, txt)
                            }
                          />
                        </View>
                      </View>
                    ))}
                    <View
                      style={{
                        paddingTop: 30,
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 20,
                      }}
                    >
                      <Text style={styles.titleText}>
                        Top Dec Daily Briefing Form- SAFE START
                      </Text>
                      <Text
                        style={{
                          fontFamily: "poppins-regular",
                          fontSize: 10,
                          textAlign: "center",
                        }}
                      >
                        Operatives: I declare that I have been briefed on the
                        safe system of work. I agree to follow all instructions
                        given in the interest of health and safety and will not
                        place myself, or others in any danger. I am not under
                        the influence of alcohol or drugs.
                      </Text>
                    </View>
                    <View style={styles.tableViewContainer}>
                      <View style={styles.tableHeader}>
                        <View style={styles.headerWitnessTitleView}>
                          <Text style={styles.headerTitle}>
                            Names of operatives attending
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
                          onPress={() => addOperativeArray()}
                        >
                          <Image style={styles.plusBtn} source={plus} />
                        </TouchableOpacity>
                      </View>
                      {operativeArray.map((item, index) => (
                        <View style={styles.tableBody} key={index}>
                          <Text
                            style={{
                              width: "10%",
                              justifyContent: "center",
                              alignItems: "center",
                              paddingTop: 20,
                              fontFamily: "poppins-regular",
                              fontSize: 10,
                            }}
                          >
                            {index}
                          </Text>
                          <View style={styles.inputOprativesBodyContainer}>
                            <TextInput
                              style={styles.bodyTextInput}
                              placeholder={"HAZARD"}
                              value={item.name}
                              onChangeText={(txt) =>
                                updateOperativeValue("name", index, txt)
                              }
                            />
                          </View>
                        </View>
                      ))}
                      <View
                        style={[
                          styles.inputOprativesBodyContainer,
                          { marginTop: 20 },
                        ]}
                      >
                        <TouchableOpacity
                          onPress={() => setGetSign(true)}
                          style={[
                            styles.inputHarmFullBodyContainer,
                            {
                              width: "100%",
                            },
                          ]}
                        >
                          {safeStartSiganture ? (
                            <Image
                              source={{ uri: safeStartSiganture }}
                              style={{
                                height: 100,
                                width: 100,
                                backgroundColor: "gray",
                              }}
                            />
                          ) : (
                            <Text
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
                              Sign
                            </Text>
                          )}
                        </TouchableOpacity>
                      </View>
                      <Text
                        style={{
                          fontFamily: "poppins-regular",
                          fontSize: 10,
                          textAlign: "center",
                          marginTop: 20,
                        }}
                      >
                        Site Supervisor: I confirm that I have brief the
                        operative on the task method statement, generic and
                        specific risk assessment, COSHH assessments, any hazards
                        whilst working, emergency procedures, control measures ,
                        P.PE etc.
                      </Text>
                      <Text
                        style={{
                          fontFamily: "poppins-regular",
                          fontSize: 10,
                          textAlign: "center",
                          marginTop: 20,
                        }}
                      >
                        The supervisor sign to confirm that they have been
                        instructed and understand the above items.
                      </Text>
                      <Text
                        style={{
                          fontFamily: "poppins-regular",
                          fontSize: 10,
                          textAlign: "center",
                          marginTop: 20,
                        }}
                      >
                        Operative has shown any sign of been under the influence
                        of alcohol or drugs
                      </Text>
                      <Text
                        style={{
                          fontFamily: "poppins-semiBold",
                          fontSize: 10,
                          textAlign: "center",
                          marginTop: 20,
                        }}
                      >
                        Once completed, please place a copy in the Site Folder
                        and send a copy to Top Dec’s head Office. Also, please
                        give a copy to the Site Staff.
                      </Text>
                    </View>
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
                      onPress={() => dailyBrefilyFormInsert()}
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
  createDailyBreifingHandler: (
    mainContractor,
    projectName,
    supervisorName,
    statementNumber,
    date,
    dailyArray,
    jobSafetyArray,
    berifingArray,
    operativeArray,
    hazrdArray,
    safeStartSiganture,
    projectImagesComment,
    commentImages,
    jobID,
    tabId,
    token,
    index
  ) =>
    dispatch(
      insertDailyBreifingForm(
        mainContractor,
        projectName,
        supervisorName,
        statementNumber,
        date,
        dailyArray,
        jobSafetyArray,
        berifingArray,
        operativeArray,
        hazrdArray,
        safeStartSiganture,
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
export default connect(mapStateToProps, mapDispatchToProps)(DailyBreifingForm);
