import React, { useState } from "react";
import { View, TextInput, ScrollView, Image, TouchableOpacity, CheckBox } from "react-native";
import { Text } from "native-base";
import styles from "../../../assets/css/styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SignatureComponent from "../../../components/SignatureComponent";
<<<<<<< HEAD
import { insertScopeForm } from "../../../Redux/action/auth/authActionTypes";
=======
import { updateHealthReport } from "../../../Redux/action/summary/Summary";
>>>>>>> 8963071f89a3d01cc8c91cb986015da9fe50ddcf
import { connect } from "react-redux";

var mainImage = require("../../../assets/authScreen/Accurate-daywork-sheet-docx.png");
const LadderCheckList = (props) => {
  const { navigation, token, isSuccessMsg, isSuccess } = props;
  const jobID = Math.floor(Math.random() * 100) + 1;
  const tabId = props.route.params.tabName;
  const [getSign, setGetSign] = useState(false);
  const [ladderArrayList, setLadderArrayList] = useState([
    {
      title: "1. Training",
      subTitle: "Have all staff who will use podium stepladders been trained in their use?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "2. Site conditions",
      subTitle: "Is the floor area where the podium stepladders are to be used free from obstacles, debris, trailing cables, etc?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Will the podium stepladder be erected on a flat stable surface?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "3. Pre-assembly checks",
      subTitle: "Do the podium stepladders have a label fitted containing a company number and a test date as well as a manufacturer’s label?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Have all welds been checked for cracks or other damage?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Have all tubes been checked for a sign of physical damage i.e. cracks, distortion or excessive dents?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Is the working platform free from contamination, cracking, holes or other damage, including any missing or damaged rivet fixings?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Is there an absence of sharp edges or splinters?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle:
        "Is the stepladder free from paint or decoration which could obscure damage? (There should only be clear varnish on the ladder, so defects aren’t hidden.)",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Are all required nails, screws, bolts, tie rods and rivets present and firmly fixed?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "If the stepladder has a non-slip base, is it undamaged?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Are the stepladder feet in good condition?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Have previous repairs been carried out to a high standard?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Do all fittings appear to be of an approved type?",
      yes: false,
      no: false,
      other: false,
    },
    { title: "", subTitle: "Check for tightness of rungs.", yes: false, no: false, other: false },
    {
      title: "",
      subTitle: "Check all rivets and fastenings.",
      yes: false,
      no: false,
      other: false,
    },
    { title: "", subTitle: "Check for corrosion.", yes: false, no: false, other: false },
    {
      title: "",
      subTitle: "Check anti-slip end pieces are in good condition and are not loose.",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Check visually for flaws and cracks.",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Check non-slip bases for damage or wear.",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Check stepladders are not wobbly when positioned as this demonstrates side strain.",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Check hinge brackets/spreaders are not loose or bent.",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Check stop on the hinge bracket/spreaders is not broken and is fully effective.",
      yes: false,
      no: false,
      other: false,
    },
    { title: "", subTitle: "check hinges are not loose.", yes: false, no: false, other: false },
    {
      title: "4. Checks during/after assembly and before use",
      subTitle: "Are all castors secure and their fixing bolts tightened correctly?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Do all wheel brakes operate and lock the wheels and castors into position?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Is there free movement of all hinge points of the podium step?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Will the total load (1 person plus tools & materials) be more than the manufacturer’s stated safe working load?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle:
        "Are the podium stepladder’s locking mechanisms operating and locking correctly? (Ladder claws and locks, gate claw and lock, rear folding frame elbow locking joints and the platform locking tabs.)",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Are the castors pointing outwards and the wheel brakes locked prior to access?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Is the ladder section located correctly and secure?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Is the podium stepladder correctly positioned to avoid over-reaching?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Is the podium stepladder correctly positioned to avoid over reaching?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Is the working platform set at the correct height?",
      yes: false,
      no: false,
      other: false,
    },
    {
      title: "",
      subTitle: "Is the safety gate shut and locked once staff are on the platform?",
      yes: false,
      no: false,
      other: false,
    },
  ]);
  const [dateTimeComplete, setDateTimeComplete] = useState(new Date());
  const [nextDateInspection, setNextDateInspection] = useState(new Date());
  const [showDateTimeComplete, setShowDateTimeComplete] = useState(false);
  const [showNextDateInspection, setShowNextDateInspection] = useState(false);
  const [furtherComments, setFurtherComments] = useState("");
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
  const checkedValue = (index, key) => {
    if (key == "yes") {
      let copyArray = [...ladderArrayList];
      copyArray[index][key] = true;
      copyArray[index]["no"] = false;
      copyArray[index]["other"] = false;
      setLadderArrayList(copyArray);
    } else if (key == "no") {
      let copyArray = [...ladderArrayList];
      copyArray[index][key] = true;
      copyArray[index]["yes"] = false;
      copyArray[index]["other"] = false;
      setLadderArrayList(copyArray);
    } else {
      let copyArray = [...ladderArrayList];
      copyArray[index][key] = true;
      copyArray[index]["no"] = false;
      copyArray[index]["yes"] = false;
      setLadderArrayList(copyArray);
    }
  };
  const ladderCheckListForm = () => {
    console.log("Main Contractor  :", contractorName);
    console.log("Project Name :", projectName);
    console.log("Supervisor Sign :", supervisorSign);
    console.log("Date Complete :", dateTimeComplete.toLocaleDateString());
    console.log("Date Complete Time :", dateTimeComplete.toLocaleTimeString());
    console.log("Next Inspection Date :", nextDateInspection.toLocaleDateString());
    console.log("Further Comments :", furtherComments);
    console.log("Array :", ladderArrayList);
    props.updateHealthReport(props?.route?.params?.index);
    props.navigation.pop();
  };
  return (
    <View style={styles.mainContainer}>
      <DateTimePickerModal
        isVisible={showDateTimeComplete}
        testID='dateTimePicker'
        value={dateTimeComplete}
        mode={"datetime"}
        display='default'
        onConfirm={onDateCompleteChange}
        onCancel={() => setShowDateTimeComplete(false)}
        format='DD-MM-YYYY'
      />
      <DateTimePickerModal
        isVisible={showNextDateInspection}
        testID='dateTimePicker'
        value={nextDateInspection}
        mode={"date"}
        display='default'
        onConfirm={onNextDateInspectionChange}
        onCancel={() => setShowNextDateInspection(false)}
        format='DD-MM-YYYY'
      />
      {getSign ? (
        <SignatureComponent
          returnImage={(uri) => {
            setSupervisorSign(uri);
            setGetSign(false);
          }}
        />
      ) : (
        <>
          <View style={styles.imageView}>
            <Image source={mainImage} style={styles.bannerImage} />
          </View>
          <View
            style={{
              paddingTop: 30,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text style={styles.titleText}>LADDERS / PODIUM STEPLADDER INSPECTION CHECKLIST</Text>
          </View>
          <ScrollView>
            <View style={styles.formCodnatiner}>
              <View style={styles.inputFieldContainer}>
                <TextInput style={styles.inputField} placeholder={"Main Contractor"} value={contractorName} onChangeText={(e) => setContractorName(e)} />
              </View>
              <View style={styles.inputFieldContainer}>
                <TextInput value={projectName} onChangeText={(e) => setProjectName(e)} style={styles.inputField} placeholder={"Project"} />
              </View>
              <View style={styles.inputFieldContainer}>
                <TouchableOpacity onPress={() => setGetSign(true)} style={styles.inputFieldContainer}>
                  {supervisorSign ? (
                    <Image style={{ marginTop: 20, height: 100, width: 100, backgroundColor: "gray" }} source={{ uri: supervisorSign }} />
                  ) : (
                    <Text
                      style={{
                        height: 52,
                        width: "100%",
                        borderBottomWidth: 1,
                        borderBottomColor: "#96A8B2",
                        padding: 5,
                        fontSize: 12,
                        color: "#96A8B2",
                        fontFamily: "poppins-regular",
                        paddingTop: 15,
                      }}>
                      Signature
                    </Text>
                  )}
                </TouchableOpacity>
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
                  }}>
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
                  }}>
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
                  item.title != "" ? (
                    <View key={index}>
                      <View>
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: "poppins-bold",
                            paddingTop: 10,
                            paddingBottom: 20,
                          }}>
                          {item.title}
                        </Text>
                        <Text style={{ fontSize: 12, fontFamily: "poppins-regular" }}>{item.subTitle}</Text>
                      </View>
                      <View style={styles.tableBody}>
                        <View style={styles.inputLadderBodyContainer}>
                          <CheckBox value={item.yes} onValueChange={() => checkedValue(index, "yes")} />
                        </View>
                        <View style={styles.inputLadderBodyContainer}>
                          <CheckBox value={item.no} onValueChange={() => checkedValue(index, "no")} />
                        </View>
                        <View style={styles.inputLadderBodyContainer}>
                          <CheckBox value={item.other} onValueChange={() => checkedValue(index, "other")} />
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View key={index}>
                      <View>
                        <Text style={{ fontSize: 12, fontFamily: "poppins-regular" }}>{item.subTitle}</Text>
                      </View>
                      <View style={styles.tableBody}>
                        <View style={styles.inputLadderBodyContainer}>
                          <CheckBox value={item.yes} onValueChange={() => checkedValue(index, "yes")} />
                        </View>
                        <View style={styles.inputLadderBodyContainer}>
                          <CheckBox value={item.no} onValueChange={() => checkedValue(index, "no")} />
                        </View>
                        <View style={styles.inputLadderBodyContainer}>
                          <CheckBox value={item.other} onValueChange={() => checkedValue(index, "other")} />
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
                  }}>
                  Once completed, please file a copy in the Site Folder and send a copy to our Head Office.
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "#000",
                  width: "100%",
                  height: 2,
                  marginBottom: 20,
                }}></View>
              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.commonBtn} onPress={() => ladderCheckListForm()}>
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
<<<<<<< HEAD
const mapStateToProps = (state) => ({
  token: state.auth.token,
  isScope: state.auth.isScope,
  isSuccessMsg: state.auth.isSuccessMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(LadderCheckList);

=======
const mapDispatchToProps = (dispatch) => ({
  updateHealthReport: (index) => dispatch(updateHealthReport(index)),
});
export default connect(null, mapDispatchToProps)(LadderCheckList);
>>>>>>> 8963071f89a3d01cc8c91cb986015da9fe50ddcf
