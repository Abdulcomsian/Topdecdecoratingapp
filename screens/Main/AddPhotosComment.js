import React,{useState} from 'react';
import { View,StyleSheet,Image,TextInput,TouchableOpacity} from 'react-native';
import {Text} from 'native-base';

var addPhoto=require('../../assets/authScreen/addphoto.png')
var plus=require('../../assets/authScreen/plus.png')
const NewInspection = ({props,navigation}) =>{
    return(
        <View style={styles.mainContainer}>
             <View style={styles.dateTimeContainer}>
                <Text style={styles.refText}>Date: 12-2-2021</Text>
                <Text style={styles.refText}>Ref  id: 10099499</Text>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Add photos and comments</Text>
            </View>
            <View style={styles.commentContainer}>
                <View style={styles.camCommentView}>
                    <View style={styles.camBtn}>
                        <TouchableOpacity>
                            <Image style={{width:50,height:50}} source={addPhoto}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.commentView}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Project Name"}
                        />
                    </View>
                    <View style={styles.addCommentView}>
                        <TouchableOpacity style={styles.addBtn}>
                            <Image style={{width:20,height:20}} source={plus}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.footerBtnView}>
                <TouchableOpacity style={styles.commonBtn}>
                    <Text style={styles.commonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default NewInspection;
const styles = StyleSheet.create({
    mainContainer:{
        height:'100%',
        width:'100%',
    },
    dateTimeContainer:{
        height:'5%',
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
        paddingTop:20
    },
    titleText:{
        color:'#4F4F4F',
        fontSize:18,
        fontFamily:'poppins-semiBold'
    },
    camCommentView:{
        height:50,
        width:"100%",
        flexDirection:'row'
    },
    camBtn:{
        width:"20%",
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    commentContainer:{
        height:'75%',
        width:'100%',
        paddingTop:30
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
    commentView:{
        width:'60%'
    },
    addCommentView:{
        width:"20%",
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    addBtn:{
        justifyContent:'center',
         backgroundColor:'#F6F9FB',
         borderWidth:1,
         borderColor:'#E2ECF2',
         padding: 15,
         borderRadius:14
     },
     footerBtnView:{
        height:'10%',
        width:'100%',
        paddingRight:20,
        paddingLeft:20
     },
     commonBtn:{
        height:50,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:14,
        borderWidth:3,
        borderColor:'#1073AC',
    },
    commonText:{
        color:'#1073AC',
        fontSize:18,
        fontFamily:'poppins-semiBold'
    },
})