import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { CheckBox, Text } from "native-base";
import styles from "../../../assets/css/styles";
import DateTimePicker from "@react-native-community/datetimepicker";

var plus = require("../../../assets/authScreen/plus.png");
const CleanUp = () => {
  const [date, setDate] = useState(new Date());
  const [dateSupervisor, setDateSupervisor] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [showDate, setShowDate] = useState(false);
  const [showSupervisor, setShowSupervisor] = useState(false);
  const [dynamicInput, setdynamicInput] = useState([]);
  const [supervisorSignature, setSupervisorSignature] =useState("")
  const [contractorName, setContractorName] =useState("")
  const [projectName, setProjectName] =useState("")
  const [nameOperatives, setNameOperatives] =useState("")
  const [data, setData] = useState({
    block: "",
    level: "",
    plot: "",
    area: "",
    cleanItem: "",
    date: "",
    comment: "",
  });
  const addCleanUpRow = () => {
    setdynamicInput((oldArray) => [...oldArray, data]);

    setData({
      block: "",
      level: "",
      plot: "",
      area: "",
      cleanItem: "",
      date: "",
      comment: "",
    });
  };
  const updateValue = (key, index, value) => {
    let preData = [...dynamicInput];
    preData[index][key] = value;
    setdynamicInput(preData);
  };
  const showMode = (currentMode, type) => {
    if (type == "Date") {
      setShowDate(true);
      setMode(currentMode);
    } else {
      setShowSupervisor(true);
      setMode(currentMode);
    }
  };
  const showDatepicker = (type) => {
    if (type == "Date") {
      showMode("date", "Date");
    } else {
      showMode("date", "DateSupervisor");
    }
  };
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDate(Platform.OS === "ios" ? true : false);
    setDate(new Date(currentDate).toLocaleDateString());
  };
  const onSupervisorChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowSupervisor(Platform.OS === "ios" ? true : false);
    setDateSupervisor(new Date(currentDate).toLocaleDateString());
  };
  const cleanUpFormInsert = () =>{
    console.log("Name Of Contractor :",contractorName)
    console.log("Project Name :",projectName)
    console.log("Name of Operatives :",nameOperatives)
    console.log("Date :",date)
    console.log("Dynamic Input :",dynamicInput)
    console.log("Supervisor Sign :",supervisorSignature)
    console.log("Supervisor Date :",dateSupervisor)
  }
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
      {showSupervisor && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateSupervisor}
          mode={mode}
          display="default"
          onChange={onSupervisorChange}
          format="DD-MM-YYYY"
        />
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Notice to Clean up</Text>
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
            <TextInput value={projectName}
                onChangeText={(e) => setProjectName(e)} style={styles.inputField} placeholder={"Project"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
            value={nameOperatives}
            onChangeText={(e) => setNameOperatives(e)}
              style={styles.inputField}
              placeholder={"Name of Operative/s"}
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

          <View style={styles.tableViewContainer}>
            <View style={styles.tableHeader}>
              <View style={styles.headerCleanTitleView}>
                <Text style={styles.headerTitle}>Block</Text>
              </View>
              <View style={styles.headerCleanTitleView}>
                <Text style={styles.headerTitle}>Level</Text>
              </View>
              <View style={styles.headerCleanTitleView}>
                <Text style={styles.headerTitle}>Plot/s</Text>
              </View>
              <View style={styles.headerCleanTitleView}>
                <Text style={styles.headerTitle}>Areas</Text>
              </View>
              <View style={styles.headerCleanTitleView}>
                <Text style={styles.headerTitle}>Item Clean</Text>
              </View>
              <View style={styles.headerCleanTitleView}>
                <Text style={styles.headerTitle}>Date completed</Text>
              </View>
              <View style={styles.headerCleanTitleView}>
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
                onPress={() => addCleanUpRow()}
              >
                <Image style={styles.plusBtn} source={plus} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "column" }}>
              {dynamicInput.length > 0 &&
                dynamicInput.map((el, index) => (
                  <View style={styles.tableBody} key={index}>
                    <View style={styles.inputCleanBodyContainer}>
                      <TextInput
                        value={el.block}
                        onChangeText={(txt) => updateValue("block", index, txt)}
                        style={styles.bodyTextInput}
                        placeholder={"Block"}
                      />
                    </View>
                    <View style={styles.inputCleanBodyContainer}>
                      <TextInput
                        value={el.level}
                        onChangeText={(txt) => updateValue("level", index, txt)}
                        style={styles.bodyTextInput}
                        placeholder={"Level"}
                      />
                    </View>
                    <View style={styles.inputCleanBodyContainer}>
                      <TextInput
                        value={el.plot}
                        onChangeText={(txt) => updateValue("plot", index, txt)}
                        style={styles.bodyTextInput}
                        placeholder={"Plots"}
                      />
                    </View>
                    <View style={styles.inputCleanBodyContainer}>
                      <TextInput
                        value={el.area}
                        onChangeText={(txt) => updateValue("area", index, txt)}
                        style={styles.bodyTextInput}
                        placeholder={"Area"}
                      />
                    </View>
                    <View style={styles.inputCleanBodyContainer}>
                      <TextInput
                        value={el.cleanItem}
                        onChangeText={(txt) => updateValue("clean", index, txt)}
                        style={styles.bodyTextInput}
                        placeholder={"Clean"}
                      />
                    </View>
                    <View style={styles.inputCleanBodyContainer}>
                      <TextInput
                        value={el.date}
                        onChangeText={(txt) => updateValue("date", index, txt)}
                        style={styles.bodyTextInput}
                        placeholder={"Date"}
                      />
                    </View>
                    <View style={styles.inputCleanBodyContainer}>
                      <TextInput
                        value={el.comment}
                        onChangeText={(txt) =>
                          updateValue("comment", index, txt)
                        }
                        style={styles.bodyTextInput}
                        placeholder={"Comments"}
                      />
                    </View>
                  </View>
                ))}
              <View style={styles.tableBody}>
                <View style={styles.inputCleanBodyContainer}>
                  <TextInput
                    onChangeText={(txt) => setData({ ...data, block: txt })}
                    value={data.block}
                    style={styles.bodyTextInput}
                    placeholder={"Block"}
                  />
                </View>
                <View style={styles.inputCleanBodyContainer}>
                  <TextInput
                    onChangeText={(txt) => setData({ ...data, level: txt })}
                    value={data.level}
                    style={styles.bodyTextInput}
                    placeholder={"Level"}
                  />
                </View>
                <View style={styles.inputCleanBodyContainer}>
                  <TextInput
                    onChangeText={(txt) => setData({ ...data, plot: txt })}
                    value={data.plot}
                    style={styles.bodyTextInput}
                    placeholder={"Plots"}
                  />
                </View>
                <View style={styles.inputCleanBodyContainer}>
                  <TextInput
                    onChangeText={(txt) => setData({ ...data, area: txt })}
                    value={data.area}
                    style={styles.bodyTextInput}
                    placeholder={"Area"}
                  />
                </View>
                <View style={styles.inputCleanBodyContainer}>
                  <TextInput
                    onChangeText={(txt) => setData({ ...data, cleanItem: txt })}
                    value={data.cleanItem}
                    style={styles.bodyTextInput}
                    placeholder={"Clean"}
                  />
                </View>
                <View style={styles.inputCleanBodyContainer}>
                  <TextInput
                    onChangeText={(txt) => setData({ ...data, date: txt })}
                    value={data.date}
                    style={styles.bodyTextInput}
                    placeholder={"Date"}
                  />
                </View>
                <View style={styles.inputCleanBodyContainer}>
                  <TextInput
                    onChangeText={(txt) => setData({ ...data, comment: txt })}
                    value={data.comment}
                    style={styles.bodyTextInput}
                    placeholder={"Comments"}
                  />
                </View>
              </View>
            </View>
            <View style={styles.inputFieldContainer}>
              <TextInput
                value={supervisorSignature}
                onChangeText={(e) => setSupervisorSignature(e)}
                style={styles.inputField}
                placeholder={"Supervisor (Print & Sign)"}
              />
            </View>
            <View style={styles.inputFieldContainer}>
              <Text
                onPress={() => showDatepicker("DateSupervisor")}
                style={[styles.inputField, { paddingTop: 15 }]}
              >
                {new Date(dateSupervisor).toLocaleDateString()}
              </Text>
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
              }}
            >
              Once completed, please file a copy in the Site Folder and send a
              copy to our Head Office.{" "}
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
              onPress={() => cleanUpFormInsert()}
            >
              <Text style={styles.commonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default CleanUp;
