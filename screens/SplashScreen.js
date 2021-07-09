import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "native-base";
import { connect } from "react-redux";
import { resetLoginFlag ,JustLoginInternally} from "../Redux/action/auth/authActionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/routers";

var logo = require("../assets/authScreen/logo.jpeg");
const SplashScreen = (props) => {
  const { navigation } = props;
  // useEffect(() => {
  //     const timer = setTimeout(()=>{
  //         navigation.navigate('LoginScreen');
  //     },5000);
  //     return () => clearTimeout(timer);
  // }, []);
  useEffect(() => {
    // (async()=>{
   AsyncStorage.clear();
    const unsubscribe = navigation.addListener("focus", async () => {
      props.resetLoginFlag();
      const authUser = await AsyncStorage.getItem("user");
      let user = JSON.parse(authUser);
      //let token = user?.user?.role;
      console.log("Splash Screen Token :",user)
      if (user) {
          props.JustLoginInternally(user)
        if (user?.user?.role === "ADMIN") {
          setTimeout(() => {
            props.navigation.dispatch(StackActions.replace("MainScreen"));
          }, 1000);
        } else if (user?.user?.role === "DECORATOR") {
          setTimeout(() => {
            props.navigation.dispatch(
              StackActions.replace("DecoratorDetails", {
                roleID: "decorator",
                id: user?.user?.id,
              })
            );
          }, 1000);
        } else {
          setTimeout(() => {
            props.navigation.dispatch(
              StackActions.replace("ViewJob", {
                role: "supervisor",
                isUserID: user?.user?.id,
              })
            );
          }, 1000);
        }
      } else {
          navigation.navigate("LoginScreen");
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    // try {
    //     let userData = await AsyncStorage.getItem("token");
    //     let data = JSON.parse(userData);
    //     if(data.token){
    //         navigation.navigate('MainScreen');
    //     } else{

    //     }

    //   } catch (error) {
    //     console.log("Something went wrong", error);
    //   }
    return unsubscribe;
    // })()
  }, [navigation]);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <View style={styles.logoImageContainer}>
          <Image style={styles.logoImage} source={logo} />
        </View>
        <Text style={styles.mainBannerText}>
          <Text style={styles.boldText}>Top Dec</Text> Decorating
        </Text>
      </View>
      <View style={styles.lastContainer}>
        <Text style={styles.calimText}>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa
        </Text>
      </View>
    </View>
  );
};
const mapDispatchToProps = (dispatch) => ({
  resetLoginFlag: () => dispatch(resetLoginFlag()),
  JustLoginInternally: (payload) => dispatch(JustLoginInternally(payload)),
});
export default connect(null, mapDispatchToProps)(SplashScreen);

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
  },
  logoContainer: {
    height: "90%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
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
    width: 450,
    height: 150,
    resizeMode: "center",
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
  iconImg: {
    position: "absolute",
    left: 0,
    zIndex: 999999999,
  },
  lastContainer: {
    height: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  calimText: {
    textAlign: "center",
    fontSize: 8,
    color: "#637E8D",
    fontFamily: "poppins-regular",
  },
});
