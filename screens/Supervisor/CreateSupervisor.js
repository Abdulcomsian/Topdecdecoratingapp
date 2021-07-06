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
  const { navigation } = props;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(props.token);
  const [showAlert, setShowAlert] = useState(false);

  const postCreateSupervisor = async () => {
    try {
      if ((name != "", email != "", password != "", phone != "")) {
        let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let regPass =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (regEmail.test(email) === false) {
          alert("Email is Not Correct");
          setEmail(email);
          return false;
        } else {
          setEmail(email);
          console.log("Email is Correct");
          if (regPass.test(password) === false) {
            alert(
              "Password is Not Correct ! Please Enter Atleast One Capital Letter One Specail Character and minimum 8 length of Password"
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
        alert("Please Insert All Fields CareFully !");
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
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Create Supervisor</Text>
        </View>
        <ScrollView>
          <View style={styles.formConatiner}>
            <View style={styles.inputFieldContainer}>
              <TextInput
                onChangeText={(e) => setName(e)}
                style={styles.inputField}
                placeholder={"Supervisor Name"}
                value={name}
              />
            </View>
            <View style={styles.inputFieldContainer}>
              <TextInput
                onChangeText={(e) => setPhone(e.replace(/[^0-9]/g, ""))}
                style={styles.inputField}
                placeholder={"Contact Number"}
                value={phone}
              />
            </View>
            <View style={styles.inputFieldContainer}>
              <TextInput
                onChangeText={(e) => setEmail(e)}
                style={styles.inputField}
                placeholder={"Email"}
                value={email}
              />
            </View>
            <View style={styles.inputFieldContainer}>
              <TextInput
                onChangeText={(e) => setPassword(e)}
                style={styles.inputField}
                placeholder={"Pasword"}
                secureTextEntry={true}
                value={password}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.btnContainer}>
          {/* <TouchableOpacity style={styles.commonBtn} onPress={() => navigation.navigate('MainScreen')}>
                    <Text style={styles.commonText}>Save</Text>
                </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.commonBtn}
            onPress={() => postCreateSupervisor()}
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
