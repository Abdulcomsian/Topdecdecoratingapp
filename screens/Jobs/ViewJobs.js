import React,{useState} from 'react';
import { View,StyleSheet,Image,TextInput,TouchableOpacity} from 'react-native';
import {Text} from 'native-base';

const ViewJob = ({props,navigation}) =>{
    return(
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Search/View Jobs</Text>
            </View>
            <View style={{padding:30}}>
                {/* <TouchableOpacity style={styles.commonBtn} onPress={() => navigation.navigate('SelectProject')}>
                    <Text style={styles.commonText}>View your assigned Jobs</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.commonBtn} onPress={() => navigation.navigate('SearchJob')}>
                    <Text style={styles.commonText}>Search job</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default ViewJob;
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
    },
    commonText:{
        color:'#1073AC',
        fontSize:16,
        fontFamily:'poppins-semiBold'
    }
})