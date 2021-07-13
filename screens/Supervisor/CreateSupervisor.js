import React, { useState } from "react";
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
import { useDispatch, useSelector, connect } from "react-redux";
import { createSupervisor } from "../../Redux/action/auth/authActionTypes";

const CreateSupervisor = (props) => {
  const { navigation, token } = props;
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const postCreateSupervisor = async () => {
    try {
      if (name != "" && email != "" && password != "" && phone != "") {
        let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let regPass =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (regEmail.test(email) === false) {
          setEmailErr("Email is not Correct");
          setEmail(email);
          return false;
        } else {
          setEmail(email);
          console.log("Email is Correct");
          if (regPass.test(password) === false) {
            setPasswordErr(
              "Password is Not Correct ! Please Enter At least One Capital Letter One Special Character and minimum 8 length of Password"
            );
            setPassword(password);
            return false;
          } else {
            console.log("Password is Correct");
            await props.createSupervisorHandler(
              name,
              email,
              password,
              phone,
              token
            );
            alert("Supervisor Create SuccessFully !");
            props.navigation.navigate("MainScreen");
          }
        }
      } else {
        email === "" && setEmailErr("Email is required");
        password === "" && setPasswordErr("Password is required");
        phone === "" && setPhoneErr("Phone is required");
        name === "" && setNameErr("Supervisor name is required");
      }
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.mainContainer}>
        {/* <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Create Supervisor</Text>
        </View> */}
        <ScrollView contentContainerStyle={styles.formConatiner}>
          <View style={styles.inputFieldContainer}>
            <TextInput
              onChangeText={(e) => {
                setName(e);
                nameErr && setNameErr("");
              }}
              style={
                nameErr
                  ? { ...styles.inputField, borderBottomColor: "red" }
                  : styles.inputField
              }
              placeholder={"Supervisor Name"}
              value={name}
            />
          </View>
          {nameErr !== "" && <Text style={styles.err}>{nameErr}</Text>}
          <View style={styles.inputFieldContainer}>
            <TextInput
              onChangeText={(e) => {
                setPhone(e.replace(/[^0-9]/g, ""));
                phoneErr && setPhoneErr("");
              }}
              style={
                phoneErr
                  ? { ...styles.inputField, borderBottomColor: "red" }
                  : styles.inputField
              }
              placeholder={"Contact Number"}
              value={phone}
            />
          </View>
          {phoneErr !== "" && <Text style={styles.err}>{phoneErr}</Text>}
          <View style={styles.inputFieldContainer}>
            <TextInput
              onChangeText={(e) => {
                setEmail(e);
                emailErr && setEmailErr("");
              }}
              style={
                emailErr
                  ? { ...styles.inputField, borderBottomColor: "red" }
                  : styles.inputField
              }
              placeholder={"Email"}
              value={email}
            />
          </View>
          {emailErr !== "" && <Text style={styles.err}>{emailErr}</Text>}
          <View style={styles.inputFieldContainer}>
            <TextInput
              onChangeText={(e) => {
                setPassword(e);
                passwordErr && setPasswordErr("");
              }}
              style={
                passwordErr
                  ? { ...styles.inputField, borderBottomColor: "red" }
                  : styles.inputField
              }
              placeholder={"Password"}
              secureTextEntry={true}
              value={password}
            />
          </View>
          {passwordErr !== "" && <Text style={styles.err}>{passwordErr}</Text>}
        </ScrollView>
        <View style={styles.btnContainer}>
          {/* <TouchableOpacity style={styles.commonBtn} onPress={() => navigation.navigate('MainScreen')}>
                    <Text style={styles.commonText}>Save</Text>
                </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.commonBtn}
            onPress={postCreateSupervisor}
          >
            <Text style={styles.commonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
  createSuperVisor: state.auth.createSuperVisor,
  createSuperVisorMsg: state.auth.createSuperVisorMsg,
});
const mapDispatchToProps = (dispatch) => ({
  createSupervisorHandler: (name, email, password, phone, token) =>
    dispatch(createSupervisor(name, email, password, phone, token)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateSupervisor);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  err: { color: "red", textAlign: "left", marginTop: 5 },
  mainContainer: {
    width: "100%",
    flex: 1,
    paddingBottom: 30,
  },
  titleContainer: {
    height: "10%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
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
    width: "100%",
  },
  inputField: {
    height: 62,
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
  quantityInput: {
    width: "30%",
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: "#96A8B2",
    padding: 5,
    fontSize: 16,
    marginRight: 20,
  },
  descriptionInput: {
    width: "50%",
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: "#96A8B2",
    padding: 5,
    fontSize: 16,
  },
  addBtn: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  dynamicInput: {
    width: "100%",
    flexDirection: "row",
    marginTop: 30,
    position: "relative",
  },
  addBtn: {
    justifyContent: "center",
    backgroundColor: "#F6F9FB",
    borderWidth: 1,
    borderColor: "#E2ECF2",
    padding: 15,
    borderRadius: 14,
  },
  plusBtn: {
    width: 18,
    height: 18,
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
    height: "20%",
    paddingRight: 20,
    paddingLeft: 20,
    justifyContent: "flex-end",
  },
});
