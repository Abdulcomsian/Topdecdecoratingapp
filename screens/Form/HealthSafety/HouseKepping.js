import React,{useState} from 'react';
import { View,TextInput,ScrollView} from 'react-native';
import {Text} from 'native-base';
import styles from '../../../assets/css/styles'


const HouseKepping = () =>{

    const [checkListArray,setCheckListArray]=useState([
        {title:"Are all empty paint container/s removed from the unit/s."},
        {title:"Are all empty paint cans / leftovers collected from site by the paint supplier? "},
        {title:"Are all protection, abrasives, masking tape and other sundries or general waste cleared away by the decorator and placed in the appropriate site bin. "},
        {title:"Proper waste bins for general waste, recyclable waste, hazardous waste, are provided to facilitate responsible disposal."},
        {title:"Are all working at height equipments i.e. hop ups, ladders, stepladders etc inspected and tagged."},
        {title:"Are all working at height equipment packed away in a secure storage."},
        {title:"Storage areas are clean, tidy and organised."},
        {title:"Work area is clean, tidy, and clutter-free."},
        {title:"There are no unnecessary items in the work area."},
        {title:"Aisles, walkways, stairways, and exits are unobstructed."},
        {title:"Floors are dry and free from accumulated dust, broken glass and leaks or spills (e.g., oil or water)."},
        {title:"Warning signs are in good condition and can be clearly seen from afar."},
        {title:"Are all Electrical equipment PAT Tested and recorded."},
        {title:"Task light are clean and provide adequate illumination for working."},
        {title:"ES800 Paint wash out system installed and in good working manner."},
        {title:"Have the decorator’s tools been checked to ensure they are in good working order i.e. brushers, rollers etc?"},
        {title:"Has adequate brush storage being provided i.e. Brush mate Trade storage boxes and brush mate fluid."},
        {title:"Are all the material in the storage container labelled correctly and a COSHH datasheet available."},
        {title:"Are all flammable materials placed in the Flamstore?"},
    ])
    return(
        <View style={styles.mainContainer}>
            <View style={{paddingTop:30,justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.titleText}>House Keeping Checklist</Text>
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
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Week Commencing"}
                        />
                    </View>
                    <View style={styles.tableCheckListViewContainer}>
                        <View style={styles.tableHeader}>
                                <View style={styles.headerCheckListTitleView}>
                                    <Text style={styles.headerTitle}>ITEMS</Text>
                                </View>
                                <View style={styles.headerCheckListTitleView}>
                                    <Text style={styles.headerTitle}>Block</Text>
                                </View>
                                <View style={styles.headerCheckListTitleView}>
                                    <Text style={styles.headerTitle}>Yes</Text>
                                </View>
                                <View style={styles.headerCheckListTitleView}>
                                    <Text style={styles.headerTitle}>No</Text>
                                </View>
                                <View style={styles.headerCheckListTitleView}>
                                    <Text style={styles.headerTitle}>N/a</Text>
                                </View>
                                <View style={styles.headerCheckListTitleView}>
                                    <Text style={styles.headerTitle}>Date/s of check</Text>
                                </View>
                                <View style={styles.headerCheckListTitleView}>
                                    <Text style={styles.headerTitle}>Comments</Text>
                                </View>
                            </View>
                            <View>
                                {checkListArray.map((item,index)=>(
                                    <View key={index}>
                                        <Text style={{ fontSize:12,color:'#000',fontFamily:'poppins-regular',padding:5}}>{item.title}</Text>
                                        <View style={styles.tableCheckListBody}>
                                            <View style={styles.inputHarmFullBodyContainer}>
                                                <TextInput
                                                    style={styles.bodyTextInput}
                                                    placeholder={"Block"}
                                                />
                                            </View>
                                            <View style={styles.inputHarmFullBodyContainer}>
                                                <TextInput
                                                    style={styles.bodyTextInput}
                                                    placeholder={"Yes"}
                                                />
                                            </View>
                                            <View style={styles.inputHarmFullBodyContainer}>
                                                <TextInput
                                                    style={styles.bodyTextInput}
                                                    placeholder={"No"}
                                                />
                                            </View>
                                            <View style={styles.inputHarmFullBodyContainer}>
                                                <TextInput
                                                    style={styles.bodyTextInput}
                                                    placeholder={"N/A"}
                                                />
                                            </View>
                                            <View style={styles.inputHarmFullBodyContainer}>
                                                <TextInput
                                                    style={styles.bodyTextInput}
                                                    placeholder={"Date"}
                                                />
                                            </View>
                                            <View style={styles.inputHarmFullBodyContainer}>
                                                <TextInput
                                                    style={styles.bodyTextInput}
                                                    placeholder={"Comments"}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>
                            <View style={styles.inputFieldContainer}>
                                <TextInput
                                    style={styles.inputField}
                                    placeholder={"Supervisor (Print & Sign)"}
                                />
                            </View>
                            <View style={styles.inputFieldContainer}>
                                <TextInput
                                    style={styles.inputField}
                                    placeholder={"Date"}
                                />
                            </View>
                            <Text style={{fontSize:12,fontFamily:'poppins-bold',paddingTop:10,paddingBottom:20,textAlign:"center"}}>Once completed, please file a copy in the Site Folder and send a copy to our Head Office.</Text>
                        </View>
                    </View>
            </ScrollView>
        </View>
    )
}
export default HouseKepping;