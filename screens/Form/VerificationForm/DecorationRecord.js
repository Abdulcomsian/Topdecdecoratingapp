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
import { connect } from "react-redux";
import { insertDecorationRecord } from "../../../Redux/action/auth/authActionTypes";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { updateVerificationReport } from "../../../Redux/action/summary/Summary";
import * as ImagePicker from "expo-image-picker";
import { AssetsSelector } from "expo-images-picker";

var plus = require("../../../assets/authScreen/plus.png");
const DecorationRecord = (props) => {
  const { navigation, token, isSuccessMsg, isDecoration, isJobId } = props;
  // const jobID = Math.floor(Math.random() * 100) + 1;
  const { plot_id } = props.route.params;
  const jobID = plot_id;
  console.log("Decoration Plot ID :", jobID);
  const tabId = props.route.params.tabName;
  const [dynamicFirstInput, setdynamicFirstInput] = useState([]);
  const [dynamicSecondInput, setdynamicSeconfInput] = useState([]);

  const addDecorationRow = () => {
    setdynamicFirstInput((oldArray) => [
      ...oldArray,
      {
        name: "",
        block: "",
        level: "",
        bed: "",
        price: "",
        plot: "",
        days: "",
        start: "",
        complete: "",
      },
    ]);
  };
  const addDecorationSecondRow = () => {
    setdynamicSeconfInput((oldArray) => [
      ...oldArray,
      {
        name: "",
        block: "",
        level: "",
        bed: "",
        price: "",
        plot: "",
        start: "",
        complete: "",
      },
    ]);
  };
  const updateFirstValue = (key, index, value) => {
    let preData = [...dynamicFirstInput];
    preData[index][key] = value;
    setdynamicFirstInput(preData);
  };
  const updateSecondValue = (key, index, value) => {
    let preData = [...dynamicSecondInput];
    preData[index][key] = value;
    setdynamicSeconfInput(preData);
  };
  const [projectComment, setProjectComment] = useState("");
  const decorationRecordInsert = async () => {
    try {
      if (
        dynamicFirstInput &&
        dynamicSecondInput &&
        jobID !== "" &&
        tabId != "" &&
        projectImagesComment != "" &&
        commentImages != ""
      ) {
        await props.createDecorationRecordHandler(
          dynamicFirstInput,
          dynamicSecondInput,
          projectImagesComment,
          commentImages,
          jobID,
          tabId,
          token
        );
        //props.updateVerificationReport(props?.route?.params?.index);
        alert("Decoration Record Insert SuccessFully !");
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
  const [showComplete, setShowComplete] = useState({
    isVisible: false,
    index: -1,
  });

  const [showDateSecond, setShowDateSecond] = useState({
    isVisible: false,
    index: -1,
  });
  const [showCompleteDateSecond, setShowCompleteDateSecond] = useState({
    isVisible: false,
    index: -1,
  });
  const [date, setDate] = useState(new Date(1598051730000));
  const [dateComplete, setDateComplete] = useState(new Date(1598051730000));
  const [dateSecond, setDateSecond] = useState(new Date(1598051730000));
  const [dateSecondComplete, setDateSecondComplete] = useState(
    new Date(1598051730000)
  );

  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow({ ...show, isVisible: false, index: -1 });
    let copyArr = [...dynamicFirstInput];
    copyArr[show.index].start = currentDate.toLocaleDateString();
    setdynamicFirstInput(copyArr);
  };

  const onCompleteChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowComplete({ ...showComplete, isVisible: false, index: -1 });
    let copyArr = [...dynamicFirstInput];
    copyArr[showComplete.index].complete = currentDate.toLocaleDateString();
    setdynamicFirstInput(copyArr);
  };

  const onDateSecondChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowDateSecond({ ...showDateSecond, isVisible: false, index: -1 });
    let copyArr = [...dynamicSecondInput];
    copyArr[showDateSecond.index].start = currentDate.toLocaleDateString();
    setdynamicSeconfInput(copyArr);
  };

  const onDateCompleteSecondChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowCompleteDateSecond({
      ...showCompleteDateSecond,
      isVisible: false,
      index: -1,
    });
    let copyArr = [...dynamicSecondInput];
    copyArr[showCompleteDateSecond.index].complete =
      currentDate.toLocaleDateString();
    setdynamicSeconfInput(copyArr);
  };
  const [signature, setSignature] = useState({
    index: -1,
  });

  const showStartDatepicker = (index = -1) => {
    setShow({ ...show, isVisible: true, index: index });
  };
  const showCompleteDatepicker = (index = -1) => {
    setShowComplete({ ...showComplete, isVisible: true, index: index });
  };
  const showDateSecondpicker = (index = -1) => {
    setShowDateSecond({ ...showDateSecond, isVisible: true, index: index });
  };
  const showDateCompleteSecondpicker = (index = -1) => {
    setShowCompleteDateSecond({
      ...showCompleteDateSecond,
      isVisible: true,
      index: index,
    });
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
    <ScrollView style={{ height: "100%" }}>
      <View style={styles.mainContainer}>
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
          <View style={{ flex: 1 }}>
            <DateTimePickerModal
              isVisible={show.isVisible}
              testID="dateTimePicker"
              value={date}
              mode={Platform.OS === "ios" ? "date" : "date"}
              display="default"
              onCancel={() => setShow({ isVisible: false, index: -1 })}
              onConfirm={(date) => onChange(date)}
              format="DD-MM-YYYY"
            />
            <DateTimePickerModal
              isVisible={showComplete.isVisible}
              testID="dateTimePicker"
              value={dateComplete}
              mode={Platform.OS === "ios" ? "date" : "date"}
              display="default"
              onCancel={() => setShowComplete({ isVisible: false, index: -1 })}
              onConfirm={(date) => onCompleteChange(date)}
              format="DD-MM-YYYY"
            />
            <DateTimePickerModal
              isVisible={showDateSecond.isVisible}
              testID="dateTimePicker"
              value={dateSecond}
              mode={Platform.OS === "ios" ? "date" : "date"}
              display="default"
              onCancel={() =>
                setShowDateSecond({ isVisible: false, index: -1 })}
              onConfirm={(date) => onDateSecondChange(date)}
              format="DD-MM-YYYY"
            />
            <DateTimePickerModal
              isVisible={showCompleteDateSecond.isVisible}
              testID="dateTimePicker"
              value={dateSecondComplete}
              mode={Platform.OS === "ios" ? "date" : "date"}
              display="default"
              onCancel={() =>
                setShowCompleteDateSecond({ isVisible: false, index: -1 })}
              onConfirm={(date) => onDateCompleteSecondChange(date)}
              format="DD-MM-YYYY"
            />
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Decoration Record</Text>
            </View>
            <View style={{ height: "95%", width: "100%" }}>
              <ScrollView
                style={{ height: "100%", paddingLeft: 20, paddingRight: 20 }}
              >
                <View style={styles.tableViewContainer}>
                  <View style={styles.tableHeader}>
                    <View style={styles.headerTitleView}>
                      <Text style={styles.headerTitle}>Name</Text>
                    </View>
                    <View style={styles.headerTitleView}>
                      <Text style={styles.headerTitle}>Block</Text>
                    </View>
                    <View style={styles.headerTitleView}>
                      <Text style={styles.headerTitle}>Level</Text>
                    </View>
                    <View style={styles.headerTitleView}>
                      <Text style={styles.headerTitle}>Bed Room/s</Text>
                    </View>
                    <View style={styles.headerTitleView}>
                      <Text style={styles.headerTitle}>Price</Text>
                    </View>
                    <View style={styles.headerTitleView}>
                      <Text style={styles.headerTitle}>Plot/Areas</Text>
                    </View>
                    <View style={styles.headerTitleView}>
                      <Text style={styles.headerTitle}>No. of days</Text>
                    </View>
                    <View style={styles.headerTitleView}>
                      <Text style={styles.headerTitle}>Start Date</Text>
                    </View>
                    <View style={styles.headerTitleView}>
                      <Text style={styles.headerTitle}>Completion date</Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: "column" }}>
                    {dynamicFirstInput.length > 0 &&
                      dynamicFirstInput.map((el, index) => (
                        <View style={styles.tableBody} key={index}>
                          <View style={styles.inputBodyContainer}>
                            <TextInput
                              onChangeText={(txt) =>
                                updateFirstValue("name", index, txt)
                              }
                              value={el.name}
                              style={styles.bodyTextInput}
                              placeholder={"Name"}
                            />
                          </View>
                          <View style={styles.inputBodyContainer}>
                            <TextInput
                              onChangeText={(txt) =>
                                updateFirstValue("block", index, txt)
                              }
                              value={el.block}
                              style={styles.bodyTextInput}
                              placeholder={"Block"}
                            />
                          </View>
                          <View style={styles.inputBodyContainer}>
                            <TextInput
                              onChangeText={(txt) =>
                                updateFirstValue("level", index, txt)
                              }
                              value={el.level}
                              style={styles.bodyTextInput}
                              placeholder={"level"}
                            />
                          </View>
                          <View style={styles.inputBodyContainer}>
                            <TextInput
                              onChangeText={(txt) =>
                                updateFirstValue("bed", index, txt)
                              }
                              value={el.bed}
                              style={styles.bodyTextInput}
                              placeholder={"Rooms"}
                            />
                          </View>
                          <View style={styles.inputBodyContainer}>
                            <TextInput
                              onChangeText={(txt) =>
                                updateFirstValue("price", index, txt.replace(/[^0-9]/g, ""))
                              }
                              value={el.price}
                              style={styles.bodyTextInput}
                              placeholder={"Price"}
                            />
                          </View>
                          <View style={styles.inputBodyContainer}>
                            <TextInput
                              onChangeText={(txt) =>
                                updateFirstValue("plot", index, txt)
                              }
                              value={el.plot}
                              style={styles.bodyTextInput}
                              placeholder={"Plot"}
                            />
                          </View>
                          <View style={styles.inputBodyContainer}>
                            <TextInput
                              onChangeText={(txt) =>
                                updateFirstValue("days", index, txt.replace(/[^0-9]/g, ""))
                              }
                              value={el.days}
                              style={styles.bodyTextInput}
                              placeholder={"Days"}
                            />
                          </View>
                          <View style={styles.inputBodyContainer}>
                            <Text
                              onPress={() => showStartDatepicker(index)}
                              style={{
                                borderBottomWidth: 1,
                                borderBottomColor: "#96A8B2",
                                fontSize: 10,
                                color: "#96A8B2",
                                fontFamily: "poppins-regular",
                              }}
                            >
                              {
                          el.start
                            ? el.start
                            : "Date"
                        }
                            </Text>
                          </View>
                          <View style={styles.inputBodyContainer}>
                            <Text
                              onPress={() => showCompleteDatepicker(index)}
                              style={{
                                borderBottomWidth: 1,
                                borderBottomColor: "#96A8B2",
                                fontSize: 12,
                                color: "#96A8B2",
                                fontFamily: "poppins-regular",
                              }}
                            >
                              {
                         el.complete
                            ? el.complete
                            : "Date"
                        }
                            </Text>
                          </View>
                        </View>
                      ))}
                  </View>
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
                          dynamicFirstInput.length > 0 &&
                          !dynamicFirstInput[dynamicFirstInput.length - 1]
                            .name &&
                          !dynamicFirstInput[dynamicFirstInput.length - 1]
                            .block &&
                          !dynamicFirstInput[dynamicFirstInput.length - 1]
                            .level &&
                          !dynamicFirstInput[dynamicFirstInput.length - 1]
                            .bed &&
                          !dynamicFirstInput[dynamicFirstInput.length - 1]
                            .price &&
                          !dynamicFirstInput[dynamicFirstInput.length - 1]
                            .plot &&
                          !dynamicFirstInput[dynamicFirstInput.length - 1].days
                        ) {
                          alert(
                            "Please Enter All Value and then move to next Item Add !"
                          );
                        } else {
                          addDecorationRow();
                        }
                      }}
                    >
                      <Image style={styles.plusBtn} source={plus} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleText}>Decoration Record</Text>
                </View>
                <View style={styles.tableViewContainer}>
                  <View style={styles.tableHeader}>
                    <View style={styles.headerDecorationTitleView}>
                      <Text style={styles.headerTitle}>Name</Text>
                    </View>
                    <View style={styles.headerDecorationTitleView}>
                      <Text style={styles.headerTitle}>Block</Text>
                    </View>
                    <View style={styles.headerDecorationTitleView}>
                      <Text style={styles.headerTitle}>Level</Text>
                    </View>
                    <View style={styles.headerDecorationTitleView}>
                      <Text style={styles.headerTitle}>Bed Room/s</Text>
                    </View>
                    <View style={styles.headerDecorationTitleView}>
                      <Text style={styles.headerTitle}>Price</Text>
                    </View>
                    <View style={styles.headerDecorationTitleView}>
                      <Text style={styles.headerTitle}>Plot</Text>
                    </View>
                    <View style={styles.headerDecorationTitleView}>
                      <Text style={styles.headerTitle}>Start Date</Text>
                    </View>
                    <View style={styles.headerDecorationTitleView}>
                      <Text style={styles.headerTitle}>Completion date</Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: "column" }}>
                    {dynamicSecondInput.length > 0 &&
                      dynamicSecondInput.map((el, index) => (
                        <View style={styles.tableBody} key={index}>
                          <View style={styles.inputSecondBodyContainer}>
                            <TextInput
                              onChangeText={(txt) =>
                                updateSecondValue("name", index, txt)
                              }
                              value={el.name}
                              style={styles.bodyTextInput}
                              placeholder={"Name"}
                            />
                          </View>
                          <View style={styles.inputSecondBodyContainer}>
                            <TextInput
                              onChangeText={(txt) =>
                                updateSecondValue("block", index, txt)
                              }
                              value={el.block}
                              style={styles.bodyTextInput}
                              placeholder={"Block"}
                            />
                          </View>
                          <View style={styles.inputSecondBodyContainer}>
                            <TextInput
                              onChangeText={(txt) =>
                                updateSecondValue("level", index, txt)
                              }
                              value={el.level}
                              style={styles.bodyTextInput}
                              placeholder={"level"}
                            />
                          </View>
                          <View style={styles.inputSecondBodyContainer}>
                            <TextInput
                              onChangeText={(txt) =>
                                updateSecondValue("bed", index, txt)
                              }
                              value={el.bed}
                              style={styles.bodyTextInput}
                              placeholder={"Rooms"}
                            />
                          </View>
                          <View style={styles.inputSecondBodyContainer}>
                            <TextInput
                              onChangeText={(txt) =>
                                updateSecondValue("price", index, txt.replace(/[^0-9]/g, ""))
                              }
                              value={el.price}
                              style={styles.bodyTextInput}
                              placeholder={"Price"}
                            />
                          </View>
                          <View style={styles.inputSecondBodyContainer}>
                            <TextInput
                              onChangeText={(txt) =>
                                updateSecondValue("plot", index, txt)
                              }
                              value={el.plot}
                              style={styles.bodyTextInput}
                              placeholder={"Plot"}
                            />
                          </View>
                          <View style={styles.inputSecondBodyContainer}>
                            <Text
                              onPress={() => showDateSecondpicker(index)}
                              style={{
                                borderBottomWidth: 1,
                                borderBottomColor: "#96A8B2",
                                fontSize: 12,
                                color: "#96A8B2",
                                fontFamily: "poppins-regular",
                              }}
                            >
                              {
                         el.start
                            ? el.start
                            : "Date"
                        }
                            </Text>
                          </View>
                          <View style={styles.inputSecondBodyContainer}>
                            <Text
                              onPress={() =>
                                showDateCompleteSecondpicker(index)
                              }
                              style={{
                                borderBottomWidth: 1,
                                borderBottomColor: "#96A8B2",
                                fontSize: 12,
                                color: "#96A8B2",
                                fontFamily: "poppins-regular",
                              }}
                            >
                              {
                         el.complete
                            ? el.complete
                            : "Date"
                        }
                            </Text>
                          </View>
                        </View>
                      ))}
                  </View>
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
                          dynamicSecondInput.length > 0 &&
                          !dynamicSecondInput[dynamicSecondInput.length - 1]
                            .name &&
                          !dynamicSecondInput[dynamicSecondInput.length - 1]
                            .block &&
                          !dynamicSecondInput[dynamicSecondInput.length - 1]
                            .level &&
                          !dynamicSecondInput[dynamicSecondInput.length - 1]
                            .bed &&
                          !dynamicSecondInput[dynamicSecondInput.length - 1]
                            .price &&
                          !dynamicSecondInput[dynamicSecondInput.length - 1]
                            .plot
                        ) {
                          alert(
                            "Please Enter All Value and then move to next Item Add !"
                          );
                        } else {
                          addDecorationSecondRow();
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
                            !projectImagesComment[
                              projectImagesComment.length - 1
                            ].image &&
                            !projectImagesComment[
                              projectImagesComment.length - 1
                            ].comment
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
                                  <Text style={styles.textStyle}>
                                    Add Image
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            )}

                            <View style={{ width: "50%" }}>
                              <TextInput
                                value={el.comment}
                                onChangeText={(txt) =>
                                  updateProjectCommentValue(
                                    "comment",
                                    index,
                                    txt
                                  )
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
                      height: ".5%",
                      marginBottom: 20,
                      marginTop: 20,
                    }}
                  ></View>
                  <View style={styles.btnContainer}>
                    <TouchableOpacity
                      style={styles.commonBtn}
                      onPress={() => decorationRecordInsert()}
                    >
                      <Text style={styles.commonText}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
  isDecoration: state.auth.isDecoration,
  isSuccessMsg: state.auth.isSuccessMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
  createDecorationRecordHandler: (
    dynamicFirstInput,
    dynamicSecondInput,
    projectImagesComment,
    commentImages,
    jobID,
    tabId,
    token
  ) =>
    dispatch(
      insertDecorationRecord(
        dynamicFirstInput,
        dynamicSecondInput,
        projectImagesComment,
        commentImages,
        jobID,
        tabId,
        token
      )
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(DecorationRecord);

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    paddingBottom: 50,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#1073AC",
  },
  buttonClose: {
    backgroundColor: "#1073AC",
  },
  textStyle: {
    color: "white",
    textAlign: "center",
    fontFamily: "poppins-semiBold",
    fontSize: 10,
  },
  titleContainer: {
    height: "5%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  titleText: {
    color: "#4F4F4F",
    fontSize: 18,
    fontFamily: "poppins-semiBold",
  },
  tableHeader: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
    marginTop: 20,
  },
  headerTitleView: {
    width: "11.1%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerDecorationTitleView: {
    width: "12.5%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 8,
    textAlign: "center",
    fontFamily: "poppins-bold",
  },
  plusBtn: {
    width: 12,
    height: 12,
  },
  addBtn: {
    justifyContent: "center",
    backgroundColor: "#F6F9FB",
    borderWidth: 1,
    borderColor: "#E2ECF2",
    padding: 5,
    borderRadius: 14,
    marginTop: 15,
  },
  inputBodyContainer: {
    width: "11.1%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputSecondBodyContainer: {
    width: "12.5%",
    justifyContent: "center",
    alignItems: "center",
  },
  bodyTextInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#96A8B2",
    padding: 5,
    fontSize: 12,
    color: "#96A8B2",
    marginLeft: 2,
    marginRight: 2,
    fontFamily: "poppins-regular",
  },
  tableBody: {
    width: "100%",
    flexDirection: "row",
  },
  inputSecondBodyContainer: {
    width: "12.5%",
    justifyContent: "center",
    alignItems: "center",
  },
  commonBtn: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 3,
    borderColor: "#1073AC",
  },
  commonText: {
    color: "#1073AC",
    fontSize: 18,
    fontFamily: "poppins-semiBold",
  },
  btnContainer: {
    width: "100%",
    height: "15%",
    marginBottom: 20,
  },
});
