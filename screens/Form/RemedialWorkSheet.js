import React,{useState} from 'react';
import { View,StyleSheet,Image,CheckBox,TouchableOpacity,ScrollView,TextInput} from 'react-native';
import {Text} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';

var plus=require('../../assets/authScreen/plus.png')
const RemedialWork = ({props,navigation}) =>{

    const [newRow,setNewRow]=useState([]);

    const addRow = () =>{
        setNewRow(oldArray=>[...oldArray,{area:'1',description:'2',yes:"no",comments:"hi"}])
    }
    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);
    return(
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>REMEDIAL WORK SHEET</Text>
            </View>
            <ScrollView style={{height:"100%"}}>
            <View style={styles.formConatiner}>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Main Contractor Name"}
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
                            placeholder={"Operative"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Sheet Number"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Block"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Plot/Area Number"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Date Issue to Site team"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Site Instruction Number"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={" Reason for Work"}
                        />
                    </View>
                </View>
                <View style={styles.tableViewContainer}>
                    <View style={styles.tableHeader}>
                        <View style={styles.headerTitleView}>
                            <Text style={styles.headerTitle}>AREA/UNITS</Text>
                        </View>
                        <View style={styles.headerTitleView}>
                            <Text style={styles.headerTitle}>DESCRIPTION</Text>
                        </View>
                        <View style={styles.headerTitleView}>
                            <Text style={styles.headerTitle}>NUMBER OF PHOTO</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'column'}}>
                    {newRow.length>0 &&
                        newRow.map((el,index)=>(
                            <View style={styles.tableBody} key={index}>
                                <View style={styles.inputBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"Area/unit"}
                                    />
                                </View>
                                <View style={styles.inputBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"Description"}
                                    />
                                </View>
                                <View style={styles.inputBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"No of photo"}
                                    />
                                </View>
                            </View>
                        ))
                    }
                    </View>
                    <View style={styles.tableBody}>
                    <View style={styles.inputBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"Area/unit"}
                                    />
                                </View>
                                <View style={styles.inputBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"Description"}
                                    />
                                </View>
                                <View style={styles.inputBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"No of photo"}
                                    />
                                </View>
                            <View style={styles.inputBodyContainer}>
                                <TouchableOpacity style={styles.addBtn} onPress={()=>addRow()}>
                                    <Image style={styles.plusBtn} source={plus}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.inputFieldContainer}>
                            <TextInput
                                style={styles.inputField}
                                placeholder={"Hours"}
                            />
                        </View>
                        <Text style={{paddingTop:20,paddingBottom:20,color:"#96A8B2",fontSize:12}}>I can confirm by signing this form that I have inspect the above Areas/Units and they are completed.  </Text>
                        <View style={styles.inputFieldContainer}>
                            <TextInput
                                style={styles.inputField}
                                placeholder={"Supervisor"}
                            />
                        </View>
                        <View style={styles.inputFieldContainer}>
                            <TextInput
                                style={styles.inputField}
                                placeholder={"Signature"}
                            />
                        </View>
                        <View style={styles.inputFieldContainer}>
                            <TextInput
                                style={styles.inputField}
                                placeholder={"Date"}
                            />
                        </View>
                        <Text style={{paddingTop:20,paddingBottom:20,color:"#96A8B2",fontSize:12}}>I have checked these areas / units and I can confirm they are remedial work.</Text>
                        <View style={styles.inputFieldContainer}>
                            <TextInput
                                style={styles.inputField}
                                placeholder={"Site Manager (Print name)"}
                            />
                        </View>
                        <View style={styles.inputFieldContainer}>
                            <TextInput
                                style={styles.inputField}
                                placeholder={"Signature"}
                            />
                        </View>
                        <View style={styles.inputFieldContainer}>
                            <TextInput
                                style={styles.inputField}
                                placeholder={"Date"}
                            />
                        </View>
                        <View style={{backgroundColor:"#000",width:"100%",height:".5%",marginBottom:20,marginTop:20}}></View>
                </View>
                </ScrollView>
        </View>
    )
}
export default RemedialWork;
const styles = StyleSheet.create({
    mainContainer:{
        height:'100%',
        width:'100%',
    },
    titleContainer:{
        height:"5%",
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:30
    },
    titleText:{
        color:'#4F4F4F',
        fontSize:18,
        fontFamily:'poppins-semiBold'
    },
    formConatiner:{
        flex: 1,
        paddingRight:20,
        paddingLeft:20,
        marginTop:30
    },
    inputFieldContainer:{
        width:'100%',
    },
    inputField:{
        height:52,
        width:'100%',
        borderBottomWidth:1,
        borderBottomColor:'#96A8B2',
        padding:5,
        fontSize:12,
        color:'#96A8B2',
        fontFamily:'poppins-regular'
    },
    inputContainer:{
        justifyContent:'center',
        flexDirection:'row',
        alignItems:'center',
        width:'80%'
    },
    tableHeader:{
        flexDirection:'row',
        width:"100%",
        marginTop:30,
        borderWidth:1,
    },
    headerTitleView:{
        width:"25%",
        justifyContent:'center',
        alignItems:"center"
    },
    headerTitle:{
        fontSize:8,
        textAlign:'center',
        fontFamily:'poppins-bold'
    },
    inputBodyContainer:{
        width:"25%",
        justifyContent:'center',
        alignItems:'center'
    },
    bodyTextInput:{
        borderBottomWidth:1,
        borderBottomColor:'#96A8B2',
        padding:5,
        fontSize:12,
        color:'#96A8B2',
        marginLeft:2,
        marginRight:2,
        fontFamily:'poppins-regular',
    },
    tableBody:{
        width:"100%",
        flexDirection:"row"
    },
    plusBtn:{
        width:12,
        height:12,
        justifyContent:'center'
    },
    addBtn:{
        justifyContent:'center',
        backgroundColor:'#F6F9FB',
        borderWidth:1,
        borderColor:'#E2ECF2',
        padding: 5,
        borderRadius:14
    },
    tableViewContainer:{
        paddingLeft:20,
        paddingRight:20
    }
});