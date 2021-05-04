import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  CheckBox,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Button, Text } from "native-base";
import { TextInput } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { connect } from "react-redux";
import { updateDecorator } from "../../Redux/action/auth/authActionTypes";

var rightArrow = require("../../assets/authScreen/right.png");
const DecoratorDetails = (props) => {
  const { navigation, token } = props;
  const [decoratorID, setDEcoratorID] = useState(props.route.params);
  const { roleID, userData } = props.route.params;
  const [check, setCheck] = useState({
    approved: true,
    disApproved: false,
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [decoratorName, setDecoratorName] = useState("");
  const [decoratorEmail, setDecoratorEmail] = useState("");
  const [decoratorNumber, setDecoratorNumber] = useState("");
  const [photoID, setPhotoID] = useState("");
  const [cscsFront, setCscsFront] = useState("");
  const [cscsBack, setCscsBack] = useState("");
  const [decoratorData, setDecoratorDate] = useState([]);
  const [showView, setShowView] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const uploadPhotoImage = async (type) => {
    if (type == "photoID") {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }
      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (pickerResult.cancelled === true) {
        return;
      }
      console.log("Piceker Result :", pickerResult);
      setPhotoID({ localUri: pickerResult.uri });
    } else if (type == "cscsFront") {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }
      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (pickerResult.cancelled === true) {
        return;
      }

      setCscsFront({ localUri: pickerResult.uri });
    } else if (type == "cscsBack") {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }
      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (pickerResult.cancelled === true) {
        return;
      }

      setCscsBack({ localUri: pickerResult.uri });
    }
  };
  console.log("Role Name :",roleID)
  const id = props.route.params.id;
  useEffect(() => {
    try {
      const body = { id };
      (async () => {
        setLoading(true);
        const request = await axios(
          "https://airtimetesting.airtime4u.com/public/tajs/public/api/admin/search/decorator",
          {
            method: "POST",
            headers: {
              authorization: "Bearer " + token,
            },
            data: body,
          }
        );
        const response = await request.data;
        console.log(response.data.user);
        if (response.success == true) {
          console.log("here");
          setDecoratorDate(response.data.user);
          setLoading(false);
          setShowView(true);
        } else {
          setLoading(false);
          setShowView(false);
          setErrorMsg(request.data.message);
        }
      })();
    } catch (err) {
      alert(err.message);
      setLoading(false);
    }
  }, []);
  const checkedValue = (value) => {
    if (value == "approved") {
      setStatus("1");
      let preData = [...decoratorData];
      preData[0]["status"] = "1";
      setDecoratorDate(preData);
    } else if (value == "disapproved") {
      setStatus("0");
      let preData = [...decoratorData];
      preData[0]["status"] = "0";
      setDecoratorDate(preData);
    }
  };
  const updateDecorator = async () => {
    console.log("Decorator Array :",decoratorData)
    try {
      await props.updateDecoratorHandler(
        decoratorData[0].id,
        decoratorData[0].email,
        decoratorData[0].name,
        decoratorData[0].lastname,
        decoratorData[0].number,
        status,
        token
        
      );
      props.navigation.pop();
      alert("Decorator Update SuccessFully !")
    } catch (err) {
      alert(err.message);
    }
};
  const updateValue = (key, index, value) => {
    let preData = [...decoratorData];
    preData[index][key] = value;
    setDecoratorDate(preData);
  };
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color="#1073AC" size="small" />
      </View>
    );
  } else {
    console.log("decorator Array :", decoratorData);
    return (
      <View style={styles.mainContainer}>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.refText}>Date: 12-2-2021</Text>
          <Text style={styles.refText}>Ref id: 10099499</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Decorator Details</Text>
        </View>
        {roleID == "decorator" ? (
          <ScrollView style={{ width: "100%" }}>
            {decoratorData.map((item, index) => (
              <View style={styles.formConatiner}>
                <View style={styles.inputFieldContainer} key={index}>
                  <Text style={styles.decoratorTitle}>Name:</Text>
                  <TextInput
                    value={item.name}
                    style={[styles.detailItemInput, { width: "50%" }]}
                    onChangeText={(txt) => updateValue("name", index, txt)}
                  />
                </View>
                <View style={styles.inputFieldContainer} key={index}>
                  <Text style={styles.decoratorTitle}>Last Name:</Text>
                  <TextInput
                    value={item.lastname}
                    style={[styles.detailItemInput, { width: "50%" }]}
                    onChangeText={(txt) => updateValue("lastname", index, txt)}
                  />
                </View>
                <View style={styles.inputFieldContainer}>
                  <Text style={styles.decoratorTitle}>Email:</Text>
                  <Text
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#96A8B2",
                      fontSize: 16,
                      color: "#96A8B2",
                      fontFamily: "poppins-regular",
                      width: "50%",
                    }}
                  >
                    {item.email}
                  </Text>
                </View>
                <View style={styles.inputFieldContainer}>
                  <Text style={styles.decoratorTitle}>Number:</Text>
                  <TextInput
                    value={item.phone}
                    style={[styles.detailItemInput, { width: "50%" }]}
                    onChangeText={(txt) => updateValue("phone", index, txt)}
                  />
                </View>
                <View style={styles.inputFieldContainer}>
                  <Text style={styles.decoratorTitle}>Photo ID:</Text>
                  <View
                    style={{
                      width: "50%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={styles.thumbnail}
                      source={{ uri: photoID.localUri }}
                    />
                    <TouchableOpacity
                      onPress={() => uploadPhotoImage("photoID")}
                      style={{
                        height: 30,
                        borderRadius: 8,
                        borderWidth: 3,
                        borderColor: "#1073AC",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          paddingLeft: 5,
                          paddingRight: 5,
                          fontFamily: "poppins-regular",
                        }}
                      >
                        Upload Image
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.inputFieldContainer}>
                  <Text style={styles.decoratorTitle}>CSCS Front Card:</Text>
                  <View
                    style={{
                      width: "50%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={styles.thumbnail}
                      source={{ uri: cscsFront.localUri }}
                    />
                    <TouchableOpacity
                      onPress={() => uploadPhotoImage("cscsFront")}
                      style={{
                        height: 30,
                        borderRadius: 8,
                        borderWidth: 3,
                        borderColor: "#1073AC",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          paddingLeft: 5,
                          paddingRight: 5,
                          fontFamily: "poppins-regular",
                        }}
                      >
                        Upload Image
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.inputFieldContainer}>
                  <Text style={styles.decoratorTitle}>CSCS Back Card:</Text>
                  <View
                    style={{
                      width: "50%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={styles.thumbnail}
                      source={{ uri: cscsBack.localUri }}
                    />
                    <TouchableOpacity
                      onPress={() => uploadPhotoImage("cscsBack")}
                      style={{
                        height: 30,
                        borderRadius: 8,
                        borderWidth: 3,
                        borderColor: "#1073AC",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          paddingLeft: 5,
                          paddingRight: 5,
                          fontFamily: "poppins-regular",
                        }}
                      >
                        Upload Image
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.inputFieldContainer}>
                  <Text style={styles.decoratorTitle}>Notes Log:</Text>
                  <TouchableOpacity
                    style={{
                      marginLeft: 30,
                      fontFamily: "poppins-regular",
                      width: "50%",
                      flexDirection: "row",
                    }}
                    onPress={() => navigation.navigate("ViewNotes")}
                  >
                    <Text
                      style={{ fontFamily: "poppins-regular", fontSize: 16 }}
                    >
                      View Logs
                    </Text>
                    <Image
                      source={rightArrow}
                      style={{
                        marginLeft: 10,
                        marginTop: 8,
                        width: 12,
                        height: 12,
                        resizeMode: "center",
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputFieldContainer}>
                  <Text style={styles.decoratorTitle}>Status:</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={styles.chekboxText}>
                      <CheckBox
                        value={item.status === "1" ? true : false}
                        onValueChange={() => checkedValue("approved")}
                      />
                      <Text style={styles.checkText}>Approved</Text>
                    </View>
                    <View style={styles.chekboxText}>
                      <CheckBox
                        value={item.status === "0" ? true : false}
                        onValueChange={() => checkedValue("disapproved")}
                      />
                      <Text style={styles.checkText}>Dis-Approved</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.commonBtn}
                  onPress={() => updateDecorator()}
                >
                  <Text style={styles.commonText}>Update</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        ) : (
          <ScrollView style={{ height: "100%", width: "100%" }}>
            {decoratorData.map((item, index) => (
              <View style={styles.formConatiner}>
                <View style={styles.inputFieldContainer} key={index}>
                  <Text style={styles.decoratorTitle}>Name:</Text>
                  <Text
                    style={{
                      fontSize: 16,
                      width: "50%",
                      justifyContent: "center",
                      fontFamily: "poppins-regular",
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
                <View style={styles.inputFieldContainer} key={index}>
                  <Text style={styles.decoratorTitle}>Last Name:</Text>
                  <Text
                    style={{
                      fontSize: 16,
                      width: "50%",
                      justifyContent: "center",
                      fontFamily: "poppins-regular",
                    }}
                  >
                    {item.lastname}
                  </Text>
                </View>
                <View style={styles.inputFieldContainer}>
                  <Text style={styles.decoratorTitle}>Email:</Text>
                  <Text
                    style={{
                      fontSize: 16,
                      width: "50%",
                      justifyContent: "center",
                      fontFamily: "poppins-regular",
                    }}
                  >
                    {item.email}
                  </Text>
                </View>
                <View style={styles.inputFieldContainer}>
                  <Text style={styles.decoratorTitle}>Number:</Text>
                  <Text
                    style={{
                      fontSize: 16,
                      width: "50%",
                      justifyContent: "center",
                      fontFamily: "poppins-regular",
                    }}
                  >
                    {item.phone}
                  </Text>
                </View>
                <View style={styles.inputFieldContainer}>
                  <Text style={styles.decoratorTitle}>Photo ID:</Text>
                  <Image style={styles.thumbnail} source="" />
                </View>
                <View style={styles.inputFieldContainer}>
                  <Text style={styles.decoratorTitle}>CSCS Front Card:</Text>
                  <Image style={styles.thumbnail} source="" />
                </View>
                <View style={styles.inputFieldContainer}>
                  <Text style={styles.decoratorTitle}>CSCS Back Card:</Text>
                  <Image style={styles.thumbnail} source="" />
                </View>
                <View style={styles.inputFieldContainer}>
                  <Text style={styles.decoratorTitle}>Notes Log:</Text>
                  <TouchableOpacity
                    style={{
                      marginLeft: 30,
                      fontFamily: "poppins-regular",
                      width: "50%",
                      flexDirection: "row",
                    }}
                    onPress={() => navigation.navigate("ViewNotes")}
                  >
                    <Text
                      style={{ fontFamily: "poppins-regular", fontSize: 16 }}
                    >
                      View Logs
                    </Text>
                    <Image
                      source={rightArrow}
                      style={{
                        marginLeft: 10,
                        marginTop: 8,
                        width: 12,
                        height: 12,
                        resizeMode: "center",
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputFieldContainer}>
                  <Text style={styles.decoratorTitle}>Status:</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={styles.chekboxText}>
                      <CheckBox value={item.status === "1" ? true : false} />
                      <Text style={styles.checkText}>Approved</Text>
                    </View>
                    <View style={styles.chekboxText}>
                      <CheckBox value={item.status === "0" ? true : false} />
                      <Text style={styles.checkText}>Dis-Approved</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    );
  }
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
  isUpdate: state.auth.isUpdate,
  isUpdateMsg: state.auth.isUpdateMsg,
});
const mapDispatchToProps = (dispatch) => ({
  updateDecoratorHandler: (id, email, name, lastname, number, status, token) =>
    dispatch(updateDecorator(id, email, name, lastname, number, status, token)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DecoratorDetails);
const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
  },
  dateTimeContainer: {
    height: "5%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  refText: {
    fontSize: 12,
    color: "#96A8B2",
    fontFamily: "poppins-medium",
  },
  titleContainer: {
    height: "10%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  titleText: {
    color: "#4F4F4F",
    fontSize: 18,
    fontFamily: "poppins-semiBold",
  },
  formConatiner: {
    width: "100%",
    padding: 30,
    alignItems: "center",
  },
  inputFieldContainer: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  inputField: {
    height: 52,
    width: "50%",
    borderBottomWidth: 1,
    borderBottomColor: "#96A8B2",
    padding: 5,
    fontSize: 16,
    color: "#96A8B2",
    fontFamily: "poppins-regular",
  },
  inputContainer: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  decoratorTitle: {
    fontFamily: "poppins-semiBold",
    width: "50%",
    fontSize: 16,
  },
  detailItem: {
    marginLeft: 30,
    fontFamily: "poppins-regular",
    width: "60%",
  },
  chekboxText: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  checkText: {
    fontFamily: "poppins-regular",
    fontSize: 12,
  },
  detailItemInput: {
    width: "60%",
    borderBottomWidth: 1,
    borderBottomColor: "#96A8B2",
    fontSize: 16,
    color: "#96A8B2",
    fontFamily: "poppins-regular",
  },
  selectFileBtn: {
    borderWidth: 1,
    marginLeft: 30,
    justifyContent: "center",
    borderRadius: 6,
    padding: 5,
  },
  thumbnail: {
    width: 50,
    height: 50,
    resizeMode: "cover",
  },
  errorText: {
    fontFamily: "poppins-semiBold",
    color: "red",
  },
  commonBtn: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 3,
    borderColor: "#1073AC",
    marginTop: 30,
  },
  commonText: {
    color: "#1073AC",
    fontSize: 18,
    fontFamily: "poppins-semiBold",
  },
});
