import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Text, CheckBox } from "native-base";
import styles from "../../../assets/css/styles";
import InputCheckBox from "../../../components/common/inputCheckBox";
import DateTimePickerModal from "react-native-modal-datetime-picker";

var plus = require("../../../assets/authScreen/plus.png");
const HealthSafetyInspection = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [dateInspection, setDateInspection] = useState(new Date());
  const [showInspection, setShowInspection] = useState(false);
  const [dateComplete, setDateComplete] = useState(new Date());
  const [dateUpdateComplete, setDateUpdateComplete] = useState(new Date());
  const [showComplete, setShowComplete] = useState(false);
  const [inspectionRow, setInspectionRow] = useState([]);
  const [dynamicInput, setdynamicInput] = useState([]);
  const [showUpdateDateComplete, setShowUpdateDateComplete] = useState({
    isVisible: false,
    index: -1,
  });
  const [data, setData] = useState({
    itemNo: "",
    location: "",
    actionReq: "",
    priority: "",
    actionBy: "",
    date: new Date().toLocaleDateString(),
  });
  const addInspectionRow = () => {
     setdynamicInput((oldArray) => [...oldArray, data]);
    setData({
      itemNo: "",
      location: "",
      actionReq: "",
      priority: "",
      actionBy: "",
      date: new Date().toLocaleDateString(),
    });
  
  };
  const [documentRow, setDocumentRow] = useState([
    { title: "All Risk Assessments & Method Statements up to date? " },
    {
      title:
        "All COSHH (Control of substances hazardous to Health) assessments available?",
    },
    { title: "All MSDS (Material Safety Datasheets) available?" },
    { title: "Permits to work required, has it been issued?" },
    { title: "Decorators read and sign the RAMS?" },
    { title: "Toolbox Talk carried out?" },
  ]);
  const [generalRow, setGeneralRow] = useState([
    { title: "Appropriate safety signs in place?" },
    { title: "Working area isolated from others?" },
    { title: "Barriers in place?" },
  ]);
  const [protectiveRow, setProtectiveRow] = useState([
    { title: "Standard PPE being worn? Boots, Hat, Hi Vis, Coverall" },
    { title: "Extras - goggles/ear defenders?" },
    { title: "Decorators Face Fit Tested?" },
  ]);
  const [toolRow, setToolRow] = useState([
    { title: "Have tools had a visual inspection?" },
    { title: "Are casings or leads damaged?" },
    { title: "Have electrical tools been PAT tested?" },
  ]);
  const [workingRow, setWorkingRow] = useState([
    { title: "Specific Risk Assessment carried out?" },
    { title: "Ladders/ steps checked and tagged?" },
    { title: "Scaffold/ Mobile tower checked and tagged?" },
    { title: "MEWP (Mobile Elevated Work Platform) checked?" },
    { title: "PASMA/IPAF certificated personnel?" },
    { title: "Means of access suitable?" },
    { title: "Is edge protection needed, is it available?" },
  ]);
  const [exposureRow, setExposureRow] = useState([
    { title: "Specific Risk Assessment carried out?" },
    { title: "Is dust suppression in place when rubbing down?" },
    {
      title:
        "Is noise an issue to decorator/others, is it sufficiently controlled, are specific PPE worn?",
    },
    { title: "Are barriers needed/ used?" },
  ]);
  const [wasteRow, setWasteRow] = useState([
    { title: "Are skips and containers clearly labelled?" },
    {
      title:
        "Are there provisions for Product supplier to collect unused product and empty containers?  ",
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
  const onDateCompleteChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowComplete(false);
    setDateComplete(new Date(currentDate));
    setData({...data,date: dateComplete.toLocaleDateString() });
  };
  const showDateCompleteDatePicker = () => {
    setShowComplete(true);
  };
  const showUpdateDateCompleteDatePicker = (index) =>{
    setShowUpdateDateComplete({ ...showUpdateDateComplete, isVisible: true, index: index });
  }
  const onDateUpdateCompleteChange = (selectedDate) =>{
    const currentDate = selectedDate;
    setShowUpdateDateComplete({ ...showUpdateDateComplete, isVisible: false, index: -1 });
    let copyArr = [...data];
    copyArr[data.index].date = currentDate.toLocaleDateString();
    setData(copyArr);
    console.log("dynamic Input :", dynamicInput);
  }
  console.log("dynamic Input :", dynamicInput);
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
        isVisible={showComplete}
        date={dateComplete ? dateComplete : new Date()}
        mode={"date"}
        is24Hour={true}
        display="default"
        onConfirm={(date) => onDateCompleteChange(date)}
        onCancel={() => setShowComplete(false)}
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
        onCancel={() => setShowUpdateDateComplete({isVisible: false, index: -1})}
        cancelTextIOS="Cancel"
        confirmTextIOS="Confirm"
      />
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
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Site Supervisor"}
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
            >
              
            </View>
            <View style={{ flexDirection: "column" }}>
              {dynamicInput.length > 0 &&
                dynamicInput.map((item, index) => (
                  <View style={styles.tableBody} key={index}>
                    <View style={styles.inputHarmFullBodyContainer}>
                      <TextInput
                        style={styles.bodyTextInput}
                        placeholder={"Item No"}
                        onChangeText={(txt) => updateValue("itemNo", index, txt)}
                        value={item.itemNo}
                      />
                    </View>
                    <View style={styles.inputHarmFullBodyContainer}>
                      <TextInput
                        style={styles.bodyTextInput}
                        placeholder={"Location"}
                        onChangeText={(txt) => updateValue("location", index, txt)}
                        value={item.location}
                      />
                    </View>
                    <View style={styles.inputHarmFullBodyContainer}>
                      <TextInput
                        style={styles.bodyTextInput}
                        placeholder={"Action required"}
                        onChangeText={(txt) => updateValue("actionReq", index, txt)}
                        value={item.actionReq}
                      />
                    </View>
                    <View style={styles.inputHarmFullBodyContainer}>
                      <TextInput
                        style={styles.bodyTextInput}
                        placeholder={"Priority"}
                        onChangeText={(txt) => updateValue("priority", index, txt)}
                        value={item.priority}
                      />
                    </View>
                    <View style={styles.inputHarmFullBodyContainer}>
                      <TextInput
                        style={styles.bodyTextInput}
                        placeholder={"Action by"}
                        onChangeText={(txt) => updateValue("actionBy", index, txt)}
                        value={item.actionBy}
                      />
                    </View>
                    <View style={styles.inputHarmFullBodyContainer}>
                    <Text
                        onPress={() => showUpdateDateCompleteDatePicker(index)}
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
                        {new Date(item.date).toLocaleDateString()}
                    </Text>
                    </View>
                  </View>
                ))}
              <View style={styles.tableBody}>
                <View style={styles.inputHarmFullBodyContainer}>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder={"Item No"}
                    onChangeText={(txt) => setData({ ...data, itemNo: txt })}
                    value={data.itemNo}
                  />
                </View>
                <View style={styles.inputHarmFullBodyContainer}>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder={"Location"}
                    onChangeText={(txt) => setData({ ...data, location: txt })}
                    value={data.location}
                  />
                </View>
                <View style={styles.inputHarmFullBodyContainer}>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder={"Action required"}
                    onChangeText={(txt) => setData({ ...data, actionReq: txt })}
                    value={data.actionReq}
                  />
                </View>
                <View style={styles.inputHarmFullBodyContainer}>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder={"Priority"}
                    onChangeText={(txt) => setData({ ...data, priority: txt })}
                    value={data.priority}
                  />
                </View>
                <View style={styles.inputHarmFullBodyContainer}>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder={"Action by"}
                    onChangeText={(txt) => setData({ ...data, actionBy: txt })}
                    value={data.actionBy}
                  />
                </View>
                <View style={styles.inputHarmFullBodyContainer}>
                  <Text
                    onPress={() => showDateCompleteDatePicker()}
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
                    {new Date(dateComplete).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.inputBodyContainer,{alignItems:"flex-end",justifyContent:"flex-end",width:"100%"}]}>
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
            <TextInput style={styles.inputField} placeholder={"Name"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"For"} />
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
            <TextInput style={styles.inputField} placeholder={"Signed"} />
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
          <Text
            style={{
              fontSize: 12,
              fontFamily: "poppins-bold",
              paddingTop: 10,
              paddingBottom: 20,
            }}
          >
            1. Documentation
          </Text>
          <InputCheckBox data={documentRow} />
          <Text
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
          </View>
          <View></View>
        </View>
      </ScrollView>
    </View>
  );
};
export default HealthSafetyInspection;
