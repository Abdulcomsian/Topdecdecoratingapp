import React,{useState} from 'react';
import { View,StyleSheet,Image,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import {Text} from 'native-base';


const DecorationRecord = () =>{
    return(
        <ScrollView style={{height:"100%"}}>
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Site Instruction</Text>
            </View>
           
                <View style={styles.formCodnatiner}>
                        <View style={styles.inputFieldContainer}>
                            <TextInput
                                style={styles.inputField}
                                placeholder={"Contract Name"}
                            />
                        </View>
                        <View style={styles.inputFieldContainer}>
                            <TextInput
                                style={styles.inputField}
                                placeholder={"Instruction No"}
                            />
                        </View>
                        <View style={styles.inputFieldContainer}>
                            <TextInput
                                style={styles.inputField}
                                placeholder={"Raised by"}
                            />
                        </View>
                        <View style={styles.inputFieldContainer}>
                            <TextInput
                                style={styles.inputField}
                                placeholder={"Date"}
                            />
                        </View>
                        <View style={styles.inputFieldContainer}>
                            <TextInput
                                style={styles.inputField}
                                placeholder={"Detailed Description of works to be carried out including its location"}
                            />
                        </View>
                        <View style={styles.inputFieldContainer}>
                            <TextInput
                                style={styles.inputField}
                                placeholder={"Any special conditions or notes"}
                            />
                        </View>
                        <View style={{paddingTop:20,paddingBottom:20}}>
                            <Text style={{ fontFamily:'poppins-bold',fontSize:8}}>The works as instructed above are to be carried out in accordance with clause 2 and 9 of the agreed Contract Terms. It is the responsibility of the supervisor to manage the dayworks and DO NOT exceed the agreed figure for the daywork rates. If there are any changes throughout the process the supervisor should kindly inform the relevant Top Dec Managers before proceeding.  </Text>
                        </View>
                        <View style={styles.instructionView}>
                            <View style={styles.leftView}>
                                <Text style={{fontFamily:'poppins-bold',fontSize:10}}>A</Text>
                                <Text style={{fontFamily:'poppins-bold',fontSize:10}}>B</Text>
                                <Text style={{fontFamily:'poppins-bold',fontSize:10}}>C</Text>
                                <Text style={{fontFamily:'poppins-bold',fontSize:10}}>D</Text>
                                <Text style={{fontFamily:'poppins-bold',fontSize:10}}>E</Text>
                            </View>
                            <View style={styles.rightView}>
                                <Text style={{fontFamily:'poppins-regular',fontSize:9,paddingTop:2}}>Cost to be set off against bad workmanship by other decorators</Text>
                                <Text style={{fontFamily:'poppins-regular',fontSize:9,paddingTop:2}}>Cost to be set off against client </Text>
                                <Text style={{fontFamily:'poppins-regular',fontSize:9,paddingTop:2}}>Contract agreed hours</Text>
                                <Text style={{fontFamily:'poppins-regular',fontSize:9,paddingTop:2}}>Non-recoverable cost </Text>
                                <Text style={{fontFamily:'poppins-regular',fontSize:9,paddingTop:2}}>Client – Extra works (Site Instruction)</Text>
                            </View>
                        </View>
                        <View style={{paddingTop:20,paddingBottom:20}}>
                            <Text style={{ fontFamily:'poppins-bold',fontSize:8}}>For and on behalf of Top Dec Decorating Limited.</Text>
                        </View>
                        <View style={styles.instructionView}>
                            <View style={styles.leftDistributionView}>
                                <View style={{width:"50%",marginRight:5}}>
                                    <View style={styles.inputFieldContainer}>
                                        <TextInput
                                            style={styles.inputField}
                                            placeholder={"Supervisor"}
                                        />
                                    </View>
                                </View>
                                <View style={{width:"50%",marginRight:5}}>
                                    <View style={styles.inputFieldContainer}>
                                        <TextInput
                                            style={styles.inputField}
                                            placeholder={"Date"}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.rightDistributionView}>
                                <Text style={{ fontFamily:'poppins-bold',fontSize:8}}>Distribution:</Text>
                                <View style={{paddingLeft:10}}>
                                    <Text style={{ fontFamily:'poppins-regular',fontSize:8}}>Top Dec Accounts</Text>
                                    <Text style={{ fontFamily:'poppins-regular',fontSize:8}}>Managing Director</Text>
                                    <Text style={{ fontFamily:'poppins-regular',fontSize:8}}>Accountant</Text>
                                </View>
                            </View>
                        </View>
                </View>
        </View>
        </ScrollView>
    )
}
export default DecorationRecord;
const styles = StyleSheet.create({
    mainContainer:{
        height:'100%',
        width:'100%',
        paddingLeft:20,
        paddingRight:20,
        paddingBottom:50
    },
    titleContainer:{
        height:"5%",
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:30
    },
    titleText:{
        color:'#4F4F4F',
        fontSize:18,
        fontFamily:'poppins-semiBold'
    },
    formCodnatiner:{
        width:"100%"
    },
    inputFieldContainer:{
        width:'100%',
    },
    inputField:{
        height:52,
        width:'100%',
        borderBottomWidth:1,
        borderBottomColor:'#96A8B2',
        padding:5,
        fontSize:12,
        color:'#96A8B2',
        fontFamily:'poppins-regular'
    },
    instructionView:{
        borderWidth:1,
        paddingLeft:5,
        paddingRight:5,
        width:"100%",
        flexDirection:"row",
    },
    leftView:{
        borderRightWidth:1,
        width:"5%"
    },
    rightView:{
        width:"95%",
        paddingLeft:10
    },
    leftDistributionView:{
        width:"70%",
        flexDirection:'row',
        borderRightWidth:1
    },
    rightDistributionView:{
        width:"30%",
        padding: 10,
    }
})