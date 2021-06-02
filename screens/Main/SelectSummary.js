import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text } from "native-base";
import { connect } from "react-redux";

var rightArrow = require("../../assets/authScreen/right.png");
const SelectSummary = (props) => {
  const { navigation, token, isJobId, summary } = props;
  const { plot_id,plotName } = props.route.params;

  console.log("Plot ID :",plot_id)
  return (
    <View style={styles.mainContainer}>
      {/* <View style={styles.dateTimeContainer}>
        <Text style={styles.refText}>Date: 12-2-2021</Text>
        <Text style={styles.refText}>Ref id: 10099499</Text>
      </View> */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Select Summary</Text>
      </View>
      <View style={{ height: "70%", width: "100%" }}>
        <View style={{ paddingTop: 30, paddingLeft: 20, paddingRight: 20 }}>
          {summary.map((item, index) => (
            <TouchableOpacity style={styles.commonBtn} onPress={() => navigation.navigate(item.url,{plot_id:plot_id,plotName:plotName})}>
              <Text style={styles.commonText}>{item.ploatName}</Text>
              <Image source={rightArrow} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.saveBtn} onPress={() => navigation.navigate("SelectSummary")}>
          <Text style={styles.commonText}>Next</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
  isJobId: state.auth.isJobId,
  summary: state.summary.summaryReport,
});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SelectSummary);
const styles = StyleSheet.create({
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
    paddingTop: 20,
  },
  titleText: {
    color: "#4F4F4F",
    fontSize: 18,
    fontFamily: "poppins-semiBold",
  },
  commonBtn: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 3,
    borderColor: "#1073AC",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
    paddingLeft: 10,
  },
  commonText: {
    color: "#1073AC",
    fontSize: 16,
    fontFamily: "poppins-semiBold",
    justifyContent: "center",
  },
  btnContainer: {
    width: "100%",
    height: "15%",
    justifyContent: "center",
    paddingRight: 20,
    paddingLeft: 20,
  },
  saveBtn: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 3,
    borderColor: "#1073AC",
  },
});
