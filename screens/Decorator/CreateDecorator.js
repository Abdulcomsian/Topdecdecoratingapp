import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Text } from "native-base";
import { useDispatch, useSelector, connect } from "react-redux";
import { createDecorator } from "../../Redux/action/auth/authActionTypes";
import * as ImagePicker from "expo-image-picker";

const CreateDecorataor = (props) => {
  const { navigation,token, createDecorator, createDecoratorMsg } = props;
  const [photoID, setPhotoID] = useState(null);
  const [cscsFront, setCscsFront] = useState(null);
  const [cscsBack, setCscsBack] = useState(null);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const postCreateDecortor = () => {
   
   
    try {
      if(name!="", lastName!="", email!="", number!="", password!=""){
      let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      let regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      if (regEmail.test(email) === false) {
        alert("Email is Not Correct");
        setEmail(email);
        return false;
      } else {
        setEmail(email);
        console.log("Email is Correct");
        if (regPass.test(password) === false) {
          alert("Password is Not Correct");
          setPassword(password);
          return false;
        } else {
          // let frmData = new FormData();
          // frmData.append('avatar', {
          //   file: Platform.OS === 'android' ? photoID.localUri : photoID.localUri.replace('file://', ''),
          //   name: Math.random(0, 1000).toString(),
          //   // type: 'image/png', // it may be necessary in Android.
          // });
          // console.log(frmData)
          // console.log("Password is Correct");

          // let localUri = photoID.localUri;
          // let filename = localUri.split('/').pop();
          // let match = /\.(\w+)$/.exec(filename);
          // let type = match ? `image/${match[1]}` : `image`;
          //  let formData = new FormData();
          //     formData.append('photo', { uri: localUri, name: filename, type });
          console.log("firstname :", name);
      console.log("lastname :", lastName);
      console.log("email :", email);
      console.log("phone :", number);
      console.log("password :", password);
      console.log("Token :", token);
          props.createDecoratorHandler(
            name,
            lastName,
            email,
            number,
            password,
            token
          );
          
          
          return true;
        }
      }
    }else{
      alert("Please Insert All Fields CareFully !")
    }
     
    } catch (err) {
      console.log(err.message);
    }
  };
  const uploadPhotoImage = async (type) => {
    if (type == "photoID") {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }
      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (pickerResult.cancelled === true) {
        return;
      }
      console.log("Piceker Result :",pickerResult)
    
      // frmData.append('avatar', {
      //   file: Platform.OS === 'android' ? photoID.localUri : photoID.localUri.replace('file://', ''),
      //   name: Math.random(0, 1000).toString(),
      //   // type: 'image/png', // it may be necessary in Android.
      // });
      setPhotoID({ localUri: pickerResult.uri });
    } else if (type == "cscsFront") {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }
      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (pickerResult.cancelled === true) {
        return;
      }

      setCscsFront({ localUri: pickerResult.uri });
    } else if (type == "cscsBack") {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }
      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (pickerResult.cancelled === true) {
        return;
      }

      setCscsBack({ localUri: pickerResult.uri });
    }
  };
  React.useEffect(()=>{
    if(createDecorator){
      console.log("here")
        
        if(createDecoratorMsg){
            props.navigation.navigate('MainScreen')
        }
    }
    else{
        if(createDecoratorMsg){
            alert(createDecoratorMsg)
        }
    }
},[createDecorator,createDecoratorMsg])
  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Create Decorataor</Text>
      </View>
      <ScrollView>
        <View style={styles.formConatiner}>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Name"}
              value={name}
              onChangeText={(e) => setName(e)}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Last Name"}
              value={lastName}
              onChangeText={(e) => setLastName(e)}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.decoratorTitle}>Photo ID:</Text>
              {photoID == null ? (
                <TouchableOpacity
                  style={styles.selectFileBtn}
                  onPress={() => uploadPhotoImage("photoID")}
                >
                  <Text
                    style={{ fontSize: 12, fontFamily: "poppins-semiBold" }}
                  >
                    Select File
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={{ marginLeft: 30, flexDirection: "row" }}>
                  <Image
                    source={{ uri: photoID.localUri }}
                    style={styles.thumbnail}
                  />
                </View>
              )}
            </View>
          </View>
          <View style={styles.inputFieldContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.decoratorTitle}>CSCS Card Front:</Text>
              {cscsFront == null ? (
                <TouchableOpacity
                  style={styles.selectFileBtn}
                  onPress={() => uploadPhotoImage("cscsFront")}
                >
                  <Text
                    style={{ fontSize: 12, fontFamily: "poppins-semiBold" }}
                  >
                    Select File
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={{ marginLeft: 30, flexDirection: "row" }}>
                  <Image
                    source={{ uri: cscsFront.localUri }}
                    style={styles.thumbnail}
                  />
                </View>
              )}
            </View>
          </View>
          <View style={styles.inputFieldContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.decoratorTitle}>CSCS Card Back:</Text>
              {cscsBack == null ? (
                <TouchableOpacity
                  style={styles.selectFileBtn}
                  onPress={() => uploadPhotoImage("cscsBack")}
                >
                  <Text
                    style={{ fontSize: 12, fontFamily: "poppins-semiBold" }}
                  >
                    Select File
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={{ marginLeft: 30, flexDirection: "row" }}>
                  <Image
                    source={{ uri: cscsBack.localUri }}
                    style={styles.thumbnail}
                  />
                </View>
              )}
            </View>
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Email"}
              value={email}
              onChangeText={(e) => setEmail(e)}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Password"}
              value={password}
              onChangeText={(e) => setPassword(e)}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={"Contact Number"}
              value={number}
              onChangeText={(e) => setNumber(e)}
            />
          </View>
          <View style={styles.btnContainer}>
            {/* <TouchableOpacity style={styles.commonBtn} onPress={() => navigation.navigate('DecoratorProfile')}>
                                <Text style={styles.commonText}>Save</Text>
                            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.commonBtn}
              onPress={() => postCreateDecortor()}
            >
              <Text style={styles.commonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = (state) => ({
  token : state.auth.token,
  createDecorator : state.auth.createDecorator,
  createDecoratorMsg : state.auth.createDecoratorMsg
});
const mapDispatchToProps = (dispatch) => ({
  createDecoratorHandler: (
    name,
            lastName,
            email,
            number,
            password,
            token
  ) =>
    dispatch(
      createDecorator(
        name,
            lastName,
            email,
            number,
            password,
            token
      )
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateDecorataor);

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
  },
  titleContainer: {
    height: "5%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
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
  inputFieldContainer: {
    width: "100%",
    height: 80,
  },
  inputField: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#96A8B2",
    padding: 5,
    fontSize: 16,
    color: "#96A8B2",
    fontFamily: "poppins-regular",
  },
  inputContainer: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  quantityInput: {
    width: "30%",
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: "#96A8B2",
    padding: 5,
    fontSize: 16,
    marginRight: 20,
  },
  descriptionInput: {
    width: "50%",
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: "#96A8B2",
    padding: 5,
    fontSize: 16,
  },
  addBtn: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  dynamicInput: {
    width: "100%",
    flexDirection: "row",
    marginTop: 30,
    position: "relative",
  },
  addBtn: {
    justifyContent: "center",
    backgroundColor: "#F6F9FB",
    borderWidth: 1,
    borderColor: "#E2ECF2",
    padding: 15,
    borderRadius: 14,
  },
  plusBtn: {
    width: 18,
    height: 18,
  },
  commonBtn: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 3,
    borderColor: "#1073AC",
  },
  commonText: {
    color: "#1073AC",
    fontSize: 18,
    fontFamily: "poppins-semiBold",
  },
  btnContainer: {
    width: "100%",
    marginTop: 30,
  },
  selectFileBtn: {
    borderWidth: 1,
    marginLeft: 30,
    justifyContent: "center",
    borderRadius: 6,
    padding: 5,
  },
  thumbnail: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  decoratorTitle: {
    color: "#96A8B2",
    fontFamily: "poppins-regular",
  },
});
