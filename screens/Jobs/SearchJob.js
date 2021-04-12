import React,{useState} from 'react';
import { View,StyleSheet,TouchableOpacity,TextInput} from 'react-native';
import {Text} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { searchJob } from "../../Redux/action/auth/authActionTypes";
import { connect } from "react-redux";

const SearchJob = (props) =>{
    const { navigation } = props;
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [refID,setRefID] = useState("")
    const [changeDate,setChnageDate]=useState(false)
    const [token,setToken] = useState(props.token)
    const [basedText,setBasedText] = useState("")
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(Platform.OS === 'ios' ? true : false);
        // setDate(currentDate);
        // console.log(selectedDate)
        setDate(new Date(currentDate).toLocaleDateString());
        setChnageDate(true)
      };
    
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
        
      };
    
      const showDatepicker = () => {
        showMode('date');
      };
    
      const searchJob = () =>{
        
        console.log("Show Value :",show)    
        console.log(date)
        if(refID){
            if(changeDate){
                console.log("Changed Date with Ref ID")
                setBasedText("Changed Date with Ref ID")
                props.navigation.navigate('DetailJob',{selectedDate:date,refernceNum:refID,basedText:basedText,token:token})
                //props.searchJobHandler(refID,date,token)
            }
            else{
                setBasedText("Just Ref ID")
                props.navigation.navigate('DetailJob',{selectedDate:"",refernceNum:refID,basedText:basedText,token:token})
                //props.searchJobHandler(refID,date,token)
                setDate(new Date())
            }
        }
        else{
            if(changeDate){
                console.log("Just Date")
                setBasedText("Just Date")
                props.navigation.navigate('DetailJob',{selectedDate:date,refernceNum:refID,basedText:basedText})
               // props.searchJobHandler(refID,date,token)
            }
        }
      }

    return(
        <View style={styles.mainContainer}>
            {show && 
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            display="default"
                            onChange={onChange}
                            format="DD-MM-YYYY"
                            placeholder="Select Date"
                        />
                    }
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Search Jobs</Text>
                <Text style={{textAlign:'center',fontFamily:'poppins-regular',fontSize:14}}>Search a job by either reference ID or Date job created</Text>
            </View>
            <View style={styles.searchByView}>
                <View style={styles.inputFieldContainer}>
                    <TextInput
                        style={styles.inputField}
                        placeholder={"Enter Ref ID"}
                        value={refID}
                        onChangeText={(e)=>setRefID(e)}
                    />
                </View>
                <Text style={{justifyContent:'center',textAlign:'center',fontFamily:'poppins-medium',marginTop:20}}>OR</Text>
                <View style={styles.inputFieldContainer}>
                    <View style={styles.inputFieldContainer}>
                        <Text onPress={()=>showDatepicker()} style={styles.inputField}>{new Date(date).toLocaleDateString()}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.footerBtnView}>
                {/* <TouchableOpacity style={styles.commonBtn}  onPress={() => navigation.navigate('DetailJob',{date:date,referenceId:refID})}>
                    <Text style={styles.commonText}>Search</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.commonBtn} onPress={() => searchJob(this)}>
                    <Text style={styles.commonText}>Search</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const mapStateToProps = (state) => ({
    token : state.auth.token,
  });
  const mapDispatchToProps = (dispatch) => ({
    searchJobHandler: (refID,date,token) =>
      dispatch(
        searchJob(refID,date,token)
      ),
  });
export default connect(mapStateToProps, mapDispatchToProps)(SearchJob);

const styles = StyleSheet.create({
    mainContainer:{
        height:'100%',
        width:'100%',
    },
    titleContainer:{
        height:"20%",
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    titleText:{
        color:'#4F4F4F',
        fontSize:18,
        fontFamily:'poppins-semiBold',
        marginBottom:20
    },
    commonBtn:{
        height:50,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:14,
        borderWidth:3,
        borderColor:'#1073AC',
        marginBottom:20,
    },
    commonText:{
        color:'#1073AC',
        fontSize:18,
        fontFamily:'poppins-semiBold',
    },
    searchByView:{
        height:'65%',
        width:'100%',
        paddingTop:50,
        paddingLeft:20,
        paddingRight:20
    },
    footerBtnView:{
        height:'15%',
        width:'100%',
        padding: 20,
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
})