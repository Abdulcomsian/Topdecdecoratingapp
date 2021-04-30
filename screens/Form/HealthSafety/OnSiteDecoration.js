import React, { useState } from "react";
<<<<<<< HEAD
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Text } from "native-base";
import styles from "../../../assets/css/styles";
import SignatureComponent from "../../../components/SignatureComponent";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { connect } from "react-redux";
import { insertOnSiteDecorationForm } from "../../../Redux/action/auth/authActionTypes";
=======
import { View, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Text } from "native-base";
import styles from "../../../assets/css/styles";
import { connect } from "react-redux";
import { updateHealthReport } from "../../../Redux/action/summary/Summary";
>>>>>>> 8963071f89a3d01cc8c91cb986015da9fe50ddcf

var mainImage = require("../../../assets/authScreen/Accurate-daywork-sheet-docx.png");
var plus = require("../../../assets/authScreen/plus.png");
const OnSiteDecoration = (props) => {
<<<<<<< HEAD
  const {
    navigation,
    token,
    isOnSite,
    isSuccessMsg,
    isJobId,
    isMethod,
  } = props;
  const jobID = Math.floor(Math.random() * 100) + 1;
  const tabId = props.route.params.tabName;
  const [siteArray, setSiteArray] = useState([]);
  const [dynamicInput, setdynamicInput] = useState([
    {
      name: "",
      Card_no: "",
      date: new Date().toLocaleDateString(),
      signature: "",
    },
  ]);
  const [contractorName, setContractorName] = useState("");
  const [projectName, setProjectName] = useState("");
  const addSiteArray = () => {
    setdynamicInput((oldArray) => [
      ...oldArray,
      {
        name: "",
        Card_no: "",
        date: new Date().toLocaleDateString(),
        signature: "",
      },
    ]);
=======
  const [siteArray, setSiteArray] = useState([]);
  const [dynamicInput, setdynamicInput] = useState([]);
  const [contractorName, setContractorName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [data, setData] = useState({
    name: "",
    number: "",
    date: "",
    sign: "",
  });
  const addSiteArray = () => {
    setdynamicInput((oldArray) => [...oldArray, data]);
    setData({ area: "", description: "", completed: "", comments: "" });
>>>>>>> 8963071f89a3d01cc8c91cb986015da9fe50ddcf
  };
  const updateValue = (key, index, value) => {
    let preData = [...dynamicInput];
    preData[index][key] = value;
    setdynamicInput(preData);
  };
  const onSiteDecorationFormInsert = () => {
<<<<<<< HEAD
    try {
      if (contractorName != "" && projectName != "" && dynamicInput != "") {
        props.createOnSiteDecorationHandler(
          contractorName,
          projectName,
          dynamicInput,
          jobID,
          tabId,
          token,
          props.route.params?.index
        );
      } else {
        alert("Please Insert All Fields CareFully !");
        return false;
      }
    } catch (err) {
      alert(err);
    }
  };
  const [signature, setSignature] = useState({
    bool: false,
    isSign: false,
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
            copydata[signature.index].signature = uri;
            setdynamicInput(copydata);
            setSignature({
              ...signature.isSign,
              isSign: false,
              bool: false,
              index: -1,
            });
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
            <Text
              style={{
                fontFamily: "poppins-regular",
                fontSize: 12,
                textAlign: "center",
              }}
            >
              Names and CSCS card registration Nos. of painters to be used
              during the project painting{" "}
            </Text>
          </View>
          <ScrollView>
            <View style={styles.formCodnatiner}>
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
              <View style={styles.tableViewContainer}>
                <View style={styles.tableHeader}>
                  <View style={styles.headerLadderListTitleView}>
                    <Text style={styles.headerTitle}>Name</Text>
                  </View>
                  <View style={styles.headerLadderListTitleView}>
                    <Text style={styles.headerTitle}>CSCS Card no</Text>
                  </View>
                  <View style={styles.headerLadderListTitleView}>
                    <Text style={styles.headerTitle}>
                      CSCS card expiry date
                    </Text>
                  </View>
                  <View style={styles.headerLadderListTitleView}>
                    <Text style={styles.headerTitle}>Signature</Text>
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
                    onPress={() => addSiteArray()}
                  >
                    <Image style={styles.plusBtn} source={plus} />
                  </TouchableOpacity>
                </View>
                {dynamicInput.map((item, index) => (
                  <View style={styles.tableBody} key={index}>
                    <View style={styles.inputSiteBodyContainer}>
                      <TextInput
                        style={styles.bodyTextInput}
                        placeholder={"Name"}
                        value={item.name}
                        onChangeText={(txt) => updateValue("name", index, txt)}
                      />
                    </View>
                    <View style={styles.inputSiteBodyContainer}>
                      <TextInput
                        style={styles.bodyTextInput}
                        placeholder={"CSCS Card no"}
                        value={item.Card_no}
                        onChangeText={(txt) =>
                          updateValue("Card_no", index, txt)
                        }
                      />
                    </View>
                    <View style={styles.inputSiteBodyContainer}>
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
                    <View style={styles.inputSiteBodyContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          setSignature({
                            bool: true,
                            isSign: true,
                            index: index,
                          })
                        }
                        style={[
                          styles.inputHarmFullBodyContainer,
                          {
                            width: "100%",
                            alignItems: "center",
                          },
                        ]}
                      >
                        {item.signature ? (
                          <Image
                            source={{ uri: item.signature }}
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
                              width: "100%",
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
                            Supervisor Sign
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
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
                  onPress={() => onSiteDecorationFormInsert()}
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
  createOnSiteDecorationHandler: (
    contractorName,
    projectName,
    dynamicInput,
    jobID,
    tabId,
    token,
    index
  ) =>
    dispatch(
      insertOnSiteDecorationForm(
        contractorName,
        projectName,
        dynamicInput,
        jobID,
        tabId,
        token,
        index
      )
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(OnSiteDecoration);
=======
    console.log("Main Contractor  :", contractorName);
    console.log("Project Name :", projectName);
    console.log("Array Data :", dynamicInput);
    props.updateHealthReport(props?.route?.params?.index);
    props.navigation.pop();
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageView}>
        <Image source={mainImage} style={styles.bannerImage} />
      </View>
      <View style={{ paddingTop: 30, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontFamily: "poppins-regular", fontSize: 12, textAlign: "center" }}>
          Names and CSCS card registration Nos. of painters to be used during the project painting{" "}
        </Text>
      </View>
      <ScrollView>
        <View style={styles.formCodnatiner}>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Main Contractor"} value={contractorName} onChangeText={(e) => setContractorName(e)} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Project"} value={projectName} onChangeText={(e) => setProjectName(e)} />
          </View>
          <View style={styles.tableViewContainer}>
            <View style={styles.tableHeader}>
              <View style={styles.headerLadderListTitleView}>
                <Text style={styles.headerTitle}>Name</Text>
              </View>
              <View style={styles.headerLadderListTitleView}>
                <Text style={styles.headerTitle}>CSCS Card no</Text>
              </View>
              <View style={styles.headerLadderListTitleView}>
                <Text style={styles.headerTitle}>CSCS card expiry date</Text>
              </View>
              <View style={styles.headerLadderListTitleView}>
                <Text style={styles.headerTitle}>Signature</Text>
              </View>
            </View>
            <View style={{ justifyContent: "flex-end", width: "100%", alignItems: "flex-end", marginBottom: 10 }}>
              <TouchableOpacity style={styles.addBtn} onPress={() => addSiteArray()}>
                <Image style={styles.plusBtn} source={plus} />
              </TouchableOpacity>
            </View>
            {dynamicInput.map((item, index) => (
              <View style={styles.tableBody} key={index}>
                <View style={styles.inputSiteBodyContainer}>
                  <TextInput style={styles.bodyTextInput} placeholder={"Name"} value={item.name} onChangeText={(txt) => updateValue("name", index, txt)} />
                </View>
                <View style={styles.inputSiteBodyContainer}>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder={"CSCS Card no"}
                    value={item.number}
                    onChangeText={(txt) => updateValue("number", index, txt)}
                  />
                </View>
                <View style={styles.inputSiteBodyContainer}>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder={"CSCS card expiry date"}
                    value={item.date}
                    onChangeText={(txt) => updateValue("date", index, txt)}
                  />
                </View>
                <View style={styles.inputSiteBodyContainer}>
                  <TextInput style={styles.bodyTextInput} placeholder={"Signature"} value={item.sign} onChangeText={(txt) => updateValue("sign", index, txt)} />
                </View>
              </View>
            ))}
            <View style={styles.tableBody}>
              <View style={styles.inputSiteBodyContainer}>
                <TextInput style={styles.bodyTextInput} placeholder={"Name"} onChangeText={(txt) => setData({ ...data, name: txt })} value={data.name} />
              </View>
              <View style={styles.inputSiteBodyContainer}>
                <TextInput
                  style={styles.bodyTextInput}
                  placeholder={"CSCS Card no"}
                  onChangeText={(txt) => setData({ ...data, number: txt })}
                  value={data.number}
                />
              </View>
              <View style={styles.inputSiteBodyContainer}>
                <TextInput
                  style={styles.bodyTextInput}
                  placeholder={"CSCS card expiry date"}
                  onChangeText={(txt) => setData({ ...data, date: txt })}
                  value={data.date}
                />
              </View>
              <View style={styles.inputSiteBodyContainer}>
                <TextInput style={styles.bodyTextInput} placeholder={"Signature"} onChangeText={(txt) => setData({ ...data, sign: txt })} value={data.sign} />
              </View>
            </View>
            <View style={styles.footerView}>
              <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                Address: 2,<Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}> Green Lane, Penge, London SE20 7JA</Text>
              </Text>
              <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                T: <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}> 0208 676 060</Text>
              </Text>
              <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                F: <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}> 0208 676 0671</Text>
              </Text>
              <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                M: <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}> 07737 632206</Text>
              </Text>
              <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                E: <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}> info@topdecdecorating.com</Text>
              </Text>
              <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                W: <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}> www.topdecdecorating.com</Text>
              </Text>
              <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                VAT Registration Number: <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}> 203 474 927</Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#000",
              width: "100%",
              height: 2,
              marginBottom: 20,
              marginTop: 20,
            }}></View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.commonBtn} onPress={() => onSiteDecorationFormInsert()}>
              <Text style={styles.commonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const mapDispatchToProps = (dispatch) => ({
  updateHealthReport: (index) => dispatch(updateHealthReport(index)),
});
export default connect(null, mapDispatchToProps)(OnSiteDecoration);
>>>>>>> 8963071f89a3d01cc8c91cb986015da9fe50ddcf
