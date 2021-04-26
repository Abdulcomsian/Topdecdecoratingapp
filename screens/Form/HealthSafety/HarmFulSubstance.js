import React,{useState} from 'react';
import { View,Image,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import {Text,CheckBox} from 'native-base';
import styles from '../../../assets/css/styles'
import DateTimePickerModal from "react-native-modal-datetime-picker";

var plus=require('../../../assets/authScreen/plus.png')
const HarmFulSubstance = () =>{

    const[harmFulRow,setHarmFullRow]=useState([])
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [dynamicInput, setdynamicInput] = useState([]);
    const [contractorName, setContractorName] =useState("")
    const [projectName, setProjectName] =useState("")
    const [data, setData] = useState({
        substance:"",location:"",potential:"",alternative:"",clothingReq:"",supplierHeld:""
      });
    const addHarmfullRow = () =>{
        setdynamicInput((oldArray) => [...oldArray, data])
        setData({substance:"",location:"",potential:"",alternative:"",clothingReq:"",supplierHeld:""})
    }
    const onChange = (selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(new Date(currentDate));
      };
      const showDatepicker = () => {
        setShow(true)
      };
      const harmFulSubstanceFormInsert = () =>{
        console.log("Name Of Contractor :", contractorName);
        console.log("Project Name :", projectName);
        console.log("Date :", date.toLocaleDateString());
        console.log("Dynamic Input  :", dynamicInput);
      }
    return(
        <View style={styles.mainContainer}>
            <DateTimePickerModal
                isVisible={show}
                date={date ? date : new Date()}
                mode={'date'}
                is24Hour={true}
                display="default"
                onConfirm={(date) => onChange(date)}
                onCancel={() => setShow(false)}
                cancelTextIOS="Cancel"
                confirmTextIOS="Confirm"
            />
            <View style={{paddingTop:30,justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.titleText}>Harmful Substance Register</Text>
            </View>
            <ScrollView>
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
                            placeholder={"Project"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                    <Text onPress={()=>showDatepicker()} style={{width: "100%",
                            height:52,
                            paddingTop:20,
                            fontSize: 12,
                            color: "#96A8B2",
                            fontFamily: "poppins-regular",borderBottomWidth:1,
                            borderBottomColor:'#96A8B2',
                            padding:5,}}>{new Date(date).toLocaleDateString()}
                        </Text>
                    </View>
                    <View style={[styles.tableViewContainer,{marginTop:30}]}>
                        <View style={styles.tableHeader}>
                            <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>Substance</Text>
                                </View>
                                <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>Location</Text>
                                </View>
                                <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>Potential hazard</Text>
                                </View>
                                <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>Safer alternatives </Text>
                                </View>
                                <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>Protective clothing required Y/N</Text>
                                </View>
                                <View style={styles.headerHarmFulTitleView}>
                                    <Text style={styles.headerTitle}>Supplier MSDS Held Y/N</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{justifyContent:'flex-end',width:"100%",alignItems:"flex-end",marginBottom:10}}>
                            <TouchableOpacity style={styles.addBtn} onPress={()=>addHarmfullRow()}>
                                <Image style={styles.plusBtn} source={plus}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:"column"}}>
                        {dynamicInput.length > 0 &&
                            dynamicInput.map((el,index)=>(
                            <View style={styles.tableBody} key={index}>
                                <View style={styles.inputHarmFullBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"Substance"}
                                        value={el.substance}
                                        onChangeText={(txt) => updateValue("substance", index, txt)}
                                    />
                                </View>
                                <View style={styles.inputHarmFullBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"Location"}
                                        value={el.location}
                        onChangeText={(txt) => updateValue("location", index, txt)}
                                    />
                                </View>
                                <View style={styles.inputHarmFullBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"Potential hazard"}
                                        value={el.potential}
                        onChangeText={(txt) => updateValue("potential", index, txt)}
                                    />
                                </View>
                                <View style={styles.inputHarmFullBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"Safer alternatives"}
                                        value={el.alternative}
                        onChangeText={(txt) => updateValue("alternative", index, txt)}
                                    />
                                </View>
                                <View style={styles.inputHarmFullBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"Protective clothing required Y/N"}
                                        value={el.clothingReq}
                        onChangeText={(txt) => updateValue("clothingReq", index, txt)}
                                    />
                                </View>
                                <View style={styles.inputHarmFullBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"Supplier MSDS Held Y/N"}
                                        value={el.supplierHeld}
                        onChangeText={(txt) => updateValue("supplierHeld", index, txt)}
                                    />
                                </View>
                            </View>
                        ))}
                        <View style={styles.tableBody}>
                                <View style={styles.inputHarmFullBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"Substance"}
                                        onChangeText={(txt) => setData({ ...data, substance: txt })}
                                        value={data.substance}
                                    />
                                </View>
                                <View style={styles.inputHarmFullBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"Location"}
                                        onChangeText={(txt) => setData({ ...data, location: txt })}
                                        value={data.location}
                                    />
                                </View>
                                <View style={styles.inputHarmFullBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"Potential hazard"}
                                        onChangeText={(txt) => setData({ ...data, potential: txt })}
                                        value={data.potential}
                                    />
                                </View>
                                <View style={styles.inputHarmFullBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"Safer alternatives"}
                                        onChangeText={(txt) => setData({ ...data, alternative: txt })}
                                        value={data.alternative}
                                    />
                                </View>
                                <View style={styles.inputHarmFullBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"Protective clothing required Y/N"}
                                        onChangeText={(txt) => setData({ ...data, clothingReq: txt })}
                                        value={data.clothingReq}
                                    />
                                </View>
                                <View style={styles.inputHarmFullBodyContainer}>
                                    <TextInput
                                        style={styles.bodyTextInput}
                                        placeholder={"Supplier MSDS Held Y/N"}
                                        onChangeText={(txt) => setData({ ...data, supplierHeld: txt })}
                                        value={data.supplierHeld}
                                    />
                                </View>
                            </View>
                       </View>
                       <View
            style={{
              backgroundColor: "#000",
              width: "100%",
              height: 2,
              marginBottom: 20,
              marginTop: 20,
            }}
          ></View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.commonBtn}
              onPress={() => harmFulSubstanceFormInsert()}
            >
              <Text style={styles.commonText}>Save</Text>
            </TouchableOpacity>
          </View>
                </View>
            </ScrollView>
        </View>
    )
}
export default HarmFulSubstance;