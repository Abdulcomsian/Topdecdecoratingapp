import React, { useState } from "react";
import {
  View,
  TextInput,
  ScrollView,
  CheckBox,
  TouchableOpacity,
} from "react-native";
import { Text } from "native-base";
import styles from "../../../assets/css/styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const FridayPack = (props) => {
  const { navigation, token, isSuccess, isSuccessMsg, isJobId } = props;
  const jobID = Math.floor(Math.random() * 100) + 1;
  const tabId = props.route.params.tabName;
  const [documentRow, setDocumentRow] = useState([
    {
      title: "Record of on-site Decorators (Name & CSCS Card Details)",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
    {
      title: "Method Statement Register",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
    {
      title: "Safe Start Briefing",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
    {
      title: "Housekeeping Checklist",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
    {
      title: "Electrical Equipment Record",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
    {
      title: "Harmful Substance Register",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
    {
      title: "Health and Safety Inspection and Monitoring Form",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
    {
      title: "Personal Protective Equipment Issued Record",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
    {
      title: "PUWER Inspection Checklist / Register",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
    {
      title: "Toolbox Talk (Please list topic discussed)",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
    {
      title: "Working at Height Equipment / Inventory Control  ",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
    {
      title: "Ladders and Podium Step Inspection Checklist ",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
  ]);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [contractorName, setContractorName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [weekEnding, setWeekEnding] = useState("");
  const [furtherComments, setFurtherComments] = useState("");
  const [supervisorSign, setSupervisorSign] = useState("");
  const checkedValue = (value, index, key) => {
    console.log("here !");
    if (key == "no") {
      let copyArray = [...documentRow];
      copyArray[index][key] = true;
      copyArray[index]["yes"] = false;
      copyArray[index]["other"] = false;
      setDocumentRow(copyArray);
    } else if (key == "yes") {
      let copyArray = [...documentRow];
      copyArray[index][key] = true;
      copyArray[index]["no"] = false;
      copyArray[index]["other"] = false;
      setDocumentRow(copyArray);
    } else {
      let copyArray = [...documentRow];
      copyArray[index][key] = true;
      copyArray[index]["no"] = false;
      copyArray[index]["yes"] = false;
      setDocumentRow(copyArray);
    }
  };
  const updateCommentValue = (key, index, value) => {
    let preData = [...documentRow];
    preData[index][key] = value;
    setDocumentRow(preData);
  };
  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(new Date(currentDate));
  };
  const showDatepicker = () => {
    setShow(true);
  };
  const fridayPackFormInsert = () => {
    console.log("Name Of Contractor :", contractorName);
    console.log("Project Name :", projectName);
    console.log("Supervisor Sign :", supervisorSign);
    console.log("Document Row :", documentRow);
    console.log("Week Ending :", weekEnding);
    console.log("further Comments :", furtherComments);
    console.log("Date :", date.toLocaleDateString());

    if (contractorName != "" && projectName != "" && supervisorSign != "" && documentRow != "" && weekEnding != "" && furtherComments !=="" && date !=="") {
      props.createScopeHandler(contractorName, projectName, supervisorSign, documentRow, weekEnding, date, furtherComments, jobID, tabId, token, props.route.params?.index);
    } else {
      alert("Please Insert All Fields CareFully !");
      return false;
    }
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
      <View
        style={{
          paddingTop: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.titleText}>FRIDAY PACK</Text>
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
              placeholder={"Week Ending"}
              value={weekEnding}
              onChangeText={(e) => setWeekEnding(e)}
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            {documentRow.map((item, index) => (
              <View style={styles.detailsInstructionContactView} key={index}>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.instructionFridayView}>
                    <Text style={{ fontFamily: "poppins-bold", fontSize: 10 }}>
                      {item.title}
                    </Text>
                  </View>
                  <View style={styles.checkBoxInstructionView}>
                    <View style={styles.firstInstructionCheckBoxRow}>
                      <View style={styles.parentCheckBox}>
                        <View style={styles.leftCheckBox}>
                          <CheckBox
                            value={item.no}
                            onValueChange={() =>
                              checkedValue("No", index, "no")
                            }
                          />
                        </View>
                        <View style={styles.rightCheckBox}>
                          <Text style={styles.accidentText}>No</Text>
                        </View>
                      </View>
                      <View style={styles.parentCheckBox}>
                        <View style={styles.leftCheckBox}>
                          <CheckBox
                            value={item.yes}
                            onValueChange={() =>
                              checkedValue("Yes", index, "yes")
                            }
                          />
                        </View>
                        <View style={styles.rightCheckBox}>
                          <Text style={styles.accidentText}>Yes</Text>
                        </View>
                      </View>
                      <View style={styles.parentCheckBox}>
                        <View style={styles.leftCheckBox}>
                          <CheckBox
                            value={item.other}
                            onValueChange={() =>
                              checkedValue("other", index, "other")
                            }
                          />
                        </View>
                        <View style={styles.rightCheckBox}>
                          <Text style={styles.accidentText}>N/A</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.inputFieldContainer}>
                  <TextInput
                    style={styles.inputField}
                    placeholder={"Comments"}
                    value={item.comment}
                    onChangeText={(txt) =>
                      updateCommentValue("comment", index, txt)
                    }
                  />
                </View>
              </View>
            ))}
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={styles.inputField}
              placeholder={"Any Further Comments"}
              value={furtherComments}
              onChangeText={(e) => setFurtherComments(e)}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={styles.inputField}
              placeholder={"Supervisor (Print & Sign)"}
              value={supervisorSign}
              onChangeText={(e) => setSupervisorSign(e)}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <Text
              onPress={() => showDatepicker()}
              style={{
                width: "100%",
                height: 52,
                paddingTop: 20,
                fontSize: 12,
                color: "#96A8B2",
                fontFamily: "poppins-regular",
                borderBottomWidth: 1,
                borderBottomColor: "#96A8B2",
                padding: 5,
              }}
            >
              {new Date(date).toLocaleDateString()}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "poppins-bold",
              fontSize: 12,
              paddingTop: 10,
              textAlign: "center",
            }}
          >
            Once completed, please file a copy in the Site Folder and send a
            copy to our Head Office.
          </Text>
          <View
            style={{
              backgroundColor: "#000",
              width: "100%",
              height: 2,
              marginBottom: 20,
              marginTop: 20,
            }}
          ></View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.commonBtn}
              onPress={() => fridayPackFormInsert()}
            >
              <Text style={styles.commonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
  isSuccess: state.auth.isSuccess,
  isSuccessMsg: state.auth.isSuccessMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
  createFridayPackHandler: (dynamicInput, painterName, signature, plotNumber, type, date, jobID, tabId, token, index) =>
    dispatch(insertFridayPackForm(dynamicInput, painterName, signature, plotNumber, type, date, jobID, tabId, token, index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(FridayPack);
