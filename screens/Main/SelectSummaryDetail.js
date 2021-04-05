import React,{useState} from 'react';
import { View,StyleSheet,Image,TouchableOpacity} from 'react-native';
import {Text} from 'native-base';

var rightArrow=require('../../assets/authScreen/right.png')
const SelectSummaryDetail = ({props,navigation}) =>{
    const [plotArray,setPlotArray]=useState([
        {items:"100 - Plots",url:"SelectProject"},
        {items:"8 - Staircare"},
        {items:"16 - Communal areas"},
    ]);
    return(
        <View style={styles.mainContainer}>
            <View style={styles.dateTimeContainer}>
                <Text style={styles.refText}>Date: 12-2-2021</Text>
                <Text style={styles.refText}>Ref  id: 10099499</Text>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Select Summary Details</Text>
            </View>
            <View style={{height:"70%",width:"100%"}}>
                <View style={{paddingTop:30,paddingLeft:20,paddingRight:20}}>
                {plotArray.map((item,index)=>(
                    <TouchableOpacity style={styles.commonBtn} onPress={() => navigation.navigate(item.url)}>
                        <Text style={styles.commonText}>{item.items}</Text>
                        <Image  source={rightArrow}/>
                    </TouchableOpacity>
                ))}
                </View>
            </View>
            <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.saveBtn}>
                            <Text style={styles.commonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
        </View>
    )
}
export default SelectSummaryDetail;
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
        fontFamily:'poppins-semiBold',
        justifyContent:"center"
    },
    btnContainer:{
        width:'100%',
        height:"15%",
        justifyContent:'center',
        paddingRight:20,
        paddingLeft:20
    },
    saveBtn:{
        height:50,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:14,
        borderWidth:3,
        borderColor:'#1073AC'
    }
})