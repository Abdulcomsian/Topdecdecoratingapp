import React, { useState } from "react";
import { View, TextInput, ScrollView, TouchableOpacity, CheckBox, Image } from "react-native";
import { Text } from "native-base";
import styles from "../../../assets/css/styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SignatureComponent from "../../../components/SignatureComponent";
import { insertHouseKeepingForm } from "../../../Redux/action/auth/authActionTypes";
import { connect } from "react-redux";
import { updateHealthReport } from "../../../Redux/action/summary/Summary";
import * as ImagePicker from "expo-image-picker";
import { AssetsSelector } from "expo-images-picker";

const HouseKepping = (props) => {
  const { navigation, token, isSuccessMsg, isSuccess } = props;
  // const jobID = Math.floor(Math.random() * 100) + 1;
  const { plot_Id } = props.route.params;
  const jobID = plot_Id;
  console.log("Work Plot ID :",jobID)
  const tabId = props.route.params.tabName;
  console.log("Work Tab ID :",tabId)
  const [getSign, setGetSign] = useState(false);
  const [checkListArray, setCheckListArray] = useState([
    {
      item: "Are all empty paint container/s removed from the unit/s.",
      date: new Date().toLocaleDateString(),
      block: "",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
    {
      item: "Are all empty paint cans / leftovers collected from site by the paint supplier? ",
      date: new Date().toLocaleDateString(),
      block: "",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
    {
      item:
        "Are all protection, abrasives, masking tape and other sundries or general waste cleared away by the decorator and placed in the appropriate site bin. ",
      date: new Date().toLocaleDateString(),
      block: "",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
    {
      item: "Proper waste bins for general waste, recyclable waste, hazardous waste, are provided to facilitate responsible disposal.",
      date: new Date().toLocaleDateString(),
      block: "",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
    {
      item: "Are all working at height equipments i.e. hop ups, ladders, stepladders etc inspected and tagged.",
      date: new Date().toLocaleDateString(),
      block: "",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
    {
      item: "Are all working at height equipment packed away in a secure storage.",
      date: new Date().toLocaleDateString(),
      block: "",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
    {
      item: "Storage areas are clean, tidy and organised.",
      date: new Date().toLocaleDateString(),
      block: "",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
    {
      item: "Work area is clean, tidy, and clutter-free.",
      date: new Date().toLocaleDateString(),
      block: "",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
    {
      item: "There are no unnecessary items in the work area.",
      date: new Date().toLocaleDateString(),
      block: "",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
    {
      item: "Aisles, walkways, stairways, and exits are unobstructed.",
      date: new Date().toLocaleDateString(),
      block: "",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
    {
      item: "Floors are dry and free from accumulated dust, broken glass and leaks or spills (e.g., oil or water).",
      date: new Date().toLocaleDateString(),
      block: "",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
    {
      item: "Warning signs are in good condition and can be clearly seen from afar.",
      date: new Date().toLocaleDateString(),
      block: "",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
    {
      item: "Are all Electrical equipment PAT Tested and recorded.",
      date: new Date().toLocaleDateString(),
      block: "",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
    {
      item: "Task light are clean and provide adequate illumination for working.",
      date: new Date().toLocaleDateString(),
      block: "",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
    {
      item: "ES800 Paint wash out system installed and in good working manner.",
      date: new Date().toLocaleDateString(),
      block: "",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
    {
      item: "Have the decorator’s tools been checked to ensure they are in good working order i.e. brushers, rollers etc?",
      date: new Date().toLocaleDateString(),
      block: "",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
    {
      item: "Has adequate brush storage being provided i.e. Brush mate Trade storage boxes and brush mate fluid.",
      date: new Date().toLocaleDateString(),
      block: "",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
    {
      item: "Are all the material in the storage container labelled correctly and a COSHH datasheet available.",
      date: new Date().toLocaleDateString(),
      block: "",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
    {
      item: "Are all flammable materials placed in the Flamstore?",
      date: new Date().toLocaleDateString(),
      block: "",
      yes: false,
      no: false,
      other: false,
      comment: "",
    },
  ]);
  const [dateCheck, setDateCheck] = useState(new Date().toLocaleDateString());
  const [dateSupervisor, setDateSupervisor] = useState(new Date().toLocaleDateString());
  const [showSupervisor, setShowSupervisor] = useState(false);
  const [constructorName, setConstructorName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [weekCommencing, setWeekCommencing] = useState("");
  const [supervisorSign, setSupervisorSign] = useState("");
  const [show, setShow] = useState({
    isVisible: false,
    index: -1,
  });
  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow({ ...show, isVisible: false, index: -1 });
    let copyArr = [...checkListArray];
    copyArr[show.index].date = currentDate.toLocaleDateString();
    setCheckListArray(copyArr);
  };
  const showCheckDatepicker = (index = -1) => {
    setShow({ ...show, isVisible: true, index: index });
  };
  const onChangeDateSupervisor = (selectedDate) => {
    const currentDate = selectedDate;
    setShowSupervisor(false);
    setDateSupervisor(new Date(currentDate).toLocaleDateString());
  };
  const showSupervisorDatepicker = () => {
    setShowSupervisor(true);
  };
  const updateSignValue = (key, index, value) => {
    let preData = [...checkListArray];
    preData[index][key] = value;
    setCheckListArray(preData);
  };
  const checkedValue = (index, key) => {
    if (key == "yes") {
      let copyArray = [...checkListArray];
      copyArray[index][key] = true;
      copyArray[index]["no"] = false;
      copyArray[index]["other"] = false;
      setCheckListArray(copyArray);
    } else if (key == "no") {
      let copyArray = [...checkListArray];
      copyArray[index][key] = true;
      copyArray[index]["yes"] = false;
      copyArray[index]["other"] = false;
      setCheckListArray(copyArray);
    } else {
      let copyArray = [...checkListArray];
      copyArray[index][key] = true;
      copyArray[index]["no"] = false;
      copyArray[index]["yes"] = false;
      setCheckListArray(copyArray);
    }
  };
  const houseKeppingForm = async () => {
    // console.log("Main Contractor  :", constructorName);
    // console.log("Project Name :", projectName);
    // console.log("Week Commencing :", weekCommencing);
    // console.log("Check List Attay :", checkListArray);
    // console.log("Supervisor Sign :", supervisorSign);
    // console.log("Supervisor Date :", dateSupervisor.toLocaleDateString());
    // //   console.log("Job ID :", jobID);
    // //   console.log("Tab Name :", tabId);
    // console.log("Token :", token);
try{
    if (constructorName != "" && projectName != "" && weekCommencing != "" && checkListArray != "" && supervisorSign != "" && dateSupervisor != "") {
     await props.createHouseKeepingHandler(
        constructorName,
        projectName,
        weekCommencing,
        checkListArray,
        supervisorSign,
        dateSupervisor,
        jobID,
        tabId,
        token,
        props.route.params?.index
      );
      // props.updateHealthReport(props?.route?.params?.index);
      alert("Hose Keeping Insert SuccessFully !")
      props.navigation.pop();
    } else {
      alert("Please Insert All Fields CareFully !");
      return false;
    }
  } catch(err){
    alert(err.message)
  }
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
      {isShow ? 
      (
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
      ) : 
      (
        <View>
          <DateTimePickerModal
        isVisible={show.isVisible}
        testID='dateTimePicker'
        value={dateCheck}
        mode={"date"}
        display='default'
        onConfirm={onChange}
        onCancel={() => setShow({ isVisible: false, index: -1 })}
        format='DD-MM-YYYY'
      />
      <DateTimePickerModal
        isVisible={showSupervisor}
        testID='dateTimePicker'
        value={dateSupervisor}
        mode={"date"}
        display='default'
        onConfirm={onChangeDateSupervisor}
        onCancel={() => setShowSupervisor(false)}
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
          <View
            style={{
              paddingTop: 30,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text style={styles.titleText}>House Keeping Checklist</Text>
          </View>
          <ScrollView>
            <View style={styles.formCodnatiner}>
              <View style={styles.inputFieldContainer}>
                <TextInput style={styles.inputField} placeholder={"Main Contractor"} value={constructorName} onChangeText={(e) => setConstructorName(e)} />
              </View>
              <View style={styles.inputFieldContainer}>
                <TextInput value={projectName} onChangeText={(e) => setProjectName(e)} style={styles.inputField} placeholder={"Project"} />
              </View>
              <View style={styles.inputFieldContainer}>
                <TextInput style={styles.inputField} placeholder={"Week Commencing"} value={weekCommencing} onChangeText={(e) => setWeekCommencing(e)} />
              </View>
              <View style={styles.tableCheckListViewContainer}>
                <View style={styles.tableHeader}>
                  <View style={styles.headerCheckListTitleView}>
                    <Text style={styles.headerTitle}>ITEMS</Text>
                  </View>
                  <View style={styles.headerCheckListTitleView}>
                    <Text style={styles.headerTitle}>Block</Text>
                  </View>
                  <View style={styles.headerCheckListTitleView}>
                    <Text style={styles.headerTitle}>Yes</Text>
                  </View>
                  <View style={styles.headerCheckListTitleView}>
                    <Text style={styles.headerTitle}>No</Text>
                  </View>
                  <View style={styles.headerCheckListTitleView}>
                    <Text style={styles.headerTitle}>N/a</Text>
                  </View>
                  <View style={styles.headerCheckListTitleView}>
                    <Text style={styles.headerTitle}>Date/s of check</Text>
                  </View>
                  <View style={styles.headerCheckListTitleView}>
                    <Text style={styles.headerTitle}>Comments</Text>
                  </View>
                </View>
                <View>
                  {checkListArray.map((item, index) => (
                    <View key={index}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#000",
                          fontFamily: "poppins-regular",
                          padding: 5,
                        }}>
                        {item.item}
                      </Text>
                      <View style={styles.tableCheckListBody}>
                        <View style={styles.inputHarmFullBodyContainer}>
                          <TextInput
                            style={styles.bodyTextInput}
                            placeholder={"Block"}
                            value={item.block}
                            onChangeText={(txt) => updateSignValue("block", index, txt)}
                          />
                        </View>
                        <View style={styles.inputHarmFullBodyContainer}>
                          <CheckBox value={item.yes} onValueChange={() => checkedValue(index, "yes")} />
                        </View>
                        <View style={styles.inputHarmFullBodyContainer}>
                          <CheckBox value={item.no} onValueChange={() => checkedValue(index, "no")} />
                        </View>
                        <View style={styles.inputHarmFullBodyContainer}>
                          <CheckBox value={item.other} onValueChange={() => checkedValue(index, "other")} />
                        </View>
                        <View style={styles.inputHarmFullBodyContainer}>
                          <Text
                            onPress={() => showCheckDatepicker(index)}
                            style={{
                              height: 39,
                              width: "95%",
                              paddingTop: 13,
                              fontSize: 8,
                              color: "#96A8B2",
                              fontFamily: "poppins-regular",
                              borderBottomWidth: 1,
                              borderBottomColor: "#96A8B2",
                              padding: 5,
                              color: "#96A8B2",
                            }}>
                            {new Date(item.date).toLocaleDateString()}
                          </Text>
                        </View>
                        <View style={styles.inputHarmFullBodyContainer}>
                          <TextInput
                            style={styles.bodyTextInput}
                            placeholder={"Comments"}
                            value={item.comment}
                            onChangeText={(txt) => updateSignValue("comment", index, txt)}
                          />
                        </View>
                      </View>
                    </View>
                  ))}
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
                    onPress={() => showSupervisorDatepicker()}
                    style={{
                      width: "90%",
                      paddingTop: 17,
                      fontSize: 12,
                      color: "#96A8B2",
                      fontFamily: "poppins-regular",
                      borderBottomWidth: 1,
                      borderBottomColor: "#96A8B2",
                      padding: 5,
                      color: "#96A8B2",
                    }}>
                    {new Date(dateSupervisor).toLocaleDateString()}
                  </Text>
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
              <View
                style={{
                  backgroundColor: "#000",
                  width: "100%",
                  height: 2,
                  marginBottom: 20,
                  marginTop:20
                }}></View>
              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.commonBtn} onPress={() => houseKeppingForm()}>
                  <Text style={styles.commonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </>
      )}
        </View>
      )}
    </View>
  );
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
  isScope: state.auth.isScope,
  isSuccessMsg: state.auth.isSuccessMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
  createHouseKeepingHandler: (constructorName, projectName, weekCommencing, checkListArray, supervisorSign, dateSupervisor, jobID, tabId, token, index) =>
    dispatch(insertHouseKeepingForm(constructorName, projectName, weekCommencing, checkListArray, supervisorSign, dateSupervisor, jobID, tabId, token, index)),
  // updateHealthReport: (index) => dispatch(updateHealthReport(index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(HouseKepping);
