import React, { useState } from "react";
import { View, Image, TouchableOpacity, TextInput, ScrollView, CheckBox } from "react-native";
import { Text } from "native-base";
import styles from "../../../assets/css/styles";
import { connect } from "react-redux";
import { insertRecordOfProject } from "../../../Redux/action/auth/authActionTypes";
import { updateHealthReport } from "../../../Redux/action/summary/Summary";

const RecordOfProject = (props) => {
  const { navigation, token, isOnSite, isSuccessMsg, isJobId } = props;
  const jobID = Math.floor(Math.random() * 100) + 1;
  const tabId = props.route.params.tabName;
  const [recordArray, setRecordArray] = useState([
    {
      title:
        "Any medical conditions/change in medical condition during this project Must be brought to the attention of the supervisor. This information is Required to protect your health and safety, any other details will be treated In strict confidence. ",
      yes: false,
      no: false,
    },
    { title: "Do you suffer from epilepsy or fits?", yes: false, no: false },
    { title: "Are you diabetic needing insulin? ", yes: false, no: false },
    { title: "Do you suffer from Asthma?", yes: false, no: false },
    {
      title: "Have you ever had a block-outs, recurrent dizziness or any conditions which Would cause sudden collapse or incapacity?",
      yes: false,
      no: false,
    },
    {
      title: "Do you suffer from discomfort or pain in the chest or shortness of breath e.g. when climbing stairs.  ",
      yes: false,
      no: false,
    },
    {
      title: "Do you have difficulty hearing normal conversation?",
      yes: false,
      no: false,
    },
    {
      title: "Are you suffering any other condition or taking any medication for a medical Condition? ",
      yes: false,
      no: false,
    },
    {
      title:
        "Do you understand that failing that to comply with site rules will result in disciplinary Actions being  taken, which may involve your dismissal from site under the Health and safety at work etc.1974 ",
      yes: false,
      no: false,
    },
  ]);
  const checkedReportValue = (key, index, value) => {
    let preData = [...recordArray];
    if (key == "yes") {
      preData[index][key] = true;
      preData[index]["no"] = false;
      setRecordArray(preData);
    } else {
      preData[index][key] = true;
      preData[index]["yes"] = false;
      setRecordArray(preData);
    }
  };
  const [surName, setSurName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [firstName, setFirstName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [otherDetails, setOtherDetails] = useState("");
  const [nextKin, setNextKin] = useState("");
  const [relation, setRelation] = useState("");
  const [kinContactDetail, setKinContactDetail] = useState("");
  const [mainContractor, setMainContractor] = useState("");
  const [projectName, setProjectName] = useState("");

  const recordProjectFormInsert = async () => {
    try {
      

      if (
        surName != "" &&
        mobileNo != "" &&
        firstName != "" &&
        jobTitle != "" &&
        address != "" &&
        cardNumber != "" &&
        otherDetails != "" &&
        nextKin != "" &&
        relation != "" &&
        kinContactDetail != "" &&
        mainContractor != "" &&
        projectName != "" &&
        recordArray != ""
      ) {
       await props.createRecordOfProjectHandler(
          surName,
          mobileNo,
          firstName,
          jobTitle,
          address,
          cardNumber,
          otherDetails,
          nextKin,
          relation,
          kinContactDetail,
          mainContractor,
          projectName,
          recordArray,
          jobID,
          tabId,
          token,
          props.route.params?.index
        );
        props.updateHealthReport(props?.route?.params?.index);
        alert("Record Of Project Insert SuccessFully !");
        props.navigation.pop();
      } else {
        alert("Please Insert All Fields CareFully !");
        return false;
      }
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          paddingTop: 30,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Text style={styles.titleText}>RECORD OF PROJECT INDUCTION TRAINING</Text>
        <Text
          style={{
            fontFamily: "poppins-regular",
            fontSize: 12,
            textAlign: "center",
          }}>
          FILE IN CONFIDENCE WHEN COMPLETE
        </Text>
      </View>
      <ScrollView>
        <View style={styles.formCodnatiner}>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"SURNAME"}
              onChangeText={(e) => setSurName(e)}
              value={surName}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"MOBILE NO"}
              onChangeText={(e) => setMobileNo(e)}
              value={mobileNo}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"FIRST NAME"}
              onChangeText={(e) => setFirstName(e)}
              value={firstName}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"JOB TITLE"}
              onChangeText={(e) => setJobTitle(e)}
              value={jobTitle}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"ADDRESS"}
              onChangeText={(e) => setAddress(e)}
              value={address}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"TRADE/ CSCS REGISTRATION SCHEME/CARD NO"}
              onChangeText={(e) => setCardNumber(e)}
              value={cardNumber}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"OTHER TRAINING DETAILS"}
              onChangeText={(e) => setOtherDetails(e)}
              value={otherDetails}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"NEXT OF KIN"}
              onChangeText={(e) => setNextKin(e)}
              value={nextKin}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Your relationship to Next of KIN"}
              onChangeText={(e) => setRelation(e)}
              value={relation}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"NEXT OF KIN Contact details"}
              onChangeText={(e) => setKinContactDetail(e)}
              value={kinContactDetail}
            />
          </View>
          <Text
            style={{
              fontFamily: "poppins-bold",
              fontSize: 12,
              marginTop: 20,
              marginBottom: 20,
            }}>
            ANY MEDICAL PROBLEMS *YES / NO (*delete as appropriate)
          </Text>
          <View style={styles.tableViewContainer}>
            <View style={styles.tableHeader}>
              <View style={styles.headerProjectTitleView}>
                <Text style={styles.headerTitle}>DETAILS BELOW </Text>
              </View>
              <View style={styles.headerProjectTitleView}>
                <Text style={styles.headerTitle}>Yes</Text>
              </View>
              <View style={styles.headerProjectTitleView}>
                <Text style={styles.headerTitle}>No</Text>
              </View>
            </View>
            {recordArray.map((item, index) => (
              <View key={index}>
                <Text
                  style={{
                    fontFamily: "poppins-regular",
                    fontSize: 10,
                    paddingTop: 20,
                  }}>
                  {item.title}
                </Text>
                <View style={styles.tableBody}>
                  <View style={{ flexDirection: "row", width: "100%" }}>
                    <View style={[styles.inputProjectBodyContainer, { flexDirection: "row" }]}>
                      <View style={{ width: "20%" }}>
                        <CheckBox
                          value={item.yes}
                          onValueChange={() =>
                            checkedReportValue("yes", index, "true")
                          }
                        />
                      </View>
                      <View style={{ width: "80%", paddingTop: 5 }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#96A8B2",
                            fontFamily: "poppins-regular",
                          }}>
                          Yes
                        </Text>
                      </View>
                    </View>
                    <View style={[styles.inputProjectBodyContainer, { flexDirection: "row" }]}>
                      <View style={{ width: "20%" }}>
                        <CheckBox
                          value={item.no}
                          onValueChange={() =>
                            checkedReportValue("no", index, "true")
                          }
                        />
                      </View>
                      <View style={{ width: "80%", paddingTop: 5 }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#96A8B2",
                            fontFamily: "poppins-regular",
                          }}>
                          No
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
            <Text
              style={{
                fontFamily: "poppins-bold",
                fontSize: 10,
                textAlign: "center",
                marginTop: 20,
              }}>
              IN SIGNING THIS INDUCTION FORM, YOU ACKNOWLEDGE YOUR UNDERSTANDING AND ACCEPTANCE OF WORK METHOD STATEMENT, TOP DEC’S SITE RULES AND SPECIFIC
              REQUIREMENTS YOU ARE TO ADHERE WHILST WORKING ON THIS PROJECT.{" "}
            </Text>
            <View style={styles.inputFieldContainer}>
              <TextInput
                style={styles.inputField}
                placeholder={"Main Contractor"}
                onChangeText={(e) => setMainContractor(e)}
                value={mainContractor}
              />
            </View>
            <View style={styles.inputFieldContainer}>
              <TextInput
                style={styles.inputField}
                placeholder={"Project"}
                onChangeText={(e) => setProjectName(e)}
                value={projectName}
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#000",
              width: "100%",
              height: 2,
              marginBottom: 20,
              marginTop: 20,
            }}></View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.commonBtn} onPress={() => recordProjectFormInsert()}>
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
  isOnSite: state.auth.isOnSite,
  isSuccessMsg: state.auth.isSuccessMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
  createRecordOfProjectHandler: (
    surName,
    mobileNo,
    firstName,
    jobTitle,
    address,
    cardNumber,
    otherDetails,
    nextKin,
    relation,
    kinContactDetail,
    mainContractor,
    projectName,
    recordArray,
    jobID,
    tabId,
    token,
    index
  ) =>
    dispatch(
      insertRecordOfProject(
        surName,
    mobileNo,
    firstName,
    jobTitle,
    address,
    cardNumber,
    otherDetails,
    nextKin,
    relation,
    kinContactDetail,
    mainContractor,
    projectName,
    recordArray,
    jobID,
    tabId,
    token,
    index
      )
    ),
    updateHealthReport: (index) => dispatch(updateHealthReport(index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(RecordOfProject);
