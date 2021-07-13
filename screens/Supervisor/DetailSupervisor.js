import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Text } from "native-base";
import { TextInput } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { updateSupervisor } from "../../Redux/action/auth/authActionTypes";
import axios from "axios";
import { CheckBox } from "react-native-elements";
const SupervisorDetails = (props) => {
  const { navigation, token, isUpdate, isUpdateMsg, role } = props;
  const { id, userData } = props.route.params;
  const [supervisorData, setSupervisorData] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState({
    approved: true,
    disApproved: false,
  });
  const userID = id;
  const LoginToken = token;
  console.log("Role-->", role);
  useEffect(() => {
    try {
      if (role) {
        const data = { id: userData.id };
        (async () => {
          setLoading(true);
          const request = await axios(
            "https://topdecdecoratingapp.com/api/admin/search/supervisor",
            {
              method: "POST",
              headers: {
                authorization: "Bearer " + token,
              },
              data,
            }
          );
          const response = await request.data;
          console.log(response);
          if (response.success == true) {
            console.log(response);
            setSupervisorData(
              Array.isArray(response.data.user)
                ? response.data.user
                : [response.data.user]
            );
            setStatus(
              Array.isArray(response.data.user)
                ? response.data.user[0].status
                : response.data.user.status
            );
          } else {
            setErrorMsg(request.message);
          }
          setLoading(false);
        })();
      } else {
        console.log("else !");
        setSupervisorData(Array.isArray(userData) ? userData : [userData]);
        setStatus(userData.status);
      }
    } catch (err) {
      console.log("Error");
      console.log(err.message);
      setLoading(false);
    }
  }, []);
  console.log("Supervisor Data :", supervisorData);
  const checkedValue = (value) => {
    if (value == "approved") {
      setStatus("1");
      let preData = [...supervisorData];
      preData[0]["status"] = "1";
      setSupervisorData(preData);
    } else if (value == "disapproved") {
      setStatus("0");
      let preData = [...supervisorData];
      preData[0]["status"] = "0";
      setSupervisorData(preData);
    }
  };
  const updateSupervisor = async () => {
    try {
      await props.updateSupervisorHandler(
        supervisorData[0].id,
        supervisorData[0].email,
        supervisorData[0].name,
        supervisorData[0].phone,
        status,
        token
      );
      props.navigation.pop();
      alert("Supervisor Update SuccessFully !");
    } catch (err) {
      alert(err.message);
    }
  };
  const updateValue = (key, index, value) => {
    let preData = [...supervisorData];
    preData[index][key] = value;
    setSupervisorData(preData);
  };
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color="#1073AC" size="small" />
      </View>
    );
  } else {
    return (
      <View style={styles.mainContainer}>
        {/* <View style={styles.dateTimeContainer}>
          <Text style={styles.refText}>Date: 12-2-2021</Text>
          <Text style={styles.refText}>Ref id: 10099499</Text>
        </View> */}
        {/*
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Supervisor Detail</Text>
        </View> */}

        <ScrollView style={{ width: "100%" }}>
          {supervisorData.map((item, index) => (
            <View style={styles.formConatiner} key={"Deatil_" + index}>
              <View style={styles.inputFieldContainer}>
                <Text style={styles.decoratorTitle}>Name:</Text>
                <TextInput
                  editable={role === "SUPERVISOR"}
                  style={styles.detailItemInput}
                  value={item.name}
                  onChangeText={(txt) => updateValue("name", index, txt)}
                />
              </View>
              <View style={styles.inputFieldContainer}>
                <Text style={styles.decoratorTitle}>Email:</Text>
                <Text style={styles.detailItemInput}>{item.email}</Text>
              </View>
              <View style={styles.inputFieldContainer}>
                <Text style={styles.decoratorTitle}>Number:</Text>
                <TextInput
                  editable={role === "SUPERVISOR"}
                  value={item.phone}
                  style={styles.detailItemInput}
                  onChangeText={(txt) => updateValue("phone", index, txt)}
                />
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
                      disabled={role === "SUPERVISOR"}
                      checked={item.status === "1"}
                      onPress={() => checkedValue("approved")}
                      size={18}
                    />
                    <Text style={styles.checkText}>Approved</Text>
                  </View>
                  <View style={styles.chekboxText}>
                    <CheckBox
                      disabled={role === "SUPERVISOR"}
                      checked={item.status === "0" || item.status === ""}
                      onPress={() => checkedValue("disapproved")}
                      size={18}
                    />
                    <Text style={styles.checkText}>Dis-Approved</Text>
                  </View>
                </View>
              </View>
              <View style={styles.btnContainer}>
                {/* <TouchableOpacity style={styles.commonBtn} onPress={() => navigation.navigate('SearchSupervisor')}>
                          <Text style={styles.commonText}>Update</Text>
                      </TouchableOpacity>  */}
                <TouchableOpacity
                  style={styles.commonBtn}
                  onPress={updateSupervisor}
                >
                  <Text style={styles.commonText}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
        {/* ) : (
          <ScrollView style={{ width: "100%" }}>
            <View style={styles.formConatiner}>
              <View style={styles.inputFieldContainer}>
                <Text style={styles.decoratorTitle}>Name:</Text>
                <TextInput
                  style={styles.detailItemInput}
                  value={supervisorData.name}
                />
              </View>
              <View style={styles.inputFieldContainer}>
                <Text style={styles.decoratorTitle}>Email:</Text>
                <Text style={styles.detailItemInput}>
                  {supervisorData.email}
                </Text>
              </View>
              <View style={styles.inputFieldContainer}>
                <Text style={styles.decoratorTitle}>Number:</Text>
                <TextInput
                  value={supervisorData.phone}
                  style={styles.detailItemInput}
                />
              </View>
              <View style={styles.inputFieldContainer}>
                <Text style={styles.decoratorTitle}>Status:</Text>
                {/* <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.chekboxText}>
                    <CheckBox
                      checked={supervisorData.status === "1" ? true : false}
                      size={18}
                    />
                    <Text style={styles.checkText}>Approved</Text>
                  </View>
                  <View style={styles.chekboxText}>
                    <CheckBox
                      checked={supervisorData.status === "0" ? true : false}
                      size={18}
                    />
                    <Text style={styles.checkText}>Dis-Approved</Text>
                  </View>
                </View>
                <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={styles.chekboxText}>
                      <CheckBox
                        checked={item.status === "1" ? true : false}
                        onPress={() => checkedValue("approved")}
                        size={18}
                      />
                      <Text style={styles.checkText}>Approved</Text>
                    </View>
                    <View style={styles.chekboxText}>
                      <CheckBox
                        checked={item.status === "0" ? true : false}
                        onPress={() => checkedValue("approved")}
                        size={18}
                      />
                      <Text style={styles.checkText}>Dis-Approved</Text>
                    </View>
                  </View>
              </View>
            </View>
          </ScrollView>
        )} <TouchableOpacity
          style={styles.commonBtn}
          onPress={() => searchJob(this)}
        >
          <Text style={styles.commonText}>Back</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
};
const mapStateToProps = ({ auth }) => ({
  token: auth.token,
  role: auth.role,
  isUpdate: auth.isUpdate,
  isUpdateMsg: auth.isUpdateMsg,
});
const mapDispatchToProps = (dispatch) => ({
  updateSupervisorHandler: (id, email, name, number, status, token) =>
    dispatch(updateSupervisor(id, email, name, number, status, token)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SupervisorDetails);
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
    // height:Dimensions.get("window").height-200,
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
    width: "100%",
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
    width: "40%",
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
  btnContainer: {
    width: "100%",
    marginTop: 30,
  },
  commonBtn: {
    height: 50,
    width: "90%",
    alignSelf: "center",
    marginBottom: 20,
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
