import React,{useState} from 'react';
import { View,Image,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import {Text} from 'native-base';
import styles from '../../../assets/css/styles'

const RecordOfProject = () =>{

    const [recordArray,setRecordArray]=useState([
        {title:"Any medical conditions/change in medical condition during this project Must be brought to the attention of the supervisor. This information is Required to protect your health and safety, any other details will be treated In strict confidence. "},
        {title:"Do you suffer from epilepsy or fits?"},
        {title:"Are you diabetic needing insulin? "},
        {title:"Do you suffer from Asthma?"},
        {title:"Have you ever had a block-outs, recurrent dizziness or any conditions which Would cause sudden collapse or incapacity?"},
        {title:"Do you suffer from discomfort or pain in the chest or shortness of breath e.g. when climbing stairs.  "},
        {title:"Do you have difficulty hearing normal conversation?"},
        {title:"Are you suffering any other condition or taking any medication for a medical Condition? "},
        {title:"Do you understand that failing that to comply with site rules will result in disciplinary Actions being  taken, which may involve your dismissal from site under the Health and safety at work etc.1974 "},
    ])
    return(
        <View style={styles.mainContainer}>
            <View style={{paddingTop:30,justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.titleText}>RECORD OF PROJECT INDUCTION TRAINING</Text>
                <Text style={{fontFamily:'poppins-regular',fontSize:12,textAlign:'center'}}>FILE IN CONFIDENCE WHEN COMPLETE</Text>
            </View>
            <ScrollView>
                <View style={styles.formCodnatiner}>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"SURNAME"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"MOBILE NO"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"FIRST NAME"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"JOB TITLE"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"ADDRESS"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"TRADE/ CSCS REGISTRATION SCHEME/CARD NO"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"OTHER TRAINING DETAILS"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"NEXT OF KIN"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Your relationship to Next of KIN"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"NEXT OF KIN Contact details"}
                        />
                    </View>
                    <Text style={{fontFamily:'poppins-bold',fontSize:12,marginTop:20,marginBottom:20}}>ANY MEDICAL PROBLEMS *YES / NO (*delete as appropriate)</Text>
                    <View style={styles.tableViewContainer}>
                        <View style={styles.tableHeader}>
                            <View style={styles.headerProjectTitleView}>
                                    <Text style={styles.headerTitle}>DETAILS BELOW </Text>
                                </View>
                                <View style={styles.headerProjectTitleView}>
                                    <Text style={styles.headerTitle}>Yes</Text>
                                </View>
                                <View style={styles.headerProjectTitleView}>
                                    <Text style={styles.headerTitle}>No</Text>
                                </View>
                            </View>
                            {recordArray.map((item,index)=>(
                                <View key={index}> 
                                    <Text style={{fontFamily:'poppins-regular',fontSize:10,paddingTop:20}}>{item.title}</Text>
                                    <View style={styles.tableBody}>
                                        <View style={{flexDirection:"row",width:"100%"}}>
                                            <View style={styles.inputProjectBodyContainer}>
                                                <TextInput
                                                    style={styles.bodyTextInput}
                                                    placeholder={"Yes"}
                                                />
                                            </View>
                                            <View style={styles.inputProjectBodyContainer}>
                                                <TextInput
                                                    style={styles.bodyTextInput}
                                                    placeholder={"No"}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ))}
                            <Text style={{fontFamily:'poppins-bold',fontSize:10,textAlign:'center',marginTop:20}}>IN SIGNING THIS INDUCTION FORM, YOU ACKNOWLEDGE YOUR UNDERSTANDING AND ACCEPTANCE OF WORK METHOD STATEMENT, TOP DEC’S SITE RULES AND SPECIFIC REQUIREMENTS YOU ARE TO ADHERE WHILST WORKING ON THIS PROJECT. </Text>
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
                        </View>
                </View>
            </ScrollView>
        </View>
    )
}
export default RecordOfProject;