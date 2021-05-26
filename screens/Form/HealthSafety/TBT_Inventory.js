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
import { insertTbtInventory } from "../../../Redux/action/auth/authActionTypes";
import { updateHealthReport } from "../../../Redux/action/summary/Summary";
import * as ImagePicker from "expo-image-picker";
import { AssetsSelector } from "expo-images-picker";

var mainImage = require("../../../assets/authScreen/logo.jpeg");
var plus = require("../../../assets/authScreen/plus.png");
const TBTINVENTORY = (props) => {
  const { navigation, token, isOnSite, isSuccessMsg, isJobId } = props;
  // const jobID = Math.floor(Math.random() * 100) + 1;
  const { plot_Id } = props.route.params;
  const jobID = plot_Id;
  console.log("Work Plot ID :", jobID);
  const tabId = props.route.params.tabName;
  console.log("Work Tab ID :", tabId);
  const [getSign, setGetSign] = useState(false);
  const [inventoryArray, setInventoryArray] = useState([
    {
      title: "Hop Ups",
      equipment: "",
      date_1: new Date().toLocaleDateString(),
      tagged: "",
      stock: "",
      location: "",
      due_date: new Date().toLocaleDateString(),
      condition: "",
      needs: "",
      comment: "",
    },
    {
      title: "Step Ladders",
      equipment: "",
      date_1: new Date().toLocaleDateString(),
      tagged: "",
      stock: "",
      location: "",
      due_date: new Date().toLocaleDateString(),
      condition: "",
      needs: "",
      comment: "",
    },
    {
      title: "Ladders",
      equipment: "",
      date_1: new Date().toLocaleDateString(),
      tagged: "",
      stock: "",
      location: "",
      due_date: new Date().toLocaleDateString(),
      condition: "",
      needs: "",
      comment: "",
    },
    {
      title: "Staircase Podium",
      equipment: "",
      date_1: new Date().toLocaleDateString(),
      tagged: "",
      stock: "",
      location: "",
      due_date: new Date().toLocaleDateString(),
      condition: "",
      needs: "",
      comment: "",
    },
    {
      title: "Mobile Towers",
      equipment: "",
      date_1: new Date().toLocaleDateString(),
      tagged: "",
      stock: "",
      location: "",
      due_date: new Date().toLocaleDateString(),
      condition: "",
      needs: "",
      comment: "",
    },
  ]);

  const [date, setDate] = useState(new Date(1598051730000));
  const [dateActivity, setDateActivity] = useState(new Date(1598051730000));
  const [dateSupervisor, setDateSupervisor] = useState(
    new Date().toLocaleDateString()
  );
  const [showSupervisor, setSupervisorShow] = useState(false);
  const [supervisorSignature, setSupervisorSignature] = useState(false);
  const [mainContractor, setMainContractor] = useState("");
  const [projectName, setProjectName] = useState("");

  const [show, setShow] = useState({
    isVisible: false,
    index: -1,
  });
  const [showDueDate, setShowDueDate] = useState({
    isVisible: false,
    index: -1,
  });

  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow({ ...show, isVisible: false, index: -1 });
    let copyArr = [...inventoryArray];
    copyArr[show.index].date_1 = currentDate.toLocaleDateString();
    setInventoryArray(copyArr);
  };
  const showDatepicker = (index = -1) => {
    setShow({ ...show, isVisible: true, index: index });
  };
  const showInspectionDueDatepicker = (index = -1) => {
    setShowDueDate({ ...showDueDate, isVisible: true, index: index });
  };
  const onInspectionDueDateChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowDueDate({ ...showDueDate, isVisible: false, index: -1 });
    let copyArr = [...inventoryArray];
    copyArr[showDueDate.index].due_date = currentDate.toLocaleDateString();
    setInventoryArray(copyArr);
  };
  const onSupervisorDateChange = (selectedDate) => {
    const currentDate = selectedDate;
    setSupervisorShow(false);
    setDateSupervisor(new Date(currentDate).toLocaleDateString());
  };
  const showSupervisorDatepicker = () => {
    setSupervisorShow(true);
  };
  const [projectComment, setProjectComment] = useState("");
  const tbtInventoryFormInsert = async () => {
    try {
      if (
        mainContractor != "" &&
        projectName != "" &&
        supervisorSignature != "" &&
        dateSupervisor != "" &&
        inventoryArray != "" &&
        projectImagesComment != "" &&
        commentImages != ""
      ) {
        await props.creatTbtInventoryHandler(
          mainContractor,
          projectName,
          supervisorSignature,
          dateSupervisor,
          inventoryArray,
          projectImagesComment,
          commentImages,
          jobID,
          tabId,
          token,
          props.route.params?.index
        );
        // props.updateHealthReport(props?.route?.params?.index);
        props.navigation.pop();
        alert("TBT INVENTORY Insert SuccessFully !");
      } else {
        alert("Please Insert All Fields CareFully !");
      }
    } catch (err) {
      alert(err.message);
    }
  };
  const updateLabourValue = (key, index, value) => {
    let preData = [...inventoryArray];
    preData[index][key] = value;
    setInventoryArray(preData);
  };
  const [projectImages, setProjectImages] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const onDone = (dataImage) => {
    let copydata = [...projectImagesComment];
    copydata[signature.index].image = dataImage[0].uri;
    setProjectImagesComment([...copydata]);
    setSignature({ ...signature, index: -1 });
    setIsShow(false);
  };

  const goBack = () => {
    setIsShow(false);
  };
  const [signature, setSignature] = useState({
    index: -1,
  });
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
    console.log(index);
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
            date={date ? date : new Date()}
            mode={"date"}
            is24Hour={true}
            display="default"
            onConfirm={(date) => onChange(date)}
            onCancel={() => setShow({ isVisible: false, index: -1 })}
            cancelTextIOS="Cancel"
            confirmTextIOS="Confirm"
          />
          <DateTimePickerModal
            isVisible={showDueDate.isVisible}
            date={date ? date : new Date()}
            mode={"date"}
            is24Hour={true}
            display="default"
            onConfirm={(date) => onInspectionDueDateChange(date)}
            onCancel={() => setShowDueDate({ isVisible: false, index: -1 })}
            cancelTextIOS="Cancel"
            confirmTextIOS="Confirm"
          />
          <DateTimePickerModal
            isVisible={showSupervisor}
            testID="dateTimePicker"
            value={dateSupervisor}
            mode={"date"}
            display="default"
            onConfirm={onSupervisorDateChange}
            onCancel={() => setSupervisorShow(false)}
            format="DD-MM-YYYY"
          />
          {getSign ? (
            <SignatureComponent
              returnImage={(uri) => {
                setSupervisorSignature(uri);
                setGetSign(false);
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
                <Text style={styles.titleText}>
                  Working at Height Equipment - Inventory Control
                </Text>
              </View>
              <ScrollView>
                <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      style={styles.inputField}
                      placeholder={"Main Contractor"}
                      value={mainContractor}
                      onChangeText={(e) => setMainContractor(e)}
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
                    <TouchableOpacity
                      onPress={() => setGetSign(true)}
                      style={styles.inputFieldContainer}
                    >
                      {supervisorSignature ? (
                        <Image
                          style={{
                            marginTop: 20,
                            height: 100,
                            width: 100,
                            backgroundColor: "gray",
                          }}
                          source={{ uri: supervisorSignature }}
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
                          Supervisor Print & Sign
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <Text
                      onPress={() => showSupervisorDatepicker()}
                      style={[styles.inputField, { paddingTop: 15 }]}
                    >
                      {new Date(dateSupervisor).toLocaleDateString()}
                    </Text>
                  </View>

                  <View style={styles.tableViewContainer}>
                    <View style={styles.tableHeader}>
                      <View style={styles.headerEquipmentTitleView}>
                        <Text style={styles.headerTitle}>Equipments</Text>
                      </View>
                      <View style={styles.headerEquipmentTitleView}>
                        <Text style={styles.headerTitle}>Inspection Date</Text>
                      </View>
                      <View style={styles.headerEquipmentTitleView}>
                        <Text style={styles.headerTitle}>Tagged/ Labelled</Text>
                      </View>
                      <View style={styles.headerEquipmentTitleView}>
                        <Text style={styles.headerTitle}>Qty. in Stock</Text>
                      </View>
                      <View style={styles.headerEquipmentTitleView}>
                        <Text style={styles.headerTitle}>Location</Text>
                      </View>
                      <View style={styles.headerEquipmentTitleView}>
                        <Text style={styles.headerTitle}>
                          Inspection due date
                        </Text>
                      </View>
                      <View style={styles.headerEquipmentTitleView}>
                        <Text style={styles.headerTitle}>
                          In good condition
                        </Text>
                      </View>
                      <View style={styles.headerEquipmentTitleView}>
                        <Text style={styles.headerTitle}>
                          Needs repair/replaced
                        </Text>
                      </View>
                      <View style={styles.headerEquipmentTitleView}>
                        <Text style={styles.headerTitle}>Comments</Text>
                      </View>
                    </View>
                    {inventoryArray.map((item, index) => (
                      <View key={index}>
                        <Text
                          style={{
                            fontFamily: "poppins-bold",
                            fontSize: 10,
                            paddingTop: 20,
                          }}
                        >
                          {item.title}
                        </Text>
                        <View style={styles.tableBody}>
                          <View style={styles.inputInventoryBodyContainer}>
                            <TextInput
                              style={styles.bodyTextInput}
                              placeholder={"Equ"}
                              onChangeText={(txt) =>
                                updateLabourValue("equipment", index, txt)
                              }
                              value={item.equipment}
                            />
                          </View>
                          <View style={styles.inputInventoryBodyContainer}>
                            <Text
                              onPress={() => showDatepicker(index)}
                              style={{
                                height: 39,
                                paddingTop: 16,
                                fontSize: 8,
                                color: "#96A8B2",
                                fontFamily: "poppins-regular",
                                borderBottomWidth: 1,
                                borderBottomColor: "#96A8B2",
                                marginRight: 5,
                                color: "#96A8B2",
                              }}
                            >
                              {new Date(item.date_1).toLocaleDateString()}
                            </Text>
                          </View>
                          <View style={styles.inputInventoryBodyContainer}>
                            <TextInput
                              style={styles.bodyTextInput}
                              placeholder={"Tagged"}
                              onChangeText={(txt) =>
                                updateLabourValue("tagged", index, txt)
                              }
                              value={item.tagged}
                            />
                          </View>
                          <View style={styles.inputInventoryBodyContainer}>
                            <TextInput
                              style={styles.bodyTextInput}
                              placeholder={"Qty."}
                              onChangeText={(txt) =>
                                updateLabourValue("stock", index, txt)
                              }
                              value={item.stock}
                            />
                          </View>
                          <View style={styles.inputInventoryBodyContainer}>
                            <TextInput
                              style={styles.bodyTextInput}
                              placeholder={"Location"}
                              onChangeText={(txt) =>
                                updateLabourValue("location", index, txt)
                              }
                              value={item.location}
                            />
                          </View>
                          <View style={styles.inputInventoryBodyContainer}>
                            <Text
                              onPress={() => showInspectionDueDatepicker(index)}
                              style={{
                                height: 39,
                                paddingTop: 16,
                                fontSize: 8,
                                color: "#96A8B2",
                                fontFamily: "poppins-regular",
                                borderBottomWidth: 1,
                                borderBottomColor: "#96A8B2",
                                marginRight: 5,
                                color: "#96A8B2",
                              }}
                            >
                              {new Date(item.due_date).toLocaleDateString()}
                            </Text>
                          </View>
                          <View style={styles.inputInventoryBodyContainer}>
                            <TextInput
                              style={styles.bodyTextInput}
                              placeholder={"Condition"}
                              onChangeText={(txt) =>
                                updateLabourValue("condition", index, txt)
                              }
                              value={item.condition}
                            />
                          </View>
                          <View style={styles.inputInventoryBodyContainer}>
                            <TextInput
                              style={styles.bodyTextInput}
                              placeholder={"Replaced"}
                              onChangeText={(txt) =>
                                updateLabourValue("needs", index, txt)
                              }
                              value={item.needs}
                            />
                          </View>
                          <View style={styles.inputInventoryBodyContainer}>
                            <TextInput
                              multiline={true}
                              numberOfLines={4}
                              style={styles.bodyTextInput}
                              placeholder={"Comments"}
                              onChangeText={(txt) =>
                                updateLabourValue("comment", index, txt)
                              }
                              value={item.comment}
                            />
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                  <Text
                    style={{
                      fontFamily: "poppins-bold",
                      fontSize: 10,
                      paddingTop: 20,
                      textAlign: "center",
                    }}
                  >
                    Once completed, please file a copy in the Site Folder and
                    send a copy to our Office. Also, please give a copy to the
                    Site Staff.
                  </Text>
                  <View style={styles.footerView}>
                    <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                      Address: 2,
                      <Text
                        style={{ fontFamily: "poppins-regular", fontSize: 10 }}
                      >
                        {" "}
                        Green Lane, Penge, London SE20 7JA
                      </Text>
                    </Text>
                    <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                      T:{" "}
                      <Text
                        style={{ fontFamily: "poppins-regular", fontSize: 10 }}
                      >
                        {" "}
                        0208 676 060
                      </Text>
                    </Text>
                    <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                      F:{" "}
                      <Text
                        style={{ fontFamily: "poppins-regular", fontSize: 10 }}
                      >
                        {" "}
                        0208 676 0671
                      </Text>
                    </Text>
                    <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                      M:{" "}
                      <Text
                        style={{ fontFamily: "poppins-regular", fontSize: 10 }}
                      >
                        {" "}
                        07737 632206
                      </Text>
                    </Text>
                    <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                      E:{" "}
                      <Text
                        style={{ fontFamily: "poppins-regular", fontSize: 10 }}
                      >
                        {" "}
                        info@topdecdecorating.com
                      </Text>
                    </Text>
                    <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                      W:{" "}
                      <Text
                        style={{ fontFamily: "poppins-regular", fontSize: 10 }}
                      >
                        {" "}
                        www.topdecdecorating.com
                      </Text>
                    </Text>
                    <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                      VAT Registration Number:{" "}
                      <Text
                        style={{ fontFamily: "poppins-regular", fontSize: 10 }}
                      >
                        {" "}
                        203 474 927
                      </Text>
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
                      height: 2,
                      marginBottom: 20,
                      marginTop: 20,
                    }}
                  ></View>
                  <View style={styles.btnContainer}>
                    <TouchableOpacity
                      style={styles.commonBtn}
                      onPress={() => tbtInventoryFormInsert()}
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
  isOnSite: state.auth.isOnSite,
  isSuccessMsg: state.auth.isSuccessMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
  creatTbtInventoryHandler: (
    mainContractor,
    projectName,
    supervisorSignature,
    dateSupervisor,
    inventoryArray,
    projectImages,
    projectComment,
    jobID,
    tabId,
    token,
    index
  ) =>
    dispatch(
      insertTbtInventory(
        mainContractor,
        projectName,
        supervisorSignature,
        dateSupervisor,
        inventoryArray,
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
export default connect(mapStateToProps, mapDispatchToProps)(TBTINVENTORY);
