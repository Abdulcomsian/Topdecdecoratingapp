import React, { useState } from "react";
import { View, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { CheckBox, Text } from "native-base";
import styles from "../../../assets/css/styles";
import { color } from "react-native-reanimated";

var mainImage = require("../../../assets/authScreen/Accurate-daywork-sheet-docx.png");
var plus = require("../../../assets/authScreen/plus.png");
const TBTSLICIA = (props) => {
  const [attendenceArray, setAttendenceArray] = useState([]);
  const addAttendence = () => setAttendenceArray((oldArray) => [...oldArray, { print: "", sign: "" }]);

  const [coshhArray, setCoshhArray] = useState([
    {
      title:
        "Silica is a natural substance found in most rocks, sand and clay and in products such as concrete and bricks. In the workplace, these materials create dust when disturbed such as by:",
    },
    { title: "•	Drilling, breaking and crushing of rocks" },
    { title: "•	Dry powdered materials such as mineral powders and silica flour that are mixed and handled." },
    { title: "•	Polishing." },
    { title: "•	Blasting, chiselling, sanding, grinding drilling and cutting." },
    { title: "•	Fettling- trimming and cleaning rough edges on metal castings." },
    {
      title:
        "Dusts can be fine enough to be inhaled deeply into your lungs. This can cause harm to your health. The fine dust is called respirable crystalline silica (RCS) and is too fine to see with normal lighting.",
    },
    { title: "This dust can create serious, and sometimes fatal illnesses such as: silicosis, lung cancer and chronic obstructive pulmonary disease (COPD)." },
    {
      mainTitle: "Silicosis – ",
      title:
        "Exposure to RCS over a number of years can result in silicosis – this makes breathing more difficult and also increases the risk of lung infections. Extreme exposure to RCS can lead rapidly to ill health.",
    },
    {
      mainTitle: "Lung Cancer – ",
      title:
        "Should someone already have silicosis, there is an increased risk of lung cancer. Prolonged and heavy exposure to RCS can also cause lung cancer.",
    },
    {
      mainTitle: "Chronic Obstructive Pulmonary Disease (COPD) – ",
      title:
        "Breathing in fine dusts, such as RCS can lead to COPD – a group of lung diseases that includes emphysema and bronchitis. This results in severe breathlessness, chronic disability and prolonged coughing. COPD is a leading cause of death and cigarette smoking can make it worse.",
    },
    {
      mainTitle: "Do’s and Don’ts for operators/workers: - ",
      title: "•	Always follow safe working procedures and cleaning procedures – if you are not sure, stop the job and ask.",
    },
    { title: "•	Use on tool extraction vacuums (LEV systems) or water methods (water suppression) to reduce dust at source." },
    {
      title: "•	Always ensure that dust control systems are in good working order and check LEV vacuum hoses/filters regularly to ensure they are not clogged.",
    },
    { title: "•	Where water suppression is being used, endure adequate amounts of water are available for the task(s)." },
    {
      title:
        "•	Ensure all PPE is adequate for the adequate for the task, free from damage and worn as intended – where respirators are required – face fitting must have been carried out and the operator needs to be clean shaven for these to be effective.",
    },
    { title: "•	Ensure regular housekeeping to control dust levels." },
    { title: "•	Never sweep dry dusts – use moisture to clean with or use vacuuming." },
    { title: "•	Never use compressed air to clean dusty environments or clothing that has been contaminated with dust." },
    {
      title:
        "•	Avoid eating, drinking, and smoking in areas where there is silica dust. A good practice is to first leave the dusty area and wash your hands and face.",
    },
    {
      title:
        "•	Avoid bringing dust home. Vacuum the dust from your clothes or change into clean clothing before leaving the work site. Do not brush or blow dust off.",
    },
    {
      title:
        "•	Cooperate with employer’s health screening/surveillance processes – this may be carried out by health and working history questionnaires, lung function tests and chest x-rays (if requested by a doctor).",
    },
  ]);
  const [materialArray, setMaterialArray] = useState([
    { material: "Sandstone", level: "70%" },
    { material: "Granite", level: "15% - 30%" },
    { material: "Concrete and mortar", level: "25% - 75%" },
    { material: "Tile", level: "30% - 45%" },
    { material: "Slate", level: "20% - 40%" },
    { material: "Marble", level: "2%" },
    { material: "Limestone", level: "2%" },
    { material: "Brick", level: "30%" },
  ]);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageView}>
        <Image source={mainImage} style={styles.bannerImage} />
      </View>
      <View style={{ paddingTop: 30, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.titleText}>Toolbox Talk Silica Dust </Text>
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
            <Text style={{ fontFamily: "poppins-bold", fontSize: 16 }}>Levels of silica dust in materials varies</Text>
            <View style={styles.tableViewContainer}>
              <View style={styles.tableHeader}>
                <View style={styles.headerWitnessTitleView}>
                  <Text style={styles.headerTitle}>Materials</Text>
                </View>
                <View style={styles.headerWitnessTitleView}>
                  <Text style={styles.headerTitle}>Silica level</Text>
                </View>
              </View>
              {materialArray.map((item, index) => (
                <View style={styles.tableBody} key={index}>
                  <View style={styles.inputOprativesBodyContainer}>
                    <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}>{item.material}</Text>
                  </View>
                  <View style={styles.inputOprativesBodyContainer}>
                    <Text style={{ fontFamily: "poppins-regular", fontSize: 10, paddingLeft: 70 }}>{item.level}</Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.validationView}>
              <Text style={{ fontFamily: "poppins-bold", fontSize: 12, textAlign: "center" }}>Validation of Toolbox Talk</Text>
              <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}>
                After operatives have received the toolbox talk information, the following questions should be asked to ensure that they have understood.{" "}
              </Text>
              <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}>Q1 - Name two methods of controlling dust at source</Text>
              <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}>Q2 - What materials contain the highest percentage levels of silica?</Text>
              <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}>Q3 - Name three serious/fatal illnesses that silica dust can create?</Text>
              <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}>Q4 -What methods should be used to ‘clean-up’ dust?</Text>
            </View>
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
export default TBTSLICIA;
