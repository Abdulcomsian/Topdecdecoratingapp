import React,{useState} from 'react';
import { View,Image,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import {CheckBox, Text} from 'native-base';
import styles from '../../../assets/css/styles'
import {check} from 'react-native-vector-icons'

var mainImage=require('../../../assets/authScreen/Accurate-daywork-sheet-docx.png')
var plus=require('../../../assets/authScreen/plus.png')
const TBTHOUSE = () =>{

    const[attendenceArray,setAttendenceArray]=useState([]);
    const addAttendence = () =>(
        setAttendenceArray(oldArray=>[...oldArray,{print:"",sign:""}])
    )

    const [coshhArray,setCoshhArray]=useState([
        {title:"1) Poor housekeeping often results in unsafe conditions and also implies that the project is poorly managed, and the work being done lacks professionalism. Frequently accidents and injuries charged to other causes are actually caused by unsafe conditions due to poor housekeeping."},
        {title:"2) All Operatives are responsible for housekeeping where they are working. Tools that haven’t been put away after use, and materials that are lying around become trip hazards. Scrap should be disposed of promptly. The longer it sits the bigger the clean up task becomes, and the bigger the hazard."},
        {title:"3) We can have clean, easy to navigate, accident free jobs if everyone commits to a clean worksite. Good housekeeping requires continuous effort and attention to make certain the entire job, as well as the work area is kept clean and hazard free. It is up to all of us."},
        {title:"4) Housekeeping starts at the beginning of the shift and needs to continue throughout the entire workday."},
        {title:"5) Top Dec operatives are required to keep all their tools, and sundries i.e. masking tape, sandpaper etc. with them at all times."},
        {title:"6) We are also expected to tidy up any dust, debris after we have completed our works."},
        {title:"7) Lastly Keep walkways free OR it will become a tripping hazard."},
        {mainTitle:"Points to Take With You:",title:"• Remember, good housekeeping promotes safety, makes the task more efficient, and just makes good sense.",img:""},
        {title:"• Do your part by keeping your work area clean and orderly.",img:""},
        {title:"• Good housekeeping will make your job a safer job.",img:""}
    ])
    return(
        <View style={styles.mainContainer}>
            <View style={styles.imageView}>
                <Image source={mainImage} style={styles.bannerImage}/>
            </View>
            <View style={{paddingTop:30,justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.titleText}>Tool Box Talk - Housekeeping</Text>
            </View>
            <ScrollView>
                <View style={{paddingLeft:20,paddingRight:20}}>
                    <Text style={{fontFamily:'poppins-semiBold',fontSize:12}}>Good housekeeping is one of the first rules of accident prevention.</Text>
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
export default TBTHOUSE;