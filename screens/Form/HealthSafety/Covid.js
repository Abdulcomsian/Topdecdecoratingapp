import React,{useState} from 'react';
import { View,Image,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import {CheckBox, Text} from 'native-base';
import styles from '../../../assets/css/styles'
import { color } from 'react-native-reanimated';
import TBTForm from "../../../components/common/TBTForm";
import SignatureComponent from "../../../components/SignatureComponent";
import { connect } from "react-redux";
import { insertTbtCovid } from "../../../Redux/action/auth/authActionTypes";
import { updateHealthReport } from "../../../Redux/action/summary/Summary";

var mainImage=require('../../../assets/authScreen/Accurate-daywork-sheet-docx.png')
var plus=require('../../../assets/authScreen/plus.png')
const Covid = (props) =>{
    const { navigation, token, isOnSite, isSuccessMsg, isJobId } = props;
    // const jobID = Math.floor(Math.random() * 100) + 1;
    const { plot_Id } = props.route.params;
    const jobID = plot_Id;
    console.log("Work Plot ID :",jobID)
    const tabId = props.route.params.tabName;
    console.log("Work Tab ID :",tabId)
    const[attendenceArray,setAttendenceArray]=useState([]);
    const addAttendence = () =>(
        setAttendenceArray(oldArray=>[...oldArray,{print:"",sign:""}])
    )

    const [coshhArray,setCoshhArray]=useState([
        {title:"1. Report this to your supervisor or manager"},
        {title:"2. Avoid touching anything."},
        {title:"3. Cough or sneeze into a tissue and put it in a bin or, if you do not have tissues, cough and sneeze into the crook of your elbow. "},
        {title:"4. Return home immediately, get a coronavirus test done. "},
        {title:"5. You must follow the government guidance on self-isolation."},
        {mainTitle:"DO Not: Go to work if you have:",title:"1. Have a high temperature,"},
        {title:"2. A new and continuous cough."},
        {title:"3. A loss or change to your sense of smell or taste."},
        {mainTitle:"Getting to work – ",title:"1. Wherever possible travel to site alone, using your own transport (for example, a car or bicycle)."},
        {title:"2. Avoid public transport."},
        {mainTitle:"On Site – ",title:"1.	Face covering is mandatory on-site, if you have a ‘reasonable or medical exemption’ please inform the site team.  Reasonable exemption includes:"},
        {title:"-	if you are travelling with someone who requires lip reading"},
        {title:"-	if you suffer from severe distress when you put it on"},
        {title:"-	if you suffer from a disability where you are unable to put it on"},
        {title:"-	when you need to eat, drink or take medication."},
        {title:"-	If it affects your ability to perform strenuous activity"},
        {title:"2.	Wash your hands when you arrive on site, regularly throughout the day (especially if you sneeze or cough and after eating or handling food) and again when you leave site. "},
        {title:"3.	Always keep at least 2 metres away from other workers. This includes while you are working and during breaks and mealtimes – staggered breaks will help achieve this."},
        {title:"4.	Bring your own meals and refillable drinking bottles. Do not share items (for example, cups, small tools, sundries etc.). "},
        {title:"5.	Re-usable PPE should be thoroughly cleaned after use and not shared between workers."},
        {title:"6.	Single use PPE should be disposed of so that it cannot be reused."}

    ])
    const [openSign, setOpenSign] = useState({
        index: -1,
        bool: false,
      });
      const [data, setData] = useState({
        contractor: "",
    project: "",
    supervisor: "",
    date: null,
    comments: "",
    tbtSign:"",
    jobSummary: [],
      });
      const tbtFormInsert = async () => {
        try{
          if(data!=""){
            await props.creatTbtCovidHandler({...data,task_id:jobID,tab_id:tabId},token,props.route.params?.index)
            // props.updateHealthReport(props?.route?.params?.index);
            props.navigation.pop();
            alert("TBT COVID Insert SuccessFully !");
          } 
          else{
            alert("Please Insert All Fields CareFully !");
          }
        } catch(err){
          alert(err.message)
        }
      };
    return(
        <View style={styles.mainContainer}>
             {openSign.bool ? (
        <SignatureComponent
          returnImage={(uri) => {
            let copydata = [...data.jobSummary];
            if(openSign?.index===2){
              setData({ ...data, tbtSign:uri});
              setOpenSign({ bool: false, index: -1 });
             }else{
              let copydata = [...data.jobSummary];
              copydata[openSign.index].sign = uri;
              setData({ ...data, jobSummary: [...copydata] });
              setOpenSign({ bool: false, index: -1 });
             }
          }}
        />
      ) : (
        <>
            <View style={styles.imageView}>
                <Image source={mainImage} style={styles.bannerImage}/>
            </View>
            <View style={{paddingTop:30,justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.titleText}>Tool Box Talk – Coronavirus ( COVID - 19 )</Text>
            </View>
            <ScrollView>
                <View style={{paddingLeft:20,paddingRight:20}}>
                    <Text style={{fontFamily:'poppins-regular',fontSize:12}}><Text style={{fontFamily:'poppins-bold',fontSize:12}}>Outline</Text>- This talk covers the ways to maintain your health while working on-site. </Text>
                    <Text style={{fontFamily:'poppins-regular',fontSize:12}}><Text style={{fontFamily:'poppins-bold',fontSize:12}}>Reason</Text>- Coronavirus is a highly contagious disease that can have severe effects on people, especially those who are vulnerable. The virus is likely to pass from person to person in communal areas and where it is not possible to maintain safe distances between persons. If a person is infected while working, it can be passed on through   to families and other contacts. You can spread the virus even if you do not have symptoms. </Text>
                    <Text style={{fontFamily:'poppins-regular',fontSize:12}}><Text style={{fontFamily:'poppins-bold',fontSize:12}}>What to do if you think you are ill whilst onsite </Text>- If you develop a high temperature or a persistent cough whilst at work, you should: </Text>
                    <View style={{marginTop:20}}>
                        {coshhArray.map((item,index)=>(
                            item.mainTitle ?
                            <View key={index}>
                                <Text style={{fontFamily:'poppins-bold',fontSize:16}}>{item.mainTitle}</Text>
                                <Text style={{fontFamily:'poppins-regular',fontSize:12,backgroundColor:item.bgcolor}}>{item.title}</Text>
                            </View>
                            :
                            <View key={index}>
                                <Text style={{fontFamily:'poppins-regular',fontSize:12,backgroundColor:item.bgcolor}}>{item.title}</Text>
                            </View>
                        ))}
                        
                    </View>
                    <TBTForm
                data={data}
                getSignature={(index) =>
                  setOpenSign({ ...openSign, bool: true, index })
                }
                setTBTGlobalSign={()=>{ setOpenSign({ ...openSign, bool: true, index:2 })}} 
                addAttendence={() =>
                  setData({
                    ...data,
                    jobSummary: [...data.jobSummary, { print: "", sign: "" }],
                  })
                }
                onChangeData={(key, value, index = -1) => {
                  if (index >= 0) {
                    let copyAttendance = [...data.jobSummary];
                    copyAttendance[index].print = value;
                    setData({ ...data, jobSummary: [...copyAttendance] });
                  } else {
                    setData({ ...data, [key]: value });
                  }
                }}
              />
                    <Text style={{fontFamily:'poppins-bold',fontSize:12,textAlign:'center'}}>Once completed, please file a copy in the Site Folder and send a copy to our Head Office and give a copy to the site staff.</Text>
                    <View style={styles.footerView}>
                                <Text style={{fontFamily:'poppins-bold',fontSize:12}}>Address: 2,<Text style={{fontFamily:'poppins-regular',fontSize:10}}> Green Lane, Penge, London SE20 7JA</Text></Text>
                                <Text style={{fontFamily:'poppins-bold',fontSize:12}}>T: <Text style={{fontFamily:'poppins-regular',fontSize:10}}> 0208 676 060</Text></Text>
                                <Text style={{fontFamily:'poppins-bold',fontSize:12}}>F: <Text style={{fontFamily:'poppins-regular',fontSize:10}}> 0208 676 0671</Text></Text>
                                <Text style={{fontFamily:'poppins-bold',fontSize:12}}>M: <Text style={{fontFamily:'poppins-regular',fontSize:10}}> 07737 632206</Text></Text>
                                <Text style={{fontFamily:'poppins-bold',fontSize:12}}>E: <Text style={{fontFamily:'poppins-regular',fontSize:10}}> info@topdecdecorating.com</Text></Text>
                                <Text style={{fontFamily:'poppins-bold',fontSize:12}}>W: <Text style={{fontFamily:'poppins-regular',fontSize:10}}> www.topdecdecorating.com</Text></Text>
                                <Text style={{fontFamily:'poppins-bold',fontSize:12}}>VAT Registration Number: <Text style={{fontFamily:'poppins-regular',fontSize:10}}> 203 474 927</Text></Text>
                            </View>
                            <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.commonBtn}
                  onPress={() => tbtFormInsert()}
                >
                  <Text style={styles.commonText}>Save</Text>
                </TouchableOpacity>
              </View>
                </View>
            </ScrollView>
            </>
      )}
        </View>
    )
}
const mapStateToProps = (state) => ({
    token: state.auth.token,
    isOnSite: state.auth.isOnSite,
    isSuccessMsg: state.auth.isSuccessMsg,
    isJobId: state.auth.isJobId,
  });
  const mapDispatchToProps = (dispatch) => ({
    creatTbtCovidHandler: (
      data,
      token,
      index
    ) =>
      dispatch(
        insertTbtCovid(
          data,
          token,
          index
        )
      ),
      updateHealthReport: (index) => dispatch(updateHealthReport(index)),
  });
  export default connect(mapStateToProps, mapDispatchToProps)(Covid);
