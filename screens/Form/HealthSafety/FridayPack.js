import React,{useState} from 'react';
import { View,TextInput,ScrollView} from 'react-native';
import {Text,CheckBox} from 'native-base';
import styles from '../../../assets/css/styles'

const FridayPack = () =>{

    const [documentRow,setDocumentRow]=useState([
        {title:"Record of on-site Decorators (Name & CSCS Card Details)"},
        {title:"Method Statement Register"},
        {title:"Safe Start Briefing"},
        {title:"Housekeeping Checklist"},
        {title:"Electrical Equipment Record"},
        {title:"Harmful Substance Register"},
        {title:"Health and Safety Inspection and Monitoring Form"},
        {title:"Personal Protective Equipment Issued Record"},
        {title:"PUWER Inspection Checklist / Register"},
        {title:"Toolbox Talk (Please list topic discussed)"},
        {title:"Working at Height Equipment / Inventory Control  "},
        {title:"Ladders and Podium Step Inspection Checklist "},
    ]);

    
    return(
        <View style={styles.mainContainer}>
             <View style={{paddingTop:30,justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.titleText}>FRIDAY PACK</Text>
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
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Week Ending"}
                        />
                    </View>
                        <View style={{flexDirection:"column"}}>
                        {documentRow.map((item,index)=>(
                                <View style={styles.detailsInstructionContactView} key={index}>
                                    <View style={{flexDirection:'row'}}>
                                                <View style={styles.instructionFridayView}>
                                                    <Text style={{fontFamily:'poppins-bold',fontSize:10}}>{item.title}</Text>
                                                </View>
                                                <View style={styles.checkBoxInstructionView}>
                                                    <View style={styles.firstInstructionCheckBoxRow}>
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
                                                        <View style={styles.parentCheckBox}>
                                                            <View style={styles.leftCheckBox}>
                                                                <CheckBox/>
                                                            </View>
                                                            <View style={styles.rightCheckBox}>
                                                                <Text style={styles.accidentText}>N/A</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                                </View>
                                                <View style={styles.inputFieldContainer}>
                                                    <TextInput
                                                        style={styles.inputField}
                                                        placeholder={"Comments"}
                                                    />
                                                </View>
                                        </View>
                        ))}
                        </View>
                        <View style={styles.inputFieldContainer}>
                            <TextInput
                                multiline={true}
                                numberOfLines={4}
                                style={styles.inputField}
                                placeholder={"Any Further Comments"}
                            />
                        </View>
                        <View style={styles.inputFieldContainer}>
                            <TextInput
                                multiline={true}
                                numberOfLines={4}
                                style={styles.inputField}
                                placeholder={"Supervisor (Print & Sign)"}
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
                        <Text style={{fontFamily:'poppins-bold',fontSize:12,paddingTop:10,textAlign:'center'}}>Once completed, please file a copy in the Site Folder and send a copy to our Head Office.</Text>
                </View>
            </ScrollView>
        </View>
    )
}
export default FridayPack;