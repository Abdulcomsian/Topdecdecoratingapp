import React from "react";
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
var plus = require("../../assets/authScreen/plus.png");
import styles from "../../assets/css/styles";
const TBTForm = (props) => {
  const { data, addAttendence, onChangeData, getSignature, isDrugs = false, addToolBox, isVoilence = false } = props;
  // console.log(data);
  const { contractor, project, supervisor, date, comments, jobSummary, signature } = data;
  const [openData, setOpenDate] = React.useState({ bool: false, index: -1 });

  return (
    <>
      <DateTimePicker
        isVisible={openData.bool}
        testID='dateTimePicker'
        value={date ? date : new Date()}
        mode={"date"}
        display='default'
        onConfirm={(txt) => {
          setOpenDate({ ...openData, bool: false, index: -1 });
          onChangeData("date", txt.toLocaleDateString(), openData.index, true);
        }}
        onCancel={() => {
          setOpenDate({ ...openData, bool: false, index: -1 });
        }}
        format='DD-MM-YYYY'
      />
      {!isVoilence && (
        <>
          <View style={styles.inputFieldContainer}>
            <TextInput value={contractor} onChangeText={(txt) => onChangeData("contractor", txt)} style={styles.inputField} placeholder={"Main Contractor"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput onChangeText={(txt) => onChangeData("project", txt)} value={project} style={styles.inputField} placeholder={"Project"} />
          </View>
        </>
      )}
      {!isDrugs && !isVoilence ? (
        <>
          <View style={styles.inputFieldContainer}>
            <TextInput
              onChangeText={(txt) => onChangeData("supervisor", txt)}
              value={supervisor}
              style={styles.inputField}
              placeholder={"Meeting Conducted By"}
            />
          </View>
          <TouchableOpacity onPress={() => setOpenDate({ ...openData, bool: true, index: -1 })} style={styles.inputFieldContainer}>
            <TextInput editable={false} style={styles.inputField} placeholder={date ? new Date(date).toLocaleDateString() : "Date"} />
          </TouchableOpacity>
          <View style={styles.inputFieldContainer}>
            <TextInput
              onChangeText={(txt) => onChangeData("comments", txt)}
              value={comments}
              multiline={true}
              numberOfLines={4}
              style={styles.inputField}
              placeholder={"Comments"}
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.inputFieldContainer}>
            <TextInput onChangeText={(txt) => onChangeData("supervisor", txt)} value={supervisor} style={styles.inputField} placeholder={"Supervisor name"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TouchableOpacity
              onPress={() => getSignature(-1, false)}
              style={[styles.inputOprativesBodyContainer, { justifyContent: "flex-start", alignItems: "flex-start", width: "100%" }]}>
              {/* <TextInput style={styles.inputField} placeholder={"Signature"} editable={false} /> */}
              {signature ? (
                <Image style={{ marginTop: 10, height: 100, width: 100, backgroundColor: "gray" }} source={{ uri: signature }} />
              ) : (
                <Text
                  style={{
                    height: 52,
                    width: "100%",
                    borderBottomWidth: 1,
                    borderBottomColor: "#96A8B2",
                    padding: 5,
                    fontSize: 12,
                    color: "#96A8B2",
                    fontFamily: "poppins-regular",
                    paddingTop: 15,
                  }}>
                  Signature
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setOpenDate({ ...openData, bool: true, index: -1 })} style={styles.inputFieldContainer}>
            <TextInput editable={false} style={styles.inputField} placeholder={date ? new Date(date).toLocaleDateString() : "Date"} />
          </TouchableOpacity>
        </>
      )}

      {isDrugs || isVoilence ? (
        <>
          <Text style={{ fontFamily: "poppins-bold", fontSize: 10 }}>I confirm that I have received the above tool box talk</Text>
          <View style={styles.tableViewContainer}>
            <View style={styles.tableHeader}>
              <View style={styles.headerProjectTitleView}>
                <Text style={styles.headerTitle}>Print Name</Text>
              </View>
              <View style={styles.headerProjectTitleView}>
                <Text style={styles.headerTitle}>Signature</Text>
              </View>
              <View style={styles.headerProjectTitleView}>
                <Text style={styles.headerTitle}>Date</Text>
              </View>
            </View>
            <View style={{ justifyContent: "flex-end", width: "100%", alignItems: "flex-end", marginBottom: 10 }}>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => {
                  if (
                    jobSummary.length > 0 &&
                    !jobSummary[jobSummary.length - 1].print &&
                    !jobSummary[jobSummary.length - 1].sign &&
                    !jobSummary[jobSummary.length - 1].date
                  ) {
                    alert("Please Enter All Value and then move to next Item Add !");
                  } else {
                    addToolBox();
                  }
                }}>
                <Image style={styles.plusBtn} source={plus} />
              </TouchableOpacity>
            </View>
            {jobSummary.map((item, index) => (
              <View style={styles.tableBody} key={index}>
                <View style={styles.inputHazrdBodyContainer}>
                  <TextInput value={item.print} onChangeText={(txt) => onChangeData("print", txt, index)} style={styles.bodyTextInput} placeholder={"Name"} />
                </View>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => getSignature(index, true)}
                  style={[styles.inputHazrdBodyContainer, { justifyContent: "flex-end", alignItems: "center" }]}>
                  {item?.sign ? (
                    <Image style={{ height: 40, width: 40, backgroundColor: "gray" }} source={{ uri: item?.sign }} />
                  ) : (
                    <Text
                      style={{
                        height: 38,
                        width: "100%",
                        borderBottomWidth: 1,
                        borderBottomColor: "#96A8B2",
                        padding: 5,
                        fontSize: 8,
                        color: "#96A8B2",
                        fontFamily: "poppins-regular",
                        paddingTop: 15,
                      }}>
                      Signature
                    </Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => setOpenDate({ ...openData, bool: true, index })} style={styles.inputHazrdBodyContainer}>
                  <TextInput
                    editable={false}
                    value={item.date ? new Date(item.date).toLocaleDateString().toString() : ""}
                    style={styles.bodyTextInput}
                    placeholder={"Date"}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </>
      ) : (
        <>
          <Text style={{ fontFamily: "poppins-bold", fontSize: 16 }}>Attendees</Text>
          <View style={styles.tableViewContainer}>
            <View style={styles.tableHeader}>
              <View style={styles.headerWitnessTitleView}>
                <Text style={styles.headerTitle}>Print</Text>
              </View>
              <View style={styles.headerWitnessTitleView}>
                <Text style={styles.headerTitle}>Signature</Text>
              </View>
            </View>
            <View style={{ justifyContent: "flex-end", width: "100%", alignItems: "flex-end", marginBottom: 10 }}>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => {
                  if (jobSummary.length > 0 && !jobSummary[jobSummary.length - 1].print && !jobSummary[jobSummary.length - 1].sign) {
                    alert("Please Enter All Value and then move to next Item Add !");
                  } else {
                    addAttendence();
                  }
                }}>
                <Image style={styles.plusBtn} source={plus} />
              </TouchableOpacity>

              {jobSummary.map((item, index) => (
                <View style={styles.tableBody} key={index}>
                  <Text style={{ width: "10%", justifyContent: "center", alignItems: "center", paddingTop: 20, fontFamily: "poppins-regular", fontSize: 10 }}>
                    {index}
                  </Text>
                  <View style={styles.inputOprativesBodyContainer}>
                    <TextInput
                      style={styles.bodyTextInput}
                      value={item.print}
                      placeholder={"Print"}
                      onChangeText={(txt) => onChangeData("print", txt, index)}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => getSignature(index)}
                    style={[styles.inputOprativesBodyContainer, { justifyContent: "flex-end", alignItems: "center" }]}>
                    <Image style={{ height: 30, width: 30, backgroundColor: "gray" }} source={{ uri: item?.sign }} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default TBTForm;
