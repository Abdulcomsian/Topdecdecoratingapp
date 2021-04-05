import React,{useState} from 'react';
import { View,StyleSheet,Image,CheckBox,TouchableOpacity,ScrollView} from 'react-native';
import {Text} from 'native-base';

var rightArrow=require('../../assets/authScreen/right.png')
const DecoratorDetails = ({props,navigation}) =>{
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
                <Text style={styles.titleText}>Decorator Details</Text>
            </View>
            <ScrollView style={{height:'100%',width:'100%'}}>
            <View style={styles.formConatiner}>
                <View style={styles.inputFieldContainer}>
                    <Text style={styles.decoratorTitle}>Name:</Text>
                    <Text style={styles.detailItem}>Toby</Text>
                </View>
                <View style={styles.inputFieldContainer}>
                    <Text style={styles.decoratorTitle}>Email:</Text>
                    <Text style={styles.detailItem}>Toby@example.com</Text>
                </View>
                <View style={styles.inputFieldContainer}>
                    <Text style={styles.decoratorTitle}>Number:</Text>
                    <Text style={styles.detailItem}>0123456789</Text>
                </View>
                <View style={styles.inputFieldContainer}>
                    <Text style={styles.decoratorTitle}>Photo Id:</Text>
                    <Text style={styles.detailItem}>2356</Text>
                </View>
                <View style={styles.inputFieldContainer}>
                    <Text style={styles.decoratorTitle}>CSCS Card:</Text>
                    <Text style={styles.detailItem}>00326565</Text>
                </View>
                <View style={styles.inputFieldContainer}>
                    <Text style={styles.decoratorTitle}>Notes Log:</Text>
                    <TouchableOpacity style={{marginLeft:30,fontFamily:'poppins-regular',width:"60%",flexDirection:'row'}} onPress={() => navigation.navigate('ViewNotes')}><Text style={{fontFamily:'poppins-regular'}}>View Logs</Text><Image source={rightArrow} style={{marginLeft:10,marginTop:5}}/></TouchableOpacity>
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
            </View>
            </ScrollView>
        </View>
    )
}
export default DecoratorDetails;
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
        flexDirection:'row'
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
        width:"40%"
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
    }
});