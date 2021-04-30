import React, { useState } from "react";
import { View, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Text, CheckBox } from "native-base";
import styles from "../../../assets/css/styles";
import SignatureComponent from "../../../components/SignatureComponent";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { connect } from "react-redux";
import { insertMethodStatementForm } from "../../../Redux/action/auth/authActionTypes";

var plus = require("../../../assets/authScreen/plus.png");
const MethodStatement = (props) => {
  const { navigation, token, isSuccess, isSuccessMsg, isJobId, isMethod } = props;
  const jobID = Math.floor(Math.random() * 100) + 1;
  const tabId = props.route.params.tabName;
  const [statementArray, setStatementArray] = useState([]);
  const [statementTitle, setStatementTitle] = useState("");
  const [contractorName, setContractorName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [refNo, setRefNo] = useState("");
  const [supervisorName, setSupervisorName] = useState("");
  const [supervisorSignature, setSupervisorSignature] = useState("");
  const [dynamicInput, setdynamicInput] = useState([{
    name: "",
    signature: "",
        comapany: "",
        date: new Date().toLocaleDateString(),
        translation: "",
        translatore: "",
  }]);

  const addStatement = () => {setdynamicInput((oldArray) => [...oldArray, {
    name: "",
    signature: "",
        comapany: "",
        date: new Date().toLocaleDateString(),
        translation: "",
        translatore: "",
  }]);
  };
  const [signature, setSignature] = useState({
    bool: false,
    isSign: false,
    isSupervisor:false,
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

  const updateValue = (key, index, value) => {
    let preData = [...dynamicInput];
    preData[index][key] = value;
    setdynamicInput(preData);
  };
  const statementRegisterForm = () =>{
    
    try{
      if (statementTitle != "" && contractorName != "" && projectName != "" && refNo != "" && dynamicInput != "" && supervisorName!=="" && supervisorSignature !== "") {
        props.createMethodStateMentHandler(statementTitle, contractorName, projectName, refNo, dynamicInput, supervisorName, supervisorSignature, jobID, tabId, token, props.route.params?.index);
      
      } else {
        alert("Please Insert All Fields CareFully !");
        return false;
      }
      
    } catch(err){

    }
  }
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
              if(signature.isSign){
              copydata[signature.index].signature = uri;
              setdynamicInput(copydata);
              setSignature({
                ...signature.isSign,
                isSign: false,
                bool: false,
                index: -1,
                isSupervisor: {...dynamicInput.isSupervisor}
              });
            } else{
              setSupervisorSignature(uri)
              setSignature({
                ...signature.isSupervisor,
                isSign: false,
                bool: false,
                isSupervisor: {...dynamicInput.isSupervisor},
                index: -1,
              })
          }}}
        />
      ) : (
        <>
      <View
        style={{
          paddingTop: 30,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Text style={styles.titleText}>Method Statement Register</Text>
      </View>
      <ScrollView>
        <View style={styles.formCodnatiner}>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Method Statement Title"} value={statementTitle} onChangeText={(e) => setStatementTitle(e)} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Main Contractor"} value={contractorName} onChangeText={(e) => setContractorName(e)} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Project"} value={projectName} onChangeText={(e) => setProjectName(e)} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Ref No"} value={refNo} onChangeText={(e) => setRefNo(e)} />
          </View>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "poppins-regular",
              paddingTop: 10,
              paddingBottom: 20,
            }}>
            We, the undersigned, confirm that we have been briefed on / read and understood the Method Statement as detailed above, together with the Risk
            Assessments (including COSHH Assessments) associated with the works and will ensure that our actions reflect the safe systems of work identified
            therein.
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
                <Text style={styles.headerTitle}>Translation required (Yes/No) </Text>
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
              }}>
              <TouchableOpacity style={styles.addBtn} onPress={() => addStatement()}>
                <Image style={styles.plusBtn} source={plus} />
              </TouchableOpacity>
            </View>
            {dynamicInput.map((item, index) => (
              <View style={styles.tableBody} key={index}>
                <View style={styles.inputHarmFullBodyContainer}>
                  <TextInput style={styles.bodyTextInput} placeholder={"Name"} onChangeText={(txt) => updateValue("name", index, txt)} value={item.name} />
                </View>
                <View style={styles.inputHarmFullBodyContainer}>
                <TouchableOpacity
                          onPress={() =>
                            setSignature({
                              bool: true,
                              index: index,
                              isSign: true,
                              isSupervisor:false
                            })
                          }
                          style={[
                            styles.inputHarmFullBodyContainer,
                            {
                              justifyContent: "center",
                              alignItems: "center",
                              width:"100%"
                            },
                          ]}
                        >
                          {item.signature ?
                          <Image
                            source={{ uri: item.signature }}
                            style={{
                              height: 30,
                              width: 30,
                              backgroundColor: "gray",
                              justifyContent:"center"
                            }}
                          />
                          :
                          <Text
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
                        >Sign</Text>
}
                        </TouchableOpacity>
                </View>
                <View style={styles.inputHarmFullBodyContainer}>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder={"Company"}
                    onChangeText={(txt) => updateValue("comapany", index, txt)}
                    value={item.comapany}
                  />
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
                    placeholder={"Yes/No"}
                    onChangeText={(txt) => updateValue("translation", index, txt)}
                    value={item.translation}
                  />
                </View>
                <View style={styles.inputHarmFullBodyContainer}>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder={"translatore"}
                    onChangeText={(txt) => updateValue("translatore", index, txt)}
                    value={item.translatore}
                  />
                </View>
              </View>
            ))}
            <View style={styles.inputFieldContainer}>
              <TextInput style={styles.inputField} placeholder={"Name of Supervisor"} value={supervisorName} onChangeText={(e) => setSupervisorName(e)} />
            </View>
            <View style={styles.inputFieldContainer}>
            <TouchableOpacity
                          onPress={() =>
                            setSignature({
                              bool: true,
                              isSign: false,
                              isSupervisor:true
                            })
                          }
                          style={[
                            styles.inputHarmFullBodyContainer,
                            {
                              width:"100%"
                            },
                          ]}
                        >
                          {supervisorSignature?
                          <Image
                            source={{ uri: supervisorSignature }}
                            style={{
                              marginTop:10,
                              height: 100,
                              width: 100,
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
                        >Supervisor Sign</Text>
}
                        </TouchableOpacity>
            </View>
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
            <TouchableOpacity style={styles.commonBtn} onPress={() => statementRegisterForm()}>
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
const mapStateToProps = (state) => ({
  token: state.auth.token,
  isMethod: state.auth.isMethod,
  isSuccessMsg: state.auth.isSuccessMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
  createMethodStateMentHandler: (statementTitle, contractorName, projectName, refNo, dynamicInput, supervisorName, supervisorSignature, jobID, tabId, token, index) =>
    dispatch(insertMethodStatementForm(statementTitle, contractorName, projectName, refNo, dynamicInput, supervisorName, supervisorSignature, jobID, tabId, token, index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MethodStatement);
