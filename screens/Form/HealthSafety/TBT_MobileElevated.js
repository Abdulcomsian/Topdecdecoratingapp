import React, { useState } from "react";
import { View, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { CheckBox, Text } from "native-base";
import styles from "../../../assets/css/styles";
import { color } from "react-native-reanimated";

var mainImage = require("../../../assets/authScreen/Accurate-daywork-sheet-docx.png");
var plus = require("../../../assets/authScreen/plus.png");
const TBTMOBILE = (props) => {
  const [attendenceArray, setAttendenceArray] = useState([]);
  const addAttendence = () => setAttendenceArray((oldArray) => [...oldArray, { print: "", sign: "" }]);

  const [coshhArray, setCoshhArray] = useState([
    {
      mainTitle: "Mobile Elevated Work Platform (MEWP ",
      title:
        "Mobile Elevated Work Platforms (MEWP’s) are useful pieces of plant when used properly. However, they combine height with mobility and can be extremely dangerous if misused.",
    },
    { title: "Ensure the correct MEWP is selected for the task (ground, height, etc). " },
    { title: "Only suitably trained operators can use MEWP’s (and must be trained for that specific item of plant)." },
    { title: "Continually monitor weather conditions" },
    { mainTitle: "Points to Remember:", title: "•	Assess ground conditions (uneven surface could result in MEWP overturning)." },
    { title: "•	Check for overhead obstructions (especially overhead power lines) bearing in mind the height the MEWP can be extended to." },
    { title: "•	Beware of collision with other plant, equipment, scaffold etc." },
    { title: "•	Be particularly aware when using near public footpaths and streets. Remember to allow enough room for pedestrians." },
    { title: "•	Always check that the plant is stable prior to use.  Deploy stabilisers, outriggers etc as required." },
    { title: "•	Any tools, materials etc taken on board must be secured so far as is reasonably practicable to ensure they don’t fall from the edge." },
    { title: "•	It is recommended that operators employ safety harnesses as secondary protection." },
    { title: "•	Never exceed Safe Working Loads." },
    { title: "•	When manoeuvring in tight areas or near public rights of way ensure a banksman/signaller is deployed." },
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
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageView}>
        <Image source={mainImage} style={styles.bannerImage} />
      </View>
      <View style={{ paddingTop: 30, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.titleText}>Toolbox Talk - Mobile Elevated Work Platform (MEWP)</Text>
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
export default TBTMOBILE;
