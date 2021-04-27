import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Text } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { insertSiteInstruction } from "../../../Redux/action/auth/authActionTypes";
import { connect } from "react-redux";

const DecorationRecord = (props) => {
    const { navigation, token, isSuccessMsg, isSuccess } = props;
    const jobID = Math.floor(Math.random() * 100) + 1;
    const tabId = props.route.params.tabName;
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dateSupervisor, setDateSupervisor] = useState(new Date());
  const [showSupervisor, setShowSupervisor] = useState(false);
  const [contractName, setContractName] = useState("");
  const [instructionNo, setInstructionNo] = useState("");
  const [raisedBy, setRaisedBy] = useState("");
  const [description, setDescription] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");
  const [supervisorName, setSupervisorName] = useState("");

  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(new Date(currentDate));
  };
  const showDatepicker = () => {
    setShow(true);
  };
  const onDateSupervisorChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowSupervisor(false);
    setDateSupervisor(new Date(currentDate));
  };
  const showSupervisorDatepicker = () => {
    setShowSupervisor(true);
  };
   const siteInstructionForm = () => {
    if (
      contractName != "" &&
      instructionNo != "" &&
      raisedBy != "" &&
      date != "" &&
      description != "" &&
      specialNotes != "" &&
      supervisorName != "" &&
      dateSupervisor != "" 
    ) {
      props.createSiteInstructionHandler(
        contractName,
        instructionNo,
        raisedBy,
        date.toLocaleDateString(),
        description,
        specialNotes,
        supervisorName,
        dateSupervisor.toLocaleDateString(),
        jobID,
        tabId,
        token
      );
    } else {
      alert("Please Insert All Fields CareFully !");
      return false;
    }
  };
  useEffect(() => {
    if (isSuccess) {
      if (isSuccessMsg) {
        console.log("here !");
        alert(isSuccessMsg);
        navigation.pop();
      }
    } else {
      if (isSuccessMsg) {
        alert(isSuccessMsg);
        return false;
      }
    }
  }, [isSuccess, isSuccessMsg]);
  return (
    <ScrollView style={{ height: "100%" }}>
      <DateTimePickerModal
        isVisible={show}
        date={date ? date : new Date()}
        mode={"date"}
        is24Hour={true}
        display="default"
        onConfirm={(date) => onChange(date)}
        onCancel={() => setShow(false)}
        cancelTextIOS="Cancel"
        confirmTextIOS="Confirm"
      />
      <DateTimePickerModal
        isVisible={showSupervisor}
        date={dateSupervisor ? dateSupervisor : new Date()}
        mode={"date"}
        is24Hour={true}
        display="default"
        onConfirm={(date) => onDateSupervisorChange(date)}
        onCancel={() => setShowSupervisor(false)}
        cancelTextIOS="Cancel"
        confirmTextIOS="Confirm"
      />
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Site Instruction</Text>
        </View>

        <View style={styles.formCodnatiner}>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Contract Name"}
              value={contractName}
              onChangeText={(e) => setContractName(e)}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Instruction No"}
              value={instructionNo}
              onChangeText={(e) => setInstructionNo(e)}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Raised by"}
              value={raisedBy}
              onChangeText={(e) => setRaisedBy(e)}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <Text
              onPress={() => showDatepicker()}
              style={{
                width: "100%",
                height: 52,
                borderBottomWidth: 1,
                borderBottomColor: "#96A8B2",
                paddingTop: 15,
                fontSize: 12,
                color: "#96A8B2",
                fontFamily: "poppins-regular",
              }}
            >
              {new Date(date).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={
                "Detailed Description of works to be carried out including its location"
              }
              value={description}
              onChangeText={(e) => setDescription(e)}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Any special conditions or notes"}
              value={specialNotes}
              onChangeText={(e) => setSpecialNotes(e)}
            />
          </View>
          <View style={{ paddingTop: 20, paddingBottom: 20 }}>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 8 }}>
              The works as instructed above are to be carried out in accordance
              with clause 2 and 9 of the agreed Contract Terms. It is the
              responsibility of the supervisor to manage the dayworks and DO NOT
              exceed the agreed figure for the daywork rates. If there are any
              changes throughout the process the supervisor should kindly inform
              the relevant Top Dec Managers before proceeding.{" "}
            </Text>
          </View>
          <View style={styles.instructionView}>
            <View style={styles.leftView}>
              <Text style={{ fontFamily: "poppins-bold", fontSize: 10 }}>
                A
              </Text>
              <Text style={{ fontFamily: "poppins-bold", fontSize: 10 }}>
                B
              </Text>
              <Text style={{ fontFamily: "poppins-bold", fontSize: 10 }}>
                C
              </Text>
              <Text style={{ fontFamily: "poppins-bold", fontSize: 10 }}>
                D
              </Text>
              <Text style={{ fontFamily: "poppins-bold", fontSize: 10 }}>
                E
              </Text>
            </View>
            <View style={styles.rightView}>
              <Text
                style={{
                  fontFamily: "poppins-regular",
                  fontSize: 9,
                  paddingTop: 2,
                }}
              >
                Cost to be set off against bad workmanship by other decorators
              </Text>
              <Text
                style={{
                  fontFamily: "poppins-regular",
                  fontSize: 9,
                  paddingTop: 2,
                }}
              >
                Cost to be set off against client{" "}
              </Text>
              <Text
                style={{
                  fontFamily: "poppins-regular",
                  fontSize: 9,
                  paddingTop: 2,
                }}
              >
                Contract agreed hours
              </Text>
              <Text
                style={{
                  fontFamily: "poppins-regular",
                  fontSize: 9,
                  paddingTop: 2,
                }}
              >
                Non-recoverable cost{" "}
              </Text>
              <Text
                style={{
                  fontFamily: "poppins-regular",
                  fontSize: 9,
                  paddingTop: 2,
                }}
              >
                Client – Extra works (Site Instruction)
              </Text>
            </View>
          </View>
          <View style={{ paddingTop: 20, paddingBottom: 20 }}>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 8 }}>
              For and on behalf of Top Dec Decorating Limited.
            </Text>
          </View>
          <View style={styles.instructionView}>
            <View style={styles.leftDistributionView}>
              <View style={{ width: "50%", marginRight: 5 }}>
                <View style={styles.inputFieldContainer}>
                  <TextInput
                    style={styles.inputField}
                    placeholder={"Supervisor"}
                    value={supervisorName}
                    onChangeText={(e) => setSupervisorName(e)}
                  />
                </View>
              </View>
              <View style={{ width: "50%", marginRight: 5 }}>
                <View style={styles.inputFieldContainer}>
                  <Text
                    onPress={() => showSupervisorDatepicker()}
                    style={{
                      width: "100%",
                      height: 52,
                      borderBottomWidth: 1,
                      borderBottomColor: "#96A8B2",
                      paddingTop: 15,
                      fontSize: 12,
                      color: "#96A8B2",
                      fontFamily: "poppins-regular",
                    }}
                  >
                    {new Date(dateSupervisor).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.rightDistributionView}>
              <Text style={{ fontFamily: "poppins-bold", fontSize: 8 }}>
                Distribution:
              </Text>
              <View style={{ paddingLeft: 10 }}>
                <Text style={{ fontFamily: "poppins-regular", fontSize: 8 }}>
                  Top Dec Accounts
                </Text>
                <Text style={{ fontFamily: "poppins-regular", fontSize: 8 }}>
                  Managing Director
                </Text>
                <Text style={{ fontFamily: "poppins-regular", fontSize: 8 }}>
                  Accountant
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#000",
            width: "100%",
            height: 2,
            marginTop: 20,
          }}
        ></View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.commonBtn}
            onPress={() => siteInstructionForm()}
          >
            <Text style={styles.commonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const mapStateToProps = (state) => ({
    token: state.auth.token,
    isSuccess: state.auth.isSuccess,
    isSuccessMsg: state.auth.isSuccessMsg
  });
  const mapDispatchToProps = (dispatch) => ({
    createSiteInstructionHandler: (
        contractName,
        instructionNo,
        raisedBy,
        date,
        description,
        specialNotes,
        supervisorName,
        dateSupervisor,
        jobID,
        tabId,
        token
      ) =>
        dispatch(
          insertSiteInstruction(
            contractName,
        instructionNo,
        raisedBy,
        date,
        description,
        specialNotes,
        supervisorName,
        dateSupervisor,
        jobID,
        tabId,
        token
          )
        ),
  });
  export default connect(mapStateToProps, mapDispatchToProps)(DecorationRecord);
const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
  },
  titleContainer: {
    height: "5%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  titleText: {
    color: "#4F4F4F",
    fontSize: 18,
    fontFamily: "poppins-semiBold",
  },
  formCodnatiner: {
    width: "100%",
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
    fontSize: 12,
    color: "#96A8B2",
    fontFamily: "poppins-regular",
  },
  instructionView: {
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    width: "100%",
    flexDirection: "row",
  },
  leftView: {
    borderRightWidth: 1,
    width: "5%",
  },
  rightView: {
    width: "95%",
    paddingLeft: 10,
  },
  leftDistributionView: {
    width: "70%",
    flexDirection: "row",
    borderRightWidth: 1,
  },
  rightDistributionView: {
    width: "30%",
    padding: 10,
  },
  btnContainer: {
    width: "100%",
    height: "15%",
    marginBottom: 40,
    marginTop: 20,
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
});
