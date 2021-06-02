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
import DateTimePicker from "react-native-modal-datetime-picker";
import { insertScopeForm } from "../../Redux/action/auth/authActionTypes";
import { connect } from "react-redux";
import SignatureComponent from "../../components/SignatureComponent";
import { AssetsSelector } from "expo-images-picker";
import * as ImagePicker from "expo-image-picker";

var plus = require("../../assets/authScreen/plus.png");
const Scope = (props) => {
  const { navigation, token, isScope, isSuccessMsg, isJobId } = props;
  //const jobID = Math.floor(Math.random() * 100) + 1;
  const { plot_Id } = props.route.params;
  const jobID = plot_Id;
  const tabId = props.route.params.tabName;
  const [dynamicInput, setdynamicInput] = useState([]);
  const [date, setDate] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [painterName, setPainterName] = useState("");
  const [plotNumber, setPlotNumber] = useState("");
  const [type, setType] = useState("");
  const [signature, setSignature] = useState("");
  const [getSign, setGetSign] = useState(false);
  const [data, setData] = useState({
    item: "",
    hallway: "",
    bedroom: "",
    room: "",
    bathrroms: "",
    ensuite: "",
  });
  const addRow = () => {
    setdynamicInput((oldArray) => [...oldArray, data]);
    setData({
      item: "",
      hallway: "",
      bedroom: "",
      room: "",
      bathrroms: "",
      ensuite: "",
    });
  };
  const updateValue = (key, index, value) => {
    let preData = [...dynamicInput];
    preData[index][key] = value;
    setdynamicInput(preData);
  };
  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(new Date(currentDate).toLocaleDateString());
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };
  const [projectComment, setProjectComment] = useState("");
  const scopeFormInsert = async () => {
    try {
      if (
        dynamicInput != "" &&
        painterName != "" &&
        plotNumber != "" &&
        type != "" &&
        date != "" &&
        signature != "" &&
        projectImagesComment != "" &&
        commentImages != ""
      ) {
        await props.createScopeHandler(
          dynamicInput,
          painterName,
          signature,
          plotNumber,
          type,
          date,
          projectImagesComment,
          commentImages,
          jobID,
          tabId,
          token,
          props.route.params?.index
        );
        alert("Scope Insert SuccessFully !");
        navigation.pop();
      } else {
        alert("Please Insert All Fields CareFully !");
        return false;
      }
    } catch (err) {
      alert(err.message);
    }
  };
  const [commentImageIndex, setCommentImageIndex] = useState({
    index: -1,
  });
  const CancelPicker = (type) => {
    setShow(false);
  };
  const [projectImages, setProjectImages] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const onDone = (data) => {
    let copydata = [...projectImagesComment];
    copydata[commentImageIndex.index].image = data[0].uri;
    setProjectImagesComment([...copydata]);
    setCommentImageIndex({ ...commentImageIndex, index: -1 });
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
    setCommentImageIndex({ ...commentImageIndex, index: index });
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
    <View style={styles.mainContainer}>
      {isShow ? (
        <View style={{ flex: 1, width: "100%" }}>
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
        <View style={{ flex: 1, width: "100%" }}>
          <DateTimePicker
            isVisible={show}
            testID="dateTimePicker"
            value={date}
            mode={Platform.OS === 'ios' ? "datetime" : "date"}
            display="default"
            onConfirm={onChange}
            onCancel={() => CancelPicker()}
            format="DD-MM-YYYY"
          />

          {getSign ? (
            <SignatureComponent
              returnImage={(uri) => {
                setSignature(uri);
                setGetSign(false);
              }}
            />
          ) : (
            <>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Colour Schedule</Text>
              </View>
              <View style={styles.scopeDescriptionView}>
                <View style={styles.textView}>
                  <Text
                    style={{
                      fontFamily: "poppins-semiBold",
                      fontSize: 10,
                      width: "30%",
                    }}
                  >
                    Frames, doors, skirting boxing:
                  </Text>
                  <Text
                    style={{
                      fontFamily: "poppins-regular",
                      fontSize: 10,
                      width: "70%",
                    }}
                  >
                    to receive two undercoat, one gloss.
                  </Text>
                </View>
                <View style={styles.textView}>
                  <Text
                    style={{
                      fontFamily: "poppins-semiBold",
                      paddingRight: 10,
                      fontSize: 10,
                      width: "30%",
                    }}
                  >
                    Curtain baton:
                  </Text>
                  <Text
                    style={{
                      fontFamily: "poppins-regular",
                      fontSize: 10,
                      width: "70%",
                    }}
                  >
                    to fill, rub down caulk and receive a coat of undercoat
                    before emulsion.
                  </Text>
                </View>
                <View style={styles.textView}>
                  <Text
                    style={{
                      fontFamily: "poppins-semiBold",
                      paddingRight: 10,
                      fontSize: 10,
                      width: "30%",
                    }}
                  >
                    Frames, doors, skirting boxing:
                  </Text>
                  <Text
                    style={{
                      fontFamily: "poppins-regular",
                      fontSize: 10,
                      width: "70%",
                    }}
                  >
                    to receive two undercoat, one gloss.
                  </Text>
                </View>
                <View style={styles.textView}>
                  <Text
                    style={{
                      fontFamily: "poppins-semiBold",
                      paddingRight: 10,
                      fontSize: 10,
                      width: "30%",
                    }}
                  >
                    Frames, doors, skirting boxing:
                  </Text>
                  <Text
                    style={{
                      fontFamily: "poppins-regular",
                      fontSize: 10,
                      width: "70%",
                    }}
                  >
                    bathroom, w/c, kitchen, dinner / living room, to receive one
                    coat of supermatt and two coats of white eggshell.
                  </Text>
                </View>
              </View>
              <ScrollView style={{ width: "100%" }}>
                <View style={{ paddingRight: 20, paddingLeft: 20 }}>
                  <View style={styles.tableViewContainer}>
                    <View style={styles.tableHeader}>
                      <View style={styles.headerTitleView}>
                        <Text style={styles.headerTitle}>Item</Text>
                      </View>
                      <View style={styles.headerTitleView}>
                        <Text style={styles.headerTitle}>Hallway</Text>
                      </View>
                      <View style={styles.headerTitleView}>
                        <Text style={styles.headerTitle}>Bedroom</Text>
                      </View>
                      <View style={styles.headerTitleView}>
                        <Text style={styles.headerTitle}>Diner</Text>
                      </View>
                      <View style={styles.headerTitleView}>
                        <Text style={styles.headerTitle}>W/C Bathrooms</Text>
                      </View>
                      <View style={styles.headerTitleView}>
                        <Text style={styles.headerTitle}>En Ensuite</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "column" }}>
                      {dynamicInput.length > 0 &&
                        dynamicInput.map((el, index) => (
                          <View style={styles.tableBody}>
                            <View style={styles.inputBodyContainer}>
                              <TextInput
                                onChangeText={(txt) =>
                                  updateValue("item", index, txt)
                                }
                                value={el.item}
                                style={styles.bodyTextInput}
                              />
                            </View>
                            <View style={styles.inputBodyContainer}>
                              <TextInput
                                onChangeText={(txt) =>
                                  updateValue("hallway", index, txt)
                                }
                                value={el.hallway}
                                style={styles.bodyTextInput}
                              />
                            </View>
                            <View style={styles.inputBodyContainer}>
                              <TextInput
                                onChangeText={(txt) =>
                                  updateValue("bedroom", index, txt)
                                }
                                value={el.bedroom}
                                style={styles.bodyTextInput}
                              />
                            </View>
                            <View style={styles.inputBodyContainer}>
                              <TextInput
                                onChangeText={(txt) =>
                                  updateValue("room", index, txt)
                                }
                                value={el.room}
                                style={styles.bodyTextInput}
                              />
                            </View>
                            <View style={styles.inputBodyContainer}>
                              <TextInput
                                onChangeText={(txt) =>
                                  updateValue("bathrroms", index, txt)
                                }
                                value={el.bathrroms}
                                style={styles.bodyTextInput}
                              />
                            </View>
                            <View style={styles.inputBodyContainer}>
                              <TextInput
                                onChangeText={(txt) =>
                                  updateValue("ensuite", index, txt)
                                }
                                value={el.ensuite}
                                style={styles.bodyTextInput}
                              />
                            </View>
                          </View>
                        ))}
                    </View>
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
                          dynamicInput.length > 0 &&
                          !dynamicInput[dynamicInput.length - 1].item &&
                          !dynamicInput[dynamicInput.length - 1].hallway &&
                          !dynamicInput[dynamicInput.length - 1].bedroom &&
                          !dynamicInput[dynamicInput.length - 1].room &&
                          !dynamicInput[dynamicInput.length - 1].bathrroms &&
                          !dynamicInput[dynamicInput.length - 1].ensuite
                        ) {
                          alert(
                            "Please Enter All Value and then move to next Item Add !"
                          );
                        } else {
                          addRow();
                        }
                      }}
                    >
                      <Image style={styles.plusBtn} source={plus} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      value={painterName}
                      onChangeText={(e) => setPainterName(e)}
                      style={styles.inputField}
                      placeholder={"Painter Name"}
                    />
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      value={plotNumber}
                      onChangeText={(e) => setPlotNumber(e.replace(/[^0-9]/g, ""))}
                      style={styles.inputField}
                      placeholder={"Plot No"}
                    />
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      value={type}
                      onChangeText={(e) => setType(e)}
                      style={styles.inputField}
                      placeholder={"Type"}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => setGetSign(true)}
                    style={styles.inputFieldContainer}
                  >
                    {signature ? (
                      <Image
                        style={{
                          marginTop: 20,
                          height: 100,
                          width: 100,
                          backgroundColor: "gray",
                        }}
                        source={{ uri: signature }}
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
                  <View style={styles.inputFieldContainer}>
                  <TouchableOpacity onPress={() => showDatepicker()}>
                      <TextInput
                        editable={false}
                        value={date ? new Date(date).toLocaleDateString() : ""}
                        style={styles.inputField}
                        placeholder={"Date"}
                      />
                    </TouchableOpacity>
                    {/* <Text
                      onPress={() => showDatepicker()}
                      style={{
                        width: "100%",
                        height: 60,
                        paddingTop: 20,
                        fontSize: 12,
                        color: "#96A8B2",
                        fontFamily: "poppins-regular",
                      }}
                    >
                      {new Date(date).toLocaleDateString()}
                    </Text> */}
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
                      onPress={() => scopeFormInsert()}
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
  isScope: state.auth.isScope,
  isSuccessMsg: state.auth.isSuccessMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
  createScopeHandler: (
    dynamicInput,
    painterName,
    signature,
    plotNumber,
    type,
    date,
    projectImagesComment,
    commentImages,
    jobID,
    tabId,
    token,
    index
  ) =>
    dispatch(
      insertScopeForm(
        dynamicInput,
        painterName,
        signature,
        plotNumber,
        type,
        date,
        projectImagesComment,
        commentImages,
        jobID,
        tabId,
        token,
        index
      )
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(Scope);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
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
  scopeDescriptionView: {
    height: "30%",
    marginTop: 20,
    width: "100%",
    paddingRight: 20,
    paddingLeft: 20,
  },
  textView: {
    height: "20%",
    width: "100%",
    flexDirection: "row",
  },
  // tableViewContainer:{
  //     paddingLeft:20,
  //     paddingRight:20,
  // },
  tableHeader: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
  },
  headerTitleView: {
    width: "16.6%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 8,
    textAlign: "center",
    fontFamily: "poppins-bold",
  },
  inputView: {
    width: "20%",
  },
  tableBody: {
    width: "100%",
    flexDirection: "row",
  },
  plusBtn: {
    width: 12,
    height: 12,
    justifyContent: "center",
  },
  addBtn: {
    justifyContent: "center",
    backgroundColor: "#F6F9FB",
    borderWidth: 1,
    borderColor: "#E2ECF2",
    padding: 5,
    borderRadius: 14,
  },
  bodyTextInput: {
    width: "90%",
    borderBottomWidth: 1,
    borderBottomColor: "#96A8B2",
    padding: 5,
    fontSize: 12,
    color: "#96A8B2",
    fontFamily: "poppins-regular",
  },
  inputBodyContainer: {
    width: "16.6%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputFieldContainer: {
    width: "100%",
  },
  inputField: {
    height: 52,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#96A8B2",
    padding: 5,
    fontSize: 12,
    color: "#96A8B2",
    fontFamily: "poppins-regular",
  },
  btnContainer: {
    width: "100%",
    height: "15%",
    marginBottom: 20,
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
});
