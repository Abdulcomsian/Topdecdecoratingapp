import React, { useState } from "react";
import { View, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { CheckBox, Text } from "native-base";
import styles from "../../../assets/css/styles";
import { color } from "react-native-reanimated";
import TBTForm from "../../../components/common/TBTForm";
import SignatureComponent from "../../../components/SignatureComponent";

var mainImage = require("../../../assets/authScreen/Accurate-daywork-sheet-docx.png");
var plus = require("../../../assets/authScreen/plus.png");
const TBTDRUGS = (props) => {
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
    jobSummary: [],
  });
  console.log(data);
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
            <TextInput style={styles.inputField} placeholder={"Main Contractor"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Project"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Supervisor name"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Sign"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Date"} />
          </View>*/}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};
export default TBTDRUGS;
