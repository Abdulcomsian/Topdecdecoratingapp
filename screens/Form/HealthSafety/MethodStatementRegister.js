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

var plus = require("../../../assets/authScreen/plus.png");
const MethodStatement = () => {
  const [statementArray, setStatementArray] = useState([]);
  const [statementTitle, setStatementTitle] = useState("");
  const [contractorName, setContractorName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [refNo, setRefNo] = useState("");
  const [supervisorName, setSupervisorName] = useState("");
  const [supervisorSignature, setSupervisorSignature] = useState("");
  const [dynamicInput, setdynamicInput] = useState([]);
  const [data, setData] = useState({
    name: "",
        sign: "",
        company: "",
        date: "",
        translation: "",
        translator: "",
  });
  const addStatement = () => {setdynamicInput((oldArray) => [...oldArray, data]);
    setData({
        name: "",
        sign: "",
        company: "",
        date: "",
        translation: "",
        translator: "",
    });
  };
  const statementRegisterForm = () =>{
    console.log("Statement Title  :", statementTitle);
    console.log("Main Contractor  :", contractorName);
    console.log("Project Name :", projectName);
    console.log("Ref No :", refNo);
    console.log("Name Of Supervisor :", supervisorName);
    console.log("Supervisor Sign :", supervisorSignature);
    console.log("Array Data :", dynamicInput);
  }
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          paddingTop: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.titleText}>Method Statement Register</Text>
      </View>
      <ScrollView>
        <View style={styles.formCodnatiner}>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Method Statement Title"}
              value={statementTitle}
              onChangeText={(e) => setStatementTitle(e)}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Main Contractor"}
              value={contractorName}
              onChangeText={(e) => setContractorName(e)}
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
            <TextInput
              style={styles.inputField}
              placeholder={"Ref No"}
              value={refNo}
              onChangeText={(e) => setRefNo(e)}
            />
          </View>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "poppins-regular",
              paddingTop: 10,
              paddingBottom: 20,
            }}
          >
            We, the undersigned, confirm that we have been briefed on / read and
            understood the Method Statement as detailed above, together with the
            Risk Assessments (including COSHH Assessments) associated with the
            works and will ensure that our actions reflect the safe systems of
            work identified therein.
          </Text>
          <View style={styles.tableViewContainer}>
            <View style={styles.tableHeader}>
              <View style={styles.headerHarmFulTitleView}>
                <Text style={styles.headerTitle}>Name</Text>
              </View>
              <View style={styles.headerHarmFulTitleView}>
                <Text style={styles.headerTitle}>Signature</Text>
              </View>
              <View style={styles.headerHarmFulTitleView}>
                <Text style={styles.headerTitle}>Company</Text>
              </View>
              <View style={styles.headerHarmFulTitleView}>
                <Text style={styles.headerTitle}>Date</Text>
              </View>
              <View style={styles.headerHarmFulTitleView}>
                <Text style={styles.headerTitle}>
                  Translation required (Yes/No){" "}
                </Text>
              </View>
              <View style={styles.headerHarmFulTitleView}>
                <Text style={styles.headerTitle}>Name of Translator</Text>
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
                onPress={() => addStatement()}
              >
                <Image style={styles.plusBtn} source={plus} />
              </TouchableOpacity>
            </View>
            {dynamicInput.map((item, index) => (
              <View style={styles.tableBody} key={index}>
                <View style={styles.inputHarmFullBodyContainer}>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder={"Name"}
                    onChangeText={(txt) => updateValue("name", index, txt)}
                      value={item.name}
                  />
                </View>
                <View style={styles.inputHarmFullBodyContainer}>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder={"Signature"}
                    onChangeText={(txt) => updateValue("sign", index, txt)}
                    value={item.sign}
                  />
                </View>
                <View style={styles.inputHarmFullBodyContainer}>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder={"Company"}
                    onChangeText={(txt) => updateValue("company", index, txt)}
                    value={item.company}
                  />
                </View>
                <View style={styles.inputHarmFullBodyContainer}>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder={"Date"}
                  />
                </View>
                <View style={styles.inputHarmFullBodyContainer}>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder={"Yes/No"}
                    onChangeText={(txt) => updateValue("translation", index, txt)}
                    value={item.translation}
                  />
                </View>
                <View style={styles.inputHarmFullBodyContainer}>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder={"Translator"}
                    onChangeText={(txt) => updateValue("translator", index, txt)}
                    value={item.translator}
                  />
                </View>
              </View>
            ))}
            <View style={styles.tableBody}>
                <View style={styles.inputHarmFullBodyContainer}>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder={"Name"}
                    onChangeText={(txt) => setData({ ...data, name: txt })}
                    value={data.name}
                  />
                </View>
                <View style={styles.inputHarmFullBodyContainer}>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder={"Signature"}
                    onChangeText={(txt) => setData({ ...data, sign: txt })}
                    value={data.sign}
                  />
                </View>
                <View style={styles.inputHarmFullBodyContainer}>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder={"Company"}
                    onChangeText={(txt) => setData({ ...data, company: txt })}
                    value={data.company}
                  />
                </View>
                <View style={styles.inputHarmFullBodyContainer}>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder={"Date"}
                    onChangeText={(txt) => setData({ ...data, date: txt })}
                    value={data.date}
                  />
                </View>
                <View style={styles.inputHarmFullBodyContainer}>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder={"Yes/No"}
                    onChangeText={(txt) => setData({ ...data, translation: txt })}
                    value={data.translation}
                  />
                </View>
                <View style={styles.inputHarmFullBodyContainer}>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder={"Translator"}
                    onChangeText={(txt) => setData({ ...data, translator: txt })}
                    value={data.translator}
                  />
                </View>
              </View>
            <View style={styles.inputFieldContainer}>
              <TextInput
                style={styles.inputField}
                placeholder={"Name of Supervisor"}
                value={supervisorName}
                onChangeText={(e) => setSupervisorName(e)}
              />
            </View>
            <View style={styles.inputFieldContainer}>
              <TextInput
                style={styles.inputField}
                placeholder={"Signature"}
                value={supervisorSignature}
                onChangeText={(e) => setSupervisorSignature(e)}
              />
            </View>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "poppins-bold",
                paddingTop: 10,
                paddingBottom: 20,
                textAlign: "center",
              }}
            >
              Once completed, please file a copy in the Site Folder and send a
              copy to our Head Office.
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#000",
              width: "100%",
              height: 2,
              marginBottom:20
            }}
          ></View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.commonBtn}
              onPress={() => statementRegisterForm()}
            >
              <Text style={styles.commonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default MethodStatement;
