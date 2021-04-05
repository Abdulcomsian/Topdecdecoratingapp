import React,{useState} from 'react';
import { View,Image,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import {CheckBox, Text} from 'native-base';
import styles from '../../../assets/css/styles'

var mainImage=require('../../../assets/authScreen/Accurate-daywork-sheet-docx.png')
var plus=require('../../../assets/authScreen/plus.png')
const TBTCOSHH = () =>{

    const[attendenceArray,setAttendenceArray]=useState([]);
    const addAttendence = () =>(
        setAttendenceArray(oldArray=>[...oldArray,{print:"",sign:""}])
    )

    const [coshhArray,setCoshhArray]=useState([
        {title:"•	Assess the risk to health arising from the work and what precautions are needed."},
        {title:"•	Introduce appropriate measures to prevent or control the risk - use alternative safer substances if possible."},
        {title:"•	Ensure by good supervision that control measures are used and that equipment is properly maintained, and procedures observed."},
        {title:"•	Where necessary, monitor the exposure of the workers and carry out an appropriate form of surveillance of their health."},
        {title:"•	Make sure you are given a COSHH risk assessment for your work activities"},
        {mainTitle:"Points to Remember:",title:"•	You must co-operate with your employer and wear protective equipment when instructed to do so."},
        {title:"•	The Personal Protective Equipment you are given must be in good condition and your employer cannot charge you for the cost of personal protective equipment provided to comply with the requirements of any Risk Assessment."},
        {title:"•	COSHH risk assessments are produced from the manufacturer datasheet and should relate specifically to the work activity you will be carrying out."},
        {title:"•	COSHH risk assessments must be reviewed on a regular basis to ensure their relevance to your working environment and processes."},
    ])
    return(
        <View style={styles.mainContainer}>
            <View style={styles.imageView}>
                <Image source={mainImage} style={styles.bannerImage}/>
            </View>
            <View style={{paddingTop:30,justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.titleText}>Control of Substances Hazardous to Health Regulations 2002(COSHH)-Toolbar Talk</Text>
            </View>
            <ScrollView>
                <View style={{paddingLeft:20,paddingRight:20}}>
                    <Text style={{fontFamily:'poppins-regular',fontSize:12}}><Text style={{fontFamily:'poppins-semiBold',fontSize:12}}>COSHH</Text> - The basic principle of these regulations is to safeguard the health of all of us who have to work with substances that can be hazardous to health. A substance can be a liquid, solid or gas and include micro-organisms and dust. These regulations apply to all places of work. The main requirements of the regulations are for your employer to:</Text>
                    <View style={{marginTop:20}}>
                        {coshhArray.map((item,index)=>(
                            item.mainTitle ?
                            <View key={index}>
                                <Text style={{fontFamily:'poppins-bold',fontSize:16}}>{item.mainTitle}</Text>
                                <Text style={{fontFamily:'poppins-regular',fontSize:12}}>{item.title}</Text>
                            </View>
                            :
                            <View key={index}>
                                <Text style={{fontFamily:'poppins-regular',fontSize:12}}>{item.title}</Text>
                            </View>
                        ))}
                        
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
                            placeholder={"Meeting Conducted By"}
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
                            multiline={true}
                            numberOfLines={4}
                            style={styles.inputField}
                            placeholder={"Comments"}
                        />
                    </View>
                    <Text style={{fontFamily:'poppins-bold',fontSize:16}}>Attendees</Text>
                    <View style={styles.tableViewContainer}>
                        <View style={styles.tableHeader}>
                            <View style={styles.headerWitnessTitleView}>
                                <Text style={styles.headerTitle}>Print</Text>
                            </View>
                            <View style={styles.headerWitnessTitleView}>
                                <Text style={styles.headerTitle}>Signature</Text>
                            </View>
                        </View>
                        <View style={{justifyContent:'flex-end',width:"100%",alignItems:"flex-end",marginBottom:10}}>
                            <TouchableOpacity style={styles.addBtn} onPress={()=>addAttendence()}>
                                <Image style={styles.plusBtn} source={plus}/>
                            </TouchableOpacity>
                        
                        {attendenceArray.map((item,index)=>(
                            <View style={styles.tableBody} key={index}>
                            <Text style={{width: "10%",justifyContent:'center',alignItems:'center',paddingTop:20,ontFamily:'poppins-regular',fontSize:10}}>{index}</Text>
                                <View style={styles.inputOprativesBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"Print"}
                                    />
                                </View>
                                <View style={styles.inputOprativesBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"Sign"}
                                    />
                                </View>
                            </View>
                        ))}
                        
                        </View>
                    </View>
                    <Text style={{fontFamily:'poppins-bold',fontSize:12,textAlign:'center'}}>Once completed, please file a copy in the Site Folder and send a copy to our Head Office also please give a copy to the site staff</Text>
                    <View style={styles.footerView}>
                                <Text style={{fontFamily:'poppins-bold',fontSize:12}}>Address: 2,<Text style={{fontFamily:'poppins-regular',fontSize:10}}> Green Lane, Penge, London SE20 7JA</Text></Text>
                                <Text style={{fontFamily:'poppins-bold',fontSize:12}}>T: <Text style={{fontFamily:'poppins-regular',fontSize:10}}> 0208 676 060</Text></Text>
                                <Text style={{fontFamily:'poppins-bold',fontSize:12}}>F: <Text style={{fontFamily:'poppins-regular',fontSize:10}}> 0208 676 0671</Text></Text>
                                <Text style={{fontFamily:'poppins-bold',fontSize:12}}>M: <Text style={{fontFamily:'poppins-regular',fontSize:10}}> 07737 632206</Text></Text>
                                <Text style={{fontFamily:'poppins-bold',fontSize:12}}>E: <Text style={{fontFamily:'poppins-regular',fontSize:10}}> info@topdecdecorating.com</Text></Text>
                                <Text style={{fontFamily:'poppins-bold',fontSize:12}}>W: <Text style={{fontFamily:'poppins-regular',fontSize:10}}> www.topdecdecorating.com</Text></Text>
                                <Text style={{fontFamily:'poppins-bold',fontSize:12}}>VAT Registration Number: <Text style={{fontFamily:'poppins-regular',fontSize:10}}> 203 474 927</Text></Text>
                            </View>
                </View>
            </ScrollView>
        </View>
    )
}
export default TBTCOSHH;