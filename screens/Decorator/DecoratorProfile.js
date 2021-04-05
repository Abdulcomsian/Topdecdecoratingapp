import React,{useState} from 'react';
import { View,StyleSheet,Image,CheckBox,TouchableOpacity,ScrollView} from 'react-native';
import {Text} from 'native-base';
import * as ImagePicker from 'expo-image-picker';

var rightArrow=require('../../assets/authScreen/right.png')
const DecoratorProfile = ({props,navigation}) =>{
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
    const [selectedImage, setSelectedImage] = useState(null);
    const uploadImage = async () =>{
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
          }
      
        setSelectedImage({ localUri: pickerResult.uri });
    }
    
    return(
        <View style={styles.mainContainer}>
            <View style={styles.dateTimeContainer}>
                <Text style={styles.refText}>Date: 12-2-2021</Text>
                <Text style={styles.refText}>Ref  id: 10099499</Text>
            </View>
            
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Decorator Profile</Text>
            </View>
            <ScrollView>
            <View style={styles.formConatiner}>
                <View style={styles.inputFieldContainer}>
                    <Text style={styles.decoratorTitle}>ID:</Text>
                    <Text style={styles.detailItem}>001</Text>
                </View>
                <View style={styles.inputFieldContainer}>
                    <Text style={styles.decoratorTitle}>Name:</Text>
                    <Text style={styles.detailItem}>Toby</Text>
                </View>
                <View style={styles.inputFieldContainer}>
                    <Text style={styles.decoratorTitle}>Last Name:</Text>
                    <Text style={styles.detailItem}>Toby Last</Text>
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
                    {selectedImage==null ?
                        <TouchableOpacity style={styles.selectFileBtn} onPress={() => uploadImage()}> 
                            <Text>Select File</Text>
                        </TouchableOpacity>
                    :
                        <View style={{marginLeft:30,flexDirection:'row'}}>
                            <Image source={{uri: selectedImage.localUri}} style={styles.thumbnail}/>
                        </View>
                    }
                        
                  
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
export default DecoratorProfile;
const styles = StyleSheet.create({
    mainContainer:{
        height:'100%',
        width:'100%',
    },
    dateTimeContainer:{
        height:"10%",
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
        height:"5%",
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
        height:'85%',
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
    },
    selectFileBtn:{
        borderWidth:1,
        height:"50%",
        marginLeft:30,
        padding:10,
        justifyContent:'center',
        borderRadius:6,

    },
    thumbnail: {
        width: 50,
        height: 50,
        resizeMode: "contain"
      }
});