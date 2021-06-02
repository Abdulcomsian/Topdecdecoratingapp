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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { updateVerificationReport } from "../../../Redux/action/summary/Summary";
import * as ImagePicker from "expo-image-picker";
import { AssetsSelector } from "expo-images-picker";

var plus = require("../../../assets/authScreen/plus.png");
const VerificationOfWork = (props) => {
  const { navigation, token, isVerifyWork, isSuccessMsg, isJobId } = props;
  //const jobID = Math.floor(Math.random() * 100) + 1;
  const { plot_id } = props.route.params;
  const jobID = plot_id;
  console.log("Verification Work Plot ID :", jobID);
  const tabId = props.route.params.tabName;
  const [dynamicInput, setdynamicInput] = useState([]);
  const [projectName, setProjectName] = useState([]);
  const [idRef, setIdRef] = useState([]);
  const [decoratorName, setDecoratorName] = useState([]);
  const addVerificationRow = () => {
    setdynamicInput((oldArray) => [
      ...oldArray,
      {
        days: "",
        work: "",
        date: new Date().toLocaleDateString(),
        project: "",
        plot: "",
        description: "",
        price: "",
        remedial: "",
        si: "",
        c_work: "",
      },
    ]);
  };
  const updateValue = (key, index, value) => {
    let preData = [...dynamicInput];
    preData[index][key] = value;
    setdynamicInput(preData);
  };
  const [projectComment, setProjectComment] = useState("");
  const verificationWorkFormInsert = async () => {
    try {
      if (
        projectName != "" &&
        idRef != "" &&
        decoratorName != "" &&
        projectImagesComment != "" &&
        commentImages != ""
      ) {
        await props.createVerificationWorkHandler(
          projectName,
          idRef,
          decoratorName,
          dynamicInput,
          projectImagesComment,
          commentImages,
          jobID,
          tabId,
          token
        );
        // props.updateVerificationReport(props?.route?.params?.index);
        alert("Verification Of Work Insert SuccessFully !");
        props.navigation.pop();
      } else {
        alert("Please Insert All Fields CareFully !");
        return false;
      }
    } catch (err) {
      alert(err.message);
    }
  };
  const [show, setShow] = useState({
    isVisible: false,
    index: -1,
  });
  const [signature, setSignature] = useState({
    index: -1,
  });
  const [date, setDate] = useState(new Date(1598051730000));
  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow({ ...show, isVisible: false, index: -1 });
    let copyArr = [...dynamicInput];
    copyArr[show.index].date = currentDate.toLocaleDateString();
    setdynamicInput(copyArr);
  };
  const showStartDatepicker = (index = -1) => {
    setShow({ ...show, isVisible: true, index: index });
  };
  const [projectImages, setProjectImages] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const onDone = (data) => {
    let copydata = [...projectImagesComment];
    copydata[signature.index].image = data[0].uri;
    setProjectImagesComment([...copydata]);
    setSignature({ ...signature, index: -1 });
    setIsShow(false);
  };

  const goBack = () => {
    setIsShow(false);
  };
  const uploadPhotoImage = async (index) => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    setSignature({ ...signature, index: index });
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
  const [projectImagesComment, setProjectImagesComment] = useState([]);
  const [commentImages, setCommentImages] = useState([]);
  const addImagesCommentRow = () => {
    setProjectImagesComment((oldArray) => [
      ...oldArray,
      { image: "", comment: "" },
    ]);
  };
  const updateProjectCommentValue = (key, index, value) => {
    let preData = [...projectImagesComment];
    preData[index][key] = value;
    setProjectImagesComment([...preData]);

    let commentData = preData.map((item, index) => {
      return { comment: item.comment };
    });
    setCommentImages(commentData);
  };
  return (
    <View style={[styles.mainContainer]}>
      {isShow ? (
        <View style={{ flex: 1 }}>
          <AssetsSelector
            options={{
              assetsType: ["photo", "video"],
              maxSelections: 1,
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
        <View
          style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 50, flex: 1 }}
        >
          <DateTimePickerModal
            isVisible={show.isVisible}
            testID="dateTimePicker"
            value={date}
            mode={Platform.OS === 'ios' ? "datetime" : "date"}
            display="default"
            onCancel={() => setShow({ isVisible: false, index: -1 })}
            onConfirm={onChange}
            format="DD-MM-YYYY"
          />
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
                onChangeText={(e) => setIdRef(e.replace(/[^0-9]/g, ""))}
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

              {dynamicInput.length > 0 &&
                dynamicInput.map((el, index) => (
                  <View
                    style={[
                      styles.tableBody,
                      { justifyContent: "space-between" },
                    ]}
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
                      <Text
                        onPress={() => showStartDatepicker(index)}
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: "#96A8B2",
                          fontSize: 8,
                          color: "#96A8B2",
                          fontFamily: "poppins-regular",
                          paddingTop: 10,
                        }}
                      >
                        {new Date(el.date).toLocaleDateString()}
                      </Text>
                    </View>
                    <View style={styles.inputBodyContainer}>
                      <TextInput
                        onChangeText={(txt) =>
                          updateValue("project", index, txt)
                        }
                        value={el.project}
                        style={styles.bodyTextInput}
                        placeholder={"Project"}
                      />
                    </View>
                    <View style={styles.inputBodyContainer}>
                      <TextInput
                        onChangeText={(txt) => updateValue("plot", index, txt)}
                        value={el.plot}
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
                        onChangeText={(txt) => updateValue("price", index, txt.replace(/[^0-9]/g, ""))}
                        value={el.price}
                        style={styles.bodyTextInput}
                        placeholder={"Price"}
                      />
                    </View>
                    <View style={styles.inputBodyContainer}>
                      <TextInput
                        onChangeText={(txt) =>
                          updateValue("remedial", index, txt)
                        }
                        value={el.remedial}
                        style={styles.bodyTextInput}
                        placeholder={"Remedial"}
                      />
                    </View>
                    <View style={styles.inputBodyContainer}>
                      <TextInput
                        onChangeText={(txt) => updateValue("si", index, txt.replace(/[^0-9]/g, ""))}
                        value={el.si}
                        style={styles.bodyTextInput}
                        placeholder={"No"}
                      />
                    </View>
                    <View style={styles.inputBodyContainer}>
                      <TextInput
                        onChangeText={(txt) =>
                          updateValue("c_work", index, txt)
                        }
                        value={el.c_work}
                        style={styles.bodyTextInput}
                        placeholder={"Work"}
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
                      !dynamicInput[dynamicInput.length - 1].days &&
                      !dynamicInput[dynamicInput.length - 1].work &&
                      !dynamicInput[dynamicInput.length - 1].project &&
                      !dynamicInput[dynamicInput.length - 1].plot &&
                      !dynamicInput[dynamicInput.length - 1].description &&
                      !dynamicInput[dynamicInput.length - 1].price &&
                      !dynamicInput[dynamicInput.length - 1].remedial &&
                      !dynamicInput[dynamicInput.length - 1].si &&
                      !dynamicInput[dynamicInput.length - 1].c_work
                    ) {
                      alert(
                        "Please Enter All Value and then move to next Item Add !"
                      );
                    } else {
                      addVerificationRow();
                    }
                  }}
                >
                  <Image style={styles.plusBtn} source={plus} />
                </TouchableOpacity>
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
                <View
                  style={[
                    styles.tableViewContainer,
                    { paddingLeft: 0, paddingRight: 0 },
                  ]}
                >
                  <View style={styles.tableHeader}>
                    <View style={{ width: "50%" }}>
                      <Text style={styles.headerTitle}>Image</Text>
                    </View>
                    <View style={{ width: "50%" }}>
                      <Text style={styles.headerTitle}>Comment</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "100%",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    marginRight: 50,
                    marginTop: 20,
                  }}
                >
                  <TouchableOpacity
                    style={[styles.addBtn]}
                    onPress={() => {
                      if (
                        projectImagesComment.length > 0 &&
                        !projectImagesComment[projectImagesComment.length - 1]
                          .image &&
                        !projectImagesComment[projectImagesComment.length - 1]
                          .comment
                      ) {
                        alert(
                          "Please Enter All Value and then move to next Item Add !"
                        );
                      } else {
                        addImagesCommentRow();
                      }
                    }}
                  >
                    <Image style={styles.plusBtn} source={plus} />
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "column" }}>
                  {projectImagesComment.length > 0 &&
                    projectImagesComment.map((el, index) => (
                      <View
                        style={[styles.tableBody, { marginBottom: 20 }]}
                        key={index}
                      >
                        {el.image != "" ? (
                          <View
                            style={{
                              width: "50%",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Image
                              style={{
                                width: 50,
                                height: 50,
                                marginRight: 10,
                              }}
                              source={{ uri: el.image }}
                              key={index}
                            />
                          </View>
                        ) : (
                          <View style={{ width: "50%" }}>
                            <TouchableOpacity
                              style={[
                                styles.button,
                                styles.buttonOpen,
                                { width: "90%" },
                              ]}
                              onPress={() => uploadPhotoImage(index)}
                            >
                              <Text style={styles.textStyle}>Add Image</Text>
                            </TouchableOpacity>
                          </View>
                        )}

                        <View style={{ width: "50%" }}>
                          <TextInput
                            value={el.comment}
                            onChangeText={(txt) =>
                              updateProjectCommentValue("comment", index, txt)
                            }
                            style={styles.bodyTextInput}
                            placeholder={"Comment"}
                          />
                        </View>
                      </View>
                    ))}
                </View>
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
                  onPress={() => verificationWorkFormInsert()}
                >
                  <Text style={styles.commonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
  isVerifyWork: state.auth.isVerifyWork,
  isSuccessMsg: state.auth.isSuccessMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
  createVerificationWorkHandler: (
    projectName,
    idRef,
    decoratorName,
    dynamicInput,
    projectImagesComment,
    commentImages,
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
        projectImagesComment,
        commentImages,
        jobID,
        tabId,
        token
      )
    ),
  // updateVerificationReport: (index) => dispatch(updateVerificationReport(index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(VerificationOfWork);
