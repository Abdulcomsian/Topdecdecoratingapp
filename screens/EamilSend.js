import React,{useEffect} from 'react';
import { View,StyleSheet,Image,Button, Linking} from 'react-native';
import {Text} from 'native-base';
import { connect } from 'react-redux'
import email from 'react-native-email'

var logo=require('../assets/authScreen/logo.jpeg');
const EamilSend = ( props ) =>{
    const {navigation}=props;
    const handleEmail = async () => {
        // const to = ['tiaan@email.com', 'foo@bar.com'] // string or array of email addresses
        // email(to, {
        //     // Optional additional arguments
        //     cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
        //     bcc: 'mee@mee.com', // string or array of email addresses
        //     subject: 'Show how to use',
        //     body: 'Some body right here'
        // }).catch(console.error)
        const subject = "Mail Subject"
        const message = "[{'pdfname': 'Hand Over','url': 'http://topdecdecoratingapp.com/public/pdf/handover1623212550.pdf'}]"
        await Linking.openURL(`mailto:gmail.com?subject=${subject}&body=${message}`);
    }
    return(
        <View style={styles.container}>
            <Button title="Send Mail" onPress={()=>handleEmail()} />
        </View>
    )
}
const mapDispatchToProps=dispatch=>({
    resetLoginFlag:()=>dispatch(resetLoginFlag())
})
export default connect(null,  mapDispatchToProps)(EamilSend);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

