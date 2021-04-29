import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Text, CheckBox } from "native-base";
import styles from "../../../assets/css/styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { insertHarmFulForm } from "../../../Redux/action/auth/authActionTypes";
import { connect } from "react-redux";
import { updateHealthReport } from "../../../Redux/action/summary/Summary";

var plus = require("../../../assets/authScreen/plus.png");
const HarmFulSubstance = (props) => {
  const { navigation, token, isSuccess, isSuccessMsg, isJobId } = props;
  const jobID = Math.floor(Math.random() * 100) + 1;
  const tabId = props.route.params.tabName;
  const [harmFulRow, setHarmFullRow] = useState([]);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dynamicInput, setdynamicInput] = useState([]);
  const [contractorName, setContractorName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [data, setData] = useState({
    paint: "",
    location: "",
    potential_hazard: "",
    safer_alternatives: "",
    protective_clothes: "",
    supplierMSDS: "",
  });
  const addHarmfullRow = () => {
    setdynamicInput((oldArray) => [...oldArray, data]);
    setData({
      paint: "",
      location: "",
      potential_hazard: "",
      safer_alternatives: "",
      protective_clothes: "",
      supplierMSDS: "",
    });
  };
  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(new Date(currentDate).toLocaleDateString());
  };
  const showDatepicker = () => {
    setShow(true);
  };
  const harmFulSubstanceFormInsert = () => {
    if (contractorName != "" && projectName != "" && date != "" && dynamicInput != "") {
      props.createHarmFullHandler(contractorName, projectName, date, dynamicInput, jobID, tabId, token, props.route.params?.index);
      props.updateHealthReport(props?.route?.params?.index);
      props.navigation.pop();
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
  }, [isSuccessMsg]);
  return (
    <View style={styles.mainContainer}>
      <DateTimePickerModal
        isVisible={show}
        testID='dateTimePicker'
        value={date}
        mode={"date"}
        display='default'
        onConfirm={onChange}
        onCancel={() => setShow(false)}
        format='DD-MM-YYYY'
      />
      <View
        style={{
          paddingTop: 30,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Text style={styles.titleText}>Harmful Substance Register</Text>
      </View>
      <ScrollView>
        <View style={styles.formCodnatiner}>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Main Contractor"} value={contractorName} onChangeText={(e) => setContractorName(e)} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Project"} value={projectName} onChangeText={(e) => setProjectName(e)} />
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
              }}>
              {new Date(date).toLocaleDateString()}
            </Text>
          </View>
          <View style={[styles.tableViewContainer, { marginTop: 30 }]}>
            <View style={styles.tableHeader}>
              <View style={styles.headerHarmFulTitleView}>
                <Text style={styles.headerTitle}>Substance</Text>
              </View>
              <View style={styles.headerHarmFulTitleView}>
                <Text style={styles.headerTitle}>Location</Text>
              </View>
              <View style={styles.headerHarmFulTitleView}>
                <Text style={styles.headerTitle}>Potential hazard</Text>
              </View>
              <View style={styles.headerHarmFulTitleView}>
                <Text style={styles.headerTitle}>Safer alternatives </Text>
              </View>
              <View style={styles.headerHarmFulTitleView}>
                <Text style={styles.headerTitle}>Protective clothing required Y/N</Text>
              </View>
              <View style={styles.headerHarmFulTitleView}>
                <Text style={styles.headerTitle}>Supplier MSDS Held Y/N</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              justifyContent: "flex-end",
              width: "100%",
              alignItems: "flex-end",
              marginBottom: 10,
            }}>
            <TouchableOpacity style={styles.addBtn} onPress={() => addHarmfullRow()}>
              <Image style={styles.plusBtn} source={plus} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "column" }}>
            {dynamicInput.length > 0 &&
              dynamicInput.map((el, index) => (
                <View style={styles.tableBody} key={index}>
                  <View style={styles.inputHarmFullBodyContainer}>
                    <TextInput
                      style={styles.bodyTextInput}
                      placeholder={"Substance"}
                      value={el.paint}
                      onChangeText={(txt) => updateValue("paint", index, txt)}
                    />
                  </View>
                  <View style={styles.inputHarmFullBodyContainer}>
                    <TextInput
                      style={styles.bodyTextInput}
                      placeholder={"Location"}
                      value={el.location}
                      onChangeText={(txt) => updateValue("location", index, txt)}
                    />
                  </View>
                  <View style={styles.inputHarmFullBodyContainer}>
                    <TextInput
                      style={styles.bodyTextInput}
                      placeholder={"Potential hazard"}
                      value={el.potential_hazard}
                      onChangeText={(txt) => updateValue("potential_hazard", index, txt)}
                    />
                  </View>
                  <View style={styles.inputHarmFullBodyContainer}>
                    <TextInput
                      style={styles.bodyTextInput}
                      placeholder={"Safer alternatives"}
                      value={el.safer_alternatives}
                      onChangeText={(txt) => updateValue("safer_alternatives", index, txt)}
                    />
                  </View>
                  <View style={styles.inputHarmFullBodyContainer}>
                    <TextInput
                      style={styles.bodyTextInput}
                      placeholder={"Protective clothing required Y/N"}
                      value={el.protective_clothes}
                      onChangeText={(txt) => updateValue("protective_clothes", index, txt)}
                    />
                  </View>
                  <View style={styles.inputHarmFullBodyContainer}>
                    <TextInput
                      style={styles.bodyTextInput}
                      placeholder={"Supplier MSDS Held Y/N"}
                      value={el.supplierMSDS}
                      onChangeText={(txt) => updateValue("supplierMSDS", index, txt)}
                    />
                  </View>
                </View>
              ))}
            <View style={styles.tableBody}>
              <View style={styles.inputHarmFullBodyContainer}>
                <TextInput style={styles.bodyTextInput} placeholder={"Substance"} onChangeText={(txt) => setData({ ...data, paint: txt })} value={data.paint} />
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
                  placeholder={"Potential hazard"}
                  onChangeText={(txt) => setData({ ...data, potential_hazard: txt })}
                  value={data.potential_hazard}
                />
              </View>
              <View style={styles.inputHarmFullBodyContainer}>
                <TextInput
                  style={styles.bodyTextInput}
                  placeholder={"Safer alternatives"}
                  onChangeText={(txt) => setData({ ...data, safer_alternatives: txt })}
                  value={data.safer_alternatives}
                />
              </View>
              <View style={styles.inputHarmFullBodyContainer}>
                <TextInput
                  style={styles.bodyTextInput}
                  placeholder={"Protective clothing required Y/N"}
                  onChangeText={(txt) => setData({ ...data, protective_clothes: txt })}
                  value={data.protective_clothes}
                />
              </View>
              <View style={styles.inputHarmFullBodyContainer}>
                <TextInput
                  style={styles.bodyTextInput}
                  placeholder={"Supplier MSDS Held Y/N"}
                  onChangeText={(txt) => setData({ ...data, supplierMSDS: txt })}
                  value={data.supplierMSDS}
                />
              </View>
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
            <TouchableOpacity style={styles.commonBtn} onPress={() => harmFulSubstanceFormInsert()}>
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
  isSuccess: state.auth.isSuccess,
  isSuccessMsg: state.auth.isSuccessMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
  createHarmFullHandler: (contractorName, projectName, date, dynamicInput, jobID, tabId, token, index) =>
    dispatch(insertHarmFulForm(contractorName, projectName, date, dynamicInput, jobID, tabId, token, index)),
  updateHealthReport: (index) => dispatch(updateHealthReport(index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(HarmFulSubstance);
