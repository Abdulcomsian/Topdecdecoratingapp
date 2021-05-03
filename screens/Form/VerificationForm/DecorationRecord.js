import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Text } from "native-base";
import { connect } from "react-redux";
import { insertDecorationRecord } from "../../../Redux/action/auth/authActionTypes";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { updateVerificationReport } from "../../../Redux/action/summary/Summary";

var plus = require("../../../assets/authScreen/plus.png");
const DecorationRecord = (props) => {
  const { navigation, token, isSuccessMsg, isDecoration, isJobId } = props;
  // const jobID = Math.floor(Math.random() * 100) + 1;
  const jobID = isJobId;
  const tabId = props.route.params.tabName;
  const [dynamicFirstInput, setdynamicFirstInput] = useState([]);
  const [dynamicSecondInput, setdynamicSeconfInput] = useState([]);

  const addDecorationRow = () => {
    setdynamicFirstInput((oldArray) => [
      ...oldArray,
      {
        name: "",
        block: "",
        level: "",
        bed: "",
        price: "",
        plot: "",
        days: "",
        start: new Date().toLocaleDateString(),
        complete: new Date().toLocaleDateString(),
      },
    ]);
  };
  const addDecorationSecondRow = () => {
    setdynamicSeconfInput((oldArray) => [
      ...oldArray,
      {
        name: "",
        block: "",
        level: "",
        bed: "",
        price: "",
        plot: "",
        start: new Date().toLocaleDateString(),
        complete: new Date().toLocaleDateString(),
      },
    ]);
  };
  const updateFirstValue = (key, index, value) => {
    let preData = [...dynamicFirstInput];
    preData[index][key] = value;
    setdynamicFirstInput(preData);
  };
  const updateSecondValue = (key, index, value) => {
    let preData = [...dynamicSecondInput];
    preData[index][key] = value;
    setdynamicSeconfInput(preData);
  };
  const decorationRecordInsert = async () => {
    try{
    if (dynamicFirstInput && dynamicSecondInput && jobID !== "" && tabId != "") {
      await props.createDecorationRecordHandler(dynamicFirstInput, dynamicSecondInput, jobID, tabId, token);
      props.updateVerificationReport(props?.route?.params?.index);
      alert("Decoration Record Insert SuccessFully !");
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
  const [showComplete, setShowComplete] = useState({
    isVisible: false,
    index: -1,
  });

  const [showDateSecond, setShowDateSecond] = useState({
    isVisible: false,
    index: -1,
  });
  const [showCompleteDateSecond, setShowCompleteDateSecond] = useState({
    isVisible: false,
    index: -1,
  });
  const [date, setDate] = useState(new Date(1598051730000));
  const [dateComplete, setDateComplete] = useState(new Date(1598051730000));
  const [dateSecond, setDateSecond] = useState(new Date(1598051730000));
  const [dateSecondComplete, setDateSecondComplete] = useState(new Date(1598051730000));

  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow({ ...show, isVisible: false, index: -1 });
    let copyArr = [...dynamicFirstInput];
    copyArr[show.index].start = currentDate.toLocaleDateString();
    setdynamicFirstInput(copyArr);
  };

  const onCompleteChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowComplete({ ...showComplete, isVisible: false, index: -1 });
    let copyArr = [...dynamicFirstInput];
    copyArr[showComplete.index].complete = currentDate.toLocaleDateString();
    setdynamicFirstInput(copyArr);
  };

  const onDateSecondChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowDateSecond({ ...showDateSecond, isVisible: false, index: -1 });
    let copyArr = [...dynamicSecondInput];
    copyArr[showDateSecond.index].start = currentDate.toLocaleDateString();
    setdynamicSeconfInput(copyArr);
  };

  const onDateCompleteSecondChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowCompleteDateSecond({ ...showCompleteDateSecond, isVisible: false, index: -1 });
    let copyArr = [...dynamicSecondInput];
    copyArr[showCompleteDateSecond.index].complete = currentDate.toLocaleDateString();
    setdynamicSeconfInput(copyArr);
  };

  const showStartDatepicker = (index = -1) => {
    setShow({ ...show, isVisible: true, index: index });
  };
  const showCompleteDatepicker = (index = -1) => {
    setShowComplete({ ...showComplete, isVisible: true, index: index });
  };
  const showDateSecondpicker = (index = -1) => {
    setShowDateSecond({ ...showDateSecond, isVisible: true, index: index });
  };
  const showDateCompleteSecondpicker = (index = -1) => {
    setShowCompleteDateSecond({ ...showCompleteDateSecond, isVisible: true, index: index });
  };
  console.log(dynamicFirstInput);
  return (
    <ScrollView style={{ height: "100%" }}>
      <View style={styles.mainContainer}>
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
        <DateTimePickerModal
          isVisible={showComplete.isVisible}
          date={dateComplete ? dateComplete : new Date()}
          mode={"date"}
          is24Hour={true}
          display='default'
          onConfirm={(date) => onCompleteChange(date)}
          onCancel={() => setShowComplete({ isVisible: false, index: -1 })}
          cancelTextIOS='Cancel'
          confirmTextIOS='Confirm'
        />
        <DateTimePickerModal
          isVisible={showDateSecond.isVisible}
          date={dateSecond ? dateSecond : new Date()}
          mode={"date"}
          is24Hour={true}
          display='default'
          onConfirm={(date) => onDateSecondChange(date)}
          onCancel={() => setShowDateSecond({ isVisible: false, index: -1 })}
          cancelTextIOS='Cancel'
          confirmTextIOS='Confirm'
        />
        <DateTimePickerModal
          isVisible={showCompleteDateSecond.isVisible}
          date={dateSecondComplete ? dateSecondComplete : new Date()}
          mode={"date"}
          is24Hour={true}
          display='default'
          onConfirm={(date) => onDateCompleteSecondChange(date)}
          onCancel={() => setShowCompleteDateSecond({ isVisible: false, index: -1 })}
          cancelTextIOS='Cancel'
          confirmTextIOS='Confirm'
        />
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Decoration Record</Text>
        </View>
        <View style={{ height: "95%", width: "100%" }}>
          <ScrollView style={{ height: "100%", paddingLeft: 20, paddingRight: 20 }}>
            <View style={styles.tableViewContainer}>
              <View style={styles.tableHeader}>
                <View style={styles.headerTitleView}>
                  <Text style={styles.headerTitle}>Name</Text>
                </View>
                <View style={styles.headerTitleView}>
                  <Text style={styles.headerTitle}>Block</Text>
                </View>
                <View style={styles.headerTitleView}>
                  <Text style={styles.headerTitle}>Level</Text>
                </View>
                <View style={styles.headerTitleView}>
                  <Text style={styles.headerTitle}>Bed Room/s</Text>
                </View>
                <View style={styles.headerTitleView}>
                  <Text style={styles.headerTitle}>Price</Text>
                </View>
                <View style={styles.headerTitleView}>
                  <Text style={styles.headerTitle}>Plot/Areas</Text>
                </View>
                <View style={styles.headerTitleView}>
                  <Text style={styles.headerTitle}>No. of days</Text>
                </View>
                <View style={styles.headerTitleView}>
                  <Text style={styles.headerTitle}>Start Date</Text>
                </View>
                <View style={styles.headerTitleView}>
                  <Text style={styles.headerTitle}>Completion date</Text>
                </View>
              </View>

              <View style={{ flexDirection: "column" }}>
                {dynamicFirstInput.length > 0 &&
                  dynamicFirstInput.map((el, index) => (
                    <View style={styles.tableBody} key={index}>
                      <View style={styles.inputBodyContainer}>
                        <TextInput
                          onChangeText={(txt) => updateFirstValue("name", index, txt)}
                          value={el.name}
                          style={styles.bodyTextInput}
                          placeholder={"Name"}
                        />
                      </View>
                      <View style={styles.inputBodyContainer}>
                        <TextInput
                          onChangeText={(txt) => updateFirstValue("block", index, txt)}
                          value={el.block}
                          style={styles.bodyTextInput}
                          placeholder={"Block"}
                        />
                      </View>
                      <View style={styles.inputBodyContainer}>
                        <TextInput
                          onChangeText={(txt) => updateFirstValue("level", index, txt)}
                          value={el.level}
                          style={styles.bodyTextInput}
                          placeholder={"level"}
                        />
                      </View>
                      <View style={styles.inputBodyContainer}>
                        <TextInput
                          onChangeText={(txt) => updateFirstValue("bed", index, txt)}
                          value={el.bed}
                          style={styles.bodyTextInput}
                          placeholder={"Rooms"}
                        />
                      </View>
                      <View style={styles.inputBodyContainer}>
                        <TextInput
                          onChangeText={(txt) => updateFirstValue("price", index, txt)}
                          value={el.price}
                          style={styles.bodyTextInput}
                          placeholder={"Price"}
                        />
                      </View>
                      <View style={styles.inputBodyContainer}>
                        <TextInput
                          onChangeText={(txt) => updateFirstValue("plot", index, txt)}
                          value={el.plot}
                          style={styles.bodyTextInput}
                          placeholder={"Plot"}
                        />
                      </View>
                      <View style={styles.inputBodyContainer}>
                        <TextInput
                          onChangeText={(txt) => updateFirstValue("days", index, txt)}
                          value={el.days}
                          style={styles.bodyTextInput}
                          placeholder={"Days"}
                        />
                      </View>
                      <View style={styles.inputBodyContainer}>
                        <Text
                          onPress={() => showStartDatepicker(index)}
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#96A8B2",
                            fontSize: 12,
                            color: "#96A8B2",
                            fontFamily: "poppins-regular",
                          }}>
                          {new Date(el.start).toLocaleDateString()}
                        </Text>
                      </View>
                      <View style={styles.inputBodyContainer}>
                        <Text
                          onPress={() => showCompleteDatepicker(index)}
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#96A8B2",
                            fontSize: 12,
                            color: "#96A8B2",
                            fontFamily: "poppins-regular",
                          }}>
                          {new Date(el.complete).toLocaleDateString()}
                        </Text>
                      </View>
                    </View>
                  ))}
              </View>
              <View
                style={{
                  width: "100%",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}>
                <View style={styles.inputButtonBodyContainer}>
                  <TouchableOpacity style={styles.addBtn} onPress={() => addDecorationRow()}>
                    <Image style={styles.plusBtn} source={plus} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Decoration Record</Text>
            </View>
            <View style={styles.tableViewContainer}>
              <View style={styles.tableHeader}>
                <View style={styles.headerDecorationTitleView}>
                  <Text style={styles.headerTitle}>Name</Text>
                </View>
                <View style={styles.headerDecorationTitleView}>
                  <Text style={styles.headerTitle}>Block</Text>
                </View>
                <View style={styles.headerDecorationTitleView}>
                  <Text style={styles.headerTitle}>Level</Text>
                </View>
                <View style={styles.headerDecorationTitleView}>
                  <Text style={styles.headerTitle}>Bed Room/s</Text>
                </View>
                <View style={styles.headerDecorationTitleView}>
                  <Text style={styles.headerTitle}>Price</Text>
                </View>
                <View style={styles.headerDecorationTitleView}>
                  <Text style={styles.headerTitle}>Plot</Text>
                </View>
                <View style={styles.headerDecorationTitleView}>
                  <Text style={styles.headerTitle}>Start Date</Text>
                </View>
                <View style={styles.headerDecorationTitleView}>
                  <Text style={styles.headerTitle}>Completion date</Text>
                </View>
              </View>

              <View style={{ flexDirection: "column" }}>
                {dynamicSecondInput.length > 0 &&
                  dynamicSecondInput.map((el, index) => (
                    <View style={styles.tableBody} key={index}>
                      <View style={styles.inputSecondBodyContainer}>
                        <TextInput
                          onChangeText={(txt) => updateSecondValue("name", index, txt)}
                          value={el.name}
                          style={styles.bodyTextInput}
                          placeholder={"Name"}
                        />
                      </View>
                      <View style={styles.inputSecondBodyContainer}>
                        <TextInput
                          onChangeText={(txt) => updateSecondValue("block", index, txt)}
                          value={el.block}
                          style={styles.bodyTextInput}
                          placeholder={"Block"}
                        />
                      </View>
                      <View style={styles.inputSecondBodyContainer}>
                        <TextInput
                          onChangeText={(txt) => updateSecondValue("level", index, txt)}
                          value={el.level}
                          style={styles.bodyTextInput}
                          placeholder={"level"}
                        />
                      </View>
                      <View style={styles.inputSecondBodyContainer}>
                        <TextInput
                          onChangeText={(txt) => updateSecondValue("bed", index, txt)}
                          value={el.bed}
                          style={styles.bodyTextInput}
                          placeholder={"Rooms"}
                        />
                      </View>
                      <View style={styles.inputSecondBodyContainer}>
                        <TextInput
                          onChangeText={(txt) => updateSecondValue("price", index, txt)}
                          value={el.price}
                          style={styles.bodyTextInput}
                          placeholder={"Price"}
                        />
                      </View>
                      <View style={styles.inputSecondBodyContainer}>
                        <TextInput
                          onChangeText={(txt) => updateSecondValue("plot", index, txt)}
                          value={el.plot}
                          style={styles.bodyTextInput}
                          placeholder={"Plot"}
                        />
                      </View>
                      <View style={styles.inputSecondBodyContainer}>
                        <Text
                          onPress={() => showDateSecondpicker(index)}
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#96A8B2",
                            fontSize: 12,
                            color: "#96A8B2",
                            fontFamily: "poppins-regular",
                          }}>
                          {new Date(el.start).toLocaleDateString()}
                        </Text>
                      </View>
                      <View style={styles.inputSecondBodyContainer}>
                        <Text
                          onPress={() => showDateCompleteSecondpicker(index)}
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#96A8B2",
                            fontSize: 12,
                            color: "#96A8B2",
                            fontFamily: "poppins-regular",
                          }}>
                          {new Date(el.complete).toLocaleDateString()}
                        </Text>
                      </View>
                    </View>
                  ))}
              </View>
              <View
                style={{
                  width: "100%",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}>
                <View style={styles.inputButtonBodyContainer}>
                  <TouchableOpacity style={styles.addBtn} onPress={() => addDecorationSecondRow()}>
                    <Image style={styles.plusBtn} source={plus} />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: "#000",
                  width: "100%",
                  height: ".5%",
                  marginBottom: 20,
                  marginTop: 20,
                }}></View>
              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.commonBtn} onPress={() => decorationRecordInsert()}>
                  <Text style={styles.commonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
  isDecoration: state.auth.isDecoration,
  isSuccessMsg: state.auth.isSuccessMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
  createDecorationRecordHandler: (dynamicFirstInput, dynamicSecondInput, jobID, tabId, token) =>
    dispatch(insertDecorationRecord(dynamicFirstInput, dynamicSecondInput, jobID, tabId, token)),
  updateVerificationReport: (index) => dispatch(updateVerificationReport(index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DecorationRecord);

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    paddingBottom: 50,
  },
  titleContainer: {
    height: "5%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  titleText: {
    color: "#4F4F4F",
    fontSize: 18,
    fontFamily: "poppins-semiBold",
  },
  tableHeader: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
    marginTop: 20,
  },
  headerTitleView: {
    width: "11.1%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerDecorationTitleView: {
    width: "12.5%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 8,
    textAlign: "center",
    fontFamily: "poppins-bold",
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
  inputBodyContainer: {
    width: "11.1%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputSecondBodyContainer: {
    width: "12.5%",
    justifyContent: "center",
    alignItems: "center",
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
  tableBody: {
    width: "100%",
    flexDirection: "row",
  },
  inputSecondBodyContainer: {
    width: "12.5%",
    justifyContent: "center",
    alignItems: "center",
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
