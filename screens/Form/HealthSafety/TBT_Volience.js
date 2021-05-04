import React, { useState } from "react";
import { View, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { CheckBox, Text } from "native-base";
import styles from "../../../assets/css/styles";
import { color } from "react-native-reanimated";
import SignatureComponent from "../../../components/SignatureComponent";
import { connect } from "react-redux";
import { insertTbtVolience } from "../../../Redux/action/auth/authActionTypes";
import { updateHealthReport } from "../../../Redux/action/summary/Summary";
import TBTForm from "../../../components/common/TBTForm";

var mainImage = require("../../../assets/authScreen/Accurate-daywork-sheet-docx.png");
var plus = require("../../../assets/authScreen/plus.png");
const TBTVOLIENCE = (props) => {
  const { navigation, token, isOnSite, isSuccessMsg, isJobId } = props;
  // const jobID = Math.floor(Math.random() * 100) + 1;
  const jobID = plot_Id;
  console.log("Work Plot ID :",jobID)
  const tabId = props.route.params.tabName;
  console.log("Work Tab ID :",tabId)
  const [coshhArray, setCoshhArray] = useState([
    {
      title:
        "We would like to remind you that Top Dec Decorating has a zero-tolerance policy on violence and aggression and will not tolerate violence, threats, harassment, intimidation, and other disruptive behaviour, either physical or verbal, that occurs in the workplace or other areas. This applies to violence and aggression which is aimed at members of management, co-workers, employees, and non-employees such as contractors, customers, tenants, and visitors.",
    },
    {
      title:
        "Your co-operation is needed to help eradicate such behaviours and to maintain a safe working environment. Also, we should not ignore violent, threatening, harassing, intimidating, or other disruptive behaviour. If you observe or experience such behaviour, report it immediately to your Manager/Supervisor who will give further advice. Where the incident is serious in nature you are encouraged to report it to the police.",
    },
    { title: "All operatives/employees are always required to display common courtesy and engage in safe and appropriate behaviour on the job." },
    {
      title:
        "You are required to read and sign our Violence and Aggression at work Policy (a copy will be provided to you by Top Dec Decorating Supervisor) to state you have understood its contents and you shall adhere accordingly.",
    },
  ]);
  const [toolBoxArray, setToolBoxArray] = useState([]);
  const addToolBox = () => setToolBoxArray((oldArray) => [...oldArray, { name: "", sign: "", date: "" }]);

  const [openSign, setOpenSign] = useState({
    index: -1,
    bool: false,
    isArray: false,
  });
  const [data, setData] = useState({
    signature: "",
    date: null,
    supervisor: "",
    jobSummary: [],
  });
  const tbtVolienceFormInsert = async () =>{
    console.log("Token :",token)
    try {
       
      if(data!="" ){
        await props.creatTbtVolienceHandler({...data,task_id:jobID,tab_id:tabId},token,props.route.params?.index)
        props.updateHealthReport(props?.route?.params?.index);
        props.navigation.pop();
        alert("TBT VOLIENCE Insert SuccessFully !");
      }else{
        alert("Please Insert All Fields CareFully !");
      }
    } catch (err) {
      alert(err.message);
    }
   }
  return (
    <View style={styles.mainContainer}>
      {openSign.bool ? (
        <SignatureComponent
          returnImage={(uri) => {
            if (openSign.isArray) {
              let copydata = [...data.jobSummary];
              copydata[openSign.index].sign = uri;
              setData({ ...data, jobSummary: [...copydata] });
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
            <Text style={styles.titleText}>Toolbox Talk – Violence and Aggression</Text>
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
                      <Text style={{ fontFamily: "poppins-regular", fontSize: 12, backgroundColor: item.bgcolor, paddingBottom: 10 }}>{item.title}</Text>
                    </View>
                  )
                )}
              </View>
              <TBTForm
                isVoilence={true}
                data={data}
                getSignature={(index, bool) => setOpenSign({ ...openSign, bool: true, index, isArray: bool })}
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
              />
              {/* <Text style={{ fontFamily: "poppins-bold", fontSize: 10 }}>I confirm that I have received the above tool box talk</Text>
          <View style={styles.tableViewContainer}>
            <View style={styles.tableHeader}>
              <View style={styles.headerProjectTitleView}>
                <Text style={styles.headerTitle}>Print Name</Text>
              </View>
              <View style={styles.headerProjectTitleView}>
                <Text style={styles.headerTitle}>Signature</Text>
              </View>
              <View style={styles.headerProjectTitleView}>
                <Text style={styles.headerTitle}>Date</Text>
              </View>
            </View>
            <View style={{ justifyContent: "flex-end", width: "100%", alignItems: "flex-end", marginBottom: 10 }}>
              <TouchableOpacity style={styles.addBtn} onPress={() => addToolBox()}>
                <Image style={styles.plusBtn} source={plus} />
              </TouchableOpacity>
            </View>
            {toolBoxArray.map((item, index) => (
              <View style={styles.tableBody} key={index}>
                <View style={styles.inputHazrdBodyContainer}>
                  <TextInput style={styles.bodyTextInput} placeholder={"Name"} />
                </View>
                <View style={styles.inputHazrdBodyContainer}>
                  <TextInput style={styles.bodyTextInput} placeholder={"Sign"} />
                </View>
                <View style={styles.inputHazrdBodyContainer}>
                  <TextInput style={styles.bodyTextInput} placeholder={"Date"} />
                </View>
              </View>
            ))}
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Supervisor name"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Sign"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Date"} />
          </View> */}
              <Text style={{ fontFamily: "poppins-bold", fontSize: 10, textAlign: "center", paddingTop: 10 }}>
                Once completed, please file a copy in the Site Folder and send a copy to our Head Office and a copy should be given to the site team{" "}
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
  );
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
  isOnSite: state.auth.isOnSite,
  isSuccessMsg: state.auth.isSuccessMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
  creatTbtVolienceHandler: (data,token,index) =>
    dispatch(insertTbtVolience(data,token,index)),
  updateHealthReport: (index) => dispatch(updateHealthReport(index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TBTVOLIENCE);

