import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  CheckBox,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Text } from "native-base";
import { TextInput } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { updateSupervisor } from "../../Redux/action/auth/authActionTypes";
import axios from "axios";

var rightArrow = require("../../assets/authScreen/right.png");
const SupervisorDetails = (props) => {
  const { navigation, token, isUpdate, isUpdateMsg } = props;
  const { id, userData } = props.route.params;
  const [role, setRole] = useState(props.route.params.role);
  const [password, setPassword] = useState("");
  const [supervisorData, setSupervisorData] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState({
    approved: true,
    disApproved: false,
  });
  const userID = id;
  const LoginToken = token;
 
 
  useEffect(() => {
    try {
        if(role){
            const body = { id };
            (async () => {
              setLoading(true);
              const request = await axios(
                "https://airtimetesting.airtime4u.com/public/tajs/public/api/admin/search/supervisor",
                {
                  method: "POST",
                  headers: {
                    authorization: "Bearer " + token,
                  },
                  data: body,
                }
              );
              const response = await request.data;
              console.log(response);
              if (response.success == true) {
                console.log(response);
                setSupervisorData(response.data.user);
                setLoading(false);
              } else {
                setLoading(false);
                setErrorMsg(request.message);
              }
            })();
        }
      else{
          console.log("else !")
          setSupervisorData(userData)
      }
      
    } catch (err) {
      console.log("Error");
      console.log(err.message);
      setLoading(false);
    }
  }, []);
  console.log("Supervisor Data :", supervisorData);
  const checkedValue = (value) =>{
      if(value=="approved"){
          setStatus("1")
          let preData = [...supervisorData];
          preData[0]["status"] = "1";
          setSupervisorData(preData);
      }
      else if(value=="disapproved"){
          setStatus("0")
          let preData = [...supervisorData];
          preData[0]["status"] = "0";
          setSupervisorData(preData);
      }
  }
  const updateSupervisor = () => {
    try {
      props.updateSupervisorHandler(
        supervisorData[0].id,
        supervisorData[0].email,
        supervisorData[0].name,
        supervisorData[0].number,
        status,
        token
      );
    } catch (err) {
      alert(err.message);
    }
};
  const updateValue = (key, index, value) => {
    let preData = [...supervisorData];
    preData[index][key] = value;
    setSupervisorData(preData);
  };
  useEffect (() =>{
      if(isUpdate){
          if(isUpdateMsg){
              alert(isUpdateMsg)
              props.navigation.pop()
          }
      }
      else
     {
      if(isUpdateMsg){
          alert(isUpdateMsg)
      }
     }
  },[isUpdate,isUpdateMsg])
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color="#1073AC" size="small" />
      </View>
    );
  } else {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.refText}>Date: 12-2-2021</Text>
          <Text style={styles.refText}>Ref id: 10099499</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Supervisor Detail</Text>
        </View>
        {/* <ScrollView contentContainerStyle={{width:'100%'}}>
              
                        <View style={styles.formConatiner}>
                            <View style={styles.inputFieldContainer}>
                                <Text style={styles.decoratorTitle}>Name:</Text>
                                <TextInput 
                                style={styles.detailItemInput}
                                value={supervisorData.name}
                                onChangeText={(e)=>handleSupervisorName(e)}
                                />
                            </View>
                            <View style={styles.inputFieldContainer}>
                                <Text style={styles.decoratorTitle}>Email:</Text>
                                <Text style={styles.detailItemInput}>{supervisorData.email}</Text>
                            </View>
                            <View style={styles.inputFieldContainer}>
                                <Text style={styles.decoratorTitle}>Number:</Text>
                                <TextInput
                                    value={supervisorData.phone}
                                    onChangeText={(e)=>handlePhone(e)}
                                    style={styles.detailItemInput}
                                />
                            </View>
                            <View style={styles.inputFieldContainer}>
                                <Text style={styles.decoratorTitle}>Status:</Text>
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                    <View style={styles.chekboxText}>
                                        <CheckBox
                                            value={supervisorData.status==="1" ? true:false}
                                            onValueChange={() => checkedValue("approved")}
                                        />
                                        <Text style={styles.checkText}>Approved</Text>
                                    </View>
                                    <View style={styles.chekboxText}>
                                        <CheckBox
                                             value={supervisorData.status==="0" ? true:false}
                                            onValueChange={() => checkedValue("disapproved")}
                                        />
                                        <Text style={styles.checkText}>Dis-Approved</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.btnContainer}>
                                 {/* <TouchableOpacity style={styles.commonBtn} onPress={() => navigation.navigate('SearchSupervisor')}>
                                    <Text style={styles.commonText}>Update</Text>
                                </TouchableOpacity>  \
                                <TouchableOpacity style={styles.commonBtn} onPress={() => updateSupervisor()}>
                                    <Text style={styles.commonText}>Update</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
              
            </ScrollView> */}
        {role == "supervisor" ? (
          <ScrollView contentContainerStyle={{ width: "100%" }}>
            {supervisorData.map((item,index)=>(
                <View style={styles.formConatiner}>
                    <View style={styles.inputFieldContainer}>
                      <Text style={styles.decoratorTitle}>Name:</Text>
                      <TextInput
                        style={styles.detailItemInput}
                        value={item.name}
                        onChangeText={(txt) =>
                            updateValue("name", index, txt)
                          }
                      />
                    </View>
                    <View style={styles.inputFieldContainer}>
                      <Text style={styles.decoratorTitle}>Email:</Text>
                      <Text style={styles.detailItemInput}>
                        {item.email}
                      </Text>
                    </View>
                    <View style={styles.inputFieldContainer}>
                      <Text style={styles.decoratorTitle}>Number:</Text>
                      <TextInput
                        value={item.phone}
                        style={styles.detailItemInput}
                        onChangeText={(txt) =>
                            updateValue("phone", index, txt)
                          }
                      />
                    </View>
                    {/* <View style={styles.inputFieldContainer}>
                      <Text style={styles.decoratorTitle}>Password:</Text>
                      <TextInput
                        value={"#######"}
                        style={styles.detailItemInput}
                      />
                    </View> */}
                    <View style={styles.inputFieldContainer}>
                      <Text style={styles.decoratorTitle}>Status:</Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={styles.chekboxText}>
                          <CheckBox
                            value={item.status==="1" ? true:false}
                            onValueChange={() => checkedValue("approved")}
                          />
                          <Text style={styles.checkText}>Approved</Text>
                        </View>
                        <View style={styles.chekboxText}>
                          <CheckBox
                            value={item.status==="0" ? true:false}
                            onValueChange={() => checkedValue("disapproved")}
                          />
                          <Text style={styles.checkText}>Dis-Approved</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.btnContainer}>
              {/* <TouchableOpacity style={styles.commonBtn} onPress={() => navigation.navigate('SearchSupervisor')}>
                          <Text style={styles.commonText}>Update</Text>
                      </TouchableOpacity>  */}
              <TouchableOpacity
                style={styles.commonBtn}
                onPress={() => updateSupervisor()}
              >
                <Text style={styles.commonText}>Update</Text>
              </TouchableOpacity>
            </View>
                  </View>

            ))}
                  
                
           
          </ScrollView>
        ) : (
            <ScrollView contentContainerStyle={{ width: "100%" }}>
          
<View style={styles.formConatiner}>
              <View style={styles.inputFieldContainer}>
                <Text style={styles.decoratorTitle}>Name:</Text>
                <TextInput style={styles.detailItemInput} value={supervisorData.name} />
              </View>
              <View style={styles.inputFieldContainer}>
                <Text style={styles.decoratorTitle}>Email:</Text>
                <Text style={styles.detailItemInput}>{supervisorData.email}</Text>
              </View>
              <View style={styles.inputFieldContainer}>
                <Text style={styles.decoratorTitle}>Number:</Text>
                <TextInput
                  value={supervisorData.phone}
                  style={styles.detailItemInput}
                />
              </View>
              <View style={styles.inputFieldContainer}>
                <Text style={styles.decoratorTitle}>Status:</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.chekboxText}>
                    <CheckBox
                      value={supervisorData.status==="1" ? true:false}
                    />
                    <Text style={styles.checkText}>Approved</Text>
                  </View>
                  <View style={styles.chekboxText}>
                    <CheckBox
                      value={supervisorData.status==="0" ? true:false}
                    />
                    <Text style={styles.checkText}>Dis-Approved</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
  isUpdate: state.auth.isUpdate,
  isUpdateMsg: state.auth.isUpdateMsg,
});
const mapDispatchToProps = (dispatch) => ({
  updateSupervisorHandler: (id, email, name, number, status, token) =>
    dispatch(updateSupervisor(id, email, name, number, status, token)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SupervisorDetails);
const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
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
    // height:Dimensions.get("window").height-200,
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
    width: "40%",
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
    width: "100%",
    justifyContent: "center",
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
