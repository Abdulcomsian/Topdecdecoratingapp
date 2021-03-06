import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { Text } from "native-base";
import axios from "axios";

var rightArrow = require("../../assets/authScreen/right.png");
const ViewNotes = (props) => {
  const { navigation, token, isMakeReady, isSuccessMsg, isJobId } = props;
  console.log(props.route.params.id);
  const decorator_id = props.route.params.id;
  const [plotArray, setPlotArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showView, setShowView] = useState(false);
  useEffect(() => {
    try {
      const body = { decorator_id };
      (async () => {
        setLoading(true);
        const request = await axios(
          "http://topdecdecoratingapp.com/api/admin/fetch_dates",
          {
            method: "POST",
            headers: {
              authorization: "Bearer " + token,
            },
            data: body,
          }
        );
        const response = await request.data;
        if (response.success == true) {
          console.log("here");
          setPlotArray(response.data.user);
          setLoading(false);
          setShowView(true);
        } else {
          setLoading(false);
          setShowView(false);
          setErrorMsg(response.message);
        }
      })();
    } catch (err) {
      alert(err.message);
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
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>View Notes</Text>
        </View>
        {showView ? (
          <View style={{ padding: 30 }}>
            {plotArray.map((item,index)=>(
                <TouchableOpacity style={styles.commonBtn} onPress={()=>navigation.navigate("NotesDetail",{date:item.date,id:decorator_id})}>
                    <Text style={styles.commonText}>{item.date}</Text>
                    <Image  source={rightArrow}/>
                </TouchableOpacity>
            ))}
          </View>
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
      </View>
    );
  }
};
export default ViewNotes;
const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
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
  },
});
