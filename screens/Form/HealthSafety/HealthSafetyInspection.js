import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  CheckBox,
} from "react-native";
import { Text } from "native-base";
import styles from "../../../assets/css/styles";
import InputCheckBox from "../../../components/common/inputCheckBox";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SignatureComponent from "../../../components/SignatureComponent";
import { set } from "react-native-reanimated";

var plus = require("../../../assets/authScreen/plus.png");
const HealthSafetyInspection = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [dateInspection, setDateInspection] = useState(new Date());
  const [showInspection, setShowInspection] = useState(false);
  const [dateComplete, setDateComplete] = useState(new Date());
  const [dateUpdateComplete, setDateUpdateComplete] = useState(new Date());
  const [inspectionRow, setInspectionRow] = useState([]);
  const [dynamicInput, setdynamicInput] = useState([
    {
      itemNo: "",
      location: "",
      actionReq: "",
      priority: "",
      actionBy: "",
      dateComplte: new Date().toLocaleDateString(),
    },
  ]);
  const [getSign, setGetSign] = useState(false);
  const [signature, setSignature] = useState("");
  const [showUpdateDateComplete, setShowUpdateDateComplete] = useState({
    isVisible: false,
    index: -1,
  });

  const addInspectionRow = () => {
    setdynamicInput((oldArray) => [
      ...oldArray,
      {
        itemNo: "",
        location: "",
        actionReq: "",
        priority: "",
        actionBy: "",
        dateComplte: new Date().toLocaleDateString(),
      },
    ]);
  };
  const [arrayDocument, setArrayDocument] = useState([
    {
      mainTitle: "Documentation",
      title: "All Risk Assessments & Method Statements up to date? ",
      yes: false,
      no: false,
      comment:""
    },
    {
      title:
        "All COSHH (Control of substances hazardous to Health) assessments available? ",
      yes: false,
      no: false,
      comment:""
    },
    {
      title: "All MSDS (Material Safety Datasheets) available? ",
      yes: false,
      no: false,
      comment:""
    },
    {
      title: "Permits to work required, has it been issued? ",
      yes: false,
      no: false,
      comment:""
    },
    { title: "Decorators read and sign the RAMS? ", yes: false, no: false },
    { title: "Toolbox Talk carried out? ", yes: false, no: false },
    {
      mainTitle: "General",
      title: "Appropriate safety signs in place? ",
      yes: false,
      no: false,
      comment:""
    },
    { title: "Working area isolated from others? ", yes: false, no: false },
    { title: "Barriers in place? ", yes: false, no: false },
    {
      mainTitle: "Personal Protective Equipment (PPE) ",
      title: "Standard PPE being worn? Boots, Hat, Hi Vis, Coverall ",
      yes: false,
      no: false,
      comment:""
    },
    { title: "Extras - goggles/ear defenders? ", yes: false, no: false },
    { title: "Decorators Face Fit Tested? ", yes: false, no: false },
    {
      mainTitle: "Tools / Equipment  ",
      title: "Have tools had a visual inspection? ",
      yes: false,
      no: false,
      comment:""
    },
    { title: "Are casings or leads damaged? ", yes: false, no: false },
    { title: "Have electrical tools been PAT tested? ", yes: false, no: false },
    {
      mainTitle: "Working at Height ",
      title: "Specific Risk Assessment carried out? ",
      yes: false,
      no: false,
      comment:""
    },
    { title: "Ladders/ steps checked and tagged? ", yes: false, no: false },
    {
      title: "Scaffold/ Mobile tower checked and tagged? ",
      yes: false,
      no: false,
      comment:""
    },
    {
      title: "MEWP (Mobile Elevated Work Platform) checked? ",
      yes: false,
      no: false,
      comment:""
    },
    { title: "PASMA/IPAF certificated personnel? ", yes: false, no: false },
    { title: "Means of access suitable? ", yes: false, no: false },
    {
      title: "Is edge protection needed, is it available? ",
      yes: false,
      no: false,
      comment:""
    },
    {
      mainTitle: "Exposure to dust/noise ",
      title: "Specific Risk Assessment carried out? ",
      yes: false,
      no: false,
      comment:""
    },
    {
      title: "Is dust suppression in place when rubbing down?",
      yes: false,
      no: false,
      comment:""
    },
    {
      title:
        "Is noise an issue to decorator/others, is it sufficiently controlled, are specific PPE worn? ",
      yes: false,
      no: false,
      comment:""
    },
    { title: "Are barriers needed/ used? ", yes: false, no: false },
    {
      mainTitle: "Waste Management ",
      title: "Are skips and containers clearly labelled? ",
      yes: false,
      no: false,
      comment:""
    },
    {
      title:
        "Are there provisions for Product supplier to collect unused product and empty containers?",
      yes: false,
      no: false,
      comment:""
    },
  ]);

  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(new Date(currentDate));
  };
  const showDatepicker = () => {
    setShow(true);
  };
  const onInspectionChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowInspection(false);
    setDateInspection(new Date(currentDate));
  };
  const showInspectionDatepicker = () => {
    setShowInspection(true);
  };
  const [showComplete, setShowComplete] = useState({
    isVisible: false,
    index: -1,
  });
  const showDateCompletepicker = (index = -1) => {
    setShowComplete({ ...showComplete, isVisible: true, index: index });
  };
  const onDateCompleteChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowComplete({ ...showComplete, isVisible: false, index: -1 });
    let copyArr = [...dynamicInput];
    copyArr[showComplete.index].dateComplte = currentDate;
    setdynamicInput(copyArr);
  };
  const [contractorName, setContractorName] = useState("");
  const [siteSupervisor, setSiteSupervisor] = useState("");
  const [projectAddress, setProjectAddress] = useState("");
  const [inspectionName, setInspectionName] = useState("");
  const [inspectionFor, setInspectionFor] = useState("");
  
  const checkArrayData = (key, index, value) => {
    let preData = [...arrayDocument];
    if (key == "yes") {
      preData[index][key] = true;
      preData[index]["no"] = false;
      setArrayDocument(preData);
    } else {
      preData[index][key] = true;
      preData[index]["yes"] = false;
      setArrayDocument(preData);
    }
  };
  const updateArrayValue = (key, index, value) => {
    let preData = [...arrayDocument];
    preData[index][key] = value;
    setArrayDocument(preData);
  };

  const healthSafetyFormInsert = () => {
    console.log("Contractor Name :", contractorName);
    console.log("Site Supervisor :", siteSupervisor);
    console.log("Date :", date.toLocaleDateString());
    console.log("Project Address :", projectAddress);
    console.log("Array:", dynamicInput);
    console.log("Inspection Name :", inspectionName);
    console.log("Inspection For :", inspectionFor);
    console.log("Inspection Date :", dateInspection.toLocaleDateString());
    console.log("Inspection Signature :", signature);
    console.log("Document Array :", arrayDocument);
  };
  const updateValue = (key, index, value) => {
    let preData = [...dynamicInput];
    preData[index][key] = value;
    setdynamicInput(preData);
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
      <DateTimePickerModal
        isVisible={showInspection}
        date={dateInspection ? dateInspection : new Date()}
        mode={"date"}
        is24Hour={true}
        display="default"
        onConfirm={(date) => onInspectionChange(date)}
        onCancel={() => setShowInspection(false)}
        cancelTextIOS="Cancel"
        confirmTextIOS="Confirm"
      />
      <DateTimePickerModal
        isVisible={showComplete.isVisible}
        date={dateComplete ? dateComplete : new Date()}
        mode={"date"}
        is24Hour={true}
        display="default"
        onConfirm={(date) => onDateCompleteChange(date)}
        onCancel={() => setShowComplete({ isVisible: false, index: -1 })}
        cancelTextIOS="Cancel"
        confirmTextIOS="Confirm"
      />
      <DateTimePickerModal
        isVisible={showUpdateDateComplete.isVisible}
        date={dateUpdateComplete ? dateUpdateComplete : new Date()}
        mode={"date"}
        is24Hour={true}
        display="default"
        onConfirm={(date) => onDateUpdateCompleteChange(date)}
        onCancel={() =>
          setShowUpdateDateComplete({ isVisible: false, index: -1 })
        }
        cancelTextIOS="Cancel"
        confirmTextIOS="Confirm"
      />
      {getSign ? (
        <SignatureComponent
          returnImage={(uri) => {
            setSignature(uri);
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
            }}
          >
            <Text style={styles.titleText}>
              Health Safety Inspection / Monitoring Form{" "}
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
                  placeholder={"Site Supervisor"}
                  value={siteSupervisor}
                  onChangeText={(e) => setSiteSupervisor(e)}
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
              <View style={styles.inputFieldContainer}>
                <TextInput
                  style={styles.inputField}
                  placeholder={"Project Address"}
                  value={projectAddress}
                  onChangeText={(e) => setProjectAddress(e)}
                />
              </View>
              <View style={[styles.tableViewContainer, { marginTop: 10 }]}>
                <View style={styles.tableHeader}>
                  <View style={styles.headerHarmFulTitleView}>
                    <Text style={styles.headerTitle}>Item No.</Text>
                  </View>
                  <View style={styles.headerHarmFulTitleView}>
                    <Text style={styles.headerTitle}>Location/Issue</Text>
                  </View>
                  <View style={styles.headerHarmFulTitleView}>
                    <Text style={styles.headerTitle}>Action required</Text>
                  </View>
                  <View style={styles.headerHarmFulTitleView}>
                    <Text style={styles.headerTitle}>Priority</Text>
                  </View>
                  <View style={styles.headerHarmFulTitleView}>
                    <Text style={styles.headerTitle}>Action by</Text>
                  </View>
                  <View style={styles.headerHarmFulTitleView}>
                    <Text style={styles.headerTitle}>Date completed</Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: "flex-end",
                    width: "100%",
                    alignItems: "flex-end",
                    marginBottom: 10,
                  }}
                ></View>
                <View style={{ flexDirection: "column" }}>
                  {dynamicInput.length > 0 &&
                    dynamicInput.map((item, index) => (
                      <View style={styles.tableBody} key={index}>
                        <View style={styles.inputHarmFullBodyContainer}>
                          <TextInput
                            style={styles.bodyTextInput}
                            placeholder={"Item No"}
                            onChangeText={(txt) =>
                              updateValue("itemNo", index, txt)
                            }
                            value={item.itemNo}
                          />
                        </View>
                        <View style={styles.inputHarmFullBodyContainer}>
                          <TextInput
                            style={styles.bodyTextInput}
                            placeholder={"Location"}
                            onChangeText={(txt) =>
                              updateValue("location", index, txt)
                            }
                            value={item.location}
                          />
                        </View>
                        <View style={styles.inputHarmFullBodyContainer}>
                          <TextInput
                            style={styles.bodyTextInput}
                            placeholder={"Action required"}
                            onChangeText={(txt) =>
                              updateValue("actionReq", index, txt)
                            }
                            value={item.actionReq}
                          />
                        </View>
                        <View style={styles.inputHarmFullBodyContainer}>
                          <TextInput
                            style={styles.bodyTextInput}
                            placeholder={"Priority"}
                            onChangeText={(txt) =>
                              updateValue("priority", index, txt)
                            }
                            value={item.priority}
                          />
                        </View>
                        <View style={styles.inputHarmFullBodyContainer}>
                          <TextInput
                            style={styles.bodyTextInput}
                            placeholder={"Action by"}
                            onChangeText={(txt) =>
                              updateValue("actionBy", index, txt)
                            }
                            value={item.actionBy}
                          />
                        </View>
                        <View style={styles.inputHarmFullBodyContainer}>
                          <Text
                            onPress={() => showDateCompletepicker(index)}
                            style={{
                              width: "100%",
                              paddingTop: 18,
                              fontSize: 8,
                              color: "#96A8B2",
                              fontFamily: "poppins-regular",
                              borderBottomWidth: 1,
                              borderBottomColor: "#96A8B2",
                              padding: 5,
                              color: "#96A8B2",
                            }}
                          >
                            {new Date(item.dateComplte).toLocaleDateString()}
                          </Text>
                        </View>
                      </View>
                    ))}
                </View>
                <View
                  style={[
                    styles.inputBodyContainer,
                    {
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                      width: "100%",
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => addInspectionRow()}
                  >
                    <Image style={styles.plusBtn} source={plus} />
                  </TouchableOpacity>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "poppins-bold",
                  paddingTop: 10,
                  paddingBottom: 20,
                }}
              >
                Inspection carried out by:{" "}
              </Text>
              <View style={styles.inputFieldContainer}>
                <TextInput
                  style={styles.inputField}
                  placeholder={"Name"}
                  value={inspectionName}
                  onChangeText={(e) => setInspectionName(e)}
                />
              </View>
              <View style={styles.inputFieldContainer}>
                <TextInput
                  style={styles.inputField}
                  placeholder={"For"}
                  value={inspectionFor}
                  onChangeText={(e) => setInspectionFor(e)}
                />
              </View>
              <View style={styles.inputFieldContainer}>
                <Text
                  onPress={() => showInspectionDatepicker()}
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
                  {new Date(dateInspection).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.inputFieldContainer}>
                <TouchableOpacity
                  onPress={() => setGetSign(true)}
                  style={styles.inputFieldContainer}
                >
                  {signature ? (
                    <Image
                      style={{
                        marginTop: 20,
                        height: 100,
                        width: 100,
                        backgroundColor: "gray",
                      }}
                      source={{ uri: signature }}
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
              <Text style={{ fontSize: 12, fontFamily: "poppins-bold" }}>
                Priority Key
              </Text>
              <Text style={{ fontSize: 12, fontFamily: "poppins-bold" }}>
                A{" "}
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: "poppins-regular",
                    paddingLeft: 20,
                  }}
                >
                  Immediate
                </Text>
              </Text>
              <Text style={{ fontSize: 12, fontFamily: "poppins-bold" }}>
                B{" "}
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: "poppins-regular",
                    paddingLeft: 20,
                  }}
                >
                  One / Two Day
                </Text>
              </Text>
              <Text style={{ fontSize: 12, fontFamily: "poppins-bold" }}>
                C{" "}
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: "poppins-regular",
                    paddingLeft: 20,
                  }}
                >
                  One Week
                </Text>
              </Text>
              <Text style={{ fontSize: 12, fontFamily: "poppins-bold" }}>
                R{" "}
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: "poppins-regular",
                    paddingLeft: 20,
                  }}
                >
                  Recommended
                </Text>
              </Text>
              {arrayDocument.map((item, index) =>
                item.mainTitle ? (
                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "poppins-bold",
                        paddingTop: 10,
                        paddingBottom: 20,
                      }}
                    >
                      {item.mainTitle}
                    </Text>
                    <View
                      style={styles.detailsInstructionContactView}
                      key={index}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <View style={styles.instructionFridayView}>
                          <Text
                            style={{ fontFamily: "poppins-bold", fontSize: 10 }}
                          >
                            {item.title}
                          </Text>
                        </View>
                        <View style={styles.checkBoxInstructionView}>
                          <View style={styles.firstInstructionCheckBoxRow}>
                            <View style={styles.parentCheckBox}>
                              <View style={styles.leftCheckBox}>
                                <CheckBox value={item.yes} onValueChange={() =>
                                  checkArrayData("yes", index, "true")
                                }/>
                              </View>
                              <View style={styles.rightCheckBox}>
                                <Text style={styles.accidentText}>Y/N</Text>
                              </View>
                            </View>
                            <View style={styles.parentCheckBox}>
                              <View style={styles.leftCheckBox}>
                                <CheckBox value={item.no} onValueChange={() =>
                                  checkArrayData("no", index, "true")
                                } />
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
                          onChangeText={(txt) =>
                            updateValue("comment", index, txt)
                          }
                          value={item.comment}
                        />
                      </View>
                    </View>
                  </View>
                ) : (
                  <View
                    style={styles.detailsInstructionContactView}
                    key={index}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <View style={styles.instructionFridayView}>
                        <Text
                          style={{ fontFamily: "poppins-bold", fontSize: 10 }}
                        >
                          {item.title}
                        </Text>
                      </View>
                      <View style={styles.checkBoxInstructionView}>
                        <View style={styles.firstInstructionCheckBoxRow}>
                          <View style={styles.parentCheckBox}>
                            <View style={styles.leftCheckBox}>
                              <CheckBox value={item.yes} value={item.yes} onValueChange={() =>
                                  checkArrayData("yes", index, "true")
                                } />
                            </View>
                            <View style={styles.rightCheckBox}>
                              <Text style={styles.accidentText}>Y/N</Text>
                            </View>
                          </View>
                          <View style={styles.parentCheckBox}>
                            <View style={styles.leftCheckBox}>
                              <CheckBox value={item.no} value={item.no} onValueChange={() =>
                                  checkArrayData("no", index, "true")
                                } />
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
                        onChangeText={(txt) =>
                          updateArrayValue("comment", index, txt)
                        }
                        value={item.comment}
                      />
                    </View>
                  </View>
                )
              )}
              {/* <Text
            style={{
              fontSize: 12,
              fontFamily: "poppins-bold",
              paddingTop: 10,
              paddingBottom: 20,
            }}
          >
            2. General
          </Text>
          <InputCheckBox data={generalRow} />
          <Text
            style={{
              fontSize: 12,
              fontFamily: "poppins-bold",
              paddingTop: 10,
              paddingBottom: 20,
            }}
          >
            3. Personal Protective Equipment (PPE)
          </Text>
          <InputCheckBox data={protectiveRow} />
          <Text
            style={{
              fontSize: 12,
              fontFamily: "poppins-bold",
              paddingTop: 10,
              paddingBottom: 20,
            }}
          >
            4. Tools / Equipment{" "}
          </Text>
          <InputCheckBox data={toolRow} />
          <Text
            style={{
              fontSize: 12,
              fontFamily: "poppins-bold",
              paddingTop: 10,
              paddingBottom: 20,
            }}
          >
            5. Working at Height
          </Text>
          <InputCheckBox data={workingRow} />
          <Text
            style={{
              fontSize: 12,
              fontFamily: "poppins-bold",
              paddingTop: 10,
              paddingBottom: 20,
            }}
          >
            6. Exposure to dust/noise
          </Text>
          <InputCheckBox data={exposureRow} />
          <Text
            style={{
              fontSize: 12,
              fontFamily: "poppins-bold",
              paddingTop: 10,
              paddingBottom: 20,
            }}
          >
            7. Waste Management
          </Text>
          <InputCheckBox data={wasteRow} />
          <Text
            style={{
              fontSize: 12,
              fontFamily: "poppins-bold",
              paddingTop: 10,
              paddingBottom: 20,
            }}
          >
            8. Any Issues not closed off from previous{" "}
          </Text>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Any Issues not closed off from previous"}
            />
          </View> */}
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
                  onPress={() => healthSafetyFormInsert()}
                >
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
export default HealthSafetyInspection;
