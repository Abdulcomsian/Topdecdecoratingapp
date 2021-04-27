import React, { useState } from "react";
import { View, TextInput, ScrollView, Image, TouchableOpacity } from "react-native";
import { Text } from "native-base";
import styles from "../../../assets/css/styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";

var mainImage = require("../../../assets/authScreen/Accurate-daywork-sheet-docx.png");
const LadderCheckList = () => {
  const [ladderArrayList, setLadderArrayList] = useState([
    {
      title: "1. Training",
      subTitle:
        "Have all staff who will use podium stepladders been trained in their use?",
      yes: "",
      no: "",
      other: "",
    },
    {
      title: "2. Site conditions",
      subTitle:
        "Is the floor area where the podium stepladders are to be used free from obstacles, debris, trailing cables, etc?",
      yes: "",
      no: "",
      other: "",
    },
    {
      subTitle:
        "Will the podium stepladder be erected on a flat stable surface?",
      yes: "",
      no: "",
      other: "",
    },
    {
      title: "3. Pre-assembly checks",
      subTitle:
        "Do the podium stepladders have a label fitted containing a company number and a test date as well as a manufacturer’s label?",
      yes: "",
      no: "",
      other: "",
    },
    {
      subTitle: "Have all welds been checked for cracks or other damage?",
      yes: "",
      no: "",
      other: "",
    },
    {
      subTitle:
        "Have all tubes been checked for a sign of physical damage i.e. cracks, distortion or excessive dents?",
      yes: "",
      no: "",
      other: "",
    },
    {
      subTitle:
        "Is the working platform free from contamination, cracking, holes or other damage, including any missing or damaged rivet fixings?",
      yes: "",
      no: "",
      other: "",
    },
    {
      subTitle: "Is there an absence of sharp edges or splinters?",
      yes: "",
      no: "",
      other: "",
    },
    {
      subTitle:
        "Is the stepladder free from paint or decoration which could obscure damage? (There should only be clear varnish on the ladder, so defects aren’t hidden.)",
      yes: "",
      no: "",
      other: "",
    },
    {
      subTitle:
        "Are all required nails, screws, bolts, tie rods and rivets present and firmly fixed?",
      yes: "",
      no: "",
      other: "",
    },
    {
      subTitle: "If the stepladder has a non-slip base, is it undamaged?",
      yes: "",
      no: "",
      other: "",
    },
    {
      subTitle: "Are the stepladder feet in good condition?",
      yes: "",
      no: "",
      other: "",
    },
    {
      subTitle: "Have previous repairs been carried out to a high standard?",
      yes: "",
      no: "",
      other: "",
    },
    {
      subTitle: "Do all fittings appear to be of an approved type?",
      yes: "",
      no: "",
      other: "",
    },
    { subTitle: "Check for tightness of rungs.", yes: "", no: "", other: "" },
    {
      subTitle: "Check all rivets and fastenings.",
      yes: "",
      no: "",
      other: "",
    },
    { subTitle: "Check for corrosion.", yes: "", no: "", other: "" },
    {
      subTitle:
        "Check anti-slip end pieces are in good condition and are not loose.",
      yes: "",
      no: "",
      other: "",
    },
    {
      subTitle: "Check visually for flaws and cracks.",
      yes: "",
      no: "",
      other: "",
    },
    {
      subTitle: "Check non-slip bases for damage or wear.",
      yes: "",
      no: "",
      other: "",
    },
    {
      subTitle:
        "Check stepladders are not wobbly when positioned as this demonstrates side strain.",
      yes: "",
      no: "",
      other: "",
    },
    {
      subTitle: "Check hinge brackets/spreaders are not loose or bent.",
      yes: "",
      no: "",
      other: "",
    },
    {
      subTitle:
        "Check stop on the hinge bracket/spreaders is not broken and is fully effective.",
      yes: "",
      no: "",
      other: "",
    },
    { subTitle: "check hinges are not loose.", yes: "", no: "", other: "" },
    {
      title: "4. Checks during/after assembly and before use",
      subTitle:
        "Are all castors secure and their fixing bolts tightened correctly?",
      yes: "",
      no: "",
      other: "",
    },
    {
      subTitle:
        "Do all wheel brakes operate and lock the wheels and castors into position?",
      yes: "",
      no: "",
      other: "",
    },
    {
      subTitle:
        "Is there free movement of all hinge points of the podium step?",
      yes: "",
      no: "",
      other: "",
    },
    {
      subTitle:
        "Will the total load (1 person plus tools & materials) be more than the manufacturer’s stated safe working load?",
      yes: "",
      no: "",
      other: "",
    },
    {
      subTitle:
        "Are the podium stepladder’s locking mechanisms operating and locking correctly? (Ladder claws and locks, gate claw and lock, rear folding frame elbow locking joints and the platform locking tabs.)",
      yes: "",
      no: "",
      other: "",
    },
    {
      subTitle:
        "Are the castors pointing outwards and the wheel brakes locked prior to access?",
      yes: "",
      no: "",
      other: "",
    },
    {
      subTitle: "Is the ladder section located correctly and secure?",
      yes: "",
      no: "",
      other: "",
    },
    {
      subTitle:
        "Is the podium stepladder correctly positioned to avoid over-reaching?",
      yes: "",
      no: "",
      other: "",
    },
    {
      subTitle:
        "Is the podium stepladder correctly positioned to avoid over reaching?",
      yes: "",
      no: "",
      other: "",
    },
    {
      subTitle: "Is the working platform set at the correct height?",
      yes: "",
      no: "",
      other: "",
    },
    {
      subTitle:
        "Is the safety gate shut and locked once staff are on the platform?",
      yes: "",
      no: "",
      other: "",
    },
  ]);
  const [dateTimeComplete, setDateTimeComplete] = useState(new Date());
  const [nextDateInspection, setNextDateInspection] = useState(new Date());
  const [showDateTimeComplete, setShowDateTimeComplete] = useState(false);
  const [showNextDateInspection, setShowNextDateInspection] = useState(false);
  const [furtherComments, setFurtherComments] = useState("")
  const [contractorName, setContractorName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [supervisorSign, setSupervisorSign] = useState("");

  const showDateCompletePicker = () => {
    setShowDateTimeComplete(true);
  };
  const onDateCompleteChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowDateTimeComplete(false);
    setDateTimeComplete(new Date(currentDate));
  };
  const onNextDateInspectionChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowNextDateInspection(false);
    setNextDateInspection(new Date(currentDate));
  };
  const showNextDateInspectionPicker = () => {
    setShowNextDateInspection(true);
  };
  const updateLadderArrayList = (key, index, value) => {
    let preData = [...ladderArrayList];
    preData[index][key] = value;
    setLadderArrayList(preData);
  };
  const ladderCheckListForm = () =>{
    console.log("Main Contractor  :", contractorName);
    console.log("Project Name :", projectName);
    console.log("Supervisor Sign :", supervisorSign);
    console.log("Date Complete :", dateTimeComplete.toLocaleDateString());
    console.log("Date Complete Time :", dateTimeComplete.toLocaleTimeString());
    console.log("Next Inspection Date :", nextDateInspection.toLocaleDateString());
    console.log("Further Comments :", furtherComments);
    console.log("Array :", ladderArrayList);
  }
  return (
    <View style={styles.mainContainer}>
      <DateTimePickerModal
        isVisible={showDateTimeComplete}
        date={dateTimeComplete ? dateTimeComplete : new Date()}
        mode={"datetime"}
        is24Hour={true}
        display="default"
        onConfirm={(date) => onDateCompleteChange(date)}
        onCancel={() => setShowDateTimeComplete(false)}
        cancelTextIOS="Cancel"
        confirmTextIOS="Confirm"
      />
      <DateTimePickerModal
        isVisible={showNextDateInspection}
        date={nextDateInspection ? nextDateInspection : new Date()}
        mode={"date"}
        is24Hour={true}
        display="default"
        onConfirm={(date) => onNextDateInspectionChange(date)}
        onCancel={() => setShowNextDateInspection(false)}
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
        <Text style={styles.titleText}>
          LADDERS / PODIUM STEPLADDER INSPECTION CHECKLIST
        </Text>
      </View>
      <ScrollView>
        <View style={styles.formCodnatiner}>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Main Contractor"}
              value={contractorName}
                onChangeText={(e) => setContractorName(e)}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput value={projectName}
                onChangeText={(e) => setProjectName(e)} style={styles.inputField} placeholder={"Project"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Supervisor (Print & Sign)"}
              value={supervisorSign}
                onChangeText={(e) => setSupervisorSign(e)}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <Text
              onPress={() => showDateCompletePicker()}
              style={{
                width: "100%",
                height: 60,
                borderBottomWidth: 1,
                borderBottomColor: "#96A8B2",
                paddingTop: 20,
                fontSize: 12,
                color: "#96A8B2",
                fontFamily: "poppins-regular",
              }}
            >
              {new Date(dateTimeComplete).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.inputFieldContainer}>
            <Text
              onPress={() => showNextDateInspectionPicker()}
              style={{
                width: "100%",
                height: 60,
                borderBottomWidth: 1,
                borderBottomColor: "#96A8B2",
                paddingTop: 20,
                fontSize: 12,
                color: "#96A8B2",
                fontFamily: "poppins-regular",
              }}
            >
              {new Date(nextDateInspection).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.tableCheckListViewContainer}>
            <View style={styles.tableHeader}>
              <View style={styles.headerLadderListTitleView}>
                <Text style={styles.headerTitle}>ITEMS</Text>
              </View>
              <View style={styles.headerLadderListTitleView}>
                <Text style={styles.headerTitle}>Yes</Text>
              </View>
              <View style={styles.headerLadderListTitleView}>
                <Text style={styles.headerTitle}>No</Text>
              </View>
              <View style={styles.headerLadderListTitleView}>
                <Text style={styles.headerTitle}>N/a</Text>
              </View>
            </View>
            {ladderArrayList.map((item, index) =>
              item.subTitle ? (
                <View key={index}>
                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "poppins-bold",
                        paddingTop: 10,
                        paddingBottom: 20,
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={{ fontSize: 12, fontFamily: "poppins-regular" }}
                    >
                      {item.subTitle}
                    </Text>
                  </View>
                  <View style={styles.tableBody}>
                    <View style={styles.inputLadderBodyContainer}>
                      <TextInput
                        style={styles.bodyTextInput}
                        placeholder={"Yes"}
                        value={item.yes}
                                onChangeText={(txt) =>
                                updateLadderArrayList("yes", index, txt)
                                }
                      />
                    </View>
                    <View style={styles.inputLadderBodyContainer}>
                      <TextInput
                        style={styles.bodyTextInput}
                        placeholder={"No"}
                        value={item.no}
                        onChangeText={(txt) =>
                        updateLadderArrayList("no", index, txt)
                        }
                      />
                    </View>
                    <View style={styles.inputLadderBodyContainer}>
                      <TextInput
                        style={styles.bodyTextInput}
                        placeholder={"N/A"}
                        value={item.other}
                        onChangeText={(txt) =>
                        updateLadderArrayList("other", index, txt)
                        }
                      />
                    </View>
                  </View>
                </View>
              ) : (
                <View key={index}>
                  <View>
                    <Text
                      style={{ fontSize: 12, fontFamily: "poppins-regular" }}
                    >
                      {item.subTitle}
                    </Text>
                  </View>
                  <View style={styles.tableBody}>
                    <View style={styles.inputLadderBodyContainer}>
                      <TextInput
                        style={styles.bodyTextInput}
                        placeholder={"Yes"}
                        value={item.yes}
                        onChangeText={(txt) =>
                        updateLadderArrayList("yes", index, txt)
                        }
                      />
                    </View>
                    <View style={styles.inputLadderBodyContainer}>
                      <TextInput
                        style={styles.bodyTextInput}
                        placeholder={"No"}
                        value={item.no}
                        onChangeText={(txt) =>
                        updateLadderArrayList("no", index, txt)
                        }
                      />
                    </View>
                    <View style={styles.inputLadderBodyContainer}>
                      <TextInput
                        style={styles.bodyTextInput}
                        placeholder={"N/A"}
                        value={item.other}
                        onChangeText={(txt) =>
                        updateLadderArrayList("other", index, txt)
                        }
                      />
                    </View>
                  </View>
                </View>
              )
            )}
            <View style={styles.inputFieldContainer}>
              <TextInput
                multiline={true}
                numberOfLines={4}
                style={styles.inputField}
                placeholder={"Comments/further information/action to be taken"}
                value={furtherComments}
                onChangeText={(e) => setFurtherComments(e)}
              />
            </View>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "poppins-bold",
                paddingTop: 10,
                paddingBottom: 20,
                textAlign: "center",
              }}
            >
              Once completed, please file a copy in the Site Folder and send a
              copy to our Head Office.
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#000",
              width: "100%",
              height: 2,
              marginBottom:20
            }}
          ></View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.commonBtn}
              onPress={() => ladderCheckListForm()}
            >
              <Text style={styles.commonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default LadderCheckList;
