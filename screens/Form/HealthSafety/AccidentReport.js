import React,{useState} from 'react';
import { View,Image,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import {CheckBox, Text} from 'native-base';
import styles from '../../../assets/css/styles'


var mainImage=require('../../../assets/authScreen/Accurate-daywork-sheet-docx.png')
var plus=require('../../../assets/authScreen/plus.png')
const AccidentReport = () =>{

    const [callingDetails,setCallingDetails]=useState([
        {title:"Was an ambulance called?"},
        {title:"Where the police called?"},
        {title:"Was Medical treatment sought?"},
        {title:"Was Trauma counselling offered?"}
    ])
    const [witnessArray,setWitnessArray]=useState([])

    const addWitnessRow = () =>{
        setWitnessArray(oldArray=>[...oldArray,{name:"",number:""}])
    }
    return(
        <View style={styles.mainContainer}>
            <View style={styles.imageView}>
                <Image source={mainImage} style={styles.bannerImage}/>
            </View>
            <View style={{paddingTop:30,justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.titleText}>Accident/Incident Report Form</Text>
            </View>
            <ScrollView> 
                <View style={styles.formCodnatiner}>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Full name of person completing this report"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Date and Time of Incident"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Location of Incident"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Date and Time Investigation commenced"}
                        />
                    </View>
                    <View style={{paddingTop:20,paddingBottom:20}}>
                        <Text style={{fontFamily:'poppins-bold',fontSize:12}}>TYPE OF INCIDENT <Text style={{fontFamily:'poppins-regular',fontSize:10}}>(please tick relevant boxes)</Text></Text>
                    </View>
                    <View style={styles.checkBoxDiv}>
                        <View style={styles.firstCheckBoxRow}>
                            <View style={styles.parentCheckBox}>
                                <View style={styles.leftCheckBox}>
                                    <CheckBox/>
                                </View>
                                <View style={styles.rightCheckBox}>
                                    <Text style={styles.accidentText}>Fatality</Text>
                                </View>
                            </View>
                            <View style={styles.parentCheckBox}>
                                <View style={styles.leftCheckBox}>
                                    <CheckBox/>
                                </View>
                                <View style={styles.rightCheckBox}>
                                    <Text style={styles.accidentText}>Major Injury</Text>
                                </View>
                            </View>
                            <View style={styles.parentCheckBox}>
                                <View style={styles.leftCheckBox}>
                                    <CheckBox/>
                                </View>
                                <View style={styles.rightCheckBox}>
                                    <Text style={styles.accidentText}>Over ‘7’ day injury</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.firstCheckBoxRow}>
                            <View style={styles.parentCheckBox}>
                                <View style={styles.leftCheckBox}>
                                    <CheckBox/>
                                </View>
                                <View style={styles.rightCheckBox}>
                                    <Text style={styles.accidentText}>Under ‘7’day injury</Text>
                                </View>
                            </View>
                            <View style={styles.parentCheckBox}>
                                <View style={styles.leftCheckBox}>
                                    <CheckBox/>
                                </View>
                                <View style={styles.rightCheckBox}>
                                    <Text style={styles.accidentText}>In hospital more than 24hrs</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.firstCheckBoxRow}>
                            <View style={styles.parentCheckBox}>
                                <View style={styles.leftCheckBox}>
                                    <CheckBox/>
                                </View>
                                <View style={styles.rightCheckBox}>
                                    <Text style={styles.accidentText}>Over ‘7’ day injury</Text>
                                </View>
                            </View>
                            <View style={styles.parentCheckBox}>
                                <View style={styles.leftCheckBox}>
                                    <CheckBox/>
                                </View>
                                <View style={styles.rightCheckBox}>
                                    <Text style={styles.accidentText}>Dangerous Occurrences</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.firstCheckBoxRow}>
                            <View style={styles.parentCheckBox}>
                                <View style={styles.leftCheckBox}>
                                    <CheckBox/>
                                </View>
                                <View style={styles.rightCheckBox}>
                                    <Text style={styles.accidentText}>No time lost </Text>
                                </View>
                            </View>
                            <View style={styles.parentCheckBox}>
                                <View style={styles.leftCheckBox}>
                                    <CheckBox/>
                                </View>
                                <View style={styles.rightCheckBox}>
                                    <Text style={styles.accidentText}>Member of public/contractor injured</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.firstCheckBoxRow}>
                            <View style={styles.parentCheckBox}>
                                <View style={styles.leftCheckBox}>
                                    <CheckBox/>
                                </View>
                                <View style={styles.rightCheckBox}>
                                    <Text style={styles.accidentText}>Became unconscious</Text>
                                </View>
                            </View>
                            <View style={styles.parentCheckBox}>
                                <View style={styles.leftCheckBox}>
                                    <CheckBox/>
                                </View>
                                <View style={styles.rightCheckBox}>
                                    <Text style={styles.accidentText}>Needed resuscitation </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{paddingTop:20,paddingBottom:10}}>
                        <Text style={{fontFamily:'poppins-bold',fontSize:12}}>THE INJURED PERSON</Text>
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Name of Injured Person"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Age"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Sex"}
                        />
                    </View>
                    <View style={styles.checkBoxDiv}>
                        <View style={styles.firstCheckBoxRow}>
                            <View style={styles.parentCheckBox}>
                                <View style={styles.leftCheckBox}>
                                    <CheckBox/>
                                </View>
                                <View style={styles.rightCheckBox}>
                                    <Text style={styles.accidentText}>Employee</Text>
                                </View>
                            </View>
                            <View style={styles.parentCheckBox}>
                                <View style={styles.leftCheckBox}>
                                    <CheckBox/>
                                </View>
                                <View style={styles.rightCheckBox}>
                                    <Text style={styles.accidentText}>Self Employed</Text>
                                </View>
                            </View>
                            <View style={styles.parentCheckBox}>
                                <View style={styles.leftCheckBox}>
                                    <CheckBox/>
                                </View>
                                <View style={styles.rightCheckBox}>
                                    <Text style={styles.accidentText}>Trainee</Text>
                                </View>
                            </View>
                            <View style={styles.parentCheckBox}>
                                <View style={styles.leftCheckBox}>
                                    <CheckBox/>
                                </View>
                                <View style={styles.rightCheckBox}>
                                    <Text style={styles.accidentText}>Trade Contracto</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"(Please State) Injured Person Name"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Telephone Number"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Occupation when Injured"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Nature of Injury or condition, And the part of the body affected"}
                        />
                    </View>
                    <View style={styles.callingDetailsView}>
                        <View style={{flexDirection:"column"}}>
                            {callingDetails.map((item,index)=>(
                                <View style={styles.detailsContactView} key={index}>
                                    <View style={styles.instructionView}>
                                        <Text style={{fontFamily:'poppins-bold',fontSize:10}}>{item.title}</Text>
                                    </View>
                                    <View style={styles.checkBoxView}>
                                        <View style={styles.firstCheckBoxRow}>
                                            <View style={styles.parentCheckBox}>
                                                <View style={styles.leftCheckBox}>
                                                    <CheckBox/>
                                                </View>
                                                <View style={styles.rightCheckBox}>
                                                    <Text style={styles.accidentText}>No</Text>
                                                </View>
                                            </View>
                                            <View style={styles.parentCheckBox}>
                                                <View style={styles.leftCheckBox}>
                                                    <CheckBox/>
                                                </View>
                                                <View style={styles.rightCheckBox}>
                                                    <Text style={styles.accidentText}>Yes</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.numberView}>
                                        <View style={styles.inputFieldContainer}>
                                            <TextInput
                                                style={styles.inputField}
                                                placeholder={"Incident No"}
                                            />
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                        <View style={styles.inputFieldContainer}>
                            <TextInput
                                multiline={true}
                                numberOfLines={4}
                                style={styles.inputField}
                                placeholder={"INJURED PERSON STATEMENT"}
                            />
                        </View>
                        <View style={styles.witnessStatementView}>
                            <Text style={{fontFamily:'poppins-bold',fontSize:12,paddingTop:10}}>Witness’s names and contact number (attach witness statements if available)</Text>
                            <View style={{justifyContent:'flex-end',width:"100%",alignItems:"flex-end",marginBottom:10}}>
                                <TouchableOpacity style={styles.addBtn} onPress={()=>addWitnessRow()}>
                                    <Image style={styles.plusBtn} source={plus}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.tableViewContainer}>
                                <View style={styles.tableHeader}>
                                    <View style={styles.headerWitnessTitleView}>
                                        <Text style={styles.headerWitnessTitle}>NAME</Text>
                                    </View>
                                    <View style={styles.headerWitnessTitleView}>
                                        <Text style={styles.headerWitnessTitle}>NUMBER</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection:'column'}}>
                                    {witnessArray.length>0 &&
                                        witnessArray.map((el,index)=>(
                                            <View style={styles.tableBody} key={index}>
                                                <View style={styles.inputWitnessBodyContainer}>
                                                    <TextInput
                                                        style={styles.bodyTextInput}
                                                        placeholder={"Name"}
                                                    />
                                                </View>
                                                <View style={styles.inputWitnessBodyContainer}>
                                                    <TextInput
                                                        style={styles.bodyTextInput}
                                                        placeholder={"Number"}
                                                    />
                                                </View>
                                            </View>
                                        ))
                                    }
                                </View>
                                <View style={styles.inputFieldContainer}>
                                    <TextInput
                                        multiline={true}
                                        numberOfLines={4}
                                        style={styles.inputField}
                                        placeholder={"WITNESS STATEMENT"}
                                    />
                                </View>
                                <View style={styles.inputFieldContainer}>
                                    <TextInput
                                        multiline={true}
                                        numberOfLines={4}
                                        style={styles.inputField}
                                        placeholder={"To whom was the accident reported?"}
                                    />
                                </View>
                                <View style={styles.inputFieldContainer}>
                                    <TextInput
                                        multiline={true}
                                        numberOfLines={4}
                                        style={styles.inputField}
                                        placeholder={"When was the accident reported?"}
                                    />
                                </View>
                                <View style={styles.inputFieldContainer}>
                                    <TextInput
                                        multiline={true}
                                        numberOfLines={4}
                                        style={styles.inputField}
                                        placeholder={"Supervisor Name"}
                                    />
                                </View>
                                <View style={styles.inputFieldContainer}>
                                    <TextInput
                                        multiline={true}
                                        numberOfLines={4}
                                        style={styles.inputField}
                                        placeholder={"Signature"}
                                    />
                                </View>
                                <View style={styles.inputFieldContainer}>
                                    <TextInput
                                        multiline={true}
                                        numberOfLines={4}
                                        style={styles.inputField}
                                        placeholder={"Date"}
                                    />
                                </View>
                                <View style={{width:"100%",height: 2,backgroundColor: "#000",marginTop:20}}></View>
                                <Text style={{fontFamily:'poppins-bold',fontSize:12,paddingTop:10}}>MANAGEMENT USE ONLY</Text>
                                <View style={styles.inputFieldContainer}>
                                    <TextInput
                                        style={styles.inputField}
                                        placeholder={"To whom was the accident reported?"}
                                    />
                                </View>
                                <View style={styles.inputFieldContainer}>
                                    <TextInput
                                        style={styles.inputField}
                                        placeholder={"Date and Time accident reported?"}
                                    />
                                </View>
                                <View style={styles.inputFieldContainer}>
                                    <TextInput
                                        multiline={true}
                                        numberOfLines={4}
                                        style={styles.inputField}
                                        placeholder={"Manager/Director comment and initial investigation notes"}
                                    />
                                </View>
                                <View style={styles.inputFieldContainer}>
                                    <TextInput
                                        multiline={true}
                                        numberOfLines={4}
                                        style={styles.inputField}
                                        placeholder={"Manager/Director follow up action required"}
                                    />
                                </View>
                                <View style={styles.inputFieldContainer}>
                                    <TextInput
                                        style={styles.inputField}
                                        placeholder={"Follow up action to be performed by whom?"}
                                    />
                                </View>
                                <View style={styles.detailsContactView}>
                                    <View style={styles.instructionManagmentView}>
                                        <Text style={{fontFamily:'poppins-bold',fontSize:10}}>Will the injured person be off work for more than 7 calendar days?</Text>
                                    </View>
                                    <View style={styles.checkBoxManagmentView}>
                                        <View style={styles.firstCheckBoxRow}>
                                            <View style={styles.parentCheckBox}>
                                                <View style={styles.leftCheckBox}>
                                                    <CheckBox/>
                                                </View>
                                                <View style={styles.rightCheckBox}>
                                                    <Text style={styles.accidentText}>No</Text>
                                                </View>
                                            </View>
                                            <View style={styles.parentCheckBox}>
                                                <View style={styles.leftCheckBox}>
                                                    <CheckBox/>
                                                </View>
                                                <View style={styles.rightCheckBox}>
                                                    <Text style={styles.accidentText}>Yes</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.detailsContactView}>
                                    <View style={styles.instructionManagmentView}>
                                        <Text style={{fontFamily:'poppins-bold',fontSize:10}}>Have all possible actions been taken to prevent Re-occurrence?</Text>
                                    </View>
                                    <View style={styles.checkBoxManagmentView}>
                                        <View style={styles.firstCheckBoxRow}>
                                            <View style={styles.parentCheckBox}>
                                                <View style={styles.leftCheckBox}>
                                                    <CheckBox/>
                                                </View>
                                                <View style={styles.rightCheckBox}>
                                                    <Text style={styles.accidentText}>No</Text>
                                                </View>
                                            </View>
                                            <View style={styles.parentCheckBox}>
                                                <View style={styles.leftCheckBox}>
                                                    <CheckBox/>
                                                </View>
                                                <View style={styles.rightCheckBox}>
                                                    <Text style={styles.accidentText}>Yes</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.inputFieldContainer}>
                                    <TextInput
                                        style={styles.inputField}
                                        placeholder={"Manager/Director Name"}
                                    />
                                </View>
                                <View style={styles.inputFieldContainer}>
                                    <TextInput
                                        style={styles.inputField}
                                        placeholder={"Signature"}
                                    />
                                </View>
                                <View style={styles.inputFieldContainer}>
                                    <TextInput
                                        style={styles.inputField}
                                        placeholder={"Date"}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
export default AccidentReport;
