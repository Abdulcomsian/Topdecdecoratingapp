import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Text } from "native-base";
import axios from "axios";
import ListView from "../../components/common/listView";

const AllJobs = (props) => {
  const { navigation } = props;
  const [loading, setLoading] = useState(false);
  const date = props.route.params.selectedDate;
  const reference_number = props.route.params.refernceNum;
  const token = props.route.params.token;
  const [contractorName, setConstructorName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [supervisorID, setSupervisorID] = useState("");
  const [weeks, setWeeks] = useState("");
  const [jobData, setJobData] = useState([]);
  const [showView, setShowView] = useState(false);

  console.log("Slected Date :", date);
  console.log("Refernce Number :", reference_number);

  useEffect(() => {
    try {
      const body = { reference_number, date, token };
      (async () => {
        setLoading(true);
        const request = await axios(
          "https://topdecdecoratingapp.com/api/admin/search/job/refid",
          {
            method: "POST",
            headers: {
              authorization: "Bearer " + token,
            },
            data: body,
          }
        );
        const response = await request.data;
        console.log("Insert Response :", response);
        if (response.success) {
          setJobData(response.data.user);
          setLoading(false);
          setShowView(true);
        } else {
          setLoading(false);
          setShowView(false);
        }
      })();
    } catch (err) {
      console.log("Error");
      console.log(err.message);
      setLoading(false);
    }
  }, []);
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color="#1073AC" size="small" />
      </View>
    );
  } else {
    return (
      <View style={styles.mainContainer}>
        {/* <View style={styles.dateTimeContainer}>
                <Text style={styles.refText}>Date: 12-2-2021</Text>
                <Text style={styles.refText}>Ref  id: 10099499</Text>
            </View> */}
        {/* <View style={styles.titleContainer}>
          <Text style={styles.titleText}>ALL Jobs</Text>
        </View> */}

        {showView ? (
          <ListView data={jobData} {...props} />
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "85%",
            }}
          >
            <Text>Sorry No Data Found !</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.commonBtn}
          onPress={props.navigation.goBack}
        >
          <Text style={styles.commonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
};
export default AllJobs;

const styles = StyleSheet.create({
  mainContainer: {
   flex:1,
   paddingTop:20
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
    height: "100%",
    width: "100%",
    padding: 30,
    alignItems: "center",
  },
  inputFieldContainer: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
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
  inputContainer: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  decoratorTitle: {
    fontFamily: "poppins-semiBold",
    width: "50%",
  },
  detailItem: {
    marginLeft: 30,
    fontFamily: "poppins-regular",
    width: "60%",
  },
  chekboxText: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  checkText: {
    fontFamily: "poppins-regular",
    fontSize: 12,
  },
  detailItemInput: {
    width: "60%",
    borderBottomWidth: 1,
    borderBottomColor: "#96A8B2",
    fontSize: 16,
    color: "#96A8B2",
    fontFamily: "poppins-regular",
  },
  btnContainer: {
    width: "100%",
    marginTop: 30,
  },
  commonBtn: {
    height: 50,
    width: "90%",
    alignSelf:'center',
    justifyContent: "center",
    marginBottom:20,
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
