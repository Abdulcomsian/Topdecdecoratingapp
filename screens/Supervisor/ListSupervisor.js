import React, { useState, useEffect } from "react";
import { View,StyleSheet,Image,CheckBox,TouchableOpacity,ScrollView,ActivityIndicator,Dimensions} from 'react-native';
import {Text} from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector, connect } from "react-redux";
import axios from "axios";

var rightArrow = require("../../assets/authScreen/right.png");

const ListSupervisor = (props) => {
  const { navigation,token } = props;
  const { name, email, id } = props.route.params;
  const [supervisorData,setSupervisorData] = useState([])
  const [showView,setShowView] = useState(false)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const body = { id, name, email };
      (async () => {
        setLoading(true);
        const request = await axios(
          "https://airtimetesting.airtime4u.com/public/tajs/public/api/admin/search/supervisor",
          {
            method: "POST",
            headers: {
              authorization: "Bearer " + token,
            },
            data: body,
          }
        );
        const response = await request.data;
        console.log(response);
        if (response.success) {
          setSupervisorData(response.data.user);
          setLoading(false);
          setShowView(true);
        } else {
          setLoading(false);
          setShowView(false);
        }
      })();
    } catch (err) {
      console.log("Error");
      console.log(err.message);
      setLoading(false);
    }
  }, []);
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color="#1073AC" size="small" />
      </View>
    );
  }
  else{
  return (
    <View style={styles.mainContainer}>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.refText}>Date: 12-2-2021</Text>
        <Text style={styles.refText}>Ref id: 10099499</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>List Of Supervisor</Text>
      </View>
      {showView ?
       <ScrollView contentContainerStyle={{ width: "100%" }}>
        <View style={styles.formConatiner}>
          {supervisorData.map((item,index)=>(
            <TouchableOpacity style={styles.listButton} key={index} onPress={() => navigation.navigate('DetailSupervisor',{userData:supervisorData[index]})}>
              <Text style={styles.emailText}>{item.id}</Text>
              <Text style={styles.emailText}>{item.name}</Text>
              <Image source={rightArrow} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView> 
     :
      <View style={{justifyContent:"center",alignItems:"center",width:"100%",height:"85%"}}>
        <Text>Sorry No Data Found !</Text>
      </View>
     }
     
    </View>
  );
  }
};
const mapStateToProps = (state) => ({
  token : state.auth.token
});
const mapDispatchToProps = (dispatch) => ({
  searchSupervisorHandler: () =>
    dispatch(
      searchSupervisor()
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(ListSupervisor);

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
  },
  dateTimeContainer: {
    height: "5%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  refText: {
    fontSize: 12,
    color: "#96A8B2",
    fontFamily: "poppins-medium",
  },
  titleContainer: {
    height: "10%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  titleText: {
    color: "#4F4F4F",
    fontSize: 18,
    fontFamily: "poppins-semiBold",
  },
  formConatiner: {
    width: "100%",
    padding: 30,
    alignItems: "center",
  },
  listButton: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 3,
    borderColor: "#1073AC",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  emailText: {
    color: "#4F4F4F",
    fontSize: 14,
    fontFamily: "poppins-semiBold",
  },
});
