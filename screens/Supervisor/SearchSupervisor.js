import React from 'react';
import { View,StyleSheet,Image,TextInput,TouchableOpacity,ScrollView} from 'react-native';
import {Text} from 'native-base';

const SearchSupervisor = ({props,navigation}) =>{
    return(
        <View style={styles.mainContainer}>
            <View style={styles.dateTimeContainer}>
                <Text style={styles.refText}>Date: 12-2-2021</Text>
                <Text style={styles.refText}>Ref  id: 10099499</Text>
            </View>
            
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Search Supervisor</Text>
            </View>
            <View style={styles.formConatiner}>
                <View style={styles.inputFieldContainer}>
                    <TextInput
                        style={styles.inputField}
                        placeholder={"Enter your Supervisor Name"}
                    />
                </View>
                <View style={styles.inputFieldContainer}>
                    <TextInput
                        style={styles.inputField}
                        placeholder={"Enter your Supervisor ID"}
                    />
                </View>
                <View style={styles.inputFieldContainer}>
                    <TextInput
                        style={styles.inputField}
                        placeholder={"Enter your Supervisor Email"}
                    />
                </View>
            </View>
            <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.commonBtn} onPress={() => navigation.navigate('DetailSupervisor')}>
                        <Text style={styles.commonText}>Search</Text>
                    </TouchableOpacity>
                </View>
        </View>
    )
}
export default SearchSupervisor;
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
        height:'70%',
        width:'100%',
        padding:30,
        alignItems:'center',
    },
    inputFieldContainer:{
        height:"15%",
        width:'100%',
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
    btnContainer:{
        width:'100%',
        height:"15%",
        paddingLeft:20,
        paddingRight:20,
        paddingTop:20
    },
});