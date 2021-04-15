import React, { useState, useEffect } from "react";
import { View,StyleSheet,Image,CheckBox,TouchableOpacity,ScrollView,ActivityIndicator,Dimensions} from 'react-native';
import {Text} from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector, connect } from "react-redux";
import axios from "axios";

var rightArrow=require('../../assets/authScreen/right.png')
const SupervisorDetails = (props) =>{
    const { navigation,token } = props;
    const {name,email,id,userData} = props.route.params;
    const [supervisorName,setSupervisorName]=useState("")
    const [supervisorEmail,setSupervisorEmail]=useState("")
    const [number,setNumber]=useState("")
    const [password,setPassword]=useState("")
    const [loading, setLoading] = useState(false);
    const [supervisorData,setSupervisorData] = useState([])
    const [showView,setShowView] = useState(false)
    const [status,setStatus] = useState(false)

    
    
    // useEffect(() => {
    //     try {
    //       const body = {id,name,email};
    //       (async () => {
    //         setLoading(true);
    //         const request = await axios(
    //           "https://airtimetesting.airtime4u.com/public/tajs/public/api/admin/search/supervisor",
    //           {
    //             method: "POST",
    //             headers: {
    //               authorization: "Bearer " + token,
    //             },
    //             data: body,
    //           }
    //         );
    //         const response = await request.data;
    //         //console.log(response);
    //         if(response.success){

    //             setSupervisorData(response.data.user)
    //             setCheck({...check,approved:response.data.user.status==="1" ? true : false,disApproved:response.data.user.status==="0" ? true : false})
    //             setLoading(false);
    //             setShowView(true)
    //         } 
    //         else{
    //             setLoading(false);
    //             setShowView(false)
    //         }
    //       })();
    //     } catch (err) {
    //         console.log("Error")
    //         console.log(err.message);
    //         setLoading(false);
    //     }
        
       
    //   }, []);
    useEffect(() => {
       
        if(userData){
            setSupervisorData([userData])
            setShowView(true)
        }
        else{
            setShowView(false)
        }
    },[])
    const[check,setCheck]=useState({
        approved:true,
        disApproved:false
    })
    const checkedValue = (value,index) =>{
        console.log(value,index)
        let tempData=[...supervisorData];
        console.log(tempData);
        if(value=="approved"){
            tempData[index].status="1"
            setStatus(true)
            //setCheck({disApproved:false,approved:true})
        }
        else if(value=="disapproved"){
            tempData[index].status="0"
            setStatus(false)
            //setCheck({disApproved:true,approved:false})
        }
        setSupervisorData(tempData)
    }

    const updateSupervisor = () =>{
        setSupervisorName(supervisorData[0].name)
        setSupervisorEmail(supervisorData[0].email)
        setNumber(supervisorData[0].phone)

        console.log("Name :",supervisorName)
        console.log("Email :",supervisorEmail)
        console.log("Number :",number)
        console.log("Password :",password)
        if(status){
            console.log("Status",status)
        }
        else{
            console.log("Status",status)
        }
    }
    const handleSupervisorName = (value) =>{
        let tempData=[...supervisorData];
        tempData[0].name=value
        setSupervisorData(tempData)
    }
    const handleEmail = (value) =>{
        let tempData=[...supervisorData];
        tempData[0].email=value
        setSupervisorData(tempData)
    }
    const handlePhone = (value) =>{
        let tempData=[...supervisorData];
        tempData[0].phone=value
        setSupervisorData(tempData)
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
            {showView ? 
                <ScrollView contentContainerStyle={{width:'100%'}}>
                    {supervisorData.map((item,index)=>(
                        <View style={styles.formConatiner} key={index}>
                            <View style={styles.inputFieldContainer}>
                                <Text style={styles.decoratorTitle}>Name:</Text>
                                <TextInput 
                                style={styles.detailItemInput}
                                value={item.name}
                                onChangeText={(e)=>handleSupervisorName(e)}
                                />
                            </View>
                            <View style={styles.inputFieldContainer}>
                                <Text style={styles.decoratorTitle}>Email:</Text>
                                <TextInput 
                                    style={styles.detailItemInput}
                                    value={item.email}
                                    onChangeText={(e)=>handleEmail(e)}
                                />
                            </View>
                            <View style={styles.inputFieldContainer}>
                                <Text style={styles.decoratorTitle}>Number:</Text>
                                <TextInput
                                    value={item.phone}
                                    onChangeText={(e)=>handlePhone(e)}
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
                                            value={item.status==="1" ? true:false}
                                            onValueChange={() => checkedValue("approved",index)}
                                        />
                                        <Text style={styles.checkText}>Approved</Text>
                                    </View>
                                    <View style={styles.chekboxText}>
                                        <CheckBox
                                             value={item.status==="0" ? true:false}
                                            onValueChange={() => checkedValue("disapproved",index)}
                                        />
                                        <Text style={styles.checkText}>Dis-Approved</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.btnContainer}>
                                {/* <TouchableOpacity style={styles.commonBtn} onPress={() => navigation.navigate('SearchSupervisor')}>
                                    <Text style={styles.commonText}>Update</Text>
                                </TouchableOpacity> */}
                                <TouchableOpacity style={styles.commonBtn} onPress={() => updateSupervisor(bind(this))}>
                                    <Text style={styles.commonText}>Update</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
            </ScrollView>
            : 
            <View style={{justifyContent:"center",alignItems:"center",width:"100%",height:"85%"}}>
                <Text>Sorry No Data Found !</Text>
            </View>
            }
            
        </View>
    )
}
const mapStateToProps = (state) => ({
    token : state.auth.token,
  });
  const mapDispatchToProps = (dispatch) => ({
    searchSupervisorHandler: () =>
      dispatch(
        searchSupervisor()
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