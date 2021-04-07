import React,{useState} from 'react';
import { View,StyleSheet,Image,CheckBox,TouchableOpacity,ScrollView} from 'react-native';
import {Button, Text} from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import * as ImagePicker from "expo-image-picker";

var rightArrow=require('../../assets/authScreen/right.png')
const DecoratorDetails = (props) =>{
    const { navigation } = props;

    const[check,setCheck]=useState({
        approved:true,
        disApproved:false
    })
    const [decoratorName,setDecoratorName]=useState('')
    const [decoratorEmail,setDecoratorEmail]=useState('')
    const [decoratorNumber,setDecoratorNumber]=useState('')
    const [photoID,setPhotoID]=useState('')
    const [cscsFront,setCscsFront]=useState('')
    const [cscsBack,setCscsBack]=useState('')
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
                    <TextInput 
                        style={styles.detailItemInput}
                    />
                </View>
                <View style={styles.inputFieldContainer}>
                    <Text style={styles.decoratorTitle}>Email:</Text>
                    <TextInput 
                        style={styles.detailItemInput}
                    />
                </View>
                <View style={styles.inputFieldContainer}>
                    <Text style={styles.decoratorTitle}>Number:</Text>
                    <TextInput 
                        style={styles.detailItemInput}
                    />
                </View>
                <View style={styles.inputFieldContainer}>
                    <Text style={styles.decoratorTitle}>Photo ID:</Text>
                        <Image style={styles.thumbnail} source={{ uri: photoID.localUri }}/>
                        
                </View>
                <View style={styles.inputFieldContainer}>
                    <Text style={styles.decoratorTitle}>CSCS Front Card:</Text>
                    
                        <Image style={styles.thumbnail} source={{ uri: cscsFront.localUri }}/>
                        
                </View>
                <View style={styles.inputFieldContainer}>
                    <Text style={styles.decoratorTitle}>CSCS Back Card:</Text>
                    <Image style={styles.thumbnail} source={{ uri: cscsBack.localUri }}/>
                        
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
    },
    detailItemInput:{
        width:'60%',
        borderBottomWidth:1,
        borderBottomColor:'#96A8B2',
        fontSize:16,
        color:'#96A8B2',
        fontFamily:'poppins-regular'
    },
    selectFileBtn: {
        borderWidth: 1,
        marginLeft: 30,
        justifyContent: "center",
        borderRadius: 6,
        padding: 5,
      },
      thumbnail: {
        width: 50,
        height: 50,
        resizeMode: "contain",
      },
});