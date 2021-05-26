import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Text } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { emailLink,resetPassword,codeValidate } from "../../Redux/action/auth/authActionTypes";
import { useDispatch, useSelector, connect } from "react-redux";

var logo = require("../../assets/authScreen/logo.jpeg");
var user = require("../../assets/authScreen/icon.png");
var lock = require("../../assets/authScreen/lock.png");

const ForgotPassword = (props) => {
  const { navigation, token, isCode, isSuccess, isSuccessMsg, isValidateUserID, isResetSucces, isResetMsg } = props;
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [userCode, setUserCode] = useState("");
  const [show, setShow] = useState(false);
  const [showEmail, setEmailShow] = useState(false);
  const [reset, setReset] = useState(false);
  const [password, setPassword] = useState("");
  const [resetPassword, setResetPassword] = useState("");

  console.log("Code :", isCode);
  console.log("Validate Code :", isValidateUserID);
  const postEmailLink = async () => {
    try {
        let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email!=""){
            if (regEmail.test(email) === false) {
                alert("Email is Not Correct");
                setEmail(email);
            }
            else {
                setEmail(email);
                alert("Email is Correct");
                await props.postEmailLink(email);
                console.log("EMail Code :", isCode)
                setCode(isCode)
                setReset(false)
            }
        }
        else{
          alert("Please Enter Emial Carefully !");
        }
    } catch (err) {
      console.log(err.message);
    }
  };
  const checkCode = () => {
    console.log("Use Code :", userCode);
    if (userCode.length >= 5) {
      if (userCode == isCode) {
        alert("Code Match !");
        props.postCodeValidate(userCode);
        setReset(true)
      }
    } else {
      alert("Please Enter Valid Code");
    }
  };
  const checkPassword = async () =>{
    let regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    console.log("Password",password,regPass.test(password) === false)
      console.log("Reset Password",resetPassword,regPass.test(resetPassword) === false)
      if(password !="" && resetPassword!=""){
    if (regPass.test(password) === false || regPass.test(resetPassword) === false) {
      alert("Password / Reset Passsword is Not Correct ! Please Enter Atleast One Capital Letter One Specail Character and minimum 8 length of Password");
        setPassword(password);
        setResetPassword(resetPassword)
        return false;
    } 
    else{
        if(password==resetPassword){
          await props.postResetPasswordHandler(isValidateUserID,password);
          // setCode(isCode);
          setShow(true);
        }
        else{
          alert("Your Password Not Match");
          setPassword(password)
          setResetPassword(resetPassword)
          return false;
        }
    }
  }
  else{
    alert("Please Enter Password & Reset Password CareFully !")
  }
  }
  /* Email Send & recive Code */

  /* Check Validate Code User Exsit or Not */
  useEffect(()=>{
    if(isValidateUserID){
      setReset(true)
    }
    else{
      /* If User Not Exist Alert Show */
    }
  },[isValidateUserID]);
  /* Reset Password Success Or Not */
  // useEffect(() => {
  //   if(isResetSucces){
  //     if(isResetMsg){
  //       alert(isResetMsg)
  //       navigation.navigate("LoginScreen")
  //     }
  //   }
  //   else{
  //     if(isResetMsg){
  //       alert(isResetMsg)
  //       navigation.navigate("LoginScreen")
  //     }
  //   }
  // },[isValidateUserID,isResetMsg])
  return (
    <View style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <View style={styles.logoImageContainer}>
          <Image style={styles.logoImage} source={logo} />
        </View>
        <Text style={styles.mainBannerText}>
          <Text style={styles.boldText}>Top Dec </Text> Decorating
        </Text>
      </View>

      <KeyboardAwareScrollView style={{ height: "100%", width: "100%" }}>
        <View style={styles.formConatiner}>
          {code == "" ? (
            <View style={{ width: "100%" }}>
              <View style={styles.inputContainer}>
                <View style={styles.iconContainer}>
                  <Image style={styles.iconImg} source={user} />
                </View>
                <View style={styles.inputFieldContainer}>
                  <TextInput
                    onChangeText={(e) => setEmail(e)}
                    value={email}
                    style={styles.inputField}
                    placeholder={"Email"}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => postEmailLink()}
              >
                <Text style={styles.loginText}>Send Email</Text>
              </TouchableOpacity>
            </View>
          ) : (
              reset==true ?
                <View style={{ width: "100%" }}>
                    <View style={styles.inputContainer}>
                        <View style={styles.iconContainer}>
                        <Image style={styles.iconImg} source={lock} />
                        </View>
                        <View style={styles.inputFieldContainer}>
                        <TextInput
                            onChangeText={(e) => setPassword(e)}
                            style={styles.inputField}
                            placeholder={"Enter New Password"}
                            secureTextEntry={true}
                        />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.iconContainer}>
                        <Image style={styles.iconImg} source={lock} />
                        </View>
                        <View style={styles.inputFieldContainer}>
                        <TextInput
                            onChangeText={(e) => setResetPassword(e)}
                            style={styles.inputField}
                            placeholder={"Re-Enter New Password"}
                            secureTextEntry={true}
                        />
                        </View>
                    </View>
                    <TouchableOpacity
                        style={[styles.loginBtn, { marginTop: 20 }]}
                        onPress={() => checkPassword()}
                    >
                        <Text style={styles.loginText}>Reset Password</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={{ width: "100%" }}>
                    <View style={styles.inputContainer}>
                        <View style={styles.iconContainer}>
                        <Image style={styles.iconImg} source={lock} />
                        </View>
                        <View style={styles.inputFieldContainer}>
                        <TextInput
                            onChangeText={(e) => setUserCode(e)}
                            style={styles.inputField}
                            placeholder={"Enter Your Code"}
                        />
                        </View>
                    </View>
                    <TouchableOpacity
                        style={[styles.loginBtn, { marginTop: 20 }]}
                        onPress={() => checkCode()}
                    >
                        <Text style={styles.loginText}>Send Code</Text>
                    </TouchableOpacity>
                </View>
          )}

          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={styles.forgetText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.lastContainer}>
        <Text style={styles.calimText}>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa
        </Text>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isSuccess: state.auth.isSuccess,
  isSuccessMsg: state.auth.isSuccessMsg,
  isCode: state.auth.isCode,
  isValidateUserID: state.auth.isValidateUserID,
  isResetSucces: state.auth.isResetSucces,
  isResetMsg: state.auth.isResetMsg
});

const mapDispatchToProps = (dispatch) => ({
  postEmailLink: (email) => dispatch(emailLink(email)),
  postResetPasswordHandler: (isValidateUserID,password) => dispatch(resetPassword(isValidateUserID,password)),
  postCodeValidate: (userCode) => dispatch(codeValidate(userCode)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    marginTop: 80,
  },
  logoContainer: {
    height: "40%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  logoImageContainer: {
    justifyContent: "center",
    width: "100%",
    height: 150,
    alignItems: "center",
    textAlign: "center",
  },
  logoImage: {
    justifyContent: "center",
    width:450,
    height:150,
    resizeMode:"center"
  },
  formConatiner: {
    width: "100%",
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 0,
  },
  inputContainer: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    marginBottom: 30,
  },
  boldText: {
    fontSize: 25,
    fontFamily: "poppins-bold",
  },
  inputField: {
    height: 52,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#96A8B2",
    padding: 5,
    fontSize: 18,
    paddingLeft: 55,
    color: "#96A8B2",
    fontFamily: "poppins-regular",
  },
  iconContainer: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  inputFieldContainer: {
    height: 60,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  iconImg: {
    position: "absolute",
    left: 0,
    zIndex: 999999999,
  },
  loginBtn: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 3,
    borderColor: "#1073AC",
  },
  loginText: {
    color: "#1073AC",
    fontSize: 18,
    fontFamily: "poppins-bold",
  },
  forgetText: {
    color: "#1073AC",
    fontSize: 14,
    fontFamily: "poppins-regular",
    marginTop: 20,
  },
  lastContainer: {
    height: "20%",
    width: "100%",
    padding: 30,
  },
  calimText: {
    textAlign: "center",
    fontSize: 8,
    color: "#637E8D",
    fontFamily: "poppins-regular",
  },
  mainBannerText: {
    fontSize: 25,
    marginTop: 60,
    fontFamily: "poppins-regular",
    color: "#333333",
    textAlign: "center",
  },
  codeInput: {
    height: 50,
    width: 50,
    borderWidth: 1,
    textAlign: "center",
  },
});
