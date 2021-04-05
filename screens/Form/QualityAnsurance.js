import React,{useState} from 'react';
import { View,StyleSheet,Image,CheckBox,TouchableOpacity,ScrollView,TextInput} from 'react-native';
import {Text} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';

var plus=require('../../assets/authScreen/plus.png')
const QualityInssurance = ({props,navigation}) =>{
    const [issuranceArray,setInsuraanceArray]=useState([
        {title:"Inspection prior to Mist coat (Make Ready Sheet)"},
        {title:"Mist Coat (1st coat) "},
        {title:"Ensure all areas are mist coated properly for e.g. uneven paint application (Snag Sheet)"},
        {title:"Inspect Prior to Main Decoration (Make Ready Sheet)"},
        {title:"Apply 1st coat of Undercoat to woodworks",secondTitle:"Apply 2rd coat to walls and ceilings "},
        {title:"Apply 2nd coat to woodworks",secondTitle:"3rd coat to walls and ceilings"},
        {title:"Hoover all dust and debris before final coat to woodworks."},
        {title:"Apply 3rd/final coat to the woodworks"},
        {title:"In the event where the decorators do get paint on the fittings,furniture’s, floors or any unpainted surfaces, these should be left paint free."},
        {title:"Supervisor to issue a Snag Sheet to the decorator/s after they have completed their decoration works"},
        {title:"Supervisor to ensure that items flagged on the snag sheets are all completed during the de-snag/inspection."},
        {title:"Hand over units/plots (Hand over sheets to be signed by site managers to confirm that quality is met)."},
        {title:"Site Managers Snag (inspection of units by site manager by issuing supervisor with their written snag sheet/s)."},
        {title:"Site Managers De-snag"},
        {title:"Builders/Client Final Snag (inspection of units by issuing written snag sheet/s)"},
        {title:"Builders/Client De-snag "},
        {title:"Hand over sheets for final visit to units/plots"}

    ])
    const [keyArray,setKeyArray]=useState([
        {keys:"C =",keyDetails:"Completed (Quality met)"},
        {keys:"D =",keyDetails:"Design Failure"},
        {keys:"M =",keyDetails:"Material Failure"},
        {keys:"P =",keyDetails:"Plant Failure"},
        {keys:"ShapePT =",keyDetails:"Proceeding Trade"},
        {keys:"Q =",keyDetails:"Quality Failure"},
        {keys:"S =",keyDetails:"System of work Failure"},
        {keys:"O = ",keyDetails:"Others"}
    ])
    const [newRow,setNewRow]=useState([]);

    const addRow = () =>{
        setNewRow(oldArray=>[...oldArray,{area:'1',description:'2',yes:"no",comments:"hi"}])
    }
    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);
    return(
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Quality Assurance Inpection CheckList</Text>
            </View>
            <ScrollView style={{height:"100%"}}>
                <View style={styles.formConatiner}>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Project"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Unit/Plot"}
                        />
                    </View>
                </View>
                <View style={styles.tableViewContainer}>
                    <View style={styles.tableHeader}>
                        <View style={styles.headerTitleView}>
                            <Text style={styles.headerTitle}>Activity</Text>
                        </View>
                        <View style={styles.headerTitleView}>
                            <Text style={styles.headerTitle}>Date Completed</Text>
                        </View>
                        <View style={styles.headerTitleView}>
                            <Text style={styles.headerTitle}>Key Letter </Text>
                        </View>
                        <View style={styles.headerTitleView}>
                            <Text style={styles.headerTitle}>Comments</Text>
                        </View>
                        <View style={styles.headerTitleView}>
                            <Text style={styles.headerTitle}>Site Manager/s to sign * </Text>
                        </View>
                    </View>
                    <View style={{width:"100%"}}>
                        {issuranceArray.map((item,index)=>(
                            <View style={{marginBottom:20,paddingRight:20,paddingLeft:20}}>
                                <View style={styles.activityTitleView}>
                                    <Text style={{fontSize:10,fontFamily:'poppins-semiBold'}}>{item.title}</Text>
                                    {item.secondTitle &&
                                        <Text style={{fontSize:10,fontFamily:'poppins-semiBold'}}>{item.title}</Text>
                                    }
                                </View>
                                <View style={styles.tableBody}>
                                    <View style={styles.inputBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Date Completed"}
                                        />
                                    </View>
                                    <View style={styles.inputBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Key Letter"}
                                        />
                                    </View>
                                    <View style={styles.inputBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Comments"}
                                        />
                                    </View>
                                    <View style={styles.inputBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Sign"}
                                        />
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View>
                        <Text style={{fontSize:10,fontFamily:'poppins-semiBold'}}>Overall comments once all the above is completed: </Text>
                    </View>
                    <View style={styles.tableHeader}>
                        <View style={styles.headerCompletionTitleView}>
                            <Text style={styles.headerCompletionTitle}>KEY</Text>
                        </View>
                        <View style={styles.headerCompletionTitleView}>
                            <Text style={styles.headerCompletionTitle}>Site Mannagers to sign after Completion</Text>
                        </View>
                    </View>
                    <View style={styles.keyActivityDiv}>
                        <View style={{flexDirection:'row'}}>
                            <View style={styles.keyDiv}>
                                {keyArray.map((item,index)=>(
                                    <View style={styles.keyTextView}>
                                        <Text style={{fontSize:10,fontFamily:'poppins-semiBold'}}>{item.keys}</Text>
                                        <Text style={{fontSize:10,fontFamily:'poppins-regular'}}>{item.keyDetails}</Text>
                                    </View> 
                                ))}
                                    
                            </View> 
                            <View style={styles.activityDiv}>
                                <View style={styles.tableActivityHeader}>
                                    <View style={styles.headerActivityTitleView}>
                                        <Text style={styles.headerActivityTitle}>Activity</Text>
                                    </View>
                                    <View style={styles.headerActivityTitleView}>
                                        <Text style={styles.headerActivityTitle}>Date</Text>
                                    </View>
                                    <View style={styles.headerActivityTitleView}>
                                        <Text style={styles.headerActivityTitle}>Sign</Text>
                                    </View>
                                </View>
                                <View style={styles.tableActivityBody}>
                                    <View style={styles.activityListView}>
                                        <View style={styles.activityTitle}>
                                            <Text style={{fontSize:10,fontFamily:'poppins-semiBold'}}>Mist Coat</Text>
                                        </View>
                                        <View style={styles.activityTitle}>
                                            <Text style={{fontSize:10,fontFamily:'poppins-semiBold'}}>Main Decoration</Text>
                                        </View>
                                        <View style={styles.activityTitle}>
                                            <Text style={{fontSize:10,fontFamily:'poppins-semiBold'}}>Site Manager Snag</Text>
                                        </View>
                                        <View style={styles.activityTitle}>
                                            <Text style={{fontSize:10,fontFamily:'poppins-semiBold'}}>Builders/Client Snag</Text>
                                        </View>
                                    </View>
                                    <View style={styles.activityInputView}>
                                        <View style={{flexDirection:'row',width:"100%"}}>
                                            <View style={styles.inputActivityBodyContainer}>
                                                <TextInput
                                                    style={styles.bodyTextInput}
                                                    placeholder={"Date Completed"}
                                                />
                                            </View>
                                            <View style={styles.inputActivityBodyContainer}>
                                                <TextInput
                                                    style={styles.bodyTextInput}
                                                    placeholder={"Sign"}
                                                />
                                            </View>
                                        </View>
                                        <View style={{flexDirection:'row',width:"100%"}}>
                                            <View style={styles.inputActivityBodyContainer}>
                                                <TextInput
                                                    style={styles.bodyTextInput}
                                                    placeholder={"Date Completed"}
                                                />
                                            </View>
                                            <View style={styles.inputActivityBodyContainer}>
                                                <TextInput
                                                    style={styles.bodyTextInput}
                                                    placeholder={"Sign"}
                                                />
                                            </View>
                                        </View>
                                        <View style={{flexDirection:'row',width:"100%"}}>
                                            <View style={styles.inputActivityBodyContainer}>
                                                <TextInput
                                                    style={styles.bodyTextInput}
                                                    placeholder={"Date Completed"}
                                                />
                                            </View>
                                            <View style={styles.inputActivityBodyContainer}>
                                                <TextInput
                                                    style={styles.bodyTextInput}
                                                    placeholder={"Sign"}
                                                />
                                            </View>
                                        </View>
                                        <View style={{flexDirection:'row',width:"100%"}}>
                                            <View style={styles.inputActivityBodyContainer}>
                                                <TextInput
                                                    style={styles.bodyTextInput}
                                                    placeholder={"Date Completed"}
                                                />
                                            </View>
                                            <View style={styles.inputActivityBodyContainer}>
                                                <TextInput
                                                    style={styles.bodyTextInput}
                                                    placeholder={"Sign"}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                                                        
                        </View>
                    </View>
                    <Text><Text>Quality Insurance</Text> is an audit process to verify that the quality of work performed is what was inspected and reported.</Text>
                    <View style={{backgroundColor:"#000",width:"100%",height:".5%",marginBottom:20,marginTop:20}}></View>       
                </View>
                </ScrollView>
        </View>
    )
}
export default QualityInssurance;
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
        marginTop:30,
        paddingLeft:20,
        paddingRight:20
    },
    titleText:{
        color:'#4F4F4F',
        fontSize:18,
        fontFamily:'poppins-semiBold',
        textAlign:'center'
    },
    formConatiner:{
        height:"5%",
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
        height:"2%"
    },
    tableActivityHeader:{
        flexDirection:'row',
        width:"100%",
        borderWidth:1,
    },
    headerTitleView:{
        width:"20%",
        justifyContent:'center',
        alignItems:"center"
    },
    headerCompletionTitleView:{
        width:"50%",
        justifyContent:'center',
        alignItems:"center"
    },
    headerActivityTitleView:{
        width:"33.3%",
        justifyContent:'center',
        alignItems:"center"
    },
    headerTitle:{
        fontSize:8,
        textAlign:'center',
        fontFamily:'poppins-bold'
    },
    headerCompletionTitle:{
        fontSize:8,
        textAlign:'center',
        fontFamily:'poppins-bold'
    },
    headerActivityTitle:{
        fontSize:8,
        textAlign:'center',
        fontFamily:'poppins-bold'
    },
    inputBodyContainer:{
        width:"20%",
    },
    inputActivityBodyContainer:{
        width:"50%",
    },
    bodyTextInput:{
        borderBottomWidth:1,
        borderBottomColor:'#96A8B2',
        padding:5,
        fontSize:12,
        color:'#96A8B2',
        marginLeft:5,
        marginRight:5,
        fontFamily:'poppins-regular',
    },
    tableBody:{
        width:"100%",
        flexDirection:"row",
        marginLeft:"20%"
    },
    tableActivityBody:{
        width:"100%",
        flexDirection:"row",
        height:"100%"
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
        paddingRight:20,
        height:"80%",
        width:"100%",
    },
    keyActivityDiv:{
        width:"100%",
    },
    keyDiv:{
        width:"30%",
        height:"100%",
        paddingTop:10
    },
    activityDiv:{
        width:"70%",
        height:"100%",
        paddingLeft:20
    },
    keyTextView:{
        flexDirection:"row",
        paddingLeft:10,
    },
    activityListView:{
        width:"40%",
        height:"100%"
    },
    activityInputView:{
        width:"60%",
        height:"100%"
    },
    activityTitle:{
        height:40,
        width:"100%",
        padding: 10,
    }
});