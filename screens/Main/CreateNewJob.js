import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Text } from "native-base";
import { connect } from "react-redux";
import { createNewJobCreation } from "../../Redux/action/auth/authActionTypes";
import axios from "axios";
import { Picker } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";

var plus = require("../../assets/authScreen/plus.png");
const NewJob = (props) => {
  const { navigation, isJobId, isJob, isJobMsg } = props;
  const [token, setToken] = useState(props.token);
  const [data, setData] = useState({
    qty: "",
    description: "",
  });
  const [constructorName, setConstructorName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [weekProject, setWeekProject] = useState("");
  const [dynamicInput, setdynamicInput] = useState([]);
  const [supervisorData, setSupervisorData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const addInput = () => {
    setdynamicInput((oldArray) => [...oldArray, data]);
    setData({
      qty: "",
      description: "",
    });
  };
  const [selectedValue, setSelectedValue] = useState();

  const updateValue = (key, index, value) => {
    let preData = [...dynamicInput];
    preData[index][key] = value;
    setdynamicInput(preData);
  };
  const newJob = async () => {
    try {
      if (
        constructorName != "" &&
        projectName != "" &&
        weekProject != "" &&
        selectedValue != "" &&
        date != "" &&
        dynamicInput != ""
      ) {
        await props.createNewJobHandler(
          constructorName,
          projectName,
          weekProject,
          selectedValue,
          date.toLocaleDateString(),
          dynamicInput,
          token
        );
        props.navigation.navigate("MainScreen")
        alert("Job Saved Successfully");
      } else {
        alert("Please Enter All Missing Fields CareFully !");
      }
    } catch (err) {
      alert(err.message);
    }
  };
  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(new Date(currentDate));
  };
  const showDatepicker = () => {
    setShow(true);
  };

  useEffect(() => {
    try {
      const body = {};
      (async () => {
        setLoading(true);
        const request = await axios(
          "https://airtimetesting.airtime4u.com/public/tajs/public/api/admin/view/Supervisors",
          {
            method: "POST",
            headers: {
              authorization: "Bearer " + token,
            },
            data: body,
          }
        );
        const response = await request.data.data.user;
        setSupervisorData(request.data.data.user);
        setLoading(false);
      })();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, []);
  // useEffect(() => {
  //   if(isJob){
  //     if(isJobMsg){
  //       console.log(isJobId)
  //         props.navigation.navigate('TotalSummary',{jobID: isJobId})
  //     }
  //     }
  //     else{
  //         if(isJobMsg){
  //             alert(isJobMsg)
  //             return false;
  //         }
  //     }
  // },[isJob,isJobMsg])
  // React.useEffect(() => {
  //   if (isJob) {
  //     props.navigation.navigate("TotalSummary", { jobID: isJobId });
  //   }
  // }, [isJob]);
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color="#1073AC" size="small" />
      </View>
    );
  } else {
    return (
      <View style={styles.mainContainer}>
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
        <View style={styles.dateTimeContainer}>
          <Text style={styles.refText}>Date: 12-2-2021</Text>
          <Text style={styles.refText}>Ref id: 10099499</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Input job details</Text>
        </View>
        <ScrollView>
          <View style={styles.formConatiner}>
            <View style={styles.inputFieldContainer}>
              <TextInput
                style={styles.inputField}
                placeholder={"Main Contractor Name"}
                value={constructorName}
                onChangeText={(e) => setConstructorName(e)}
              />
            </View>
            <View style={styles.inputFieldContainer}>
              <TextInput
                style={styles.inputField}
                placeholder={"Project Name"}
                value={projectName}
                onChangeText={(e) => setProjectName(e)}
              />
            </View>
            <View style={styles.inputFieldContainer}>
              <TextInput
                style={styles.inputField}
                placeholder={"Number of weeks for project"}
                value={weekProject}
                onChangeText={(e) => setWeekProject(e.replace(/[^0-9]/g, ''))}
              />
            </View>
            <View style={styles.inputFieldContainer}>
              <Picker
                mode="dropdown"
                placeholder="Countries"
                // iosIcon={<Icon name='arrow-down' />}
                itemTextStyle={{
                  color: "#96A8B2",
                  fontFamily: "poppins-regular",
                }}
                textStyle={{
                  color: "#96A8B2",
                  fontSize: 16,
                  fontFamily: "poppins-regular",
                }}
                style={{
                  color: "#96A8B2",
                }}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }
              >
                <Picker.Item
                  style={{ fontFamily: "poppins-regular" }}
                  label="Select Supervisor ID"
                  value="Select Supervisor ID"
                />
                {supervisorData &&
                  supervisorData.map((item) => (
                    <Picker.Item
                      style={{ fontFamily: "poppins-regular" }}
                      label={item.id.toString()}
                      value={item?.id.toString()}
                    />
                  ))}
              </Picker>
            </View>
            <View style={styles.inputFieldContainer}>
              <Text
                onPress={() => showDatepicker()}
                style={{
                  width: "100%",
                  height: 60,
                  paddingTop: 20,
                  fontSize: 16,
                  color: "#96A8B2",
                  fontFamily: "poppins-regular",
                }}
              >
                {new Date(date).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Job Summary</Text>
            </View>
            {dynamicInput.length > 0 && (
              <View style={[styles.dynamicInput, { flexDirection: "column" }]}>
                {dynamicInput.map((el, index) => (
                  <View style={styles.inputContainer} key={index}>
                    <TextInput
                      onChangeText={(txt) => updateValue("qty", index, txt.replace(/[^0-9]/g, ''))}
                      style={styles.quantityInput}
                      value={el.qty}
                      placeholder={"Quantity"}
                    />
                    <TextInput
                      onChangeText={(txt) =>
                        updateValue("description", index, txt)
                      }
                      style={styles.descriptionInput}
                      value={el.description}
                      placeholder={"Description"}
                    />
                  </View>
                ))}
              </View>
            )}
            <View style={styles.dynamicInput}>
              <View style={styles.inputContainer}>
                <TextInput
                  onChangeText={(txt) => setData({ ...data, qty: txt.replace(/[^0-9]/g, '') })}
                  style={styles.quantityInput}
                  placeholder={"Quantity"}
                  value={data.qty}
                />
                <TextInput
                  onChangeText={(txt) => setData({ ...data, description: txt })}
                  style={styles.descriptionInput}
                  placeholder={"Description"}
                  value={data.description}
                />
              </View>

              <View style={styles.addBtn}>
                <TouchableOpacity onPress={() => addInput()}>
                  <Image style={styles.plusBtn} source={plus} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.btnContainer}>
              {/* <TouchableOpacity
                style={styles.commonBtn}
                onPress={() => navigation.navigate("TotalSummary")}
            >
                <Text style={styles.commonText}>Save</Text>
            </TouchableOpacity> */}
              {/* <TouchableOpacity
                style={styles.commonBtn}
                onPress={() => navigation.navigate("SelectSummary")}
            >
                <Text style={styles.commonText}>Save</Text>
            </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.commonBtn}
                onPress={() => newJob(this)}
              >
                <Text style={styles.commonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
  isJob: state.auth.isJob,
  isJobMsg: state.auth.isJobMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
  createNewJobHandler: (
    constructorName,
    projectName,
    weekProject,
    assignSupervisor,
    date,
    dynamicInput,
    token
  ) =>
    dispatch(
      createNewJobCreation(
        constructorName,
        projectName,
        weekProject,
        assignSupervisor,
        date,
        dynamicInput,
        token
      )
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(NewJob);
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
    marginTop: 20,
  },
  titleText: {
    color: "#4F4F4F",
    fontSize: 18,
    fontFamily: "poppins-semiBold",
  },
  formConatiner: {
    width: "100%",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  inputFieldContainer: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#96A8B2",
  },
  inputField: {
    height: 60,
    width: "100%",
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
    fontSize: 12,
    marginRight: 20,
    fontFamily: "poppins-regular",
  },
  descriptionInput: {
    width: "50%",
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: "#96A8B2",
    padding: 5,
    fontSize: 12,
    fontFamily: "poppins-regular",
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
    marginTop: 50,
    height: "15%",
    marginBottom: 20,
  },
});
