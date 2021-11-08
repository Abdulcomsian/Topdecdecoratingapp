import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Text } from "native-base";
import { connect } from "react-redux";
import axios from "axios";

var rightArrow = require("../../assets/authScreen/right.png");
var base_url = "https://topdecdecoratingapp.com/api/";
const AssignedJobsList = (props) => {
  console.log(props);
  const { navigation, token, isJobId } = props;
  const { id, role } = props.route.params;
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const supervisor_id = id;
  console.log("Assigned Job", supervisor_id);
  useEffect(() => {
    try {
      if (role) {
        const data = { supervisor_id };
        (async () => {
          setLoading(true);
          const request = await axios(
            base_url + "supervisor/search/job/assigned",
            {
              method: "POST",
              headers: {
                authorization: "Bearer " + token,
              },
              data,
            }
          );
          const response = await request.data;
          console.log("fetch", response);
          if (response.success == true) {
            setJobData(response.data.user);
            setLoading(false);
            setShow(true);
          } else {
            setLoading(false);
            alert(response.message);
            setShow(false);
          }
          // if (response.success == true) {
          //   console.log(response);
          //   setSupervisorData(response.data.user);
          //   setLoading(false);
          // } else {
          //   setLoading(false);
          //   setErrorMsg(request.message);
          //   AsyncStorage.clear();

          // }
        })();
      } else {
        alert("Role Not Found !");
      }
    } catch (err) {
      // alert(err.message);
      setLoading(false);
      AsyncStorage.clear();
      navigation.navigate("LoginScreen");
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
        <Text style={styles.refText}>Ref id: 10099499</Text>
      </View> */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Assigned Jobs</Text>
        </View>
        {show == true ? (
          <ScrollView>
            <View style={{ height: "70%", width: "100%" }}>
              <View
                style={{ paddingTop: 30, paddingLeft: 20, paddingRight: 20 }}
              >
                {jobData.map((item, index) => (
                  <TouchableOpacity
                    style={styles.commonBtn}
                    onPress={() =>
                      navigation.navigate("TotalSummary", {
                        isJobId: item.job_id,
                      })
                    }
                    key={index}
                  >
                    <Text style={styles.commonText}>{item.project}</Text>
                    <Image source={rightArrow} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "85%",
            }}
          >
            <Text>Sorry No Job Found !</Text>
          </View>
        )}
      </View>
    );
  }
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
  isJobId: state.auth.isJobId,
  summary: state.summary.summaryReport,
});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(AssignedJobsList);
const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    flex: 1,
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
    height: "10%",
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
