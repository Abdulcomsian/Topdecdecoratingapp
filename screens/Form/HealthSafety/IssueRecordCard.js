import React, { useState } from "react";
import { View, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Text, CheckBox } from "native-base";
import styles from "../../../assets/css/styles";
import SignatureComponent from "../../../components/SignatureComponent";
import DateTimePickerModal from "react-native-modal-datetime-picker";

var plus = require("../../../assets/authScreen/plus.png");
const IssueCard = (props) => {
  const [issueArray, setIssueArray] = useState([]);
  const [dynamicInput, setdynamicInput] = useState([{
    item: "",
    no: "",
    type: "",
    date: new Date().toLocaleDateString(),
    supervisor: "",
    sign: "",
  }]);
  const [contractorName, setContractorName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [nameOfOperative, setNameOfOperative] = useState("");


  const addIssue = () => {
    setdynamicInput((oldArray) => [...oldArray, {
      item: "",
      no: "",
      type: "",
      date: new Date().toLocaleDateString(),
      supervisor: "",
      sign: "",
    }]);
  };
  const updateValue = (key, index, value) => {
    let preData = [...dynamicInput];
    preData[index][key] = value;
    setdynamicInput(preData);
  };

  const [signature, setSignature] = useState({
    bool: false,
    isSign: false,
    index: -1,
  });
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState({
    isVisible: false,
    index: -1,
  });

  
  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow({ ...show, isVisible: false, index: -1 });
    let copyArr = [...dynamicInput];
    copyArr[show.index].date = currentDate.toLocaleDateString();
    setdynamicInput(copyArr);
  };

  const showDatepicker = (index = -1) => {
    
    setShow({ ...show, isVisible: true, index: index });
  };

  const issueRecordForm = () => {
    console.log("Main Contractor  :", contractorName);
    console.log("Project Name :", projectName);
    console.log("Operative Name :", nameOfOperative);
    console.log("Array :", dynamicInput);
    props.updateHealthReport(props?.route?.params?.index);
    props.navigation.pop();
  };
  return (
    <View style={styles.mainContainer}>
      <DateTimePickerModal
        isVisible={show.isVisible}
        date={date ? date : new Date()}
        mode={"date"}
        is24Hour={true}
        display="default"
        onConfirm={(date) => onChange(date)}
        onCancel={() => setShow({ isVisible: false, index: -1 })}
        cancelTextIOS="Cancel"
        confirmTextIOS="Confirm"
      />
      {signature.bool ? (
        <SignatureComponent
          returnImage={(uri) => {
              let copydata = [...dynamicInput];
              copydata[signature.index].sign = uri;
              setdynamicInput(copydata);
              setSignature({
                ...signature.isSign,
                isSign: false,
                bool: false,
                index: -1,
              });
            }}
        />
      ) : (
        <>
      <View
        style={{
          paddingTop: 30,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Text style={styles.titleText}>PERSONAL PROTECTIVE EQUIPMENT ISSUE RECORD CARD </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "poppins-regular",
            paddingTop: 10,
            paddingBottom: 20,
            textAlign: "center",
          }}>
          (ONE SHEET PER OPERATIVE / EMPLOYEE){" "}
        </Text>
      </View>
      <ScrollView>
        <View style={styles.formCodnatiner}>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Main Contractor"} value={contractorName} onChangeText={(e) => setContractorName(e)} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Project"} value={projectName} onChangeText={(e) => setProjectName(e)} />
          </View>
          <Text style={{ fontSize: 12, fontFamily: "poppins-bold", paddingTop: 10 }}>Name of Operative / Direct Employee:</Text>
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
            }}>
            ALL SELF EMPLOYED/EMPLOYEES PROVIDED WITH PPE MUST TAKE REASONABLE STEPS TO ENSURE PPE IS PROPERLY USED IN ACCORDANCE WITH THE TRAINING RECEIVED.
            ANY LOSS OR DEFECT OF THE P.P.E TO BE REPORTED TO YOUR SUPERVISOR.
          </Text>
          <Text
            style={{
              fontSize: 8,
              fontFamily: "poppins-regular",
              paddingTop: 10,
            }}>
            1. I acknowledge receipt of the following items of personal protective equipment issued to me, by appending my signature adjacent to the item
            entered on this form.
          </Text>
          <Text
            style={{
              fontSize: 8,
              fontFamily: "poppins-regular",
              paddingTop: 10,
            }}>
            2. I fully understand that I must wear the correct PPE as identified in site rules and project/work activity risk assessments when undertaking the
            work or using a particular tool or equipment. This in accordance to the training I have received.
          </Text>
          <Text
            style={{
              fontSize: 8,
              fontFamily: "poppins-regular",
              paddingTop: 10,
            }}>
            3. I will ensure that the PPE is properly cared for and maintained in accordance with instruction given. When not in use my PPE will be kept secure
            in accommodation provided or as advised.
          </Text>
          <Text
            style={{
              fontSize: 8,
              fontFamily: "poppins-regular",
              paddingTop: 10,
              paddingBottom: 20,
            }}>
            4. I will report all loss or defects to the issued PPE to my supervisor.
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
              }}>
              <TouchableOpacity style={styles.addBtn} onPress={() => addIssue()}>
                <Image style={styles.plusBtn} source={plus} />
              </TouchableOpacity>
            </View>
            {dynamicInput.map((item, index) => (
              <View style={styles.tableBody} key={index}>
                <View style={styles.inputHarmFullBodyContainer}>
                  <TextInput style={styles.bodyTextInput} placeholder={"Item"} onChangeText={(txt) => updateValue("item", index, txt)} value={item.item} />
                </View>
                <View style={styles.inputHarmFullBodyContainer}>
                  <TextInput style={styles.bodyTextInput} placeholder={"No"} onChangeText={(txt) => updateValue("no", index, txt)} value={item.no} />
                </View>
                <View style={styles.inputHarmFullBodyContainer}>
                  <TextInput style={styles.bodyTextInput} placeholder={"Type"} onChangeText={(txt) => updateValue("type", index, txt)} value={item.type} />
                </View>
                <View style={styles.inputHarmFullBodyContainer}>
                <Text
                            onPress={() => showDatepicker(index)}
                            style={{
                              width:"90%",
                              height:39,
                               borderBottomWidth: 1,
                               borderBottomColor: "#96A8B2",
                               padding: 5,
                               fontSize: 8,
                               color: "#96A8B2",
                               fontFamily: "poppins-regular",
                               paddingTop: 12,
                               marginRight:5
                            }}
                          >
                            {new Date(item.date).toLocaleDateString()}
                          </Text>
                </View>
                <View style={styles.inputHarmFullBodyContainer}>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder={"Supervisor"}
                    onChangeText={(txt) => updateValue("supervisor", index, txt)}
                    value={item.supervisor}
                  />
                </View>
                <View style={styles.inputHarmFullBodyContainer}>
                <TouchableOpacity
                          onPress={() =>
                            setSignature({
                              bool: true,
                              isSign: false,
                              isSupervisor:true,
                              index: index
                            })
                          }
                          style={[
                            styles.inputHarmFullBodyContainer,
                            {
                              width:"100%",
                              justifyContent:"center",
                              alignItems:"center"
                            },
                          ]}
                        >
                          {item.sign?
                          <Image
                            source={{ uri: item.sign }}
                            style={{
                              marginTop:10,
                              height: 30,
                              width: 30,
                              backgroundColor: "gray",
                            }}
                          />
                          :
                          <Text
                          style={{
                            width:"100%",
                           height:39,
                            borderBottomWidth: 1,
                            borderBottomColor: "#96A8B2",
                            padding: 5,
                            fontSize: 12,
                            color: "#96A8B2",
                            fontFamily: "poppins-regular",
                            paddingTop: 12,
                            marginRight:5
                           
                          }}
                        >Sign</Text>
}
                        </TouchableOpacity>
                </View>
              </View>
            ))}
            <Text
              style={{
                fontSize: 12,
                fontFamily: "poppins-bold",
                paddingTop: 10,
                paddingBottom: 20,
                textAlign: "center",
              }}>
              Once completed, please file a copy in the Site Folder and send a copy to our Head Office.
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#000",
              width: "100%",
              height: 2,
              marginBottom: 20,
            }}></View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.commonBtn} onPress={() => issueRecordForm()}>
              <Text style={styles.commonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      </>
      )}
    </View>
  );
};
const mapDispatchToProps = (dispatch) => ({
  updateHealthReport: (index) => dispatch(updateHealthReport(index)),
});
export default connect(null, mapDispatchToProps)(IssueCard);
