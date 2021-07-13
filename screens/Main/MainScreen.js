import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Text } from "native-base";
import { connect } from "react-redux";

const MainScreen = (props) => {
  const { navigation, isLogin, isLoginMsg, role, isUserID } = props;
  console.log("Role :", role);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.mutipleBtn}>
        <TouchableOpacity
          style={styles.commonBtn}
          onPress={() => navigation.navigate("NewJob")}
        >
          <Text style={styles.commonText}>Create New Job</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.commonBtn}
          onPress={() => navigation.navigate("ViewJob")}
        >
          <Text style={styles.commonText}>View / Search Job</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.commonBtn}
          onPress={() => navigation.navigate("CreateDecorataor")}
        >
          <Text style={styles.commonText}>Create Decorator</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.commonBtn}
          onPress={() =>
            navigation.navigate("SearchDecorator", { role: "admin" })
          }
        >
          <Text style={styles.commonText}>View / Search Decorator</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.commonBtn}
          onPress={() => navigation.navigate("CreateSupervisor")}
        >
          <Text style={styles.commonText}>Create Supervisor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.commonBtn}
          onPress={() => navigation.navigate("SearchSupervisor")}
        >
          <Text style={styles.commonText}>View / Search Supervisor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const mapStateToProps = (state) => ({
  role: state.auth.role,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    marginTop: 20,
  },
  mutipleBtn: {
    height: "100%",
    width: "100%",
    padding: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  commonBtn: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 3,
    borderColor: "#1073AC",
    marginBottom: 40,
  },
  commonText: {
    color: "#1073AC",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "poppins-medium",
  },
});
