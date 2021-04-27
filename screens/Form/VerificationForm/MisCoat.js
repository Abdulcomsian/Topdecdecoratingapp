import React,{ useState, useEffect } from 'react';
import { View,StyleSheet,Image,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import {Text} from 'native-base';
import { insertMiscoat } from "../../../Redux/action/auth/authActionTypes";
import { connect } from "react-redux";

var plus=require('../../../assets/authScreen/plus.png')
const MistCoat = (props) =>{
    const { navigation, token, isSuccessMsg, isSuccess } = props;
    const jobID = Math.floor(Math.random() * 100) + 1;
    const tabId = props.route.params.tabName;
    const [dynamicInput, setdynamicInput] = useState([]);
    const [mainContructor, setMainContructor] = useState([])
    const [projectName, setProjectName] = useState([])
    const [data, setData] = useState({
        name: "",
        block: "",
        level: "",
        plot: "",
        bed: "",
        price: "",
        days: "",
        start: "",
        complete: "",
      });
    const addDecorationRow = () =>{
        setdynamicInput((oldArray) => [...oldArray, data]);
        setData({name: "",
        name: "",
        block: "",
        level: "",
        plot: "",
        bed: "",
        price: "",
        days: "",
        start: "",
        complete: "",})
    }
    const updateValue = (key, index, value) => {
        let preData = [...dynamicInput];
        preData[index][key] = value;
        setdynamicInput(preData);
      };
      const mistCoatFormInsert = () =>{
          if(dynamicInput!="" && mainContructor!="" && projectName!=""){
            props.createMisCoatHandler(mainContructor,projectName,dynamicInput,jobID,tabId,token)
          } else {
            alert("Please Insert All Fields CareFully !");
            return false;
          }
      }
      useEffect(() => {
        if(isSuccess){     
          if(isSuccessMsg){
              console.log("here !")
              alert(isSuccessMsg)
              navigation.pop();
          }
          }
          else{
              if(isSuccessMsg){
                  
                  alert(isSuccessMsg)
                  return false;
              }
          }
      },[isSuccess,isSuccessMsg])
    return(
        <ScrollView style={{height:"100%"}}>
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>MisCoat Record</Text>
            </View>
            <View style={styles.inputFieldContainer}>
                <TextInput
                    value={mainContructor}
                    onChangeText={(e) => setMainContructor(e)}
                    style={styles.inputField}
                    placeholder={"Main Contractor"}
                />
            </View>
            <View style={styles.inputFieldContainer}>
                <TextInput
                value={projectName}
                onChangeText={(e) => setProjectName(e)}
                    style={styles.inputField}
                    placeholder={"Project"}
                />
            </View>
            <View style={{height:"95%",width:"100%"}}>
                <ScrollView style={{height:"100%"}}>
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
                        {dynamicInput.length>0 &&
                            dynamicInput.map((el,index)=>(
                                // <View style={styles.tableBody} key={index}>
                                //     <View style={styles.inputBodyContainer}>
                                //         <TextInput
                                //             onChangeText={(txt) => updateValue("name", index, txt)}
                                //             value={el.name}
                                //             style={styles.bodyTextInput}
                                //             placeholder={"Name"}
                                //         />
                                //     </View>
                                //     <View style={styles.inputBodyContainer}>
                                //         <TextInput
                                //         onChangeText={(txt) => updateValue("block", index, txt)}
                                //         value={el.block}
                                //             style={styles.bodyTextInput}
                                //             placeholder={"Block"}
                                //         />
                                //     </View>
                                //     <View style={styles.inputBodyContainer}>
                                //         <TextInput
                                //         onChangeText={(txt) => updateValue("level", index, txt)}
                                //         value={el.level}
                                //             style={styles.bodyTextInput}
                                //             placeholder={"level"}
                                //         />
                                //     </View>
                                //     <View style={styles.inputBodyContainer}>
                                //         <TextInput
                                //         onChangeText={(txt) => updateValue("plot", index, txt)}
                                //         value={el.plot}
                                //             style={styles.bodyTextInput}
                                //             placeholder={"Plot"}
                                //         />
                                //     </View>
                                //     <View style={styles.inputBodyContainer}>
                                //         <TextInput
                                //         onChangeText={(txt) => updateValue("bed", index, txt)}
                                //         value={el.bed}
                                //             style={styles.bodyTextInput}
                                //             placeholder={"Rooms"}
                                //         />
                                //     </View>
                                //     <View style={styles.inputBodyContainer}>
                                //         <TextInput
                                //         onChangeText={(txt) => updateValue("itemprice", index, txt)}
                                //         value={el.price}
                                //             style={styles.bodyTextInput}
                                //             placeholder={"Price"}
                                //         />
                                //     </View>
                                //     <View style={styles.inputBodyContainer}>
                                //         <TextInput
                                //         onChangeText={(txt) => updateValue("days", index, txt)}
                                //         value={el.days}
                                //             style={styles.bodyTextInput}
                                //             placeholder={"Day"}
                                //         />
                                //     </View>
                                //     <View style={styles.inputBodyContainer}>
                                //         <TextInput
                                //         onChangeText={(txt) => updateValue("start", index, txt)}
                                //         value={el.start}
                                //             style={styles.bodyTextInput}
                                //             placeholder={"Date"}
                                //         />
                                //     </View>
                                //     <View style={styles.inputBodyContainer}>
                                //         <TextInput
                                //         onChangeText={(txt) => updateValue("complete", index, txt)}
                                //         value={el.complete}
                                //             style={styles.bodyTextInput}
                                //             placeholder={"Date"}
                                //         />
                                //     </View>
                                // </View>
                                <View style={styles.tableBody}>
                                <View style={styles.inputBodyContainer}>
                                    <TextInput
                                    onChangeText={(txt) => updateValue("name", index, txt)}
                                    value={el.name}
                                        style={styles.bodyTextInput}
                                        placeholder={"Name"}
                                    />
                                </View>
                                <View style={styles.inputBodyContainer}>
                                    <TextInput
                                     onChangeText={(txt) => updateValue("block", index, txt)}
                                     value={el.block}
                                        style={styles.bodyTextInput}
                                        placeholder={"Block"}
                                    />
                                </View>
                                <View style={styles.inputBodyContainer}>
                                    <TextInput
                                      onChangeText={(txt) => updateValue("level", index, txt)}
                                      value={el.level}
                                        style={styles.bodyTextInput}
                                        placeholder={"level"}
                                    />
                                </View>
                                <View style={styles.inputBodyContainer}>
                                    <TextInput
                                    onChangeText={(txt) => updateValue("bed", index, txt)}
                                    value={el.bed}
                                        style={styles.bodyTextInput}
                                        placeholder={"Bed"}
                                    />
                                </View>
                                <View style={styles.inputBodyContainer}>
                                    <TextInput
                                    onChangeText={(txt) => updateValue("price", index, txt)}
                                    value={el.price}
                                        style={styles.bodyTextInput}
                                        placeholder={"Price"}
                                    />
                                </View>
                                <View style={styles.inputBodyContainer}>
                                    <TextInput
                                    onChangeText={(txt) => updateValue("plot", index, txt)}
                                    value={el.plot}
                                        style={styles.bodyTextInput}
                                        placeholder={"Plot"}
                                    />
                                </View>
                                <View style={styles.inputBodyContainer}>
                                    <TextInput
                                    onChangeText={(txt) => updateValue("days", index, txt)}
                                    value={el.days}
                                        style={styles.bodyTextInput}
                                        placeholder={"Days"}
                                    />
                                </View>
                                <View style={styles.inputBodyContainer}>
                                    <TextInput
                                    onChangeText={(txt) => updateValue("start", index, txt)}
                                    value={el.start}
                                        style={styles.bodyTextInput}
                                        placeholder={"Date"}
                                    />
                                </View>
                                <View style={styles.inputBodyContainer}>
                                    <TextInput
                                   onChangeText={(txt) => updateValue("complete", index, txt)}
                                   value={el.complete}
                                        style={styles.bodyTextInput}
                                        placeholder={"Date"}
                                    />
                                </View>
                            </View>
                            ))
                        }
                        <View style={styles.tableBody}>
                                    <View style={styles.inputBodyContainer}>
                                        <TextInput
                                        onChangeText={(txt) => setData({ ...data, name: txt })}
                                        value={data.name}
                                            style={styles.bodyTextInput}
                                            placeholder={"Name"}
                                        />
                                    </View>
                                    <View style={styles.inputBodyContainer}>
                                        <TextInput
                                         onChangeText={(txt) => setData({ ...data, block: txt })}
                                         value={data.block}
                                            style={styles.bodyTextInput}
                                            placeholder={"Block"}
                                        />
                                    </View>
                                    <View style={styles.inputBodyContainer}>
                                        <TextInput
                                          onChangeText={(txt) => setData({ ...data, level: txt })}
                                          value={data.level}
                                            style={styles.bodyTextInput}
                                            placeholder={"level"}
                                        />
                                    </View>
                                    <View style={styles.inputBodyContainer}>
                                        <TextInput
                                        onChangeText={(txt) => setData({ ...data, bed: txt })}
                                        value={data.bed}
                                            style={styles.bodyTextInput}
                                            placeholder={"Bed"}
                                        />
                                    </View>
                                    <View style={styles.inputBodyContainer}>
                                        <TextInput
                                        onChangeText={(txt) => setData({ ...data, price: txt })}
                                        value={data.price}
                                            style={styles.bodyTextInput}
                                            placeholder={"Price"}
                                        />
                                    </View>
                                    <View style={styles.inputBodyContainer}>
                                        <TextInput
                                        onChangeText={(txt) => setData({ ...data, plot: txt })}
                                        value={data.plot}
                                            style={styles.bodyTextInput}
                                            placeholder={"Plot"}
                                        />
                                    </View>
                                    <View style={styles.inputBodyContainer}>
                                        <TextInput
                                        onChangeText={(txt) => setData({ ...data, days: txt })}
                                        value={data.days}
                                            style={styles.bodyTextInput}
                                            placeholder={"Days"}
                                        />
                                    </View>
                                    <View style={styles.inputBodyContainer}>
                                        <TextInput
                                        onChangeText={(txt) => setData({ ...data, start: txt })}
                                        value={data.start}
                                            style={styles.bodyTextInput}
                                            placeholder={"Date"}
                                        />
                                    </View>
                                    <View style={styles.inputBodyContainer}>
                                        <TextInput
                                        onChangeText={(txt) => setData({ ...data, complete: txt })}
                                        value={data.complete}
                                            style={styles.bodyTextInput}
                                            placeholder={"Date"}
                                        />
                                    </View>
                                </View>
                                <View
                                style={{
                                backgroundColor: "#000",
                                width: "100%",
                                height: "2%",
                                marginBottom: 20,
                                marginTop: 20,
                                }}
                            ></View>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                style={styles.commonBtn}
                                onPress={() => mistCoatFormInsert()}
                                >
                                <Text style={styles.commonText}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
        </ScrollView>
    )
}
const mapStateToProps = (state) => ({
    token: state.auth.token,
    isSuccess: state.auth.isSuccess,
    isSuccessMsg: state.auth.isSuccessMsg,
  });
  const mapDispatchToProps = (dispatch) => ({
    createMisCoatHandler: (mainContructor,projectName,dynamicInput,jobID,tabId,token) => dispatch(insertMiscoat(mainContructor,projectName,dynamicInput,jobID,tabId,token)),
  });
  export default connect(mapStateToProps, mapDispatchToProps)(MistCoat);
const styles = StyleSheet.create({
    mainContainer:{
        height:'100%',
        width:'100%',
        paddingBottom:50,
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
    btnContainer: {
        width: "100%",
        height: "15%",
        marginBottom: 20,
      },
      commonBtn: {
        height: 50,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 14,
        borderWidth: 3,
        borderColor: "#1073AC",
      },
      commonText: {
        color: "#1073AC",
        fontSize: 18,
        fontFamily: "poppins-semiBold",
      },
})