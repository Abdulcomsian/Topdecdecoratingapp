import React,{useState} from 'react';
import { View,StyleSheet,Image,TouchableOpacity} from 'react-native';
import {Text} from 'native-base';


var tick=require('../../assets/authScreen/check.png')
var rightArrow=require('../../assets/authScreen/right.png')
const FormTemplate = ({props,navigation}) =>{
    const [formArray,setFormArray]=useState([
        {tickSign:tick,text:"Site inspections",url:"NewSiteInspection"},
        {tickSign:tick,text:"Add photos and comments",url:"AddPhotoComment"},
    ]);
    return(
        <View style={styles.mainContainer}>
             <View style={styles.dateTimeContainer}>
                <Text style={styles.refText}>Date: 12-2-2021</Text>
                <Text style={styles.refText}>Ref  id: 10099499</Text>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Form Template</Text>
            </View>
            {formArray.map((item,index)=>(
            <View style={styles.listView}>
                <View style={styles.tickSign}>
                   <Image  source={item.tickSign}/>
               </View>
               <View style={styles.textArowView}>
                    <TouchableOpacity style={styles.textArrow} onPress={() => navigation.navigate(item.url)}>
                        <Text style={{color:"#1073AC",marginRight:10,fontFamily:'poppins-semiBold',fontSize:14}}>{item.text}</Text>
                        <Image  source={rightArrow}/>
                    </TouchableOpacity>
                </View>
            </View>
            ))}
            <View style={{paddingLeft:20,paddingRight:20}}>
                <TouchableOpacity style={styles.commonBtn}>
                    <Text style={styles.commonText}>Save</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}
export default FormTemplate;
const styles = StyleSheet.create({
    mainContainer:{
        height:'100%',
        width:'100%',
        paddingLeft:10,
        paddingRight:10
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
        marginTop:20,
        marginBottom:30
    },
    titleText:{
        color:'#4F4F4F',
        fontSize:18,
        fontFamily:'poppins-semiBold'
    },
    listView:{
        width:'100%',
        height:"10%",
        flexDirection:'row',
    },
    textArowView:{
        width:'85%',
        justifyContent:'center',
        alignItems:'center',
    },
    tickSign:{
        width:'10%',
        justifyContent: 'center',
        alignItems:'center',
        marginRight:10
    },
    textArrow:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderWidth:2,
        paddingRight:20,
        paddingLeft:20,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#F6F9FB',
        borderColor:'#E2ECF2',
        borderRadius:14,
        width:'100%'
    },
    commonBtn:{
        height:50,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:14,
        borderWidth:3,
        borderColor:'#1073AC',
        marginBottom:40,
        marginTop:40,
    },
    commonText:{
        color:'#1073AC',
        fontSize:18,
        fontFamily:'poppins-semiBold'
    }
})