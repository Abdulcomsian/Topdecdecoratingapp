import React, { useState } from "react";
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
import { connect } from "react-redux";
import { insertTbtInventory } from "../../../Redux/action/auth/authActionTypes";
import { updateHealthReport } from "../../../Redux/action/summary/Summary";

var mainImage = require("../../../assets/authScreen/Accurate-daywork-sheet-docx.png");

const TBTINVENTORY = (props) => {
  const { navigation, token, isOnSite, isSuccessMsg, isJobId } = props;
  // const jobID = Math.floor(Math.random() * 100) + 1;
  const { plot_Id } = props.route.params;
  const jobID = plot_Id;
  console.log("Work Plot ID :",jobID)
  const tabId = props.route.params.tabName;
  console.log("Work Tab ID :",tabId)
  const [getSign, setGetSign] = useState(false);
  const [inventoryArray, setInventoryArray] = useState([
    {
      title: "Hop Ups",
      equipment: "",
      date_1: new Date().toLocaleDateString(),
      tagged: "",
      stock: "",
      location: "",
      due_date: new Date().toLocaleDateString(),
      condition: "",
      needs: "",
      comment: "",
    },
    {
      title: "Step Ladders",
      equipment: "",
      date_1: new Date().toLocaleDateString(),
      tagged: "",
      stock: "",
      location: "",
      due_date: new Date().toLocaleDateString(),
      condition: "",
      needs: "",
      comment: "",
    },
    {
      title: "Ladders",
      equipment: "",
      date_1: new Date().toLocaleDateString(),
      tagged: "",
      stock: "",
      location: "",
      due_date: new Date().toLocaleDateString(),
      condition: "",
      needs: "",
      comment: "",
    },
    {
      title: "Staircase Podium",
      equipment: "",
      date_1: new Date().toLocaleDateString(),
      tagged: "",
      stock: "",
      location: "",
      due_date: new Date().toLocaleDateString(),
      condition: "",
      needs: "",
      comment: "",
    },
    {
      title: "Mobile Towers",
      equipment: "",
      date_1: new Date().toLocaleDateString(),
      tagged: "",
      stock: "",
      location: "",
      due_date: new Date().toLocaleDateString(),
      condition: "",
      needs: "",
      comment: "",
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
    copyArr[show.index].date_1 = currentDate.toLocaleDateString();
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
    ].due_date = currentDate.toLocaleDateString();
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

  const tbtInventoryFormInsert = async () => {
    
    try {
     
      if(mainContractor!="" && projectName!=""  && supervisorSignature!="" && dateSupervisor!="" && inventoryArray!="" ){
        await props.creatTbtInventoryHandler(mainContractor,projectName,supervisorSignature,dateSupervisor,inventoryArray,jobID,tabId,token,props.route.params?.index)
        // props.updateHealthReport(props?.route?.params?.index);
        props.navigation.pop();
        alert("TBT INVENTORY Insert SuccessFully !");
      }else{
        alert("Please Insert All Fields CareFully !");
      }
    } catch (err) {
      alert(err.message);
    }
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
                          {new Date(item.date_1).toLocaleDateString()}
                        </Text>
                      </View>
                      <View style={styles.inputInventoryBodyContainer}>
                        <TextInput
                          style={styles.bodyTextInput}
                          placeholder={"Tagged"}
                          onChangeText={(txt) =>
                            updateLabourValue("tagged", index, txt)
                          }
                          value={item.tagged}
                        />
                      </View>
                      <View style={styles.inputInventoryBodyContainer}>
                        <TextInput
                          style={styles.bodyTextInput}
                          placeholder={"Qty."}
                          onChangeText={(txt) =>
                            updateLabourValue("stock", index, txt)
                          }
                          value={item.stock}
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
                            item.due_date
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
                            updateLabourValue("needs", index, txt)
                          }
                          value={item.needs}
                        />
                      </View>
                      <View style={styles.inputInventoryBodyContainer}>
                        <TextInput
                          multiline={true}
                          numberOfLines={4}
                          style={styles.bodyTextInput}
                          placeholder={"Comments"}
                          onChangeText={(txt) =>
                            updateLabourValue("comment", index, txt)
                          }
                          value={item.comment}
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
  creatTbtInventoryHandler: (mainContractor,projectName,supervisorSignature,dateSupervisor,inventoryArray,jobID,tabId,token,index) =>
    dispatch(insertTbtInventory(mainContractor,projectName,supervisorSignature,dateSupervisor,inventoryArray,jobID,tabId,token,index)),
  // updateHealthReport: (index) => dispatch(updateHealthReport(index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TBTINVENTORY);
