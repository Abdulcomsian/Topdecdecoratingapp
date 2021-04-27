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
const IssueCard = () => {
  const [issueArray, setIssueArray] = useState([]);
  const [dynamicInput, setdynamicInput] = useState([]);
  const [contractorName, setContractorName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [nameOfOperative, setNameOfOperative] = useState("");
  const [data, setData] = useState({
    item: "",
    no: "",
    type: "",
    date: "",
    supervisor: "",
    sign: "",
  });

  const addIssue = () => {
    setdynamicInput((oldArray) => [...oldArray, data]);
    setData({
      item: "",
      no: "",
      type: "",
      date: "",
      supervisor: "",
      sign: "",
    });
  };
  const updateValue = (key, index, value) => {
    let preData = [...dynamicInput];
    preData[index][key] = value;
    setdynamicInput(preData);
  };
  const issueRecordForm = () => {
    console.log("Main Contractor  :", contractorName);
    console.log("Project Name :", projectName);
    console.log("Operative Name :", nameOfOperative);
    console.log("Array :", dynamicInput);
  };
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          paddingTop: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.titleText}>
          PERSONAL PROTECTIVE EQUIPMENT ISSUE RECORD CARD{" "}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "poppins-regular",
            paddingTop: 10,
            paddingBottom: 20,
            textAlign: "center",
          }}
        >
          (ONE SHEET PER OPERATIVE / EMPLOYEE){" "}
        </Text>
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
            <TextInput
              style={styles.inputField}
              placeholder={"Project"}
              value={projectName}
              onChangeText={(e) => setProjectName(e)}
            />
          </View>
          <Text
            style={{ fontSize: 12, fontFamily: "poppins-bold", paddingTop: 10 }}
          >
            Name of Operative / Direct Employee:
          </Text>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Name of Operative / Direct Employee:"}
              value={nameOfOperative}
              onChangeText={(e) => setNameOfOperative(e)}
            />
          </View>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "poppins-regular",
              paddingTop: 10,
            }}
          >
            ALL SELF EMPLOYED/EMPLOYEES PROVIDED WITH PPE MUST TAKE REASONABLE
            STEPS TO ENSURE PPE IS PROPERLY USED IN ACCORDANCE WITH THE TRAINING
            RECEIVED. ANY LOSS OR DEFECT OF THE P.P.E TO BE REPORTED TO YOUR
            SUPERVISOR.
          </Text>
          <Text
            style={{
              fontSize: 8,
              fontFamily: "poppins-regular",
              paddingTop: 10,
            }}
          >
            1. I acknowledge receipt of the following items of personal
            protective equipment issued to me, by appending my signature
            adjacent to the item entered on this form.
          </Text>
          <Text
            style={{
              fontSize: 8,
              fontFamily: "poppins-regular",
              paddingTop: 10,
            }}
          >
            2. I fully understand that I must wear the correct PPE as identified
            in site rules and project/work activity risk assessments when
            undertaking the work or using a particular tool or equipment. This
            in accordance to the training I have received.
          </Text>
          <Text
            style={{
              fontSize: 8,
              fontFamily: "poppins-regular",
              paddingTop: 10,
            }}
          >
            3. I will ensure that the PPE is properly cared for and maintained
            in accordance with instruction given. When not in use my PPE will be
            kept secure in accommodation provided or as advised.
          </Text>
          <Text
            style={{
              fontSize: 8,
              fontFamily: "poppins-regular",
              paddingTop: 10,
              paddingBottom: 20,
            }}
          >
            4. I will report all loss or defects to the issued PPE to my
            supervisor.
          </Text>
          <View style={styles.tableViewContainer}>
            <View style={styles.tableHeader}>
              <View style={styles.headerHarmFulTitleView}>
                <Text style={styles.headerTitle}>ITEM</Text>
              </View>
              <View style={styles.headerHarmFulTitleView}>
                <Text style={styles.headerTitle}>No</Text>
              </View>
              <View style={styles.headerHarmFulTitleView}>
                <Text style={styles.headerTitle}>TYPE/Ser No</Text>
              </View>
              <View style={styles.headerHarmFulTitleView}>
                <Text style={styles.headerTitle}>DATE OF ISSUE</Text>
              </View>
              <View style={styles.headerHarmFulTitleView}>
                <Text style={styles.headerTitle}>NAME OF SUPERVISOR</Text>
              </View>
              <View style={styles.headerHarmFulTitleView}>
                <Text style={styles.headerTitle}>SIGNATURE</Text>
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
                onPress={() => addIssue()}
              >
                <Image style={styles.plusBtn} source={plus} />
              </TouchableOpacity>
            </View>
            {dynamicInput.map((item, index) => (
              <View style={styles.tableBody} key={index}>
                <View style={styles.inputHarmFullBodyContainer}>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder={"Item"}
                    onChangeText={(txt) => updateValue("item", index, txt)}
                    value={item.item}
                  />
                </View>
                <View style={styles.inputHarmFullBodyContainer}>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder={"No"}
                    onChangeText={(txt) => updateValue("no", index, txt)}
                    value={item.no}
                  />
                </View>
                <View style={styles.inputHarmFullBodyContainer}>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder={"Type"}
                    onChangeText={(txt) => updateValue("type", index, txt)}
                    value={item.type}
                  />
                </View>
                <View style={styles.inputHarmFullBodyContainer}>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder={"Date"}
                    onChangeText={(txt) => updateValue("date", index, txt)}
                    value={item.date}
                  />
                </View>
                <View style={styles.inputHarmFullBodyContainer}>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder={"Supervisor"}
                    onChangeText={(txt) =>
                      updateValue("supervisor", index, txt)
                    }
                    value={item.supervisor}
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
              </View>
            ))}
            <View style={styles.tableBody}>
              <View style={styles.inputHarmFullBodyContainer}>
                <TextInput
                  style={styles.bodyTextInput}
                  placeholder={"Item"}
                  onChangeText={(txt) => setData({ ...data, item: txt })}
                  value={data.item}
                />
              </View>
              <View style={styles.inputHarmFullBodyContainer}>
                <TextInput
                  style={styles.bodyTextInput}
                  placeholder={"No"}
                  onChangeText={(txt) => setData({ ...data, no: txt })}
                  value={data.no}
                />
              </View>
              <View style={styles.inputHarmFullBodyContainer}>
                <TextInput
                  style={styles.bodyTextInput}
                  placeholder={"Type"}
                  onChangeText={(txt) => setData({ ...data, type: txt })}
                  value={data.type}
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
                  placeholder={"Supervisor"}
                  onChangeText={(txt) => setData({ ...data, supervisor: txt })}
                  value={data.supervisor}
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
              marginBottom: 20,
            }}
          ></View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.commonBtn}
              onPress={() => issueRecordForm()}
            >
              <Text style={styles.commonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default IssueCard;
