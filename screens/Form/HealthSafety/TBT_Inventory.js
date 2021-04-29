import React, { useState } from "react";
import { View, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { CheckBox, Text } from "native-base";
import styles from "../../../assets/css/styles";
import { color } from "react-native-reanimated";

var mainImage = require("../../../assets/authScreen/Accurate-daywork-sheet-docx.png");

const TBTINVENTORY = (props) => {
  const [inventoryArray, setInventoryArray] = useState([
    { title: "Hop Ups" },
    { title: "Step Ladders" },
    { title: "Ladders" },
    { title: "Staircase Podium" },
    { title: "Mobile Towers" },
  ]);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageView}>
        <Image source={mainImage} style={styles.bannerImage} />
      </View>
      <View style={{ paddingTop: 30, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.titleText}>Working at Height Equipment - Inventory Control</Text>
      </View>
      <ScrollView>
        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Main Contractor"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Project"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Supervisor Print & Sign"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} placeholder={"Date"} />
          </View>

          <View style={styles.tableViewContainer}>
            <View style={styles.tableHeader}>
              <View style={styles.headerEquipmentTitleView}>
                <Text style={styles.headerTitle}>Equipments</Text>
              </View>
              <View style={styles.headerEquipmentTitleView}>
                <Text style={styles.headerTitle}>Inspection Date</Text>
              </View>
              <View style={styles.headerEquipmentTitleView}>
                <Text style={styles.headerTitle}>Tagged/ Labelled</Text>
              </View>
              <View style={styles.headerEquipmentTitleView}>
                <Text style={styles.headerTitle}>Qty. in Stock</Text>
              </View>
              <View style={styles.headerEquipmentTitleView}>
                <Text style={styles.headerTitle}>Location</Text>
              </View>
              <View style={styles.headerEquipmentTitleView}>
                <Text style={styles.headerTitle}>Inspection due date</Text>
              </View>
              <View style={styles.headerEquipmentTitleView}>
                <Text style={styles.headerTitle}>In good condition</Text>
              </View>
              <View style={styles.headerEquipmentTitleView}>
                <Text style={styles.headerTitle}>Needs repair/replaced</Text>
              </View>
              <View style={styles.headerEquipmentTitleView}>
                <Text style={styles.headerTitle}>Comments</Text>
              </View>
            </View>
            {inventoryArray.map((item, index) => (
              <View key={index}>
                <Text style={{ fontFamily: "poppins-bold", fontSize: 10, paddingTop: 20 }}>{item.title}</Text>
                <View style={styles.tableBody}>
                  <View style={styles.inputInventoryBodyContainer}>
                    <TextInput style={styles.bodyTextInput} placeholder={"Date"} />
                  </View>
                  <View style={styles.inputInventoryBodyContainer}>
                    <TextInput style={styles.bodyTextInput} placeholder={"Tagged"} />
                  </View>
                  <View style={styles.inputInventoryBodyContainer}>
                    <TextInput style={styles.bodyTextInput} placeholder={"Qty."} />
                  </View>
                  <View style={styles.inputInventoryBodyContainer}>
                    <TextInput style={styles.bodyTextInput} placeholder={"Location"} />
                  </View>
                  <View style={styles.inputInventoryBodyContainer}>
                    <TextInput style={styles.bodyTextInput} placeholder={"Due Date"} />
                  </View>
                  <View style={styles.inputInventoryBodyContainer}>
                    <TextInput style={styles.bodyTextInput} placeholder={"Condition"} />
                  </View>
                  <View style={styles.inputInventoryBodyContainer}>
                    <TextInput style={styles.bodyTextInput} placeholder={"Replaced"} />
                  </View>
                  <View style={styles.inputInventoryBodyContainer}>
                    <TextInput multiline={true} numberOfLines={4} style={styles.bodyTextInput} placeholder={"Comments"} />
                  </View>
                </View>
              </View>
            ))}
          </View>
          <Text style={{ fontFamily: "poppins-bold", fontSize: 10, paddingTop: 20, textAlign: "center" }}>
            Once completed, please file a copy in the Site Folder and send a copy to our Office. Also, please give a copy to the Site Staff.
          </Text>
          <View style={styles.footerView}>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
              Address: 2,<Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}> Green Lane, Penge, London SE20 7JA</Text>
            </Text>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
              T: <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}> 0208 676 060</Text>
            </Text>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
              F: <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}> 0208 676 0671</Text>
            </Text>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
              M: <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}> 07737 632206</Text>
            </Text>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
              E: <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}> info@topdecdecorating.com</Text>
            </Text>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
              W: <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}> www.topdecdecorating.com</Text>
            </Text>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
              VAT Registration Number: <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}> 203 474 927</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default TBTINVENTORY;
