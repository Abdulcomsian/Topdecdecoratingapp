import React, { useState } from "react";
<<<<<<< HEAD
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
=======
import { View, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { CheckBox, Text } from "native-base";
import styles from "../../../assets/css/styles";
import { color } from "react-native-reanimated";
>>>>>>> 8963071f89a3d01cc8c91cb986015da9fe50ddcf

var mainImage = require("../../../assets/authScreen/Accurate-daywork-sheet-docx.png");
var plus = require("../../../assets/authScreen/plus.png");
const TBTREGISTER = (props) => {
<<<<<<< HEAD
  const { navigation, token, isSuccessMsg, isDecoration } = props;
  const jobID = Math.floor(Math.random() * 100) + 1;
  const tabId = props.route.params.tabName;
  const [toolBoxArray, setToolBoxArray] = useState([]);
  const addToolBox = () => {
    setToolBoxArray((oldArray) => [
      ...oldArray,
      {
        name: "",
        sign: "",
        dateRegister: new Date().toLocaleDateString(),
        translation: "",
        nameoftranslator: "",
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
  const [startTime, setStartTime] = useState(new Date());
  const [finishTime, setFinishTime] = useState(new Date().toLocaleDateString());

  const [startTimeShow, setStartTimeShow] = useState("");
  const [finalTimeShow, setFinalTimeShow] = useState("");
  const [registerDateShow, setRegisterDateShow] = useState("");

  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow({ ...show, isVisible: false, index: -1 });
    let copyArr = [...toolBoxArray];
    copyArr[show.index].dateRegister = currentDate.toLocaleDateString();
    setToolBoxArray(copyArr);
  };

  const onStartTimeChange = (selectedDate) => {
    const currentDate = selectedDate;
    setStartTimeShow(false);
    setStartTime(new Date(currentDate));
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
    isSign: false,
    index: -1,
    signSupervisor: false,
  });
  const [supevisorSign, setSupervisorSign] = useState("");
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
      {signature.bool ? (
        <SignatureComponent
          returnImage={(uri) => {
            if (signature.isSign) {
              let data = [...toolBoxArray];
              data[signature.index].sign = uri;
              setToolBoxArray(data);
              setSignature({
                ...signature.isSign,
                isSign: false,
                bool: false,
                index: -1,
              });
            } else {
              setSupervisorSign(uri);
              setSignature({
                ...signature.signSupervisor,
                isSign: false,
                bool: false,
                signSupervisor: false,
              });
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
                <TextInput style={styles.inputField} placeholder={"Client"} />
              </View>
              <View style={styles.inputFieldContainer}>
                <TextInput style={styles.inputField} placeholder={"Project"} />
              </View>
              <View style={styles.inputFieldContainer}>
                <TextInput style={styles.inputField} placeholder={"Subject"} />
              </View>
              <View style={styles.inputFieldContainer}>
                <TextInput style={styles.inputField} placeholder={"Outline"} />
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
                <TextInput
                  style={styles.inputField}
                  placeholder={"Finish Time"}
                />
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
                    <Text style={styles.headerTitle}>Signature</Text>
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
                    onPress={() => addToolBox()}
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
                        />
                      </View>
                      <View style={styles.inputInspectionBodyContainer}>
                        <TouchableOpacity
                          onPress={() =>
                            setSignature({
                              bool: true,
                              isSign: true,
                              index: index,
                            })
                          }
                          style={{
                            width: "100%",
                            alignItems: "center",
                          }}
                        >
                          {el.sign ? (
                            <Image
                              source={{ uri: el.sign }}
                              style={{
                                marginTop: 10,
                                height: 30,
                                width: 30,
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
                          {new Date(el.dateRegister).toLocaleDateString()}
                        </Text>
                      </View>
                      <View style={styles.inputInspectionBodyContainer}>
                        <TextInput
                          style={styles.bodyTextInput}
                          placeholder={"Yes / No"}
                        />
                      </View>
                      <View style={styles.inputInspectionBodyContainer}>
                        <TextInput
                          style={styles.bodyTextInput}
                          placeholder={"Name Of Translator"}
                        />
                      </View>
                    </View>
                  ))}
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
                />
              </View>
              <View style={styles.inputFieldContainer}>
                <TouchableOpacity
                  onPress={() =>
                    setSignature({
                      bool: true,
                      isSign: false,
                      signSupervisor: true,
                    })
                  }
                  style={{
                    width: "100%",
                  }}
                >
                  {supevisorSign ? (
                    <Image
                      source={{ uri: supevisorSign }}
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
            </View>
          </ScrollView>
        </>
      )}
=======
  const [coshhArray, setCoshhArray] = useState([
    {
      mainTitle: "ALCOHOL:",
      title:
        "•  Alcohol is a depressant drug, which depresses parts of the brain function. When working on-site, you require all of your brain functions to save you from injury.",
    },
    { title: "•	If you are found to be intoxicated with drink, you will be removed from site and face disciplinary actions." },
    {
      title:
        "•	It is not recommended to get drunk the night before and expect to work safely on site the next day. Alcohol takes time to work out of your system (1 pint of beer takes approximately 2 hours).",
    },
    { title: "•	Some fatal workplace accidents are alcohol related." },
    { title: "•	Keep your head clear – leave your drinking sessions to social events, where you cannot cause injury to yourself or others." },
    { mainTitle: "DRUGS: ", title: "•	You are far more likely to have an accident on site when under the influence of drugs. " },
    {
      title:
        "•	You may feel you do not have a drug problem and it has nothing to do with you. But if you get hurt, it is a bit late to wonder what the other person has been taking.",
    },
    { title: "•	If you know somebody is taking drugs, tell your supervisor – help to stamp it out." },
    {
      title:
        "•	Signs to look for: watery eyes, dilated pupils, running nose, hallucinations, constant sniffing, tight lips, ulcers, trembling, fatigue and irritability, behaviour changes. If you see it, report it.",
    },
    { title: "•	All drugs can affect your ability to work safely." },
    { title: "•	Some effects of drugs: slow reaction times, clumsiness, poor decision-making and distorted vision." },
    { title: "•	Drugs and work do not mix." },
    {
      title:
        "•	Legal drugs prescribed by your doctor, or over the counter at a pharmacy, could also make you unfit for work. Tell your doctor or pharmacist what your job role and ask what the side effects are. If you think there may be an issue, tell your Supervisor.",
    },
    { mainTitle: "Remember, you must: ", title: "1. Never come to work under the influence of alcohol or prohibited drugs." },
    { title: "2. Never bring alcohol or prohibited drugs to work or consume them at work. " },
    { title: "3. Inform your manager if you have to take any medication which may affect your work. " },
    { title: "4.Inform your supervisor if you believe a colleague is under the influence of alcohol or drugs. " },
  ]);
  const [toolBoxArray, setToolBoxArray] = useState([]);
  const addToolBox = () => setToolBoxArray((oldArray) => [...oldArray, { name: "", sign: "", date: "", translation: "", nameoftranslator: "" }]);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageView}>
        <Image source={mainImage} style={styles.bannerImage} />
      </View>
      <View style={{ paddingTop: 30, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.titleText}>Site Tool Box Talk Register</Text>
      </View>
      <ScrollView>
        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Client"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Project"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Subject"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Outline"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Date"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Start time"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Finish Time"} />
          </View>
          <Text style={{ fontFamily: "poppins-bold", fontSize: 10 }}>I confirm that I have received the above tool box talk</Text>
          <View style={styles.tableViewContainer}>
            <View style={styles.tableHeader}>
              <View style={styles.headerInspectionTitleView}>
                <Text style={styles.headerTitle}>Print Name</Text>
              </View>
              <View style={styles.headerInspectionTitleView}>
                <Text style={styles.headerTitle}>Signature</Text>
              </View>
              <View style={styles.headerInspectionTitleView}>
                <Text style={styles.headerTitle}>Date</Text>
              </View>
              <View style={styles.headerInspectionTitleView}>
                <Text style={styles.headerTitle}>Translation required (Yes/No)</Text>
              </View>
              <View style={styles.headerInspectionTitleView}>
                <Text style={styles.headerTitle}>Name of Translator</Text>
              </View>
            </View>
            <View style={{ justifyContent: "flex-end", width: "100%", alignItems: "flex-end", marginBottom: 10 }}>
              <TouchableOpacity style={styles.addBtn} onPress={() => addToolBox()}>
                <Image style={styles.plusBtn} source={plus} />
              </TouchableOpacity>
            </View>
            {toolBoxArray.map((item, index) => (
              <View style={styles.tableBody} key={index}>
                <View style={styles.inputInspectionBodyContainer}>
                  <TextInput style={styles.bodyTextInput} placeholder={"Name"} />
                </View>
                <View style={styles.inputInspectionBodyContainer}>
                  <TextInput style={styles.bodyTextInput} placeholder={"Sign"} />
                </View>
                <View style={styles.inputInspectionBodyContainer}>
                  <TextInput style={styles.bodyTextInput} placeholder={"Date"} />
                </View>
                <View style={styles.inputInspectionBodyContainer}>
                  <TextInput style={styles.bodyTextInput} placeholder={"Yes / No"} />
                </View>
                <View style={styles.inputInspectionBodyContainer}>
                  <TextInput style={styles.bodyTextInput} placeholder={"Name Of Translator"} />
                </View>
              </View>
            ))}
          </View>
          <Text style={{ fontFamily: "poppins-bold", fontSize: 10, paddingTop: 20 }}>I confirm that I have given the above toolbox talk.</Text>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Name of Supervisor"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Signature"} />
          </View>
          <Text style={{ fontFamily: "poppins-bold", fontSize: 10, paddingTop: 20, textAlign: "center" }}>
            Once completed, please file a copy in the Site Folder and send a copy to our Office. Also, please give a copy to the Site Staff.
          </Text>
        </View>
      </ScrollView>
>>>>>>> 8963071f89a3d01cc8c91cb986015da9fe50ddcf
    </View>
  );
};
export default TBTREGISTER;
