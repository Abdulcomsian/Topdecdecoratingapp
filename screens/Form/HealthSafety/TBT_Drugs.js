import React, { useState } from "react";
import { View, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { CheckBox, Text } from "native-base";
import styles from "../../../assets/css/styles";
import { color } from "react-native-reanimated";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SignatureComponent from "../../../components/SignatureComponent";
import { connect } from "react-redux";
import { insertTbtDrugs } from "../../../Redux/action/auth/authActionTypes";
import { updateHealthReport } from "../../../Redux/action/summary/Summary";
import TBTForm from "../../../components/common/TBTForm";
import * as ImagePicker from "expo-image-picker";
import { AssetsSelector } from "expo-images-picker";

var mainImage = require("../../../assets/authScreen/Accurate-daywork-sheet-docx.png");
var plus = require("../../../assets/authScreen/plus.png");
const TBTDRUGS = (props) => {
  const { navigation, token, isOnSite, isSuccessMsg, isJobId } = props;
  // const jobID = Math.floor(Math.random() * 100) + 1;
  const { plot_Id } = props.route.params;
  const jobID = plot_Id;
  console.log("Work Plot ID :",jobID)
  const tabId = props.route.params.tabName;
  console.log("Work Tab ID :",tabId)
  const [coshhArray, setCoshhArray] = useState([
    {
      mainTitle: "ALCOHOL:",
      title:
        "•  Alcohol is a depressant drug, which depresses parts of the brain function. When working on-site, you require all of your brain functions to save you from injury.",
    },
    { title: "•	If you are found to be intoxicated with drink, you will be removed from site and face disciplinary actions." },
    {
      title:
        "•	It is not recommended to get drunk the night before and expect to work safely on site the next day. Alcohol takes time to work out of your system (1 pint of beer takes approximately 2 hours).",
    },
    { title: "•	Some fatal workplace accidents are alcohol related." },
    { title: "•	Keep your head clear – leave your drinking sessions to social events, where you cannot cause injury to yourself or others." },
    { mainTitle: "DRUGS: ", title: "•	You are far more likely to have an accident on site when under the influence of drugs. " },
    {
      title:
        "•	You may feel you do not have a drug problem and it has nothing to do with you. But if you get hurt, it is a bit late to wonder what the other person has been taking.",
    },
    { title: "•	If you know somebody is taking drugs, tell your supervisor – help to stamp it out." },
    {
      title:
        "•	Signs to look for: watery eyes, dilated pupils, running nose, hallucinations, constant sniffing, tight lips, ulcers, trembling, fatigue and irritability, behaviour changes. If you see it, report it.",
    },
    { title: "•	All drugs can affect your ability to work safely." },
    { title: "•	Some effects of drugs: slow reaction times, clumsiness, poor decision-making and distorted vision." },
    { title: "•	Drugs and work do not mix." },
    {
      title:
        "•	Legal drugs prescribed by your doctor, or over the counter at a pharmacy, could also make you unfit for work. Tell your doctor or pharmacist what your job role and ask what the side effects are. If you think there may be an issue, tell your Supervisor.",
    },
    { mainTitle: "Remember, you must: ", title: "1. Never come to work under the influence of alcohol or prohibited drugs." },
    { title: "2. Never bring alcohol or prohibited drugs to work or consume them at work. " },
    { title: "3. Inform your manager if you have to take any medication which may affect your work. " },
    { title: "4.Inform your supervisor if you believe a colleague is under the influence of alcohol or drugs. " },
  ]);
  const [toolBoxArray, setToolBoxArray] = useState([]);
  const addToolBox = () => setToolBoxArray((oldArray) => [...oldArray, { name: "", sign: "", date: "" }]);

  const [openSign, setOpenSign] = useState({
    index: -1,
    bool: false,
    isArray: false,
  });
  const [data, setData] = useState({
    contractor: "",
    project: "",
    signature: "",
    date: null,
    supervisor: "",
    tbtSign:"",
    jobSummary: [],
  });
 const tbtDrugFormInsert = async () =>{
  try {
     
    if(data.contractor!="" && data.project!="" && data.supervisor!="" && data.date!=null && data.supervisor!="" && data.tbtSign!="" && data.jobSummary!=""){
      await props.creatTbtDrugsHandler({...data,task_id:jobID,tab_id:tabId},token,props.route.params?.index)
      // props.updateHealthReport(props?.route?.params?.index);
      props.navigation.pop();
      alert("TBT DRUGS Insert SuccessFully !");
    }else{
      alert("Please Insert All Fields CareFully !");
    }
  } catch (err) {
    alert(err.message);
  }
 }
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
         {isShow ? 
         (
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
         ) : 
         (
           <View style={{flex:1}}>
             {openSign.bool ? (
        <SignatureComponent
          returnImage={(uri) => {
            if (openSign.isArray) {
              let copydata = [...data.jobSummary];
              copydata[openSign.index].sign = uri;
              setData({ ...data, jobSummary: [...copydata] });
            } else if(openSign?.index===2){
              setData({ ...data, tbtSign:uri});
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
          <View style={{ paddingTop: 30, justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.titleText}>Toolbox Talk – Drugs and Alcohol </Text>
          </View>
          <ScrollView>
            <View style={{ paddingLeft: 20, paddingRight: 20 }}>
              <View style={{ marginTop: 20 }}>
                {coshhArray.map((item, index) =>
                  item.mainTitle ? (
                    <View key={index}>
                      <Text style={{ fontFamily: "poppins-bold", fontSize: 16 }}>{item.mainTitle}</Text>
                      <Text style={{ fontFamily: "poppins-regular", fontSize: 12, backgroundColor: item.bgcolor }}>{item.title}</Text>
                    </View>
                  ) : (
                    <View key={index}>
                      <Text style={{ fontFamily: "poppins-regular", fontSize: 12, backgroundColor: item.bgcolor }}>{item.title}</Text>
                    </View>
                  )
                )}
              </View>
              <TBTForm
                isDrugs={true}
                data={data}
                getSignature={(index, bool) => setOpenSign({ ...openSign, bool: true, index, isArray: bool })}
                setTBTGlobalSign={()=>{ setOpenSign({ ...openSign, bool: true, index:2 })}}
                addToolBox={() =>
                  setData({
                    ...data,
                    jobSummary: [...data.jobSummary, { print: "", sign: "", date: null }],
                  })
                }
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
                projectImage={()=>uploadPhotoImage()}
              />
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
                  onPress={() => tbtDrugFormInsert()}
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
  creatTbtDrugsHandler: (data,token,index) =>
    dispatch(insertTbtDrugs(data,token,index)),
  // updateHealthReport: (index) => dispatch(updateHealthReport(index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TBTDRUGS);
