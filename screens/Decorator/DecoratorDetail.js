import React, { useState, useEffect } from "react";
import { View,StyleSheet,Image,CheckBox,TouchableOpacity,ScrollView,ActivityIndicator} from 'react-native';
import {Button, Text} from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

var rightArrow=require('../../assets/authScreen/right.png')
const DecoratorDetails = (props) =>{
    const { navigation } = props;

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
            const response = await request.data.success;
            console.log(response);
            console.log(request.data);
            if(response){
                setDecoratorDate(request.data.data.user)
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
    return(
        <View style={styles.mainContainer}>
            <View style={styles.dateTimeContainer}>
                <Text style={styles.refText}>Date: 12-2-2021</Text>
                <Text style={styles.refText}>Ref  id: 10099499</Text>
            </View>
            
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Decorator Details</Text>
            </View>
            {showView ?
           
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
        fontSize:12
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
      errorText:{
        fontFamily:'poppins-semiBold',
        color:"red"
      }
});