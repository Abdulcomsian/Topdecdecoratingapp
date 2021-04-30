import React, { useState } from "react";
<<<<<<< HEAD
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { CheckBox, Text } from "native-base";
import styles from "../../../assets/css/styles";
import { color } from "react-native-reanimated";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SignatureComponent from "../../../components/SignatureComponent";

var mainImage = require("../../../assets/authScreen/Accurate-daywork-sheet-docx.png");

const TBTINVENTORY = () => {
  const [getSign, setGetSign] = useState(false);
  const [inventoryArray, setInventoryArray] = useState([
    {
      title: "Hop Ups",
      equipment: "",
      inspectionDate: new Date().toLocaleDateString(),
      labelled: "",
      quantityy: "",
      location: "",
      inspectionDueDate: new Date().toLocaleDateString(),
      condition: "",
      replaced: "",
      comments: "",
    },
    {
      title: "Step Ladders",
      equipment: "",
      inspectionDate: new Date().toLocaleDateString(),
      labelled: "",
      quantityy: "",
      location: "",
      inspectionDueDate: new Date().toLocaleDateString(),
      condition: "",
      replaced: "",
      comments: "",
    },
    {
      title: "Ladders",
      equipment: "",
      inspectionDate: new Date().toLocaleDateString(),
      labelled: "",
      quantityy: "",
      location: "",
      inspectionDueDate: new Date().toLocaleDateString(),
      condition: "",
      replaced: "",
      comments: "",
    },
    {
      title: "Staircase Podium",
      equipment: "",
      inspectionDate: new Date().toLocaleDateString(),
      labelled: "",
      quantityy: "",
      location: "",
      inspectionDueDate: new Date().toLocaleDateString(),
      condition: "",
      replaced: "",
      comments: "",
    },
    {
      title: "Mobile Towers",
      equipment: "",
      inspectionDate: new Date().toLocaleDateString(),
      labelled: "",
      quantityy: "",
      location: "",
      inspectionDueDate: new Date().toLocaleDateString(),
      condition: "",
      replaced: "",
      comments: "",
    },
  ]);

  const [date, setDate] = useState(new Date(1598051730000));
  const [dateActivity, setDateActivity] = useState(new Date(1598051730000));
  const [dateSupervisor, setDateSupervisor] = useState(
    new Date().toLocaleDateString()
  );
  const [showSupervisor, setSupervisorShow] = useState(false);
  const [supervisorSignature, setSupervisorSignature] = useState(false);
  const [mainContractor, setMainContractor] = useState("");
  const [projectName, setProjectName] = useState("");

  const [show, setShow] = useState({
    isVisible: false,
    index: -1,
  });
  const [showDueDate, setShowDueDate] = useState({
    isVisible: false,
    index: -1,
  });

  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow({ ...show, isVisible: false, index: -1 });
    let copyArr = [...inventoryArray];
    copyArr[show.index].inspectionDate = currentDate.toLocaleDateString();
    setInventoryArray(copyArr);
  };
  const showDatepicker = (index = -1) => {
    setShow({ ...show, isVisible: true, index: index });
  };
  const showInspectionDueDatepicker = (index = -1) => {
    setShowDueDate({ ...showDueDate, isVisible: true, index: index });
  };
  const onInspectionDueDateChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowDueDate({ ...showDueDate, isVisible: false, index: -1 });
    let copyArr = [...inventoryArray];
    copyArr[
      showDueDate.index
    ].inspectionDueDate = currentDate.toLocaleDateString();
    setInventoryArray(copyArr);
  };
  const onSupervisorDateChange = (selectedDate) => {
    const currentDate = selectedDate;
    setSupervisorShow(false);
    setDateSupervisor(new Date(currentDate).toLocaleDateString());
  };
  const showSupervisorDatepicker = () => {
    setSupervisorShow(true);
  };

  const tbtInventoryFormInsert = () => {
    console.log("Main Contractor :", mainContractor);
    console.log("Project Name :", projectName);
    console.log("Supervisor Sign :", supervisorSignature);
    console.log("Supervisor Date :", dateSupervisor);
    console.log("Array:", inventoryArray);
  };
  const updateLabourValue = (key, index, value) => {
    let preData = [...inventoryArray];
    preData[index][key] = value;
    setInventoryArray(preData);
  };
  return (
    <View style={styles.mainContainer}>
      <DateTimePickerModal
        isVisible={show.isVisible}
        date={date ? date : new Date()}
        mode={"date"}
        is24Hour={true}
        display="default"
        onConfirm={(date) => onChange(date)}
        onCancel={() => setShow({ isVisible: false, index: -1 })}
        cancelTextIOS="Cancel"
        confirmTextIOS="Confirm"
      />
      <DateTimePickerModal
        isVisible={showDueDate.isVisible}
        date={date ? date : new Date()}
        mode={"date"}
        is24Hour={true}
        display="default"
        onConfirm={(date) => onInspectionDueDateChange(date)}
        onCancel={() => setShowDueDate({ isVisible: false, index: -1 })}
        cancelTextIOS="Cancel"
        confirmTextIOS="Confirm"
      />
      <DateTimePickerModal
        isVisible={showSupervisor}
        testID="dateTimePicker"
        value={dateSupervisor}
        mode={"date"}
        display="default"
        onConfirm={onSupervisorDateChange}
        onCancel={() => setSupervisorShow(false)}
        format="DD-MM-YYYY"
      />
      {getSign ? (
        <SignatureComponent
          returnImage={(uri) => {
            setSupervisorSignature(uri);
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
            <Text style={styles.titleText}>
              Working at Height Equipment - Inventory Control
            </Text>
          </View>
          <ScrollView>
            <View style={{ paddingLeft: 20, paddingRight: 20 }}>
              <View style={styles.inputFieldContainer}>
                <TextInput
                  style={styles.inputField}
                  placeholder={"Main Contractor"}
                  value={mainContractor}
                  onChangeText={(e) => setMainContractor(e)}
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
                <TouchableOpacity
                  onPress={() => setGetSign(true)}
                  style={styles.inputFieldContainer}
                >
                  {supervisorSignature ? (
                    <Image
                      style={{
                        marginTop: 20,
                        height: 100,
                        width: 100,
                        backgroundColor: "gray",
                      }}
                      source={{ uri: supervisorSignature }}
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
                      Supervisor Print & Sign
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.inputFieldContainer}>
                <Text
                  onPress={() => showSupervisorDatepicker()}
                  style={[styles.inputField, { paddingTop: 15 }]}
                >
                  {new Date(dateSupervisor).toLocaleDateString()}
                </Text>
              </View>

              <View style={styles.tableViewContainer}>
                <View style={styles.tableHeader}>
                  <View style={styles.headerEquipmentTitleView}>
                    <Text style={styles.headerTitle}>Equipments</Text>
                  </View>
                  <View style={styles.headerEquipmentTitleView}>
                    <Text style={styles.headerTitle}>Inspection Date</Text>
                  </View>
                  <View style={styles.headerEquipmentTitleView}>
                    <Text style={styles.headerTitle}>Tagged/ Labelled</Text>
                  </View>
                  <View style={styles.headerEquipmentTitleView}>
                    <Text style={styles.headerTitle}>Qty. in Stock</Text>
                  </View>
                  <View style={styles.headerEquipmentTitleView}>
                    <Text style={styles.headerTitle}>Location</Text>
                  </View>
                  <View style={styles.headerEquipmentTitleView}>
                    <Text style={styles.headerTitle}>Inspection due date</Text>
                  </View>
                  <View style={styles.headerEquipmentTitleView}>
                    <Text style={styles.headerTitle}>In good condition</Text>
                  </View>
                  <View style={styles.headerEquipmentTitleView}>
                    <Text style={styles.headerTitle}>
                      Needs repair/replaced
                    </Text>
                  </View>
                  <View style={styles.headerEquipmentTitleView}>
                    <Text style={styles.headerTitle}>Comments</Text>
                  </View>
                </View>
                {inventoryArray.map((item, index) => (
                  <View key={index}>
                    <Text
                      style={{
                        fontFamily: "poppins-bold",
                        fontSize: 10,
                        paddingTop: 20,
                      }}
                    >
                      {item.title}
                    </Text>
                    <View style={styles.tableBody}>
                      <View style={styles.inputInventoryBodyContainer}>
                        <TextInput
                          style={styles.bodyTextInput}
                          placeholder={"Equ"}
                          onChangeText={(txt) =>
                            updateLabourValue("equipment", index, txt)
                          }
                          value={item.equipment}
                        />
                      </View>
                      <View style={styles.inputInventoryBodyContainer}>
                        <Text
                          onPress={() => showDatepicker(index)}
                          style={{
                            height: 39,
                            paddingTop: 16,
                            fontSize: 8,
                            color: "#96A8B2",
                            fontFamily: "poppins-regular",
                            borderBottomWidth: 1,
                            borderBottomColor: "#96A8B2",
                            marginRight: 5,
                            color: "#96A8B2",
                          }}
                        >
                          {new Date(item.inspectionDate).toLocaleDateString()}
                        </Text>
                      </View>
                      <View style={styles.inputInventoryBodyContainer}>
                        <TextInput
                          style={styles.bodyTextInput}
                          placeholder={"Tagged"}
                          onChangeText={(txt) =>
                            updateLabourValue("labelled", index, txt)
                          }
                          value={item.labelled}
                        />
                      </View>
                      <View style={styles.inputInventoryBodyContainer}>
                        <TextInput
                          style={styles.bodyTextInput}
                          placeholder={"Qty."}
                          onChangeText={(txt) =>
                            updateLabourValue("quantityy", index, txt)
                          }
                          value={item.quantityy}
                        />
                      </View>
                      <View style={styles.inputInventoryBodyContainer}>
                        <TextInput
                          style={styles.bodyTextInput}
                          placeholder={"Location"}
                          onChangeText={(txt) =>
                            updateLabourValue("location", index, txt)
                          }
                          value={item.location}
                        />
                      </View>
                      <View style={styles.inputInventoryBodyContainer}>
                        <Text
                          onPress={() => showInspectionDueDatepicker(index)}
                          style={{
                            height: 39,
                            paddingTop: 16,
                            fontSize: 8,
                            color: "#96A8B2",
                            fontFamily: "poppins-regular",
                            borderBottomWidth: 1,
                            borderBottomColor: "#96A8B2",
                            marginRight: 5,
                            color: "#96A8B2",
                          }}
                        >
                          {new Date(
                            item.inspectionDueDate
                          ).toLocaleDateString()}
                        </Text>
                      </View>
                      <View style={styles.inputInventoryBodyContainer}>
                        <TextInput
                          style={styles.bodyTextInput}
                          placeholder={"Condition"}
                          onChangeText={(txt) =>
                            updateLabourValue("condition", index, txt)
                          }
                          value={item.condition}
                        />
                      </View>
                      <View style={styles.inputInventoryBodyContainer}>
                        <TextInput
                          style={styles.bodyTextInput}
                          placeholder={"Replaced"}
                          onChangeText={(txt) =>
                            updateLabourValue("replaced", index, txt)
                          }
                          value={item.replaced}
                        />
                      </View>
                      <View style={styles.inputInventoryBodyContainer}>
                        <TextInput
                          multiline={true}
                          numberOfLines={4}
                          style={styles.bodyTextInput}
                          placeholder={"Comments"}
                          onChangeText={(txt) =>
                            updateLabourValue("comments", index, txt)
                          }
                          value={item.comments}
                        />
                      </View>
                    </View>
                  </View>
                ))}
              </View>
              <Text
                style={{
                  fontFamily: "poppins-bold",
                  fontSize: 10,
                  paddingTop: 20,
                  textAlign: "center",
                }}
              >
                Once completed, please file a copy in the Site Folder and send a
                copy to our Office. Also, please give a copy to the Site Staff.
              </Text>
              <View style={styles.footerView}>
                <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                  Address: 2,
                  <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}>
                    {" "}
                    Green Lane, Penge, London SE20 7JA
                  </Text>
                </Text>
                <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                  T:{" "}
                  <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}>
                    {" "}
                    0208 676 060
                  </Text>
                </Text>
                <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                  F:{" "}
                  <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}>
                    {" "}
                    0208 676 0671
                  </Text>
                </Text>
                <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                  M:{" "}
                  <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}>
                    {" "}
                    07737 632206
                  </Text>
                </Text>
                <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                  E:{" "}
                  <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}>
                    {" "}
                    info@topdecdecorating.com
                  </Text>
                </Text>
                <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                  W:{" "}
                  <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}>
                    {" "}
                    www.topdecdecorating.com
                  </Text>
                </Text>
                <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                  VAT Registration Number:{" "}
                  <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}>
                    {" "}
                    203 474 927
                  </Text>
                </Text>
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
                  onPress={() => tbtInventoryFormInsert()}
                >
                  <Text style={styles.commonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </>
      )}
=======
import { View, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { CheckBox, Text } from "native-base";
import styles from "../../../assets/css/styles";
import { color } from "react-native-reanimated";

var mainImage = require("../../../assets/authScreen/Accurate-daywork-sheet-docx.png");

const TBTINVENTORY = (props) => {
  const [inventoryArray, setInventoryArray] = useState([
    { title: "Hop Ups" },
    { title: "Step Ladders" },
    { title: "Ladders" },
    { title: "Staircase Podium" },
    { title: "Mobile Towers" },
  ]);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageView}>
        <Image source={mainImage} style={styles.bannerImage} />
      </View>
      <View style={{ paddingTop: 30, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.titleText}>Working at Height Equipment - Inventory Control</Text>
      </View>
      <ScrollView>
        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Main Contractor"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Project"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Supervisor Print & Sign"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Date"} />
          </View>

          <View style={styles.tableViewContainer}>
            <View style={styles.tableHeader}>
              <View style={styles.headerEquipmentTitleView}>
                <Text style={styles.headerTitle}>Equipments</Text>
              </View>
              <View style={styles.headerEquipmentTitleView}>
                <Text style={styles.headerTitle}>Inspection Date</Text>
              </View>
              <View style={styles.headerEquipmentTitleView}>
                <Text style={styles.headerTitle}>Tagged/ Labelled</Text>
              </View>
              <View style={styles.headerEquipmentTitleView}>
                <Text style={styles.headerTitle}>Qty. in Stock</Text>
              </View>
              <View style={styles.headerEquipmentTitleView}>
                <Text style={styles.headerTitle}>Location</Text>
              </View>
              <View style={styles.headerEquipmentTitleView}>
                <Text style={styles.headerTitle}>Inspection due date</Text>
              </View>
              <View style={styles.headerEquipmentTitleView}>
                <Text style={styles.headerTitle}>In good condition</Text>
              </View>
              <View style={styles.headerEquipmentTitleView}>
                <Text style={styles.headerTitle}>Needs repair/replaced</Text>
              </View>
              <View style={styles.headerEquipmentTitleView}>
                <Text style={styles.headerTitle}>Comments</Text>
              </View>
            </View>
            {inventoryArray.map((item, index) => (
              <View key={index}>
                <Text style={{ fontFamily: "poppins-bold", fontSize: 10, paddingTop: 20 }}>{item.title}</Text>
                <View style={styles.tableBody}>
                  <View style={styles.inputInventoryBodyContainer}>
                    <TextInput style={styles.bodyTextInput} placeholder={"Date"} />
                  </View>
                  <View style={styles.inputInventoryBodyContainer}>
                    <TextInput style={styles.bodyTextInput} placeholder={"Tagged"} />
                  </View>
                  <View style={styles.inputInventoryBodyContainer}>
                    <TextInput style={styles.bodyTextInput} placeholder={"Qty."} />
                  </View>
                  <View style={styles.inputInventoryBodyContainer}>
                    <TextInput style={styles.bodyTextInput} placeholder={"Location"} />
                  </View>
                  <View style={styles.inputInventoryBodyContainer}>
                    <TextInput style={styles.bodyTextInput} placeholder={"Due Date"} />
                  </View>
                  <View style={styles.inputInventoryBodyContainer}>
                    <TextInput style={styles.bodyTextInput} placeholder={"Condition"} />
                  </View>
                  <View style={styles.inputInventoryBodyContainer}>
                    <TextInput style={styles.bodyTextInput} placeholder={"Replaced"} />
                  </View>
                  <View style={styles.inputInventoryBodyContainer}>
                    <TextInput multiline={true} numberOfLines={4} style={styles.bodyTextInput} placeholder={"Comments"} />
                  </View>
                </View>
              </View>
            ))}
          </View>
          <Text style={{ fontFamily: "poppins-bold", fontSize: 10, paddingTop: 20, textAlign: "center" }}>
            Once completed, please file a copy in the Site Folder and send a copy to our Office. Also, please give a copy to the Site Staff.
          </Text>
          <View style={styles.footerView}>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
              Address: 2,<Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}> Green Lane, Penge, London SE20 7JA</Text>
            </Text>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
              T: <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}> 0208 676 060</Text>
            </Text>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
              F: <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}> 0208 676 0671</Text>
            </Text>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
              M: <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}> 07737 632206</Text>
            </Text>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
              E: <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}> info@topdecdecorating.com</Text>
            </Text>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
              W: <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}> www.topdecdecorating.com</Text>
            </Text>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
              VAT Registration Number: <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}> 203 474 927</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
>>>>>>> 8963071f89a3d01cc8c91cb986015da9fe50ddcf
    </View>
  );
};
export default TBTINVENTORY;
