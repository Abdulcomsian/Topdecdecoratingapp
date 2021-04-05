import React,{useState} from 'react';
import { View,Image,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import {Text} from 'native-base';
import styles from '../../../assets/css/styles'


var mainImage=require('../../../assets/authScreen/Accurate-daywork-sheet-docx.png')
var plus=require('../../../assets/authScreen/plus.png')
const OnSiteDecoration = () =>{

    const[siteArray,setSiteArray]=useState([]);

    const addSiteArray = () =>(
        setSiteArray(oldArray=>[...oldArray,{name:"",number:"",date:"",sign:""}])
    )
    return(
        <View style={styles.mainContainer}>
            <View style={styles.imageView}>
                <Image source={mainImage} style={styles.bannerImage}/>
            </View>
            <View style={{paddingTop:30,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontFamily:'poppins-regular',fontSize:12,textAlign:'center'}}>Names and CSCS card registration Nos. of painters to be used during the project painting </Text>
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
                    <View style={styles.tableViewContainer}>
                        <View style={styles.tableHeader}>
                            <View style={styles.headerLadderListTitleView}>
                                    <Text style={styles.headerTitle}>Name</Text>
                                </View>
                                <View style={styles.headerLadderListTitleView}>
                                    <Text style={styles.headerTitle}>CSCS Card no</Text>
                                </View>
                                <View style={styles.headerLadderListTitleView}>
                                    <Text style={styles.headerTitle}>CSCS card expiry date</Text>
                                </View>
                                <View style={styles.headerLadderListTitleView}>
                                    <Text style={styles.headerTitle}>Signature</Text>
                                </View>
                            </View>
                            <View style={{justifyContent:'flex-end',width:"100%",alignItems:"flex-end",marginBottom:10}}>
                                <TouchableOpacity style={styles.addBtn} onPress={()=>addSiteArray()}>
                                    <Image style={styles.plusBtn} source={plus}/>
                                </TouchableOpacity>
                            </View>
                            {siteArray.map((item,index)=>(
                                <View style={styles.tableBody} key={index}>
                                    <View style={styles.inputSiteBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Name"}
                                        />
                                    </View>
                                    <View style={styles.inputSiteBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"CSCS Card no"}
                                        />
                                    </View>
                                    <View style={styles.inputSiteBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"CSCS card expiry date"}
                                        />
                                    </View>
                                    <View style={styles.inputSiteBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Signature"}
                                        />
                                    </View>
                                </View>
                            ))}
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
            </ScrollView>
        </View>
    )
}
export default OnSiteDecoration;