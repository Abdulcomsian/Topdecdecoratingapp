import React,{useState} from 'react';
import { View,StyleSheet,TouchableOpacity,TextInput} from 'react-native';
import {Text} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { event } from 'react-native-reanimated';

const SearchJob = ({props,navigation}) =>{

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
       
        const currentDate = selectedDate;
        setShow(Platform.OS === 'ios' ? true : false);
        // setDate(currentDate);
        console.log(selectedDate)
        setDate(currentDate);
      };
    
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
        
      };
    
      const showDatepicker = () => {
        showMode('date');
      };
    
      const showTimepicker = () => {
        showMode('time');
      };
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
                    />
                </View>
                <Text style={{justifyContent:'center',textAlign:'center',marginBottom:20,fontFamily:'poppins-medium',}}>OR</Text>
                <View style={styles.inputFieldContainer}>
                    <View style={styles.inputFieldContainer}>
                        <Text onPress={()=>showDatepicker()} style={styles.inputField}>{new Date(date).toLocaleDateString()}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.footerBtnView}>
                <TouchableOpacity style={styles.commonBtn}>
                    <Text style={styles.commonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default SearchJob;
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