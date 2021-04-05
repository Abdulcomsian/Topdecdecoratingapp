import React,{useState} from 'react';
import { View,Image,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import {CheckBox, Text} from 'native-base';
import styles from '../../../assets/css/styles'
import { color } from 'react-native-reanimated';

var mainImage=require('../../../assets/authScreen/Accurate-daywork-sheet-docx.png')
var plus=require('../../../assets/authScreen/plus.png')
const Covid = () =>{

    const[attendenceArray,setAttendenceArray]=useState([]);
    const addAttendence = () =>(
        setAttendenceArray(oldArray=>[...oldArray,{print:"",sign:""}])
    )

    const [coshhArray,setCoshhArray]=useState([
        {title:"1. Report this to your supervisor or manager"},
        {title:"2. Avoid touching anything."},
        {title:"3. Cough or sneeze into a tissue and put it in a bin or, if you do not have tissues, cough and sneeze into the crook of your elbow. "},
        {title:"4. Return home immediately, get a coronavirus test done. "},
        {title:"5. You must follow the government guidance on self-isolation."},
        {mainTitle:"DO Not: Go to work if you have:",title:"1. Have a high temperature,"},
        {title:"2. A new and continuous cough."},
        {title:"3. A loss or change to your sense of smell or taste."},
        {mainTitle:"Getting to work – ",title:"1. Wherever possible travel to site alone, using your own transport (for example, a car or bicycle)."},
        {title:"2. Avoid public transport."},
        {mainTitle:"On Site – ",title:"1.	Face covering is mandatory on-site, if you have a ‘reasonable or medical exemption’ please inform the site team.  Reasonable exemption includes:"},
        {title:"-	if you are travelling with someone who requires lip reading"},
        {title:"-	if you suffer from severe distress when you put it on"},
        {title:"-	if you suffer from a disability where you are unable to put it on"},
        {title:"-	when you need to eat, drink or take medication."},
        {title:"-	If it affects your ability to perform strenuous activity"},
        {title:"2.	Wash your hands when you arrive on site, regularly throughout the day (especially if you sneeze or cough and after eating or handling food) and again when you leave site. "},
        {title:"3.	Always keep at least 2 metres away from other workers. This includes while you are working and during breaks and mealtimes – staggered breaks will help achieve this."},
        {title:"4.	Bring your own meals and refillable drinking bottles. Do not share items (for example, cups, small tools, sundries etc.). "},
        {title:"5.	Re-usable PPE should be thoroughly cleaned after use and not shared between workers."},
        {title:"6.	Single use PPE should be disposed of so that it cannot be reused."}

    ])
    return(
        <View style={styles.mainContainer}>
            <View style={styles.imageView}>
                <Image source={mainImage} style={styles.bannerImage}/>
            </View>
            <View style={{paddingTop:30,justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.titleText}>Tool Box Talk – Coronavirus ( COVID - 19 )</Text>
            </View>
            <ScrollView>
                <View style={{paddingLeft:20,paddingRight:20}}>
                    <Text style={{fontFamily:'poppins-regular',fontSize:12}}><Text style={{fontFamily:'poppins-bold',fontSize:12}}>Outline</Text>- This talk covers the ways to maintain your health while working on-site. </Text>
                    <Text style={{fontFamily:'poppins-regular',fontSize:12}}><Text style={{fontFamily:'poppins-bold',fontSize:12}}>Reason</Text>- Coronavirus is a highly contagious disease that can have severe effects on people, especially those who are vulnerable. The virus is likely to pass from person to person in communal areas and where it is not possible to maintain safe distances between persons. If a person is infected while working, it can be passed on through   to families and other contacts. You can spread the virus even if you do not have symptoms. </Text>
                    <Text style={{fontFamily:'poppins-regular',fontSize:12}}><Text style={{fontFamily:'poppins-bold',fontSize:12}}>What to do if you think you are ill whilst onsite </Text>- If you develop a high temperature or a persistent cough whilst at work, you should: </Text>
                    <View style={{marginTop:20}}>
                        {coshhArray.map((item,index)=>(
                            item.mainTitle ?
                            <View key={index}>
                                <Text style={{fontFamily:'poppins-bold',fontSize:16}}>{item.mainTitle}</Text>
                                <Text style={{fontFamily:'poppins-regular',fontSize:12,backgroundColor:item.bgcolor}}>{item.title}</Text>
                            </View>
                            :
                            <View key={index}>
                                <Text style={{fontFamily:'poppins-regular',fontSize:12,backgroundColor:item.bgcolor}}>{item.title}</Text>
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
                    <Text style={{fontFamily:'poppins-bold',fontSize:12,textAlign:'center'}}>Once completed, please file a copy in the Site Folder and send a copy to our Head Office and give a copy to the site staff.</Text>
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
export default Covid;