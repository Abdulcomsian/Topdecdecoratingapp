import React, { useState } from "react";
import { View, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Text } from "native-base";
import styles from "../../../assets/css/styles";
import DateTimePicker from "react-native-modal-datetime-picker";
import SignatureComponent from "../../../components/SignatureComponent";
import { insertElectricalEquipemntForm } from "../../../Redux/action/auth/authActionTypes";
import { connect } from "react-redux";

var plus = require("../../../assets/authScreen/plus.png");
const ElectricalEquipment = (props) => {
  const { navigation, token, isSuccess, isSuccessMsg, isJobId } = props;
  const jobID = Math.floor(Math.random() * 100) + 1;
  const tabId = props.route.params.tabName;
  const [equipmentRow, setEquipmentRow] = useState([]);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [showDate, setShowDate] = useState(false);
  const [contractorName, setContractorName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [dynamicInput, setdynamicInput] = useState([{    equipment: "",
  site_date: new Date().toLocaleDateString(),
  serial: "",
  local: "",
  owner_if_not_dec: "",
  last_test_date: new Date().toLocaleDateString(),
  next_date: new Date().toLocaleDateString(),
  offsite: new Date().toLocaleDateString(),
  comment: "",
}]);
  const [supervisorSignature, setSupervisorSignature] = useState("");
  const addEquipmentRegister = () => {
    setdynamicInput((oldArray) => [...oldArray, {    equ: "",
    onSiteDate: new Date().toLocaleDateString(),
    serial: "",
    local: "",
    owner: "",
    lastTestDate: new Date().toLocaleDateString(),
    testDueDate: new Date().toLocaleDateString(),
    dateOfSite: new Date().toLocaleDateString(),
    comments: "",
  }]);
  };
  const updateValue = (key, index, value) => {
    let preData = [...dynamicInput];
    preData[index][key] = value;
    setdynamicInput(preData);
  };
  const showMode = (currentMode) => {
    setShowDate(true);
    setMode(currentMode);
  };
  const showDatepicker = (type) => {
    showMode("date");
  };
  const onDateChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowDate(false);
    setDate(new Date(currentDate).toLocaleDateString());
  };
  const [showDateOnSite, setShowDateOnSite] = useState({
    isVisible: false,
    index: -1,
  });
  const [showLastTestDate, setShowLastTestDate] = useState({
    isVisible: false,
    index: -1,
  });
  const [showTestDueDate, setShowTestDueDate] = useState({
    isVisible: false,
    index: -1,
  });
  const [showDateOfSite, setShowDateOfSite] = useState({
    isVisible: false,
    index: -1,
  });

  const showOnSiteDatepicker = (index = -1) => {
    setShowDateOnSite({ ...showDateOnSite, isVisible: true, index: index });
  };
  const showLastTestDatepicker = (index = -1) => {
    setShowLastTestDate({ ...showLastTestDate, isVisible: true, index: index });
  };
  const showTestDueDatepicker = (index = -1) => {
    setShowTestDueDate({ ...showTestDueDate, isVisible: true, index: index });
  };
  const showOffDatepicker = (index = -1) => {
    setShowDateOfSite({ ...showDateOfSite, isVisible: true, index: index });
  };

  const [dateOnsite, setDateOnsite] = useState(new Date(1598051730000));
  const [lastTestDate, setLastTestDate] = useState(new Date(1598051730000));
  const [testDueDate, setTestDueDate] = useState(new Date(1598051730000));
  const [dateOffSite, setDateOffSite] = useState(new Date(1598051730000));


  const onDateOnSiteChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowDateOnSite({ ...showDateOnSite, isVisible: false, index: -1 });
    let copyArr = [...dynamicInput];
    copyArr[showDateOnSite.index].site_date = currentDate.toLocaleDateString();
    setdynamicInput(copyArr);
  };

  const onLastTestDateChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowLastTestDate({ ...showLastTestDate, isVisible: false, index: -1 });
    let copyArr = [...dynamicInput];
    copyArr[showLastTestDate.index].last_test_date = currentDate.toLocaleDateString();
    setdynamicInput(copyArr);
  };

  const onNextTestDateChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowTestDueDate({ ...showTestDueDate, isVisible: false, index: -1 });
    let copyArr = [...dynamicInput];
    copyArr[showTestDueDate.index].next_date = currentDate.toLocaleDateString();
    setdynamicInput(copyArr);
  };

  const onDateOfSiteChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowDateOfSite({ ...showDateOfSite, isVisible: false, index: -1 });
    let copyArr = [...dynamicInput];
    copyArr[showDateOfSite.index].offsite = currentDate.toLocaleDateString();
    setdynamicInput(copyArr);
  };
  const [getSign, setGetSign] = useState(false);


  const electricalEquipmentFormInsert = () => {
    
    if (contractorName != "" && projectName != "" && supervisorSignature != "" && date != "" && dynamicInput != "") {
      props.createElectricalEquipmentHandler(contractorName, projectName, supervisorSignature, date, dynamicInput, jobID, tabId, token, props.route.params?.index);
    } else {
      alert("Please Insert All Fields CareFully !");
      return false;
    }
  };
  
  useEffect(() => {
    if (isSuccess) {
      if (isSuccessMsg) {
        alert(isSuccessMsg);
        navigation.pop();
      }
    } else {
      if (isSuccessMsg) {
        alert(isSuccessMsg);
        return false;
      }
    }
  }, [isSuccess,isSuccessMsg]);
  return (
    <View style={styles.mainContainer}>
      
      <DateTimePicker
        isVisible={showDate}
        testID='dateTimePicker'
        value={date}
        mode={mode}
        display='default'
        onCancel={() => setShowDate(false)}
        onConfirm={onDateChange}
        format='DD-MM-YYYY'
      />
      <DateTimePicker
        isVisible={showDateOnSite.isVisible}
        date={dateOnsite ? dateOnsite : new Date()}
        mode={"date"}
        is24Hour={true}
        display="default"
        onConfirm={(date) => onDateOnSiteChange(date)}
        onCancel={() => setShowDateOnSite({ isVisible: false, index: -1 })}
        cancelTextIOS="Cancel"
        confirmTextIOS="Confirm"
      />
      <DateTimePicker
        isVisible={showLastTestDate.isVisible}
        date={lastTestDate ? lastTestDate : new Date()}
        mode={"date"}
        is24Hour={true}
        display="default"
        onConfirm={(date) => onLastTestDateChange(date)}
        onCancel={() => setShowLastTestDate({ isVisible: false, index: -1 })}
        cancelTextIOS="Cancel"
        confirmTextIOS="Confirm"
      />
       <DateTimePicker
        isVisible={showTestDueDate.isVisible}
        date={testDueDate ? testDueDate : new Date()}
        mode={"date"}
        is24Hour={true}
        display="default"
        onConfirm={(date) => onNextTestDateChange(date)}
        onCancel={() => setShowTestDueDate({ isVisible: false, index: -1 })}
        cancelTextIOS="Cancel"
        confirmTextIOS="Confirm"
      />
      <DateTimePicker
        isVisible={showDateOfSite.isVisible}
        date={dateOffSite ? dateOffSite : new Date()}
        mode={"date"}
        is24Hour={true}
        display="default"
        onConfirm={(date) => onDateOfSiteChange(date)}
        onCancel={() => setShowDateOfSite({ isVisible: false, index: -1 })}
        cancelTextIOS="Cancel"
        confirmTextIOS="Confirm"
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
      <View
        style={{
          paddingTop: 30,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Text style={styles.titleText}>ELECTRICAL EQUIPMENT REGISTER</Text>
        <Text style={{ fontSize: 8, fontFamily: "poppins-regular" }}>(Electrical portable tools, lights and leads test record)</Text>
      </View>
      <ScrollView>
        <View style={styles.formCodnatiner}>
          <View style={styles.inputFieldContainer}>
            <TextInput value={contractorName} onChangeText={(e) => setContractorName(e)} style={styles.inputField} placeholder={"Main Contractor"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput value={projectName} onChangeText={(e) => setProjectName(e)} style={styles.inputField} placeholder={"Project"} />
          </View>
          <View style={styles.inputFieldContainer}>
          <TouchableOpacity onPress={() => setGetSign(true)} style={styles.inputFieldContainer}>
                {supervisorSignature ?
                <Image style={{ marginTop:20, height: 100, width: 100, backgroundColor: "gray" }} source={{ uri: supervisorSignature }} />
                :<Text style={{height: 52,
                  width: "100%",
                  borderBottomWidth: 1,
                  borderBottomColor: "#96A8B2",
                  padding: 5,
                  fontSize: 12,
                  color: "#96A8B2",
                  fontFamily: "poppins-regular",paddingTop:15}}>Supervisor Print & Sign</Text>
                }
              </TouchableOpacity>
          </View>
          <View style={styles.inputFieldContainer}>
            <Text onPress={() => showDatepicker("Date")} style={[styles.inputField, { paddingTop: 15 }]}>
              {new Date(date).toLocaleDateString()}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 8,
              fontFamily: "poppins-regular",
              textAlign: "center",
              paddingTop: 10,
              paddingBottom: 20,
            }}>
            All portable electrical equipment is subject to 3 monthly portable appliance testing to be carried out by a competent person
          </Text>
          <View style={styles.tableViewContainer}>
            <View style={styles.tableHeader}>
              <View style={styles.headerEquipmentTitleView}>
                <Text style={styles.headerTitle}>Equipment</Text>
              </View>
              <View style={styles.headerEquipmentTitleView}>
                <Text style={styles.headerTitle}>Date on-site</Text>
              </View>
              <View style={styles.headerEquipmentTitleView}>
                <Text style={styles.headerTitle}>Serial No</Text>
              </View>
              <View style={styles.headerEquipmentTitleView}>
                <Text style={styles.headerTitle}>Local No</Text>
              </View>
              <View style={styles.headerEquipmentTitleView}>
                <Text style={styles.headerTitle}>Owner if not Top Dec</Text>
              </View>
              <View style={styles.headerEquipmentTitleView}>
                <Text style={styles.headerTitle}>Date of last test</Text>
              </View>
              <View style={styles.headerEquipmentTitleView}>
                <Text style={styles.headerTitle}>Next test due date</Text>
              </View>
              <View style={styles.headerEquipmentTitleView}>
                <Text style={styles.headerTitle}>Date off site</Text>
              </View>
              <View style={styles.headerEquipmentTitleView}>
                <Text style={styles.headerTitle}>Comments</Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "flex-end",
                width: "100%",
                alignItems: "flex-end",
                marginBottom: 10,
              }}>
              <TouchableOpacity style={styles.addBtn} onPress={() => addEquipmentRegister()}>
                <Image style={styles.plusBtn} source={plus} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "column" }}>
              {dynamicInput.length > 0 &&
                dynamicInput.map((el, index) => (
                  <View style={styles.tableBody} key={index}>
                    <View style={styles.inputEquipmentBodyContainer}>
                      <TextInput value={el.equipment} onChangeText={(txt) => updateValue("equipment", index, txt)} style={styles.bodyTextInput} placeholder={"Equipment"} />
                    </View>
                    <View style={styles.inputEquipmentBodyContainer}>
                    <Text
                        onPress={() => showOnSiteDatepicker(index)}
                        style={{
                          height: 39,
                          marginRight:3,
                          borderBottomWidth: 1,
                          borderBottomColor: "#96A8B2",
                          fontSize: 7,
                          color: "#96A8B2",
                          fontFamily: "poppins-regular",
                          paddingTop: 15,
                        }}
                      >
                        {new Date(el.site_date).toLocaleDateString()}
                      </Text>
                    </View>
                    <View style={styles.inputEquipmentBodyContainer}>
                      <TextInput
                        value={el.serial}
                        onChangeText={(txt) => updateValue("serial", index, txt)}
                        style={styles.bodyTextInput}
                        placeholder={"Serial No"}
                      />
                    </View>
                    <View style={styles.inputEquipmentBodyContainer}>
                      <TextInput
                        value={el.local}
                        onChangeText={(txt) => updateValue("local", index, txt)}
                        style={styles.bodyTextInput}
                        placeholder={"Local No"}
                      />
                    </View>
                    <View style={styles.inputEquipmentBodyContainer}>
                      <TextInput
                        value={el.owner_if_not_dec}
                        onChangeText={(txt) => updateValue("owner_if_not_dec", index, txt)}
                        style={styles.bodyTextInput}
                        placeholder={"Top Dec"}
                      />
                    </View>
                    <View style={styles.inputEquipmentBodyContainer}>
                    <Text
                        onPress={() => showLastTestDatepicker(index)}
                        style={{
                          height: 39,
                          marginRight:3,
                          borderBottomWidth: 1,
                          borderBottomColor: "#96A8B2",
                          fontSize: 7,
                          color: "#96A8B2",
                          fontFamily: "poppins-regular",
                          paddingTop: 15,
                        }}
                      >
                        {new Date(el.last_test_date).toLocaleDateString()}
                      </Text>
                    </View>
                    <View style={styles.inputEquipmentBodyContainer}>
                    <Text
                        onPress={() => showTestDueDatepicker(index)}
                        style={{
                          height: 39,
                          marginRight:3,
                          borderBottomWidth: 1,
                          borderBottomColor: "#96A8B2",
                          fontSize: 7,
                          color: "#96A8B2",
                          fontFamily: "poppins-regular",
                          paddingTop: 15,
                        }}
                      >
                        {new Date(el.next_date).toLocaleDateString()}
                      </Text>
                    </View>
                    <View style={styles.inputEquipmentBodyContainer}>
                    <Text
                        onPress={() => showOffDatepicker(index)}
                        style={{
                          height: 39,
                          marginRight:3,
                          borderBottomWidth: 1,
                          borderBottomColor: "#96A8B2",
                          fontSize: 7,
                          color: "#96A8B2",
                          fontFamily: "poppins-regular",
                          paddingTop: 15,
                        }}
                      >
                        {new Date(el.offsite).toLocaleDateString()}
                      </Text>
                    </View>
                    <View style={styles.inputEquipmentBodyContainer}>
                      <TextInput
                        value={el.comment}
                        onChangeText={(txt) => updateValue("comment", index, txt)}
                        style={styles.bodyTextInput}
                        placeholder={"Comments"}
                      />
                    </View>
                  </View>
                ))}
            </View>
            <View
              style={{
                width: "100%",
                height: 2,
                backgroundColor: "#000",
                marginTop: 20,
              }}></View>
            <Text
              style={{
                fontFamily: "poppins-bold",
                fontSize: 12,
                paddingTop: 10,
                textAlign: "center",
              }}>
              Once completed, please file a copy in the Site Folder and send a copy to our Head Office.
            </Text>
            <View style={styles.footerView}>
              <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                Address: 2,
                <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}> Green Lane, Penge, London SE20 7JA</Text>
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
          <View
            style={{
              backgroundColor: "#000",
              width: "100%",
              height: 2,
              marginBottom: 20,
              marginTop: 20,
            }}></View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.commonBtn} onPress={() => electricalEquipmentFormInsert()}>
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
  isSuccess: state.auth.isSuccess,
  isSuccessMsg: state.auth.isSuccessMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
  createElectricalEquipmentHandler: (contractorName, projectName, supervisorSignature, date, dynamicInput, jobID, tabId, token, index) =>
    dispatch(insertElectricalEquipemntForm(contractorName, projectName, supervisorSignature, date, dynamicInput, jobID, tabId, token, index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ElectricalEquipment);

