import React, { useState, useEffect } from "react";
import { View,StyleSheet,TouchableOpacity,TextInput,ActivityIndicator,ScrollView} from 'react-native';
import {Text} from 'native-base';
import axios from "axios";


const DetailJob = (props) =>{
    
    const { navigation } = props; 
    const [loading, setLoading] = useState(false);
    const date = props.route.params.selectedDate;  
    const reference_number = props.route.params.refernceNum;
    const token = props.route.params.token;
    const [contractorName,setConstructorName] = useState("")
    const [projectName,setProjectName] = useState("")
    const [startDate,setStartDate] = useState("")
    const [supervisorID,setSupervisorID] = useState("")
    const [weeks,setWeeks] = useState("")
    const [jobData, setJobData] = useState([]);

    console.log("Selected Date :",date)
    console.log("Refernce Number :",reference_number)
    console.log("Token :",token)
    useEffect(() => {
        try {
          const body = {date,reference_number,token};
          (async () => {
            setLoading(true);
            const request = await axios(
              "https://airtimetesting.airtime4u.com/public/tajs/public/api/admin/search/job/refid",
              {
                method: "POST",
                headers: {
                  authorization: "Bearer " + token,
                },
                data: body,
              }
            );
            const response = await request.data.data.user;
            console.log(response);
            setJobData(request.data.data.user)
            setLoading(false);
          })();
        } catch (err) {
            console.log("Error")
            console.log(err.message);
            setLoading(false);
        }
        
       
      }, []);
      if (loading) {
        return (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator color="#1073AC" size="small" />
          </View>
        );
      }
      else{
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
            
            {jobData.map((item,index)=>(
                <View style={styles.formConatiner} key={index}>
                    <View style={styles.inputFieldContainer}>
                        <Text style={styles.decoratorTitle}>Contructor Name:</Text>
                        <Text style={{width:"50%",textAlign:"center"}}>{item.contractor}</Text>
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <Text style={styles.decoratorTitle}>Project Name:</Text>
                        <Text style={{width:"50%",textAlign:"center"}}>{item.project}</Text>
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <Text style={styles.decoratorTitle}>Start Date:</Text>
                        <Text style={{width:"50%",textAlign:"center"}}>{item.start_date}</Text>
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <Text style={styles.decoratorTitle}>Supervisor ID:</Text>
                        <Text style={{width:"50%",textAlign:"center"}}>{item.supervisor_id}</Text>
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <Text style={styles.decoratorTitle}>No of Weeks:</Text>
                        <Text style={{width:"50%",textAlign:"center"}}>{item.weeks}</Text>
                    </View>
                    <View style={{width:"100%",height:2,backgroundColor:"#000"}}></View>
                </View>
            ))}
            </ScrollView>
        </View>
    )
      }
}
export default DetailJob;

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