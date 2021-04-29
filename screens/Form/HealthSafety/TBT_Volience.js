import React, { useState } from "react";
import { View, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { CheckBox, Text } from "native-base";
import styles from "../../../assets/css/styles";
import { color } from "react-native-reanimated";

var mainImage = require("../../../assets/authScreen/Accurate-daywork-sheet-docx.png");
var plus = require("../../../assets/authScreen/plus.png");
const TBTVOLIENCE = (props) => {
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
  return (
    <View style={styles.mainContainer}>
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
          <Text style={{ fontFamily: "poppins-bold", fontSize: 10 }}>I confirm that I have received the above tool box talk</Text>
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
          </View>
          <Text style={{ fontFamily: "poppins-bold", fontSize: 10, textAlign: "center", paddingTop: 10 }}>
            Once completed, please file a copy in the Site Folder and send a copy to our Head Office and a copy should be given to the site team{" "}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
export default TBTVOLIENCE;
