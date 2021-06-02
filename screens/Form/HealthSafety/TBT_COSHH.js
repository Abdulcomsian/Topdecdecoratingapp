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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import TBTForm from "../../../components/common/TBTForm";
import SignatureComponent from "../../../components/SignatureComponent";
import { connect } from "react-redux";
import { insertTBTCOSH } from "../../../Redux/action/auth/authActionTypes";
import { updateHealthReport } from "../../../Redux/action/summary/Summary";
import * as ImagePicker from "expo-image-picker";
import { AssetsSelector } from "expo-images-picker";

var mainImage = require("../../../assets/authScreen/logo.jpeg");
var plus = require("../../../assets/authScreen/plus.png");
const TBTCOSHH = (props) => {
  const { navigation, token, isOnSite, isSuccessMsg, isJobId } = props;
  // const jobID = Math.floor(Math.random() * 100) + 1;
  const { plot_Id } = props.route.params;
  const jobID = plot_Id;
  console.log("Work Plot ID :", jobID);
  const tabId = props.route.params.tabName;
  console.log("Work Tab ID :", tabId);
  const [attendenceArray, setAttendenceArray] = useState([
    { print: "", sign: "" },
  ]);
  const addAttendence = () =>
    setAttendenceArray((oldArray) => [...oldArray, { print: "", sign: "" }]);

  const [coshhArray, setCoshhArray] = useState([
    {
      title:
        "•	Assess the risk to health arising from the work and what precautions are needed.",
    },
    {
      title:
        "•	Introduce appropriate measures to prevent or control the risk - use alternative safer substances if possible.",
    },
    {
      title:
        "•	Ensure by good supervision that control measures are used and that equipment is properly maintained, and procedures observed.",
    },
    {
      title:
        "•	Where necessary, monitor the exposure of the workers and carry out an appropriate form of surveillance of their health.",
    },
    {
      title:
        "•	Make sure you are given a COSHH risk assessment for your work activities",
    },
    {
      mainTitle: "Points to Remember:",
      title:
        "•	You must co-operate with your employer and wear protective equipment when instructed to do so.",
    },
    {
      title:
        "•	The Personal Protective Equipment you are given must be in good condition and your employer cannot charge you for the cost of personal protective equipment provided to comply with the requirements of any Risk Assessment.",
    },
    {
      title:
        "•	COSHH risk assessments are produced from the manufacturer datasheet and should relate specifically to the work activity you will be carrying out.",
    },
    {
      title:
        "•	COSHH risk assessments must be reviewed on a regular basis to ensure their relevance to your working environment and processes.",
    },
  ]);
  const [openSign, setOpenSign] = useState({
    index: -1,
    bool: false,
  });
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [show, setShow] = useState(false);
  const [tbtSign, settbtSign] = useState("");
  const [getSign, setGetSign] = useState(false);
  const updateValue = (key, index, value) => {
    let preData = [...attendenceArray];
    preData[index][key] = value;
    setAttendenceArray(preData);
  };
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
  const [meetingConductBy, setMeetingConductBy] = useState("");
  const [comment, setComment] = useState("");

  const [data, setData] = useState({
    contractor: "",
    project: "",
    supervisor: "",
    date: null,
    comments: "",
    tbtSign: "",
    projectImagesComment: [],
    projectComment: "",
    commentImages: [],
    jobSummary: [],
  });
  const tbtFormInsert = async () => {
    // console.log("Main Contractor :", data);
    // console.log("Project Name :", projectName);
    // console.log("Meeting Conduct :", meetingConductBy);
    // console.log("date :", date);
    // console.log("comments :", comment);
    // console.log("Array :", attendenceArray);
    try {
      console.log("Token :", token);
      if (
        data.contractor != "" &&
        data.project != "" &&
        data.supervisor != "" &&
        data.date != null &&
        data.comments != "" &&
        data.tbtSign != "" &&
        data.jobSummary != "" &&
        data.projectImages != ""
      ) {
        await props.creatTbtCoshHandler(
          { ...data, task_id: jobID, tab_id: tabId },
          token,
          props.route.params?.index
        );
        // props.updateHealthReport(props?.route?.params?.index);
        props.navigation.pop();
        alert("TBT COSH Insert SuccessFully !");
      } else {
        alert("Please Insert All Fields CareFully !");
      }
    } catch (err) {
      alert(err.message);
    }
  };
  const [signature, setSignature] = useState({
    index: -1,
  });
  const [isShow, setIsShow] = useState(false);

  const onDone = (dataIamge) => {
    // console.log(data)
    let copydata = [...data.projectImagesComment];
    copydata[signature.index].image = dataIamge[0].uri;
    console.log(copydata)
    setData({
      ...data,
      projectImagesComment: [...copydata],
    });
    setSignature({ ...signature, index: -1 });
    setIsShow(false);
  };

  const goBack = () => {
    setIsShow(false);
  };
  const uploadPhotoImage = async (index) => {
    console.log("here", index);
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
          {openSign.bool ? (
            <SignatureComponent
              returnImage={(uri) => {
                // Yaha se ye chz dalni hai
                if (openSign?.index === 2) {
                  setData({ ...data, tbtSign: uri });
                  setOpenSign({ bool: false, index: -1 });
                } else {
                  let copydata = [...data.jobSummary];
                  copydata[openSign.index].sign = uri;
                  setData({ ...data, jobSummary: [...copydata] });
                  setOpenSign({ bool: false, index: -1 });
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
                  Control of Substances Hazardous to Health Regulations
                  2002(COSHH)-Toolbar Talk
                </Text>
              </View>
              <ScrollView>
                <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                  <Text style={{ fontFamily: "poppins-regular", fontSize: 12 }}>
                    <Text
                      style={{ fontFamily: "poppins-semiBold", fontSize: 12 }}
                    >
                      COSHH
                    </Text>{" "}
                    - The basic principle of these regulations is to safeguard
                    the health of all of us who have to work with substances
                    that can be hazardous to health. A substance can be a
                    liquid, solid or gas and include micro-organisms and dust.
                    These regulations apply to all places of work. The main
                    requirements of the regulations are for your employer to:
                  </Text>
                  <View style={{ marginTop: 20 }}>
                    {coshhArray.map((item, index) =>
                      item.mainTitle ? (
                        <View key={index}>
                          <Text
                            style={{ fontFamily: "poppins-bold", fontSize: 16 }}
                          >
                            {item.mainTitle}
                          </Text>
                          <Text
                            style={{
                              fontFamily: "poppins-regular",
                              fontSize: 12,
                            }}
                          >
                            {item.title}
                          </Text>
                        </View>
                      ) : (
                        <View key={index}>
                          <Text
                            style={{
                              fontFamily: "poppins-regular",
                              fontSize: 12,
                            }}
                          >
                            {item.title}
                          </Text>
                        </View>
                      )
                    )}
                  </View>
                  <TBTForm
                    data={data}
                    getSignature={(index) =>
                      setOpenSign({ ...openSign, bool: true, index })
                    }
                    setTBTGlobalSign={() => {
                      setOpenSign({ ...openSign, bool: true, index: 2 });
                    }} //Ye chz dalni hai
                    addAttendence={() =>
                      setData({
                        ...data,
                        jobSummary: [
                          ...data.jobSummary,
                          { print: "", sign: "" },
                        ],
                      })
                    }
                    addImagesCommentRow={() =>
                      setData({
                        ...data,
                        projectImagesComment: [
                          ...data.projectImagesComment,
                          { image: "", comment: "" },
                        ],
                      })
                    }
                    onCommentChange={(key, value, index = -1) => {
                      if (index >= 0) {
                        let preData = [...data.projectImagesComment];
                        preData[index][key] = value;
                        setData({
                          ...data,
                          projectImagesComment: [...preData],
                        });
                        let commentData = preData.map((item, index) => {
                          return { comment: item.comment };
                        });
                        setData({
                          ...data,
                          commentImages: [...commentData],
                        });
                      } else {
                        setData({ ...data, [key]: value });
                      }
                    }}
                    onChangeData={(key, value, index = -1) => {
                      if (index >= 0) {
                        let copyAttendance = [...data.jobSummary];
                        copyAttendance[index].print = value;
                        setData({ ...data, jobSummary: [...copyAttendance] });
                      } else {
                        setData({ ...data, [key]: value });
                      }
                    }}
                    projectImageUpload={(index) => uploadPhotoImage(index)}
                  />
                  <Text
                    style={{
                      fontFamily: "poppins-bold",
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    Once completed, please file a copy in the Site Folder and
                    send a copy to our Head Office also please give a copy to
                    the site staff
                  </Text>
                  <View style={styles.footerView}>
                    <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                      Address: 2,
                      <Text
                        style={{ fontFamily: "poppins-regular", fontSize: 10 }}
                      >
                        {" "}
                        Green Lane, Penge, London SE20 7JA
                      </Text>
                    </Text>
                    <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                      T:{" "}
                      <Text
                        style={{ fontFamily: "poppins-regular", fontSize: 10 }}
                      >
                        {" "}
                        0208 676 060
                      </Text>
                    </Text>
                    <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                      F:{" "}
                      <Text
                        style={{ fontFamily: "poppins-regular", fontSize: 10 }}
                      >
                        {" "}
                        0208 676 0671
                      </Text>
                    </Text>
                    <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                      M:{" "}
                      <Text
                        style={{ fontFamily: "poppins-regular", fontSize: 10 }}
                      >
                        {" "}
                        07737 632206
                      </Text>
                    </Text>
                    <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                      E:{" "}
                      <Text
                        style={{ fontFamily: "poppins-regular", fontSize: 10 }}
                      >
                        {" "}
                        info@topdecdecorating.com
                      </Text>
                    </Text>
                    <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                      W:{" "}
                      <Text
                        style={{ fontFamily: "poppins-regular", fontSize: 10 }}
                      >
                        {" "}
                        www.topdecdecorating.com
                      </Text>
                    </Text>
                    <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                      VAT Registration Number:{" "}
                      <Text
                        style={{ fontFamily: "poppins-regular", fontSize: 10 }}
                      >
                        {" "}
                        203 474 927
                      </Text>
                    </Text>
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
                      onPress={() => tbtFormInsert()}
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
  creatTbtCoshHandler: (data, token, index) =>
    dispatch(insertTBTCOSH(data, token, index)),
  // updateHealthReport: (index) => dispatch(updateHealthReport(index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TBTCOSHH);
