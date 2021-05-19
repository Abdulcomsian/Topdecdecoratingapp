import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Text, CheckBox } from "native-base";
import styles from "../../../assets/css/styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { insertHarmFulForm } from "../../../Redux/action/auth/authActionTypes";
import { connect } from "react-redux";
import { updateHealthReport } from "../../../Redux/action/summary/Summary";
import * as ImagePicker from "expo-image-picker";
import { AssetsSelector } from "expo-images-picker";

var plus = require("../../../assets/authScreen/plus.png");
const HarmFulSubstance = (props) => {
  const { navigation, token, isSuccess, isSuccessMsg, isJobId } = props;
  // const jobID = Math.floor(Math.random() * 100) + 1;
  const { plot_Id } = props.route.params;
  const jobID = plot_Id;
  console.log("Work Plot ID :", jobID);
  const tabId = props.route.params.tabName;
  console.log("Work Tab ID :", tabId);
  const [harmFulRow, setHarmFullRow] = useState([]);
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [show, setShow] = useState(false);
  const [dynamicInput, setdynamicInput] = useState([]);
  const [contractorName, setContractorName] = useState("");
  const [projectName, setProjectName] = useState("");

  const addHarmfullRow = () => {
    setdynamicInput((oldArray) => [
      ...oldArray,
      {
        paint: "",
        location: "",
        potential_hazard: "",
        safer_alternatives: "",
        protective_clothes: "",
        supplierMSDS: "",
      },
    ]);
  };
  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(new Date(currentDate).toLocaleDateString());
  };
  const showDatepicker = () => {
    setShow(true);
  };
  const [projectComment, setProjectComment] = useState("");
  const harmFulSubstanceFormInsert = async () => {
    try {
      if (
        contractorName != "" &&
        projectName != "" &&
        date != "" &&
        dynamicInput != "" &&
        projectImages !="" &&
        projectComment !=""
      ) {
        await props.createHarmFullHandler(
          contractorName,
          projectName,
          date,
          dynamicInput,
          projectImages,
          projectComment,
          jobID,
          tabId,
          token,
          props.route.params?.index
        );
        // props.updateHealthReport(props?.route?.params?.index);
        alert("HAramFul Substance Insert SuccessFully !");
        props.navigation.pop();
      } else {
        alert("Please Insert All Fields CareFully !");
        return false;
      }
    } catch (err) {
      alert(err.message);
    }
  };
  const updateValue = (key, index, value) => {
    let preData = [...dynamicInput];
    preData[index][key] = value;
    setdynamicInput(preData);
  };

  const [projectImages, setProjectImages] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const onDone = (data) => {
    setProjectImages(data);
    setIsShow(false);
  };

  const goBack = () => {
    setIsShow(false);
  };
  const uploadPhotoImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
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
  console.log("Project Iamges :", projectImages);
  return (
    <View style={styles.mainContainer}>
      {isShow ? (
        <View style={{ flex: 1 }}>
          <AssetsSelector
            options={{
              assetsType: ["photo", "video"],
              maxSelections: 3,
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
        <View style={{flex:1}}>
          <DateTimePickerModal
            isVisible={show}
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            display="default"
            onConfirm={onChange}
            onCancel={() => setShow(false)}
            format="DD-MM-YYYY"
          />
          <View
            style={{
              paddingTop: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.titleText}>Harmful Substance Register</Text>
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
              <View style={[styles.tableViewContainer, { marginTop: 30 }]}>
                <View style={styles.tableHeader}>
                  <View style={styles.headerHarmFulTitleView}>
                    <Text style={styles.headerTitle}>Substance</Text>
                  </View>
                  <View style={styles.headerHarmFulTitleView}>
                    <Text style={styles.headerTitle}>Location</Text>
                  </View>
                  <View style={styles.headerHarmFulTitleView}>
                    <Text style={styles.headerTitle}>Potential hazard</Text>
                  </View>
                  <View style={styles.headerHarmFulTitleView}>
                    <Text style={styles.headerTitle}>Safer alternatives </Text>
                  </View>
                  <View style={styles.headerHarmFulTitleView}>
                    <Text style={styles.headerTitle}>
                      Protective clothing required Y/N
                    </Text>
                  </View>
                  <View style={styles.headerHarmFulTitleView}>
                    <Text style={styles.headerTitle}>
                      Supplier MSDS Held Y/N
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: "column" }}>
                {dynamicInput.length > 0 &&
                  dynamicInput.map((el, index) => (
                    <View style={styles.tableBody} key={index}>
                      <View style={styles.inputHarmFullBodyContainer}>
                        <TextInput
                          style={styles.bodyTextInput}
                          placeholder={"Substance"}
                          value={el.paint}
                          onChangeText={(txt) =>
                            updateValue("paint", index, txt)
                          }
                        />
                      </View>
                      <View style={styles.inputHarmFullBodyContainer}>
                        <TextInput
                          style={styles.bodyTextInput}
                          placeholder={"Location"}
                          value={el.location}
                          onChangeText={(txt) =>
                            updateValue("location", index, txt)
                          }
                        />
                      </View>
                      <View style={styles.inputHarmFullBodyContainer}>
                        <TextInput
                          style={styles.bodyTextInput}
                          placeholder={"Potential hazard"}
                          value={el.potential_hazard}
                          onChangeText={(txt) =>
                            updateValue("potential_hazard", index, txt)
                          }
                        />
                      </View>
                      <View style={styles.inputHarmFullBodyContainer}>
                        <TextInput
                          style={styles.bodyTextInput}
                          placeholder={"Safer alternatives"}
                          value={el.safer_alternatives}
                          onChangeText={(txt) =>
                            updateValue("safer_alternatives", index, txt)
                          }
                        />
                      </View>
                      <View style={styles.inputHarmFullBodyContainer}>
                        <TextInput
                          style={styles.bodyTextInput}
                          placeholder={"Protective clothing required Y/N"}
                          value={el.protective_clothes}
                          onChangeText={(txt) =>
                            updateValue("protective_clothes", index, txt)
                          }
                        />
                      </View>
                      <View style={styles.inputHarmFullBodyContainer}>
                        <TextInput
                          style={styles.bodyTextInput}
                          placeholder={"Supplier MSDS Held Y/N"}
                          value={el.supplierMSDS}
                          onChangeText={(txt) =>
                            updateValue("supplierMSDS", index, txt)
                          }
                        />
                      </View>
                    </View>
                  ))}
              </View>
              <View
                style={{
                  width: "100%",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  style={[styles.addBtn, { marginRight: 20 }]}
                  onPress={() => {
                    if (
                      dynamicInput.length > 0 &&
                      !dynamicInput[dynamicInput.length - 1].paint &&
                      !dynamicInput[dynamicInput.length - 1].location &&
                      !dynamicInput[dynamicInput.length - 1].potential_hazard &&
                      !dynamicInput[dynamicInput.length - 1]
                        .safer_alternatives &&
                      !dynamicInput[dynamicInput.length - 1]
                        .protective_clothes &&
                      !dynamicInput[dynamicInput.length - 1].supplierMSDS
                    ) {
                      alert(
                        "Please Enter All Value and then move to next Item Add !"
                      );
                    } else {
                      addHarmfullRow();
                    }
                  }}
                >
                  <Image style={styles.plusBtn} source={plus} />
                </TouchableOpacity>
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
                {projectImages != "" ? (
                  <View style={{ flexDirection: "row" }}>
                    {/* <Text>Hello</Text> */}
                    {projectImages.map((item, index) => (
                      <Image
                        style={{ width: 50, height: 50, marginRight: 10 }}
                        source={{ uri: item.uri }}
                        key={index}
                      />
                    ))}
                  </View>
                ) : (
                  <TouchableOpacity
                    style={[
                      styles.button,
                      styles.buttonOpen,
                      { width: "100%" },
                    ]}
                    onPress={() => uploadPhotoImage()}
                  >
                    <Text style={styles.textStyle}>Add Images</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.inputFieldContainer}>
                    <TextInput
                      value={projectComment}
                      onChangeText={(e) => setProjectComment(e)}
                      style={styles.inputField}
                      multiline={true}
                      placeholder={"Project Images Comments"}
                    />

                  </View>
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
                  onPress={() => harmFulSubstanceFormInsert()}
                >
                  <Text style={styles.commonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
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
  createHarmFullHandler: (
    contractorName,
    projectName,
    date,
    dynamicInput,
    projectImages,
    projectComment,
    jobID,
    tabId,
    token,
    index
  ) =>
    dispatch(
      insertHarmFulForm(
        contractorName,
        projectName,
        date,
        dynamicInput,
        projectImages,
        projectComment,
        jobID,
        tabId,
        token,
        index
      )
    ),
  // updateHealthReport: (index) => dispatch(updateHealthReport(index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(HarmFulSubstance);
