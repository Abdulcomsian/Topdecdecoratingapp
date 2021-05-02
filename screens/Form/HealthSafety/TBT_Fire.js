import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { CheckBox, Text } from "native-base";
import styles from "../../../assets/css/styles";
import { color } from "react-native-reanimated";
import TBTForm from "../../../components/common/TBTForm";
import SignatureComponent from "../../../components/SignatureComponent";
import { connect } from "react-redux";
import { insertTbtFire } from "../../../Redux/action/auth/authActionTypes";
import { updateHealthReport } from "../../../Redux/action/summary/Summary";

var mainImage = require("../../../assets/authScreen/Accurate-daywork-sheet-docx.png");
var plus = require("../../../assets/authScreen/plus.png");
const TBTFire = (props) => {
  const { navigation, token, isOnSite, isSuccessMsg, isJobId } = props;
  const jobID = Math.floor(Math.random() * 100) + 1;
  const tabId = props.route.params.tabName;
  const [coshhArray, setCoshhArray] = useState([
    {
      mainTitle: "Fire Prevention",
      title:
        "•	The Material Safety Datasheets/COSHH assessments will provide you with the relevant information on the product to be used.",
    },
    {
      title:
        "•	Dispense flammable liquids only in areas free from sparks, flames, and other sources of ignition.",
    },
    {
      title:
        "•	Make sure portable fire extinguishers remain fully accessible at all times when handling flammable substances.",
    },
    {
      title:
        "•	Ensure heating equipment is not covered with clothing, paper or rubbish.",
    },
    {
      title:
        "•	Maintain good housekeeping to minimize the accumulation of oily rags or other rubbish",
    },
    {
      title:
        "•	Maintain good housekeeping to minimize the accumulation of oily rags or other rubbish",
    },
    { title: "•	Do not smoke in prohibited areas" },
    {
      title:
        "•	Use proper sealed containers for flammable liquids, not open tins or buckets",
    },
    { title: "•	Use recommended 110v as per the Method statement." },
    {
      title:
        "•	Keep all fire doors closed. Do not prop them open with door stops or extinguishers",
    },
    {
      title:
        "•	Ensure you are familiar with your emergency procedure for fire safety (through site induction).",
    },
    {
      title:
        "•	Consider potential trespassers. Do not give them a source of fuel or ignition to start a fire (Lock away flammable substances in flam store/container).",
    },
    {
      title:
        "•	If you identify an electrical appliance which has not been tested or has expired, remove it from use and report it to your supervisor.",
    },
    {
      mainTitle: "Fire Fighting",
      title:
        "All fire extinguishers are red but have panels of different colours to indicate their contents: Label Colour Content:",
    },
    {
      title: "Red - Water – Used on Wood and paper",
      bgcolor: "red",
      color: "#fff",
    },
    { title: "Cream – Foam- Used on Flammable liquid ", bgcolor: "cream" },
    {
      title:
        "Blue - Dry powder - General use (everything) except cooking oil fire & metal fire",
      bgcolor: "blue",
      color: "#fff",
    },
    {
      title: "Black - CO2 (Carbon Dioxide) – used on Electricals fires.",
      bgcolor: "black",
      color: "#fff",
    },
    {
      title: "Yellow – Wet Chemical- Used on wood, paper and cooking oil fires",
      bgcolor: "yellow",
      color: "#fff",
    },
    { title: "•	NEVER use WATER on ELECTRICAL or FLAMMABLE LIQUID FIRES" },
    { title: "•	NEVER use FOAM on ELECTRICAL FIRES" },
    {
      title:
        "•	REMOVE USED or PARTLY USED extinguishers from service and report them to your supervisor so they can be replaced promptly. ",
    },
    { title: "•	NEVER use any of the above fire extinguisher on METAL FIRES." },
    {
      mainTitle: "Points to Remember:",
      title:
        "•	Always follow instruction given during site induction training regarding fire-safety.",
    },
    {
      title:
        "•	Follow fire safety instruction on Safety datasheets and COSHH Assessments.",
    },
  ]);

  const [openSign, setOpenSign] = useState({
    index: -1,
    bool: false,
  });
  const [data, setData] = useState({
    contractor: "",
    project: "",
    supervisor: "",
    date: null,
    comments: "",
    jobSummary: [],
  });
  const tbtFormInsert = async () => {
    try{
      if(data!=""){
        await props.creatTbtFireHandler({...data,task_id:jobID,tab_id:tabId},token,props.route.params?.index)
        props.updateHealthReport(props?.route?.params?.index);
        props.navigation.pop();
        alert("TBT FIRE Insert SuccessFully !");
      } 
      else{
        alert("Please Insert All Fields CareFully !");
      }
    } catch(err){
      alert(err.message)
    }
  };
  return (
    <View style={styles.mainContainer}>
      {openSign.bool ? (
        <SignatureComponent
          returnImage={(uri) => {
            let copydata = [...data.jobSummary];
            copydata[openSign.index].sign = uri;
            setData({ ...data, jobSummary: [...copydata] });
            setOpenSign({ bool: false, index: -1 });
          }}
        />
      ) : (
        <>
          <View style={styles.imageView}>
            <Image source={mainImage} style={styles.bannerImage} />
          </View>
          <View
            style={{
              paddingTop: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.titleText}>Toolbox Talk – Fire Safety</Text>
          </View>
          <ScrollView>
            <View style={{ paddingLeft: 20, paddingRight: 20 }}>
              <View style={{ marginTop: 20 }}>
                {coshhArray.map((item, index) =>
                  item.mainTitle ? (
                    <View key={index}>
                      <Text
                        style={{ fontFamily: "poppins-bold", fontSize: 16 }}
                      >
                        {item.mainTitle}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "poppins-regular",
                          fontSize: 12,
                          backgroundColor: item.bgcolor,
                        }}
                      >
                        {item.title}
                      </Text>
                    </View>
                  ) : (
                    <View key={index}>
                      <Text
                        style={{
                          fontFamily: "poppins-regular",
                          fontSize: 12,
                          backgroundColor: item.bgcolor,
                        }}
                      >
                        {item.title}
                      </Text>
                    </View>
                  )
                )}
              </View>
              <TBTForm
                data={data}
                getSignature={(index) =>
                  setOpenSign({ ...openSign, bool: true, index })
                }
                addAttendence={() =>
                  setData({
                    ...data,
                    jobSummary: [...data.jobSummary, { print: "", sign: "" }],
                  })
                }
                onChangeData={(key, value, index = -1) => {
                  if (index >= 0) {
                    let copyAttendance = [...data.jobSummary];
                    copyAttendance[index].print = value;
                    setData({ ...data, jobSummary: [...copyAttendance] });
                  } else {
                    setData({ ...data, [key]: value });
                  }
                }}
              />
              <Text
                style={{
                  fontFamily: "poppins-bold",
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                Once completed, please file a copy in the Site Folder and send a
                copy to our Head Office and give a copy to the site staff.
              </Text>
              <View style={styles.footerView}>
                <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                  Address: 2,
                  <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}>
                    {" "}
                    Green Lane, Penge, London SE20 7JA
                  </Text>
                </Text>
                <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                  T:{" "}
                  <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}>
                    {" "}
                    0208 676 060
                  </Text>
                </Text>
                <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                  F:{" "}
                  <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}>
                    {" "}
                    0208 676 0671
                  </Text>
                </Text>
                <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                  M:{" "}
                  <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}>
                    {" "}
                    07737 632206
                  </Text>
                </Text>
                <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                  E:{" "}
                  <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}>
                    {" "}
                    info@topdecdecorating.com
                  </Text>
                </Text>
                <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                  W:{" "}
                  <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}>
                    {" "}
                    www.topdecdecorating.com
                  </Text>
                </Text>
                <Text style={{ fontFamily: "poppins-bold", fontSize: 12 }}>
                  VAT Registration Number:{" "}
                  <Text style={{ fontFamily: "poppins-regular", fontSize: 10 }}>
                    {" "}
                    203 474 927
                  </Text>
                </Text>
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.commonBtn}
                  onPress={() => tbtFormInsert()}
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
const mapStateToProps = (state) => ({
  token: state.auth.token,
  isOnSite: state.auth.isOnSite,
  isSuccessMsg: state.auth.isSuccessMsg,
  isJobId: state.auth.isJobId,
});
const mapDispatchToProps = (dispatch) => ({
  creatTbtFireHandler: (
    data,
    token,
    index
  ) =>
    dispatch(
      insertTbtFire(
        data,
        token,
        index
      )
    ),
    updateHealthReport: (index) => dispatch(updateHealthReport(index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TBTFire);
