import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Text } from "native-base";
import { adminLogin } from "../../Redux/action/auth/authActionTypes";
import { connect } from "react-redux";
import { StackActions } from "@react-navigation/native";

const logo = require("../../assets/authScreen/logo.jpeg");
const user = require("../../assets/authScreen/icon.png");
const lock = require("../../assets/authScreen/lock.png");

const LoginScreen = (props) => {
  const { navigation, isLogin, isLoginMsg, role, isUserID, token } = props;
  // const dispatch = useDispatch()
  // const [email, setEmail] = useState("Waqas@gmail.com");
  // const [password, setPassword] = useState("Waqas@123");
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const postSignInHandler = async (type) => {
    try {
      if (type == "admin") {
        let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email != "" && password != "") {
          if (regEmail.test(email) === false) {
            setEmailErr("Email is Not Correct");
            setEmail(email);
            return false;
          } else {
            setEmail(email);
            // alert("Email is Correct");
            try {
              await props.loginHandler(email, password);
            } catch (err) {
              setEmailErr("Email is wrong or");
              setPasswordErr("Password is wrong");
              //alert(err.message);
            }
          }
        } else {
          setEmailErr("Email is empty");
          setPasswordErr("Password is empty");
          // alert("Please Enter Login Credential Carefully !");
        }
      } else {
        let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let regPass =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (email != "" && password != "") {
          if (regEmail.test(email) === false) {
            setEmailErr("Email is Not Correct");
            setEmail(email);
            return false;
          } else {
            setEmail(email);
            //alert("Email is Correct");
            if (regPass.test(password) === false) {
              setPasswordErr(
                "Password is Not Correct ! Please Enter Atleast One Capital Letter One Specail Character and minimum 8 length of Password"
              );
              setPassword(password);
              return false;
            } else {
              //alert("Password is Correct");
              await props.loginHandler(email, password);
            }
          }
        } else {
          setEmailErr("Email is wrong or");
          setPasswordErr("Password is wrong");
          //alert("Please Enter Login Credential Carefully !");
        }
      }
    } catch (err) {
      // alert(err.message)
    }
  };
  // console.log("Login Role :", role);
  useEffect(() => {
    (async () => {
      if (isLogin) {
        if (isLoginMsg) {
          //alert(isLoginMsg)
          if (role == "ADMIN") {
            // await AsyncStorage.setItem('token', JSON.stringify({token:token}))
            props.navigation.dispatch(StackActions.replace("MainScreen"));
          } else if (role == "DECORATOR") {
            props.navigation.dispatch(
              StackActions.replace("DecoratorDetails", {
                roleID: "decorator",
                id: isUserID,
              })
            );
          } else {
            // props.navigation.dispatch(StackActions.replace('DetailSupervisor',{role:"supervisor",id: isUserID}))
            props.navigation.dispatch(
              StackActions.replace("ViewJob", {
                role: "supervisor",
                id: isUserID,
              })
            );
          }
        }
      } else {
        if (isLoginMsg) {
          //alert(isLoginMsg)
        }
      }
    })();
  }, [isLogin, isLoginMsg]);

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.logoContainer}>
          <View style={styles.logoImageContainer}>
            <Image style={styles.logoImage} source={logo} />
          </View>
          <Text style={styles.mainBannerText}>
            <Text style={styles.boldText}>Top Dec</Text> Decorating
          </Text>
        </View>
        <KeyboardAvoidingView
          style={styles.formConatiner}
          behavior={Platform.OS === "ios" ? "position" : "height"}
          contentContainerStyle={{
            backgroundColor: "#fff",
            alignItems: "center",
          }}
        >
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Image style={styles.iconImg} source={user} />
            </View>
            <View style={styles.inputFieldContainer}>
              <TextInput
                onChangeText={(e) => {
                  setEmail(e);
                  emailErr && setEmailErr('');
                }}
                value={email}
                style={
                  emailErr
                    ? {
                        ...styles.inputField,
                        borderBottomColor: "red",
                        marginBottom: 0,
                      }
                    : styles.inputField
                }
                placeholder={"Email"}
              />
            </View>
          </View>
          {emailErr !== "" && (
            <Text style={{ color: "red", marginBottom: 25 }}>{emailErr}</Text>
          )}
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Image style={styles.iconImg} source={lock} />
            </View>
            <View style={styles.inputFieldContainer}>
              <TextInput
                onChangeText={(e) => {
                  setPassword(e);
                  passwordErr && setPasswordErr("");
                }}
                value={password}
                style={
                  passwordErr
                    ? {
                        ...styles.inputField,
                        borderBottomColor: "red",
                        marginBottom: 0,
                      }
                    : styles.inputField
                }
                placeholder={"Password"}
                secureTextEntry={true}
              />
            </View>
          </View>
          {passwordErr !== "" && (
            <Text style={{ color: "red", marginBottom: 25 }}>
              {passwordErr}
            </Text>
          )}
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => postSignInHandler("admin")}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgetPassword")}
          >
            <Text style={styles.forgetText}>Forgot Password</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <View style={styles.lastContainer}>
          <Text style={styles.calimText}>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa
          </Text>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = ({ auth }) => ({
  isLogin: auth.isLogin,
  isLoginMsg: auth.isLoginMsg,
  token: auth.token,
  role: auth.role,
  isUserID: auth.isUserID,
});

const mapDispatchToProps = (dispatch) => ({
  loginHandler: (email, pass) => dispatch(adminLogin(email, pass)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContainer: {
    height: "100%",
    width: "100%",
    marginTop: 80,
  },
  logoContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "40%",
  },
  logoImageContainer: {
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    textAlign: "center",
  },
  logoImage: {
    justifyContent: "center",
    width: 450,
    height: 150,
    resizeMode: "center",
  },
  formConatiner: {
    //width: "90%",
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  inputContainer: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    marginBottom: 30,
  },
  mainBannerText: {
    fontSize: 25,
    marginTop: 60,
    fontFamily: "poppins-regular",
    color: "#333333",
    textAlign: "center",
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
    marginHorizontal: 70,
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
});
