import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { CheckBox, Text } from "native-base";
import styles from "../../../assets/css/styles";
import { color } from "react-native-reanimated";
import DateTimePickerModal from "react-native-modal-datetime-picker";

var mainImage = require("../../../assets/authScreen/Accurate-daywork-sheet-docx.png");
var plus = require("../../../assets/authScreen/plus.png");
const TBTFire = () => {
  const [attendenceArray, setAttendenceArray] = useState([
    { print: "", sign: "" },
  ]);
  const addAttendence = () =>
    setAttendenceArray((oldArray) => [...oldArray, { print: "", sign: "" }]);

  const [coshhArray, setCoshhArray] = useState([
    {
      mainTitle: "Fire Prevention",
      title:
        "•	The Material Safety Datasheets/COSHH assessments will provide you with the relevant information on the product to be used.",
    },
    {
      title:
        "•	Dispense flammable liquids only in areas free from sparks, flames, and other sources of ignition.",
    },
    {
      title:
        "•	Make sure portable fire extinguishers remain fully accessible at all times when handling flammable substances.",
    },
    {
      title:
        "•	Ensure heating equipment is not covered with clothing, paper or rubbish.",
    },
    {
      title:
        "•	Maintain good housekeeping to minimize the accumulation of oily rags or other rubbish",
    },
    {
      title:
        "•	Maintain good housekeeping to minimize the accumulation of oily rags or other rubbish",
    },
    { title: "•	Do not smoke in prohibited areas" },
    {
      title:
        "•	Use proper sealed containers for flammable liquids, not open tins or buckets",
    },
    { title: "•	Use recommended 110v as per the Method statement." },
    {
      title:
        "•	Keep all fire doors closed. Do not prop them open with door stops or extinguishers",
    },
    {
      title:
        "•	Ensure you are familiar with your emergency procedure for fire safety (through site induction).",
    },
    {
      title:
        "•	Consider potential trespassers. Do not give them a source of fuel or ignition to start a fire (Lock away flammable substances in flam store/container).",
    },
    {
      title:
        "•	If you identify an electrical appliance which has not been tested or has expired, remove it from use and report it to your supervisor.",
    },
    {
      mainTitle: "Fire Fighting",
      title:
        "All fire extinguishers are red but have panels of different colours to indicate their contents: Label Colour Content:",
    },
    {
      title: "Red - Water – Used on Wood and paper",
      bgcolor: "red",
      color: "#fff",
    },
    { title: "Cream – Foam- Used on Flammable liquid ", bgcolor: "cream" },
    {
      title:
        "Blue - Dry powder - General use (everything) except cooking oil fire & metal fire",
      bgcolor: "blue",
      color: "#fff",
    },
    {
      title: "Black - CO2 (Carbon Dioxide) – used on Electricals fires.",
      bgcolor: "black",
      color: "#fff",
    },
    {
      title: "Yellow – Wet Chemical- Used on wood, paper and cooking oil fires",
      bgcolor: "yellow",
      color: "#fff",
    },
    { title: "•	NEVER use WATER on ELECTRICAL or FLAMMABLE LIQUID FIRES" },
    { title: "•	NEVER use FOAM on ELECTRICAL FIRES" },
    {
      title:
        "•	REMOVE USED or PARTLY USED extinguishers from service and report them to your supervisor so they can be replaced promptly. ",
    },
    { title: "•	NEVER use any of the above fire extinguisher on METAL FIRES." },
    {
      mainTitle: "Points to Remember:",
      title:
        "•	Always follow instruction given during site induction training regarding fire-safety.",
    },
    {
      title:
        "•	Follow fire safety instruction on Safety datasheets and COSHH Assessments.",
    },
  ]);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const updateValue = (key, index, value) => {
    let preData = [...attendenceArray];
    preData[index][key] = value;
    setAttendenceArray(preData);
  };
  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(new Date(currentDate));
  };
  const showDatepicker = () => {
    setShow(true);
  };
  const [mainContractor, setMainContractor] = useState("");
  const [projectName, setProjectName] = useState("");
  const [meetingConductBy, setMeetingConductBy] = useState("");
  const [comment, setComment] = useState("");

  const tbtCoshhFormInsert = () => {
    console.log("Main Contractor :", mainContractor);
    console.log("Project Name :", projectName);
    console.log("Meeting Conduct :", meetingConductBy);
    console.log("Date :", date);
    console.log("Comments :", comment);
    console.log("Array :", attendenceArray);
  };
  return (
    <View style={styles.mainContainer}>
      <DateTimePickerModal
        isVisible={show}
        date={date ? date : new Date()}
        mode={"date"}
        is24Hour={true}
        display="default"
        onConfirm={(date) => onChange(date)}
        onCancel={() => setShow(false)}
        cancelTextIOS="Cancel"
        confirmTextIOS="Confirm"
      />
      <View style={styles.imageView}>
        <Image source={mainImage} style={styles.bannerImage} />
      </View>
      <View
        style={{
          paddingTop: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.titleText}>Toolbox Talk – Fire Safety</Text>
      </View>
      <ScrollView>
        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
          <View style={{ marginTop: 20 }}>
            {coshhArray.map((item, index) =>
              item.mainTitle ? (
                <View key={index}>
                  <Text style={{ fontFamily: "poppins-bold", fontSize: 16 }}>
                    {item.mainTitle}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "poppins-regular",
                      fontSize: 12,
                      backgroundColor: item.bgcolor,
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
              ) : (
                <View key={index}>
                  <Text
                    style={{
                      fontFamily: "poppins-regular",
                      fontSize: 12,
                      backgroundColor: item.bgcolor,
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
              )
            )}
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Main Contractor"}
              value={mainContractor}
              onChangeText={(e) => setMainContractor(e)}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Project"}
              value={projectName}
              onChangeText={(e) => setProjectName(e)}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Meeting Conducted By"}
              value={meetingConductBy}
              onChangeText={(e) => setMeetingConductBy(e)}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <Text
              onPress={() => showDatepicker()}
              style={{
                width: "100%",
                height: 52,

                paddingTop: 16,
                fontSize: 12,
                color: "#96A8B2",
                fontFamily: "poppins-regular",
                borderBottomWidth: 1,
                borderBottomColor: "#96A8B2",
                padding: 5,
                color: "#96A8B2",
              }}
            >
              {new Date(date).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={styles.inputField}
              placeholder={"Comments"}
              value={comment}
              onChangeText={(e) => setComment(e)}
            />
          </View>
          <Text style={{ fontFamily: "poppins-bold", fontSize: 16 }}>
            Attendees
          </Text>
          <View style={styles.tableViewContainer}>
            <View style={styles.tableHeader}>
              <View style={styles.headerWitnessTitleView}>
                <Text style={styles.headerTitle}>Print</Text>
              </View>
              <View style={styles.headerWitnessTitleView}>
                <Text style={styles.headerTitle}>Signature</Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "flex-end",
                width: "100%",
                alignItems: "flex-end",
                marginBottom: 10,
              }}
            >
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => addAttendence()}
              >
                <Image style={styles.plusBtn} source={plus} />
              </TouchableOpacity>

              {attendenceArray.map((item, index) => (
                <View style={styles.tableBody} key={index}>
                  <Text
                    style={{
                      width: "10%",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: 20,
                      ontFamily: "poppins-regular",
                      fontSize: 10,
                    }}
                  >
                    {index}
                  </Text>
                  <View style={styles.inputOprativesBodyContainer}>
                    <TextInput
                      style={styles.bodyTextInput}
                      placeholder={"Print"}
                      onChangeText={(txt) => updateValue("print", index, txt)}
                      value={item.print}
                    />
                  </View>
                  <View style={styles.inputOprativesBodyContainer}>
                    <TextInput
                      style={styles.bodyTextInput}
                      placeholder={"Sign"}
                      onChangeText={(txt) => updateValue("sign", index, txt)}
                      value={item.sign}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
          <Text
            style={{
              fontFamily: "poppins-bold",
              fontSize: 12,
              textAlign: "center",
            }}
          >
            Once completed, please file a copy in the Site Folder and send a
            copy to our Head Office and give a copy to the site staff.
          </Text>
          <View style={styles.footerView}>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
              Address: 2,
              <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}>
                {" "}
                Green Lane, Penge, London SE20 7JA
              </Text>
            </Text>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
              T:{" "}
              <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}>
                {" "}
                0208 676 060
              </Text>
            </Text>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
              F:{" "}
              <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}>
                {" "}
                0208 676 0671
              </Text>
            </Text>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
              M:{" "}
              <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}>
                {" "}
                07737 632206
              </Text>
            </Text>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
              E:{" "}
              <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}>
                {" "}
                info@topdecdecorating.com
              </Text>
            </Text>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
              W:{" "}
              <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}>
                {" "}
                www.topdecdecorating.com
              </Text>
            </Text>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
              VAT Registration Number:{" "}
              <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}>
                {" "}
                203 474 927
              </Text>
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#000",
              width: "100%",
              height: 2,
              marginBottom:20,
              marginTop:20
            }}
          ></View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.commonBtn}
              onPress={() => tbtFireFormInsert()}
            >
              <Text style={styles.commonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default TBTFire;
