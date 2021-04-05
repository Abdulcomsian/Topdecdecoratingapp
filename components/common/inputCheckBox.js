import React,{useState} from 'react';
import { View,Image,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import {Text,CheckBox} from 'native-base';
import styles from '../../assets/css/styles'

const inputCheckBox = (props) =>{
    return(
        <View>
            {props.data.map((item,index)=>(
                <View style={styles.detailsInstructionContactView} key={index}>
                    <View style={{flexDirection:'row'}}>
                        <View style={styles.instructionFridayView}>
                            <Text style={{fontFamily:'poppins-bold',fontSize:10}}>{item.title}</Text>
                        </View>
                        <View style={styles.checkBoxInstructionView}>
                            <View style={styles.firstInstructionCheckBoxRow}>
                                <View style={styles.parentCheckBox}>
                                    <View style={styles.leftCheckBox}>
                                        <CheckBox/>
                                    </View>
                                    <View style={styles.rightCheckBox}>
                                        <Text style={styles.accidentText}>Y/N</Text>
                                    </View>
                                </View>
                                <View style={styles.parentCheckBox}>
                                    <View style={styles.leftCheckBox}>
                                        <CheckBox/>
                                    </View>
                                    <View style={styles.rightCheckBox}>
                                        <Text style={styles.accidentText}>N/A</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Comments"}
                        />
                    </View>
                </View>
            ))}
        </View>
    )
}
export default inputCheckBox;