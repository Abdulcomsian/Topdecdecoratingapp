import React, { useState } from "react";
import { View, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { CheckBox, Text } from "native-base";
import styles from "../../../assets/css/styles";
import { color } from "react-native-reanimated";
import { updateHealthReport } from "../../../Redux/action/summary/Summary";
import { connect } from "react-redux";

var mainImage = require("../../../assets/authScreen/Accurate-daywork-sheet-docx.png");
var plus = require("../../../assets/authScreen/plus.png");
const TBTWORKING = (props) => {
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
  return (
    <View style={styles.mainContainer}>
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
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Main Contractor"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Project"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Meeting Conducted By"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Date"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput multiline={true} numberOfLines={4} style={styles.inputField} placeholder={"Comments"} />
          </View>
          <Text style={{ fontFamily: "poppins-bold", fontSize: 16 }}>Attendees</Text>
          <View style={styles.tableViewContainer}>
            <View style={styles.tableHeader}>
              <View style={styles.headerWitnessTitleView}>
                <Text style={styles.headerTitle}>Print</Text>
              </View>
              <View style={styles.headerWitnessTitleView}>
                <Text style={styles.headerTitle}>Signature</Text>
              </View>
            </View>
            <View style={{ justifyContent: "flex-end", width: "100%", alignItems: "flex-end", marginBottom: 10 }}>
              <TouchableOpacity style={styles.addBtn} onPress={() => addAttendence()}>
                <Image style={styles.plusBtn} source={plus} />
              </TouchableOpacity>

              {attendenceArray.map((item, index) => (
                <View style={styles.tableBody} key={index}>
                  <Text style={{ width: "10%", justifyContent: "center", alignItems: "center", paddingTop: 20, ontFamily: "poppins-regular", fontSize: 10 }}>
                    {index}
                  </Text>
                  <View style={styles.inputOprativesBodyContainer}>
                    <TextInput style={styles.bodyTextInput} placeholder={"Print"} />
                  </View>
                  <View style={styles.inputOprativesBodyContainer}>
                    <TextInput style={styles.bodyTextInput} placeholder={"Sign"} />
                  </View>
                </View>
              ))}
            </View>
          </View>
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
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const mapDispatchToProps = (dispatch) => ({
  updateHealthReport: (index) => dispatch(updateHealthReport(index)),
});
export default connect(null, mapDispatchToProps)(TBTWORKING);
