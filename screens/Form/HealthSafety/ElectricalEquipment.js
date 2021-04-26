import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Text } from "native-base";
import styles from "../../../assets/css/styles";
import DateTimePicker from "@react-native-community/datetimepicker";

var plus = require("../../../assets/authScreen/plus.png");
const ElectricalEquipment = () => {
  const [equipmentRow, setEquipmentRow] = useState([]);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [showDate, setShowDate] = useState(false);
  const [contractorName, setContractorName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [dynamicInput, setdynamicInput] = useState([]);
  const [supervisorSignature, setSupervisorSignature] = useState("");
  const [data, setData] = useState({
    equ: "",
    date: "",
    serial: "",
    local: "",
    owner: "",
    test: "",
    nextDate: "",
    dateOfSite: "",
    comments: "",
  });
  const addEquipmentRegister = () => {
    setdynamicInput((oldArray) => [...oldArray, data]);
    setData({
      equ: "",
      date: "",
      serial: "",
      local: "",
      owner: "",
      test: "",
      nextDate: "",
      dateOfSite: "",
      comments: "",
    });
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
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDate(Platform.OS === "ios" ? true : false);
    setDate(new Date(currentDate).toLocaleDateString());
  };
  const electricalEquipmentFormInsert = () => {
    console.log("Name Of Contractor :", contractorName);
    console.log("Project Name :", projectName);
    console.log("Supervisor Sign :", supervisorSignature);
    console.log("Date :", date);
    console.log("Dynamic Input :", dynamicInput);
  };
  return (
    <View style={styles.mainContainer}>
      {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          display="default"
          onChange={onDateChange}
          format="DD-MM-YYYY"
        />
      )}
      <View
        style={{
          paddingTop: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.titleText}>ELECTRICAL EQUIPMENT REGISTER</Text>
        <Text style={{ fontSize: 8, fontFamily: "poppins-regular" }}>
          (Electrical portable tools, lights and leads test record)
        </Text>
      </View>
      <ScrollView>
        <View style={styles.formCodnatiner}>
          <View style={styles.inputFieldContainer}>
            <TextInput
              value={contractorName}
              onChangeText={(e) => setContractorName(e)}
              style={styles.inputField}
              placeholder={"Main Contractor"}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              value={projectName}
              onChangeText={(e) => setProjectName(e)}
              style={styles.inputField}
              placeholder={"Project"}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              value={supervisorSignature}
              onChangeText={(e) => setSupervisorSignature(e)}
              style={styles.inputField}
              placeholder={"Supervisor Print & Sign"}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <Text
              onPress={() => showDatepicker("Date")}
              style={[styles.inputField, { paddingTop: 15 }]}
            >
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
            }}
          >
            All portable electrical equipment is subject to 3 monthly portable
            appliance testing to be carried out by a competent person
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
              }}
            >
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => addEquipmentRegister()}
              >
                <Image style={styles.plusBtn} source={plus} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "column" }}>
              {dynamicInput.length > 0 &&
                dynamicInput.map((el, index) => (
                  <View style={styles.tableBody} key={index}>
                    <View style={styles.inputEquipmentBodyContainer}>
                      <TextInput
                        value={el.equ}
                        onChangeText={(txt) => updateValue("equ", index, txt)}
                        style={styles.bodyTextInput}
                        placeholder={"Equipment"}
                      />
                    </View>
                    <View style={styles.inputEquipmentBodyContainer}>
                      <TextInput
                        value={el.date}
                        onChangeText={(txt) => updateValue("date", index, txt)}
                        style={styles.bodyTextInput}
                        placeholder={"On-Site"}
                      />
                    </View>
                    <View style={styles.inputEquipmentBodyContainer}>
                      <TextInput
                        value={el.serial}
                        onChangeText={(txt) =>
                          updateValue("serial", index, txt)
                        }
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
                        value={el.owner}
                        onChangeText={(txt) => updateValue("owner", index, txt)}
                        style={styles.bodyTextInput}
                        placeholder={"Top Dec"}
                      />
                    </View>
                    <View style={styles.inputEquipmentBodyContainer}>
                      <TextInput
                        value={el.test}
                        onChangeText={(txt) => updateValue("test", index, txt)}
                        style={styles.bodyTextInput}
                        placeholder={"Last Test"}
                      />
                    </View>
                    <View style={styles.inputEquipmentBodyContainer}>
                      <TextInput
                        value={el.nextDate}
                        onChangeText={(txt) =>
                          updateValue("nextDate", index, txt)
                        }
                        style={styles.bodyTextInput}
                        placeholder={"Duw Date"}
                      />
                    </View>
                    <View style={styles.inputEquipmentBodyContainer}>
                      <TextInput
                        value={el.dateOfSite}
                        onChangeText={(txt) =>
                          updateValue("dateOfSite", index, txt)
                        }
                        style={styles.bodyTextInput}
                        placeholder={"Site"}
                      />
                    </View>
                    <View style={styles.inputEquipmentBodyContainer}>
                      <TextInput
                        value={el.comments}
                        onChangeText={(txt) =>
                          updateValue("comments", index, txt)
                        }
                        style={styles.bodyTextInput}
                        placeholder={"Comments"}
                      />
                    </View>
                  </View>
                ))}
              <View style={styles.tableBody}>
                <View style={styles.inputEquipmentBodyContainer}>
                  <TextInput
                    onChangeText={(txt) => setData({ ...data, equ: txt })}
                    value={data.equ}
                    style={styles.bodyTextInput}
                    placeholder={"Equipment"}
                  />
                </View>
                <View style={styles.inputEquipmentBodyContainer}>
                  <TextInput
                    onChangeText={(txt) => setData({ ...data, date: txt })}
                    value={data.date}
                    style={styles.bodyTextInput}
                    placeholder={"On-Site"}
                  />
                </View>
                <View style={styles.inputEquipmentBodyContainer}>
                  <TextInput
                    onChangeText={(txt) => setData({ ...data, serial: txt })}
                    value={data.serial}
                    style={styles.bodyTextInput}
                    placeholder={"Serial No"}
                  />
                </View>
                <View style={styles.inputEquipmentBodyContainer}>
                  <TextInput
                    onChangeText={(txt) => setData({ ...data, local: txt })}
                    value={data.local}
                    style={styles.bodyTextInput}
                    placeholder={"Local No"}
                  />
                </View>
                <View style={styles.inputEquipmentBodyContainer}>
                  <TextInput
                    onChangeText={(txt) => setData({ ...data, owner: txt })}
                    value={data.owner}
                    style={styles.bodyTextInput}
                    placeholder={"Top Dec"}
                  />
                </View>
                <View style={styles.inputEquipmentBodyContainer}>
                  <TextInput
                    onChangeText={(txt) => setData({ ...data, test: txt })}
                    value={data.test}
                    style={styles.bodyTextInput}
                    placeholder={"Last Test"}
                  />
                </View>
                <View style={styles.inputEquipmentBodyContainer}>
                  <TextInput
                    onChangeText={(txt) => setData({ ...data, nextDate: txt })}
                    value={data.nextDate}
                    style={styles.bodyTextInput}
                    placeholder={"Duw Date"}
                  />
                </View>
                <View style={styles.inputEquipmentBodyContainer}>
                  <TextInput
                    onChangeText={(txt) =>
                      setData({ ...data, dateOfSite: txt })
                    }
                    value={data.dateOfSite}
                    style={styles.bodyTextInput}
                    placeholder={"Site"}
                  />
                </View>
                <View style={styles.inputEquipmentBodyContainer}>
                  <TextInput
                    onChangeText={(txt) => setData({ ...data, comments: txt })}
                    value={data.comments}
                    style={styles.bodyTextInput}
                    placeholder={"Comments"}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                height: 2,
                backgroundColor: "#000",
                marginTop: 20,
              }}
            ></View>
            <Text
              style={{
                fontFamily: "poppins-bold",
                fontSize: 12,
                paddingTop: 10,
                textAlign: "center",
              }}
            >
              Once completed, please file a copy in the Site Folder and send a
              copy to our Head Office.
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
              onPress={() => electricalEquipmentFormInsert()}
            >
              <Text style={styles.commonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default ElectricalEquipment;
