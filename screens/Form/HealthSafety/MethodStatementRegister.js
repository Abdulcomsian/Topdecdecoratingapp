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
import SignatureComponent from "../../../components/SignatureComponent";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { connect } from "react-redux";
import { insertMethodStatementForm } from "../../../Redux/action/auth/authActionTypes";
import { updateHealthReport } from "../../../Redux/action/summary/Summary";
import * as ImagePicker from "expo-image-picker";
import { AssetsSelector } from "expo-images-picker";

var plus = require("../../../assets/authScreen/plus.png");
const MethodStatement = (props) => {
  const { navigation, token, isSuccess, isSuccessMsg, isJobId, isMethod } =
    props;
  // const jobID = Math.floor(Math.random() * 100) + 1;
  const { plot_Id } = props.route.params;
  const jobID = plot_Id;
  console.log("Work Plot ID :", jobID);
  const tabId = props.route.params.tabName;
  console.log("Work Tab ID :", tabId);
  const [statementArray, setStatementArray] = useState([]);
  const [statementTitle, setStatementTitle] = useState("");
  const [contractorName, setContractorName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [refNo, setRefNo] = useState("");
  const [supervisorName, setSupervisorName] = useState("");
  const [supervisorSignature, setSupervisorSignature] = useState("");
  const [isSign, setIsSign] = useState("");
  const [dynamicInput, setdynamicInput] = useState([]);

  const addStatement = () => {
    setdynamicInput((oldArray) => [
      ...oldArray,
      {
        name: "",
        signature: "",
        comapany: "",
        date: new Date().toLocaleDateString(),
        translation: "",
        translatore: "",
      },
    ]);
  };
  const [signature, setSignature] = useState({
    bool: false,
    isSign: {
      bool: false,
      uri: "",
    },
    isSupervisor: {
      bool: false,
      uri: "",
    },
  });
  const [date, setDate] = useState(new Date().toLocaleDateString());
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
  const [projectComment, setProjectComment] = useState("");
  const statementRegisterForm = async () => {
    try {
      if (
        statementTitle != "" &&
        contractorName != "" &&
        projectName != "" &&
        refNo != "" &&
        dynamicInput != "" &&
        supervisorName !== "" &&
        supervisorSignature !== "" &&
        isSign !== "" &&
        projectImages != "" &&
        projectComment != ""
      ) {
        await props.createMethodStateMentHandler(
          statementTitle,
          contractorName,
          projectName,
          refNo,
          dynamicInput,
          supervisorName,
          supervisorSignature,
          isSign,
          projectImages,
          projectComment,
          jobID,
          tabId,
          token,
          props.route.params?.index
        );
        // props.updateHealthReport(props?.route?.params?.index);
        alert("Method Statement Register Insert SuccessFully !");
        props.navigation.pop();
      } else {
        alert("Please Insert All Fields CareFully !");
        return false;
      }
    } catch (err) {
      alert(err.message);
    }
  };
  const [projectImages, setProjectImages] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const onDone = (data) => {
    setProjectImages(data);
    setIsShow(false);
  };

  const goBack = () => {
    setIsShow(false);
  };
  const uploadPhotoImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    setIsShow(true);
  };
  // console.log("Pick Project :",projectImages)
  const _textStyle = {
    color: "white",
  };
  const _buttonStyle = {
    backgroundColor: "#1073AC",
    borderRadius: 5,
  };
  console.log("Project Iamges :", projectImages);
  return (
    <View style={styles.mainContainer}>
      {isShow ? (
        <View style={{ flex: 1 }}>
          <AssetsSelector
            options={{
              assetsType: ["photo", "video"],
              maxSelections: 3,
              margin: 2,
              portraitCols: 4,
              landscapeCols: 5,
              widgetWidth: 100,
              widgetBgColor: "white",
              videoIcon: {
                iconName: "ios-videocam",
                color: "tomato",
                size: 20,
              },
              selectedIcon: {
                iconName: "ios-checkmark-circle-outline",
                color: "white",
                bg: "#0eb14970",
                size: 26,
              },
              spinnerColor: "black",
              onError: () => {},
              noAssets: () => (
                <View>
                  <Text></Text>
                </View>
              ),
              defaultTopNavigator: {
                continueText: "Finish",
                goBackText: "Back",
                selectedText: "Selected",
                midTextColor: "tomato",
                buttonStyle: _buttonStyle,
                buttonTextStyle: _textStyle,
                backFunction: goBack,
                doneFunction: (data) => onDone(data),
              },
            }}
          />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
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
          {signature.bool ? (
            <SignatureComponent
              returnImage={(uri) => {
                let copydata = [...dynamicInput];
                if (signature.isSign.bool) {
                  setSignature({
                    ...signature,
                    isSign: { ...signature.isSign, bool: false, uri: uri },
                    bool: false,
                  });
                  setIsSign(uri);
                } else {
                  setSignature({
                    ...signature,
                    isSupervisor: {
                      ...signature.isSupervisor,
                      bool: false,
                      uri: uri,
                    },
                    bool: false,
                  });
                  setSupervisorSignature(uri);
                }
              }}
            />
          ) : (
            <>
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
                    We, the undersigned, confirm that we have been briefed on /
                    read and understood the Method Statement as detailed above,
                    together with the Risk Assessments (including COSHH
                    Assessments) associated with the works and will ensure that
                    our actions reflect the safe systems of work identified
                    therein.
                  </Text>
                  <View style={styles.tableViewContainer}>
                    <View style={styles.tableHeader}>
                      <View style={styles.headerHarmFulTitleView}>
                        <Text style={styles.headerTitle}>Name</Text>
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
                        <Text style={styles.headerTitle}>
                          Name of Translator
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        justifyContent: "flex-end",
                        width: "100%",
                        alignItems: "flex-end",
                        marginBottom: 10,
                      }}
                    ></View>
                    {dynamicInput.map((item, index) => (
                      <View style={styles.tableBody} key={index}>
                        <View style={styles.inputHarmFullBodyContainer}>
                          <TextInput
                            style={styles.bodyTextInput}
                            placeholder={"Name"}
                            onChangeText={(txt) =>
                              updateValue("name", index, txt)
                            }
                            value={item.name}
                          />
                        </View>
                        <View style={styles.inputHarmFullBodyContainer}>
                          <TextInput
                            style={styles.bodyTextInput}
                            placeholder={"Company"}
                            onChangeText={(txt) =>
                              updateValue("comapany", index, txt)
                            }
                            value={item.comapany}
                          />
                        </View>
                        <View style={styles.inputHarmFullBodyContainer}>
                          <Text
                            onPress={() => showDatepicker(index)}
                            style={{
                              width: "90%",
                              height: 39,
                              borderBottomWidth: 1,
                              borderBottomColor: "#96A8B2",
                              padding: 5,
                              fontSize: 8,
                              color: "#96A8B2",
                              fontFamily: "poppins-regular",
                              paddingTop: 12,
                              marginRight: 5,
                            }}
                          >
                            {new Date(item.date).toLocaleDateString()}
                          </Text>
                        </View>
                        <View style={styles.inputHarmFullBodyContainer}>
                          <TextInput
                            style={styles.bodyTextInput}
                            placeholder={"Yes/No"}
                            onChangeText={(txt) =>
                              updateValue("translation", index, txt)
                            }
                            value={item.translation}
                          />
                        </View>
                        <View style={styles.inputHarmFullBodyContainer}>
                          <TextInput
                            style={styles.bodyTextInput}
                            placeholder={"translatore"}
                            onChangeText={(txt) =>
                              updateValue("translatore", index, txt)
                            }
                            value={item.translatore}
                          />
                        </View>
                      </View>
                    ))}
                    <View
                      style={{
                        width: "100%",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                        marginTop: 20,
                      }}
                    >
                      <TouchableOpacity
                        style={[styles.addBtn, { marginRight: 20 }]}
                        onPress={() => {
                          if (
                            dynamicInput.length > 0 &&
                            !dynamicInput[dynamicInput.length - 1].name &&
                            !dynamicInput[dynamicInput.length - 1].comapany &&
                            !dynamicInput[dynamicInput.length - 1]
                              .translation &&
                            !dynamicInput[dynamicInput.length - 1].translatore
                          ) {
                            alert(
                              "Please Enter All Value and then move to next Item Add !"
                            );
                          } else {
                            addStatement();
                          }
                        }}
                      >
                        <Image style={styles.plusBtn} source={plus} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.inputFieldContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          setSignature({
                            bool: true,
                            isSign: { ...signature.isSign, bool: true },
                            isSupervisor: {
                              ...signature.isSupervisor,
                              bool: false,
                            },
                          })
                        }
                        style={[
                          styles.inputFieldContainer,
                          {
                            width: "100%",
                          },
                        ]}
                      >
                        {signature.isSign.uri ? (
                          <Image
                            source={{ uri: signature.isSign.uri }}
                            style={{
                              height: 100,
                              width: 100,
                              backgroundColor: "gray",
                            }}
                          />
                        ) : (
                          <Text
                            style={{
                              width: "100%",
                              height: 39,
                              borderBottomWidth: 1,
                              borderBottomColor: "#96A8B2",
                              padding: 5,
                              fontSize: 12,
                              color: "#96A8B2",
                              fontFamily: "poppins-regular",
                              paddingTop: 12,
                              marginRight: 5,
                            }}
                          >
                            Sign of above All Data Insert Correctly or Not
                          </Text>
                        )}
                      </TouchableOpacity>
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
                      <TouchableOpacity
                        onPress={() =>
                          setSignature({
                            bool: true,
                            isSign: { ...signature.isSign, bool: false },
                            isSupervisor: {
                              ...signature.isSupervisor,
                              bool: true,
                            },
                          })
                        }
                        style={[
                          styles.inputHarmFullBodyContainer,
                          {
                            width: "100%",
                          },
                        ]}
                      >
                        {signature.isSupervisor.uri ? (
                          <Image
                            source={{ uri: signature.isSupervisor.uri }}
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
                              width: "100%",
                              height: 39,
                              borderBottomWidth: 1,
                              borderBottomColor: "#96A8B2",
                              padding: 5,
                              fontSize: 12,
                              color: "#96A8B2",
                              fontFamily: "poppins-regular",
                              paddingTop: 12,
                              marginRight: 5,
                            }}
                          >
                            Supervisor Sign
                          </Text>
                        )}
                      </TouchableOpacity>
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
                      Once completed, please file a copy in the Site Folder and
                      send a copy to our Head Office.
                    </Text>
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Text
                      style={{
                        marginBottom: 10,
                        fontFamily: "poppins-semiBold",
                      }}
                    >
                      Project Images
                    </Text>
                    {projectImages != "" ? (
                      <View style={{ flexDirection: "row" }}>
                        {/* <Text>Hello</Text> */}
                        {projectImages.map((item, index) => (
                          <Image
                            style={{ width: 50, height: 50, marginRight: 10 }}
                            source={{ uri: item.uri }}
                            key={index}
                          />
                        ))}
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={[
                          styles.button,
                          styles.buttonOpen,
                          { width: "100%" },
                        ]}
                        onPress={() => uploadPhotoImage()}
                      >
                        <Text style={styles.textStyle}>Add Images</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      value={projectComment}
                      onChangeText={(e) => setProjectComment(e)}
                      style={styles.inputField}
                      multiline={true}
                      placeholder={"Project Images Comments"}
                    />
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
                      onPress={() => statementRegisterForm()}
                    >
                      <Text style={styles.commonText}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </>
          )}
        </View>
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
  createMethodStateMentHandler: (
    statementTitle,
    contractorName,
    projectName,
    refNo,
    dynamicInput,
    supervisorName,
    supervisorSignature,
    isSign,
    projectImages,
    projectComment,
    jobID,
    tabId,
    token,
    index
  ) =>
    dispatch(
      insertMethodStatementForm(
        statementTitle,
        contractorName,
        projectName,
        refNo,
        dynamicInput,
        supervisorName,
        supervisorSignature,
        isSign,
        projectImages,
        projectComment,
        jobID,
        tabId,
        token,
        index
      )
    ),
  // updateHealthReport: (index) => dispatch(updateHealthReport(index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MethodStatement);
