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
import TBTForm from "../../../components/common/TBTForm";
import SignatureComponent from "../../../components/SignatureComponent";
import { connect } from "react-redux";
import { insertTbtMobileForm } from "../../../Redux/action/auth/authActionTypes";
import { updateHealthReport } from "../../../Redux/action/summary/Summary";
import * as ImagePicker from "expo-image-picker";
import { AssetsSelector } from "expo-images-picker";

var mainImage = require("../../../assets/authScreen/logo.jpeg");
var plus = require("../../../assets/authScreen/plus.png");
const TBTMOBILE = (props) => {
  const { navigation, token, isOnSite, isSuccessMsg, isJobId } = props;
  // const jobID = Math.floor(Math.random() * 100) + 1;
  const { plot_Id } = props.route.params;
  const jobID = plot_Id;
  console.log("Work Plot ID :", jobID);
  const tabId = props.route.params.tabName;
  console.log("Work Tab ID :", tabId);
  const [attendenceArray, setAttendenceArray] = useState([]);
  const addAttendence = () =>
    setAttendenceArray((oldArray) => [...oldArray, { print: "", sign: "" }]);

  const [coshhArray, setCoshhArray] = useState([
    {
      mainTitle: "Mobile Elevated Work Platform (MEWP ",
      title:
        "Mobile Elevated Work Platforms (MEWP’s) are useful pieces of plant when used properly. However, they combine height with mobility and can be extremely dangerous if misused.",
    },
    {
      title:
        "Ensure the correct MEWP is selected for the task (ground, height, etc). ",
    },
    {
      title:
        "Only suitably trained operators can use MEWP’s (and must be trained for that specific item of plant).",
    },
    { title: "Continually monitor weather conditions" },
    {
      mainTitle: "Points to Remember:",
      title:
        "•	Assess ground conditions (uneven surface could result in MEWP overturning).",
    },
    {
      title:
        "•	Check for overhead obstructions (especially overhead power lines) bearing in mind the height the MEWP can be extended to.",
    },
    {
      title: "•	Beware of collision with other plant, equipment, scaffold etc.",
    },
    {
      title:
        "•	Be particularly aware when using near public footpaths and streets. Remember to allow enough room for pedestrians.",
    },
    {
      title:
        "•	Always check that the plant is stable prior to use.  Deploy stabilisers, outriggers etc as required.",
    },
    {
      title:
        "•	Any tools, materials etc taken on board must be secured so far as is reasonably practicable to ensure they don’t fall from the edge.",
    },
    {
      title:
        "•	It is recommended that operators employ safety harnesses as secondary protection.",
    },
    { title: "•	Never exceed Safe Working Loads." },
    {
      title:
        "•	When manoeuvring in tight areas or near public rights of way ensure a banksman/signaller is deployed.",
    },
    {
      title:
        "•	Consider refuelling options (LPG, Diesel etc). Refuelling should take place in the open air where practicable and the engine must be switched off.",
    },
    { title: "•	Any diesel spillages etc should be cleaned up immediately." },
    {
      title:
        "•	MEWP’s must be subject to thorough examinations at least once every six months and should be subject to regular local inspections (weekly?), the findings of which should be recorded.",
    },
  ]);
  const [openSign, setOpenSign] = useState({
    index: -1,
    bool: false,
  });
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
    try {
      console.log("Try :", token);
      if (
        data.contractor != "" &&
        data.project != "" &&
        data.supervisor != "" &&
        data.date != null &&
        data.comments != "" &&
        data.tbtSign != "" &&
        data.jobSummary != "" &&
        data.projectImages !=""
      ) {
        await props.creatTbtMobileElevatedHandler(
          { ...data, task_id: jobID, tab_id: tabId },
          token,
          props.route.params?.index
        );
        // props.updateHealthReport(props?.route?.params?.index);
        props.navigation.pop();
        alert("TBT Mobile Insert SuccessFully !");
      } else {
        alert("Please Insert All Fields CareFully !");
      }
    } catch (err) {
      alert(err.message);
    }
  };
  const [isShow, setIsShow] = useState(false);
  const [signature, setSignature] = useState({
    index: -1,
  });
  const onDone = (dataImage) => {
    let copydata = [...data.projectImagesComment];
    copydata[signature.index].image = dataImage[0].uri;
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
  console.log("Project Iamges :", data.projectImages);
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
          {openSign.bool ? (
            <SignatureComponent
              returnImage={(uri) => {
                let copydata = [...data.jobSummary];
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
                  Toolbox Talk - Mobile Elevated Work Platform (MEWP)
                </Text>
              </View>
              <ScrollView>
                <View style={{ paddingLeft: 20, paddingRight: 20 }}>
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
                              backgroundColor: item.bgcolor,
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
                              backgroundColor: item.bgcolor,
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
                    }}
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
                    send a copy to our Head Office and give a copy to the site
                    staff.
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
  creatTbtMobileElevatedHandler: (data, token, index) =>
    dispatch(insertTbtMobileForm(data, token, index)),
  // updateHealthReport: (index) => dispatch(updateHealthReport(index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TBTMOBILE);
