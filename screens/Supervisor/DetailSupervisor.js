import React,{useState} from 'react';
import { View,StyleSheet,Image,CheckBox,TouchableOpacity,ScrollView} from 'react-native';
import {Text} from 'native-base';
import { TextInput } from 'react-native-gesture-handler';

var rightArrow=require('../../assets/authScreen/right.png')
const SupervisorDetails = ({props,navigation}) =>{
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
                    <TextInput style={styles.detailItemInput}>Toby</TextInput>
                </View>
                <View style={styles.inputFieldContainer}>
                    <Text style={styles.decoratorTitle}>Email:</Text>
                    <TextInput style={styles.detailItemInput}>Toby@example.com</TextInput>
                </View>
                <View style={styles.inputFieldContainer}>
                    <Text style={styles.decoratorTitle}>Number:</Text>
                    <TextInput style={styles.detailItemInput}>0123456789</TextInput>
                </View>
                <View style={styles.inputFieldContainer}>
                    <Text style={styles.decoratorTitle}>Password:</Text>
                    <TextInput style={styles.detailItemInput}>2356</TextInput>
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
                    <TouchableOpacity style={styles.commonBtn} onPress={() => navigation.navigate('SearchSupervisor')}>
                        <Text style={styles.commonText}>Update</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        </View>
    )
}
export default SupervisorDetails;
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