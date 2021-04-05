import React,{useState,useRef} from 'react';
import { View,StyleSheet,Image,TouchableOpacity,TextInput} from 'react-native';
import {Text} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

var plus=require('../../assets/authScreen/plus.png')
const Scope = () =>{
    const [newRow,setNewRow]=useState([]);

    const addRow = () =>{
        setNewRow(oldArray=>[...oldArray,{name:'1',Hallway:'2',Bedroom:"no",Diner:"hi",Bathrooms:"2",Ensuite:"5"}])
    }
    return(
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Colour Schedule</Text>
            </View>
            <View style={styles.scopeDescriptionView}>
                <View style={styles.textView}>
                    <Text style={{fontFamily:'poppins-semiBold',paddingRight:10,fontSize:10}}>Frames, doors, skirting boxing:</Text>
                    <Text style={{fontFamily:'poppins-regular',fontSize:10}}>to receive two undercoat, one gloss.</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={{fontFamily:'poppins-semiBold',paddingRight:10,fontSize:10}}>Curtain baton:</Text>
                    <Text style={{fontFamily:'poppins-regular',fontSize:10}}>to fill, rub down caulk and receive a coat of undercoat before emulsion.</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={{fontFamily:'poppins-semiBold',paddingRight:10,fontSize:10}}>Frames, doors, skirting boxing:</Text>
                    <Text style={{fontFamily:'poppins-regular',fontSize:10}}>to receive two undercoat, one gloss.</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={{fontFamily:'poppins-semiBold',paddingRight:10,fontSize:10}}>Frames, doors, skirting boxing:</Text>
                    <Text style={{fontFamily:'poppins-regular',fontSize:10}}>bathroom, w/c, kitchen, dinner / living room, to receive one coat of supermatt and two coats of white eggshell.</Text>
                </View>
            </View>
            <ScrollView style={{height:"100%",width:"100%"}}>
                <View>
                    <View style={styles.tableViewContainer}>
                        <View style={styles.tableHeader}>
                            <View style={styles.headerTitleView}>
                                <Text style={styles.headerTitle}></Text>
                            </View>
                            <View style={styles.headerTitleView}>
                                <Text style={styles.headerTitle}>Hallway</Text>
                            </View>
                            <View style={styles.headerTitleView}>
                                <Text style={styles.headerTitle}>Bedroom</Text>
                            </View>
                            <View style={styles.headerTitleView}>
                                <Text style={styles.headerTitle}>Diner</Text>
                            </View>
                            <View style={styles.headerTitleView}>
                                <Text style={styles.headerTitle}>W/C Bathrooms</Text>
                            </View>
                            <View style={styles.headerTitleView}>
                                <Text style={styles.headerTitle}>En Ensuite</Text>
                            </View>
                            <View style={styles.headerTitleView}>
                                <Text style={styles.headerTitle}>Action</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'column'}}>
                        {newRow.length>0 &&
                                newRow.map((el,index)=>(
                                    <View style={styles.tableBody}>
                                        <View style={styles.inputBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                            />
                                        </View>
                                        <View style={styles.inputBodyContainer}>
                                            <TextInput
                                            style={styles.bodyTextInput}
                                                />
                                            </View>
                                        <View style={styles.inputBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                            />
                                        </View>
                                        <View style={styles.inputBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                            />
                                        </View>
                                        <View style={styles.inputBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                            />
                                        </View>
                                        <View style={styles.inputBodyContainer}>
                                            <TextInput
                                                style={styles.bodyTextInput}
                                            />
                                        </View>
                                    </View>
                                ))}
                            </View>
                        <View style={styles.tableBody}>
                            <View style={styles.inputBodyContainer}>
                                <TextInput
                                    style={styles.bodyTextInput}
                                />
                            </View>
                            <View style={styles.inputBodyContainer}>
                                <TextInput
                                style={styles.bodyTextInput}
                                    />
                                </View>
                            <View style={styles.inputBodyContainer}>
                                <TextInput
                                    style={styles.bodyTextInput}
                                />
                            </View>
                            <View style={styles.inputBodyContainer}>
                                <TextInput
                                    style={styles.bodyTextInput}
                                />
                            </View>
                            <View style={styles.inputBodyContainer}>
                                <TextInput
                                    style={styles.bodyTextInput}
                                />
                            </View>
                            <View style={styles.inputBodyContainer}>
                                <TextInput
                                    style={styles.bodyTextInput}
                                />
                            </View>
                            
                            <View style={styles.inputBodyContainer}>
                                <TouchableOpacity style={styles.addBtn} onPress={()=>addRow()}>
                                    <Image style={styles.plusBtn} source={plus}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Painter Name"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Plot No"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Type"}
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
                </View>
            </ScrollView>
        </View>
    )
}
export default Scope;
const styles = StyleSheet.create({
    mainContainer:{
        height:'100%',
        width:'100%',
        paddingLeft:20,
        paddingRight:20
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
    scopeDescriptionView:{
        height:"30%",
        marginTop:20,
        width:"100%"
    },
    textView:{
        height:"20%",
        flexDirection:"row"
    },
    // tableViewContainer:{
    //     paddingLeft:20,
    //     paddingRight:20,
    // },
    tableHeader:{
        flexDirection:'row',
        width:"100%",
        borderWidth:1,
    },
    headerTitleView:{
        width:"14.2%",
        justifyContent:'center',
        alignItems:"center"
    },
    headerTitle:{
        fontSize:8,
        textAlign:'center',
        fontFamily:'poppins-bold'
    },
    inputView:{
        width:"20%"
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
    bodyTextInput:{
        width:"90%",
        borderBottomWidth:1,
        borderBottomColor:'#96A8B2',
        padding:5,
        fontSize:12,
        color:'#96A8B2',
        fontFamily:'poppins-regular',
    },
    inputBodyContainer:{
        width:"14.2%",
        justifyContent:'center',
        alignItems:'center'
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
});