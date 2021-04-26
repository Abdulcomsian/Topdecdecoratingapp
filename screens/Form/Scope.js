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
import DateTimePicker from "@react-native-community/datetimepicker";
import { insertScopeForm } from "../../Redux/action/auth/authActionTypes";
import { connect } from "react-redux";

var plus = require("../../assets/authScreen/plus.png");
const Scope = (props) => {
  const { navigation, token, isSuccess, isSuccessMsg, isJobId } = props;
  const jobID= isJobId;
  const tabId=props.route.params.tabName
  const [dynamicInput, setdynamicInput] = useState([]);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [painterName, setPainterName] = useState("");
  const [plotNumber, setPlotNumber] = useState("");
  const [type, setType] = useState("");
  const [signature, setSignature] = useState("");

  const [data, setData] = useState({
    item: "",
    hallway: "",
    bedroom: "",
    room: "",
    bathrroms: "",
    ensuite: "",
  });
  const addRow = () => {
    setdynamicInput((oldArray) => [...oldArray, data]);
    setData({
      item: "",
      hallway: "",
      bedroom: "",
      room: "",
      bathrroms: "",
      ensuite: "",
    });
  };
  const updateValue = (key, index, value) => {
    let preData = [...dynamicInput];
    preData[index][key] = value;
    setdynamicInput(preData);
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === "ios" ? true : false);
    setDate(new Date(currentDate).toLocaleDateString());
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };
  const scopeFormInsert = () => {
    if (
      dynamicInput != "" &&
      painterName != "" &&
      plotNumber != "" &&
      type != "" &&
      date != ""
    ) {
      props.createScopeHandler(dynamicInput,painterName,signature,plotNumber,type,date,jobID,tabId,token);
    } else {
      alert("Please Insert All Fields CareFully !");
      return false;
    }
  };
  useEffect(() => {
    if(isSuccess){     
      if(isSuccessMsg){
          alert(isSuccessMsg)
          navigation.pop();
      }
      }
      else{
          if(isSuccessMsg){
              alert(isSuccessMsg)
              return false;
          }
      }
  },[isSuccessMsg])
  return (
    <View style={styles.mainContainer}>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          display="default"
          onChange={onChange}
          format="DD-MM-YYYY"
        />
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Colour Schedule</Text>
      </View>
      <View style={styles.scopeDescriptionView}>
        <View style={styles.textView}>
          <Text
            style={{
              fontFamily: "poppins-semiBold",
              fontSize: 10,
              width: "30%",
            }}
          >
            Frames, doors, skirting boxing:
          </Text>
          <Text
            style={{
              fontFamily: "poppins-regular",
              fontSize: 10,
              width: "70%",
            }}
          >
            to receive two undercoat, one gloss.
          </Text>
        </View>
        <View style={styles.textView}>
          <Text
            style={{
              fontFamily: "poppins-semiBold",
              paddingRight: 10,
              fontSize: 10,
              width: "30%",
            }}
          >
            Curtain baton:
          </Text>
          <Text
            style={{
              fontFamily: "poppins-regular",
              fontSize: 10,
              width: "70%",
            }}
          >
            to fill, rub down caulk and receive a coat of undercoat before
            emulsion.
          </Text>
        </View>
        <View style={styles.textView}>
          <Text
            style={{
              fontFamily: "poppins-semiBold",
              paddingRight: 10,
              fontSize: 10,
              width: "30%",
            }}
          >
            Frames, doors, skirting boxing:
          </Text>
          <Text
            style={{
              fontFamily: "poppins-regular",
              fontSize: 10,
              width: "70%",
            }}
          >
            to receive two undercoat, one gloss.
          </Text>
        </View>
        <View style={styles.textView}>
          <Text
            style={{
              fontFamily: "poppins-semiBold",
              paddingRight: 10,
              fontSize: 10,
              width: "30%",
            }}
          >
            Frames, doors, skirting boxing:
          </Text>
          <Text
            style={{
              fontFamily: "poppins-regular",
              fontSize: 10,
              width: "70%",
            }}
          >
            bathroom, w/c, kitchen, dinner / living room, to receive one coat of
            supermatt and two coats of white eggshell.
          </Text>
        </View>
      </View>
      <ScrollView style={{ height: "100%", width: "100%" }}>
        <View>
          <View style={styles.tableViewContainer}>
            <View style={styles.tableHeader}>
              <View style={styles.headerTitleView}>
                <Text style={styles.headerTitle}>Item</Text>
              </View>
              <View style={styles.headerTitleView}>
                <Text style={styles.headerTitle}>Hallway</Text>
              </View>
              <View style={styles.headerTitleView}>
                <Text style={styles.headerTitle}>Bedroom</Text>
              </View>
              <View style={styles.headerTitleView}>
                <Text style={styles.headerTitle}>Diner</Text>
              </View>
              <View style={styles.headerTitleView}>
                <Text style={styles.headerTitle}>W/C Bathrooms</Text>
              </View>
              <View style={styles.headerTitleView}>
                <Text style={styles.headerTitle}>En Ensuite</Text>
              </View>
              <View style={styles.headerTitleView}>
                <Text style={styles.headerTitle}>Action</Text>
              </View>
            </View>
            <View style={{ flexDirection: "column" }}>
              {dynamicInput.length > 0 &&
                dynamicInput.map((el, index) => (
                  <View style={styles.tableBody}>
                    <View style={styles.inputBodyContainer}>
                      <TextInput
                        onChangeText={(txt) => updateValue("item", index, txt)}
                        value={el.item}
                        style={styles.bodyTextInput}
                      />
                    </View>
                    <View style={styles.inputBodyContainer}>
                      <TextInput
                        onChangeText={(txt) =>
                          updateValue("hallway", index, txt)
                        }
                        value={el.hallway}
                        style={styles.bodyTextInput}
                      />
                    </View>
                    <View style={styles.inputBodyContainer}>
                      <TextInput
                        onChangeText={(txt) =>
                          updateValue("bedroom", index, txt)
                        }
                        value={el.bedroom}
                        style={styles.bodyTextInput}
                      />
                    </View>
                    <View style={styles.inputBodyContainer}>
                      <TextInput
                        onChangeText={(txt) => updateValue("room", index, txt)}
                        value={el.room}
                        style={styles.bodyTextInput}
                      />
                    </View>
                    <View style={styles.inputBodyContainer}>
                      <TextInput
                        onChangeText={(txt) =>
                          updateValue("bathrroms", index, txt)
                        }
                        value={el.bathrroms}
                        style={styles.bodyTextInput}
                      />
                    </View>
                    <View style={styles.inputBodyContainer}>
                      <TextInput
                        onChangeText={(txt) =>
                          updateValue("ensuite", index, txt)
                        }
                        value={el.ensuite}
                        style={styles.bodyTextInput}
                      />
                    </View>
                  </View>
                ))}
            </View>
            <View style={styles.tableBody}>
              <View style={styles.inputBodyContainer}>
                <TextInput
                  onChangeText={(txt) => setData({ ...data, item: txt })}
                  value={data.item}
                  style={styles.bodyTextInput}
                />
              </View>
              <View style={styles.inputBodyContainer}>
                <TextInput
                  onChangeText={(txt) => setData({ ...data, hallway: txt })}
                  value={data.hallway}
                  style={styles.bodyTextInput}
                />
              </View>
              <View style={styles.inputBodyContainer}>
                <TextInput
                  onChangeText={(txt) => setData({ ...data, bedroom: txt })}
                  value={data.bedroom}
                  style={styles.bodyTextInput}
                />
              </View>
              <View style={styles.inputBodyContainer}>
                <TextInput
                  onChangeText={(txt) => setData({ ...data, room: txt })}
                  value={data.room}
                  style={styles.bodyTextInput}
                />
              </View>
              <View style={styles.inputBodyContainer}>
                <TextInput
                  onChangeText={(txt) => setData({ ...data, bathrroms: txt })}
                  value={data.bathrroms}
                  style={styles.bodyTextInput}
                />
              </View>
              <View style={styles.inputBodyContainer}>
                <TextInput
                  onChangeText={(txt) => setData({ ...data, ensuite: txt })}
                  value={data.ensuite}
                  style={styles.bodyTextInput}
                />
              </View>

              <View style={styles.inputBodyContainer}>
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={() => addRow()}
                >
                  <Image style={styles.plusBtn} source={plus} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              value={painterName}
              onChangeText={(e) => setPainterName(e)}
              style={styles.inputField}
              placeholder={"Painter Name"}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              value={plotNumber}
              onChangeText={(e) => setPlotNumber(e)}
              style={styles.inputField}
              placeholder={"Plot No"}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              value={type}
              onChangeText={(e) => setType(e)}
              style={styles.inputField}
              placeholder={"Type"}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Signature"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <Text
              onPress={() => showDatepicker()}
              style={{
                width: "100%",
                height: 60,
                paddingTop: 20,
                fontSize: 12,
                color: "#96A8B2",
                fontFamily: "poppins-regular",
              }}
            >
              {new Date(date).toLocaleDateString()}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#000",
              width: "100%",
              height: ".5%",
              marginBottom: 20,
              marginTop: 20,
            }}
          ></View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.commonBtn}
              onPress={() => scopeFormInsert()}
            >
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
  isJobId: state.auth.isJobId
});
const mapDispatchToProps = (dispatch) => ({
  createScopeHandler: (dynamicInput,painterName,signature,plotNumber,type,date,jobID,tabId,token) => dispatch(insertScopeForm(dynamicInput,painterName,signature,plotNumber,type,date,jobID,tabId,token)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Scope);

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
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
  scopeDescriptionView: {
    height: "30%",
    marginTop: 20,
    width: "100%",
  },
  textView: {
    height: "20%",
    width: "100%",
    flexDirection: "row",
  },
  // tableViewContainer:{
  //     paddingLeft:20,
  //     paddingRight:20,
  // },
  tableHeader: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
  },
  headerTitleView: {
    width: "14.2%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 8,
    textAlign: "center",
    fontFamily: "poppins-bold",
  },
  inputView: {
    width: "20%",
  },
  tableBody: {
    width: "100%",
    flexDirection: "row",
  },
  plusBtn: {
    width: 12,
    height: 12,
    justifyContent: "center",
  },
  addBtn: {
    justifyContent: "center",
    backgroundColor: "#F6F9FB",
    borderWidth: 1,
    borderColor: "#E2ECF2",
    padding: 5,
    borderRadius: 14,
  },
  bodyTextInput: {
    width: "90%",
    borderBottomWidth: 1,
    borderBottomColor: "#96A8B2",
    padding: 5,
    fontSize: 12,
    color: "#96A8B2",
    fontFamily: "poppins-regular",
  },
  inputBodyContainer: {
    width: "14.2%",
    justifyContent: "center",
    alignItems: "center",
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
  btnContainer: {
    width: "100%",
    height: "15%",
    marginBottom: 20,
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
});
