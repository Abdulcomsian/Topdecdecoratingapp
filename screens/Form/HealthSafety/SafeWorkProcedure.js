import React,{useState} from 'react';
import { View,Image,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import {CheckBox, Text} from 'native-base';
import styles from '../../../assets/css/styles'

var mainImage=require('../../../assets/authScreen/Accurate-daywork-sheet-docx.png')
var mask=require("../../../assets/authScreen/mask.png")
var hand=require("../../../assets/authScreen/hand.png")
var foot=require("../../../assets/authScreen/foot.png")
var eye=require("../../../assets/authScreen/eye.png")
var cloth=require("../../../assets/authScreen/clothing.png")
var tick=require("../../../assets/authScreen/tick.png")
var info=require("../../../assets/authScreen/info.png")
var cross=require("../../../assets/authScreen/cross.png")

const SafeWorkProcedure = () =>{

    const [protectiveArray,setProtectivearray]=useState([
        {image:mask},
        {image:hand},
        {image:foot},
        {image:eye},
        {image:cloth}
    ])
    const [safetyCheckArray,setSafetyCheckArray]=useState([
        {mainTitle:"PRE-OPERATIONAL SAFETY CHECKS",title:"Locate and ensure you are familiar with all machine operations and controls."},
        {title:"Check for loose/missing nuts, bolts and screws. Tighten and/or replace as needed."},
        {title:"Inspect fuel lines, tank and other areas for fuel leaks. Do not operate if leaks are found."},
        {title:"Inspect sprayer before every use."},
        {title:"Maintain a straight wrist position. Avoid using your wrist in a bent, extended or twisted position."},
        {title:"Maintain a proper balance and secure footing. Do not work on slippery, uneven or unstable surfaces. Do not work in odd positions or on ladders."},
        {title:"Take wind conditions into account. Avoid open doors and windows."},
        {title:"Always keep exhaust area clear of flammable debris."},
        {mainTitle:"OPERATIONAL SAFETY CHECKS / USE",title:"Ensure refuelling of generator takes place in a designated area free from ignition sources and sparks."},
        {title:"Ensure the appropriate COSHH Assessment for the product being used is available."},
        {title:"Personal Protective Equipments – Mask to be 3M (Model 4251) reusable half face mask suitable for vapours. User to be Face fit tested, full coveralls,"},
        {title:"Ensure the appropriate Fire extinguisher is present when loading petrol into a generator."},
        {title:"Ensure a spill kit is readily available for both Petrol and Paint Products."},
        {title:"Ensure that no person or animal is endangered when operating equipment."},
        {title:"When starting, stand the machine upright on a level surface. Check that hose is not blocked by any residues."},
        {title:"Protect and mask up any adjacent surfaces before work begins."},
        {mainTitle:"ENDING OPERATIONS AND CLEANING UP",title:"Remove any foreign material from in and around engine, air intake etc."},
        {title:"Clean up any adjacent surface and leave areas in a safe, clean and tidy condition."},
        {title:"Clean up sprayer as per manufacturer instructions."},
    ])
    return(
        <View style={styles.mainContainer}>
            <View style={styles.imageView}>
                <Image source={mainImage} style={styles.bannerImage}/>
            </View>
            <View style={{paddingTop:30,justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.titleText}>Safe Work Procedure</Text>
                <Text style={{fontSize:10,textAlign:'center',fontFamily:'poppins-semiBold'}}>Image download failed.Paint Sprayer – Electronic / Petrol powered (Generator) </Text>
            </View>
            <View style={styles.warningView}>
                <Text style={{fontSize:10,textAlign:'center',fontFamily:'poppins-semiBold'}}><Text style={{fontSize:10,textAlign:'center',fontFamily:'poppins-bold',color:"red"}}>DO NOT</Text> use this machine unless you have been instructed in its safe use and operation and have been given permission.</Text>
            </View>
            <ScrollView> 
                <View style={styles.formCodnatiner}>
                    <Text style={{fontSize:12,textAlign:'center',fontFamily:'poppins-semiBold',marginTop:20}}>PERSONAL PROTECTIVE EQUIPMENT</Text>
                    <View style={styles.protectiveMainImagesDiv}>
                        {protectiveArray.map((item,index)=>(
                            <View style={{width:"20%",justifyContent:"center",alignItems:"center"}}>
                                <Image style={{width: 60,height:80}} source={item.image}/>
                            </View>
                        ))}
                    </View>
                    
                    {safetyCheckArray.map((item,index)=>(
                        item.mainTitle ?
                        <View>
                            <Text style={{fontFamily:'poppins-semiBold',marginTop:20}}>{item.mainTitle}</Text>
                            <View key={index}>
                                <View style={{flexDirection:'row',width:"100%"}}>
                                    <Image source={tick}/>
                                    <Text style={{paddingLeft:10,fontFamily:'poppins-regular',fontSize:12}}>{item.title}</Text>
                                </View>
                            </View>
                        </View>
                        :
                        <View>
                            <View key={index}>
                                <View style={{flexDirection:'row',width:"100%"}}>
                                    <Image source={tick}/>
                                    <Text style={{paddingLeft:10,fontFamily:'poppins-regular',fontSize:12}}>{item.title}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                    <View>
                        <Text style={{fontFamily:'poppins-semiBold',marginTop:20}}>POTENTIAL HAZARDS AND INJURIES</Text>
                        <View>
                            <View style={{flexDirection:'row',width:"100%"}}>
                                <Image source={info}/>
                                <Text style={{paddingLeft:10,fontFamily:'poppins-regular',fontSize:12}}>Noise</Text>
                            </View>
                        </View>
                        <View>
                            <View style={{flexDirection:'row',width:"100%"}}>
                                <Image source={info}/>
                                <Text style={{paddingLeft:10,fontFamily:'poppins-regular',fontSize:12}}>Flying debris</Text>
                            </View>
                        </View>
                        <View>
                            <View style={{flexDirection:'row',width:"100%"}}>
                                <Image source={info}/>
                                <Text style={{paddingLeft:10,fontFamily:'poppins-regular',fontSize:12}}>Mists & Dust</Text>
                            </View>
                        </View>
                        <View>
                            <View style={{flexDirection:'row',width:"100%"}}>
                                <Image source={info}/>
                                <Text style={{paddingLeft:10,fontFamily:'poppins-regular',fontSize:12}}>Vibration</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={{fontFamily:'poppins-semiBold',marginTop:20}}>DON’T</Text>
                        <View>
                            <View style={{flexDirection:'row',width:"100%"}}>
                                <Image source={cross}/>
                                <Text style={{paddingLeft:10,fontFamily:'poppins-regular',fontSize:12}}>Do not use faulty equipment. Report suspect machinery immediately.</Text>
                            </View>
                        </View>
                        <View>
                            <View style={{flexDirection:'row',width:"100%"}}>
                                <Image source={cross}/>
                                <Text style={{paddingLeft:10,fontFamily:'poppins-regular',fontSize:12}}>Do not use any attachment or accessory unless it is recommended in the operator's manual.</Text>
                            </View>
                        </View>
                        <View>
                            <View style={{flexDirection:'row',width:"100%"}}>
                                <Image source={cross}/>
                                <Text style={{paddingLeft:10,fontFamily:'poppins-regular',fontSize:12}}>Do not direct the sprayer towards other people.</Text>
                            </View>
                        </View>
                        <View>
                            <View style={{flexDirection:'row',width:"100%"}}>
                                <Image source={cross}/>
                                <Text style={{paddingLeft:10,fontFamily:'poppins-regular',fontSize:12}}>Never use a higher speed setting than necessary to perform a task.</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
export default SafeWorkProcedure;