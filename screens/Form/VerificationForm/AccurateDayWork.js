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
import { connect } from "react-redux";
import { insertWorkSheet } from "../../../Redux/action/auth/authActionTypes";
import SignatureComponent from "../../../components/SignatureComponent";
import { updateVerificationReport } from "../../../Redux/action/summary/Summary";
import * as ImagePicker from "expo-image-picker";
import { AssetsSelector } from "expo-images-picker";

var mainImage = require("../../../assets/authScreen/Accurate-daywork-sheet-docx.png");
var plus = require("../../../assets/authScreen/plus.png");
const AccurateDayWork = (props) => {
  const { navigation, token, isDayWork, isSuccessMsg, isJobId } = props;
  // const jobID = Math.floor(Math.random() * 100) + 1;

  const { plot_id } = props.route.params;
  const jobID = plot_id;
  console.log("Work Plot ID :", jobID);
  const tabId = props.route.params.tabName;
  console.log("Work Tab ID :", tabId);
  const [dynamicLabourInput, setdynamicLabourInput] = useState([]);
  const [dynamicMaterialInput, setdynamicMaterialInput] = useState([]);
  const [dynamicPlantInput, setdynamicPlantInput] = useState([]);
  const [dynamicManagmentInput, setdynamicManagmentInput] = useState([]);
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [show, setShow] = useState(false);
  const [mainContructor, setMainContructor] = useState("");
  const [contructorTitle, setContructorTitle] = useState("");
  const [sheetNo, setSheetNo] = useState("");
  const [weekEnd, setWeekEnd] = useState("");
  const [siteInstructionNo, setSiteInstructionNo] = useState("");
  const [plotNumber, setPlotNumber] = useState("");
  const [descriptionWork, setDescriptionWork] = useState("");
  const [managerName, setManagerName] = useState("");
  const [managerSignature, setManagerSignature] = useState("");
  const [position, setPosition] = useState("");
  const [getSign, setGetSign] = useState(false);
  const [signature, setSignature] = useState({
    index: -1,
  });
  const [dataLabour, setDataLabour] = useState({
    name: "",
    trade: "",
    mon: "",
    tues: "",
    wed: "",
    thu: "",
    fri: "",
    sat: "",
    sun: "",
    total: "",
  });
  const [materialData, setMaterialData] = useState({
    description: "",
    quantity: "",
    unit: "",
  });
  const [plantData, setPlantData] = useState({
    description: "",
    quantity: "",
    unit: "",
  });
  const [managmentData, setManagmentData] = useState({
    description: "",
    quantity: "",
    unit: "",
  });
  const addLabour = () => {
    setdynamicLabourInput((oldArray) => [...oldArray, dataLabour]);
    setDataLabour({
      name: "",
      trade: "",
      mon: "",
      tues: "",
      wed: "",
      thu: "",
      fri: "",
      sat: "",
      sun: "",
      total: "",
    });
  };
  const addMaterialRow = () => {
    setdynamicMaterialInput((oldArray) => [...oldArray, materialData]);
    setMaterialData({ description: "", quantity: "", unit: "" });
  };
  const addPlantItem = () => {
    setdynamicPlantInput((oldArray) => [...oldArray, plantData]);
    setPlantData({ description: "", quantity: "", unit: "" });
  };
  const addManagmentRow = () => {
    setdynamicManagmentInput((oldArray) => [...oldArray, managmentData]);
    setManagmentData({ description: "", quantity: "", unit: "" });
  };
  const updateLabourValue = (key, index, value) => {
    let preData = [...dynamicLabourInput];
    preData[index][key] = value;
    setdynamicLabourInput(preData);
  };
  const updateMaterialValue = (key, index, value) => {
    let preData = [...dynamicMaterialInput];
    preData[index][key] = value;
    setdynamicMaterialInput(preData);
  };
  const updatePlantValue = (key, index, value) => {
    let preData = [...dynamicPlantInput];
    preData[index][key] = value;
    setdynamicPlantInput(preData);
  };
  const updateManagmentValue = (key, index, value) => {
    let preData = [...dynamicManagmentInput];
    preData[index][key] = value;
    setdynamicManagmentInput(preData);
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
  const workSheetInsert = async () => {
    try {
      if (
        mainContructor != "" &&
        contructorTitle != "" &&
        sheetNo != "" &&
        weekEnd != "" &&
        siteInstructionNo != "" &&
        plotNumber != "" &&
        descriptionWork != "" &&
        managerName != "" &&
        position != "" &&
        date &&
        jobID != "" &&
        tabId != "" &&
        projectImagesComment != "" &&
        commentImages != ""
      ) {
        await props.createWorkSheetHandler(
          mainContructor,
          contructorTitle,
          sheetNo,
          weekEnd,
          siteInstructionNo,
          plotNumber,
          descriptionWork,
          dynamicLabourInput,
          dynamicMaterialInput,
          dynamicPlantInput,
          dynamicManagmentInput,
          managerName,
          managerSignature,
          position,
          date,
          projectImagesComment,
          commentImages,
          jobID,
          tabId,
          token,
          props.route?.params?.index
        );
        //props.updateVerificationReport(props?.route?.params?.index);
        alert("Accurate Day Work Insert SuccessFully !");
        props.navigation.pop();
      } else {
        alert("Please Insert All Fields CareFully !");
        return false;
      }
    } catch (err) {
      alert(err.message);
    }
  };
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
    <View style={styles.mainContainer}>
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
            mode={"date"}
            display="default"
            onCancel={() => setShow(false)}
            onConfirm={onChange}
            format="DD-MM-YYYY"
          />
          {getSign ? (
            <SignatureComponent
              returnImage={(uri) => {
                setManagerSignature(uri);
                setGetSign(false);
              }}
            />
          ) : (
            <>
              <View style={styles.imageView}>
                <Image source={mainImage} style={styles.bannerImage} />
              </View>

              <View style={{ height: "75%", width: "100%" }}>
                <ScrollView
                  style={{ width: "100%", paddingLeft: 20, paddingRight: 20 }}
                >
                  <View style={styles.formCodnatiner}>
                    <View style={styles.inputFieldContainer}>
                      <TextInput
                        value={mainContructor}
                        onChangeText={(e) => setMainContructor(e)}
                        style={styles.inputField}
                        placeholder={"Main Contractor"}
                      />
                    </View>
                    <View style={styles.inputFieldContainer}>
                      <TextInput
                        value={contructorTitle}
                        onChangeText={(e) => setContructorTitle(e)}
                        style={styles.inputField}
                        placeholder={"Contract Title"}
                      />
                    </View>
                    <View style={styles.inputFieldContainer}>
                      <TextInput
                        value={sheetNo}
                        onChangeText={(e) => setSheetNo(e)}
                        style={styles.inputField}
                        placeholder={"Daywork sheet No"}
                      />
                    </View>
                    <View style={styles.inputFieldContainer}>
                      <TextInput
                        value={weekEnd}
                        onChangeText={(e) => setWeekEnd(e)}
                        style={styles.inputField}
                        placeholder={"Week Ending (Sun)"}
                      />
                    </View>
                    <View style={styles.inputFieldContainer}>
                      <TextInput
                        value={siteInstructionNo}
                        onChangeText={(e) => setSiteInstructionNo(e)}
                        style={styles.inputField}
                        placeholder={"Site Instruction No"}
                      />
                    </View>
                    <View style={styles.inputFieldContainer}>
                      <TextInput
                        onChangeText={(e) => setPlotNumber(e)}
                        value={plotNumber}
                        style={styles.inputField}
                        placeholder={"Plot No"}
                      />
                    </View>
                    <View style={styles.inputFieldContainer}>
                      <TextInput
                        value={descriptionWork}
                        onChangeText={(e) => setDescriptionWork(e)}
                        multiline={true}
                        s
                        numberOfLines={4}
                        style={styles.inputField}
                        placeholder={"Description of Work"}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "poppins-bold",
                        fontSize: 12,
                        paddingTop: 20,
                        paddingBottom: 20,
                      }}
                    >
                      LABOUR{" "}
                    </Text>
                  </View>

                  <View style={styles.tableViewContainer}>
                    <View style={styles.tableHeader}>
                      <View style={styles.headerTitleView}>
                        <Text style={styles.headerTitle}>NAME</Text>
                      </View>
                      <View style={styles.headerTitleView}>
                        <Text style={styles.headerTitle}>Trade</Text>
                      </View>
                      <View style={styles.headerTitleView}>
                        <Text style={styles.headerTitle}>MON</Text>
                      </View>
                      <View style={styles.headerTitleView}>
                        <Text style={styles.headerTitle}>TUE</Text>
                      </View>
                      <View style={styles.headerTitleView}>
                        <Text style={styles.headerTitle}>WED</Text>
                      </View>
                      <View style={styles.headerTitleView}>
                        <Text style={styles.headerTitle}>THUS</Text>
                      </View>
                      <View style={styles.headerTitleView}>
                        <Text style={styles.headerTitle}>FRI</Text>
                      </View>
                      <View style={styles.headerTitleView}>
                        <Text style={styles.headerTitle}>SAT</Text>
                      </View>
                      <View style={styles.headerTitleView}>
                        <Text style={styles.headerTitle}>SUN</Text>
                      </View>
                      <View style={styles.headerTitleView}>
                        <Text style={styles.headerTitle}>TOAL</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "column" }}>
                      {dynamicLabourInput.length > 0 &&
                        dynamicLabourInput.map((el, index) => (
                          <View style={styles.tableBody} key={index}>
                            <View style={styles.inputWeekBodyContainer}>
                              <TextInput
                                onChangeText={(txt) =>
                                  updateLabourValue("name", index, txt)
                                }
                                value={el.name}
                                style={styles.bodyTextInput}
                                placeholder={"Name"}
                              />
                            </View>
                            <View style={styles.inputWeekBodyContainer}>
                              <TextInput
                                onChangeText={(txt) =>
                                  updateLabourValue("trade", index, txt)
                                }
                                value={el.trade}
                                style={styles.bodyTextInput}
                                placeholder={"Trade"}
                              />
                            </View>
                            <View style={styles.inputWeekBodyContainer}>
                              <TextInput
                                onChangeText={(txt) =>
                                  updateLabourValue("mon", index, txt)
                                }
                                value={el.mon}
                                style={styles.bodyTextInput}
                                placeholder={"Mon"}
                              />
                            </View>
                            <View style={styles.inputWeekBodyContainer}>
                              <TextInput
                                onChangeText={(txt) =>
                                  updateLabourValue("tues", index, txt)
                                }
                                value={el.tues}
                                style={styles.bodyTextInput}
                                placeholder={"Tues"}
                              />
                            </View>
                            <View style={styles.inputWeekBodyContainer}>
                              <TextInput
                                onChangeText={(txt) =>
                                  updateLabourValue("wed", index, txt)
                                }
                                value={el.wed}
                                style={styles.bodyTextInput}
                                placeholder={"Wed"}
                              />
                            </View>
                            <View style={styles.inputWeekBodyContainer}>
                              <TextInput
                                onChangeText={(txt) =>
                                  updateLabourValue("thus", index, txt)
                                }
                                value={el.thus}
                                style={styles.bodyTextInput}
                                placeholder={"Thus"}
                              />
                            </View>
                            <View style={styles.inputWeekBodyContainer}>
                              <TextInput
                                onChangeText={(txt) =>
                                  updateLabourValue("fri", index, txt)
                                }
                                value={el.fri}
                                style={styles.bodyTextInput}
                                placeholder={"Fri"}
                              />
                            </View>
                            <View style={styles.inputWeekBodyContainer}>
                              <TextInput
                                onChangeText={(txt) =>
                                  updateLabourValue("sat", index, txt)
                                }
                                value={el.sat}
                                style={styles.bodyTextInput}
                                placeholder={"Sat"}
                              />
                            </View>
                            <View style={styles.inputWeekBodyContainer}>
                              <TextInput
                                onChangeText={(txt) =>
                                  updateLabourValue("sun", index, txt)
                                }
                                value={el.sun}
                                style={styles.bodyTextInput}
                                placeholder={"Sun"}
                              />
                            </View>
                            <View style={styles.inputWeekBodyContainer}>
                              <TextInput
                                onChangeText={(txt) =>
                                  updateLabourValue("total", index, txt)
                                }
                                value={el.total}
                                style={styles.bodyTextInput}
                                placeholder={"Total"}
                              />
                            </View>
                          </View>
                        ))}
                    </View>
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
                      style={styles.addBtn}
                      onPress={() => {
                        if (
                          dynamicLabourInput.length > 0 &&
                          !dynamicLabourInput[dynamicLabourInput.length - 1]
                            .name &&
                          !dynamicLabourInput[dynamicLabourInput.length - 1]
                            .trade &&
                          !dynamicLabourInput[dynamicLabourInput.length - 1]
                            .mon &&
                          !dynamicLabourInput[dynamicLabourInput.length - 1]
                            .tues &&
                          !dynamicLabourInput[dynamicLabourInput.length - 1]
                            .wed &&
                          !dynamicLabourInput[dynamicLabourInput.length - 1]
                            .thus &&
                          !dynamicLabourInput[dynamicLabourInput.length - 1]
                            .fri &&
                          !dynamicLabourInput[dynamicLabourInput.length - 1]
                            .sat &&
                          !dynamicLabourInput[dynamicLabourInput.length - 1]
                            .sun &&
                          !dynamicLabourInput[dynamicLabourInput.length - 1]
                            .total
                        ) {
                          alert(
                            "Please Enter All Value and then move to next Item Add !"
                          );
                        } else {
                          addLabour();
                        }
                      }}
                    >
                      <Image style={styles.plusBtn} source={plus} />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "poppins-bold",
                        fontSize: 12,
                        paddingTop: 20,
                        paddingBottom: 20,
                      }}
                    >
                      MATERIALS
                    </Text>
                  </View>
                  <View style={styles.tableViewContainer}>
                    <View style={styles.tableHeader}>
                      <View style={styles.headerMaterialTitleView}>
                        <Text style={styles.headerTitle}>NAME</Text>
                      </View>
                      <View style={styles.headerMaterialTitleView}>
                        <Text style={styles.headerTitle}>QUANTITY</Text>
                      </View>
                      <View style={styles.headerMaterialTitleView}>
                        <Text style={styles.headerTitle}>UNIT</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "column" }}>
                      {dynamicMaterialInput.length > 0 &&
                        dynamicMaterialInput.map((el, index) => (
                          <View style={styles.tableBody} key={index}>
                            <View style={styles.inputMaterialBodyContainer}>
                              <TextInput
                                onChangeText={(txt) =>
                                  updateMaterialValue("name", index, txt)
                                }
                                value={el.name}
                                style={styles.bodyTextInput}
                                placeholder={"Name"}
                              />
                            </View>
                            <View style={styles.inputMaterialBodyContainer}>
                              <TextInput
                                onChangeText={(txt) =>
                                  updateMaterialValue("quantity", index, txt)
                                }
                                value={el.quantity}
                                style={styles.bodyTextInput}
                                placeholder={"Quantity"}
                              />
                            </View>
                            <View style={styles.inputMaterialBodyContainer}>
                              <TextInput
                                onChangeText={(txt) =>
                                  updateMaterialValue("unit", index, txt)
                                }
                                value={el.unit}
                                style={styles.bodyTextInput}
                                placeholder={"Unit"}
                              />
                            </View>
                          </View>
                        ))}
                    </View>
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
                      style={styles.addBtn}
                      onPress={() => {
                        if (
                          dynamicMaterialInput.length > 0 &&
                          !dynamicMaterialInput[dynamicMaterialInput.length - 1]
                            .name &&
                          !dynamicMaterialInput[dynamicMaterialInput.length - 1]
                            .quantity &&
                          !dynamicMaterialInput[dynamicMaterialInput.length - 1]
                            .unit
                        ) {
                          alert(
                            "Please Enter All Value and then move to next Item Add !"
                          );
                        } else {
                          addMaterialRow();
                        }
                      }}
                    >
                      <Image style={styles.plusBtn} source={plus} />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "poppins-bold",
                        fontSize: 12,
                        paddingTop: 20,
                        paddingBottom: 20,
                      }}
                    >
                      PLANTS AND OTHER ITEMS
                    </Text>
                  </View>
                  <View style={styles.tableViewContainer}>
                    <View style={styles.tableHeader}>
                      <View style={styles.headerMaterialTitleView}>
                        <Text style={styles.headerTitle}>NAME</Text>
                      </View>
                      <View style={styles.headerMaterialTitleView}>
                        <Text style={styles.headerTitle}>QUANTITY</Text>
                      </View>
                      <View style={styles.headerMaterialTitleView}>
                        <Text style={styles.headerTitle}>UNIT</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "column" }}>
                      {dynamicPlantInput.length > 0 &&
                        dynamicPlantInput.map((el, index) => (
                          <View style={styles.tableBody} key={index}>
                            <View style={styles.inputMaterialBodyContainer}>
                              <TextInput
                                onChangeText={(txt) =>
                                  updatePlantValue("name", index, txt)
                                }
                                value={el.name}
                                style={styles.bodyTextInput}
                                placeholder={"Name"}
                              />
                            </View>
                            <View style={styles.inputMaterialBodyContainer}>
                              <TextInput
                                onChangeText={(txt) =>
                                  updatePlantValue("quantity", index, txt)
                                }
                                value={el.quantity}
                                style={styles.bodyTextInput}
                                placeholder={"Quantity"}
                              />
                            </View>
                            <View style={styles.inputMaterialBodyContainer}>
                              <TextInput
                                onChangeText={(txt) =>
                                  updatePlantValue("unit", index, txt)
                                }
                                value={el.unit}
                                style={styles.bodyTextInput}
                                placeholder={"Unit"}
                              />
                            </View>
                          </View>
                        ))}
                    </View>
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
                      style={styles.addBtn}
                      onPress={() => {
                        if (
                          dynamicPlantInput.length > 0 &&
                          !dynamicPlantInput[dynamicPlantInput.length - 1]
                            .name &&
                          !dynamicPlantInput[dynamicPlantInput.length - 1]
                            .quantity &&
                          !dynamicPlantInput[dynamicPlantInput.length - 1].unit
                        ) {
                          alert(
                            "Please Enter All Value and then move to next Item Add !"
                          );
                        } else {
                          addPlantItem();
                        }
                      }}
                    >
                      <Image style={styles.plusBtn} source={plus} />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "poppins-bold",
                        fontSize: 12,
                        paddingTop: 20,
                        paddingBottom: 20,
                      }}
                    >
                      PRELIMINARIES AND MANAGEMENT TIME
                    </Text>
                  </View>
                  <View style={styles.tableViewContainer}>
                    <View style={styles.tableHeader}>
                      <View style={styles.headerMaterialTitleView}>
                        <Text style={styles.headerTitle}>NAME</Text>
                      </View>
                      <View style={styles.headerMaterialTitleView}>
                        <Text style={styles.headerTitle}>QUANTITY</Text>
                      </View>
                      <View style={styles.headerMaterialTitleView}>
                        <Text style={styles.headerTitle}>UNIT</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "column" }}>
                      {dynamicManagmentInput.length > 0 &&
                        dynamicManagmentInput.map((el, index) => (
                          <View style={styles.tableBody} key={index}>
                            <View style={styles.inputMaterialBodyContainer}>
                              <TextInput
                                onChangeText={(txt) =>
                                  updateManagmentValue("name", index, txt)
                                }
                                value={el.name}
                                style={styles.bodyTextInput}
                                placeholder={"Name"}
                              />
                            </View>
                            <View style={styles.inputMaterialBodyContainer}>
                              <TextInput
                                onChangeText={(txt) =>
                                  updateManagmentValue("quantity", index, txt)
                                }
                                value={el.quantity}
                                style={styles.bodyTextInput}
                                placeholder={"Quantity"}
                              />
                            </View>
                            <View style={styles.inputMaterialBodyContainer}>
                              <TextInput
                                onChangeText={(txt) =>
                                  updateManagmentValue("unit", index, txt)
                                }
                                value={el.unit}
                                style={styles.bodyTextInput}
                                placeholder={"Unit"}
                              />
                            </View>
                          </View>
                        ))}
                    </View>
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
                      style={styles.addBtn}
                      onPress={() => {
                        if (
                          dynamicManagmentInput.length > 0 &&
                          !dynamicManagmentInput[
                            dynamicManagmentInput.length - 1
                          ].name &&
                          !dynamicManagmentInput[
                            dynamicManagmentInput.length - 1
                          ].quantity &&
                          !dynamicManagmentInput[
                            dynamicManagmentInput.length - 1
                          ].unit
                        ) {
                          alert(
                            "Please Enter All Value and then move to next Item Add !"
                          );
                        } else {
                          addManagmentRow();
                        }
                      }}
                    >
                      <Image style={styles.plusBtn} source={plus} />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontFamily: "poppins-bold",
                        fontSize: 12,
                        paddingTop: 20,
                      }}
                    >
                      I/We certify that this is a true record of the works
                      carried out and the materials used to undertake the work.
                    </Text>
                  </View>
                  <View>
                    <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                      Instructed under the above site instruction issued.
                    </Text>
                  </View>
                  <View style={styles.inputBodyContainer}>
                    <TextInput
                      value={managerName}
                      onChangeText={(e) => setManagerName(e)}
                      style={styles.bodyTextInput}
                      placeholder={"Managers Name"}
                    />
                  </View>
                  <View style={styles.inputBodyContainer}>
                    <TextInput
                      value={position}
                      onChangeText={(e) => setPosition(e)}
                      style={styles.bodyTextInput}
                      placeholder={"Position"}
                    />
                  </View>
                  <View style={styles.inputBodyContainer}>
                    <TouchableOpacity
                      onPress={() => setGetSign(true)}
                      style={styles.inputFieldContainer}
                    >
                      {managerSignature ? (
                        <Image
                          style={{
                            marginTop: 20,
                            height: 100,
                            width: 100,
                            backgroundColor: "gray",
                          }}
                          source={{ uri: managerSignature }}
                        />
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
                          }}
                        >
                          Signature
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                  <View style={styles.inputBodyContainer}>
                    <Text
                      onPress={() => showDatepicker()}
                      style={{
                        width: "100%",
                        height: 60,
                        width: "90%",
                        paddingTop: 17,
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
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "poppins-bold",
                        fontSize: 8,
                        textAlign: "center",
                      }}
                    >
                      Please ensure a copy of this sheet is returned to Top Dec
                      office for processing. Payments will not be made without
                      this sheet{" "}
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
                            !projectImagesComment[
                              projectImagesComment.length - 1
                            ].image &&
                            !projectImagesComment[
                              projectImagesComment.length - 1
                            ].comment
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
                                  <Text style={styles.textStyle}>
                                    Add Image
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            )}

                            <View style={{ width: "50%" }}>
                              <TextInput
                                value={el.comment}
                                onChangeText={(txt) =>
                                  updateProjectCommentValue(
                                    "comment",
                                    index,
                                    txt
                                  )
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
                      marginBottom: 20,
                      marginTop: 20,
                    }}
                  ></View>
                  <View style={styles.btnContainer}>
                    <TouchableOpacity
                      style={styles.commonBtn}
                      onPress={() => workSheetInsert()}
                    >
                      <Text style={styles.commonText}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </>
          )}
        </View>
      )}
    </View>
  );
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
  isDayWork: state.auth.isDayWork,
  isSuccessMsg: state.auth.isSuccessMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
  createWorkSheetHandler: (
    mainContructor,
    contructorTitle,
    sheetNo,
    weekEnd,
    siteInstructionNo,
    plotNumber,
    descriptionWork,
    dynamicLabourInput,
    dynamicMaterialInput,
    dynamicPlantInput,
    dynamicManagmentInput,
    managerName,
    managerSignature,
    position,
    date,
    projectImagesComment,
    commentImages,
    jobID,
    tabId,
    token,
    index
  ) =>
    dispatch(
      insertWorkSheet(
        mainContructor,
        contructorTitle,
        sheetNo,
        weekEnd,
        siteInstructionNo,
        plotNumber,
        descriptionWork,
        dynamicLabourInput,
        dynamicMaterialInput,
        dynamicPlantInput,
        dynamicManagmentInput,
        managerName,
        managerSignature,
        position,
        date,
        projectImagesComment,
        commentImages,
        jobID,
        tabId,
        token,
        index
      )
    ),
  // updateVerificationReport: (index) => dispatch(updateVerificationReport(index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AccurateDayWork);
const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
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
  imageView: {
    height: "25%",
    width: "100%",
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
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
  inputContainer: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  bannerImage: {
    height: "100%",
    width: "100%",
  },
  tableHeader: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
  },
  headerTitleView: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerMaterialTitleView: {
    width: "33.3%",
    paddingLeft: 5,
  },
  headerTitle: {
    fontSize: 8,
    fontFamily: "poppins-bold",
  },
  tableBody: {
    width: "100%",
    flexDirection: "row",
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
  bodyTextInput: {
    fontSize: 8,
  },
  inputBodyContainer: {
    width: "100%",
  },
  inputWeekBodyContainer: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputMaterialBodyContainer: {
    width: "33.3%",
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
  btnContainer: {
    width: "100%",
    height: "15%",
    marginBottom: 20,
  },
});
