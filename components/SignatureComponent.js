import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Signature from "react-native-signature-canvas";
import * as FileSystem from "expo-file-system";

const SignatureComponent = (props) => {
  const { returnImage } = props;
  const [img, setImg] = React.useState("");
  const handleSignature = (signature) => {
    const path = FileSystem.cacheDirectory + `${Math.random(0, 199)}.jpeg`;
    FileSystem.writeAsStringAsync(path, signature.replace("data:image/jpeg;base64,", ""), { encoding: FileSystem.EncodingType.Base64 })
      .then((res) => {
        console.log(res);
        FileSystem.getInfoAsync(path, { size: true, md5: true }).then((file) => {
          // console.log(file);
          // setImg(file);
          returnImage(path);
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <>
      <Signature
        // handle when you click save button
        boolean
        onOK={(img) => handleSignature(img)}
        onEmpty={() => console.log("empty")}
        // description text for signature
        descriptionText='Sign'
        // clear button text
        clearText='Clear'
        // save button text
        confirmText='Save'
        // String, webview style for overwrite default style, all style: https://github.com/YanYuanFE/react-native-signature-canvas/blob/master/h5/css/signature-pad.css
        webStyle={`.m-signature-pad--footer
    .button {
      background-color: #1073AC;
      color: #FFF;
    }`}
        autoClear={true}
        imageType={"image/jpeg"}
      />
    </>
  );
};

export default SignatureComponent;

const styles = StyleSheet.create({});
