import React, { useState } from "react";
import { View, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { CheckBox, Text } from "native-base";
import styles from "../../../assets/css/styles";
import { color } from "react-native-reanimated";
import TBTForm from "../../../components/common/TBTForm";
import SignatureComponent from "../../../components/SignatureComponent";
import { connect } from "react-redux";
import { insertTbtWorking } from "../../../Redux/action/auth/authActionTypes";
import { updateHealthReport } from "../../../Redux/action/summary/Summary";

var mainImage = require("../../../assets/authScreen/Accurate-daywork-sheet-docx.png");
var plus = require("../../../assets/authScreen/plus.png");
const TBTWORKING = (props) => {
  const { navigation, token, isOnSite, isSuccessMsg, isJobId } = props;
  // const jobID = Math.floor(Math.random() * 100) + 1;
  const jobID = plot_Id;
  console.log("Work Plot ID :",jobID)
  const tabId = props.route.params.tabName;
  console.log("Work Tab ID :",tabId)
  const [coshhArray, setCoshhArray] = useState([
    {
      mainTitle: "Work at Height:",
      title:
        "Falling from height is the biggest cause of fatalities in the construction industry. Many of these deaths and injuries are as a result of falling less than 2 metres. All such deaths and serious injuries are preventable.",
    },
    { mainTitle: "Main Points:", title: "Can work at height be avoided and the risk eliminated?" },
    { title: "Plan work at height to include safe access/egress, edge protection (for people and materials), PPE and suitable training as applicable." },
    { title: "If you are using a mobile tower or scaffold, guard-rails and toe-boards are to be fitted." },
    {
      mainTitle: "Points to Remember: ",
      title: "•	Access ladders must be secured and extend sufficiently beyond working platforms to allow for safe access/egress.",
    },
    { title: "•	Consider weather conditions — wet, windy and/or icy conditions can have a serious impact on safety at height." },
    { title: "•	Ensure operatives are suitably trained and physically capable for tasks being undertaken. " },
    {
      title:
        "•	If guard-rails, fragile surface covers, void protections etc, are removed for any reason then they must be replaced as soon as possible, and in the interim should be physically guarded.",
    },
    { title: "•	Only suitable trained individual should assess erect or dismantle any working at height equipment." },
    { title: "•	Always follow the instruction and training given to work at height, NEVER go and do as you please." },
    { title: "•	Report any unsafe equipments / practices to your site supervisor immediately." },
  ]);
  const [toolBoxArray, setToolBoxArray] = useState([]);
  const addToolBox = () => setToolBoxArray((oldArray) => [...oldArray, { name: "", sign: "", date: "" }]);
  const [attendenceArray, setAttendenceArray] = useState([]);
  const addAttendence = () => setAttendenceArray((oldArray) => [...oldArray, { print: "", sign: "" }]);
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
    jobSummary: [],
  });
  const tbtFormInsert = async () => {
    try{
      if(data!=""){
        await props.creatTbtWorkingHandler({...data,task_id:jobID,tab_id:tabId},token,props.route.params?.index)
        props.updateHealthReport(props?.route?.params?.index);
        props.navigation.pop();
        alert("TBT WORKING Insert SuccessFully !");
      } 
      else{
        alert("Please Insert All Fields CareFully !");
      }
    } catch(err){
      alert(err.message)
    }
  };
  return (
    <View style={styles.mainContainer}>
      {openSign.bool ? (
        <SignatureComponent
          returnImage={(uri) => {
            let copydata = [...data.jobSummary];
            copydata[openSign.index].sign = uri;
            setData({ ...data, jobSummary: [...copydata] });
            setOpenSign({ bool: false, index: -1 });
          }}
        />
      ) : (
        <>
      <View style={styles.imageView}>
        <Image source={mainImage} style={styles.bannerImage} />
      </View>
      <View style={{ paddingTop: 30, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.titleText}>Toolbox Talk - Working at Height</Text>
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
                data={data}
                getSignature={(index) =>
                  setOpenSign({ ...openSign, bool: true, index })
                }
                addAttendence={() =>
                  setData({
                    ...data,
                    jobSummary: [...data.jobSummary, { print: "", sign: "" }],
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
              />
          <Text style={{ fontFamily: "poppins-bold", fontSize: 12, textAlign: "center" }}>
            Once completed, please file a copy in the Site Folder and send a copy to our Head Office and give a copy to the site staff.
          </Text>
          <View style={styles.footerView}>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
              Address: 2,<Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}> Green Lane, Penge, London SE20 7JA</Text>
            </Text>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
              T: <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}> 0208 676 060</Text>
            </Text>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
              F: <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}> 0208 676 0671</Text>
            </Text>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
              M: <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}> 07737 632206</Text>
            </Text>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
              E: <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}> info@topdecdecorating.com</Text>
            </Text>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
              W: <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}> www.topdecdecorating.com</Text>
            </Text>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
              VAT Registration Number: <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}> 203 474 927</Text>
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
  );
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
  isOnSite: state.auth.isOnSite,
  isSuccessMsg: state.auth.isSuccessMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
  creatTbtWorkingHandler: (
    data,
    token,
    index
  ) =>
    dispatch(
      insertTbtWorking(
        data,
        token,
        index
      )
    ),
    updateHealthReport: (index) => dispatch(updateHealthReport(index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TBTWORKING);

