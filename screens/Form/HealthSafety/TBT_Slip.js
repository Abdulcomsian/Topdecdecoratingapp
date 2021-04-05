import React,{useState} from 'react';
import { View,Image,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import {CheckBox, Text} from 'native-base';
import styles from '../../../assets/css/styles'
import { color } from 'react-native-reanimated';

var mainImage=require('../../../assets/authScreen/Accurate-daywork-sheet-docx.png')
var plus=require('../../../assets/authScreen/plus.png')
const TBTSlip = () =>{

    const[attendenceArray,setAttendenceArray]=useState([]);
    const addAttendence = () =>(
        setAttendenceArray(oldArray=>[...oldArray,{print:"",sign:""}])
    )

    const [coshhArray,setCoshhArray]=useState([
        {mainTitle:"Slips, trips and falls",title:"•	Most injuries from slips, trips and falls occur because of poor housekeeping."},
        {title:"•	Many items left on the ground, such as coiled cables, hand tools, lengths of pipe or timber, will trip someone if not deposited in a safe position."},
        {title:"•	Slip substances, such as oils and greases, will form a slip hazard if not immediately cleaned up."},
        {title:"•	General debris, such as brick and block fragments can quickly accumulate and form a tripping hazard if not cleaned up as it is created."},
        {title:"•	Trailing cables are another frequent cause of tripping."},
        {title:"•	Mud left on the rungs of a ladder by the previous user will represent a slipping and falling hazard for the next person."},
        {title:"•	Reduced levels of natural light, for example during the winter afternoons, can easily increase the tripping hazards if adequate access lighting is not provided. Tools, equipment and materials that are visible in full daylight may be hidden in semi – darkness."},
        {mainTitle:"What can you do about it?",title:"•	Clear up waste materials as you create them. Lightweight waste should be bagged or bundled, and nails removed from waste timber."},
        {title:"•	Do not leave tools, equipment or unused materials lying about on the floor."},
        {title:"•	If you are using substances which could possibly spill, ensure that you have a means of effectively cleaning up the spillage."},
        {title:"•	If cables have to be routed at floor level, try to avoid pedestrian walkways."},
        {title:"•	 If the site is muddy, scrape mud off your boots before climbing ladders or walking anywhere else where it might be a danger to others."},
        {title:"•	Be aware of the increased risks of tripping as the level of natural light fades: ensure that all tool, equipment and materials are stored in a safe location."},
        {mainTitle:"REMEMBER: TIDY UP AS YOU GO, YOUR CARELESSNESS COULD CAUSE SERIOUS INJURIES TO SOMEONE ELSE."}
    ])
    return(
        <View style={styles.mainContainer}>
            <View style={styles.imageView}>
                <Image source={mainImage} style={styles.bannerImage}/>
            </View>
            <View style={{paddingTop:30,justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.titleText}>Tool Box Talk – Slip Trip & Falls</Text>
            </View>
            <ScrollView>
                <View style={{paddingLeft:20,paddingRight:20}}>
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
export default TBTSlip;