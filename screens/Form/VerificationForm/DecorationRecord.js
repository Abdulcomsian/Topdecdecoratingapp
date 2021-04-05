import React,{useState} from 'react';
import { View,StyleSheet,Image,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import {Text} from 'native-base';

var plus=require('../../../assets/authScreen/plus.png')
const DecorationRecord = () =>{
    
    const [decorationRow,setDecorationRow]=useState([]);
    const [decorationSecondRow,setDecorationSecondRow]=useState([]);

    const addDecorationRow = () =>{
        setDecorationRow(oldArray=>[...oldArray,{name:"",block:"",level:"",rooms:"",price:"",plot:"",days:"",date:"",cdate:""}])
    }
    const addDecorationSecondRow = () =>{
        setDecorationSecondRow(oldArray=>[...oldArray,{name:"",block:"",level:"",rooms:"",price:"",plot:"",date:"",cdate:""}])
    }
    return(
        <ScrollView style={{height:"100%"}}>
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Decoration Record</Text>
            </View>
            <View style={{height:"95%",width:"100%"}}>
                <ScrollView style={{height:"100%",paddingLeft:20,paddingRight:20}}>
                <View style={styles.tableViewContainer}>
                        <View style={styles.tableHeader}>
                            <View style={styles.headerTitleView}>
                                <Text style={styles.headerTitle}>Name</Text>
                            </View>
                            <View style={styles.headerTitleView}>
                                <Text style={styles.headerTitle}>Block</Text>
                            </View>
                            <View style={styles.headerTitleView}>
                                <Text style={styles.headerTitle}>Level</Text>
                            </View>
                            <View style={styles.headerTitleView}>
                                <Text style={styles.headerTitle}>Bed Room/s</Text>
                            </View>
                            <View style={styles.headerTitleView}>
                                <Text style={styles.headerTitle}>Price</Text>
                            </View>
                            <View style={styles.headerTitleView}>
                                <Text style={styles.headerTitle}>Plot/Areas</Text>
                            </View>
                            <View style={styles.headerTitleView}>
                                <Text style={styles.headerTitle}>No. of days</Text>
                            </View>
                            <View style={styles.headerTitleView}>
                                <Text style={styles.headerTitle}>Start Date</Text>
                            </View>
                            <View style={styles.headerTitleView}>
                                <Text style={styles.headerTitle}>Completion date</Text>
                            </View>
                        </View>
                        <View style={{width:"100%",justifyContent:"flex-end",alignItems:"flex-end"}}>
                            <View style={styles.inputButtonBodyContainer}>
                                <TouchableOpacity style={styles.addBtn} onPress={()=>addDecorationRow()}>
                                    <Image style={styles.plusBtn} source={plus}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flexDirection:'column'}}>
                        {decorationRow.length>0 &&
                            decorationRow.map((el,index)=>(
                                <View style={styles.tableBody} key={index}>
                                    <View style={styles.inputBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Name"}
                                        />
                                    </View>
                                    <View style={styles.inputBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Block"}
                                        />
                                    </View>
                                    <View style={styles.inputBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"level"}
                                        />
                                    </View>
                                    <View style={styles.inputBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Rooms"}
                                        />
                                    </View>
                                    <View style={styles.inputBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Price"}
                                        />
                                    </View>
                                    <View style={styles.inputBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Plot"}
                                        />
                                    </View>
                                    <View style={styles.inputBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Days"}
                                        />
                                    </View>
                                    <View style={styles.inputBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Date"}
                                        />
                                    </View>
                                    <View style={styles.inputBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Date"}
                                        />
                                    </View>
                                </View>
                            ))
                        }
                        </View>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Decoration Record</Text>
                    </View>
                    <View style={styles.tableViewContainer}>
                        <View style={styles.tableHeader}>
                            <View style={styles.headerDecorationTitleView}>
                                <Text style={styles.headerTitle}>Name</Text>
                            </View>
                            <View style={styles.headerDecorationTitleView}>
                                <Text style={styles.headerTitle}>Block</Text>
                            </View>
                            <View style={styles.headerDecorationTitleView}>
                                <Text style={styles.headerTitle}>Level</Text>
                            </View>
                            <View style={styles.headerDecorationTitleView}>
                                <Text style={styles.headerTitle}>Bed Room/s</Text>
                            </View>
                            <View style={styles.headerDecorationTitleView}>
                                <Text style={styles.headerTitle}>Price</Text>
                            </View>
                            <View style={styles.headerDecorationTitleView}>
                                <Text style={styles.headerTitle}>Plot</Text>
                            </View>
                            <View style={styles.headerDecorationTitleView}>
                                <Text style={styles.headerTitle}>Start Date</Text>
                            </View>
                            <View style={styles.headerDecorationTitleView}>
                                <Text style={styles.headerTitle}>Completion date</Text>
                            </View>
                        </View>
                        <View style={{width:"100%",justifyContent:"flex-end",alignItems:"flex-end"}}>
                            <View style={styles.inputButtonBodyContainer}>
                                <TouchableOpacity style={styles.addBtn} onPress={()=>addDecorationSecondRow()}>
                                    <Image style={styles.plusBtn} source={plus}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flexDirection:'column'}}>
                        {decorationSecondRow.length>0 &&
                            decorationSecondRow.map((el,index)=>(
                                <View style={styles.tableBody} key={index}>
                                    <View style={styles.inputSecondBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Name"}
                                        />
                                    </View>
                                    <View style={styles.inputSecondBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Block"}
                                        />
                                    </View>
                                    <View style={styles.inputSecondBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"level"}
                                        />
                                    </View>
                                    <View style={styles.inputSecondBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Rooms"}
                                        />
                                    </View>
                                    <View style={styles.inputSecondBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Price"}
                                        />
                                    </View>
                                    <View style={styles.inputSecondBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Plot"}
                                        />
                                    </View>
                                    <View style={styles.inputSecondBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Date"}
                                        />
                                    </View>
                                    <View style={styles.inputSecondBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Date"}
                                        />
                                    </View>
                                </View>
                            ))
                        }
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
        </ScrollView>
    )
}
export default DecorationRecord;
const styles = StyleSheet.create({
    mainContainer:{
        height:'100%',
        width:'100%',
        paddingBottom:50
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
    tableHeader:{
        flexDirection:'row',
        width:"100%",
        borderWidth:1,
        marginTop:20
    },
    headerTitleView:{
        width:"11.1%",
        justifyContent:'center',
        alignItems:"center"
    },
    headerDecorationTitleView:{
        width:"12.5%",
        justifyContent:'center',
        alignItems:"center"
    },
    headerTitle:{
        fontSize:8,
        textAlign:'center',
        fontFamily:'poppins-bold'
    },
    plusBtn:{
        width:12,
        height:12,
    },
    addBtn:{
        justifyContent:'center',
        backgroundColor:'#F6F9FB',
        borderWidth:1,
        borderColor:'#E2ECF2',
        padding: 5,
        borderRadius:14,
        marginTop:15
    },
    inputBodyContainer:{
        width:"11.1%",
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
    inputSecondBodyContainer:{
        width:"12.5%",
        justifyContent:'center',
        alignItems:'center'
    }
})