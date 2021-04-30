import React from "react";
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
var plus = require("../../assets/authScreen/plus.png");
import styles from "../../assets/css/styles";
const TBTForm = (props) => {
  const { data, addAttendence, onChangeData, getSignature } = props;
  console.log(data);
  const { mainContractor, project, meeting, date, comments, attendess } = data;
  const [openData, setOpenDate] = React.useState(false);

  return (
    <>
      <DateTimePicker
        isVisible={openData}
        testID='dateTimePicker'
        value={date ? date : new Date()}
        mode={"datetime"}
        display='default'
        onConfirm={(txt) => {
          setOpenDate(false);
          onChangeData("date", txt);
        }}
        onCancel={() => {
          setOpenDate(false);
        }}
        format='DD-MM-YYYY'
      />
      <View style={styles.inputFieldContainer}>
        <TextInput
          value={mainContractor}
          onChangeText={(txt) => onChangeData("mainContractor", txt)}
          style={styles.inputField}
          placeholder={"Main Contractor"}
        />
      </View>
      <View style={styles.inputFieldContainer}>
        <TextInput onChangeText={(txt) => onChangeData("project", txt)} value={project} style={styles.inputField} placeholder={"Project"} />
      </View>
      <View style={styles.inputFieldContainer}>
        <TextInput onChangeText={(txt) => onChangeData("meeting", txt)} value={meeting} style={styles.inputField} placeholder={"Meeting Conducted By"} />
      </View>
      <TouchableOpacity onPress={() => setOpenDate(true)} style={styles.inputFieldContainer}>
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
          <TouchableOpacity style={styles.addBtn} onPress={() => addAttendence()}>
            <Image style={styles.plusBtn} source={plus} />
          </TouchableOpacity>

          {attendess.map((item, index) => (
            <View style={styles.tableBody} key={index}>
              <Text style={{ width: "10%", justifyContent: "center", alignItems: "center", paddingTop: 20, ontFamily: "poppins-regular", fontSize: 10 }}>
                {index}
              </Text>
              <View style={styles.inputOprativesBodyContainer}>
                <TextInput style={styles.bodyTextInput} placeholder={"Print"}  onChangeText={(txt) => onChangeData("print", txt)} />
              </View>
              <TouchableOpacity
                onPress={() => getSignature(index)}
                style={[styles.inputOprativesBodyContainer, { justifyContent: "flex-end", alignItems: "center" }]}>
                {/* <TextInput style={styles.bodyTextInput} placeholder={"Sign"} /> */}
                <Image style={{ height: 30, width: 30, backgroundColor: "gray" }} source={{ uri: item?.sign }} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </>
  );
};

export default TBTForm;
