import React,{useState} from 'react';
import { View,Image,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import {Text,CheckBox} from 'native-base';
import styles from '../../../assets/css/styles'

var plus=require('../../../assets/authScreen/plus.png')
const PuwerInspection = () =>{
    const [puwerArrayList,setPuwerArrayList]=useState([
        {title:"Step ladders",subTitle:"No. 1"},
        {subTitle:"No. 2"},
        {subTitle:"No. 3"},
        {title:"Ladders",subTitle:"No. 1"},
        {subTitle:"No. 2"},
        {title:"Hop Ups",subTitle:"No. 1"},
        {subTitle:"No. 2"},
        {subTitle:"No. 3"},
        {subTitle:"No. 4"},
        {subTitle:"No. 5"},
        {subTitle:"No. 6"},
        {title:"Mobile / Stair Tower",subTitle:"No. 1"},
        {subTitle:"No. 2"},
        {title:"Cherry picker / Scissor lift",subTitle:"No. 1"},
        {title:"Envirowash ES800",subTitle:"No. 1"},
        {title:"Spray Machines: Aristo sprayer QTECH Q-P021/ QP025, Graco GMAX II 3900 ProContractor Series ",subTitle:"No. 1"},
        {title:"Others (please specify)",subTitle:"Task lights, filling knives,"},
        {subTitle:"Pasting table, wallpaper scissors"},
        {subTitle:"Paint mixer, extension/sanding poles"},
        {subTitle:"Stripping knife, window scraper"},
        {subTitle:"Caulker, caulking gun"},
        {subTitle:"PPE"},
        {subTitle:"Skuttle kits & trays"},
    ])
    return(
        <View style={styles.mainContainer}>
            <View style={{paddingTop:30,justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.titleText}>PUWER Inspection Checklist / Register</Text>
            </View>
            <ScrollView>
                <View style={{paddingLeft:20,paddingRight:20}}>
                    <Text style={{fontSize:12,fontFamily:'poppins-regular',paddingTop:10,paddingBottom:20}}>
                        <Text style={{fontSize:12,fontFamily:'poppins-bold'}}>The Provision and Use of Work Regulations 1998 (PUWER)</Text>
                        has specific requirements to help ensure that all work 
                        equipment is suitable and safe for its intended use. More 
                        specifically, Regulation 6 of PUWER requires responsible people and 
                        operators of the equipment to inspect and maintain all such equipment in 
                        order to identify and rectify any potential issues before any harm is caused. 
                    </Text>
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
                    <Text style={{fontSize:12,fontFamily:'poppins-regular',paddingTop:10,paddingBottom:20}}>When carrying out a PUWER Inspection, the following questions are to be considered:</Text>
                    <View>
                        <Text style={{fontSize:12,fontFamily:'poppins-regular'}}>Is the equipment designed for its intended use?</Text>
                        <Text style={{fontSize:10,fontFamily:'poppins-regular'}}>Is their other equipment which is more suitable for the intended use?</Text>
                        <Text style={{fontSize:10,fontFamily:'poppins-regular'}}>Is the equipment free from defects (e.g. frayed cables, not turning on correctly, burning smells, damaged casing, missing parts/guards etc.)?</Text>
                        <Text style={{fontSize:10,fontFamily:'poppins-regular'}}>Are safety guards in place, well maintained and operational?</Text>
                        <Text style={{fontSize:10,fontFamily:'poppins-regular'}}>Are the equipment Inspected and Tagged </Text>
                        <Text style={{fontSize:10,fontFamily:'poppins-regular'}}>Do all the control work correctly, including any emergency stop buttons?</Text>
                        <Text style={{fontSize:10,fontFamily:'poppins-regular'}}>Have operators been provided with suitable and sufficient training in the use of the specific work equipment?</Text>
                        <Text style={{fontSize:10,fontFamily:'poppins-regular'}}>Does the operator have the necessary PASMA/IPAF certificate to operate equipment?</Text>
                        <Text style={{fontSize:10,fontFamily:'poppins-regular'}}>Does the operators have suitable and applicable PPE?</Text>
                        <Text style={{fontSize:10,fontFamily:'poppins-regular'}}>Are there guards or other measures in place to prevent injuries from ejection, entanglement, collapse, overheating, falling items, or overturning?</Text>
                        <Text style={{fontSize:10,fontFamily:'poppins-regular',paddingBottom:20}}>Are start and stop features clear, easy to use, and functioning correctly? Including the emergency stop?</Text>
                        <View style={styles.tableViewContainer}>
                            <View style={styles.tableHeader}>
                                <View style={styles.headerInspectionTitleView}>
                                        <Text style={styles.headerTitle}>Equipments</Text>
                                    </View>
                                    <View style={styles.headerInspectionTitleView}>
                                        <Text style={styles.headerTitle}>Equipment Location</Text>
                                    </View>
                                    <View style={styles.headerInspectionTitleView}>
                                        <Text style={styles.headerTitle}>Inspected by: (Print Name)</Text>
                                    </View>
                                    <View style={styles.headerInspectionTitleView}>
                                        <Text style={styles.headerTitle}>Equipment in good working condition Y/N/N/A </Text>
                                    </View>
                                    <View style={styles.headerInspectionTitleView}>
                                        <Text style={styles.headerTitle}>Inspection date</Text>
                                    </View>
                                </View>
                                {puwerArrayList.map((item,index)=>(
                                    item.title ?
                                    <View key={index}>
                                        <View>
                                            <Text style={{fontSize:12,fontFamily:'poppins-bold',paddingTop:10,paddingBottom:20}}>{item.title}</Text>
                                            <Text style={{fontSize:12,fontFamily:'poppins-regular'}}>{item.subTitle}</Text>
                                        </View>
                                        <View style={styles.tableBody}>
                                            <View style={styles.inputInspectionBodyContainer}>
                                                <TextInput
                                                    style={styles.bodyTextInput}
                                                    placeholder={"Equipments"}
                                                />
                                            </View>
                                            <View style={styles.inputInspectionBodyContainer}>
                                                <TextInput
                                                    style={styles.bodyTextInput}
                                                    placeholder={"Location"}
                                                />
                                            </View>
                                            <View style={styles.inputInspectionBodyContainer}>
                                                <TextInput
                                                    style={styles.bodyTextInput}
                                                    placeholder={"Inspection"}
                                                />
                                            </View>
                                            <View style={styles.inputInspectionBodyContainer}>
                                                <TextInput
                                                    style={styles.bodyTextInput}
                                                    placeholder={"N/A"}
                                                />
                                            </View>
                                            <View style={styles.inputInspectionBodyContainer}>
                                                <TextInput
                                                    style={styles.bodyTextInput}
                                                    placeholder={"Date"}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                    :
                                    <View key={index}>
                                    <View>
                                        <Text style={{fontSize:12,fontFamily:'poppins-regular',paddingTop:20}}>{item.subTitle}</Text>
                                    </View>
                                    <View style={styles.tableBody}>
                                        <View style={styles.inputInspectionBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Equipments"}
                                            />
                                        </View>
                                        <View style={styles.inputInspectionBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Location"}
                                            />
                                        </View>
                                        <View style={styles.inputInspectionBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Inspection"}
                                            />
                                        </View>
                                        <View style={styles.inputInspectionBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"N/A"}
                                            />
                                        </View>
                                        <View style={styles.inputInspectionBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Date"}
                                            />
                                        </View>
                                    </View>
                                </View>
                                ))}
                                <View style={styles.inputFieldContainer}>
                                    <TextInput
                                        multiline={true}
                                        numberOfLines={4}
                                        style={styles.inputField}
                                        placeholder={"Further comments or action required (please state)"}
                                    />
                                </View>
                                <View style={styles.inputFieldContainer}>
                                    <TextInput
                                        style={styles.inputField}
                                        placeholder={"Supervisor (Print & Sign)"}
                                    />
                                </View>
                                <View style={styles.inputFieldContainer}>
                                    <TextInput
                                        style={styles.inputField}
                                        placeholder={"Date"}
                                    />
                                </View>
                                <Text style={{fontSize:12,fontFamily:'poppins-bold',paddingTop:10,paddingBottom:20,textAlign:"center"}}>Once completed, please file a copy in the Site Folder and send a copy to our Head Office.</Text>
                            </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
export default PuwerInspection;