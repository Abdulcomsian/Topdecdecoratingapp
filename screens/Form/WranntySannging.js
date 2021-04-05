import React,{useState} from 'react';
import { View,StyleSheet,Image,CheckBox,TouchableOpacity,ScrollView,TextInput} from 'react-native';
import {Text} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';

var plus=require('../../assets/authScreen/plus.png')
const WrantySannging = ({props,navigation}) =>{

    const [newRow,setNewRow]=useState([]);

    const addRow = () =>{
        setNewRow(oldArray=>[...oldArray,{area:'1',description:'2',yes:"no",comments:"hi"}])
    }
    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);
    return(
        <View style={styles.mainContainer}>
            <View style={styles.infoAbout}>
                <View style={styles.commonView}>
                    <Text style={{fontFamily:'poppins-bold',fontSize:10}}>Block:</Text>
                    <Text style={{paddingLeft:10,fontSize:10}}>001</Text>
                </View>
                <View style={styles.commonView}>
                    <Text style={{fontFamily:'poppins-bold',fontSize:10}}>Plot No:</Text>
                    <Text style={{paddingLeft:10,fontSize:10}}>001</Text>
                </View>
            </View>
            <View style={styles.infoAbout}>
                <View style={styles.commonView}>
                    <Text style={{fontFamily:'poppins-bold',fontSize:10}}>Date of issue:</Text>
                    <Text style={{paddingLeft:10,fontSize:10}}>001</Text>
                </View>
                <View style={styles.commonView}>
                    <Text style={{fontFamily:'poppins-bold',fontSize:10}}>Date of completion required:</Text>
                    <Text style={{paddingLeft:10,fontSize:10}}>001</Text>
                </View>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Snagging to be completed within 24 hours</Text>
            </View>
            <ScrollView style={{height:"100%"}}>
           
                <View style={styles.tableViewContainer}>
                    <View style={styles.tableHeader}>
                        <View style={styles.headerTitleView}>
                            <Text style={styles.headerTitle}>Location</Text>
                        </View>
                        <View style={styles.headerTitleView}>
                            <Text style={styles.headerTitle}>Snag Description</Text>
                        </View>
                        <View style={styles.headerTitleView}>
                            <Text style={styles.headerTitle}>Action</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'column'}}>
                    {newRow.length>0 &&
                        newRow.map((el,index)=>(
                            <View style={styles.tableBody} key={index}>
                                <View style={styles.inputBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"Location"}
                                    />
                                </View>
                                <View style={styles.inputBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"Description"}
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
                                        placeholder={"Location"}
                                    />
                                </View>
                                <View style={styles.inputBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"Description"}
                                    />
                                </View>
                            <View style={{width:"33.3%",justifyContent:'center',alignItems:'center'}}>
                                <TouchableOpacity style={styles.addBtn} onPress={()=>addRow()}>
                                    <Image style={styles.plusBtn} source={plus}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                </View>
                <View style={styles.infoAbout}>
                    <View style={styles.commonView}>
                        <Text style={{fontFamily:'poppins-bold',fontSize:10}}>Snagging issued by:</Text>
                        <Text style={{paddingLeft:10,fontSize:10}}>001</Text>
                    </View>
                    <View style={styles.commonView}>
                        <Text style={{fontFamily:'poppins-bold',fontSize:10}}>Completed by:</Text>
                        <Text style={{paddingLeft:10,fontSize:10}}>001</Text>
                    </View>
                </View>
                <View style={styles.infoAbout}>
                    <View style={styles.commonView}>
                        <Text style={{fontFamily:'poppins-bold',fontSize:10}}>Hours:</Text>
                        <Text style={{paddingLeft:10,fontSize:10}}>001</Text>
                    </View>
                </View>
                <View style={styles.tableViewContainer}>
                    <View style={styles.tableHeader}>
                        <View style={styles.headerTitleView}>
                            <Text style={styles.headerTitle}>Location</Text>
                        </View>
                        <View style={styles.headerTitleView}>
                            <Text style={styles.headerTitle}>Snag Description</Text>
                        </View>
                        <View style={styles.headerTitleView}>
                            <Text style={styles.headerTitle}>Action</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'column'}}>
                    {newRow.length>0 &&
                        newRow.map((el,index)=>(
                            <View style={styles.tableBody} key={index}>
                                <View style={styles.inputBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"Location"}
                                    />
                                </View>
                                <View style={styles.inputBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"Description"}
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
                                        placeholder={"Location"}
                                    />
                                </View>
                                <View style={styles.inputBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"Description"}
                                    />
                                </View>
                            <View style={{width:"33.3%",justifyContent:'center',alignItems:'center'}}>
                                <TouchableOpacity style={styles.addBtn} onPress={()=>addRow()}>
                                    <Image style={styles.plusBtn} source={plus}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                </View>
               
                        <View style={{backgroundColor:"#000",width:"100%",height:".5%",marginBottom:20,marginTop:20}}></View>
                </ScrollView>
        </View>
    )
}
export default WrantySannging;
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
        textAlign:"center"
    },
    titleText:{
        color:'#4F4F4F',
        fontSize:18,
        fontFamily:'poppins-semiBold',
        textAlign:"center"
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
        width:"33.3%",
        justifyContent:'center',
        alignItems:"center"
    },
    headerTitle:{
        fontSize:12,
        textAlign:'center',
        fontFamily:'poppins-bold'
    },
    inputBodyContainer:{
        width:"33.3%",
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
        flexDirection:"row",
        marginBottom:20
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
    },
    infoAbout:{
        width:"100%",
        height:"10%",
        flexDirection:"row",
        paddingLeft:20,
        paddingRight:20
    },
    commonView:{
        height:"100%",
        width: "50%",
        flexDirection:"row",
        paddingTop:10
    }
});