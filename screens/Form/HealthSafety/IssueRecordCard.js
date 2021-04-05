import React,{useState} from 'react';
import { View,Image,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import {Text,CheckBox} from 'native-base';
import styles from '../../../assets/css/styles'

var plus=require('../../../assets/authScreen/plus.png')
const IssueCard = () =>{
    
    const [issueArray,setIssueArray]=useState([]);

    const addIssue = ()=>{
        setIssueArray(oldArray=>[...oldArray,{item:"",no:"",type:"",date:"",supervisor:"",sign:""}])
    }
    return(
        <View style={styles.mainContainer}>
            <View style={{paddingTop:30,justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.titleText}>PERSONAL PROTECTIVE EQUIPMENT ISSUE RECORD CARD  </Text>
                <Text style={{fontSize:12,fontFamily:'poppins-regular',paddingTop:10,paddingBottom:20,textAlign:"center"}}>(ONE SHEET PER OPERATIVE / EMPLOYEE) </Text>
            </View>
            <ScrollView>
                <View style={styles.formCodnatiner}>
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
                    <Text style={{fontSize:12,fontFamily:'poppins-bold',paddingTop:10}}>Name of Operative / Direct Employee:</Text>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Name of Operative / Direct Employee:"}
                        />
                    </View>
                    <Text style={{fontSize:12,fontFamily:'poppins-regular',paddingTop:10}}>
                        ALL SELF EMPLOYED/EMPLOYEES PROVIDED WITH PPE MUST TAKE REASONABLE STEPS TO ENSURE PPE IS PROPERLY USED IN ACCORDANCE WITH THE TRAINING RECEIVED. ANY LOSS OR DEFECT OF THE P.P.E TO BE REPORTED TO YOUR SUPERVISOR. 
                    </Text>
                    <Text style={{fontSize:8,fontFamily:'poppins-regular',paddingTop:10}}>
                        1. I acknowledge receipt of the following items of personal protective equipment issued to me, by appending my signature adjacent to the item entered on this form.
                    </Text>
                    <Text style={{fontSize:8,fontFamily:'poppins-regular',paddingTop:10}}>
                        2. I fully understand that I must wear the correct PPE as identified in site rules and project/work activity risk assessments when undertaking the work or using a particular tool or equipment. This in accordance to the training I have received.
                    </Text>
                    <Text style={{fontSize:8,fontFamily:'poppins-regular',paddingTop:10}}>
                        3. I will ensure that the PPE is properly cared for and maintained in accordance with instruction given. When not in use my PPE will be kept secure in accommodation provided or as advised.
                    </Text>
                    <Text style={{fontSize:8,fontFamily:'poppins-regular',paddingTop:10,paddingBottom:20}}>
                        4. I will report all loss or defects to the issued PPE to my supervisor.
                    </Text>
                    <View style={styles.tableViewContainer}>
                        <View style={styles.tableHeader}>
                            <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>ITEM</Text>
                                </View>
                                <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>No</Text>
                                </View>
                                <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>TYPE/Ser No</Text>
                                </View>
                                <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>DATE OF ISSUE</Text>
                                </View>
                                <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>NAME OF SUPERVISOR</Text>
                                </View>
                                <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>SIGNATURE</Text>
                                </View>
                            </View>
                            <View style={{justifyContent:'flex-end',width:"100%",alignItems:"flex-end",marginBottom:10}}>
                                <TouchableOpacity style={styles.addBtn} onPress={()=>addIssue()}>
                                    <Image style={styles.plusBtn} source={plus}/>
                                </TouchableOpacity>
                            </View>
                            {issueArray.map((item,index)=>(
                            <View style={styles.tableBody} key={index}>
                                        <View style={styles.inputHarmFullBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Item"}
                                            />
                                        </View>
                                        <View style={styles.inputHarmFullBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"No"}
                                            />
                                        </View>
                                        <View style={styles.inputHarmFullBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Type"}
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
                                                placeholder={"Supervisor"}
                                            />
                                        </View>
                                        <View style={styles.inputHarmFullBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Signature"}
                                            />
                                        </View>
                                    </View>
                            ))}
                            <Text style={{fontSize:12,fontFamily:'poppins-bold',paddingTop:10,paddingBottom:20,textAlign:"center"}}>Once completed, please file a copy in the Site Folder and send a copy to our Head Office.</Text>
                        </View>
                </View>
            </ScrollView>
        </View>
    )
}
export default IssueCard;