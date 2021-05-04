import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: "100%",
    // borderWidth: 2,
    // borderColor: 'green',
    borderRadius: 5,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 10,

  },
});

export default function UploadImageField({ onPress }) {
  return (
<TouchableOpacity
    onPress={onPress}
    style={styles.input}
>
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
    }}
    >
      <Text style={styles.text}>
        Upload Image

      </Text>
{/* <Text> <Icon name="upload" size={25} color="#201" /></Text> */}
    </View>
  </TouchableOpacity>
  );
}