import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Text } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { connect } from "react-redux";
import { insertWorkSheet } from "../../../Redux/action/auth/authActionTypes";
import SignatureComponent from "../../../components/SignatureComponent";
import { updateHealthReport } from "../../../Redux/action/summary/Summary";

var mainImage = require("../../../assets/authScreen/Accurate-daywork-sheet-docx.png");
var plus = require("../../../assets/authScreen/plus.png");
const AccurateDayWork = (props) => {
  const { navigation, token, isDayWork, isSuccessMsg } = props;
  // const jobID = Math.floor(Math.random() * 100) + 1;
  const jobID = isJobId;
  const tabId = props.route.params.tabName;
  const [dynamicLabourInput, setdynamicLabourInput] = useState([]);
  const [dynamicMaterialInput, setdynamicMaterialInput] = useState([]);
  const [dynamicPlantInput, setdynamicPlantInput] = useState([]);
  const [dynamicManagmentInput, setdynamicManagmentInput] = useState([]);
  const [date, setDate] = useState(new Date());
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
    let preData = [...dynamicPlantInput];
    preData[index][key] = value;
    setdynamicPlantInput(preData);
  };
  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(new Date(currentDate));
  };
  const showDatepicker = () => {
    setShow(true);
  };

  const workSheetInsert = async () => {
    try{
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
      tabId != ""
    ) {
      props.createWorkSheetHandler(
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
        date.toLocaleDateString(),
        jobID,
        tabId,
        token
      );
      props.updateHealthReport(props?.route?.params?.index);
      alert("Accurate Day Work Insert SuccessFully !")
      props.navigation.pop();
    } else {
      alert("Please Insert All Fields CareFully !");
      return false;
    }
  } catch(err){
    alert(err.message)
  }
  };
  return (
    <View style={styles.mainContainer}>
      <DateTimePickerModal
        isVisible={show}
        date={date ? date : new Date()}
        mode={"date"}
        is24Hour={true}
        display='default'
        onConfirm={(date) => onChange(date)}
        onCancel={() => setShow(false)}
        cancelTextIOS='Cancel'
        confirmTextIOS='Confirm'
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
            <ScrollView style={{ width: "100%", paddingLeft: 20, paddingRight: 20 }}>
              <View style={styles.formCodnatiner}>
                <View style={styles.inputFieldContainer}>
                  <TextInput value={mainContructor} onChangeText={(e) => setMainContructor(e)} style={styles.inputField} placeholder={"Main Contractor"} />
                </View>
                <View style={styles.inputFieldContainer}>
                  <TextInput value={contructorTitle} onChangeText={(e) => setContructorTitle(e)} style={styles.inputField} placeholder={"Contract Title"} />
                </View>
                <View style={styles.inputFieldContainer}>
                  <TextInput value={sheetNo} onChangeText={(e) => setSheetNo(e)} style={styles.inputField} placeholder={"Daywork sheet No"} />
                </View>
                <View style={styles.inputFieldContainer}>
                  <TextInput value={weekEnd} onChangeText={(e) => setWeekEnd(e)} style={styles.inputField} placeholder={"Week Ending (Sun)"} />
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
                  <TextInput onChangeText={(e) => setPlotNumber(e)} value={plotNumber} style={styles.inputField} placeholder={"Plot No"} />
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
                }}>
                <Text
                  style={{
                    fontFamily: "poppins-bold",
                    fontSize: 12,
                    paddingTop: 20,
                    paddingBottom: 20,
                  }}>
                  LABOUR{" "}
                </Text>
                <View style={styles.inputButtonBodyContainer}>
                  <TouchableOpacity style={styles.addBtn} onPress={() => addLabour()}>
                    <Image style={styles.plusBtn} source={plus} />
                  </TouchableOpacity>
                </View>
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
                            onChangeText={(txt) => updateLabourValue("name", index, txt)}
                            value={el.name}
                            style={styles.bodyTextInput}
                            placeholder={"Name"}
                          />
                        </View>
                        <View style={styles.inputWeekBodyContainer}>
                          <TextInput
                            onChangeText={(txt) => updateLabourValue("trade", index, txt)}
                            value={el.trade}
                            style={styles.bodyTextInput}
                            placeholder={"Trade"}
                          />
                        </View>
                        <View style={styles.inputWeekBodyContainer}>
                          <TextInput
                            onChangeText={(txt) => updateLabourValue("mon", index, txt)}
                            value={el.mon}
                            style={styles.bodyTextInput}
                            placeholder={"Mon"}
                          />
                        </View>
                        <View style={styles.inputWeekBodyContainer}>
                          <TextInput
                            onChangeText={(txt) => updateLabourValue("tues", index, txt)}
                            value={el.tues}
                            style={styles.bodyTextInput}
                            placeholder={"Tues"}
                          />
                        </View>
                        <View style={styles.inputWeekBodyContainer}>
                          <TextInput
                            onChangeText={(txt) => updateLabourValue("wed", index, txt)}
                            value={el.wed}
                            style={styles.bodyTextInput}
                            placeholder={"Wed"}
                          />
                        </View>
                        <View style={styles.inputWeekBodyContainer}>
                          <TextInput
                            onChangeText={(txt) => updateLabourValue("thus", index, txt)}
                            value={el.thus}
                            style={styles.bodyTextInput}
                            placeholder={"Thus"}
                          />
                        </View>
                        <View style={styles.inputWeekBodyContainer}>
                          <TextInput
                            onChangeText={(txt) => updateLabourValue("fri", index, txt)}
                            value={el.fri}
                            style={styles.bodyTextInput}
                            placeholder={"Fri"}
                          />
                        </View>
                        <View style={styles.inputWeekBodyContainer}>
                          <TextInput
                            onChangeText={(txt) => updateLabourValue("sat", index, txt)}
                            value={el.sat}
                            style={styles.bodyTextInput}
                            placeholder={"Sat"}
                          />
                        </View>
                        <View style={styles.inputWeekBodyContainer}>
                          <TextInput
                            onChangeText={(txt) => updateLabourValue("sun", index, txt)}
                            value={el.sun}
                            style={styles.bodyTextInput}
                            placeholder={"Sun"}
                          />
                        </View>
                        <View style={styles.inputWeekBodyContainer}>
                          <TextInput
                            onChangeText={(txt) => updateLabourValue("total", index, txt)}
                            value={el.total}
                            style={styles.bodyTextInput}
                            placeholder={"Total"}
                          />
                        </View>
                      </View>
                    ))}
                  <View style={styles.tableBody}>
                    <View style={styles.inputWeekBodyContainer}>
                      <TextInput
                        onChangeText={(txt) => setDataLabour({ ...dataLabour, name: txt })}
                        value={dataLabour.name}
                        style={styles.bodyTextInput}
                        placeholder={"Name"}
                      />
                    </View>
                    <View style={styles.inputWeekBodyContainer}>
                      <TextInput
                        onChangeText={(txt) => setDataLabour({ ...dataLabour, trade: txt })}
                        value={dataLabour.trade}
                        style={styles.bodyTextInput}
                        placeholder={"Trade"}
                      />
                    </View>
                    <View style={styles.inputWeekBodyContainer}>
                      <TextInput
                        onChangeText={(txt) => setDataLabour({ ...dataLabour, mon: txt })}
                        value={dataLabour.mon}
                        style={styles.bodyTextInput}
                        placeholder={"Mon"}
                      />
                    </View>
                    <View style={styles.inputWeekBodyContainer}>
                      <TextInput
                        onChangeText={(txt) => setDataLabour({ ...dataLabour, tues: txt })}
                        value={dataLabour.tues}
                        style={styles.bodyTextInput}
                        placeholder={"Tues"}
                      />
                    </View>
                    <View style={styles.inputWeekBodyContainer}>
                      <TextInput
                        onChangeText={(txt) => setDataLabour({ ...dataLabour, wed: txt })}
                        value={dataLabour.wed}
                        style={styles.bodyTextInput}
                        placeholder={"Wed"}
                      />
                    </View>
                    <View style={styles.inputWeekBodyContainer}>
                      <TextInput
                        onChangeText={(txt) => setDataLabour({ ...dataLabour, thu: txt })}
                        value={dataLabour.thu}
                        style={styles.bodyTextInput}
                        placeholder={"Thus"}
                      />
                    </View>
                    <View style={styles.inputWeekBodyContainer}>
                      <TextInput
                        onChangeText={(txt) => setDataLabour({ ...dataLabour, fri: txt })}
                        value={dataLabour.fri}
                        style={styles.bodyTextInput}
                        placeholder={"Fri"}
                      />
                    </View>
                    <View style={styles.inputWeekBodyContainer}>
                      <TextInput
                        onChangeText={(txt) => setDataLabour({ ...dataLabour, sat: txt })}
                        value={dataLabour.sat}
                        style={styles.bodyTextInput}
                        placeholder={"Sat"}
                      />
                    </View>
                    <View style={styles.inputWeekBodyContainer}>
                      <TextInput
                        onChangeText={(txt) => setDataLabour({ ...dataLabour, sun: txt })}
                        value={dataLabour.sun}
                        style={styles.bodyTextInput}
                        placeholder={"Sun"}
                      />
                    </View>
                    <View style={styles.inputWeekBodyContainer}>
                      <TextInput
                        onChangeText={(txt) => setDataLabour({ ...dataLabour, total: txt })}
                        value={dataLabour.total}
                        style={styles.bodyTextInput}
                        placeholder={"Total"}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <Text
                  style={{
                    fontFamily: "poppins-bold",
                    fontSize: 12,
                    paddingTop: 20,
                    paddingBottom: 20,
                  }}>
                  MATERIALS
                </Text>
                <View style={styles.inputButtonBodyContainer}>
                  <TouchableOpacity style={styles.addBtn} onPress={() => addMaterialRow()}>
                    <Image style={styles.plusBtn} source={plus} />
                  </TouchableOpacity>
                </View>
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
                            onChangeText={(txt) => updateMaterialValue("name", index, txt)}
                            value={el.name}
                            style={styles.bodyTextInput}
                            placeholder={"Name"}
                          />
                        </View>
                        <View style={styles.inputMaterialBodyContainer}>
                          <TextInput
                            onChangeText={(txt) => updateMaterialValue("quantity", index, txt)}
                            value={el.quantity}
                            style={styles.bodyTextInput}
                            placeholder={"Quantity"}
                          />
                        </View>
                        <View style={styles.inputMaterialBodyContainer}>
                          <TextInput
                            onChangeText={(txt) => updateMaterialValue("unit", index, txt)}
                            value={el.unit}
                            style={styles.bodyTextInput}
                            placeholder={"Unit"}
                          />
                        </View>
                      </View>
                    ))}
                  <View style={styles.tableBody}>
                    <View style={styles.inputMaterialBodyContainer}>
                      <TextInput
                        onChangeText={(txt) => setMaterialData({ ...materialData, description: txt })}
                        value={materialData.description}
                        style={styles.bodyTextInput}
                        placeholder={"Name"}
                      />
                    </View>
                    <View style={styles.inputMaterialBodyContainer}>
                      <TextInput
                        onChangeText={(txt) => setMaterialData({ ...materialData, quantity: txt })}
                        value={materialData.quantity}
                        style={styles.bodyTextInput}
                        placeholder={"Quantity"}
                      />
                    </View>
                    <View style={styles.inputMaterialBodyContainer}>
                      <TextInput
                        onChangeText={(txt) => setMaterialData({ ...materialData, unit: txt })}
                        value={materialData.unit}
                        style={styles.bodyTextInput}
                        placeholder={"Unit"}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <Text
                  style={{
                    fontFamily: "poppins-bold",
                    fontSize: 12,
                    paddingTop: 20,
                    paddingBottom: 20,
                  }}>
                  PLANTS AND OTHER ITEMS
                </Text>
                <View style={styles.inputButtonBodyContainer}>
                  <TouchableOpacity style={styles.addBtn} onPress={() => addPlantItem()}>
                    <Image style={styles.plusBtn} source={plus} />
                  </TouchableOpacity>
                </View>
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
                            onChangeText={(txt) => updatePlantValue("name", index, txt)}
                            value={el.name}
                            style={styles.bodyTextInput}
                            placeholder={"Name"}
                          />
                        </View>
                        <View style={styles.inputMaterialBodyContainer}>
                          <TextInput
                            onChangeText={(txt) => updatePlantValue("quantity", index, txt)}
                            value={el.quantity}
                            style={styles.bodyTextInput}
                            placeholder={"Quantity"}
                          />
                        </View>
                        <View style={styles.inputMaterialBodyContainer}>
                          <TextInput
                            onChangeText={(txt) => updatePlantValue("unit", index, txt)}
                            value={el.unit}
                            style={styles.bodyTextInput}
                            placeholder={"Unit"}
                          />
                        </View>
                      </View>
                    ))}
                  <View style={styles.tableBody}>
                    <View style={styles.inputMaterialBodyContainer}>
                      <TextInput
                        onChangeText={(txt) => setPlantData({ ...plantData, description: txt })}
                        value={plantData.description}
                        style={styles.bodyTextInput}
                        placeholder={"Name"}
                      />
                    </View>
                    <View style={styles.inputMaterialBodyContainer}>
                      <TextInput
                        onChangeText={(txt) => setPlantData({ ...plantData, quantity: txt })}
                        value={plantData.quantity}
                        style={styles.bodyTextInput}
                        placeholder={"Quantity"}
                      />
                    </View>
                    <View style={styles.inputMaterialBodyContainer}>
                      <TextInput
                        onChangeText={(txt) => setPlantData({ ...plantData, unit: txt })}
                        value={plantData.unit}
                        style={styles.bodyTextInput}
                        placeholder={"Unit"}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <Text
                  style={{
                    fontFamily: "poppins-bold",
                    fontSize: 12,
                    paddingTop: 20,
                    paddingBottom: 20,
                  }}>
                  PRELIMINARIES AND MANAGEMENT TIME
                </Text>
                <View style={styles.inputButtonBodyContainer}>
                  <TouchableOpacity style={styles.addBtn} onPress={() => addManagmentRow()}>
                    <Image style={styles.plusBtn} source={plus} />
                  </TouchableOpacity>
                </View>
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
                            onChangeText={(txt) => updateManagmentValue("name", index, txt)}
                            value={el.name}
                            style={styles.bodyTextInput}
                            placeholder={"Name"}
                          />
                        </View>
                        <View style={styles.inputMaterialBodyContainer}>
                          <TextInput
                            onChangeText={(txt) => updateManagmentValue("quantity", index, txt)}
                            value={el.quantity}
                            style={styles.bodyTextInput}
                            placeholder={"Quantity"}
                          />
                        </View>
                        <View style={styles.inputMaterialBodyContainer}>
                          <TextInput
                            onChangeText={(txt) => updateManagmentValue("unit", index, txt)}
                            value={el.unit}
                            style={styles.bodyTextInput}
                            placeholder={"Unit"}
                          />
                        </View>
                      </View>
                    ))}
                  <View style={styles.tableBody}>
                    <View style={styles.inputMaterialBodyContainer}>
                      <TextInput
                        onChangeText={(txt) => setManagmentData({ ...managmentData, description: txt })}
                        value={managmentData.description}
                        style={styles.bodyTextInput}
                        placeholder={"Name"}
                      />
                    </View>
                    <View style={styles.inputMaterialBodyContainer}>
                      <TextInput
                        onChangeText={(txt) => setManagmentData({ ...managmentData, quantity: txt })}
                        value={managmentData.quantity}
                        style={styles.bodyTextInput}
                        placeholder={"Quantity"}
                      />
                    </View>
                    <View style={styles.inputMaterialBodyContainer}>
                      <TextInput
                        onChangeText={(txt) => setManagmentData({ ...managmentData, unit: txt })}
                        value={managmentData.unit}
                        style={styles.bodyTextInput}
                        placeholder={"Unit"}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "poppins-bold",
                    fontSize: 12,
                    paddingTop: 20,
                  }}>
                  I/We certify that this is a true record of the works carried out and the materials used to undertake the work.
                </Text>
              </View>
              <View>
                <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>Instructed under the above site instruction issued.</Text>
              </View>
              <View style={styles.inputBodyContainer}>
                <TextInput value={managerName} onChangeText={(e) => setManagerName(e)} style={styles.bodyTextInput} placeholder={"Managers Name"} />
              </View>
              <View style={styles.inputBodyContainer}>
                <TextInput value={position} onChangeText={(e) => setPosition(e)} style={styles.bodyTextInput} placeholder={"Position"} />
              </View>
              <View style={styles.inputBodyContainer}>
                <TouchableOpacity onPress={() => setGetSign(true)} style={styles.inputFieldContainer}>
                  {managerSignature ? (
                    <Image style={{ marginTop: 20, height: 100, width: 100, backgroundColor: "gray" }} source={{ uri: managerSignature }} />
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
                  }}>
                  {new Date(date).toLocaleDateString()}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 10,
                }}>
                <Text
                  style={{
                    fontFamily: "poppins-bold",
                    fontSize: 8,
                    textAlign: "center",
                  }}>
                  Please ensure a copy of this sheet is returned to Top Dec office for processing. Payments will not be made without this sheet{" "}
                </Text>
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
                <TouchableOpacity style={styles.commonBtn} onPress={() => workSheetInsert()}>
                  <Text style={styles.commonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
  isDayWork: state.auth.isDayWork,
  isSuccessMsg: state.auth.isSuccessMsg,
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
    jobID,
    tabId,
    token
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
        jobID,
        tabId,
        token
      )
    ),
  updateHealthReport: (index) => dispatch(updateHealthReport(index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AccurateDayWork);
const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
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
