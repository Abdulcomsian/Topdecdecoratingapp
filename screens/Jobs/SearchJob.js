import React,{useState} from 'react';
import { View,StyleSheet,TouchableOpacity} from 'react-native';
import {Text} from 'native-base';


const SearchJob = ({props,navigation}) =>{
    return(
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Search Jobs</Text>
                <Text style={{textAlign:'center',fontFamily:'poppins-regular',fontSize:14}}>Search a job by either reference ID or Date job created</Text>
            </View>
            <View style={styles.searchByView}>
                <TouchableOpacity style={styles.commonBtn}>
                    <Text style={styles.commonText}>Enter ref id</Text>
                </TouchableOpacity>
                <Text style={{justifyContent:'center',textAlign:'center',marginBottom:20,fontFamily:'poppins-medium',}}>OR</Text>
                <TouchableOpacity style={styles.commonBtn}>
                    <Text style={styles.commonText}>Date:</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footerBtnView}>
                <TouchableOpacity style={styles.commonBtn}>
                    <Text style={styles.commonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default SearchJob;
const styles = StyleSheet.create({
    mainContainer:{
        height:'100%',
        width:'100%',
    },
    titleContainer:{
        height:"20%",
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    titleText:{
        color:'#4F4F4F',
        fontSize:18,
        fontFamily:'poppins-semiBold',
        marginBottom:20
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
    },
    commonText:{
        color:'#1073AC',
        fontSize:18,
        fontFamily:'poppins-semiBold',
    },
    searchByView:{
        height:'65%',
        width:'100%',
        paddingTop:50,
        paddingLeft:20,
        paddingRight:20
    },
    footerBtnView:{
        height:'15%',
        width:'100%',
        padding: 20,
     },
})