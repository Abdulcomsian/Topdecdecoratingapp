import React,{useState} from 'react';
import { View,Image,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import {CheckBox, Text} from 'native-base';
import styles from '../../../assets/css/styles'

var mainImage=require('../../../assets/authScreen/Accurate-daywork-sheet-docx.png')
var work=require('../../../assets/authScreen/work.png')
var lift=require('../../../assets/authScreen/lifting.png')
var tools=require('../../../assets/authScreen/tools.png')
var harmful=require('../../../assets/authScreen/harmful.png')
var ppe=require('../../../assets/authScreen/ppe.png')
var keeping=require('../../../assets/authScreen/keeping.png')
var health=require('../../../assets/authScreen/health.png')
var traffic=require('../../../assets/authScreen/traffic.png')
var enviornments=require('../../../assets/authScreen/enviornment.png')
var permit=require('../../../assets/authScreen/permit.png')
var weather=require('../../../assets/authScreen/weather.png')


var plus=require('../../../assets/authScreen/plus.png')
const DailyBreifingForm = () =>{

    const[hazrdArray,setHazrdArray]=useState([]);
    const addHazrdArray = () =>(
        setHazrdArray(oldArray=>[...oldArray,{hazrd:"",action:"",responsible:""}])
    )
    const [dailyArray,setDailyArray]=useState([
        {title:"Supervision"},
        {title:"RiskAssessment"},
        {title:"Method Statement"},
        {title:"Training"},
        {title:"COSHH Assessment"},
        {title:"Plant/Equip certificate"},
        {title:"Exclusion Zones"},
        {title:"Signage"},
        {title:"P.P.E"},
        {title:"Mobile tower checklist"},
        {title:"Emergency procedure"},
        {title:"Hot works"},
        {title:"Drugs & Alcohol"},
        {title:"House keeping"},
        {title:"Permit to work"},
        {title:"Language"},
    ])
    const [jobSafetyArray,setJobSafetyArray]=useState([
        {title:"Work at Height",image:work},
        {title:"Lifting",image:lift},
        {title:"Work at Height",image:work},
        {title:"Electricity",image:work},
        {title:"Tool & Equipment",image:tools},
        {title:"Harmful Substances",image:harmful},
        {title:"PPE",image:ppe},
        {title:"House- keeping",image:keeping},
        {title:"Manual Handling",image:work},
        {title:"Health Hazard",image:health},
        {title:"Traffic Safety",image:traffic},
        {title:"Environmental Hazard",image:enviornments},
        {title:"Permits to Work",image:permit},
        {title:"Weather Conditions",image:weather},
    ])
    const [berifingArray,setBerifingArray]=useState([
        {title:"Have the right skills for the job"},
        {title:"Need a signed permit to work?"},
        {title:"Impact onto others working around us? Who are they?"},
        {title:"Segregated form others working around us?"},
        {title:"Feel good and fit for work? "},
        {title:"Notice any changes to work since the method statement was drafted? "},
    ])
    const [operativeArray,setOperativeArray] = useState([])
    const addOperativeArray = () =>(
        setOperativeArray(oldArray=>[...oldArray,{name:"",sign:""}])
    )

    return(
        <View style={styles.mainContainer}>
            <View style={{paddingTop:30,justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.titleText}>Top Dec’s Daily Briefing Form - SAFE START</Text>
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
                            placeholder={"Supervisor"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Method statement No"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Date"}
                        />
                    </View>

                    <View style={{marginTop:20}}>
                        <Text style={{fontFamily:'poppins-bold',fontSize:10,textAlign:'center'}}>Before each Team Briefing……Ask yourself do I need to discuss!</Text>
                        <View style={{width:"100%",flexDirection:"row",marginTop:10}}>
                            <View style={{width:"50%",flexDirection:"row"}}>
                                <View style={{width:"90%"}}>
                                    <Text style={{fontFamily:'poppins-semiBold',fontSize:10}}>Supervision</Text>
                                </View>
                                <View style={{width:"10%",justifyContent:"flex-end",alignItems:"flex-end",paddingRight:40}}>
                                    <CheckBox/>
                                </View>
                            </View>
                            <View style={{width:"50%",flexDirection:"row"}}>
                                <View style={{width:"90%"}}>
                                    <Text style={{fontFamily:'poppins-semiBold',fontSize:10}}>Risk Assessment</Text>
                                </View>
                                <View style={{width:"10%",justifyContent:"flex-end",alignItems:"flex-end",paddingRight:40}}>
                                    <CheckBox/>
                                </View>
                            </View>
                        </View>
                        <View style={{width:"100%",flexDirection:"row",marginTop:10}}>
                            <View style={{width:"50%",flexDirection:"row"}}>
                                <View style={{width:"90%"}}>
                                    <Text style={{fontFamily:'poppins-semiBold',fontSize:10}}>Method Statement</Text>
                                </View>
                                <View style={{width:"10%",justifyContent:"flex-end",alignItems:"flex-end",paddingRight:40}}>
                                    <CheckBox/>
                                </View>
                            </View>
                            <View style={{width:"50%",flexDirection:"row"}}>
                                <View style={{width:"90%"}}>
                                    <Text style={{fontFamily:'poppins-semiBold',fontSize:10}}>Training</Text>
                                </View>
                                <View style={{width:"10%",justifyContent:"flex-end",alignItems:"flex-end",paddingRight:40}}>
                                    <CheckBox/>
                                </View>
                            </View>
                        </View>
                        <View style={{width:"100%",flexDirection:"row",marginTop:10}}>
                            <View style={{width:"50%",flexDirection:"row"}}>
                                <View style={{width:"90%"}}>
                                    <Text style={{fontFamily:'poppins-semiBold',fontSize:10}}>COSHH Assessment</Text>
                                </View>
                                <View style={{width:"10%",justifyContent:"flex-end",alignItems:"flex-end",paddingRight:40}}>
                                    <CheckBox/>
                                </View>
                            </View>
                            <View style={{width:"50%",flexDirection:"row"}}>
                                <View style={{width:"90%"}}>
                                    <Text style={{fontFamily:'poppins-semiBold',fontSize:10}}>Plant/Equip certificate</Text>
                                </View>
                                <View style={{width:"10%",justifyContent:"flex-end",alignItems:"flex-end",paddingRight:40}}>
                                    <CheckBox/>
                                </View>
                            </View>
                        </View>
                        <View style={{width:"100%",flexDirection:"row",marginTop:10}}>
                            <View style={{width:"50%",flexDirection:"row"}}>
                                <View style={{width:"90%"}}>
                                    <Text style={{fontFamily:'poppins-semiBold',fontSize:10}}>Exclusion Zones</Text>
                                </View>
                                <View style={{width:"10%",justifyContent:"flex-end",alignItems:"flex-end",paddingRight:40}}>
                                    <CheckBox/>
                                </View>
                            </View>
                            <View style={{width:"50%",flexDirection:"row"}}>
                                <View style={{width:"90%"}}>
                                    <Text style={{fontFamily:'poppins-semiBold',fontSize:10}}>Signage</Text>
                                </View>
                                <View style={{width:"10%",justifyContent:"flex-end",alignItems:"flex-end",paddingRight:40}}>
                                    <CheckBox/>
                                </View>
                            </View>
                        </View>
                        <View style={{width:"100%",flexDirection:"row",marginTop:10}}>
                            <View style={{width:"50%",flexDirection:"row"}}>
                                <View style={{width:"90%"}}>
                                    <Text style={{fontFamily:'poppins-semiBold',fontSize:10}}>P.P.E</Text>
                                </View>
                                <View style={{width:"10%",justifyContent:"flex-end",alignItems:"flex-end",paddingRight:40}}>
                                    <CheckBox/>
                                </View>
                            </View>
                            <View style={{width:"50%",flexDirection:"row"}}>
                                <View style={{width:"90%"}}>
                                    <Text style={{fontFamily:'poppins-semiBold',fontSize:10}}>Mobile tower checklist</Text>
                                </View>
                                <View style={{width:"10%",justifyContent:"flex-end",alignItems:"flex-end",paddingRight:40}}>
                                    <CheckBox/>
                                </View>
                            </View>
                        </View>
                        <View style={{width:"100%",flexDirection:"row",marginTop:10}}>
                            <View style={{width:"50%",flexDirection:"row"}}>
                                <View style={{width:"90%"}}>
                                    <Text style={{fontFamily:'poppins-semiBold',fontSize:10}}>Emergency procedure</Text>
                                </View>
                                <View style={{width:"10%",justifyContent:"flex-end",alignItems:"flex-end",paddingRight:40}}>
                                    <CheckBox/>
                                </View>
                            </View>
                            <View style={{width:"50%",flexDirection:"row"}}>
                                <View style={{width:"90%"}}>
                                    <Text style={{fontFamily:'poppins-semiBold',fontSize:10}}>Hotworks</Text>
                                </View>
                                <View style={{width:"10%",justifyContent:"flex-end",alignItems:"flex-end",paddingRight:40}}>
                                    <CheckBox/>
                                </View>
                            </View>
                        </View>
                        <View style={{width:"100%",flexDirection:"row",marginTop:10}}>
                            <View style={{width:"50%",flexDirection:"row"}}>
                                <View style={{width:"90%"}}>
                                    <Text style={{fontFamily:'poppins-semiBold',fontSize:10}}>Drugs & Alcohol</Text>
                                </View>
                                <View style={{width:"10%",justifyContent:"flex-end",alignItems:"flex-end",paddingRight:40}}>
                                    <CheckBox/>
                                </View>
                            </View>
                            <View style={{width:"50%",flexDirection:"row"}}>
                                <View style={{width:"90%"}}>
                                    <Text style={{fontFamily:'poppins-semiBold',fontSize:10}}>House keeping</Text>
                                </View>
                                <View style={{width:"10%",justifyContent:"flex-end",alignItems:"flex-end",paddingRight:40}}>
                                    <CheckBox/>
                                </View>
                            </View>
                        </View>
                        <View style={{width:"100%",flexDirection:"row",marginTop:10}}>
                            <View style={{width:"50%",flexDirection:"row"}}>
                                <View style={{width:"90%"}}>
                                    <Text style={{fontFamily:'poppins-semiBold',fontSize:10}}>Permit to work</Text>
                                </View>
                                <View style={{width:"10%",justifyContent:"flex-end",alignItems:"flex-end",paddingRight:40}}>
                                    <CheckBox/>
                                </View>
                            </View>
                            <View style={{width:"50%",flexDirection:"row"}}>
                                <View style={{width:"90%"}}>
                                    <Text style={{fontFamily:'poppins-semiBold',fontSize:10}}>Language</Text>
                                </View>
                                <View style={{width:"10%",justifyContent:"flex-end",alignItems:"flex-end",paddingRight:40}}>
                                    <CheckBox/>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop:20}}>
                        <Text style={{fontFamily:'poppins-bold',fontSize:10}}>During the briefing ask EVERYONE……Do WE…?</Text>
                        {berifingArray.map((item,index)=>(
                            <View style={{width:"100%",flexDirection:"row",marginTop:10}}>
                                <View style={{width:"100%",flexDirection:"row"}}>
                                    <View style={{width:"90%"}}>
                                        <Text style={{fontFamily:'poppins-semiBold',fontSize:10}}>{item.title}</Text>
                                    </View>
                                    <View style={{width:"10%",justifyContent:"flex-end",alignItems:"flex-end",paddingRight:20}}>
                                        <CheckBox/>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={{marginTop:20,marginBottom:20}}>
                        <Text style={{fontFamily:'poppins-bold',fontSize:10}}>Ask which ‘keys’ WE need to complete this job safely…</Text>
                        {jobSafetyArray.map((item,index)=>(
                            <View style={{width:"100%",flexDirection:"row",marginTop:10}} key={index}>
                                <View style={{width:"100%",flexDirection:"row"}}>
                                    <View style={{width:"60%"}}>
                                        <Text style={{fontFamily:'poppins-semiBold',fontSize:10}}>{item.title}</Text>
                                    </View>
                                    <View style={{width:"30%",justifyContent:"flex-end",alignItems:"flex-end",paddingRight:20}}>
                                        <Image style={{height:50,width:50}} source={item.image}/>
                                    </View>
                                    <View style={{width:"10%",justifyContent:"flex-start",alignItems:"flex-start",paddingRight:30}}>
                                        <CheckBox/>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={styles.tableViewContainer}>
                        <View style={styles.tableHeader}>
                            <View style={styles.headerProjectTitleView}>
                                    <Text style={styles.headerTitle}>What are the Hazards?</Text>
                                </View>
                                <View style={styles.headerProjectTitleView}>
                                    <Text style={styles.headerTitle}>What are the Actions?</Text>
                                </View>
                                <View style={styles.headerProjectTitleView}>
                                    <Text style={styles.headerTitle}>Who (name) will do it?</Text>
                                </View>
                            </View>
                            <View style={styles.tableHeader}>
                                <View style={styles.headerProjectTitleView}>
                                    <Text style={styles.headerTitle}>HAZARD</Text>
                                </View>
                                <View style={styles.headerProjectTitleView}>
                                    <Text style={styles.headerTitle}>ACTION</Text>
                                </View>
                                <View style={styles.headerProjectTitleView}>
                                    <Text style={styles.headerTitle}>WHO IS RESPONSIBLE</Text>
                                </View>
                            </View>
                            <View style={{justifyContent:'flex-end',width:"100%",alignItems:"flex-end",marginBottom:10}}>
                                <TouchableOpacity style={styles.addBtn} onPress={()=>addHazrdArray()}>
                                    <Image style={styles.plusBtn} source={plus}/>
                                </TouchableOpacity>
                            </View>
                            {hazrdArray.map((item,index)=>(
                                <View style={styles.tableBody} key={index}>
                                    <View style={styles.inputHazrdBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"HAZARD"}
                                        />
                                    </View>
                                    <View style={styles.inputHazrdBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"ACTION"}
                                        />
                                    </View>
                                    <View style={styles.inputHazrdBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"WHO IS RESPONSIBLE"}
                                        />
                                    </View>
                                </View>
                            ))}
                            <View style={{paddingTop:30,justifyContent:'center',alignItems:'center',marginBottom:20}}>
                                <Text style={styles.titleText}>Top Dec Daily Briefing Form- SAFE START</Text>
                                <Text style={{fontFamily:'poppins-regular',fontSize:10,textAlign:'center'}}>Operatives: I declare that I have been briefed on the safe system of work. I agree to follow all instructions given in the interest of health and safety and will not place myself, or others in any danger. I am not under the influence of alcohol or drugs.</Text>
                            </View>
                            <View style={styles.tableViewContainer}>
                                <View style={styles.tableHeader}>
                                    <View style={styles.headerWitnessTitleView}>
                                            <Text style={styles.headerTitle}>Names of operatives attending</Text>
                                        </View>
                                        <View style={styles.headerWitnessTitleView}>
                                            <Text style={styles.headerTitle}>Signature</Text>
                                        </View>
                                    </View>
                                    <View style={{justifyContent:'flex-end',width:"100%",alignItems:"flex-end",marginBottom:10}}>
                                        <TouchableOpacity style={styles.addBtn} onPress={()=>addOperativeArray()}>
                                            <Image style={styles.plusBtn} source={plus}/>
                                        </TouchableOpacity>
                                    </View>
                                    {operativeArray.map((item,index)=>(
                                        <View style={styles.tableBody} key={index}>
                                            <Text style={{width: "10%",justifyContent:'center',alignItems:'center',paddingTop:20,ontFamily:'poppins-regular',fontSize:10}}>{index}</Text>
                                            <View style={styles.inputOprativesBodyContainer}>
                                                <TextInput
                                                    style={styles.bodyTextInput}
                                                    placeholder={"HAZARD"}
                                                />
                                            </View>
                                            <View style={styles.inputOprativesBodyContainer}>
                                                <TextInput
                                                    style={styles.bodyTextInput}
                                                    placeholder={"ACTION"}
                                                />
                                            </View>
                                        </View>
                                    ))}
                                    <Text style={{fontFamily:'poppins-regular',fontSize:10,textAlign:'center',marginTop:20}}>Site Supervisor: I confirm that I have brief the operative on the task method statement, generic and specific risk assessment, COSHH assessments, any hazards whilst working, emergency procedures, control measures , P.PE etc.</Text>
                                    <Text style={{fontFamily:'poppins-regular',fontSize:10,textAlign:'center',marginTop:20}}>The supervisor sign to confirm that they have been instructed and understand the above items.</Text>
                                    <Text style={{fontFamily:'poppins-regular',fontSize:10,textAlign:'center',marginTop:20}}>Operative has shown any sign of been under the influence of alcohol or drugs</Text>
                                    <Text style={{fontFamily:'poppins-semiBold',fontSize:10,textAlign:'center',marginTop:20}}>Once completed, please place a copy in the Site Folder and send a copy to Top Dec’s head Office. Also, please give a copy to the Site Staff.</Text>
                                </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )

}
export default DailyBreifingForm;