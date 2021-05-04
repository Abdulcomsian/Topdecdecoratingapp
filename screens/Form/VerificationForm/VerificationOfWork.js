import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Text } from "native-base";
import styles from "../../../assets/css/styles";
import { insertVerificationForm } from "../../../Redux/action/auth/authActionTypes";
import { connect } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { updateVerificationReport } from "../../../Redux/action/summary/Summary";

var plus = require("../../../assets/authScreen/plus.png");
const VerificationOfWork = (props) => {
  const { navigation, token, isVerifyWork, isSuccessMsg, isJobId } = props;
  //const jobID = Math.floor(Math.random() * 100) + 1;
  const { plot_id } = props.route.params;
  const jobID = plot_id;
  console.log("Verification Work Plot ID :",jobID)
  const tabId = props.route.params.tabName;
  const [dynamicInput, setdynamicInput] = useState([]);
  const [projectName, setProjectName] = useState([]);
  const [idRef, setIdRef] = useState([]);
  const [decoratorName, setDecoratorName] = useState([]);
  const addVerificationRow = () => {
    setdynamicInput((oldArray) => [
      ...oldArray,
      {
        days: "",
        work: "",
        date: new Date().toLocaleDateString(),
        project: "",
        plot: "",
        description: "",
        price: "",
        remedial: "",
        si: "",
        c_work: "",
      },
    ]);
  };
  const updateValue = (key, index, value) => {
    let preData = [...dynamicInput];
    preData[index][key] = value;
    setdynamicInput(preData);
  };
  const verificationWorkFormInsert = async () => {
    try{
    if (projectName != "" && idRef != "" && decoratorName != "") {
      await props.createVerificationWorkHandler(projectName, idRef, decoratorName, dynamicInput, jobID, tabId, token);
      props.updateVerificationReport(props?.route?.params?.index);
      alert("Verification Of Work Insert SuccessFully !")
      props.navigation.pop();
    } else {
      alert("Please Insert All Fields CareFully !");
      return false;
    }
  } catch(err){
    alert(err.message)
  }
  };
  const [show, setShow] = useState({
    isVisible: false,
    index: -1,
  });
  const [date, setDate] = useState(new Date(1598051730000));
  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow({ ...show, isVisible: false, index: -1 });
    let copyArr = [...dynamicInput];
    copyArr[show.index].date = currentDate.toLocaleDateString();
    setdynamicInput(copyArr);
  };
  const showStartDatepicker = (index = -1) => {
    setShow({ ...show, isVisible: true, index: index });
  };
  return (
    <View style={[styles.mainContainer, { paddingLeft: 20, paddingRight: 20, marginTop: 50 }]}>
      <DateTimePickerModal
        isVisible={show.isVisible}
        date={date ? date : new Date()}
        mode={"date"}
        is24Hour={true}
        display='default'
        onConfirm={(date) => onChange(date)}
        onCancel={() => setShow({ isVisible: false, index: -1 })}
        cancelTextIOS='Cancel'
        confirmTextIOS='Confirm'
      />
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.inputFieldContainer}>
          <TextInput value={projectName} onChangeText={(e) => setProjectName(e)} style={styles.inputField} placeholder={"Project Name"} />
        </View>
        <View style={styles.inputFieldContainer}>
          <TextInput value={idRef} onChangeText={(e) => setIdRef(e)} style={styles.inputField} placeholder={"Id Ref"} />
        </View>
        <View style={styles.inputFieldContainer}>
          <TextInput value={decoratorName} onChangeText={(e) => setDecoratorName(e)} style={styles.inputField} placeholder={"Decorator Name"} />
        </View>
        <View style={styles.tableViewContainer}>
          <View style={[styles.tableHeader, { marginTop: 30, paddingRight: 5, paddingLeft: 5 }]}>
            <View style={styles.headerTitleView}>
              <Text style={styles.headerTitle}>FORTNIGHT-DAYS</Text>
            </View>
            <View style={styles.headerTitleView}>
              <Text style={styles.headerTitle}>SITE MANAGER</Text>
            </View>
            <View style={styles.headerTitleView}>
              <Text style={styles.headerTitle}>DATE</Text>
            </View>
            <View style={styles.headerTitleView}>
              <Text style={styles.headerTitle}>PROJECT</Text>
            </View>
            <View style={styles.headerTitleView}>
              <Text style={styles.headerTitle}>PLOT/AREAS</Text>
            </View>
            <View style={styles.headerTitleView}>
              <Text style={styles.headerTitle}>DESCRIPTION</Text>
            </View>
            <View style={styles.headerTitleView}>
              <Text style={styles.headerTitle}>Price</Text>
            </View>
            <View style={styles.headerTitleView}>
              <Text style={styles.headerTitle}>REMEDIAL WORKS</Text>
            </View>
            <View style={styles.headerTitleView}>
              <Text style={styles.headerTitle}>SI No </Text>
            </View>
            <View style={styles.headerTitleView}>
              <Text style={styles.headerTitle}>CONFIRMED WORKS</Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}>
            <View style={styles.inputButtonBodyContainer}>
              <TouchableOpacity style={styles.addBtn} onPress={() => addVerificationRow()}>
                <Image style={styles.plusBtn} source={plus} />
              </TouchableOpacity>
            </View>
          </View>
          {dynamicInput.length > 0 &&
            dynamicInput.map((el, index) => (
              <View style={[styles.tableBody, { justifyContent: "space-between" }]} key={index}>
                <View style={styles.inputBodyContainer}>
                  <TextInput onChangeText={(txt) => updateValue("days", index, txt)} value={el.days} style={styles.bodyTextInput} placeholder={"Days"} />
                </View>
                <View style={styles.inputBodyContainer}>
                  <TextInput onChangeText={(txt) => updateValue("work", index, txt)} value={el.work} style={styles.bodyTextInput} placeholder={"Manager"} />
                </View>
                <View style={styles.inputBodyContainer}>
                  <Text
                    onPress={() => showStartDatepicker(index)}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#96A8B2",
                      fontSize: 8,
                      color: "#96A8B2",
                      fontFamily: "poppins-regular",
                      paddingTop: 10,
                    }}>
                    {new Date(el.date).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.inputBodyContainer}>
                  <TextInput
                    onChangeText={(txt) => updateValue("project", index, txt)}
                    value={el.project}
                    style={styles.bodyTextInput}
                    placeholder={"Project"}
                  />
                </View>
                <View style={styles.inputBodyContainer}>
                  <TextInput onChangeText={(txt) => updateValue("plot", index, txt)} value={el.plot} style={styles.bodyTextInput} placeholder={"Plot"} />
                </View>
                <View style={styles.inputBodyContainer}>
                  <TextInput
                    onChangeText={(txt) => updateValue("description", index, txt)}
                    value={el.description}
                    style={styles.bodyTextInput}
                    placeholder={"Description"}
                  />
                </View>
                <View style={styles.inputBodyContainer}>
                  <TextInput onChangeText={(txt) => updateValue("price", index, txt)} value={el.price} style={styles.bodyTextInput} placeholder={"Price"} />
                </View>
                <View style={styles.inputBodyContainer}>
                  <TextInput
                    onChangeText={(txt) => updateValue("remedial", index, txt)}
                    value={el.remedial}
                    style={styles.bodyTextInput}
                    placeholder={"Remedial"}
                  />
                </View>
                <View style={styles.inputBodyContainer}>
                  <TextInput onChangeText={(txt) => updateValue("si", index, txt)} value={el.si} style={styles.bodyTextInput} placeholder={"No."} />
                </View>
                <View style={styles.inputBodyContainer}>
                  <TextInput onChangeText={(txt) => updateValue("c_work", index, txt)} value={el.c_work} style={styles.bodyTextInput} placeholder={"Work"} />
                </View>
              </View>
            ))}
          <View
            style={{
              backgroundColor: "#000",
              width: "100%",
              height: 2,
              marginBottom: 20,
              marginTop: 20,
            }}></View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.commonBtn} onPress={() => verificationWorkFormInsert()}>
              <Text style={styles.commonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
  isVerifyWork: state.auth.isVerifyWork,
  isSuccessMsg: state.auth.isSuccessMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
  createVerificationWorkHandler: (projectName, idRef, decoratorName, dynamicInput, jobID, tabId, token) =>
    dispatch(insertVerificationForm(projectName, idRef, decoratorName, dynamicInput, jobID, tabId, token)),
  updateVerificationReport: (index) => dispatch(updateVerificationReport(index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(VerificationOfWork);
