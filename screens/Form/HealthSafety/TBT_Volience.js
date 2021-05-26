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
import SignatureComponent from "../../../components/SignatureComponent";
import { connect } from "react-redux";
import { insertTbtVolience } from "../../../Redux/action/auth/authActionTypes";
import { updateHealthReport } from "../../../Redux/action/summary/Summary";
import TBTForm from "../../../components/common/TBTForm";
import * as ImagePicker from "expo-image-picker";
import { AssetsSelector } from "expo-images-picker";

var mainImage = require("../../../assets/authScreen/logo.jpeg");
var plus = require("../../../assets/authScreen/plus.png");
const TBTVOLIENCE = (props) => {
  const { navigation, token, isOnSite, isSuccessMsg, isJobId } = props;
  // const jobID = Math.floor(Math.random() * 100) + 1;
  const { plot_Id } = props.route.params;
  const jobID = plot_Id;
  console.log("Work Plot ID :", jobID);
  const tabId = props.route.params.tabName;
  console.log("Work Tab ID :", tabId);
  const [coshhArray, setCoshhArray] = useState([
    {
      title:
        "We would like to remind you that Top Dec Decorating has a zero-tolerance policy on violence and aggression and will not tolerate violence, threats, harassment, intimidation, and other disruptive behaviour, either physical or verbal, that occurs in the workplace or other areas. This applies to violence and aggression which is aimed at members of management, co-workers, employees, and non-employees such as contractors, customers, tenants, and visitors.",
    },
    {
      title:
        "Your co-operation is needed to help eradicate such behaviours and to maintain a safe working environment. Also, we should not ignore violent, threatening, harassing, intimidating, or other disruptive behaviour. If you observe or experience such behaviour, report it immediately to your Manager/Supervisor who will give further advice. Where the incident is serious in nature you are encouraged to report it to the police.",
    },
    {
      title:
        "All operatives/employees are always required to display common courtesy and engage in safe and appropriate behaviour on the job.",
    },
    {
      title:
        "You are required to read and sign our Violence and Aggression at work Policy (a copy will be provided to you by Top Dec Decorating Supervisor) to state you have understood its contents and you shall adhere accordingly.",
    },
  ]);
  const [toolBoxArray, setToolBoxArray] = useState([]);
  const addToolBox = () =>
    setToolBoxArray((oldArray) => [
      ...oldArray,
      { name: "", sign: "", date: "" },
    ]);

  const [openSign, setOpenSign] = useState({
    index: -1,
    bool: false,
    isArray: false,
  });
  const [data, setData] = useState({
    signature: "",
    date: null,
    supervisor: "",
    tbtSign: "",
    projectImagesComment: [],
    projectComment: "",
    commentImages: [],
    jobSummary: [],
  });
  const tbtVolienceFormInsert = async () => {
    console.log("Token :", token);
    try {
      if (
        data.signature != "" &&
        data.date != null &&
        data.supervisor != "" &&
        data.tbtSign != "" &&
        data.jobSummary != "" &&
        data.projectImages !="" &&
        data.projectComment !=""
      ) {
        await props.creatTbtVolienceHandler(
          { ...data, task_id: jobID, tab_id: tabId },
          token,
          props.route.params?.index
        );
        // props.updateHealthReport(props?.route?.params?.index);
        props.navigation.pop();
        alert("TBT VOLIENCE Insert SuccessFully !");
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
                if (openSign.isArray) {
                  let copydata = [...data.jobSummary];
                  copydata[openSign.index].sign = uri;
                  setData({ ...data, jobSummary: [...copydata] });
                } else if (openSign?.index === 2) {
                  setData({ ...data, tbtSign: uri });
                  setOpenSign({ bool: false, index: -1 });
                } else {
                  setData({ ...data, signature: uri });
                }
                setOpenSign({ bool: false, index: -1, isArray: false });
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
                  Toolbox Talk – Violence and Aggression
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
                              paddingBottom: 10,
                            }}
                          >
                            {item.title}
                          </Text>
                        </View>
                      )
                    )}
                  </View>
                  <TBTForm
                    isVoilence={true}
                    data={data}
                    getSignature={(index, bool) =>
                      setOpenSign({
                        ...openSign,
                        bool: true,
                        index,
                        isArray: bool,
                      })
                    }
                    setTBTGlobalSign={() => {
                      setOpenSign({ ...openSign, bool: true, index: 2 });
                    }}
                    addToolBox={() =>
                      setData({
                        ...data,
                        jobSummary: [
                          ...data.jobSummary,
                          { print: "", sign: "", date: null },
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
                    onChangeData={(key, value, index = -1, addDate = false) => {
                      if (index >= 0) {
                        let copyAttendance = [...data.jobSummary];

                        if (addDate) {
                          copyAttendance[index].date = value;
                        } else {
                          copyAttendance[index].print = value;
                        }

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
                      fontSize: 10,
                      textAlign: "center",
                      paddingTop: 10,
                    }}
                  >
                    Once completed, please file a copy in the Site Folder and
                    send a copy to our Head Office and a copy should be given to
                    the site team{" "}
                  </Text>
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
                      onPress={() => tbtVolienceFormInsert()}
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
  creatTbtVolienceHandler: (data, token, index) =>
    dispatch(insertTbtVolience(data, token, index)),
  // updateHealthReport: (index) => dispatch(updateHealthReport(index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TBTVOLIENCE);
