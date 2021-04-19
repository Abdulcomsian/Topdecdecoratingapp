import React, { useState, useEffect } from "react";
import { View,StyleSheet,TouchableOpacity,TextInput,ActivityIndicator,ScrollView} from 'react-native';
import {Text} from 'native-base';
import axios from "axios";


const DetailsJob = (props) =>{
    
    const { navigation } = props; 
    const [loading, setLoading] = useState(false);
    const date = props.route.params.selectedDate;  
    const reference_number = props.route.params.refernceNum;
    const token = props.route.params.token;
    const [contractorName,setConstructorName] = useState(props.route.params.searchJobData.contractor)
    const [projectName,setProjectName] = useState(props.route.params.searchJobData.project)
    const [startDate,setStartDate] = useState(props.route.params.searchJobData.start_date)
    const [supervisorID,setSupervisorID] = useState(props.route.params.searchJobData.supervisor_id)
    const [weeks,setWeeks] = useState(props.route.params.searchJobData.weeks)

    console.log("Props Data :",props.route.params.searchJobData.contractor)
    
    return(
        <View style={styles.mainContainer}>
            <View style={styles.dateTimeContainer}>
                <Text style={styles.refText}>Date: 12-2-2021</Text>
                <Text style={styles.refText}>Ref  id: 10099499</Text>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Job Details</Text>
            </View>
                <ScrollView style={{height:'100%',width:'100%'}}>
                    <View style={styles.formConatiner}>
                        <View style={styles.inputFieldContainer}>
                            <Text style={styles.decoratorTitle}>Contructor Name:</Text>
                            <Text style={{width:"50%",textAlign:"center"}}>{contractorName}</Text>
                        </View>
                        <View style={styles.inputFieldContainer}>
                            <Text style={styles.decoratorTitle}>Project Name:</Text>
                            <Text style={{width:"50%",textAlign:"center"}}>{projectName}</Text>
                        </View>
                        <View style={styles.inputFieldContainer}>
                            <Text style={styles.decoratorTitle}>Start Date:</Text>
                            <Text style={{width:"50%",textAlign:"center"}}>{startDate}</Text>
                        </View>
                        <View style={styles.inputFieldContainer}>
                            <Text style={styles.decoratorTitle}>Supervisor ID:</Text>
                            <Text style={{width:"50%",textAlign:"center"}}>{supervisorID}</Text>
                        </View>
                        <View style={styles.inputFieldContainer}>
                            <Text style={styles.decoratorTitle}>No of Weeks:</Text>
                            <Text style={{width:"50%",textAlign:"center"}}>{weeks}</Text>
                        </View>
                        <TouchableOpacity style={styles.commonBtn}  onPress={()=>props.navigation.goBack()}>
                            <Text style={styles.commonText}>Go Back</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
        </View>
    )
}
export default DetailsJob;

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
        width:"50%",
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