import React, { useState } from "react";
import { View, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { CheckBox, Text } from "native-base";
import styles from "../../../assets/css/styles";
import { color } from "react-native-reanimated";

var mainImage = require("../../../assets/authScreen/Accurate-daywork-sheet-docx.png");
var plus = require("../../../assets/authScreen/plus.png");
const TBTRESPIRATORY = (props) => {
  const [attendenceArray, setAttendenceArray] = useState([]);
  const addAttendence = () => setAttendenceArray((oldArray) => [...oldArray, { print: "", sign: "" }]);

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
    { title: "•	Do not remove the mask in hazard areas to talk or inspect the works." },
    { title: "•	Store the mask in a clean area when not in use. " },
    { title: "Why gamble with your health? An easy way to protect your long-term health is to wear your mask and wear it correctly." },
    {
      title:
        "Many masks rely on a good seal against the face so that, when you breathe air in, it is drawn into the filter material where the air is cleaned. If there are any gaps around the edges of the mask, ‘dirty’ air will pass through these gaps and into your lungs. It is therefore very important that you put your mask on correctly and check for a good fit every time.",
    },
    {
      title:
        "Facial hair – stubble and beards – make it impossible to get a good seal of the mask to the face. If you are clean-shaven when wearing tight-fitting masks (i.e. those which rely on a good seal to the face), this will help prevent leakage of contaminated air around the edges of the mask and into your lungs. You will therefore be breathing in clean air, which will help you stay healthy.",
    },
    { mainTitle: "How to fit mask correctly - For Filtering Face Piece (FFP)- Disposable Mask ", title: "•	Clean shaven at the start of your shift." },
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
      title: "*Face fit testing by competent person will be carried out on operative to ensure the mask selected for use is suitable and protects the wearer.",
    },
  ]);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageView}>
        <Image source={mainImage} style={styles.bannerImage} />
      </View>
      <View style={{ paddingTop: 30, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.titleText}>Toolbox Talk Respiratory Protection (RPE) – Dust Mask</Text>
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
export default TBTRESPIRATORY;
