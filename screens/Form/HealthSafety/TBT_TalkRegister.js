import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { CheckBox, Text } from "native-base";
import styles from "../../../assets/css/styles";
import { color } from "react-native-reanimated";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SignatureComponent from "../../../components/SignatureComponent";
import { connect } from "react-redux";
import { insertTbtRegister } from "../../../Redux/action/auth/authActionTypes";
import { updateHealthReport } from "../../../Redux/action/summary/Summary";

var mainImage = require("../../../assets/authScreen/Accurate-daywork-sheet-docx.png");
var plus = require("../../../assets/authScreen/plus.png");
const TBTREGISTER = (props) => {
  const { navigation, token, isOnSite, isSuccessMsg, isJobId } = props;
  // const jobID = Math.floor(Math.random() * 100) + 1;
  const { plot_Id } = props.route.params;
  const jobID = plot_Id;
  console.log("Work Plot ID :",jobID)
  const tabId = props.route.params.tabName;
  console.log("Work Tab ID :",tabId)
  const [toolBoxArray, setToolBoxArray] = useState([]);
  const addToolBox = () => {
    setToolBoxArray((oldArray) => [
      ...oldArray,
      {
        name: "",
        sign: "",
        date_1: new Date().toLocaleDateString(),
        action: "",
        translator: "",
      },
    ]);
  };

  const [show, setShow] = useState({
    isVisible: false,
    index: -1,
  });
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [registerDate, setRegisterDate] = useState(
    new Date().toLocaleDateString()
  );
  const [startTime, setStartTime] = useState(new Date().toLocaleTimeString());
  const [finishTime, setFinishTime] = useState(new Date().toLocaleTimeString());

  const [startTimeShow, setStartTimeShow] = useState("");
  const [finalTimeShow, setFinalTimeShow] = useState("");
  const [registerDateShow, setRegisterDateShow] = useState("");

  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow({ ...show, isVisible: false, index: -1 });
    let copyArr = [...toolBoxArray];
    copyArr[show.index].date_1 = currentDate.toLocaleDateString();
    setToolBoxArray(copyArr);
  };

  const onStartTimeChange = (selectedDate) => {
    const currentDate = selectedDate;
    setStartTimeShow(false);
    setStartTime(new Date(currentDate).toLocaleTimeString());
  };

  const onFinishTimeChange = (selectedDate) => {
    const currentDate = selectedDate;
    setFinalTimeShow(false);
    setFinishTime(new Date(currentDate).toLocaleTimeString());
  };

  const onRegisterDateChange = (selectedDate) => {
    const currentDate = selectedDate;
    setRegisterDateShow(false);
    setRegisterDate(new Date(currentDate).toLocaleDateString());
  };

  const showDatepicker = (index = -1) => {
    setShow({ ...show, isVisible: true, index: index });
  };
  const [signature, setSignature] = useState({
    bool: false,
    bool: false,
    isSign: {
      bool: false,
      uri: "",
    },
    bscsSignature: {
      bool: false,
      uri: "",
    },
  });
  const [isSign, setIsSign] = useState("");
  const [bscsSignature, setBscsSignature] = useState("");
  const [client, setClient] = useState("");
  const [projectName, setProjectName] = useState("");
  const [subject, setSubject] = useState("");
  const [outline, setOutline] = useState("");
  const [supervisorName, setSupervisorName] = useState("");

  const tbtRegisterFormInsert = async () => {
    try {
      console.log("Try Token :",token)
     
      if(client!="" && projectName!=""  && subject!="" && outline!="" && registerDate!="" && startTime!="" && finishTime!="" && toolBoxArray!="" && supervisorName!="" && bscsSignature!="" && isSign!=""){
        await props.creatTbtRegisterHandler(client,projectName,subject,outline,registerDate,startTime,finishTime,toolBoxArray,supervisorName,bscsSignature,isSign,jobID,tabId,token,props.route.params?.index)
        // props.updateHealthReport(props?.route?.params?.index);
        props.navigation.pop();
        alert("TBT REGISTER Insert SuccessFully !");
      }else{
        alert("Please Insert All Fields CareFully !");
      }
    } catch (err) {
      alert(err.message);
    }
  };
  const updateToolBoxArray = (key, index, value) => {
    let preData = [...toolBoxArray];
    preData[index][key] = value;
    setToolBoxArray(preData);
  };
  return (
    <View style={styles.mainContainer}>
      <DateTimePickerModal
        isVisible={show.isVisible}
        testID="dateTimePicker"
        value={date}
        mode={"date"}
        display="default"
        onConfirm={onChange}
        onCancel={() => setShow({ isVisible: false, index: -1 })}
        format="DD-MM-YYYY"
      />
      <DateTimePickerModal
        isVisible={registerDateShow}
        testID="dateTimePicker"
        value={registerDate}
        mode={"date"}
        display="default"
        onConfirm={onRegisterDateChange}
        onCancel={() => setRegisterDateShow(false)}
        format="DD-MM-YYYY"
      />
      <DateTimePickerModal
        isVisible={startTimeShow}
        testID="dateTimePicker"
        value={startTime}
        mode={"time"}
        display="default"
        onConfirm={onStartTimeChange}
        onCancel={() => setStartTimeShow(false)}
      />

      <DateTimePickerModal
        isVisible={finalTimeShow}
        testID="dateTimePicker"
        value={finishTime}
        mode={"time"}
        display="default"
        onConfirm={onFinishTimeChange}
        onCancel={() => setFinalTimeShow(false)}
      />
      {signature.bool ? (
        <SignatureComponent
          returnImage={(uri) => {
            if (signature.isSign.bool) {
              setSignature({
                ...signature,
                supervisor: { ...signature.isSign, bool: false, uri: uri },
                bool: false,
              });
              setIsSign(uri);
            } else {
              setSignature({
                ...signature,
                manager: { ...signature.bscsSignature, bool: false, uri: uri },
                bool: false,
              });
              setBscsSignature(uri);
            }
          }}
        />
      ) : (
        <>
          <View style={styles.imageView}>
            <Image source={mainImage} style={styles.bannerImage} />
          </View>
          <View
            style={{
              paddingTop: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.titleText}>Site Tool Box Talk Register</Text>
          </View>
          <ScrollView>
            <View style={{ paddingLeft: 20, paddingRight: 20 }}>
              <View style={styles.inputFieldContainer}>
                <TextInput
                  style={styles.inputField}
                  placeholder={"Client"}
                  value={client}
                  onChangeText={(e) => setClient(e)}
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
                  placeholder={"Subject"}
                  value={subject}
                  onChangeText={(e) => setSubject(e)}
                />
              </View>
              <View style={styles.inputFieldContainer}>
                <TextInput
                  style={styles.inputField}
                  placeholder={"Outline"}
                  value={outline}
                  onChangeText={(e) => setOutline(e)}
                />
              </View>
              <View style={styles.inputFieldContainer}>
                <Text
                  onPress={() => setRegisterDateShow(true)}
                  style={{
                    height: 40,
                    borderBottomWidth: 1,
                    borderBottomColor: "#96A8B2",
                    fontSize: 12,
                    color: "#96A8B2",
                    fontFamily: "poppins-regular",
                    paddingTop: 13,
                  }}
                >
                  {new Date(registerDate).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.inputFieldContainer}>
                <Text
                  onPress={() => setStartTimeShow(true)}
                  style={{
                    height: 40,
                    borderBottomWidth: 1,
                    borderBottomColor: "#96A8B2",
                    fontSize: 12,
                    color: "#96A8B2",
                    fontFamily: "poppins-regular",
                    paddingTop: 13,
                  }}
                >
                  {new Date(startTime).toLocaleTimeString()}
                </Text>
              </View>
              <View style={styles.inputFieldContainer}>
                <Text
                  onPress={() => setFinalTimeShow(true)}
                  style={{
                    height: 40,
                    borderBottomWidth: 1,
                    borderBottomColor: "#96A8B2",
                    fontSize: 12,
                    color: "#96A8B2",
                    fontFamily: "poppins-regular",
                    paddingTop: 13,
                  }}
                >
                  {new Date(finishTime).toLocaleTimeString()}
                </Text>
              </View>
              
              <Text style={{ fontFamily: "poppins-bold", fontSize: 10 }}>
                I confirm that I have received the above tool box talk
              </Text>
              <View style={styles.tableViewContainer}>
                <View style={styles.tableHeader}>
                  <View style={styles.headerInspectionTitleView}>
                    <Text style={styles.headerTitle}>Print Name</Text>
                  </View>
                  <View style={styles.headerInspectionTitleView}>
                    <Text style={styles.headerTitle}>Date</Text>
                  </View>
                  <View style={styles.headerInspectionTitleView}>
                    <Text style={styles.headerTitle}>
                      Translation required (Yes/No)
                    </Text>
                  </View>
                  <View style={styles.headerInspectionTitleView}>
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
                    onPress={() => {
                      if(toolBoxArray.length>0 && !toolBoxArray[toolBoxArray.length-1].name && !toolBoxArray[toolBoxArray.length-1].signature && !toolBoxArray[toolBoxArray.length-1].date_1 && !toolBoxArray[toolBoxArray.length-1].action && !toolBoxArray[toolBoxArray.length-1].translator){
                        alert("Please Enter All Value and then move to next Item Add !")
                      }
                      else {
                        addToolBox()
                      }
                    }}
                  >
                    <Image style={styles.plusBtn} source={plus} />
                  </TouchableOpacity>
                </View>
                {toolBoxArray.length > 0 &&
                  toolBoxArray.map((el, index) => (
                    <View style={styles.tableBody} key={index}>
                      <View style={styles.inputInspectionBodyContainer}>
                        <TextInput
                          style={styles.bodyTextInput}
                          placeholder={"Name"}
                          value={el.name}
                            onChangeText={(txt) => updateToolBoxArray("name", index, txt)}
                        />
                      </View>
                      <View style={styles.inputInspectionBodyContainer}>
                        <Text
                          onPress={() => showDatepicker(index)}
                          style={{
                            height: 40,
                            borderBottomWidth: 1,
                            borderBottomColor: "#96A8B2",
                            fontSize: 8,
                            color: "#96A8B2",
                            fontFamily: "poppins-regular",
                            paddingTop: 13,
                          }}
                        >
                          {new Date(el.date_1).toLocaleDateString()}
                        </Text>
                      </View>
                      <View style={styles.inputInspectionBodyContainer}>
                        <TextInput
                          style={styles.bodyTextInput}
                          placeholder={"Yes / No"}
                          value={el.action}
                          onChangeText={(txt) => updateToolBoxArray("action", index, txt)}
                        />
                      </View>
                      <View style={styles.inputInspectionBodyContainer}>
                        <TextInput
                          style={styles.bodyTextInput}
                          placeholder={"Name Of Translator"}
                          value={el.translator}
                          onChangeText={(txt) => updateToolBoxArray("translator", index, txt)}
                        />
                      </View>
                    </View>
                  ))}
              </View>
              <View style={styles.inputFieldContainer}>
                <TouchableOpacity
                  onPress={() =>
                    setSignature({
                      ...signature,
                      bool: true,
                      isSign: { ...signature.isSign, bool: true },
                      bscsSignature: { ...signature.bscsSignature, bool: false },
                    })
                  }
                  style={{
                    width: "100%",
                  }}
                >
                  {isSign ? (
                    <Image
                      source={{ uri: isSign }}
                      style={{
                        marginTop: 10,
                        height: 100,
                        width: 100,
                        backgroundColor: "gray",
                      }}
                    />
                  ) : (
                    <Text
                      style={{
                        height: 52,
                        width: "100%",
                        borderBottomWidth: 1,
                        borderBottomColor: "#96A8B2",
                        padding: 5,
                        fontSize: 12,
                        color: "#96A8B2",
                        fontFamily: "poppins-regular",
                        paddingTop: 15,
                      }}
                    >
                     Signature
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontFamily: "poppins-bold",
                  fontSize: 10,
                  paddingTop: 20,
                }}
              >
                I confirm that I have given the above toolbox talk.
              </Text>
              <View style={styles.inputFieldContainer}>
                <TextInput
                  style={styles.inputField}
                  placeholder={"Name of Supervisor"}
                  value={supervisorName}
                  onChangeText={(e) => setSupervisorName(e)}
                />
              </View>
              <View style={styles.inputFieldContainer}>
                <TouchableOpacity
                  onPress={() =>
                    setSignature({
                      ...signature,
                      bool: true,
                      isSign: { ...signature.isSign, bool: false },
                      bscsSignature: { ...signature.bscsSignature, bool: true },
                    })
                  }
                  style={{
                    width: "100%",
                  }}
                >
                  {bscsSignature ? (
                    <Image
                      source={{ uri: bscsSignature }}
                      style={{
                        marginTop: 10,
                        height: 100,
                        width: 100,
                        backgroundColor: "gray",
                      }}
                    />
                  ) : (
                    <Text
                      style={{
                        height: 52,
                        width: "100%",
                        borderBottomWidth: 1,
                        borderBottomColor: "#96A8B2",
                        padding: 5,
                        fontSize: 12,
                        color: "#96A8B2",
                        fontFamily: "poppins-regular",
                        paddingTop: 15,
                      }}
                    >
                      Supervisor BSCS Signature
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontFamily: "poppins-bold",
                  fontSize: 10,
                  paddingTop: 20,
                  textAlign: "center",
                }}
              >
                Once completed, please file a copy in the Site Folder and send a
                copy to our Office. Also, please give a copy to the Site Staff.
              </Text>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.commonBtn}
                  onPress={() => tbtRegisterFormInsert()}
                >
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
  isOnSite: state.auth.isOnSite,
  isSuccessMsg: state.auth.isSuccessMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
  creatTbtRegisterHandler: (client,projectName,subject,outline,registerDate,startTime,finishTime,toolBoxArray,bscsSignature,isSign,jobID,tabId,token,index) =>
    dispatch(insertTbtRegister(client,projectName,subject,outline,registerDate,startTime,finishTime,toolBoxArray,bscsSignature,isSign,jobID,tabId,token,index)),
  // updateHealthReport: (index) => dispatch(updateHealthReport(index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TBTREGISTER);
