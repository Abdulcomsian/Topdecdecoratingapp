import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Text } from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";
import { searchJob } from "../../Redux/action/auth/authActionTypes";
import { connect } from "react-redux";
import { getCustomData } from "../../lib/utils";
const SearchJob = ({ navigation, token }) => {
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [refID, setRefID] = useState("");
  const [changeDate, setChnageDate] = useState(false);
  const [basedText, setBasedText] = useState("");
  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    // setDate(currentDate);
    // console.log(selectedDate)
    setDate(new Date(currentDate).toLocaleDateString());
    setChnageDate(true);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const searchJob = () => {
    console.log("Show Value :", show);
    console.log(date);
    if (refID) {
      if (changeDate) {
        console.log("Changed Date with Ref ID");
        setBasedText("Changed Date with Ref ID");
        navigation.navigate("AllJobs", {
          selectedDate: date,
          refernceNum: refID,
          basedText: basedText,
          token: token,
        });
        //searchJobHandler(refID,date,token)
      } else {
        setBasedText("Just Ref ID");
        navigation.navigate("AllJobs", {
          selectedDate: "",
          refernceNum: refID,
          basedText: basedText,
          token: token,
        });
        //searchJobHandler(refID,date,token)
        setDate(new Date());
      }
    } else if (changeDate) {
      console.log("Just Date");
      setBasedText("Just Date");
      navigation.navigate("AllJobs", {
        selectedDate: getCustomData(date),
        refernceNum: refID,
        basedText: basedText,
        token: token,
      });
      // searchJobHandler(refID,date,token)
    } else {
      alert("Please Enter Refernce ID Or Date Select !");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.mainContainer}>
        <DateTimePicker
          isVisible={show}
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          display="default"
          onConfirm={onChange}
          onCancel={() => {
            setShow(false);
          }}
          format="DD-MM-YYYY"
          placeholder="Select Date"
        />
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Search Jobs</Text>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "poppins-regular",
              fontSize: 14,
            }}
          >
            Search a job by either reference ID or Date job created
          </Text>
        </View>
        <View style={styles.searchByView}>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Enter Ref ID"}
              value={refID}
              onChangeText={(e) => setRefID(e.replace(/[^0-9]/g, ""))}
            />
          </View>
          <Text
            style={{
              justifyContent: "center",
              textAlign: "center",
              fontFamily: "poppins-medium",
              marginTop: 20,
            }}
          >
            OR
          </Text>
          <View style={styles.inputFieldContainer}>
            <View style={styles.inputFieldContainer}>
              <Text onPress={showDatepicker} style={styles.inputField}>
                {getCustomData(date)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.footerBtnView}>
          <TouchableOpacity style={styles.commonBtn} onPress={searchJob}>
            <Text style={styles.commonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const mapStateToProps = ({ auth }) => ({
  token: auth.token,
});
const mapDispatchToProps = (dispatch) => ({
  searchJobHandler: (refID, date, token) =>
    dispatch(searchJob(refID, date, token)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchJob);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    height: "100%",
    width: "100%",
  },
  titleContainer: {
    height: "20%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    color: "#4F4F4F",
    fontSize: 18,
    fontFamily: "poppins-semiBold",
    marginBottom: 20,
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
  },
  commonText: {
    color: "#1073AC",
    fontSize: 18,
    fontFamily: "poppins-semiBold",
  },
  searchByView: {
    height: "65%",
    width: "100%",
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  footerBtnView: {
    height: "15%",
    width: "100%",
    padding: 20,
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
});
