import React,{useState} from 'react';
import { View,StyleSheet,Image,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import {Text} from 'native-base';


var mainImage=require('../../../assets/authScreen/Accurate-daywork-sheet-docx.png')
var plus=require('../../../assets/authScreen/plus.png')
const AccurateDayWork = () =>{

    const[weekReport,setWeekReport]=useState([])
    const[materialDate,setMaterialData]=useState([])
    const[plantItem,setPlantItem]=useState([])
    const[managmentTime,setManagmentTime]=useState([])
    const addRow = () =>{
        setWeekReport(oldArray=>[...oldArray,{name:"",trade:"",mon:"",tues:"",wed:"",thus:"",fri:"",sat:"",sun:"",total:""}])
    }
    const addMaterialRow = () =>{
        setMaterialData(oldArray=>[...oldArray,{name:"",quantity:"",unit:""}])
    }
    const addPlantItem = () =>{
        setPlantItem(oldArray=>[...oldArray,{name:"",quantity:"",unit:""}])
    }
    const addManagmentTime = () =>{
        setManagmentTime(oldArray=>[...oldArray,{name:"",quantity:"",unit:""}])
    }
    return(
        <View style={styles.mainContainer}>
            <View style={styles.imageView}>
                <Image source={mainImage} style={styles.bannerImage}/>
            </View>
            <View style={{height:"75%",width:"100%",paddingBottom:50}}>
            <ScrollView style={{height:"100%",paddingLeft:20,paddingRight:20}}>
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
                                placeholder={"Contract Title"}
                            />
                        </View>
                        <View style={styles.inputFieldContainer}>
                            <TextInput
                                style={styles.inputField}
                                placeholder={"Daywork sheet No"}
                            />
                        </View>
                        <View style={styles.inputFieldContainer}>
                            <TextInput
                                style={styles.inputField}
                                placeholder={"Week Ending (Sun)"}
                            />
                        </View>
                        <View style={styles.inputFieldContainer}>
                            <TextInput
                                style={styles.inputField}
                                placeholder={"Site Instruction No"}
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
                                multiline={true}
                                numberOfLines={4}
                                style={styles.inputField}
                                placeholder={"Description of Work"}
                            />
                        </View>
                    
                </View>
                <View style={{width:"100%",flexDirection:"row",justifyContent:"space-between"}}>
                    <Text style={{ fontFamily:'poppins-bold',fontSize:12,paddingTop:20,paddingBottom:20}}>LABOUR </Text>
                    <View style={styles.inputButtonBodyContainer}>
                        <TouchableOpacity style={styles.addBtn} onPress={()=>addRow()}>
                            <Image style={styles.plusBtn} source={plus}/>
                        </TouchableOpacity>
                    </View>
                </View>
                    
                    <View style={styles.tableViewContainer}>
                        <View style={styles.tableHeader}>
                            <View style={styles.headerTitleView}>
                                <Text style={styles.headerTitle}>NAME</Text>
                            </View>
                            <View style={styles.headerTitleView}>
                                <Text style={styles.headerTitle}>Trade</Text>
                            </View>
                            <View style={styles.headerTitleView}>
                                <Text style={styles.headerTitle}>MON</Text>
                            </View>
                            <View style={styles.headerTitleView}>
                                <Text style={styles.headerTitle}>TUE</Text>
                            </View>
                            <View style={styles.headerTitleView}>
                                <Text style={styles.headerTitle}>WED</Text>
                            </View>
                            <View style={styles.headerTitleView}>
                                <Text style={styles.headerTitle}>THUS</Text>
                            </View>
                            <View style={styles.headerTitleView}>
                                <Text style={styles.headerTitle}>FRI</Text>
                            </View>
                            <View style={styles.headerTitleView}>
                                <Text style={styles.headerTitle}>SAT</Text>
                            </View>
                            <View style={styles.headerTitleView}>
                                <Text style={styles.headerTitle}>SUN</Text>
                            </View>
                            <View style={styles.headerTitleView}>
                                <Text style={styles.headerTitle}>TOAL</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'column'}}>
                        {weekReport.length>0 &&
                            weekReport.map((el,index)=>(
                                <View style={styles.tableBody} key={index}>
                                    <View style={styles.inputWeekBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Name"}
                                        />
                                    </View>
                                    <View style={styles.inputWeekBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Trade"}
                                        />
                                    </View>
                                    <View style={styles.inputWeekBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Mon"}
                                        />
                                    </View>
                                    <View style={styles.inputWeekBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Tues"}
                                        />
                                    </View>
                                    <View style={styles.inputWeekBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Wed"}
                                        />
                                    </View>
                                    <View style={styles.inputWeekBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Thus"}
                                        />
                                    </View>
                                    <View style={styles.inputWeekBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Fri"}
                                        />
                                    </View>
                                    <View style={styles.inputWeekBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Sat"}
                                        />
                                    </View>
                                    <View style={styles.inputWeekBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Sun"}
                                        />
                                    </View>
                                    <View style={styles.inputWeekBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Total"}
                                        />
                                    </View>
                                </View>
                            ))
                        }
                        </View>
                    </View>
                    <View style={{width:"100%",flexDirection:"row",justifyContent:"space-between"}}>
                        <Text style={{ fontFamily:'poppins-bold',fontSize:12,paddingTop:20,paddingBottom:20}}>MATERIALS</Text>
                        <View style={styles.inputButtonBodyContainer}>
                            <TouchableOpacity style={styles.addBtn} onPress={()=>addMaterialRow()}>
                                <Image style={styles.plusBtn} source={plus}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.tableViewContainer}>
                        <View style={styles.tableHeader}>
                            <View style={styles.headerMaterialTitleView}>
                                <Text style={styles.headerTitle}>NAME</Text>
                            </View>
                            <View style={styles.headerMaterialTitleView}>
                                <Text style={styles.headerTitle}>QUANTITY</Text>
                            </View>
                            <View style={styles.headerMaterialTitleView}>
                                <Text style={styles.headerTitle}>UNIT</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'column'}}>
                        {materialDate.length>0 &&
                            materialDate.map((el,index)=>(
                                <View style={styles.tableBody} key={index}>
                                    <View style={styles.inputMaterialBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Name"}
                                        />
                                    </View>
                                    <View style={styles.inputMaterialBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Quantity"}
                                        />
                                    </View>
                                    <View style={styles.inputMaterialBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Unit"}
                                        />
                                    </View>
                                </View>
                            ))
                        }
                        </View>

                    </View>
                    <View style={{width:"100%",flexDirection:"row",justifyContent:"space-between"}}>
                        <Text style={{ fontFamily:'poppins-bold',fontSize:12,paddingTop:20,paddingBottom:20}}>PLANTS AND OTHER ITEMS</Text>
                        <View style={styles.inputButtonBodyContainer}>
                            <TouchableOpacity style={styles.addBtn} onPress={()=>addPlantItem()}>
                                <Image style={styles.plusBtn} source={plus}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.tableViewContainer}>
                        <View style={styles.tableHeader}>
                            <View style={styles.headerMaterialTitleView}>
                                <Text style={styles.headerTitle}>NAME</Text>
                            </View>
                            <View style={styles.headerMaterialTitleView}>
                                <Text style={styles.headerTitle}>QUANTITY</Text>
                            </View>
                            <View style={styles.headerMaterialTitleView}>
                                <Text style={styles.headerTitle}>UNIT</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'column'}}>
                        {plantItem.length>0 &&
                            plantItem.map((el,index)=>(
                                <View style={styles.tableBody} key={index}>
                                    <View style={styles.inputMaterialBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Name"}
                                        />
                                    </View>
                                    <View style={styles.inputMaterialBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Quantity"}
                                        />
                                    </View>
                                    <View style={styles.inputMaterialBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Unit"}
                                        />
                                    </View>
                                </View>
                            ))
                        }
                        </View>

                    </View>
                    <View style={{width:"100%",flexDirection:"row",justifyContent:"space-between"}}>
                        <Text style={{ fontFamily:'poppins-bold',fontSize:12,paddingTop:20,paddingBottom:20}}>PRELIMINARIES AND MANAGEMENT TIME</Text>
                        <View style={styles.inputButtonBodyContainer}>
                            <TouchableOpacity style={styles.addBtn} onPress={()=>addManagmentTime()}>
                                <Image style={styles.plusBtn} source={plus}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.tableViewContainer}>
                        <View style={styles.tableHeader}>
                            <View style={styles.headerMaterialTitleView}>
                                <Text style={styles.headerTitle}>NAME</Text>
                            </View>
                            <View style={styles.headerMaterialTitleView}>
                                <Text style={styles.headerTitle}>QUANTITY</Text>
                            </View>
                            <View style={styles.headerMaterialTitleView}>
                                <Text style={styles.headerTitle}>UNIT</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'column'}}>
                        {managmentTime.length>0 &&
                            managmentTime.map((el,index)=>(
                                <View style={styles.tableBody} key={index}>
                                    <View style={styles.inputMaterialBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Name"}
                                        />
                                    </View>
                                    <View style={styles.inputMaterialBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Quantity"}
                                        />
                                    </View>
                                    <View style={styles.inputMaterialBodyContainer}>
                                        <TextInput
                                            style={styles.bodyTextInput}
                                            placeholder={"Unit"}
                                        />
                                    </View>
                                </View>
                            ))
                        }
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontFamily:'poppins-bold',fontSize:12,paddingTop:20}}>I/We certify that this is a true record of the works carried out and the materials used to undertake the work.</Text>
                    </View>
                    <View>
                        <Text style={{ fontFamily:'poppins-bold',fontSize:12}}>Instructed under the above site instruction issued.</Text>
                    </View>
                    <View style={styles.inputBodyContainer}>
                        <TextInput
                            style={styles.bodyTextInput}
                            placeholder={"Managers Name"}
                        />
                    </View>
                    <View style={styles.inputBodyContainer}>
                        <TextInput
                            style={styles.bodyTextInput}
                            placeholder={"Position"}
                        />
                    </View>
                    <View style={styles.inputBodyContainer}>
                        <TextInput
                            style={styles.bodyTextInput}
                            placeholder={"Managers Signature"}
                        />
                    </View>
                    <View style={styles.inputBodyContainer}>
                        <TextInput
                            style={styles.bodyTextInput}
                            placeholder={"Date"}
                        />
                    </View>
                    <View style={{justifyContent:'center',alignItems:'center',paddingTop:10}}>
                        <Text style={{ fontFamily:'poppins-bold',fontSize:8,textAlign:'center'}}>Please ensure a copy of this sheet is returned to Top Dec office for processing. Payments will not be made without this sheet </Text>
                    </View>

                </ScrollView>
            </View>
        </View>
    )
}
export default AccurateDayWork;
const styles = StyleSheet.create({
    mainContainer:{
        height:'100%',
        width:'100%',
    },
    imageView:{
        height:"25%",
        width:"100%",
        paddingTop:20,
        justifyContent:"center",
        alignItems:'center'
    },
    formCodnatiner:{
        width:"100%"
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
    bannerImage:{
        height:"100%",
        width:"100%",
    },
    tableHeader:{
        flexDirection:'row',
        width:"100%",
        borderWidth:1,
    },
    headerTitleView:{
        width:"10%",
        justifyContent:'center',
        alignItems:"center"
    },
    headerMaterialTitleView:{
        width:"33.3%",
        justifyContent:'center',
        alignItems:"center"
    },
    headerTitle:{
        fontSize:8,
        textAlign:'center',
        fontFamily:'poppins-bold'
    },
    tableBody:{
        width:"100%",
        flexDirection:"row"
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
    bodyTextInput:{
        fontSize:8
    },
    inputBodyContainer:{
        width:"100%",
    },
    inputWeekBodyContainer:{
        width:"10%",
        justifyContent:'center',
        alignItems:'center'
    },
    inputMaterialBodyContainer:{
        width:"33.3%",
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
})