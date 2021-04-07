import React,{useState} from 'react';
import { View,StyleSheet,Image,CheckBox,TouchableOpacity,ScrollView} from 'react-native';
import {Text} from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector, connect } from "react-redux";


var rightArrow=require('../../assets/authScreen/right.png')
const SupervisorDetails = (props) =>{
    const { navigation } = props;
    const [supervisorName,setSupervisorName]=useState("Hamza")
    const [supervisorEmail,setSupervisorEmail]=useState("alamhamza18@gamil.com")
    const [number,setNumber]=useState("03359853140")
    const [password,setPassword]=useState("0123456789")


    const[check,setCheck]=useState({
        approved:true,
        disApproved:false
    })
    const checkedValue = (value) =>{
        if(value=="approved"){
            setCheck({disApproved:false,approved:true})
        }
        else if(value=="disapproved"){
            setCheck({disApproved:true,approved:false})
        }
    }

    const updateSupervisor = () =>{
        console.log("Name :",supervisorName)
        console.log("Email :",supervisorEmail)
        console.log("Number :",number)
        console.log("Passwrod :",password)
        console.log("Check :",check)

    }
    return(
        <View style={styles.mainContainer}>
            <View style={styles.dateTimeContainer}>
                <Text style={styles.refText}>Date: 12-2-2021</Text>
                <Text style={styles.refText}>Ref  id: 10099499</Text>
            </View>
            
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Supervisor Detail</Text>
            </View>
            <ScrollView style={{height:'100%',width:'100%'}}>
            <View style={styles.formConatiner}>
                <View style={styles.inputFieldContainer}>
                    <Text style={styles.decoratorTitle}>Name:</Text>
                    <TextInput 
                    style={styles.detailItemInput}
                    value={supervisorName}
                    onChangeText={(e)=>setSupervisorName(e)}
                    />
                </View>
                <View style={styles.inputFieldContainer}>
                    <Text style={styles.decoratorTitle}>Email:</Text>
                    <TextInput 
                        style={styles.detailItemInput}
                        value={supervisorEmail}
                        onChangeText={(e)=>setSupervisorEmail(e)}
                    />
                </View>
                <View style={styles.inputFieldContainer}>
                    <Text style={styles.decoratorTitle}>Number:</Text>
                    <TextInput
                        value={number}
                        onChangeText={(e)=>setNumber(e)}
                        style={styles.detailItemInput}
                    />
                </View>
                <View style={styles.inputFieldContainer}>
                    <Text style={styles.decoratorTitle}>Password:</Text>
                    <TextInput 
                        style={styles.detailItemInput}
                        value={password}
                        onChangeText={(e)=>setPassword(e)}
                    />
                </View>
                <View style={styles.inputFieldContainer}>
                    <Text style={styles.decoratorTitle}>Status:</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={styles.chekboxText}>
                            <CheckBox
                                value={check.approved}
                                onValueChange={() => checkedValue("approved")}
                            />
                            <Text style={styles.checkText}>Approved</Text>
                        </View>
                        <View style={styles.chekboxText}>
                            <CheckBox
                                value={check.disApproved}
                                onValueChange={() => checkedValue("disapproved")}
                            />
                            <Text style={styles.checkText}>Dis-Approved</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.btnContainer}>
                    {/* <TouchableOpacity style={styles.commonBtn} onPress={() => navigation.navigate('SearchSupervisor')}>
                        <Text style={styles.commonText}>Update</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.commonBtn} onPress={() => updateSupervisor()}>
                        <Text style={styles.commonText}>Update</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        </View>
    )
}
const mapStateToProps = (state) => ({
    token : state.auth.token,
    name : state.auth.supervisorName,
    email : state.auth.supervisorEmail,
    number : state.auth.supervisorNumber,
    super_password : state.auth.supervisorPassword,
    super_status : state.auth.supervisorStatus
  });
  const mapDispatchToProps = (dispatch) => ({
    searchSupervisorHandler: (supervisorName,supervisorId,supervisorEmail) =>
      dispatch(
        searchSupervisor(supervisorName,supervisorId,supervisorEmail)
      ),
  });
export default connect(mapStateToProps, mapDispatchToProps)(SupervisorDetails);
const styles = StyleSheet.create({
    mainContainer:{
        height:'100%',
        width:'100%',
    },
    dateTimeContainer:{
        height:40,
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        padding: 10,
    },
    refText:{
        fontSize:12,
        color:'#96A8B2',
        fontFamily:'poppins-medium'
    },
    titleContainer:{
        height:30,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    },
    titleText:{
        color:'#4F4F4F',
        fontSize:18,
        fontFamily:'poppins-semiBold'
    },
    formConatiner:{
        height:'100%',
        width:'100%',
        padding:30,
        alignItems:'center',
    },
    inputFieldContainer:{
        height:60,
        width:'100%',
        flexDirection:'row',
        alignItems:'center'
    },
    inputField:{
        height:52,
        width:'100%',
        borderBottomWidth:1,
        borderBottomColor:'#96A8B2',
        padding:5,
        fontSize:16,
        color:'#96A8B2',
        fontFamily:'poppins-regular'
    },
    inputContainer:{
        justifyContent:'center',
        flexDirection:'row',
        alignItems:'center',
        width:'80%'
    },
    decoratorTitle:{
        fontFamily:'poppins-semiBold',
        width:"40%",
    },
    detailItem:{
        marginLeft:30,
        fontFamily:'poppins-regular',
        width:"60%"
    },
    chekboxText:{
        justifyContent:'center',
        alignItems:'center',
        marginRight:20
    },
    checkText:{
        fontFamily:'poppins-regular',
        fontSize:12
    },
    detailItemInput:{
        width:'60%',
        borderBottomWidth:1,
        borderBottomColor:'#96A8B2',
        fontSize:16,
        color:'#96A8B2',
        fontFamily:'poppins-regular'
    },
    btnContainer:{
        width:'100%',
        marginTop:30,
    },
    commonBtn:{
        height:50,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:14,
        borderWidth:3,
        borderColor:'#1073AC'
    },
    commonText:{
        color:'#1073AC',
        fontSize:18,
        fontFamily:'poppins-semiBold'
    },
});