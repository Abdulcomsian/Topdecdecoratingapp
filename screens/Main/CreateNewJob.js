import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Text } from "native-base";
import { useDispatch, useSelector, connect } from "react-redux";
import { createNewJobCreation } from "../../Redux/action/auth/authActionTypes";

var plus = require("../../assets/authScreen/plus.png");
const NewJob = ( props) => {
  const { navigation } = props;
  const [token,setToken]=useState(props.token)
  const [data, setData] = useState({
    qty: "",
    description: "",
  });
  const [constructorName,setConstructorName]=useState('');
  const [projectName,setProjectName]=useState('');
  const [weekProject,setWeekProject]=useState('');
  const [assignSupervisor,setAssignSupervisor]=useState('');
  const [startDate,setStartDate]=useState('');
  const [dynamicInput, setdynamicInput] = useState([]);
  const addInput = () => {
    setdynamicInput((oldArray) => [...oldArray, data]);
    setData({
      qty: "",
      description: "",
    });
  };
  const updateValue=(key,index,value)=>{
      let preData=[...dynamicInput]
      preData[index][key]=value;
      setdynamicInput(preData)
      
  }
    console.log(dynamicInput)
  const newJob = () =>{
    // console.log("Name :",constructorName)
    // console.log("Project Name :",projectName)
    // console.log("Week Project :",weekProject)
    // console.log("Assign Supervisor :",assignSupervisor)
    // console.log("Start Date :",startDate)
    // console.log(dynamicInput)
    props.createNewJobHandler(constructorName,projectName,weekProject,assignSupervisor,startDate,dynamicInput,token);
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.refText}>Date: 12-2-2021</Text>
        <Text style={styles.refText}>Ref id: 10099499</Text>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Input job details</Text>
      </View>
      <ScrollView>
            <View style={styles.formConatiner}>
            <View style={styles.inputFieldContainer}>
                <TextInput
                style={styles.inputField}
                placeholder={"Main Contractor Name"}
                value={constructorName}
                onChangeText={(e)=>setConstructorName(e)}
                />
            </View>
            <View style={styles.inputFieldContainer}>
                <TextInput style={styles.inputField} 
                placeholder={"Project Name"} 
                value={projectName}
                onChangeText={(e)=>setProjectName(e)}
                />
            </View>
            <View style={styles.inputFieldContainer}>
                <TextInput
                style={styles.inputField}
                placeholder={"Number of weeks for project"}
                value={weekProject}
                onChangeText={(e)=>setWeekProject(e)}
                />
            </View>
            <View style={styles.inputFieldContainer}>
                <TextInput
                style={styles.inputField}
                placeholder={"Assign to Supervisor"}
                value={assignSupervisor}
                onChangeText={(e)=>setAssignSupervisor(e)}
                />
            </View>
            <View style={styles.inputFieldContainer}>
                <TextInput
                style={styles.inputField}
                placeholder={"Start Date for project"}
                value={startDate}
                onChangeText={(e)=>setStartDate(e)}
                />
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Job Summary</Text>
            </View>
            {dynamicInput.length > 0 && (
                <View style={[styles.dynamicInput,{flexDirection:"column"}]}>
                  
                {dynamicInput.map((el, index) => (
                  
                    <View style={styles.inputContainer} key={index}>
                    <TextInput
                        onChangeText={(txt) => updateValue('qty',index,txt)}
                        style={styles.quantityInput}
                        value={el.qty}
                        placeholder={"Quantity"}
                    />
                    <TextInput
                        onChangeText={(txt) => updateValue('description',index,txt)}
                        style={styles.descriptionInput}
                        value={el.description}
                        placeholder={"Description"}
                    />
                    </View>
                ))}
                </View>
            )}
            <View style={styles.dynamicInput}>
                <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={(txt) => setData({ ...data, qty: txt })}
                    style={styles.quantityInput}
                    placeholder={"Quantity"}
                    value={data.qty}
                />
                <TextInput
                    onChangeText={(txt) => setData({ ...data, description: txt })}
                    style={styles.descriptionInput}
                    placeholder={"Description"}
                    value={data.description}
                />
                </View>

                <View style={styles.addBtn}>
                <TouchableOpacity onPress={() => addInput()}>
                    <Image style={styles.plusBtn} source={plus} />
                </TouchableOpacity>
                </View>
            </View>
            
            <View style={styles.btnContainer}>
            {/* <TouchableOpacity
                style={styles.commonBtn}
                onPress={() => navigation.navigate("SelectSummary")}
            >
                <Text style={styles.commonText}>Save</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
                style={styles.commonBtn}
                onPress={() => newJob()}
            >
                <Text style={styles.commonText}>Save</Text>
            </TouchableOpacity>
            </View>
            </View>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = (state) => ({
  token : state.auth.token,
});
const mapDispatchToProps = (dispatch) => ({
  createNewJobHandler: (constructorName,projectName,weekProject,assignSupervisor,startDate,dynamicInput,token) =>
    dispatch(
      createNewJobCreation(constructorName,projectName,weekProject,assignSupervisor,startDate,dynamicInput,token)
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(NewJob);
const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
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
    height: "5%",
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
    width: "100%",
    alignItems: "center",
    paddingLeft:20,
    paddingRight:20
  },
  inputFieldContainer: {
    width: "100%",
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
  quantityInput: {
    width: "30%",
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: "#96A8B2",
    padding: 5,
    fontSize: 12,
    marginRight: 20,
    fontFamily: "poppins-regular",
  },
  descriptionInput: {
    width: "50%",
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: "#96A8B2",
    padding: 5,
    fontSize: 12,
    fontFamily: "poppins-regular",
  },
  addBtn: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  dynamicInput: {
    width: "100%",
    flexDirection: "row",
    marginTop: 30,
    position: "relative",
  },
  addBtn: {
    justifyContent: "center",
    backgroundColor: "#F6F9FB",
    borderWidth: 1,
    borderColor: "#E2ECF2",
    padding: 15,
    borderRadius: 14,
  },
  plusBtn: {
    width: 18,
    height: 18,
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
  btnContainer: {
    width: "100%",
    marginTop: 50,
    height: "15%",
  },
});
