import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { Text } from "native-base";
import axios from "axios";

var rightArrow = require("../../assets/authScreen/right.png");
const DetailNotes = (props) => {
  const { navigation, token, isMakeReady, isSuccessMsg, isJobId } = props;
  console.log(props)
  const decorator_id = props.route.params.id;
  const date = props.route.params.date;
  const [noteArray, setNoteArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showView, setShowView] = useState(false);
  useEffect(() => {
    try {
      const body = { date, decorator_id };
      (async () => {
        setLoading(true);
        const request = await axios(
          "http://topdecdecoratingapp.com/api/admin/Fetch_notes_details",
          {
            method: "POST",
            headers: {
              authorization: "Bearer " + token,
            },
            data: body,
          }
        );
        const response = await request.data;
        console.log(response.data.user);
        if (response.success == true) {
          console.log("here");
          setNoteArray(response.data.user);
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
          <Text style={styles.titleText}>List of Notes</Text>
        </View>
        {showView ? (
          <View style={{ padding: 30 }}>
            {noteArray.map((item,index)=>(
                <TouchableOpacity style={styles.commonBtn}>
                    <Text style={styles.commonText}>{item.notes}</Text>
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
export default DetailNotes;
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
