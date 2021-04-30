import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Text, CheckBox } from "native-base";
import styles from "../../../assets/css/styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SignatureComponent from "../../../components/SignatureComponent";


var plus = require("../../../assets/authScreen/plus.png");
const PuwerInspection = (props) => {
  const { navigation, token, isScope, isSuccessMsg, isJobId } = props;
  const jobID = Math.floor(Math.random() * 100) + 1;
  const tabId = props.route.params.tabName;
  const [puwerArrayList, setPuwerArrayList] = useState([
    {
      title: "Step ladders",
      subTitle: "No. 1",
      equpment: "",
      location: "",
      inspectionName: "",
      condition: "",
      inspectionDate: new Date().toLocaleDateString(),
    },
    {
      title: "",
      subTitle: "No. 2",
      equpment: "",
      location: "",
      inspectionName: "",
      condition: "",
      inspectionDate: new Date().toLocaleDateString(),
    },
    {
      title: "",
      subTitle: "No. 3",
      equpment: "",
      location: "",
      inspectionName: "",
      condition: "",
      inspectionDate: new Date().toLocaleDateString(),
    },
    {
      title: "Ladders",
      subTitle: "No. 1",
      equpment: "",
      location: "",
      inspectionName: "",
      condition: "",
      inspectionDate: new Date().toLocaleDateString(),
    },
    {
      title: "",
      subTitle: "No. 2",
      equpment: "",
      location: "",
      inspectionName: "",
      condition: "",
      inspectionDate: new Date().toLocaleDateString(),
    },
    {
      title: "Hop Ups",
      subTitle: "No. 1",
      equpment: "",
      location: "",
      inspectionName: "",
      condition: "",
      inspectionDate: new Date().toLocaleDateString(),
    },
    {
      title: "",
      subTitle: "No. 2",
      equpment: "",
      location: "",
      inspectionName: "",
      condition: "",
      inspectionDate: new Date().toLocaleDateString(),
    },
    {
      title: "",
      subTitle: "No. 3",
      equpment: "",
      location: "",
      inspectionName: "",
      condition: "",
      inspectionDate: new Date().toLocaleDateString(),
    },
    {
      title: "",
      subTitle: "No. 4",
      equpment: "",
      location: "",
      inspectionName: "",
      condition: "",
      inspectionDate: new Date().toLocaleDateString(),
    },
    {
      title: "",
      subTitle: "No. 5",
      equpment: "",
      location: "",
      inspectionName: "",
      condition: "",
      inspectionDate: new Date().toLocaleDateString(),
    },
    {
      title: "",
      subTitle: "No. 6",
      equpment: "",
      location: "",
      inspectionName: "",
      condition: "",
      inspectionDate: new Date().toLocaleDateString(),
    },
    {
      title: "Mobile / Stair Tower",
      subTitle: "No. 1",
      equpment: "",
      location: "",
      inspectionName: "",
      condition: "",
      inspectionDate: new Date().toLocaleDateString(),
    },
    {
      title: "",
      subTitle: "No. 2",
      equpment: "",
      location: "",
      inspectionName: "",
      condition: "",
      inspectionDate: new Date().toLocaleDateString(),
    },
    {
      title: "Cherry picker / Scissor lift",
      subTitle: "No. 1",
      equpment: "",
      location: "",
      inspectionName: "",
      condition: "",
      inspectionDate: new Date().toLocaleDateString(),
    },
    {
      title: "Envirowash ES800",
      subTitle: "No. 1",
      equpment: "",
      location: "",
      inspectionName: "",
      condition: "",
      inspectionDate: new Date().toLocaleDateString(),
    },
    {
      title:
        "Spray Machines: Aristo sprayer QTECH Q-P021/ QP025, Graco GMAX II 3900 ProContractor Series ",
      subTitle: "No. 1",
      equpment: "",
      location: "",
      inspectionName: "",
      condition: "",
      inspectionDate: new Date().toLocaleDateString(),
    },
    {
      title: "Others (please specify)",
      subTitle: "Task lights, filling knives,",
      equpment: "",
      location: "",
      inspectionName: "",
      condition: "",
      inspectionDate: new Date().toLocaleDateString(),
    },
    {
      title: "",
      subTitle: "Pasting table, wallpaper scissors",
      equpment: "",
      location: "",
      inspectionName: "",
      condition: "",
      inspectionDate: new Date().toLocaleDateString(),
    },
    {
      title: "",
      subTitle: "Paint mixer, extension/sanding poles",
      equpment: "",
      location: "",
      inspectionName: "",
      condition: "",
      inspectionDate: new Date().toLocaleDateString(),
    },
    {title: "",
      subTitle: "Stripping knife, window scraper",
      equpment: "",
      location: "",
      inspectionName: "",
      condition: "",
      inspectionDate: new Date().toLocaleDateString(),
    },
    {
      title: "",
      subTitle: "Caulker, caulking gun",
      equpment: "",
      location: "",
      inspectionName: "",
      condition: "",
      inspectionDate: new Date().toLocaleDateString(),
    },
    {
      title: "",
      subTitle: "PPE",
      equpment: "",
      location: "",
      inspectionName: "",
      condition: "",
      inspectionDate: new Date().toLocaleDateString(),
    },
    {
      title: "",
      subTitle: "Skuttle kits & trays",
      equpment: "",
      location: "",
      inspectionName: "",
      condition: "",
      inspectionDate: new Date().toLocaleDateString(),
    },
  ]);
  const [date, setDate] = useState(new Date(1598051730000));
  const [dateSupervisor, setDateSupervisor] = useState(new Date());
  const [showSupervisor, setShowSupervisor] = useState(false);
  const [contractorName, setContractorName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [furtherComment, setFurtherComment] = useState("");
  const [supervisorSign, setSupervisorSign] = useState("");
  const [getSign, setGetSign] = useState(false);
  const [show, setShow] = useState({
    isVisible: false,
    index: -1,
  });
  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow({ ...show, isVisible: false, index: -1 });
    let copyArr = [...puwerArrayList];
    copyArr[show.index].inspectionDate = currentDate.toLocaleDateString();
    setPuwerArrayList(copyArr);
  };
  const showDatepicker = (index = -1) => {
    setShow({ ...show, isVisible: true, index: index });
  };
  const onDateSupervisorChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShowSupervisor(false);
    setDateSupervisor(new Date(currentDate));
  };
  const showSupervisorDatepicker = () => {
    setShowSupervisor(true);
  };
  const updateValue = (key, index, value) => {
    let preData = [...puwerArrayList];
    preData[index][key] = value;
    setPuwerArrayList(preData);
  };
  const puwerInspectionFormInsert = () =>{
    console.log("Main Contractor  :", contractorName);
    console.log("Project Name :", projectName);
    console.log("Further Comments :", furtherComment);
    console.log("Supervisor Sign :", supervisorSign);
    console.log("Supervisor Date :", dateSupervisor.toLocaleDateString());
    console.log("Array Data :", puwerArrayList);
  }
  return (
    <View style={styles.mainContainer}>
      <DateTimePickerModal
        isVisible={show.isVisible}
        date={date ? date : new Date()}
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
        onConfirm={(date) => onDateSupervisorChange(date)}
        onCancel={() => setShowSupervisor({ isVisible: false, index: -1 })}
        cancelTextIOS="Cancel"
        confirmTextIOS="Confirm"
      />
      {getSign ? (
        <SignatureComponent
          returnImage={(uri) => {
            setSupervisorSign(uri);
            setGetSign(false);
          }}
        />
      ) : (
        <>
      <View
        style={{
          paddingTop: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.titleText}>
          PUWER Inspection Checklist / Register
        </Text>
      </View>
      <ScrollView>
        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "poppins-regular",
              paddingTop: 10,
              paddingBottom: 20,
            }}
          >
            <Text style={{ fontSize: 12, fontFamily: "poppins-bold" }}>
              The Provision and Use of Work Regulations 1998 (PUWER)
            </Text>
            has specific requirements to help ensure that all work equipment is
            suitable and safe for its intended use. More specifically,
            Regulation 6 of PUWER requires responsible people and operators of
            the equipment to inspect and maintain all such equipment in order to
            identify and rectify any potential issues before any harm is caused.
          </Text>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Main Contractor"}
              value={contractorName}
              onChangeText={(e) => setContractorName(e)}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Project"}
              value={projectName}
              onChangeText={(e) => setProjectName(e)}
            />
          </View>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "poppins-regular",
              paddingTop: 10,
              paddingBottom: 20,
            }}
          >
            When carrying out a PUWER Inspection, the following questions are to
            be considered:
          </Text>
          <View>
            <Text style={{ fontSize: 12, fontFamily: "poppins-regular" }}>
              Is the equipment designed for its intended use?
            </Text>
            <Text style={{ fontSize: 10, fontFamily: "poppins-regular" }}>
              Is their other equipment which is more suitable for the intended
              use?
            </Text>
            <Text style={{ fontSize: 10, fontFamily: "poppins-regular" }}>
              Is the equipment free from defects (e.g. frayed cables, not
              turning on correctly, burning smells, damaged casing, missing
              parts/guards etc.)?
            </Text>
            <Text style={{ fontSize: 10, fontFamily: "poppins-regular" }}>
              Are safety guards in place, well maintained and operational?
            </Text>
            <Text style={{ fontSize: 10, fontFamily: "poppins-regular" }}>
              Are the equipment Inspected and Tagged 
            </Text>
            <Text style={{ fontSize: 10, fontFamily: "poppins-regular" }}>
              Do all the control work correctly, including any emergency stop
              buttons?
            </Text>
            <Text style={{ fontSize: 10, fontFamily: "poppins-regular" }}>
              Have operators been provided with suitable and sufficient training
              in the use of the specific work equipment?
            </Text>
            <Text style={{ fontSize: 10, fontFamily: "poppins-regular" }}>
              Does the operator have the necessary PASMA/IPAF certificate to
              operate equipment?
            </Text>
            <Text style={{ fontSize: 10, fontFamily: "poppins-regular" }}>
              Does the operators have suitable and applicable PPE?
            </Text>
            <Text style={{ fontSize: 10, fontFamily: "poppins-regular" }}>
              Are there guards or other measures in place to prevent injuries
              from ejection, entanglement, collapse, overheating, falling items,
              or overturning?
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontFamily: "poppins-regular",
                paddingBottom: 20,
              }}
            >
              Are start and stop features clear, easy to use, and functioning
              correctly? Including the emergency stop?
            </Text>
            <View style={styles.tableViewContainer}>
              <View style={styles.tableHeader}>
                <View style={styles.headerInspectionTitleView}>
                  <Text style={styles.headerTitle}>Equipments</Text>
                </View>
                <View style={styles.headerInspectionTitleView}>
                  <Text style={styles.headerTitle}>Equipment Location</Text>
                </View>
                <View style={styles.headerInspectionTitleView}>
                  <Text style={styles.headerTitle}>
                    Inspected by: (Print Name)
                  </Text>
                </View>
                <View style={styles.headerInspectionTitleView}>
                  <Text style={styles.headerTitle}>
                    Equipment in good working condition Y/N/N/A{" "}
                  </Text>
                </View>
                <View style={styles.headerInspectionTitleView}>
                  <Text style={styles.headerTitle}>Inspection date</Text>
                </View>
              </View>
              {puwerArrayList.map((item, index) =>
                item.title !="" ? (
                  <View key={index}>
                    <View>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "poppins-bold",
                          paddingTop: 10,
                          paddingBottom: 20,
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={{ fontSize: 12, fontFamily: "poppins-regular" }}
                      >
                        {item.subTitle}
                      </Text>
                    </View>
                    <View style={styles.tableBody}>
                      <View style={styles.inputInspectionBodyContainer}>
                        <TextInput
                          style={styles.bodyTextInput}
                          placeholder={"Equipments"}
                          onChangeText={(txt) =>
                            updateValue("equpment", index, txt)
                          }
                          value={item.equpment}
                        />
                      </View>
                      <View style={styles.inputInspectionBodyContainer}>
                        <TextInput
                          style={styles.bodyTextInput}
                          placeholder={"Location"}
                          onChangeText={(txt) =>
                            updateValue("location", index, txt)
                          }
                          value={item.location}
                        />
                      </View>
                      <View style={styles.inputInspectionBodyContainer}>
                        <TextInput
                          style={styles.bodyTextInput}
                          placeholder={"Inspection"}
                          onChangeText={(txt) =>
                            updateValue("inspectionName", index, txt)
                          }
                          value={item.inspectionName}
                        />
                      </View>
                      <View style={styles.inputInspectionBodyContainer}>
                        <TextInput
                          style={styles.bodyTextInput}
                          placeholder={"N/A"}
                          onChangeText={(txt) =>
                            updateValue("condition", index, txt)
                          }
                          value={item.condition}
                        />
                      </View>
                      <View style={styles.inputInspectionBodyContainer}>
                        <Text
                          onPress={() => showDatepicker(index)}
                          style={{
                            width: "90%",

                            paddingTop: 16,
                            fontSize: 8,
                            color: "#96A8B2",
                            fontFamily: "poppins-regular",
                            borderBottomWidth: 1,
                            borderBottomColor: "#96A8B2",
                            padding: 5,
                            color: "#96A8B2",
                          }}
                        >
                          {new Date(item.inspectionDate).toLocaleDateString()}
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View key={index}>
                    <View>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "poppins-regular",
                          paddingTop: 20,
                        }}
                      >
                        {item.subTitle}
                      </Text>
                    </View>
                    <View style={styles.tableBody}>
                      <View style={styles.inputInspectionBodyContainer}>
                        <TextInput
                          style={styles.bodyTextInput}
                          placeholder={"Equipments"}
                          onChangeText={(txt) =>
                            updateValue("equpment", index, txt)
                          }
                          value={item.equpment}
                        />
                      </View>
                      <View style={styles.inputInspectionBodyContainer}>
                        <TextInput
                          style={styles.bodyTextInput}
                          placeholder={"Location"}
                          onChangeText={(txt) =>
                            updateValue("location", index, txt)
                          }
                          value={item.location}
                        />
                      </View>
                      <View style={styles.inputInspectionBodyContainer}>
                        <TextInput
                          style={styles.bodyTextInput}
                          placeholder={"Inspection"}
                          onChangeText={(txt) =>
                            updateValue("inspectionName", index, txt)
                          }
                          value={item.inspectionName}
                        />
                      </View>
                      <View style={styles.inputInspectionBodyContainer}>
                        <TextInput
                          style={styles.bodyTextInput}
                          placeholder={"N/A"}
                          onChangeText={(txt) =>
                            updateValue("condition", index, txt)
                          }
                          value={item.condition}
                        />
                      </View>
                      <View style={styles.inputInspectionBodyContainer}>
                        <Text
                          onPress={() => showDatepicker(index)}
                          style={{
                            width: "90%",

                            paddingTop: 16,
                            fontSize: 8,
                            color: "#96A8B2",
                            fontFamily: "poppins-regular",
                            borderBottomWidth: 1,
                            borderBottomColor: "#96A8B2",
                            padding: 5,
                            color: "#96A8B2",
                          }}
                        >
                          {new Date(item.inspectionDate).toLocaleDateString()}
                        </Text>
                      </View>
                    </View>
                  </View>
                )
              )}
              <View style={styles.inputFieldContainer}>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  style={styles.inputField}
                  placeholder={
                    "Further comments or action required (please state)"
                  }
                  value={furtherComment}
                  onChangeText={(e) => setFurtherComment(e)}
                />
              </View>
              <View style={styles.inputFieldContainer}>
              <TouchableOpacity onPress={() => setGetSign(true)} style={styles.inputFieldContainer}>
                {supervisorSign ?
                <Image style={{ marginTop:20, height: 100, width: 100, backgroundColor: "gray" }} source={{ uri: supervisorSign }} />
                :<Text style={{height: 52,
                  width: "100%",
                  borderBottomWidth: 1,
                  borderBottomColor: "#96A8B2",
                  padding: 5,
                  fontSize: 12,
                  color: "#96A8B2",
                  fontFamily: "poppins-regular",paddingTop:15}}>Supervisor Sign / Print</Text>
                }
              </TouchableOpacity>
              </View>
              <View style={styles.inputFieldContainer}>
                <Text
                  onPress={() => showSupervisorDatepicker()}
                  style={{
                    width: "90%",

                    paddingTop: 16,
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
              onPress={() => puwerInspectionFormInsert()}
            >
              <Text style={styles.commonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      </>
      )}
    </View>
  );
};
export default PuwerInspection;
