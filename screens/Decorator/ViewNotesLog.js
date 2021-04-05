import React,{useState} from 'react';
import { View,StyleSheet,Image,TouchableOpacity} from 'react-native';
import {Text} from 'native-base';

var rightArrow=require('../../assets/authScreen/right.png')
const ViewNotes = ({props,navigation}) =>{
    const [plotArray,setPlotArray]=useState([
        {Date:"1-March-2021"},
        {Date:"5-March-2021"},
        {Date:"10-March-2021"},
    ]);
    return(
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>View Notes</Text>
            </View>
            <View style={{padding:30}}>
            {plotArray.map((item,index)=>(
                <TouchableOpacity style={styles.commonBtn}>
                    <Text style={styles.commonText}>{item.Date}</Text>
                    <Image  source={rightArrow}/>
                </TouchableOpacity>
            ))}
            </View>
        </View>
    )
}
export default ViewNotes;
const styles = StyleSheet.create({
    mainContainer:{
        height:'100%',
        width:'100%',
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
        fontFamily:'poppins-semiBold',
    },
    commonBtn:{
        height:50,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:14,
        borderWidth:3,
        borderColor:'#1073AC',
        marginBottom:20,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingRight:10,
        paddingLeft:10
    },
    commonText:{
        color:'#1073AC',
        fontSize:16,
        fontFamily:'poppins-semiBold'
    }
})