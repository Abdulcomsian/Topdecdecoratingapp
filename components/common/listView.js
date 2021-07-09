import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Text } from "native-base";
import { connect } from "react-redux";

var rightArrow = require("../../assets/authScreen/right.png");

const listView = (props) => {
  const { navigation, token } = props;
  const [searchJob, setSeachJob] = useState([]);
  const [typeData, setDataType] = useState("");

  console.log("Navigation :", props);

  useEffect(() => {
    if (props.data) {
      setSeachJob(props.data);
      setDataType(props.data);
      console.log("after Fill :", searchJob);
    } else {
      setDataType(props.screenType);
      console.log("after Fill Type:", typeData);
    }
  }, [props]);

  return (
    <View style={styles.mainContainer}>
      <View style={{ marginLeft: 20, marginRight: 20 }}>
        <ScrollView>
          {props.data.map((item, index) => (
            <TouchableOpacity
              style={styles.listButton}
              key={index}
              onPress={() =>
                navigation.navigate("DetailsJob", {
                  searchJobData: props.data[index],
                })
              }
            >
              <Text style={styles.emailText}>{item.supervisor_id}</Text>
              <Text style={styles.emailText}>{item.project}</Text>
              <Image source={rightArrow} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(listView);

const styles = StyleSheet.create({
  mainContainer: {
   flex:1
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
  listButton: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 3,
    borderColor: "#1073AC",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  emailText: {
    color: "#4F4F4F",
    fontSize: 14,
    fontFamily: "poppins-semiBold",
  },
});
