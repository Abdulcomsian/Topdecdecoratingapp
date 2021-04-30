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

var mainImage = require("../../../assets/authScreen/Accurate-daywork-sheet-docx.png");
var plus = require("../../../assets/authScreen/plus.png");
const TBTREGISTER = (props) => {
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
    </View>
  );
};
export default TBTREGISTER;
