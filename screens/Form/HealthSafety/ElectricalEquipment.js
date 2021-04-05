import React,{useState} from 'react';
import { View,Image,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import {Text} from 'native-base';
import styles from '../../../assets/css/styles'


var plus=require('../../../assets/authScreen/plus.png')
const ElectricalEquipment = () =>{

    const [equipmentRow,setEquipmentRow]=useState([])
    const addEquipmentRegister = () =>(
        setEquipmentRow(oldArray=>[...oldArray,{equ:"",date:"",serial:"",local:"",owner:"",test:"",nextDate:"",dateOfSite:"",comments:""}])
    )
    return(
        <View style={styles.mainContainer}>
            <View style={{paddingTop:30,justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.titleText}>ELECTRICAL EQUIPMENT REGISTER</Text>
                <Text style={{fontSize:8,fontFamily:'poppins-regular'}}>(Electrical portable tools, lights and leads test record)</Text>
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
                        placeholder={"Supervisor Print & Sign"}
                    />
                </View>
                <View style={styles.inputFieldContainer}>
                    <TextInput
                        style={styles.inputField}
                        placeholder={"Date"}
                    />
                </View>
                <Text style={{fontSize:8,fontFamily:'poppins-regular',textAlign:'center',paddingTop:10,paddingBottom:20}}>All portable electrical equipment is subject to 3 monthly portable appliance testing to be carried out by a competent person</Text>
                <View style={styles.tableViewContainer}>
                    <View style={styles.tableHeader}>
                        <View style={styles.headerEquipmentTitleView}>
                            <Text style={styles.headerTitle}>Equipment</Text>
                        </View>
                        <View style={styles.headerEquipmentTitleView}>
                            <Text style={styles.headerTitle}>Date on-site</Text>
                        </View>
                        <View style={styles.headerEquipmentTitleView}>
                            <Text style={styles.headerTitle}>Serial No</Text>
                        </View>
                        <View style={styles.headerEquipmentTitleView}>
                            <Text style={styles.headerTitle}>Local No</Text>
                        </View>
                        <View style={styles.headerEquipmentTitleView}>
                            <Text style={styles.headerTitle}>Owner if not Top Dec</Text>
                        </View>
                        <View style={styles.headerEquipmentTitleView}>
                            <Text style={styles.headerTitle}>Date of last test</Text>
                        </View>
                        <View style={styles.headerEquipmentTitleView}>
                            <Text style={styles.headerTitle}>Next test due date</Text>
                        </View>
                        <View style={styles.headerEquipmentTitleView}>
                            <Text style={styles.headerTitle}>Date off site</Text>
                        </View>
                        <View style={styles.headerEquipmentTitleView}>
                            <Text style={styles.headerTitle}>Comments</Text>
                        </View>
                    </View>
                    <View style={{justifyContent:'flex-end',width:"100%",alignItems:"flex-end",marginBottom:10}}>
                        <TouchableOpacity style={styles.addBtn} onPress={()=>addEquipmentRegister()}>
                            <Image style={styles.plusBtn} source={plus}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'column'}}>
                            {equipmentRow.length>0 &&
                                equipmentRow.map((el,index)=>(
                                    <View style={styles.tableBody} key={index}>
                                        <View style={styles.inputEquipmentBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Equipment"}
                                            />
                                        </View>
                                        <View style={styles.inputEquipmentBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"On-Site"}
                                            />
                                        </View>
                                        <View style={styles.inputEquipmentBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Serial No"}
                                            />
                                        </View>
                                        <View style={styles.inputEquipmentBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Local No"}
                                            />
                                        </View>
                                        <View style={styles.inputEquipmentBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Top Dec"}
                                            />
                                        </View>
                                        <View style={styles.inputEquipmentBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Last Test"}
                                            />
                                        </View>
                                        <View style={styles.inputEquipmentBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Duw Date"}
                                            />
                                        </View>
                                        <View style={styles.inputEquipmentBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Site"}
                                            />
                                        </View>
                                        <View style={styles.inputEquipmentBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Comments"}
                                            />
                                        </View>
                                    </View>
                                ))
                            }
                        </View>
                        <View style={{width:"100%",height: 2,backgroundColor: "#000",marginTop:20}}></View>
                        <Text style={{fontFamily:'poppins-bold',fontSize:12,paddingTop:10,textAlign:'center'}}>Once completed, please file a copy in the Site Folder and send a copy to our Head Office.</Text>
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
export default ElectricalEquipment;