import React,{useState} from 'react';
import { View,StyleSheet,Image,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import {CheckBox, Text} from 'native-base';
import styles from '../../../assets/css/styles'


var plus=require('../../../assets/authScreen/plus.png')
const CleanUp = () =>{

    const [cleanUpRow,setCleanUpRow]=useState([])

    const addCleanUpRow = () =>{
        setCleanUpRow(oldArray=>[...oldArray,{block:"",level:"",plot:"",area:"",cleanItem:"",date:"",comment:""}])
    }
    return(
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Notice to Clean up</Text>
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
                            placeholder={"Name of Operative/s"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Date & Time of issue"}
                        />
                    </View>
                   
                    <View style={styles.tableViewContainer}>
                        <View style={styles.tableHeader}>
                            <View style={styles.headerCleanTitleView}>
                                <Text style={styles.headerTitle}>Block</Text>
                            </View>
                            <View style={styles.headerCleanTitleView}>
                                <Text style={styles.headerTitle}>Level</Text>
                            </View>
                            <View style={styles.headerCleanTitleView}>
                                <Text style={styles.headerTitle}>Plot/s</Text>
                            </View>
                            <View style={styles.headerCleanTitleView}>
                                <Text style={styles.headerTitle}>Areas</Text>
                            </View>
                            <View style={styles.headerCleanTitleView}>
                                <Text style={styles.headerTitle}>Item Clean</Text>
                            </View>
                            <View style={styles.headerCleanTitleView}>
                                <Text style={styles.headerTitle}>Date completed</Text>
                            </View>
                            <View style={styles.headerCleanTitleView}>
                                <Text style={styles.headerTitle}>Comments</Text>
                            </View>
                        </View>
                         <View style={{justifyContent:'flex-end',width:"100%",alignItems:"flex-end",marginBottom:10}}>
                            <TouchableOpacity style={styles.addBtn} onPress={()=>addCleanUpRow()}>
                                <Image style={styles.plusBtn} source={plus}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'column'}}>
                            {cleanUpRow.length>0 &&
                                cleanUpRow.map((el,index)=>(
                                    <View style={styles.tableBody} key={index}>
                                        <View style={styles.inputCleanBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Block"}
                                            />
                                        </View>
                                        <View style={styles.inputCleanBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Level"}
                                            />
                                        </View>
                                        <View style={styles.inputCleanBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Plots"}
                                            />
                                        </View>
                                        <View style={styles.inputCleanBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Area"}
                                            />
                                        </View>
                                        <View style={styles.inputCleanBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Clean"}
                                            />
                                        </View>
                                        <View style={styles.inputCleanBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Date"}
                                            />
                                        </View>
                                        <View style={styles.inputCleanBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                                placeholder={"Comments"}
                                            />
                                        </View>
                                    </View>
                                ))
                            }
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
                        <View style={{width:"100%",height: 2,backgroundColor: "#000",marginTop:20}}></View>
                        <Text style={{fontFamily:'poppins-bold',fontSize:12,paddingTop:10}}>Once completed, please file a copy in the Site Folder and send a copy to our Head Office.   </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
export default CleanUp;