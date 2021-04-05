import React,{useState} from 'react';
import { View,TextInput,ScrollView,Image} from 'react-native';
import {Text} from 'native-base';
import styles from '../../../assets/css/styles'

var mainImage=require('../../../assets/authScreen/Accurate-daywork-sheet-docx.png')
const LadderCheckList = () =>{

    const [ladderArrayList,setLadderArrayList]=useState([
        {title:"1. Training",subTitle:"Have all staff who will use podium stepladders been trained in their use?"},
        {title:"2. Site conditions",subTitle:"Is the floor area where the podium stepladders are to be used free from obstacles, debris, trailing cables, etc?"},
        {subTitle:"Will the podium stepladder be erected on a flat stable surface?"},
        {title:"3. Pre-assembly checks",subTitle:"Do the podium stepladders have a label fitted containing a company number and a test date as well as a manufacturer’s label?"},
        {subTitle:"Have all welds been checked for cracks or other damage?"},
        {subTitle:"Have all tubes been checked for a sign of physical damage i.e. cracks, distortion or excessive dents?"},
        {subTitle:"Is the working platform free from contamination, cracking, holes or other damage, including any missing or damaged rivet fixings?"},
        {subTitle:"Is there an absence of sharp edges or splinters?"},
        {subTitle:"Is the stepladder free from paint or decoration which could obscure damage? (There should only be clear varnish on the ladder, so defects aren’t hidden.)"},
        {subTitle:"Are all required nails, screws, bolts, tie rods and rivets present and firmly fixed?"},
        {subTitle:"If the stepladder has a non-slip base, is it undamaged?"},
        {subTitle:"Are the stepladder feet in good condition?"},
        {subTitle:"Have previous repairs been carried out to a high standard?"},
        {subTitle:"Do all fittings appear to be of an approved type?"},
        {subTitle:"Check for tightness of rungs."},
        {subTitle:"Check all rivets and fastenings."},
        {subTitle:"Check for corrosion."},
        {subTitle:"Check anti-slip end pieces are in good condition and are not loose."},
        {subTitle:"Check visually for flaws and cracks."},
        {subTitle:"Check non-slip bases for damage or wear."},
        {subTitle:"Check stepladders are not wobbly when positioned as this demonstrates side strain."},
        {subTitle:"Check hinge brackets/spreaders are not loose or bent."},
        {subTitle:"Check stop on the hinge bracket/spreaders is not broken and is fully effective."},
        {subTitle:"check hinges are not loose."},
        {title:"4. Checks during/after assembly and before use",subTitle:"Are all castors secure and their fixing bolts tightened correctly?"},
        {subTitle:"Do all wheel brakes operate and lock the wheels and castors into position?"},
        {subTitle:"Is there free movement of all hinge points of the podium step?"},
        {subTitle:"Will the total load (1 person plus tools & materials) be more than the manufacturer’s stated safe working load?"},
        {subTitle:"Are the podium stepladder’s locking mechanisms operating and locking correctly? (Ladder claws and locks, gate claw and lock, rear folding frame elbow locking joints and the platform locking tabs.)"},
        {subTitle:"Are the castors pointing outwards and the wheel brakes locked prior to access?"},
        {subTitle:"Is the ladder section located correctly and secure?"},
        {subTitle:"Is the podium stepladder correctly positioned to avoid over-reaching?"},
        {subTitle:"Is the podium stepladder correctly positioned to avoid over reaching?"},
        {subTitle:"Is the working platform set at the correct height?"},
        {subTitle:"Is the safety gate shut and locked once staff are on the platform?"},
    ])
    return(
        <View style={styles.mainContainer}>
            <View style={styles.imageView}>
                <Image source={mainImage} style={styles.bannerImage}/>
            </View>
            <View style={{paddingTop:30,justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.titleText}>LADDERS / PODIUM STEPLADDER INSPECTION CHECKLIST</Text>
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
                            placeholder={"Supervisor (Print & Sign)"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Date and Time completed"}
                        />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={"Next Inspection date"}
                        />
                    </View>
                    <View style={styles.tableCheckListViewContainer}>
                            <View style={styles.tableHeader}>
                                <View style={styles.headerLadderListTitleView}>
                                    <Text style={styles.headerTitle}>ITEMS</Text>
                                </View>
                                <View style={styles.headerLadderListTitleView}>
                                    <Text style={styles.headerTitle}>Yes</Text>
                                </View>
                                <View style={styles.headerLadderListTitleView}>
                                    <Text style={styles.headerTitle}>No</Text>
                                </View>
                                <View style={styles.headerLadderListTitleView}>
                                    <Text style={styles.headerTitle}>N/a</Text>
                                </View>
                            </View>
                            {ladderArrayList.map((item,index)=>(
                                item.subTitle ?
                                    <View key={index}>
                                        <View>
                                            <Text style={{fontSize:12,fontFamily:'poppins-bold',paddingTop:10,paddingBottom:20}}>{item.title}</Text>
                                            <Text style={{fontSize:12,fontFamily:'poppins-regular'}}>{item.subTitle}</Text>
                                        </View>
                                        <View style={styles.tableBody}>
                                            <View style={styles.inputLadderBodyContainer}>
                                                <TextInput
                                                    style={styles.bodyTextInput}
                                                    placeholder={"Yes"}
                                                />
                                            </View>
                                            <View style={styles.inputLadderBodyContainer}>
                                                <TextInput
                                                    style={styles.bodyTextInput}
                                                    placeholder={"No"}
                                                />
                                            </View>
                                            <View style={styles.inputLadderBodyContainer}>
                                                <TextInput
                                                    style={styles.bodyTextInput}
                                                    placeholder={"N/A"}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                    :
                                    <View key={index}>
                                        <View>
                                            <Text style={{fontSize:12,fontFamily:'poppins-regular'}}>{item.subTitle}</Text>
                                        </View>
                                        <View style={styles.tableBody}>
                                            <View style={styles.inputLadderBodyContainer}>
                                                <TextInput
                                                    style={styles.bodyTextInput}
                                                    placeholder={"Yes"}
                                                />
                                            </View>
                                            <View style={styles.inputLadderBodyContainer}>
                                                <TextInput
                                                    style={styles.bodyTextInput}
                                                    placeholder={"No"}
                                                />
                                            </View>
                                            <View style={styles.inputLadderBodyContainer}>
                                                <TextInput
                                                    style={styles.bodyTextInput}
                                                    placeholder={"N/A"}
                                                />
                                            </View>
                                        </View>
                                    </View>
                            ))}
                             <View style={styles.inputFieldContainer}>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={4}
                                    style={styles.inputField}
                                    placeholder={"Comments/further information/action to be taken"}
                                />
                            </View>
                            <Text style={{fontSize:12,fontFamily:'poppins-bold',paddingTop:10,paddingBottom:20,textAlign:"center"}}>Once completed, please file a copy in the Site Folder and send a copy to our Head Office.</Text>
                        </View>
                </View>
            </ScrollView>

        </View>
    )
}
export default LadderCheckList;