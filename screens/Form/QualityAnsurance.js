import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  CheckBox,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Text } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { insertAnsuranceForm } from "../../Redux/action/auth/authActionTypes";
import { connect } from "react-redux";

var plus = require("../../assets/authScreen/plus.png");
const QualityInssurance = ( props ) => {
    const { navigation, token, isSuccessMsg, isSuccess } = props;
    const jobID = Math.floor(Math.random() * 100) + 1;
  const tabId = props.route.params.tabName;
  const [issuranceArray, setInsuraanceArray] = useState([
    {
      title: "Inspection prior to Mist coat (Make Ready Sheet)",
      dateComplte: new Date().toLocaleDateString(),
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title: "Mist Coat (1st coat)",
      dateComplte: new Date().toLocaleDateString(),
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title:
        "Ensure all areas are mist coated properly for e.g. uneven paint application (Snag Sheet)",
      dateComplte: new Date().toLocaleDateString(),
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title: "Inspect Prior to Main Decoration (Make Ready Sheet)",
      dateComplte: new Date().toLocaleDateString(),
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title: "Apply 1st coat of Undercoat to woodworks",
      secondTitle: "Apply 2rd coat to walls and ceilings ",
      dateComplte: new Date().toLocaleDateString(),
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title: "Apply 2nd coat to woodworks",
      secondTitle: "3rd coat to walls and ceilings",
      dateComplte: new Date().toLocaleDateString(),
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title: "Hoover all dust and debris before final coat to woodworks.",
      dateComplte: new Date().toLocaleDateString(),
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title: "Apply 3rd/final coat to the woodworks",
      dateComplte: new Date().toLocaleDateString(),
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title:
        "In the event where the decorators do get paint on the fittings,furniture’s, floors or any unpainted surfaces, these should be left paint free.",
      dateComplte: new Date().toLocaleDateString(),
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title:
        "Supervisor to issue a Snag Sheet to the decorator/s after they have completed their decoration works",
      dateComplte: new Date().toLocaleDateString(),
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title:
        "Supervisor to ensure that items flagged on the snag sheets are all completed during the de-snag/inspection.",
      dateComplte: new Date().toLocaleDateString(),
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title:
        "Hand over units/plots (Hand over sheets to be signed by site managers to confirm that quality is met).",
      dateComplte: new Date().toLocaleDateString(),
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title:
        "Site Managers Snag (inspection of units by site manager by issuing supervisor with their written snag sheet/s).",
      dateComplte: new Date().toLocaleDateString(),
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title: "Site Managers De-snag",
      dateComplte: new Date().toLocaleDateString(),
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title:
        "Builders/Client Final Snag (inspection of units by issuing written snag sheet/s)",
      dateComplte: new Date().toLocaleDateString(),
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title: "Builders/Client De-snag ",
      dateComplte: new Date().toLocaleDateString(),
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
    {
      title: "Hand over sheets for final visit to units/plots",
      dateComplte: new Date().toLocaleDateString(),
      keyLetter: "",
      comment: "",
      managerSign: "",
    },
  ]);
  const [keyArray, setKeyArray] = useState([
    { keys: "C =", keyDetails: "Completed (Quality met)" },
    { keys: "D =", keyDetails: "Design Failure" },
    { keys: "M =", keyDetails: "Material Failure" },
    { keys: "P =", keyDetails: "Plant Failure" },
    { keys: "ShapePT =", keyDetails: "Proceeding Trade" },
    { keys: "Q =", keyDetails: "Quality Failure" },
    { keys: "S =", keyDetails: "System of work Failure" },
    { keys: "O = ", keyDetails: "Others" },
  ]);
  const [activityArray, setActivityArray] = useState([
    { activity: "Mist Coat", date: new Date().toLocaleDateString(), sign: "" },
    { activity: "Main Decoration", date: new Date().toLocaleDateString(), sign: "" },
    { activity: "Site Managers Snag", date: new Date().toLocaleDateString(), sign: "" },
    { activity: "Builders/Client Snag ", date: new Date().toLocaleDateString(), sign: "" },
  ]);
  const [newRow, setNewRow] = useState([]);

  const addRow = () => {
    setNewRow((oldArray) => [
      ...oldArray,
      { area: "1", description: "2", yes: "no", comments: "hi" },
    ]);
  };
  const [date, setDate] = useState(new Date(1598051730000));
  const [dateActivity, setDateActivity] = useState(new Date(1598051730000));
  const [show, setShow] = useState({
    isVisible: false,
    index: -1,
  });
  const [showActivity, setShowActivity] = useState({
    isVisible: false,
    index: -1,
  });

  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow({ ...show, isVisible: false, index: -1 });
    let copyArr = [...issuranceArray];
    copyArr[show.index].dateComplte = currentDate.toLocaleDateString();
    setInsuraanceArray(copyArr);
  };
  const showDatepicker = (index = -1) => {
    setShow({ ...show, isVisible: true, index: index });
  };
  const showActivityDatepicker = (index = -1) => {
    setShowActivity({ ...showActivity, isVisible: true, index: index });
  };
  const updateValue = (key, index, value) => {
    let preData = [...issuranceArray];
    preData[index][key] = value;
    setInsuraanceArray(preData);
  };
  const onActivityChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowActivity({ ...showActivity, isVisible: false, index: -1 });
    let copyArr = [...activityArray];
    copyArr[showActivity.index].date = currentDate.toLocaleDateString();
    setActivityArray(copyArr);
  };
  const [projectName, setProjectName] = useState("");
  const [unitPlot, setUnitPlot] = useState("");
  const [mcSign, setMcSign] = useState("");
  const [mdSign, setMdSign] = useState("");
  const [smsSign, setSmsSign] = useState("");
  const [bscsSign, setBscsSign] = useState("");

  const qualityAnsuranceFormInsert = () =>{
    if (
        projectName != "" &&
        unitPlot != "" &&
        mcSign != "" &&
        mdSign != "" &&
        smsSign != "" &&
        bscsSign != "" 
      ) {
        props.createAnsuranceHandler(
            projectName,
            unitPlot,
          issuranceArray,
          activityArray,
          mcSign,
          mdSign,
          smsSign,
          bscsSign,
          jobID,
          tabId,
          token,
        );
      } else {
        alert("Please Insert All Fields CareFully !");
        return false;
      }
  }
  const updateSignValue = (key, index, value) => {
    let preData = [...activityArray];
    preData[index][key] = value;
    setActivityArray(preData);
  };
  useEffect(() => {
    if(isSuccess){     
      if(isSuccessMsg){
          console.log("here !")
          alert(isSuccessMsg)
          navigation.pop();
      }
      }
      else{
          if(isSuccessMsg){
              
              alert(isSuccessMsg)
              return false;
          }
      }
  },[isSuccess,isSuccessMsg])
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
      <DateTimePickerModal
        isVisible={showActivity.isVisible}
        date={date ? date : new Date()}
        mode={"date"}
        is24Hour={true}
        display="default"
        onConfirm={(date) => onActivityChange(date)}
        onCancel={() => setShowActivity({ isVisible: false, index: -1 })}
        cancelTextIOS="Cancel"
        confirmTextIOS="Confirm"
      />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          Quality Assurance Inpection CheckList
        </Text>
      </View>
      <ScrollView style={{ height: "100%" }}>
        <View style={styles.formConatiner}>
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
              value={unitPlot}
              onChangeText={(e) => setUnitPlot(e)}
              style={styles.inputField}
              placeholder={"Unit/Plot"}
            />
          </View>
        </View>
        <View style={styles.tableViewContainer}>
          <View style={styles.tableHeader}>
            <View style={styles.headerTitleView}>
              <Text style={styles.headerTitle}>Activity</Text>
            </View>
            <View style={styles.headerTitleView}>
              <Text style={styles.headerTitle}>Date Completed</Text>
            </View>
            <View style={styles.headerTitleView}>
              <Text style={styles.headerTitle}>Key Letter </Text>
            </View>
            <View style={styles.headerTitleView}>
              <Text style={styles.headerTitle}>Comments</Text>
            </View>
            <View style={styles.headerTitleView}>
              <Text style={styles.headerTitle}>Site Manager/s to sign * </Text>
            </View>
          </View>
          <View style={{ width: "100%" }}>
            {issuranceArray.length > 0 &&
              issuranceArray.map((item, index) => (
                <View
                  style={{
                    marginBottom: 20,
                    paddingRight: 20,
                    paddingLeft: 20,
                  }}
                >
                  <View style={styles.activityTitleView}>
                    <Text
                      style={{ fontSize: 10, fontFamily: "poppins-semiBold" }}
                    >
                      {item.title}
                    </Text>
                    {item.secondTitle && (
                      <Text
                        style={{ fontSize: 10, fontFamily: "poppins-semiBold" }}
                      >
                        {item.title}
                      </Text>
                    )}
                  </View>
                  <View style={styles.tableBody}>
                    <View style={styles.inputBodyContainer}>
                      <Text
                        onPress={() => showDatepicker(index)}
                        style={{
                          width: "100%",

                          paddingTop: 10,
                          fontSize: 12,
                          color: "#96A8B2",
                          fontFamily: "poppins-regular",
                        }}
                      >
                        {new Date(item.dateComplte).toLocaleDateString()}
                      </Text>
                    </View>
                    <View style={styles.inputBodyContainer}>
                      <TextInput
                        style={styles.bodyTextInput}
                        placeholder={"Key Letter"}
                        onChangeText={(txt) =>
                          updateValue("keyLetter", index, txt)
                        }
                        value={item.keyLetter}
                      />
                    </View>
                    <View style={styles.inputBodyContainer}>
                      <TextInput
                        style={styles.bodyTextInput}
                        placeholder={"Comments"}
                        onChangeText={(txt) =>
                          updateValue("comments", index, txt)
                        }
                        value={item.comment}
                      />
                    </View>
                    <View style={styles.inputBodyContainer}>
                      <TextInput
                        style={styles.bodyTextInput}
                        placeholder={"Sign"}
                        onChangeText={(txt) =>
                          updateValue("managerSign", index, txt)
                        }
                        value={item.managerSign}
                      />
                    </View>
                  </View>
                </View>
              ))}
          </View>
          <View>
            <Text style={{ fontSize: 10, fontFamily: "poppins-semiBold" }}>
              Overall comments once all the above is completed:{" "}
            </Text>
          </View>
          <View style={styles.tableHeader}>
            <View style={styles.headerCompletionTitleView}>
              <Text style={styles.headerCompletionTitle}>KEY</Text>
            </View>
            <View style={styles.headerCompletionTitleView}>
              <Text style={styles.headerCompletionTitle}>
                Site Mannagers to sign after Completion
              </Text>
            </View>
          </View>
          <View style={styles.keyActivityDiv}>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.keyDiv}>
                {keyArray.map((item, index) => (
                  <View style={styles.keyTextView}>
                    <Text
                      style={{ fontSize: 10, fontFamily: "poppins-semiBold" }}
                    >
                      {item.keys}
                    </Text>
                    <Text
                      style={{ fontSize: 10, fontFamily: "poppins-regular" }}
                    >
                      {item.keyDetails}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={styles.activityDiv}>
                <View style={styles.tableActivityHeader}>
                  <View style={styles.headerActivityTitleView}>
                    <Text style={styles.headerActivityTitle}>Activity</Text>
                  </View>
                  <View style={styles.headerActivityTitleView}>
                    <Text style={styles.headerActivityTitle}>Date</Text>
                  </View>
                  <View style={styles.headerActivityTitleView}>
                    <Text style={styles.headerActivityTitle}>Sign</Text>
                  </View>
                </View>
                <View style={styles.tableActivityBody}>
                  <View style={styles.activityListView}>
                    {activityArray.length > 0 &&
                      activityArray.map((item, index) => (
                        <View
                          style={{ flexDirection: "row", width: "100%" }}
                          key={index}
                        >
                          <View
                            style={[styles.activityTitle, { width: "33.3%" }]}
                          >
                            <Text
                              style={{
                                fontSize: 8,
                                fontFamily: "poppins-semiBold",
                                paddingTop: 8,
                              }}
                            >
                              {item.activity}
                            </Text>
                          </View>

                          <View style={{ width: "30.3%", marginRight: 5 }}>
                            <Text
                              onPress={() => showActivityDatepicker(index)}
                              style={{
                                width: "100%",
                                paddingTop: 18,
                                fontSize: 8,
                                color: "#96A8B2",
                                fontFamily: "poppins-regular",
                                borderBottomWidth: 1,
                                borderBottomColor: "#96A8B2",
                                padding: 5,
                                color: "#96A8B2",
                              }}
                            >
                              {new Date(item.date).toLocaleDateString()}
                            </Text>
                          </View>
                          <View style={{ width: "30.3%" }}>
                            <TextInput
                              style={[
                                styles.bodyTextInput,
                                { width: "100%", fontSize: 8 },
                              ]}
                              placeholder={"Sign"}
                              value={item.sign}
                                onChangeText={(txt) =>
                                updateSignValue("sign", index, txt)
                                }
                            />
                          </View>
                        </View>
                      ))}
                  </View>
                </View>
              </View>
            </View>
          </View>
          <Text
            style={{
              paddingTop: 20,
              paddingBottom: 20,
              color: "#96A8B2",
              fontSize: 12,
              fontFamily: "poppins-semiBold",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                color: "#96A8B2",
                fontSize: 12,
                fontFamily: "poppins-semiBold",
              }}
            >
              Quality Insurance
            </Text>{" "}
            is an audit process to verify that the quality of work performed is
            what was inspected and reported.
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "poppins-semiBold",
              color: "#000",
            }}
          >
            Supervisor Sign
          </Text>
          <View style={styles.inputFieldContainer}>
            <TextInput
              value={mcSign}
              onChangeText={(e) => setMcSign(e)}
              style={styles.inputField}
              placeholder={"MC"}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              value={mdSign}
              onChangeText={(e) => setMdSign(e)}
              style={styles.inputField}
              placeholder={"MD"}
            />
          </View>
          <View
            
            style={styles.inputFieldContainer}
          >
            <TextInput value={smsSign}
            onChangeText={(e) => setSmsSign(e)} style={styles.inputField} placeholder={"SMS"} />
          </View>
          <View
           
            style={styles.inputFieldContainer}
          >
            <TextInput  value={bscsSign}
            onChangeText={(e) => setBscsSign(e)} style={styles.inputField} placeholder={"BS/CS"} />
          </View>
          <View
            style={{
              backgroundColor: "#000",
              width: "100%",
              height: 2,
            }}
          ></View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.commonBtn}
              onPress={() => qualityAnsuranceFormInsert()}
            >
              <Text style={styles.commonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = (state) => ({
    token: state.auth.token,
    isSuccess: state.auth.isSuccess,
    isSuccessMsg: state.auth.isSuccessMsg
  });
  const mapDispatchToProps = (dispatch) => ({
    createAnsuranceHandler: ( projectName,
        unitPlot,
      issuranceArray,
      activityArray,
      mcSign,
      mdSign,
      smsSign,
      bscsSign,
      jobID,
      tabId,
      token,

    ) =>
      dispatch(
        insertAnsuranceForm(
            projectName,
            unitPlot,
          issuranceArray,
          activityArray,
          mcSign,
          mdSign,
          smsSign,
          bscsSign,
          jobID,
          tabId,
          token,
        )
      ),
  });
  export default connect(mapStateToProps, mapDispatchToProps)(QualityInssurance);
const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
  },
  titleContainer: {
    height: "5%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
  titleText: {
    color: "#4F4F4F",
    fontSize: 18,
    fontFamily: "poppins-semiBold",
    textAlign: "center",
  },
  formConatiner: {
    height: "5%",
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 30,
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
  inputContainer: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  tableHeader: {
    flexDirection: "row",
    width: "100%",
    marginTop: 30,
    borderWidth: 1,
    height: "2%",
    marginBottom:10
  },
  tableActivityHeader: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
  },
  headerTitleView: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerCompletionTitleView: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerActivityTitleView: {
    width: "33.3%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 8,
    textAlign: "center",
    fontFamily: "poppins-bold",
  },
  headerCompletionTitle: {
    fontSize: 8,
    textAlign: "center",
    fontFamily: "poppins-bold",
  },
  headerActivityTitle: {
    fontSize: 8,
    textAlign: "center",
    fontFamily: "poppins-bold",
  },
  inputBodyContainer: {
    width: "20%",
  },

  bodyTextInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#96A8B2",
    padding: 5,
    fontSize: 12,
    color: "#96A8B2",
    marginLeft: 5,
    marginRight: 5,
    fontFamily: "poppins-regular",
  },
  tableBody: {
    width: "100%",
    flexDirection: "row",
    marginLeft: "20%",
  },
  tableActivityBody: {
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
  tableViewContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    height: "80%",
    width: "100%",
  },
  keyActivityDiv: {
    width: "100%",
  },
  keyDiv: {
    width: "30%",
    height: "100%",
    paddingTop: 10,
  },
  activityDiv: {
    width: "70%",
    paddingLeft: 20,
  },
  keyTextView: {
    flexDirection: "row",
    paddingLeft: 10,
  },
  activityListView: {
    width: "100%",
  },
  activityInputView: {
    width: "60%",
    height: "100%",
  },
  activityTitle: {
    height: 40,
    width: "100%",
    padding: 10,
  },
  btnContainer: {
    width: "100%",
    height: "15%",
    marginBottom: 40,
    marginTop: 20,
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
