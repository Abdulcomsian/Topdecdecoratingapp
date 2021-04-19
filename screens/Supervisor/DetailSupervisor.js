import React, { useState, useEffect } from "react";
import { View,StyleSheet,CheckBox,TouchableOpacity,ScrollView} from 'react-native';
import {Text} from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from "react-redux";
import {updateSupervisor} from '../../Redux/action/auth/authActionTypes';

var rightArrow=require('../../assets/authScreen/right.png')
const SupervisorDetails = (props) =>{
    const { navigation,token,isUpdate,isUpdateMsg} = props;
    const {name,email,id,userData} = props.route.params;
    const [password,setPassword]=useState("")
    const [supervisorData,setSupervisorData] = useState(userData)
    const [status,setStatus] = useState("")

    
    const checkedValue = (value) =>{
        if(value=="approved"){
            setStatus("1")
            setSupervisorData({...supervisorData,status:"1"})
        }
        else if(value=="disapproved"){
            setStatus("0")
            setSupervisorData({...supervisorData,status:"0"})
        }
        
    }

    const updateSupervisor = () =>{
        try{
            props.updateSupervisorHandler(supervisorData.id,supervisorData.email,supervisorData.name,supervisorData.number,status,token)
        }
        catch(err){
            alert(err.message)
        }
        
    }
    const handleSupervisorName = (value) =>{
        setSupervisorData({...supervisorData,name:value})
    }
    const handlePhone = (value) =>{
        setSupervisorData({...supervisorData,phone:value})
    }

    useEffect (() =>{
        if(isUpdate){
            if(isUpdateMsg){
                alert(isUpdateMsg)
                props.navigation.navigate("SearchSupervisor")
            }
        }
        else
       { 
        if(isUpdateMsg){
            alert(isUpdateMsg)
        }
       }
    },[isUpdateMsg])
    return(
        <View style={styles.mainContainer}>
            <View style={styles.dateTimeContainer}>
                <Text style={styles.refText}>Date: 12-2-2021</Text>
                <Text style={styles.refText}>Ref  id: 10099499</Text>
            </View>
            
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Supervisor Detail</Text>
            </View>
                <ScrollView contentContainerStyle={{width:'100%'}}>
              
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
                                </TouchableOpacity>  */}
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
    isUpdate : state.auth.isUpdate,
    isUpdateMsg : state.auth.isUpdateMsg
  });
  const mapDispatchToProps = (dispatch) => ({
    updateSupervisorHandler: (id,email,name,number,status,token) =>
      dispatch(
        updateSupervisor(id,email,name,number,status,token)
      ),
  });
export default connect(mapStateToProps, mapDispatchToProps)(SupervisorDetails);
const styles = StyleSheet.create({
    mainContainer:{
        height:'100%',
        width:'100%',
    },
    dateTimeContainer:{
        height:"5%",
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
        height:"10%",
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
        // height:Dimensions.get("window").height-200,
        width:'100%',
        padding:30,
        alignItems:'center'
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