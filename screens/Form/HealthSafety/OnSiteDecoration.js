import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Text } from "native-base";
import styles from "../../../assets/css/styles";
import SignatureComponent from "../../../components/SignatureComponent";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { connect } from "react-redux";
import { insertOnSiteDecorationForm } from "../../../Redux/action/auth/authActionTypes";
import { updateHealthReport } from "../../../Redux/action/summary/Summary";
import * as ImagePicker from "expo-image-picker";
import { AssetsSelector } from "expo-images-picker";

var mainImage = require("../../../assets/authScreen/Accurate-daywork-sheet-docx.png");
var plus = require("../../../assets/authScreen/plus.png");
const OnSiteDecoration = (props) => {
  const {
    navigation,
    token,
    isOnSite,
    isSuccessMsg,
    isJobId,
    isMethod,
  } = props;
  // const jobID = Math.floor(Math.random() * 100) + 1;
  const { plot_Id } = props.route.params;
  const jobID = plot_Id;
  console.log("Work Plot ID :",jobID)
  const tabId = props.route.params.tabName;
  console.log("Work Tab ID :",tabId)
  const [siteArray, setSiteArray] = useState([]);
  const [dynamicInput, setdynamicInput] = useState([]);
  const [contractorName, setContractorName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [onSiteSignature, setOnSiteSignature] = useState("");
  const [getSign, setGetSign] = useState(false);
  const addSiteArray = () => {
    setdynamicInput((oldArray) => [
      ...oldArray,
      {
        name: "",
        Card_no: "",
        date: new Date().toLocaleDateString(),
        signature: "",
      },
    ]);
  };
  const updateValue = (key, index, value) => {
    let preData = [...dynamicInput];
    preData[index][key] = value;
    setdynamicInput(preData);
  };
  const onSiteDecorationFormInsert = async () => {
    try {
      if (contractorName != "" && projectName != "" && dynamicInput != "" && onSiteSignature!="") {
        await props.createOnSiteDecorationHandler(
          contractorName,
          projectName,
          dynamicInput,
          onSiteSignature,
          jobID,
          tabId,
          token,
          props.route.params?.index
        );
        // props.updateHealthReport(props?.route?.params?.index);
        props.navigation.pop();
        alert("Ons Site Decoration Insert SuccessFully !");
      } else {
        alert("Please Insert All Fields CareFully !");
        return false;
      }
    } catch (err) {
      alert(err.message);
    }
  };
  const [signature, setSignature] = useState({
    bool: false,
    isSign: false,
    index: -1,
  });
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [show, setShow] = useState({
    isVisible: false,
    index: -1,
  });

  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow({ ...show, isVisible: false, index: -1 });
    let copyArr = [...dynamicInput];
    copyArr[show.index].date = currentDate.toLocaleDateString();
    setdynamicInput(copyArr);
  };

  const showDatepicker = (index = -1) => {
    setShow({ ...show, isVisible: true, index: index });
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
        <View style={{flex:1}}>
          <DateTimePickerModal
        isVisible={show.isVisible}
        testID='dateTimePicker'
        value={date}
        mode={"date"}
        display='default'
        onConfirm={onChange}
        onCancel={() => setShow({ isVisible: false, index: -1 })}
        format='DD-MM-YYYY'
      />
      {getSign ? (
        <SignatureComponent
          returnImage={(uri) => {
            setOnSiteSignature(uri);
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
            }}
          >
            <Text
              style={{
                fontFamily: "poppins-regular",
                fontSize: 12,
                textAlign: "center",
              }}
            >
              Names and CSCS card registration Nos. of painters to be used
              during the project painting{" "}
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
                <TextInput
                  style={styles.inputField}
                  placeholder={"Project"}
                  value={projectName}
                  onChangeText={(e) => setProjectName(e)}
                />
              </View>
              <View style={styles.tableViewContainer}>
                <View style={styles.tableHeader}>
                  <View style={styles.headerLadderListTitleView}>
                    <Text style={styles.headerTitle}>Name</Text>
                  </View>
                  <View style={styles.headerLadderListTitleView}>
                    <Text style={styles.headerTitle}>CSCS Card no</Text>
                  </View>
                  <View style={styles.headerLadderListTitleView}>
                    <Text style={styles.headerTitle}>
                      CSCS card expiry date
                    </Text>
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
                    onPress={() => addSiteArray()}
                  >
                    <Image style={styles.plusBtn} source={plus} />
                  </TouchableOpacity>
                </View>
                {dynamicInput.map((item, index) => (
                  <View style={styles.tableBody} key={index}>
                    <View style={styles.inputSiteBodyContainer}>
                      <TextInput
                        style={styles.bodyTextInput}
                        placeholder={"Name"}
                        value={item.name}
                        onChangeText={(txt) => updateValue("name", index, txt)}
                      />
                    </View>
                    <View style={styles.inputSiteBodyContainer}>
                      <TextInput
                        style={styles.bodyTextInput}
                        placeholder={"CSCS Card no"}
                        value={item.Card_no}
                        onChangeText={(txt) =>
                          updateValue("Card_no", index, txt)
                        }
                      />
                    </View>
                    <View style={styles.inputSiteBodyContainer}>
                      <Text
                        onPress={() => showDatepicker(index)}
                        style={{
                          width: "90%",
                          height: 39,
                          borderBottomWidth: 1,
                          borderBottomColor: "#96A8B2",
                          padding: 5,
                          fontSize: 8,
                          color: "#96A8B2",
                          fontFamily: "poppins-regular",
                          paddingTop: 12,
                          marginRight: 5,
                        }}
                      >
                        {new Date(item.date).toLocaleDateString()}
                      </Text>
                    </View>
                   
                  </View>
                ))}
                 <View style={[styles.inputSiteBodyContainer,{width:"100%"}]}>
                      <TouchableOpacity
                        onPress={() => setGetSign(true)} 
                        style={[
                          styles.inputHarmFullBodyContainer,
                          {
                            width: "100%",
                          },
                        ]}
                      >
                        {onSiteSignature ? (
                          <Image
                            source={{ uri: onSiteSignature }}
                            style={{
                              marginTop: 10,
                              height: 100,
                              width: 100,
                              backgroundColor: "gray",
                            }}
                          />
                        ) : (
                          <Text
                            style={{
                              width: "100%",
                              height: 39,
                              borderBottomWidth: 1,
                              borderBottomColor: "#96A8B2",
                              padding: 5,
                              fontSize: 8,
                              color: "#96A8B2",
                              fontFamily: "poppins-regular",
                              paddingTop: 12,
                              marginRight: 5,
                            }}
                          >
                            Supervisor Sign
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>
                <View style={styles.footerView}>
                  <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                    Address: 2,
                    <Text
                      style={{ fontFamily: "poppins-regular", fontSize: 10 }}
                    >
                      {" "}
                      Green Lane, Penge, London SE20 7JA
                    </Text>
                  </Text>
                  <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                    T:{" "}
                    <Text
                      style={{ fontFamily: "poppins-regular", fontSize: 10 }}
                    >
                      {" "}
                      0208 676 060
                    </Text>
                  </Text>
                  <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                    F:{" "}
                    <Text
                      style={{ fontFamily: "poppins-regular", fontSize: 10 }}
                    >
                      {" "}
                      0208 676 0671
                    </Text>
                  </Text>
                  <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                    M:{" "}
                    <Text
                      style={{ fontFamily: "poppins-regular", fontSize: 10 }}
                    >
                      {" "}
                      07737 632206
                    </Text>
                  </Text>
                  <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                    E:{" "}
                    <Text
                      style={{ fontFamily: "poppins-regular", fontSize: 10 }}
                    >
                      {" "}
                      info@topdecdecorating.com
                    </Text>
                  </Text>
                  <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                    W:{" "}
                    <Text
                      style={{ fontFamily: "poppins-regular", fontSize: 10 }}
                    >
                      {" "}
                      www.topdecdecorating.com
                    </Text>
                  </Text>
                  <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                    VAT Registration Number:{" "}
                    <Text
                      style={{ fontFamily: "poppins-regular", fontSize: 10 }}
                    >
                      {" "}
                      203 474 927
                    </Text>
                  </Text>
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
                  marginTop: 20,
                }}
              ></View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.commonBtn}
                  onPress={() => onSiteDecorationFormInsert()}
                >
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
  isOnSite: state.auth.isOnSite,
  isSuccessMsg: state.auth.isSuccessMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
  createOnSiteDecorationHandler: (
    contractorName,
    projectName,
    dynamicInput,
    onSiteSignature,
    jobID,
    tabId,
    token,
    index
  ) =>
    dispatch(
      insertOnSiteDecorationForm(
        contractorName,
        projectName,
        dynamicInput,
        onSiteSignature,
        jobID,
        tabId,
        token,
        index
      )
    ),
    // updateHealthReport: (index) => dispatch(updateHealthReport(index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(OnSiteDecoration);
