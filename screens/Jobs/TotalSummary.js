import React,{ useState, useEffect } from 'react';
import { View,StyleSheet,Image,TouchableOpacity,ActivityIndicator} from 'react-native';
import {Text} from 'native-base';
import { connect } from "react-redux";
import axios from "axios";

var rightArrow=require('../../assets/authScreen/right.png')
const TotalSummary = ( props ) =>{
    const { navigation, token } = props;
    const [jobId,setJobId] = useState(props.route.params.jobID)
    const [totalSummary, setTotalSummary] = useState([])
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        try {
            const job_id = jobId;
          const body = {job_id};
          (async () => {
            setLoading(true);
            const request = await axios(
              "https://airtimetesting.airtime4u.com/public/tajs/public/api/admin/job/count_jobs",
              {
                method: "POST",
                headers: {
                  authorization: "Bearer " + token,
                },
                data: body,
              }
            );
            const response = await request.data;
            //console.log("Response Total Summary :",response)
            if (response.success == true) {
                // 
              setTotalSummary(response.data.user);
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
                <Text style={styles.titleText}>Please select a Job Summary</Text>
            </View>
            <View style={{padding:30}}>
            {totalSummary.map((item,index)=>(
                <TouchableOpacity style={styles.commonBtn} onPress={()=>navigation.navigate("SelectProject",{jobID: jobId})} key={index}>
                    <Text style={styles.commonText}>{item.total}</Text>
                    <Text style={styles.commonText}>{item.name2}</Text>
                    <Image  source={rightArrow}/>
                </TouchableOpacity>
            ))}
            </View>
        </View>
    )
            }
}
const mapStateToProps = (state) => ({
    token: state.auth.token,
  });
  const mapDispatchToProps = (dispatch) => ({});
  export default connect(mapStateToProps, mapDispatchToProps)(TotalSummary);
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
        paddingTop:20
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