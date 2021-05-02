import React,{useState} from 'react';
import { View,Image,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import {CheckBox, Text} from 'native-base';
import styles from '../../assets/css/styles'

var mainImage=require('../../assets/authScreen/Accurate-daywork-sheet-docx.png')
var plus=require('../../assets/authScreen/plus.png')
const tbtForm = (props)=>{
    const {navigation}=props;
    return(
        <View>
            <View style={styles.imageView}>
                <Image source={mainImage} style={styles.bannerImage}/>
            </View>
            <View style={{paddingTop:30,justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.titleText}>{props.title}</Text>
            </View>
                <View style={{paddingLeft:20,paddingRight:20}}>
                    <Text style={{fontFamily:'poppins-regular',fontSize:12}}><Text style={{fontFamily:'poppins-bold',fontSize:12}}>Outline</Text>- This talk covers the ways to maintain your health while working on-site. </Text>
                    <Text style={{fontFamily:'poppins-regular',fontSize:12}}><Text style={{fontFamily:'poppins-bold',fontSize:12}}>Reason</Text>- Coronavirus is a highly contagious disease that can have severe effects on people, especially those who are vulnerable. The virus is likely to pass from person to person in communal areas and where it is not possible to maintain safe distances between persons. If a person is infected while working, it can be passed on through   to families and other contacts. You can spread the virus even if you do not have symptoms. </Text>
                    <Text style={{fontFamily:'poppins-regular',fontSize:12}}><Text style={{fontFamily:'poppins-bold',fontSize:12}}>What to do if you think you are ill whilst onsite </Text>- If you develop a high temperature or a persistent cough whilst at work, you should: </Text>
                    <View style={{marginTop:20}}>
                        {props.data.map((item,index)=>(
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
                        
                        {props.secondArray.map((item,index)=>(
                            <View style={styles.tableBody} key={index}>
                            <Text style={{width: "10%",justifyContent:'center',alignItems:'center',paddingTop:20,fontFamily:'poppins-regular',fontSize:10}}>{index}</Text>
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
        </View>
    )
}
export default tbtForm;