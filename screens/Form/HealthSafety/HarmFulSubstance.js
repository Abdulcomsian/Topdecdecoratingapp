import React,{useState} from 'react';
import { View,Image,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import {Text,CheckBox} from 'native-base';
import styles from '../../../assets/css/styles'

var plus=require('../../../assets/authScreen/plus.png')
const HarmFulSubstance = () =>{

    const[harmFulRow,setHarmFullRow]=useState([])

    const addHarmfullRow = () =>(
        setHarmFullRow(oldArray=>[...oldArray,{equ:"",date:"",serial:"",local:"",owner:"",test:""}])
    ) 
    return(
        <View style={styles.mainContainer}>
            <View style={{paddingTop:30,justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.titleText}>Harmful Substance Register</Text>
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
                            placeholder={"Date"}
                        />
                    </View>
                    <View style={styles.tableViewContainer}>
                        <View style={styles.tableHeader}>
                            <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>Substance</Text>
                                </View>
                                <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>Location</Text>
                                </View>
                                <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>Potential hazard</Text>
                                </View>
                                <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>Safer alternatives </Text>
                                </View>
                                <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>Protective clothing required Y/N</Text>
                                </View>
                                <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>Supplier MSDS Held Y/N</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{justifyContent:'flex-end',width:"100%",alignItems:"flex-end",marginBottom:10}}>
                            <TouchableOpacity style={styles.addBtn} onPress={()=>addHarmfullRow()}>
                                <Image style={styles.plusBtn} source={plus}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:"column"}}>
                        {harmFulRow.map((item,index)=>(
                            <View style={styles.tableBody} key={index}>
                                <View style={styles.inputHarmFullBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"Substance"}
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
                                        placeholder={"Potential hazard"}
                                    />
                                </View>
                                <View style={styles.inputHarmFullBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"Safer alternatives"}
                                    />
                                </View>
                                <View style={styles.inputHarmFullBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"Protective clothing required Y/N"}
                                    />
                                </View>
                                <View style={styles.inputHarmFullBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"Supplier MSDS Held Y/N"}
                                    />
                                </View>
                            </View>
                        ))}
                       </View>
                </View>
            </ScrollView>
        </View>
    )
}
export default HarmFulSubstance;