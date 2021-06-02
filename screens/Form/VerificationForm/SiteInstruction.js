import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Text } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { insertSiteInstruction } from "../../../Redux/action/auth/authActionTypes";
import { connect } from "react-redux";
import { updateVerificationReport } from "../../../Redux/action/summary/Summary";
import * as ImagePicker from "expo-image-picker";
import { AssetsSelector } from "expo-images-picker";

var plus = require("../../../assets/authScreen/plus.png");
const DecorationRecord = (props) => {
  const { navigation, token, isSuccessMsg, isSiteInstruction, isJobId } = props;
  // const jobID = Math.floor(Math.random() * 100) + 1;
  const { plot_id } = props.route.params;
  const jobID = plot_id;
  console.log("Site Plot ID :", jobID);
  const tabId = props.route.params.tabName;
  const [date, setDate] = useState("");
  const [show, setShow] = useState(false);
  const [dateSupervisor, setDateSupervisor] = useState("");
  const [showSupervisor, setShowSupervisor] = useState(false);
  const [contractName, setContractName] = useState("");
  const [instructionNo, setInstructionNo] = useState("");
  const [raisedBy, setRaisedBy] = useState("");
  const [description, setDescription] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");
  const [supervisorName, setSupervisorName] = useState("");

  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(new Date(currentDate).toLocaleDateString());
  };
  const showDatepicker = () => {
    setShow(true);
  };
  const onDateSupervisorChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowSupervisor(false);
    setDateSupervisor(new Date(currentDate).toLocaleDateString());
  };
  const showSupervisorDatepicker = () => {
    setShowSupervisor(true);
  };
  const [signature, setSignature] = useState({
    index: -1,
  });
  const [projectComment, setProjectComment] = useState("");
  const siteInstructionForm = async () => {
    try {
      if (
        contractName != "" &&
        instructionNo != "" &&
        raisedBy != "" &&
        date != "" &&
        description != "" &&
        specialNotes != "" &&
        supervisorName != "" &&
        dateSupervisor != "" &&
        projectImagesComment != "" &&
        commentImages != ""
      ) {
        await props.createSiteInstructionHandler(
          contractName,
          instructionNo,
          raisedBy,
          date,
          description,
          specialNotes,
          supervisorName,
          dateSupervisor,
          projectImagesComment,
          commentImages,
          jobID,
          tabId,
          token
        );
        //props.updateVerificationReport(props?.route?.params?.index);
        alert("Site Instruction Insert SuccessFully !");
        props.navigation.pop();
      } else {
        alert("Please Insert All Fields CareFully !");
        return false;
      }
    } catch (err) {
      alert(err.message);
    }
  };
  // console.log("Date :",date)
  // console.log("Date Supervusor:",dateSupervisor)

  const [projectImages, setProjectImages] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const onDone = (data) => {
    let copydata = [...projectImagesComment];
    copydata[signature.index].image = data[0].uri;
    setProjectImagesComment([...copydata]);
    setSignature({ ...signature, index: -1 });
    setIsShow(false);
  };

  const goBack = () => {
    setIsShow(false);
  };
  const uploadPhotoImage = async (index) => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    setSignature({ ...signature, index: index });
    setIsShow(true);
  };
  // console.log("Pick Project :",projectImages)
  const _textStyle = {
    color: "white",
  };
  const _buttonStyle = {
    backgroundColor: "#1073AC",
    borderRadius: 5,
  };
  const [projectImagesComment, setProjectImagesComment] = useState([]);
  const [commentImages, setCommentImages] = useState([]);
  const addImagesCommentRow = () => {
    setProjectImagesComment((oldArray) => [
      ...oldArray,
      { image: "", comment: "" },
    ]);
  };
  const updateProjectCommentValue = (key, index, value) => {
    let preData = [...projectImagesComment];
    preData[index][key] = value;
    setProjectImagesComment([...preData]);

    let commentData = preData.map((item, index) => {
      return { comment: item.comment };
    });
    setCommentImages(commentData);
  };
  return (
    <ScrollView style={{ height: "100%" }}>
      {isShow ? (
        <View style={{ flex: 1 }}>
          <AssetsSelector
            options={{
              assetsType: ["photo", "video"],
              maxSelections: 1,
              margin: 2,
              portraitCols: 4,
              landscapeCols: 5,
              widgetWidth: 100,
              widgetBgColor: "white",
              videoIcon: {
                iconName: "ios-videocam",
                color: "tomato",
                size: 20,
              },
              selectedIcon: {
                iconName: "ios-checkmark-circle-outline",
                color: "white",
                bg: "#0eb14970",
                size: 26,
              },
              spinnerColor: "black",
              onError: () => {},
              noAssets: () => (
                <View>
                  <Text></Text>
                </View>
              ),
              defaultTopNavigator: {
                continueText: "Finish",
                goBackText: "Back",
                selectedText: "Selected",
                midTextColor: "tomato",
                buttonStyle: _buttonStyle,
                buttonTextStyle: _textStyle,
                backFunction: goBack,
                doneFunction: (data) => onDone(data),
              },
            }}
          />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <DateTimePickerModal
            isVisible={show}
            testID="dateTimePicker"
            value={date}
            mode={Platform.OS === 'ios' ? "datetime" : "date"}
            display="default"
            onCancel={() => setShow(false)}
            onConfirm={onChange}
            format="DD-MM-YYYY"
          />
          <DateTimePickerModal
            isVisible={showSupervisor}
            testID="dateTimePicker"
            value={dateSupervisor}
            mode={Platform.OS === 'ios' ? "datetime" : "date"}
            display="default"
            onCancel={() => setShowSupervisor(false)}
            onConfirm={onDateSupervisorChange}
            format="DD-MM-YYYY"
          />
          <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Site Instruction</Text>
            </View>

            <View style={styles.formCodnatiner}>
              <View style={styles.inputFieldContainer}>
                <TextInput
                  style={styles.inputField}
                  placeholder={"Contract Name"}
                  value={contractName}
                  onChangeText={(e) => setContractName(e)}
                />
              </View>
              <View style={styles.inputFieldContainer}>
                <TextInput
                  style={styles.inputField}
                  placeholder={"Instruction No"}
                  value={instructionNo}
                  onChangeText={(e) => setInstructionNo(e.replace(/[^0-9]/g, ""))}
                />
              </View>
              <View style={styles.inputFieldContainer}>
                <TextInput
                  style={styles.inputField}
                  placeholder={"Raised by"}
                  value={raisedBy}
                  onChangeText={(e) => setRaisedBy(e)}
                />
              </View>
              <View style={styles.inputFieldContainer}>
              <TouchableOpacity onPress={() => showDatepicker()}>
                      <TextInput
                        editable={false}
                        value={date ? new Date(date).toLocaleDateString() : ""}
                        style={styles.inputField}
                        placeholder={"Date"}
                      />
                    </TouchableOpacity>
              </View>
              <View style={styles.inputFieldContainer}>
                <TextInput
                  style={styles.inputField}
                  placeholder={
                    "Detailed Description of works to be carried out including its location"
                  }
                  value={description}
                  onChangeText={(e) => setDescription(e)}
                />
              </View>
              <View style={styles.inputFieldContainer}>
                <TextInput
                  style={styles.inputField}
                  placeholder={"Any special conditions or notes"}
                  value={specialNotes}
                  onChangeText={(e) => setSpecialNotes(e)}
                />
              </View>
              <View style={{ paddingTop: 20, paddingBottom: 20 }}>
                <Text style={{ fontFamily: "poppins-bold", fontSize: 8 }}>
                  The works as instructed above are to be carried out in
                  accordance with clause 2 and 9 of the agreed Contract Terms.
                  It is the responsibility of the supervisor to manage the
                  dayworks and DO NOT exceed the agreed figure for the daywork
                  rates. If there are any changes throughout the process the
                  supervisor should kindly inform the relevant Top Dec Managers
                  before proceeding.{" "}
                </Text>
              </View>
              <View style={styles.instructionView}>
                <View style={styles.leftView}>
                  <Text style={{ fontFamily: "poppins-bold", fontSize: 10 }}>
                    A
                  </Text>
                  <Text style={{ fontFamily: "poppins-bold", fontSize: 10 }}>
                    B
                  </Text>
                  <Text style={{ fontFamily: "poppins-bold", fontSize: 10 }}>
                    C
                  </Text>
                  <Text style={{ fontFamily: "poppins-bold", fontSize: 10 }}>
                    D
                  </Text>
                  <Text style={{ fontFamily: "poppins-bold", fontSize: 10 }}>
                    E
                  </Text>
                </View>
                <View style={styles.rightView}>
                  <Text
                    style={{
                      fontFamily: "poppins-regular",
                      fontSize: 9,
                      paddingTop: 2,
                    }}
                  >
                    Cost to be set off against bad workmanship by other
                    decorators
                  </Text>
                  <Text
                    style={{
                      fontFamily: "poppins-regular",
                      fontSize: 9,
                      paddingTop: 2,
                    }}
                  >
                    Cost to be set off against client{" "}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "poppins-regular",
                      fontSize: 9,
                      paddingTop: 2,
                    }}
                  >
                    Contract agreed hours
                  </Text>
                  <Text
                    style={{
                      fontFamily: "poppins-regular",
                      fontSize: 9,
                      paddingTop: 2,
                    }}
                  >
                    Non-recoverable cost{" "}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "poppins-regular",
                      fontSize: 9,
                      paddingTop: 2,
                    }}
                  >
                    Client – Extra works (Site Instruction)
                  </Text>
                </View>
              </View>
              <View style={{ paddingTop: 20, paddingBottom: 20 }}>
                <Text style={{ fontFamily: "poppins-bold", fontSize: 8 }}>
                  For and on behalf of Top Dec Decorating Limited.
                </Text>
              </View>
              <View style={styles.instructionView}>
                <View style={styles.leftDistributionView}>
                  <View style={{ width: "50%", marginRight: 5 }}>
                    <View style={styles.inputFieldContainer}>
                      <TextInput
                        style={styles.inputField}
                        placeholder={"Supervisor"}
                        value={supervisorName}
                        onChangeText={(e) => setSupervisorName(e)}
                      />
                    </View>
                  </View>
                  <View style={{ width: "50%", marginRight: 5 }}>
                    <View style={styles.inputFieldContainer}>
                    <TouchableOpacity  onPress={() => showSupervisorDatepicker()}>
                      <TextInput
                        editable={false}
                        value={dateSupervisor ? new Date(dateSupervisor).toLocaleDateString() : ""}
                        style={styles.inputField}
                        placeholder={"Date"}
                      />
                    </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={styles.rightDistributionView}>
                  <Text style={{ fontFamily: "poppins-bold", fontSize: 8 }}>
                    Distribution:
                  </Text>
                  <View style={{ paddingLeft: 10 }}>
                    <Text
                      style={{ fontFamily: "poppins-regular", fontSize: 8 }}
                    >
                      Top Dec Accounts
                    </Text>
                    <Text
                      style={{ fontFamily: "poppins-regular", fontSize: 8 }}
                    >
                      Managing Director
                    </Text>
                    <Text
                      style={{ fontFamily: "poppins-regular", fontSize: 8 }}
                    >
                      Accountant
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  marginBottom: 10,
                  fontFamily: "poppins-semiBold",
                }}
              >
                Project Images
              </Text>
              <View
                style={[
                  styles.tableViewContainer,
                  { paddingLeft: 0, paddingRight: 0 },
                ]}
              >
                <View style={styles.tableHeader}>
                  <View style={{ width: "50%" }}>
                    <Text style={styles.headerTitle}>Image</Text>
                  </View>
                  <View style={{ width: "50%" }}>
                    <Text style={styles.headerTitle}>Comment</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  marginRight: 50,
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  style={[styles.addBtn]}
                  onPress={() => {
                    if (
                      projectImagesComment.length > 0 &&
                      !projectImagesComment[projectImagesComment.length - 1]
                        .image &&
                      !projectImagesComment[projectImagesComment.length - 1]
                        .comment
                    ) {
                      alert(
                        "Please Enter All Value and then move to next Item Add !"
                      );
                    } else {
                      addImagesCommentRow();
                    }
                  }}
                >
                  <Image style={styles.plusBtn} source={plus} />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "column" }}>
                {projectImagesComment.length > 0 &&
                  projectImagesComment.map((el, index) => (
                    <View
                      style={[styles.tableBody, { marginBottom: 20 }]}
                      key={index}
                    >
                      {el.image != "" ? (
                        <View
                          style={{
                            width: "50%",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            style={{
                              width: 50,
                              height: 50,
                              marginRight: 10,
                            }}
                            source={{ uri: el.image }}
                            key={index}
                          />
                        </View>
                      ) : (
                        <View style={{ width: "50%" }}>
                          <TouchableOpacity
                            style={[
                              styles.button,
                              styles.buttonOpen,
                              { width: "90%" },
                            ]}
                            onPress={() => uploadPhotoImage(index)}
                          >
                            <Text style={styles.textStyle}>Add Image</Text>
                          </TouchableOpacity>
                        </View>
                      )}

                      <View style={{ width: "50%" }}>
                        <TextInput
                          value={el.comment}
                          onChangeText={(txt) =>
                            updateProjectCommentValue("comment", index, txt)
                          }
                          style={styles.bodyTextInput}
                          placeholder={"Comment"}
                        />
                      </View>
                    </View>
                  ))}
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#000",
                width: "100%",
                height: 2,
                marginTop: 20,
              }}
            ></View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.commonBtn}
                onPress={() => siteInstructionForm()}
              >
                <Text style={styles.commonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
  isSiteInstruction: state.auth.isSiteInstruction,
  isSuccessMsg: state.auth.isSuccessMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
  createSiteInstructionHandler: (
    contractName,
    instructionNo,
    raisedBy,
    date,
    description,
    specialNotes,
    supervisorName,
    dateSupervisor,
    projectImagesComment,
    commentImages,
    jobID,
    tabId,
    token
  ) =>
    dispatch(
      insertSiteInstruction(
        contractName,
        instructionNo,
        raisedBy,
        date,
        description,
        specialNotes,
        supervisorName,
        dateSupervisor,
        projectImagesComment,
        commentImages,
        jobID,
        tabId,
        token
      )
    ),
  // updateVerificationReport: (index) => dispatch(updateVerificationReport(index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DecorationRecord);
const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#1073AC",
  },
  buttonClose: {
    backgroundColor: "#1073AC",
  },
  textStyle: {
    color: "white",
    textAlign: "center",
    fontFamily: "poppins-semiBold",
    fontSize: 10,
  },
  titleContainer: {
    height: "5%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  titleText: {
    color: "#4F4F4F",
    fontSize: 18,
    fontFamily: "poppins-semiBold",
  },
  formCodnatiner: {
    width: "100%",
  },
  inputFieldContainer: {
    width: "100%",
  },
  inputField: {
    height: 52,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#96A8B2",
    padding: 5,
    fontSize: 12,
    color: "#96A8B2",
    fontFamily: "poppins-regular",
  },
  instructionView: {
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    width: "100%",
    flexDirection: "row",
  },
  leftView: {
    borderRightWidth: 1,
    width: "5%",
  },
  rightView: {
    width: "95%",
    paddingLeft: 10,
  },
  leftDistributionView: {
    width: "70%",
    flexDirection: "row",
    borderRightWidth: 1,
  },
  rightDistributionView: {
    width: "30%",
    padding: 10,
  },
  btnContainer: {
    width: "100%",
    height: "15%",
    marginBottom: 40,
    marginTop: 20,
  },
  commonBtn: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 3,
    borderColor: "#1073AC",
  },
  commonText: {
    color: "#1073AC",
    fontSize: 18,
    fontFamily: "poppins-semiBold",
  },
  plusBtn: {
    width: 12,
    height: 12,
  },
  addBtn: {
    justifyContent: "center",
    backgroundColor: "#F6F9FB",
    borderWidth: 1,
    borderColor: "#E2ECF2",
    padding: 5,
    borderRadius: 14,
    marginTop: 15,
  },
  tableHeader: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
    marginTop: 20,
  },
  headerTitleView: {
    width: "11.1%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 8,
    textAlign: "center",
    fontFamily: "poppins-bold",
  },
  tableBody: {
    width: "100%",
    flexDirection: "row",
  },
  inputSecondBodyContainer: {
    width: "12.5%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputFieldContainer: {
    width: "100%",
  },
  inputField: {
    height: 52,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#96A8B2",
    padding: 5,
    fontSize: 12,
    color: "#96A8B2",
    fontFamily: "poppins-regular",
  },
  bodyTextInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#96A8B2",
    padding: 5,
    fontSize: 12,
    color: "#96A8B2",
    marginLeft: 2,
    marginRight: 2,
    fontFamily: "poppins-regular",
  },
});
