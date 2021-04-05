import React,{useState} from 'react';
import { View,Image,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import {Text,CheckBox} from 'native-base';
import styles from '../../../assets/css/styles'
import InputCheckBox from '../../../components/common/inputCheckBox'

var plus=require('../../../assets/authScreen/plus.png')
const HealthSafetyInspection = () =>{

    const [inspectionRow,setInspectionRow]=useState([])
    const [documentRow,setDocumentRow]=useState([
        {title:"All Risk Assessments & Method Statements up to date? "},
        {title:"All COSHH (Control of substances hazardous to Health) assessments available?"},
        {title:"All MSDS (Material Safety Datasheets) available?"},
        {title:"Permits to work required, has it been issued?"},
        {title:"Decorators read and sign the RAMS?"},
        {title:"Toolbox Talk carried out?"},
    ])
    const [generalRow,setGeneralRow]=useState([
        {title:"Appropriate safety signs in place?"},
        {title:"Working area isolated from others?"},
        {title:"Barriers in place?"},
    ])
    const [protectiveRow,setProtectiveRow]=useState([
        {title:"Standard PPE being worn? Boots, Hat, Hi Vis, Coverall"},
        {title:"Extras - goggles/ear defenders?"},
        {title:"Decorators Face Fit Tested?"},
    ])
    const [toolRow,setToolRow]=useState([
        {title:"Have tools had a visual inspection?"},
        {title:"Are casings or leads damaged?"},
        {title:"Have electrical tools been PAT tested?"},
    ])
    const [workingRow,setWorkingRow]=useState([
        {title:"Specific Risk Assessment carried out?"},
        {title:"Ladders/ steps checked and tagged?"},
        {title:"Scaffold/ Mobile tower checked and tagged?"},
        {title:"MEWP (Mobile Elevated Work Platform) checked?"},
        {title:"PASMA/IPAF certificated personnel?"},
        {title:"Means of access suitable?"},
        {title:"Is edge protection needed, is it available?"},
    ])
    const [exposureRow ,setExposureRow]=useState([
        {title:"Specific Risk Assessment carried out?"},
        {title:"Is dust suppression in place when rubbing down?"},
        {title:"Is noise an issue to decorator/others, is it sufficiently controlled, are specific PPE worn?"},
        {title:"Are barriers needed/ used?"},
    ])
    const [wasteRow ,setWasteRow]=useState([
        {title:"Are skips and containers clearly labelled?"},
        {title:"Are there provisions for Product supplier to collect unused product and empty containers?  "},
    ])
    const addInspectionRow = () =>(
        setInspectionRow(oldArray=>[...oldArray,{equ:"",date:"",serial:"",local:"",owner:"",test:""}])
    )
    return(
        <View style={styles.mainContainer}>
            <View style={{paddingTop:30,justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.titleText}>Health Safety Inspection / Monitoring Form </Text>
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
                            placeholder={"Site Supervisor"}
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
                            placeholder={"Project Address"}
                        />
                    </View>
                    <View style={styles.tableViewContainer}>
                        <View style={styles.tableHeader}>
                            <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>Item No.</Text>
                                </View>
                                <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>Location/Issue</Text>
                                </View>
                                <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>Action required</Text>
                                </View>
                                <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>Priority</Text>
                                </View>
                                <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>Action by</Text>
                                </View>
                                <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>Date completed</Text>
                                </View>
                            </View>
                            <View style={{justifyContent:'flex-end',width:"100%",alignItems:"flex-end",marginBottom:10}}>
                                <TouchableOpacity style={styles.addBtn} onPress={()=>addInspectionRow()}>
                                    <Image style={styles.plusBtn} source={plus}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:"column"}}>
                                {inspectionRow.map((item,index)=>(
                                    <View style={styles.tableBody} key={index}>
                                        <View style={styles.inputHarmFullBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Item No"}
                                            />
                                        </View>
                                        <View style={styles.inputHarmFullBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Location"}
                                            />
                                        </View>
                                        <View style={styles.inputHarmFullBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Action required"}
                                            />
                                        </View>
                                        <View style={styles.inputHarmFullBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Priority"}
                                            />
                                        </View>
                                        <View style={styles.inputHarmFullBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Action by"}
                                            />
                                        </View>
                                        <View style={styles.inputHarmFullBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Date completed"}
                                            />
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <Text style={{fontSize:12,fontFamily:'poppins-bold',paddingTop:10,paddingBottom:20}}>Inspection carried out by: </Text>
                        <View style={styles.inputFieldContainer}>
                            <TextInput
                                style={styles.inputField}
                                placeholder={"Name"}
                            />
                        </View>
                        <View style={styles.inputFieldContainer}>
                            <TextInput
                                style={styles.inputField}
                                placeholder={"For"}
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
                                placeholder={"Signed"}
                            />
                        </View>
                        <Text style={{fontSize:12,fontFamily:'poppins-bold'}}>Priority Key</Text>
                        <Text style={{fontSize:12,fontFamily:'poppins-bold'}}>A <Text style={{fontSize:10,fontFamily:'poppins-regular',paddingLeft:20}}>Immediate</Text></Text>
                        <Text style={{fontSize:12,fontFamily:'poppins-bold'}}>B <Text style={{fontSize:10,fontFamily:'poppins-regular',paddingLeft:20}}>One / Two Day</Text></Text>
                        <Text style={{fontSize:12,fontFamily:'poppins-bold'}}>C <Text style={{fontSize:10,fontFamily:'poppins-regular',paddingLeft:20}}>One Week</Text></Text>
                        <Text style={{fontSize:12,fontFamily:'poppins-bold'}}>R <Text style={{fontSize:10,fontFamily:'poppins-regular',paddingLeft:20}}>Recommended</Text></Text>
                        <Text style={{fontSize:12,fontFamily:'poppins-bold',paddingTop:10,paddingBottom:20}}>1. Documentation</Text>
                        <InputCheckBox data={documentRow}/>
                        <Text style={{fontSize:12,fontFamily:'poppins-bold',paddingTop:10,paddingBottom:20}}>2. General</Text>
                        <InputCheckBox data={generalRow}/>
                        <Text style={{fontSize:12,fontFamily:'poppins-bold',paddingTop:10,paddingBottom:20}}>3. Personal Protective Equipment (PPE)</Text>
                        <InputCheckBox data={protectiveRow}/>
                        <Text style={{fontSize:12,fontFamily:'poppins-bold',paddingTop:10,paddingBottom:20}}>4. Tools / Equipment </Text>
                        <InputCheckBox data={toolRow}/>
                        <Text style={{fontSize:12,fontFamily:'poppins-bold',paddingTop:10,paddingBottom:20}}>5. Working at Height</Text>
                        <InputCheckBox data={workingRow}/>
                        <Text style={{fontSize:12,fontFamily:'poppins-bold',paddingTop:10,paddingBottom:20}}>6. Exposure to dust/noise</Text>
                        <InputCheckBox data={exposureRow}/>
                        <Text style={{fontSize:12,fontFamily:'poppins-bold',paddingTop:10,paddingBottom:20}}>7. Waste Management</Text>
                        <InputCheckBox data={wasteRow}/>
                        <Text style={{fontSize:12,fontFamily:'poppins-bold',paddingTop:10,paddingBottom:20}}>8. Any Issues not closed off from previous  </Text>
                        <View style={styles.inputFieldContainer}>
                            <TextInput
                                style={styles.inputField}
                                placeholder={"Any Issues not closed off from previous"}
                            />
                        </View>
                    <View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
export default HealthSafetyInspection;