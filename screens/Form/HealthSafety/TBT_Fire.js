import React, { useState } from "react";
import { View, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { CheckBox, Text } from "native-base";
import styles from "../../../assets/css/styles";
import { color } from "react-native-reanimated";
import TBTForm from "../../../components/common/TBTForm";
import SignatureComponent from "../../../components/SignatureComponent";

var mainImage = require("../../../assets/authScreen/Accurate-daywork-sheet-docx.png");
var plus = require("../../../assets/authScreen/plus.png");
const TBTFire = (props) => {
  const [coshhArray, setCoshhArray] = useState([
    {
      mainTitle: "Fire Prevention",
      title: "•	The Material Safety Datasheets/COSHH assessments will provide you with the relevant information on the product to be used.",
    },
    { title: "•	Dispense flammable liquids only in areas free from sparks, flames, and other sources of ignition." },
    { title: "•	Make sure portable fire extinguishers remain fully accessible at all times when handling flammable substances." },
    { title: "•	Ensure heating equipment is not covered with clothing, paper or rubbish." },
    { title: "•	Maintain good housekeeping to minimize the accumulation of oily rags or other rubbish" },
    { title: "•	Maintain good housekeeping to minimize the accumulation of oily rags or other rubbish" },
    { title: "•	Do not smoke in prohibited areas" },
    { title: "•	Use proper sealed containers for flammable liquids, not open tins or buckets" },
    { title: "•	Use recommended 110v as per the Method statement." },
    { title: "•	Keep all fire doors closed. Do not prop them open with door stops or extinguishers" },
    { title: "•	Ensure you are familiar with your emergency procedure for fire safety (through site induction)." },
    {
      title:
        "•	Consider potential trespassers. Do not give them a source of fuel or ignition to start a fire (Lock away flammable substances in flam store/container).",
    },
    { title: "•	If you identify an electrical appliance which has not been tested or has expired, remove it from use and report it to your supervisor." },
    {
      mainTitle: "Fire Fighting",
      title: "All fire extinguishers are red but have panels of different colours to indicate their contents: Label Colour Content:",
    },
    { title: "Red - Water – Used on Wood and paper", bgcolor: "red", color: "#fff" },
    { title: "Cream – Foam- Used on Flammable liquid ", bgcolor: "cream" },
    { title: "Blue - Dry powder - General use (everything) except cooking oil fire & metal fire", bgcolor: "blue", color: "#fff" },
    { title: "Black - CO2 (Carbon Dioxide) – used on Electricals fires.", bgcolor: "black", color: "#fff" },
    { title: "Yellow – Wet Chemical- Used on wood, paper and cooking oil fires", bgcolor: "yellow", color: "#fff" },
    { title: "•	NEVER use WATER on ELECTRICAL or FLAMMABLE LIQUID FIRES" },
    { title: "•	NEVER use FOAM on ELECTRICAL FIRES" },
    { title: "•	REMOVE USED or PARTLY USED extinguishers from service and report them to your supervisor so they can be replaced promptly. " },
    { title: "•	NEVER use any of the above fire extinguisher on METAL FIRES." },
    { mainTitle: "Points to Remember:", title: "•	Always follow instruction given during site induction training regarding fire-safety." },
    { title: "•	Follow fire safety instruction on Safety datasheets and COSHH Assessments." },
  ]);

  const [openSign, setOpenSign] = useState({
    index: -1,
    bool: false,
  });
  const [data, setData] = useState({
    mainContractor: "",
    project: "",
    meeting: "",
    date: null,
    comments: "",
    attendess: [],
  });

  return (
    <View style={styles.mainContainer}>
      {openSign.bool ? (
        <SignatureComponent
          returnImage={(uri) => {
            let copydata = [...data.attendess];
            copydata[openSign.index].sign = uri;
            setData({ ...data, attendess:[...copydata ]});
            setOpenSign({ bool: false, index: -1 });
          }}
        />
      ) : (
        <>
          <View style={styles.imageView}>
            <Image source={mainImage} style={styles.bannerImage} />
          </View>
          <View style={{ paddingTop: 30, justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.titleText}>Toolbox Talk – Fire Safety</Text>
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
                getSignature={(index) => setOpenSign({ ...openSign, bool: true, index })}
                addAttendence={() => setData({ ...data, attendess: [...data.attendess, { print: "", sign: "" }] })}
                onChangeData={(key, value,index=-1) => {
                  if(index>=0){
let copyAttendance=[...data.attendess];
copyAttendance[index].print=value
setData({...data,attendess:[...copyAttendance]})
                  }else{
                    setData({ ...data, [key]: value })
                  }
                }}
              />
              {/* <View style={styles.inputFieldContainer}>
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
          </View> */}
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
        </>
      )}
    </View>
  );
};
export default TBTFire;
