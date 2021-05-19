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
import { insertTbtRespiratory } from "../../../Redux/action/auth/authActionTypes";
import { updateHealthReport } from "../../../Redux/action/summary/Summary";
import * as ImagePicker from "expo-image-picker";
import { AssetsSelector } from "expo-images-picker";

var mainImage = require("../../../assets/authScreen/Accurate-daywork-sheet-docx.png");
var plus = require("../../../assets/authScreen/plus.png");
const TBTRESPIRATORY = (props) => {
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
      title:
        "The main benefit of wearing a mask is that it helps prevent you from getting ill and therefore helps keep you working. Specifically, it helps prevent the development of illnesses which could affect your airways – which could reduce the quality and length of your life.",
    },
    {
      title:
        "Wearing a mask can stop you from developing the symptoms of respiratory illness caused by inhalation of hazardous substances at work (for example, coughing, wheezing, shortness of breath, chest tightness or difficulty in breathing).",
    },
    {
      title:
        "Also remember that people can be affected differently following exposure to hazardous substances – and, in the case of long-term ill-health – we don’t know who is more likely to become ill (i.e. develop respiratory diseases).",
    },
    {
      mainTitle: "Points to Remember:",
      title:
        "•	If there are good reasons for having a beard (e.g. for religious reasons), alternative forms of RPE, that do not rely on a tight fit to the face, are available.",
    },
    { title: "•	Clean shaven at the start of your shift." },
    { title: "•	Ensure the mask is clean and in good working condition." },
    {
      title:
        "•	Do not remove the mask in hazard areas to talk or inspect the works.",
    },
    { title: "•	Store the mask in a clean area when not in use. " },
    {
      title:
        "Why gamble with your health? An easy way to protect your long-term health is to wear your mask and wear it correctly.",
    },
    {
      title:
        "Many masks rely on a good seal against the face so that, when you breathe air in, it is drawn into the filter material where the air is cleaned. If there are any gaps around the edges of the mask, ‘dirty’ air will pass through these gaps and into your lungs. It is therefore very important that you put your mask on correctly and check for a good fit every time.",
    },
    {
      title:
        "Facial hair – stubble and beards – make it impossible to get a good seal of the mask to the face. If you are clean-shaven when wearing tight-fitting masks (i.e. those which rely on a good seal to the face), this will help prevent leakage of contaminated air around the edges of the mask and into your lungs. You will therefore be breathing in clean air, which will help you stay healthy.",
    },
    {
      mainTitle:
        "How to fit mask correctly - For Filtering Face Piece (FFP)- Disposable Mask ",
      title: "•	Clean shaven at the start of your shift.",
    },
    { title: "•	Always check the fit every use:" },
    { title: "Fit around the nose/nose clip" },
    { title: "Fit around the chin" },
    { title: "Check the position of the strap" },
    {
      mainTitle: "Supervisor - Carrying out a fit-check instruction – ",
      title:
        "*move head up and down normally whilst wearing the mask, check for gaps around nose and chin areas.  *Wearers to cover the seal of the mask with one hand whilst breathing in and out taking deep breaths. When the wearer breathes out if they feel air escaping around their eyes or chin areas then the mask does not fit accurately, and it will not protect them.",
    },
    {
      title:
        "*Face fit testing by competent person will be carried out on operative to ensure the mask selected for use is suitable and protects the wearer.",
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
    tbtsign: "",
    projectImages: [],
    projectComment:"",
    jobSummary: [],
  });
  const tbtFormInsert = async () => {
    try {
      if (
        data.contractor != "" &&
        data.project != "" &&
        data.supervisor != "" &&
        data.date != "" && 
        data.comments != "" &&
        data.tbtsign != "" &&
        data.projectImages != "" &&
        data.jobSummary != "" &&
        data.projectComment !=""
      ) {
        await props.creatTbtRespiratoryHandler(
          { ...data, task_id: jobID, tab_id: tabId },
          token,
          props.route.params?.index
        );
        // props.updateHealthReport(props?.route?.params?.index);
        props.navigation.pop();
        alert("TBT RESPIRATORY Insert SuccessFully !");
      } else {
        alert("Please Insert All Fields CareFully !");
      }
    } catch (err) {
      alert(err.message);
    }
  };
  const [isShow, setIsShow] = useState(false);

  const onDone = (dataImage) => {
    setData({ ...data, projectImages: dataImage });
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
  console.log("Project Iamges :", data.projectImages);
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
                  Toolbox Talk Respiratory Protection (RPE) – Dust Mask
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
                    onChangeData={(key, value, index = -1) => {
                      if (index >= 0) {
                        let copyAttendance = [...data.jobSummary];
                        copyAttendance[index].print = value;
                        setData({ ...data, jobSummary: [...copyAttendance] });
                      } else {
                        setData({ ...data, [key]: value });
                      }
                    }}
                    projectImage={() => uploadPhotoImage()}
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
                    <View style={styles.btnContainer}>
                      <TouchableOpacity
                        style={styles.commonBtn}
                        onPress={() => tbtFormInsert()}
                      >
                        <Text style={styles.commonText}>Save</Text>
                      </TouchableOpacity>
                    </View>
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
  creatTbtRespiratoryHandler: (data, token, index) =>
    dispatch(insertTbtRespiratory(data, token, index)),
  // updateHealthReport: (index) => dispatch(updateHealthReport(index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TBTRESPIRATORY);
