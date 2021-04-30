import React,{useState, useEffect} from 'react';
import { View,StyleSheet,Image,TouchableOpacity,ActivityIndicator,ScrollView} from 'react-native';
import {Text} from 'native-base';
import { connect } from "react-redux";
import axios from "axios";
import {  } from 'react-native-gesture-handler';

var rightArrow=require('../../assets/authScreen/right.png')
const SelectProject = ( props ) =>{
    const { navigation, token } = props;
    const [jobId,setJobId] = useState(props.route.params.jobID)
    const [type,setType] = useState(props.route.params.type)
    const [loading, setLoading] = useState(false);
    const [plotArray,setPlotArray]=useState([
        {ploatName:"Plot 1",url:"SelectSummary"},
        {ploatName:"Plot 2",url:"SelectSummary"},
        {ploatName:"Plot 3",url:"SelectSummary"},
    ]);
    const [selectProject, setSelectProject] = useState([])
    useEffect(() => {
        try {
            const job_id = jobId;
          const body = {job_id,type};
          (async () => {
            setLoading(true);
            const request = await axios(
              "https://airtimetesting.airtime4u.com/public/tajs/public/api/supervisor/search/job/ViewPlots",
              {
                method: "POST",
                headers: {
                  authorization: "Bearer " + token,
                },
                data: body,
              }
            );
            const response = await request.data;
            //console.log("Response Select Project :",response)
            if (response.success == true) {
                // 
              setSelectProject(response.data.user);
              setLoading(false);
            } else {
              setLoading(false);
              setErrorMsg(request.message);
            }
          })();
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
        
       
      }, []);
    if (loading) {
        return (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator color="#1073AC" size="small" />
          </View>
        );
      } else {
    return(
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Please select a project</Text>
            </View>
            <ScrollView style={{paddingRight:30,paddingLeft:30,width:"100%",paddingBottom:50}}>
            {selectProject.map((item,index)=>(
                <TouchableOpacity style={styles.commonBtn} onPress={()=>navigation.navigate("SelectSummary")} key={index}>
                    <Text style={styles.commonText}>{item.name}</Text>
                    <Image  source={rightArrow}/>
                </TouchableOpacity>
            ))}
            </ScrollView>
        </View>
    )
            }
}
const mapStateToProps = (state) => ({
    token: state.auth.token,
  });
  const mapDispatchToProps = (dispatch) => ({});
  export default connect(mapStateToProps, mapDispatchToProps)(SelectProject);
const styles = StyleSheet.create({
    mainContainer:{
        height:'100%',
        width:'100%',
    },
    titleContainer:{
        height:"10%",
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:20,
        paddingBottom:30
    },
    titleText:{
        color:'#4F4F4F',
        fontSize:18,
        fontFamily:'poppins-semiBold',
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
        flexDirection:'row',
        justifyContent:'space-between',
        paddingRight:10,
        paddingLeft:10
    },
    commonText:{
        color:'#1073AC',
        fontSize:16,
        fontFamily:'poppins-semiBold'
    }
})