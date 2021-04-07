import React,{useState} from 'react';
import { View,StyleSheet,Image,TextInput,TouchableOpacity,ScrollView} from 'react-native';
import {Text} from 'native-base';
import { searchDecorator } from "../../Redux/action/auth/authActionTypes";
import { useDispatch, useSelector, connect } from "react-redux";

const SearchDecorator = (props) =>{
    const { navigation } = props;
    const[decoratorID,setDecoratorID]=useState("")

    const searchDecorator = () =>{
        console.log("Search Decorator Id :",decoratorID)
        props.searchDecoratorHandler(decoratorID)
    }
    return(
        
        <View style={styles.mainContainer}>
            <View style={styles.dateTimeContainer}>
                <Text style={styles.refText}>Date: 12-2-2021</Text>
                <Text style={styles.refText}>Ref  id: 10099499</Text>
            </View>
            
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Search Decorator</Text>
            </View>
            <View style={styles.formConatiner}>
                <View style={styles.inputFieldContainer}>
                    <TextInput
                        style={styles.inputField}
                        placeholder={"Enter your Decorator ID"}
                        value={decoratorID}
                        onChangeText={(e)=>setDecoratorID(e)}
                    />
                </View>
            </View>
            <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.commonBtn} onPress={() => navigation.navigate('DecoratorDetails')}>
                        <Text style={styles.commonText}>Search</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.commonBtn} onPress={() => searchDecorator()}>
                        <Text style={styles.commonText}>Search</Text>
                    </TouchableOpacity> */}
                </View>
        </View>
    )
}
const mapStateToProps = (state) => ({
    token : state.auth.token,
  });
  const mapDispatchToProps = (dispatch) => ({
    searchDecoratorHandler: (decoratorID) =>
      dispatch(
        searchDecorator(decoratorID)
      ),
  });
export default connect(mapStateToProps, mapDispatchToProps)(SearchDecorator);

const styles = StyleSheet.create({
    mainContainer:{
        height:'100%',
        width:'100%',
    },
    dateTimeContainer:{
        height:"10%",
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        padding: 10,
    },
    refText:{
        fontSize:12,
        color:'#96A8B2',
        fontFamily:'poppins-medium'
    },
    titleContainer:{
        height:"5%",
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    },
    titleText:{
        color:'#4F4F4F',
        fontSize:18,
        fontFamily:'poppins-semiBold'
    },
    formConatiner:{
        height:'70%',
        width:'100%',
        padding:30,
        alignItems:'center',
    },
    inputFieldContainer:{
        height:"10%",
        width:'100%',
    },
    inputField:{
        height:52,
        width:'100%',
        borderBottomWidth:1,
        borderBottomColor:'#96A8B2',
        padding:5,
        fontSize:16,
        color:'#96A8B2',
        fontFamily:'poppins-regular'
    },
    inputContainer:{
        justifyContent:'center',
        flexDirection:'row',
        alignItems:'center',
        width:'80%'
    },
    commonBtn:{
        height:50,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:14,
        borderWidth:3,
        borderColor:'#1073AC'
    },
    commonText:{
        color:'#1073AC',
        fontSize:18,
        fontFamily:'poppins-semiBold'
    },
    btnContainer:{
        width:'100%',
        height:"25%",
        paddingLeft:20,
        paddingRight:20

    },
});