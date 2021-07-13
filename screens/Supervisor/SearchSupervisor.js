import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Text } from "native-base";
import { searchSupervisor } from "../../Redux/action/auth/authActionTypes";
import { useDispatch, useSelector, connect } from "react-redux";

const SearchSupervisor = ({ navigation, token }) => {
  const [supervisorName, setSupervisorName] = useState("");
  const [supervisorId, setSupervisorId] = useState("");
  const [supervisorEmail, setSupervisorEmail] = useState("");
  console.log("Token", token);

  const searchSupervisor = () => {
    try {
      let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (supervisorEmail == "") {
        // console.log("Supervisor Name :",supervisorName)
        // console.log("Supervisor ID :",supervisorId)
        // console.log("Supervisor Email :",supervisorEmail)
        props.searchSupervisorHandler(
          supervisorId,
          supervisorName,
          supervisorEmail,
          token
        );
      } else {
        if (regEmail.test(supervisorEmail) === false) {
          alert("Email is Not Correct");
          setSupervisorEmail(supervisorEmail);
          return false;
        } else {
          setSupervisorEmail(supervisorEmail);
          console.log("Email is Correct");
          props.searchSupervisorHandler(
            supervisorId,
            supervisorName,
            supervisorEmail,
            token
          );
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.mainContainer}>
        {/* <View style={styles.dateTimeContainer}>
                <Text style={styles.refText}>Date: 12-2-2021</Text>
                <Text style={styles.refText}>Ref  id: 10099499</Text>
            </View> 
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Search Supervisor</Text>
        </View>*/}
        <ScrollView>
          <View style={styles.formConatiner}>
            <View style={styles.inputFieldContainer}>
              <TextInput
                style={styles.inputField}
                placeholder={"Enter your Supervisor Name"}
                value={supervisorName}
                onChangeText={(e) => setSupervisorName(e)}
              />
            </View>
            <Text
              style={{
                marginBottom: 20,
                marginTop: 20,
                fontFamily: "poppins-semiBold",
              }}
            >
              OR
            </Text>
            <View style={styles.inputFieldContainer}>
              <TextInput
                style={styles.inputField}
                placeholder={"Enter your Supervisor ID"}
                value={supervisorId}
                onChangeText={(e) => setSupervisorId(e.replace(/[^0-9]/g, ""))}
              />
            </View>
            <Text
              style={{
                marginBottom: 20,
                marginTop: 20,
                fontFamily: "poppins-semiBold",
              }}
            >
              OR
            </Text>
            <View style={styles.inputFieldContainer}>
              <TextInput
                style={styles.inputField}
                placeholder={"Enter your Supervisor Email"}
                value={supervisorEmail}
                onChangeText={(e) => setSupervisorEmail(e)}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.commonBtn}
            onPress={() =>
              navigation.navigate("ListSupervisor", {
                id: supervisorId,
                name: supervisorName,
                email: supervisorEmail,
              })
            }
          >
            <Text style={styles.commonText}>Search</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.commonBtn} onPress={() => searchSupervisor()}>
                        <Text style={styles.commonText}>Search</Text>
                    </TouchableOpacity> */}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const mapStateToProps = ({auth}) => ({
  token: auth.token,
});
const mapDispatchToProps = (dispatch) => ({
  searchSupervisorHandler: (
    supervisorName,
    supervisorId,
    supervisorEmail,
    token
  ) =>
    dispatch(
      searchSupervisor(supervisorName, supervisorId, supervisorEmail, token)
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchSupervisor);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    height: "100%",
    width: "100%",
  },
  dateTimeContainer: {
    height: "10%",
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
    height: "5%",
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
    height: "70%",
    width: "100%",
    padding: 30,
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
  commonBtn: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 3,
    borderColor: "#1073AC",
    marginBottom: 80,
  },
  commonText: {
    color: "#1073AC",
    fontSize: 18,
    fontFamily: "poppins-semiBold",
  },
  btnContainer: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
});
