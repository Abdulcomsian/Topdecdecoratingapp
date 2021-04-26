import React, { useState } from "react";
import { View, TextInput, ScrollView,TouchableOpacity } from "react-native";
import { Text } from "native-base";
import styles from "../../../assets/css/styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const HouseKepping = (props) => {
    const { navigation, token, isSuccessMsg, isSuccess } = props;
  
  const [checkListArray, setCheckListArray] = useState([
    {
      title: "Are all empty paint container/s removed from the unit/s.",
      date: new Date().toLocaleDateString(),
      block:"",
      yes:"",
      no:"",
      other:"",
      comments:""
    },
    {
      title:
        "Are all empty paint cans / leftovers collected from site by the paint supplier? ",
      date: new Date().toLocaleDateString(),
      block:"",
      yes:"",
      no:"",
      other:"",
      comments:""
    },
    {
      title:
        "Are all protection, abrasives, masking tape and other sundries or general waste cleared away by the decorator and placed in the appropriate site bin. ",
      date: new Date().toLocaleDateString(),
       block:"",
      yes:"",
      no:"",
      other:"",
      comments:""
    },
    {
      title:
        "Proper waste bins for general waste, recyclable waste, hazardous waste, are provided to facilitate responsible disposal.",
      date: new Date().toLocaleDateString(),
       block:"",
      yes:"",
      no:"",
      other:"",
      comments:""
    },
    {
      title:
        "Are all working at height equipments i.e. hop ups, ladders, stepladders etc inspected and tagged.",
      date: new Date().toLocaleDateString(),
       block:"",
      yes:"",
      no:"",
      other:"",
      comments:""
    },
    {
      title:
        "Are all working at height equipment packed away in a secure storage.",
      date: new Date().toLocaleDateString(),
       block:"",
      yes:"",
      no:"",
      other:"",
      comments:""
    },
    {
      title: "Storage areas are clean, tidy and organised.",
      date: new Date().toLocaleDateString(),
       block:"",
      yes:"",
      no:"",
      other:"",
      comments:""
    },
    {
      title: "Work area is clean, tidy, and clutter-free.",
      date: new Date().toLocaleDateString(),
       block:"",
      yes:"",
      no:"",
      other:"",
      comments:""
    },
    {
      title: "There are no unnecessary items in the work area.",
      date: new Date().toLocaleDateString(),
       block:"",
      yes:"",
      no:"",
      other:"",
      comments:""
    },
    {
      title: "Aisles, walkways, stairways, and exits are unobstructed.",
      date: new Date().toLocaleDateString(),
       block:"",
      yes:"",
      no:"",
      other:"",
      comments:""
    },
    {
      title:
        "Floors are dry and free from accumulated dust, broken glass and leaks or spills (e.g., oil or water).",
      date: new Date().toLocaleDateString(),
       block:"",
      yes:"",
      no:"",
      other:"",
      comments:""
    },
    {
      title:
        "Warning signs are in good condition and can be clearly seen from afar.",
      date: new Date().toLocaleDateString(),
       block:"",
      yes:"",
      no:"",
      other:"",
      comments:""
    },
    {
      title: "Are all Electrical equipment PAT Tested and recorded.",
      date: new Date().toLocaleDateString(),
       block:"",
      yes:"",
      no:"",
      other:"",
      comments:""
    },
    {
      title:
        "Task light are clean and provide adequate illumination for working.",
      date: new Date().toLocaleDateString(),
       block:"",
      yes:"",
      no:"",
      other:"",
      comments:""
    },
    {
      title:
        "ES800 Paint wash out system installed and in good working manner.",
      date: new Date().toLocaleDateString(),
       block:"",
      yes:"",
      no:"",
      other:"",
      comments:""
    },
    {
      title:
        "Have the decorator’s tools been checked to ensure they are in good working order i.e. brushers, rollers etc?",
      date: new Date().toLocaleDateString(),
       block:"",
      yes:"",
      no:"",
      other:"",
      comments:""
    },
    {
      title:
        "Has adequate brush storage being provided i.e. Brush mate Trade storage boxes and brush mate fluid.",
      date: new Date().toLocaleDateString(),
       block:"",
      yes:"",
      no:"",
      other:"",
      comments:""
    },
    {
      title:
        "Are all the material in the storage container labelled correctly and a COSHH datasheet available.",
      date: new Date().toLocaleDateString(),
       block:"",
      yes:"",
      no:"",
      other:"",
      comments:""
    },
    {
      title: "Are all flammable materials placed in the Flamstore?",
      date: new Date().toLocaleDateString(),
       block:"",
      yes:"",
      no:"",
      other:"",
      comments:""
    },
  ]);
  const [dateCheck, setDateCheck] = useState(new Date(1598051730000));
  const [dateSupervisor, setDateSupervisor] = useState(new Date());
  const [showSupervisor, setShowSupervisor] = useState(false);
  const [constructorName, setConstructorName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [weekCommencing, setWeekCommencing] = useState("");
  const [supervisorSign, setSupervisorSign] = useState("");
  const [show, setShow] = useState({
    isVisible: false,
    index: -1,
  });
  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow({ ...show, isVisible: false, index: -1 });
    let copyArr = [...checkListArray];
    copyArr[show.index].date = currentDate.toLocaleDateString();
    setCheckListArray(copyArr);
  };
  const showCheckDatepicker = (index = -1) => {
    setShow({ ...show, isVisible: true, index: index });
  };
  const onChangeDateSupervisor = (selectedDate) => {
    const currentDate = selectedDate;
    setShowSupervisor(false);
    setDateSupervisor(new Date(currentDate));
  };
  const showSupervisorDatepicker = () => {
    setShowSupervisor(true);
  };
  const updateSignValue = (key, index, value) => {
    let preData = [...checkListArray];
    preData[index][key] = value;
    setCheckListArray(preData);
  };
  const houseKeppingForm = () =>{
      console.log("Main Contractor  :", constructorName);
      console.log("Project Name :", projectName);
      console.log("Week Commencing :", weekCommencing);
      console.log("Check List Attay :", checkListArray);
      console.log("Supervisor Sign :", supervisorSign);
      console.log("Supervisor Date :", dateSupervisor.toLocaleDateString());
    //   console.log("Job ID :", jobID);
    //   console.log("Tab Name :", tabId);
      console.log("Token :", token);
  }
  return (
    <View style={styles.mainContainer}>
      <DateTimePickerModal
        isVisible={show.isVisible}
        date={dateCheck ? dateCheck : new Date()}
        mode={"date"}
        is24Hour={true}
        display="default"
        onConfirm={(date) => onChange(date)}
        onCancel={() => setShow({ isVisible: false, index: -1 })}
        cancelTextIOS="Cancel"
        confirmTextIOS="Confirm"
      />
      <DateTimePickerModal
        isVisible={showSupervisor}
        date={dateSupervisor ? dateSupervisor : new Date()}
        mode={"date"}
        is24Hour={true}
        display="default"
        onConfirm={(date) => onChangeDateSupervisor(date)}
        onCancel={() => setShow(false)}
        cancelTextIOS="Cancel"
        confirmTextIOS="Confirm"
      />
      <View
        style={{
          paddingTop: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.titleText}>House Keeping Checklist</Text>
      </View>
      <ScrollView>
        <View style={styles.formCodnatiner}>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Main Contractor"}
              value={constructorName}
                onChangeText={(e) => setConstructorName(e)}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput value={projectName}
                onChangeText={(e) => setProjectName(e)} style={styles.inputField} placeholder={"Project"} />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Week Commencing"}
              value={weekCommencing}
                onChangeText={(e) => setWeekCommencing(e)}
            />
          </View>
          <View style={styles.tableCheckListViewContainer}>
            <View style={styles.tableHeader}>
              <View style={styles.headerCheckListTitleView}>
                <Text style={styles.headerTitle}>ITEMS</Text>
              </View>
              <View style={styles.headerCheckListTitleView}>
                <Text style={styles.headerTitle}>Block</Text>
              </View>
              <View style={styles.headerCheckListTitleView}>
                <Text style={styles.headerTitle}>Yes</Text>
              </View>
              <View style={styles.headerCheckListTitleView}>
                <Text style={styles.headerTitle}>No</Text>
              </View>
              <View style={styles.headerCheckListTitleView}>
                <Text style={styles.headerTitle}>N/a</Text>
              </View>
              <View style={styles.headerCheckListTitleView}>
                <Text style={styles.headerTitle}>Date/s of check</Text>
              </View>
              <View style={styles.headerCheckListTitleView}>
                <Text style={styles.headerTitle}>Comments</Text>
              </View>
            </View>
            <View>
              {checkListArray.map((item, index) => (
                <View key={index}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#000",
                      fontFamily: "poppins-regular",
                      padding: 5,
                    }}
                  >
                    {item.title}
                  </Text>
                  <View style={styles.tableCheckListBody}>
                    <View style={styles.inputHarmFullBodyContainer}>
                      <TextInput
                        style={styles.bodyTextInput}
                        placeholder={"Block"}
                        value={item.block}
                                onChangeText={(txt) =>
                                updateSignValue("block", index, txt)
                                }
                      />
                    </View>
                    <View style={styles.inputHarmFullBodyContainer}>
                      <TextInput
                        style={styles.bodyTextInput}
                        placeholder={"Yes"}
                        value={item.yes}
                                onChangeText={(txt) =>
                                updateSignValue("yes", index, txt)
                                }
                      />
                    </View>
                    <View style={styles.inputHarmFullBodyContainer}>
                      <TextInput
                        style={styles.bodyTextInput}
                        placeholder={"No"}
                        value={item.no}
                                onChangeText={(txt) =>
                                updateSignValue("no", index, txt)
                                }
                      />
                    </View>
                    <View style={styles.inputHarmFullBodyContainer}>
                      <TextInput
                        style={styles.bodyTextInput}
                        placeholder={"N/A"}
                        value={item.other}
                        onChangeText={(txt) =>
                        updateSignValue("other", index, txt)
                        }
                      />
                    </View>
                    <View style={styles.inputHarmFullBodyContainer}>
                      <Text
                        onPress={() => showCheckDatepicker(index)}
                        style={{
                          width: "90%",
                          paddingTop: 17,
                          fontSize: 8,
                          color: "#96A8B2",
                          fontFamily: "poppins-regular",
                          borderBottomWidth: 1,
                          borderBottomColor: "#96A8B2",
                          padding: 5,
                          color: "#96A8B2",
                        }}
                      >
                        {new Date(item.date).toLocaleDateString()}
                      </Text>
                    </View>
                    <View style={styles.inputHarmFullBodyContainer}>
                      <TextInput
                        style={styles.bodyTextInput}
                        placeholder={"Comments"}
                        value={item.comments}
                        onChangeText={(txt) =>
                        updateSignValue("comments", index, txt)
                        }
                      />
                    </View>
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.inputFieldContainer}>
              <TextInput
                style={styles.inputField}
                placeholder={"Supervisor (Print & Sign)"}
                value={supervisorSign}
                onChangeText={(e) => setSupervisorSign(e)}
              />
            </View>
            <View style={styles.inputFieldContainer}>
              <Text
                onPress={() => showSupervisorDatepicker()}
                style={{
                  width: "90%",
                  paddingTop: 17,
                  fontSize: 12,
                  color: "#96A8B2",
                  fontFamily: "poppins-regular",
                  borderBottomWidth: 1,
                  borderBottomColor: "#96A8B2",
                  padding: 5,
                  color: "#96A8B2",
                }}
              >
                {new Date(dateSupervisor).toLocaleDateString()}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "poppins-bold",
                paddingTop: 10,
                paddingBottom: 20,
                textAlign: "center",
              }}
            >
              Once completed, please file a copy in the Site Folder and send a
              copy to our Head Office.
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#000",
              width: "100%",
              height: 2,
              marginBottom:20
            }}
          ></View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.commonBtn}
              onPress={() => houseKeppingForm()}
            >
              <Text style={styles.commonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default HouseKepping;
