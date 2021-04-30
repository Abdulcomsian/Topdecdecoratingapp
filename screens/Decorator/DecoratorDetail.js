import React, { useState, useEffect } from "react";
import { View,StyleSheet,Image,CheckBox,TouchableOpacity,ScrollView,ActivityIndicator} from 'react-native';
import {Button, Text} from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

var rightArrow=require('../../assets/authScreen/right.png')
const DecoratorDetails = (props) =>{
    const { navigation } = props;
    const [decoratorID, setDEcoratorID] = useState(props.route.params)
    const [role,setRole] = useState(props.route.params.role);
    const[check,setCheck]=useState({
        approved:true,
        disApproved:false
    })
    const [loading, setLoading] = useState(false);
    const [decoratorName,setDecoratorName]=useState('')
    const [decoratorEmail,setDecoratorEmail]=useState('')
    const [decoratorNumber,setDecoratorNumber]=useState('')
    const [photoID,setPhotoID]=useState('')
    const [cscsFront,setCscsFront]=useState('')
    const [cscsBack,setCscsBack]=useState('')
    const [decoratorData, setDecoratorDate] = useState([]);
    const [showView,setShowView] = useState(false)
    const [errorMsg,setErrorMsg] = useState("")

    const checkedValue = (value) =>{
        if(value=="approved"){
            setCheck({disApproved:false,approved:true})
        }
        else if(value=="disapproved"){
            setCheck({disApproved:true,approved:false})
        }
    }
    const uploadPhotoImage = async (type) => {
        if (type == "photoID") {
          let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
          if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
          }
          let pickerResult = await ImagePicker.launchImageLibraryAsync();
          if (pickerResult.cancelled === true) {
            return;
          }
          console.log("Piceker Result :",pickerResult)
          setPhotoID({ localUri: pickerResult.uri });
        } else if (type == "cscsFront") {
          let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
          if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
          }
          let pickerResult = await ImagePicker.launchImageLibraryAsync();
          if (pickerResult.cancelled === true) {
            return;
          }
    
          setCscsFront({ localUri: pickerResult.uri });
        } else if (type == "cscsBack") {
          let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
          if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
          }
          let pickerResult = await ImagePicker.launchImageLibraryAsync();
          if (pickerResult.cancelled === true) {
            return;
          }
    
          setCscsBack({ localUri: pickerResult.uri });
        }
      };
    const id = props.route.params.id;
    const token = props.route.params.token
    useEffect(() => {
        try {
          const body = {id};
          (async () => {
            setLoading(true);
            const request = await axios(
              "https://airtimetesting.airtime4u.com/public/tajs/public/api/admin/search/decorator",
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
            console.log(request.data);
            if(response.success==true){
                setDecoratorDate(request.data.user)
                setLoading(false);
                setShowView(true)
            }
            else{
                setLoading(false);
                setShowView(false)
                setErrorMsg(request.data.message)
            }
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
          console.log("decorator Array :",decoratorData)
    return(
        <View style={styles.mainContainer}>
            <View style={styles.dateTimeContainer}>
                <Text style={styles.refText}>Date: 12-2-2021</Text>
                <Text style={styles.refText}>Ref  id: 10099499</Text>
            </View>
            
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Decorator Details</Text>
            </View>
            {/* {showView ?
           
                <ScrollView style={{height:'100%',width:'100%'}}>
                     {decoratorData.map((item,index)=>(
                        <View style={styles.formConatiner} key={index}>
                            <View style={styles.inputFieldContainer}>
                                <Text style={styles.decoratorTitle}>Name:</Text>
                                <Text style={{fontSize:12,width:"50%",justifyContent:"center",fontFamily:'poppins-regular',}}>{item.name}</Text>
                            </View>
                            <View style={styles.inputFieldContainer}>
                                <Text style={styles.decoratorTitle}>Email:</Text>
                                <Text style={{fontSize:12,width:"50%",justifyContent:"center",fontFamily:'poppins-regular'}}>{item.email}</Text>
                            </View>
                            <View style={styles.inputFieldContainer}>
                                <Text style={styles.decoratorTitle}>Number:</Text>
                                <Text style={{fontSize:12,width:"50%",justifyContent:"center",fontFamily:'poppins-regular'}}>{item.phone}</Text>
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
                                <TouchableOpacity style={{marginLeft:30,fontFamily:'poppins-regular',width:"50%",flexDirection:'row'}} onPress={() => navigation.navigate('ViewNotes')}><Text style={{fontFamily:'poppins-regular',fontSize:12}}>View Logs</Text><Image source={rightArrow} style={{marginLeft:10,marginTop:5,width:8,height:8}}/></TouchableOpacity>
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
                     ))}
                </ScrollView>
             : 
                <View style={{width:"100%",justifyContent:"center",alignItems:"center",height:"85%"}}>
                    <Text style={styles.errorText}>{errorMsg}</Text>
                </View>
            } */}
           {role=="decorator" ? 
           <ScrollView style={{height:'100%',width:'100%'}}>
                   <View style={styles.formConatiner} >
                       <View style={styles.inputFieldContainer}>
                           <Text style={styles.decoratorTitle}>Name:</Text>
                           <TextInput
                            value={"Hamza"}
                            style={styles.inputField}
                           />
                       </View>
                       <View style={styles.inputFieldContainer}>
                           <Text style={styles.decoratorTitle}>Email:</Text>
                           <Text style={{fontSize:14,width:"50%",justifyContent:"center",fontFamily:'poppins-regular'}}>hamza@gmail.com</Text>
                       </View>
                       <View style={styles.inputFieldContainer}>
                           <Text style={styles.decoratorTitle}>Number:</Text>
                           <TextInput
                            value={"03359853140"}
                            style={styles.inputField}
                           />
                       </View>
                       <View style={styles.inputFieldContainer}>
                           <Text style={styles.decoratorTitle}>Photo ID:</Text>
                           <View style={{width:"50%",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                                <Image style={styles.thumbnail} source={{ uri: photoID.localUri }}/>
                                <TouchableOpacity onPress={() => uploadPhotoImage("photoID")} style={{height:30,borderRadius: 8,borderWidth: 3,borderColor: "#1073AC",alignItems:"center",justifyContent:"center"}}>
                                    <Text style={{fontSize:10,paddingLeft:5,paddingRight:5,fontFamily:'poppins-regular'}}>Upload Image</Text>
                                </TouchableOpacity>
                           </View>
                       </View>
                       <View style={styles.inputFieldContainer}>
                           <Text style={styles.decoratorTitle}>CSCS Front Card:</Text>
                           <View style={{width:"50%",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                                <Image style={styles.thumbnail} source={{ uri: cscsFront.localUri }}/>
                                <TouchableOpacity onPress={() => uploadPhotoImage("cscsFront")} style={{height:30,borderRadius: 8,borderWidth: 3,borderColor: "#1073AC",alignItems:"center",justifyContent:"center"}}>
                                    <Text style={{fontSize:10,paddingLeft:5,paddingRight:5,fontFamily:'poppins-regular'}}>Upload Image</Text>
                                </TouchableOpacity>
                           </View>
                       </View>
                       <View style={styles.inputFieldContainer}>
                           <Text style={styles.decoratorTitle}>CSCS Back Card:</Text>
                           <View style={{width:"50%",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                                <Image style={styles.thumbnail} source={{ uri: cscsBack.localUri }}/>
                                <TouchableOpacity onPress={() => uploadPhotoImage("cscsBack")} style={{height:30,borderRadius: 8,borderWidth: 3,borderColor: "#1073AC",alignItems:"center",justifyContent:"center"}}>
                                    <Text style={{fontSize:10,paddingLeft:5,paddingRight:5,fontFamily:'poppins-regular'}}>Upload Image</Text>
                                </TouchableOpacity>
                           </View>
                       </View>
                       <View style={styles.inputFieldContainer}>
                           <Text style={styles.decoratorTitle}>Notes Log:</Text>
                           <TouchableOpacity style={{marginLeft:30,fontFamily:'poppins-regular',width:"50%",flexDirection:'row'}} onPress={() => navigation.navigate('ViewNotes')}><Text style={{fontFamily:'poppins-regular',fontSize:14}}>View Logs</Text><Image source={rightArrow} style={{marginLeft:10,marginTop:5,width:10,height:10}}/></TouchableOpacity>
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
                       <TouchableOpacity style={styles.commonBtn} onPress={() => navigation.navigate('SelectSummary')}>
                        <Text style={styles.commonText}>Update</Text>
                    </TouchableOpacity> 
                   </View>
           </ScrollView>
           :
            <ScrollView style={{height:'100%',width:'100%'}}>
                    <View style={styles.formConatiner} >
                       <View style={styles.inputFieldContainer}>
                           <Text style={styles.decoratorTitle}>Name:</Text>
                           <Text style={{fontSize:12,width:"50%",justifyContent:"center",fontFamily:'poppins-regular',}}>{decoratorData.name}</Text>
                       </View>
                       <View style={styles.inputFieldContainer}>
                           <Text style={styles.decoratorTitle}>Email:</Text>
                           <Text style={{fontSize:12,width:"50%",justifyContent:"center",fontFamily:'poppins-regular'}}>{decoratorData.email}</Text>
                       </View>
                       <View style={styles.inputFieldContainer}>
                           <Text style={styles.decoratorTitle}>Number:</Text>
                           <Text style={{fontSize:12,width:"50%",justifyContent:"center",fontFamily:'poppins-regular'}}>{decoratorData.phone}</Text>
                       </View>
                       <View style={styles.inputFieldContainer}>
                           <Text style={styles.decoratorTitle}>Photo ID:</Text>
                           <Image style={styles.thumbnail} source=""/>
                       </View>
                       <View style={styles.inputFieldContainer}>
                           <Text style={styles.decoratorTitle}>CSCS Front Card:</Text>
                           <Image style={styles.thumbnail} source=""/> 
                       </View>
                       <View style={styles.inputFieldContainer}>
                           <Text style={styles.decoratorTitle}>CSCS Back Card:</Text>
                           <Image style={styles.thumbnail} source=""/>
                       </View>
                       <View style={styles.inputFieldContainer}>
                           <Text style={styles.decoratorTitle}>Notes Log:</Text>
                           <TouchableOpacity style={{marginLeft:30,fontFamily:'poppins-regular',width:"50%",flexDirection:'row'}} onPress={() => navigation.navigate('ViewNotes')}><Text style={{fontFamily:'poppins-regular',fontSize:12}}>View Logs</Text><Image source={rightArrow} style={{marginLeft:10,marginTop:5,width:8,height:8}}/></TouchableOpacity>
                       </View>
                       <View style={styles.inputFieldContainer}>
                           <Text style={styles.decoratorTitle}>Status:</Text>
                           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                               <View style={styles.chekboxText}>
                                   <CheckBox
                                       value={decoratorData.status==="1" ? true:false}
                                       
                                   />
                                   <Text style={styles.checkText}>Approved</Text>
                               </View>
                               <View style={styles.chekboxText}>
                                   <CheckBox
                                       value={decoratorData.status==="0" ? true:false}
                                      
                                   />
                                   <Text style={styles.checkText}>Dis-Approved</Text>
                               </View>
                           </View>
                       </View> 
                   </View>
            
                   
           </ScrollView>
            }
           
        </View>
    )
      }
}
export default DecoratorDetails;
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
        width:'50%',
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
        fontSize:14
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
        resizeMode: "cover"
      },
      errorText:{
        fontFamily:'poppins-semiBold',
        color:"red"
      },
      commonBtn: {
        height: 50,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 14,
        borderWidth: 3,
        borderColor: "#1073AC",
        marginTop:30
      },
      commonText: {
        color: "#1073AC",
        fontSize: 18,
        fontFamily: "poppins-semiBold",
      },
});