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
import styles from "../../../assets/css/styles";
import { insertVerificationForm } from "../../../Redux/action/auth/authActionTypes";
import { connect } from "react-redux";

var plus = require("../../../assets/authScreen/plus.png");
const VerificationOfWork = (props) => {
  const { navigation, token, isSuccess, isSuccessMsg } = props;
  const jobID = Math.floor(Math.random() * 100) + 1;
  const tabId = props.route.params.tabName;
  const [dynamicInput, setdynamicInput] = useState([]);
  const [projectName, setProjectName] = useState([]);
  const [idRef, setIdRef] = useState([]);
  const [decoratorName, setDecoratorName] = useState([]);
  const [data, setData] = useState({
    days: "",
    work: "",
    date: "",
    project: "",
    plotArea: "",
    description: "",
    price: "",
    remedial: "",
    siNumber: "",
    confrimWork: "",
  });
  const addVerificationRow = () => {
    setdynamicInput((oldArray) => [...oldArray, data]);
    setData({
      days: "",
      work: "",
      date: "",
      project: "",
      plotArea: "",
      description: "",
      price: "",
      remedial: "",
      siNumber: "",
      confrimWork: "",
    });
  };
  const updateValue = (key, index, value) => {
    let preData = [...dynamicInput];
    preData[index][key] = value;
    setdynamicInput(preData);
  };
  const verificationWorkFormInsert = () => {
    if (projectName != "" && idRef != "" && decoratorName != "") {
      props.createVerificationWorkHandler(
        projectName,
        idRef,
        decoratorName,
        dynamicInput,
        jobID,
        tabId,
        token
      );
    } else {
      alert("Please Insert All Fields CareFully !");
      return false;
    }
  };

  return (
    <View
      style={[
        styles.mainContainer,
        { paddingLeft: 20, paddingRight: 20, marginTop: 50 },
      ]}
    >
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.inputFieldContainer}>
          <TextInput
            value={projectName}
            onChangeText={(e) => setProjectName(e)}
            style={styles.inputField}
            placeholder={"Project Name"}
          />
        </View>
        <View style={styles.inputFieldContainer}>
          <TextInput
            value={idRef}
            onChangeText={(e) => setIdRef(e)}
            style={styles.inputField}
            placeholder={"Id Ref"}
          />
        </View>
        <View style={styles.inputFieldContainer}>
          <TextInput
            value={decoratorName}
            onChangeText={(e) => setDecoratorName(e)}
            style={styles.inputField}
            placeholder={"Decorator Name"}
          />
        </View>
        <View style={styles.tableViewContainer}>
          <View
            style={[
              styles.tableHeader,
              { marginTop: 30, paddingRight: 5, paddingLeft: 5 },
            ]}
          >
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
            }}
          >
            <View style={styles.inputButtonBodyContainer}>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => addVerificationRow()}
              >
                <Image style={styles.plusBtn} source={plus} />
              </TouchableOpacity>
            </View>
          </View>
          {dynamicInput.length > 0 &&
            dynamicInput.map((el, index) => (
              <View
                style={[styles.tableBody, { justifyContent: "space-between" }]}
                key={index}
              >
                <View style={styles.inputBodyContainer}>
                  <TextInput
                    onChangeText={(txt) => updateValue("days", index, txt)}
                    value={el.days}
                    style={styles.bodyTextInput}
                    placeholder={"Days"}
                  />
                </View>
                <View style={styles.inputBodyContainer}>
                  <TextInput
                    onChangeText={(txt) => updateValue("work", index, txt)}
                    value={el.work}
                    style={styles.bodyTextInput}
                    placeholder={"Manager"}
                  />
                </View>
                <View style={styles.inputBodyContainer}>
                  <TextInput
                    onChangeText={(txt) => updateValue("date", index, txt)}
                    value={el.date}
                    style={styles.bodyTextInput}
                    placeholder={"Date"}
                  />
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
                  <TextInput
                    onChangeText={(txt) => updateValue("plotArea", index, txt)}
                    value={el.plotArea}
                    style={styles.bodyTextInput}
                    placeholder={"Plot"}
                  />
                </View>
                <View style={styles.inputBodyContainer}>
                  <TextInput
                    onChangeText={(txt) =>
                      updateValue("description", index, txt)
                    }
                    value={el.description}
                    style={styles.bodyTextInput}
                    placeholder={"Description"}
                  />
                </View>
                <View style={styles.inputBodyContainer}>
                  <TextInput
                    onChangeText={(txt) => updateValue("price", index, txt)}
                    value={el.price}
                    style={styles.bodyTextInput}
                    placeholder={"Price"}
                  />
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
                  <TextInput
                    onChangeText={(txt) => updateValue("siNumber", index, txt)}
                    value={el.siNumber}
                    style={styles.bodyTextInput}
                    placeholder={"No."}
                  />
                </View>
                <View style={styles.inputBodyContainer}>
                  <TextInput
                    onChangeText={(txt) =>
                      updateValue("confrimWork", index, txt)
                    }
                    value={el.confrimWork}
                    style={styles.bodyTextInput}
                    placeholder={"Work"}
                  />
                </View>
              </View>
            ))}
          <View style={[styles.tableBody, { justifyContent: "space-between" }]}>
            <View style={styles.inputBodyContainer}>
              <TextInput
                onChangeText={(txt) => setData({ ...data, days: txt })}
                value={data.days}
                style={styles.bodyTextInput}
                placeholder={"Day"}
              />
            </View>
            <View style={styles.inputBodyContainer}>
              <TextInput
                onChangeText={(txt) => setData({ ...data, work: txt })}
                value={data.work}
                style={styles.bodyTextInput}
                placeholder={"Block"}
              />
            </View>
            <View style={styles.inputBodyContainer}>
              <TextInput
                onChangeText={(txt) => setData({ ...data, date: txt })}
                value={data.date}
                style={styles.bodyTextInput}
                placeholder={"level"}
              />
            </View>
            <View style={styles.inputBodyContainer}>
              <TextInput
                onChangeText={(txt) => setData({ ...data, project: txt })}
                value={data.project}
                style={styles.bodyTextInput}
                placeholder={"Rooms"}
              />
            </View>
            <View style={styles.inputBodyContainer}>
              <TextInput
                onChangeText={(txt) => setData({ ...data, plotArea: txt })}
                value={data.plotArea}
                style={styles.bodyTextInput}
                placeholder={"Price"}
              />
            </View>
            <View style={styles.inputBodyContainer}>
              <TextInput
                onChangeText={(txt) => setData({ ...data, description: txt })}
                value={data.description}
                style={styles.bodyTextInput}
                placeholder={"Plot"}
              />
            </View>
            <View style={styles.inputBodyContainer}>
              <TextInput
                onChangeText={(txt) => setData({ ...data, price: txt })}
                value={data.price}
                style={styles.bodyTextInput}
                placeholder={"Days"}
              />
            </View>
            <View style={styles.inputBodyContainer}>
              <TextInput
                onChangeText={(txt) => setData({ ...data, remedial: txt })}
                value={data.remedial}
                style={styles.bodyTextInput}
                placeholder={"Date"}
              />
            </View>
            <View style={styles.inputBodyContainer}>
              <TextInput
                onChangeText={(txt) => setData({ ...data, siNumber: txt })}
                value={data.siNumber}
                style={styles.bodyTextInput}
                placeholder={"Date"}
              />
            </View>
            <View style={styles.inputBodyContainer}>
              <TextInput
                onChangeText={(txt) => setData({ ...data, confrimWork: txt })}
                value={data.confrimWork}
                style={styles.bodyTextInput}
                placeholder={"Date"}
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#000",
              width: "100%",
              height: "1%",
              marginBottom: 20,
              marginTop: 20,
            }}
          ></View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.commonBtn}
              onPress={() => verificationWorkFormInsert()}
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
});
const mapDispatchToProps = (dispatch) => ({
  createVerificationWorkHandler: (
    projectName,
    idRef,
    decoratorName,
    dynamicInput,
    jobID,
    tabId,
    token
  ) =>
    dispatch(
      insertVerificationForm(
        projectName,
        idRef,
        decoratorName,
        dynamicInput,
        jobID,
        tabId,
        token
      )
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(VerificationOfWork);
