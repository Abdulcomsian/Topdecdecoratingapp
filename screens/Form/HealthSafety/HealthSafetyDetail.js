import React,{useState,useRef} from 'react';
import { View,StyleSheet,Image,TouchableOpacity,CheckBox,ScrollView} from 'react-native';
import {Text} from 'native-base';
import ViewPager from '@react-native-community/viewpager';

var tick=require('../../../assets/authScreen/check.png')
var disableTick=require('../../../assets/authScreen/disable.png')
var rightArrow=require('../../../assets/authScreen/right.png')
const HealthSafetyDetails = ({props,navigation}) =>{
    const [tab, setTab] = useState({
        miscoat: true,
        decoration: false,
        snag: false,
      });
      const [isLeft, setIsLeft] = useState(1);
      const _ref = useRef(null);
      const _refMiscoat= useRef(null);
      const _refDecoration = useRef(null);
      const _refSnag = useRef(null);
      const [isSelected, setSelection] = useState(false);
      const [checkFlag,setCheckFlag]=useState(false);

      const selectTabManually = (tabName) => {
        if (tabName === "Miscoat") {
            _ref.current.setPage(0);
            setIsLeft(1);
        } else if (tabName === "Decoration") {
            _ref.current.setPage(1);
        } else {
            _ref.current.setPage(2);
            setIsLeft(2);
        }
      };
        //updating the top tab states
        const swicthTabChecked = async (key1, key2, key3, value1, value2, value3) => {
            setTab({ ...tab, [key1]: value1, [key2]: value2, [key3]: value3 });
        };

        const [miscotArray,setMiscotArray]=useState([
            {tickSign:tick,text:"Accident Report",chekecd:false,url:"AccidentReport"},
            {tickSign:tick,text:"Notice Clean Up",chekecd:false,url:"CleanUp"},
            {tickSign:tick,text:"Electrical Equipment",chekecd:false,url:"ElectricalEquipment"},
            {tickSign:tick,text:"Friday Pack",chekecd:false,url:"FridayPack"},
            {tickSign:tick,text:"Harm Ful Substance",chekecd:false,url:"HarmFulSubstance"},
            {tickSign:tick,text:"Health Safety Inspection",chekecd:false,url:"HealthSafetyInspection"},
            {tickSign:tick,text:"House Keeping Checklist",chekecd:false,url:"HouseKepping"},
            {tickSign:tick,text:"Ladder Check List",chekecd:false,url:"LadderCheckList"},
            {tickSign:tick,text:"Method Statement Register",chekecd:false,url:"MethodStatement"},
            {tickSign:tick,text:"Personal Protective Equipment",chekecd:false,url:"IssueCard"},
            {tickSign:tick,text:"Puwer Inspection Checklist",chekecd:false,url:"PuwerInspection"},
            {tickSign:tick,text:"On-Site Decoration",chekecd:false,url:"SiteDecoration"},
            {tickSign:tick,text:"Record Of Project",chekecd:false,url:"RecordofProject"},
            {tickSign:tick,text:"Daily Breifing Form",chekecd:false,url:"DailyBreifing"},
            {tickSign:tick,text:"Safe Work Procedure",chekecd:false,url:"SafeWork"},
            {tickSign:tick,text:"TBT_COSHH",chekecd:false,url:"TBTCOSHH"},
            {tickSign:tick,text:"TBT_FIRE",chekecd:false,url:"TBTFIRE"},
            {tickSign:tick,text:"TBT_SLIP",chekecd:false,url:"TBTSLIP"},
            {tickSign:tick,text:"TBT_COVID",chekecd:false,url:"Covid"},
            {tickSign:tick,text:"TBT_HOSEKEEPING",chekecd:false,url:"Tbthouse"},
            {tickSign:tick,text:"TBT_MOBILEEVELATED",chekecd:false,url:"Tbtmobile"},
            {tickSign:tick,text:"TBT_RESPIRATORY",chekecd:false,url:"Tbtrespiratory"},
            {tickSign:tick,text:"TBT_SILICA",chekecd:false,url:"Tbtsilica"},
            {tickSign:tick,text:"TBT_DRUGS",chekecd:false,url:"Tbtdrugs"},
            {tickSign:tick,text:"TBT_VOLIENCE",chekecd:false,url:"Tbtvolience"},
            {tickSign:tick,text:"TBT_WORKING",chekecd:false,url:"Tbtworking"},
            {tickSign:tick,text:"TBT_TALKREGISTER",chekecd:false,url:"TbtRegister"},
            {tickSign:tick,text:"TBT_INVENTORY",chekecd:false,url:"TbtInventory"},
        ]);
        const checkedForm = (index) =>{
            
            const preData=[...miscotArray];
            const flag=preData[index].chekecd;
            if(flag){
                preData[index].chekecd=false;
                setMiscotArray(preData)
            }
            else{
                preData[index].chekecd=true;
                setMiscotArray(preData)
            }
        }
    return(
        <View style={styles.mainContainer}>
            <View style={styles.dateTimeContainer}>
                <Text style={styles.refText}>Date: 12-2-2021</Text>
                <Text style={styles.refText}>Ref  id: 10099499</Text>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Plot 1</Text>
            </View>
            <View style={styles.tabsContainer}>
                <View style={styles.tabsView}>
                    <TouchableOpacity onPress={() => selectTabManually("Miscoat")}>
                        <Text style={tab.miscoat ? styles.activeTabText : styles.tabText}>Miscoat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => selectTabManually("Decoration")}>
                        <Text style={tab.decoration ? styles.activeTabText : styles.tabText}>Main decoration</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => selectTabManually("Snag")}>
                        <Text style={tab.snag ? styles.activeTabText : styles.tabText}>Snag</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.viewrPagerConatiner}>
                    <ViewPager 
                        ref={_ref}
                        orientation='horizontal'
                        scrollEnabled
                        pageMargin={0}
                        onPageSelected={(page) => {
                            if (page.nativeEvent.position === 0) {
                            swicthTabChecked("miscoat", "decoration", "snag", true, false, false);
                            setIsLeft(1);
                            }
                            else if (page.nativeEvent.position === 1) {
                                swicthTabChecked("miscoat", "decoration", "snag", false, true, false);
                            } 
                        }}
                        style={styles.viewPager} initialPage={0}>
                        <ScrollView>
                        <View style={styles.pageView} key="1">
                        {miscotArray.map((item,index)=>(
                                <View style={styles.listView}>
                                    {item.chekecd==true?
                                        <View style={{width:'100%',flexDirection:'row'}}>
                                            <View style={styles.tickSign}>
                                                <Image  source={item.tickSign}/>
                                            </View>
                                            <View style={styles.textArowTrueView}>
                                                <TouchableOpacity style={styles.textArrow} onPress={() => navigation.navigate(item.url)}>
                                                    <Text style={{color:"#1073AC",marginRight:10,fontFamily:'poppins-semiBold',fontSize:14}}>{item.text}</Text>
                                                    <Image  source={rightArrow}/>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.checkBoxTueView}>
                                                <CheckBox
                                                    value={item.chekecd}
                                                    onValueChange={() => checkedForm(index)}
                                                    style={styles.checkbox}
                                                />
                                            </View>
                                        </View>
                                    :
                                    <View style={{width:'100%',flexDirection:'row',marginLeft:20,marginRight:20}}>
                                        <View style={styles.textArowView}>
                                            <TouchableOpacity style={styles.disbaleTextArrow}>
                                                <Text style={{color:"#96A8B2",marginRight:10,fontFamily:'poppins-semiBold',fontSize:14}}>{item.text}</Text>
                                                <Image  source={disableTick}/>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.checkBoxView}>
                                            <CheckBox
                                                value={item.chekecd}
                                                onValueChange={() => checkedForm(index)}
                                                style={styles.checkbox}
                                            />
                                        </View>
                                    </View>
                                    }
                                    {/* {item.chekecd==true?
                                        <View style={styles.textArowView}>
                                            <TouchableOpacity style={styles.textArrow} onPress={() => navigation.navigate('FormTemplate')}>
                                                <Text style={{color:"#1073AC",marginRight:10,fontFamily:'poppins-semiBold',fontSize:14}}>{item.text}</Text>
                                                <Image  source={rightArrow}/>
                                            </TouchableOpacity>
                                        </View>
                                    :
                                        <View style={styles.textArowView}>
                                            <TouchableOpacity style={styles.disbaleTextArrow} onPress={() => navigation.navigate('FormTemplate')}>
                                                <Text style={{color:"#96A8B2",marginRight:10,fontFamily:'poppins-semiBold',fontSize:14}}>{item.text}</Text>
                                                <Image  source={disableTick}/>
                                            </TouchableOpacity>
                                        </View>
                                    } */}
                                    {/* <View style={styles.checkBoxView}>
                                        <CheckBox
                                            value={item.chekecd}
                                            onValueChange={() => checkedForm(index)}
                                            style={styles.checkbox}
                                        />
                                    </View> */}
                                </View>
                            
                        ))}
                        {/* <Text style={{paddingLeft:20,paddingRight:20,
                        paddingTop:10}}>The forms must be filled out in sequence one after the other. Once the form is filled out it will show a tick. You can select individual forms to combine and email. Every Friday the forms completed will be sent to the admin.</Text> */}
                        </View>
                        </ScrollView>
                        <View style={styles.pageView} key="2">
                            <Text>Second page</Text>
                        </View>
                        <View style={styles.pageView} key="3">
                            <Text>Third page</Text>
                        </View>
                    </ViewPager>
                    
                </View>
            </View>
        </View>
    )
}
export default HealthSafetyDetails;
const styles = StyleSheet.create({
    viewPager: {
        height:'100%',
        width:'100%'
      },
    mainContainer:{
        height:'100%',
        width:'100%',
    },
    tabsContainer:{
        height:'70%',
        marginTop:20,
        width:'100%'
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
    tabStyle:{
        width:'100%',
        backgroundColor:'#fff'
    },
    tabsView:{
        flexDirection: "row",
        justifyContent: 'center',
        width:'100%',
        justifyContent: 'center',
        height:'10%'
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
    tabText:{
        margin:10,
        color: "#797979",
        opacity: 0.5,
        fontFamily:'poppins-semiBold'
    },
    currentTab:{
        margin:10,
    },
    activeTabText:{
        margin:10,
        borderBottomWidth: 2, 
        borderBottomColor: "#1073AC",
        color:'#1073AC',
        fontFamily:'poppins-semiBold',
        paddingBottom:10
    },
    viewrPagerConatiner:{
        width:'100%',
        height:'90%',
        marginTop:12
    },
    pageView:{
        paddingLeft:10,
        paddingRight:10,
        height:'100%',
        width:'100%'
    },
    textArrow:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderWidth:2,
        paddingRight:20,
        paddingLeft:20,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#F6F9FB',
        borderColor:'#E2ECF2',
        borderRadius:14,
        width:'100%'
    },
    disbaleTextArrow:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderWidth:2,
        paddingRight:20,
        paddingLeft:20,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#F6F9FB',
        borderColor:'#96A8B2',
        borderRadius:14,
        width:'100%'
    },
    textArowView:{
        width:'80%',
        justifyContent:'center',
        alignItems:'center'
    },
    textArowTrueView:{
        width:'60%',
        justifyContent:'center',
        alignItems:'center'
    },
    listView:{
        width:'100%',
        height:60,
        flexDirection:'row'
    },
    tickSign:{
        width:'20%',
        justifyContent: 'center',
        alignItems:'center'
    },
    checkBoxView:{
        justifyContent:'center',
        alignItems:'center',
        width:'20%'
    },
    checkBoxTueView:{
        justifyContent:'center',
        alignItems:'center',
        width:'20%'
    }
})