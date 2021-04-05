import React,{useState} from 'react';
import { View,Image,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import {Text,CheckBox} from 'native-base';
import styles from '../../../assets/css/styles'

var plus=require('../../../assets/authScreen/plus.png')
const MethodStatement = () =>{

    const [statementArray,setStatementArray]=useState([]);

    const addStatement = ()=>{
        setStatementArray(oldArray=>[...oldArray,{name:"",sign:"",company:"",date:"",translation:"",translator:""}])
    }
    return(
        <View style={styles.mainContainer}>
            <View style={{paddingTop:30,justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.titleText}>Method Statement Register</Text>
            </View>
            <ScrollView>
                <View style={styles.formCodnatiner}>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Method Statement Title"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Main Contractor"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Project"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Ref No"}
                        />
                    </View>
                    <Text style={{fontSize:12,fontFamily:'poppins-regular',paddingTop:10,paddingBottom:20}}>
                        We, the undersigned, confirm that we have been briefed on / read and understood the Method Statement as detailed above, together with the Risk Assessments (including COSHH Assessments) associated with the works and will ensure that our actions reflect the safe systems of work identified therein. 
                    </Text>
                    <View style={styles.tableViewContainer}>
                        <View style={styles.tableHeader}>
                            <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>Name</Text>
                                </View>
                                <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>Signature</Text>
                                </View>
                                <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>Company</Text>
                                </View>
                                <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>Date</Text>
                                </View>
                                <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>Translation required (Yes/No) </Text>
                                </View>
                                <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>Name of Translator</Text>
                                </View>
                            </View>
                            <View style={{justifyContent:'flex-end',width:"100%",alignItems:"flex-end",marginBottom:10}}>
                                <TouchableOpacity style={styles.addBtn} onPress={()=>addStatement()}>
                                    <Image style={styles.plusBtn} source={plus}/>
                                </TouchableOpacity>
                            </View>
                            {statementArray.map((item,index)=>(
                            <View style={styles.tableBody} key={index}>
                                        <View style={styles.inputHarmFullBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Name"}
                                            />
                                        </View>
                                        <View style={styles.inputHarmFullBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Signature"}
                                            />
                                        </View>
                                        <View style={styles.inputHarmFullBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Company"}
                                            />
                                        </View>
                                        <View style={styles.inputHarmFullBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Date"}
                                            />
                                        </View>
                                        <View style={styles.inputHarmFullBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Yes/No"}
                                            />
                                        </View>
                                        <View style={styles.inputHarmFullBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Translator"}
                                            />
                                        </View>
                                    </View>
                            ))}
                            <View style={styles.inputFieldContainer}>
                                <TextInput
                                    style={styles.inputField}
                                    placeholder={"Name of Supervisor"}
                                />
                            </View>
                            <View style={styles.inputFieldContainer}>
                                <TextInput
                                    style={styles.inputField}
                                    placeholder={"Signature"}
                                />
                            </View>
                            <Text style={{fontSize:12,fontFamily:'poppins-bold',paddingTop:10,paddingBottom:20,textAlign:"center"}}>Once completed, please file a copy in the Site Folder and send a copy to our Head Office.</Text>
                        </View>
                    </View>
            </ScrollView>
        </View>
    )
}
export default MethodStatement;