import React,{useEffect} from 'react';
import { View,StyleSheet,Image} from 'react-native';
import {Text} from 'native-base';
import { connect } from 'react-redux'
import { resetLoginFlag } from '../Redux/action/auth/authActionTypes';

var logo=require('../assets/authScreen/logo.png');
const SplashScreen = ( props ) =>{
    const {navigation}=props;
    // useEffect(() => {
    //     const timer = setTimeout(()=>{
    //         navigation.navigate('LoginScreen');
    //     },5000);
    //     return () => clearTimeout(timer);
    // }, []);
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            props.resetLoginFlag()
            setTimeout(()=>{
                        navigation.navigate('LoginScreen');
                     },5000);
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);
    return(
            <View style={styles.mainContainer}>
                <View style={styles.logoContainer}>
                    <View style={styles.logoImageContainer}>
                        <Image style={styles.logoImage} source={logo}/>
                    </View>
                    <Text style={styles.mainBannerText}><Text style={styles.boldText}>Top Dec</Text> Decorating</Text>
                </View>
                <View style={styles.lastContainer}>
                    <Text style={styles.calimText}>Excepteur sint occaecat cupidatat non proident, sunt in culpa</Text>
                </View>
            </View>
    )
}
const mapDispatchToProps=dispatch=>({
    resetLoginFlag:()=>dispatch(resetLoginFlag())
})
export default connect(null,  mapDispatchToProps)(SplashScreen);

const styles = StyleSheet.create({
    mainContainer:{
        height:'100%',
        width:'100%',
    },
    logoContainer:{
        height:'90%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    logoImageContainer:{
        justifyContent:'center',
        width:'100%',
        height:150,
        alignItems:'center',
        textAlign:'center',
    },
    logoImage:{
        justifyContent:'center'
    },
    mainBannerText:{
        fontSize:25,
        marginTop:60,
        fontFamily:'poppins-regular',
        color:"#333333",
        textAlign:"center"
    },
    boldText:{
        fontSize:25,
        fontFamily:'poppins-bold',
    },
    iconImg:{
        position:'absolute',
        left:0,
        zIndex:999999999
    },
    lastContainer:{
        height:'10%',
        width:"100%",
        alignItems:'center',
        justifyContent:'center',
    },
    calimText:{
        textAlign:'center',
        fontSize:8,
        color:"#637E8D",
        fontFamily:'poppins-regular'
    }
});

