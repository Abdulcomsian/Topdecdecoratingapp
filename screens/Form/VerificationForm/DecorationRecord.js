import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Text } from "native-base";
import { connect } from "react-redux";
import { insertDecorationRecord } from "../../../Redux/action/auth/authActionTypes";


var plus = require("../../../assets/authScreen/plus.png");
const DecorationRecord = (props) => {
    const { navigation } = props;
  const [dynamicFirstInput, setdynamicFirstInput] = useState([]);
  const [dynamicSecondInput, setdynamicSeconfInput] = useState([]);

  const [dataFirstDecoration, setDataFirstDecoration] = useState({
    name: "",
    block: "",
    level: "",
    bedroom: "",
    price: "",
    plotArea: "",
    days: "",
    date: "",
    completinDate: "",
  });
  const [dataSecondDecoration, setDataSecondDecoration] = useState({
    name: "",
    block: "",
    level: "",
    bedroom: "",
    price: "",
    plotArea: "",
    days: "",
    date: "",
    completinDate: "",
  });
  const addDecorationRow = () => {
    setdynamicFirstInput((oldArray) => [...oldArray, dataFirstDecoration]);
    setDataFirstDecoration({
      name: "",
      block: "",
      level: "",
      bedroom: "",
      price: "",
      plotArea: "",
      days: "",
      date: "",
      completinDate: "",
    });
  };
  const addDecorationSecondRow = () => {
    setdynamicSeconfInput((oldArray) => [...oldArray, dataSecondDecoration]);
    setDataSecondDecoration({
      name: "",
      block: "",
      level: "",
      bedroom: "",
      price: "",
      plotArea: "",
      date: "",
      completinDate: "",
    });
  };
  const updateFirstValue = (key, index, value) => {
    let preData = [...dataFirstDecoration];
    preData[index][key] = value;
    setDataFirstDecoration(preData);
  };
  const updateSecondValue = (key, index, value) => {
    let preData = [...dataSecondDecoration];
    preData[index][key] = value;
    setDataSecondDecoration(preData);
  };
  const decorationRecordInsert = () =>{
      if(dynamicFirstInput && dynamicSecondInput){
        props.createDecorationRecordHandler(dynamicFirstInput,dynamicSecondInput)
      } else {
      alert("Please Insert All Fields CareFully !");
      return false;
    }
  } 
  return (
    <ScrollView style={{ height: "100%" }}>
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Decoration Record</Text>
        </View>
        <View style={{ height: "95%", width: "100%" }}>
          <ScrollView
            style={{ height: "100%", paddingLeft: 20, paddingRight: 20 }}
          >
            <View style={styles.tableViewContainer}>
              <View style={styles.tableHeader}>
                <View style={styles.headerTitleView}>
                  <Text style={styles.headerTitle}>Name</Text>
                </View>
                <View style={styles.headerTitleView}>
                  <Text style={styles.headerTitle}>Block</Text>
                </View>
                <View style={styles.headerTitleView}>
                  <Text style={styles.headerTitle}>Level</Text>
                </View>
                <View style={styles.headerTitleView}>
                  <Text style={styles.headerTitle}>Bed Room/s</Text>
                </View>
                <View style={styles.headerTitleView}>
                  <Text style={styles.headerTitle}>Price</Text>
                </View>
                <View style={styles.headerTitleView}>
                  <Text style={styles.headerTitle}>Plot/Areas</Text>
                </View>
                <View style={styles.headerTitleView}>
                  <Text style={styles.headerTitle}>No. of days</Text>
                </View>
                <View style={styles.headerTitleView}>
                  <Text style={styles.headerTitle}>Start Date</Text>
                </View>
                <View style={styles.headerTitleView}>
                  <Text style={styles.headerTitle}>Completion date</Text>
                </View>
              </View>

              <View style={{ flexDirection: "column" }}>
                {dynamicFirstInput.length > 0 &&
                  dynamicFirstInput.map((el, index) => (
                    <View style={styles.tableBody} key={index}>
                      <View style={styles.inputBodyContainer}>
                        <TextInput
                          onChangeText={(txt) =>
                            updateFirstValue("name", index, txt)
                          }
                          value={el.name}
                          style={styles.bodyTextInput}
                          placeholder={"Name"}
                        />
                      </View>
                      <View style={styles.inputBodyContainer}>
                        <TextInput
                          onChangeText={(txt) =>
                            updateFirstValue("block", index, txt)
                          }
                          value={el.block}
                          style={styles.bodyTextInput}
                          placeholder={"Block"}
                        />
                      </View>
                      <View style={styles.inputBodyContainer}>
                        <TextInput
                          onChangeText={(txt) =>
                            updateFirstValue("level", index, txt)
                          }
                          value={el.level}
                          style={styles.bodyTextInput}
                          placeholder={"level"}
                        />
                      </View>
                      <View style={styles.inputBodyContainer}>
                        <TextInput
                          onChangeText={(txt) =>
                            updateFirstValue("bedroom", index, txt)
                          }
                          value={el.bedroom}
                          style={styles.bodyTextInput}
                          placeholder={"Rooms"}
                        />
                      </View>
                      <View style={styles.inputBodyContainer}>
                        <TextInput
                          onChangeText={(txt) =>
                            updateFirstValue("price", index, txt)
                          }
                          value={el.price}
                          style={styles.bodyTextInput}
                          placeholder={"Price"}
                        />
                      </View>
                      <View style={styles.inputBodyContainer}>
                        <TextInput
                          onChangeText={(txt) =>
                            updateFirstValue("plotArea", index, txt)
                          }
                          value={el.plotArea}
                          style={styles.bodyTextInput}
                          placeholder={"Plot"}
                        />
                      </View>
                      <View style={styles.inputBodyContainer}>
                        <TextInput
                          onChangeText={(txt) =>
                            updateFirstValue("days", index, txt)
                          }
                          value={el.days}
                          style={styles.bodyTextInput}
                          placeholder={"Days"}
                        />
                      </View>
                      <View style={styles.inputBodyContainer}>
                        <TextInput
                          onChangeText={(txt) =>
                            updateFirstValue("date", index, txt)
                          }
                          value={el.date}
                          style={styles.bodyTextInput}
                          placeholder={"Date"}
                        />
                      </View>
                      <View style={styles.inputBodyContainer}>
                        <TextInput
                          onChangeText={(txt) =>
                            updateFirstValue("completinDate", index, txt)
                          }
                          value={el.completinDate}
                          style={styles.bodyTextInput}
                          placeholder={"Date"}
                        />
                      </View>
                    </View>
                  ))}
                <View style={styles.tableBody}>
                  <View style={styles.inputBodyContainer}>
                    <TextInput
                      onChangeText={(txt) =>
                        setDataFirstDecoration({
                          ...dataFirstDecoration,
                          name: txt,
                        })
                      }
                      value={dataFirstDecoration.name}
                      style={styles.bodyTextInput}
                      placeholder={"Name"}
                    />
                  </View>
                  <View style={styles.inputBodyContainer}>
                    <TextInput
                      onChangeText={(txt) =>
                        setDataFirstDecoration({
                          ...dataFirstDecoration,
                          block: txt,
                        })
                      }
                      value={dataFirstDecoration.block}
                      style={styles.bodyTextInput}
                      placeholder={"Block"}
                    />
                  </View>
                  <View style={styles.inputBodyContainer}>
                    <TextInput
                      onChangeText={(txt) =>
                        setDataFirstDecoration({
                          ...dataFirstDecoration,
                          level: txt,
                        })
                      }
                      value={dataFirstDecoration.level}
                      style={styles.bodyTextInput}
                      placeholder={"level"}
                    />
                  </View>
                  <View style={styles.inputBodyContainer}>
                    <TextInput
                      onChangeText={(txt) =>
                        setDataFirstDecoration({
                          ...dataFirstDecoration,
                          bedroom: txt,
                        })
                      }
                      value={dataFirstDecoration.bedroom}
                      style={styles.bodyTextInput}
                      placeholder={"Rooms"}
                    />
                  </View>
                  <View style={styles.inputBodyContainer}>
                    <TextInput
                      onChangeText={(txt) =>
                        setDataFirstDecoration({
                          ...dataFirstDecoration,
                          price: txt,
                        })
                      }
                      value={dataFirstDecoration.price}
                      style={styles.bodyTextInput}
                      placeholder={"Price"}
                    />
                  </View>
                  <View style={styles.inputBodyContainer}>
                    <TextInput
                      onChangeText={(txt) =>
                        setDataFirstDecoration({
                          ...dataFirstDecoration,
                          plotArea: txt,
                        })
                      }
                      value={dataFirstDecoration.plotArea}
                      style={styles.bodyTextInput}
                      placeholder={"Plot"}
                    />
                  </View>
                  <View style={styles.inputBodyContainer}>
                    <TextInput
                      onChangeText={(txt) =>
                        setDataFirstDecoration({
                          ...dataFirstDecoration,
                          days: txt,
                        })
                      }
                      value={dataFirstDecoration.days}
                      style={styles.bodyTextInput}
                      placeholder={"Days"}
                    />
                  </View>
                  <View style={styles.inputBodyContainer}>
                    <TextInput
                      onChangeText={(txt) =>
                        setDataFirstDecoration({
                          ...dataFirstDecoration,
                          date: txt,
                        })
                      }
                      value={dataFirstDecoration.date}
                      style={styles.bodyTextInput}
                      placeholder={"Date"}
                    />
                  </View>
                  <View style={styles.inputBodyContainer}>
                    <TextInput
                      onChangeText={(txt) =>
                        setDataFirstDecoration({
                          ...dataFirstDecoration,
                          completinDate: txt,
                        })
                      }
                      value={dataFirstDecoration.completinDate}
                      style={styles.bodyTextInput}
                      placeholder={"Date"}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <View style={styles.inputButtonBodyContainer}>
                  <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => addDecorationRow()}
                  >
                    <Image style={styles.plusBtn} source={plus} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Decoration Record</Text>
            </View>
            <View style={styles.tableViewContainer}>
              <View style={styles.tableHeader}>
                <View style={styles.headerDecorationTitleView}>
                  <Text style={styles.headerTitle}>Name</Text>
                </View>
                <View style={styles.headerDecorationTitleView}>
                  <Text style={styles.headerTitle}>Block</Text>
                </View>
                <View style={styles.headerDecorationTitleView}>
                  <Text style={styles.headerTitle}>Level</Text>
                </View>
                <View style={styles.headerDecorationTitleView}>
                  <Text style={styles.headerTitle}>Bed Room/s</Text>
                </View>
                <View style={styles.headerDecorationTitleView}>
                  <Text style={styles.headerTitle}>Price</Text>
                </View>
                <View style={styles.headerDecorationTitleView}>
                  <Text style={styles.headerTitle}>Plot</Text>
                </View>
                <View style={styles.headerDecorationTitleView}>
                  <Text style={styles.headerTitle}>Start Date</Text>
                </View>
                <View style={styles.headerDecorationTitleView}>
                  <Text style={styles.headerTitle}>Completion date</Text>
                </View>
              </View>

              <View style={{ flexDirection: "column" }}>
                {dynamicSecondInput.length > 0 &&
                  dynamicSecondInput.map((el, index) => (
                    <View style={styles.tableBody} key={index}>
                      <View style={styles.inputSecondBodyContainer}>
                        <TextInput
                          onChangeText={(txt) =>
                            updateSecondValue("name", index, txt)
                          }
                          value={el.name}
                          style={styles.bodyTextInput}
                          placeholder={"Name"}
                        />
                      </View>
                      <View style={styles.inputSecondBodyContainer}>
                        <TextInput
                          onChangeText={(txt) =>
                            updateSecondValue("block", index, txt)
                          }
                          value={el.block}
                          style={styles.bodyTextInput}
                          placeholder={"Block"}
                        />
                      </View>
                      <View style={styles.inputSecondBodyContainer}>
                        <TextInput
                          onChangeText={(txt) =>
                            updateSecondValue("level", index, txt)
                          }
                          value={el.level}
                          style={styles.bodyTextInput}
                          placeholder={"level"}
                        />
                      </View>
                      <View style={styles.inputSecondBodyContainer}>
                        <TextInput
                          onChangeText={(txt) =>
                            updateSecondValue("bedroom", index, txt)
                          }
                          value={el.bedroom}
                          style={styles.bodyTextInput}
                          placeholder={"Rooms"}
                        />
                      </View>
                      <View style={styles.inputSecondBodyContainer}>
                        <TextInput
                          onChangeText={(txt) =>
                            updateSecondValue("price", index, txt)
                          }
                          value={el.price}
                          style={styles.bodyTextInput}
                          placeholder={"Price"}
                        />
                      </View>
                      <View style={styles.inputSecondBodyContainer}>
                        <TextInput
                          onChangeText={(txt) =>
                            updateSecondValue("plotArea", index, txt)
                          }
                          value={el.plotArea}
                          style={styles.bodyTextInput}
                          placeholder={"Plot"}
                        />
                      </View>
                      <View style={styles.inputSecondBodyContainer}>
                        <TextInput
                          onChangeText={(txt) =>
                            updateSecondValue("date", index, txt)
                          }
                          value={el.date}
                          style={styles.bodyTextInput}
                          placeholder={"Date"}
                        />
                      </View>
                      <View style={styles.inputSecondBodyContainer}>
                        <TextInput
                          onChangeText={(txt) =>
                            updateSecondValue("completinDate", index, txt)
                          }
                          value={el.completinDate}
                          style={styles.bodyTextInput}
                          placeholder={"Date"}
                        />
                      </View>
                    </View>
                  ))}
                <View style={styles.tableBody}>
                  <View style={styles.inputSecondBodyContainer}>
                    <TextInput
                      onChangeText={(txt) =>
                        setDataSecondDecoration({
                          ...dataSecondDecoration,
                          name: txt,
                        })
                      }
                      value={dataSecondDecoration.name}
                      style={styles.bodyTextInput}
                      placeholder={"Name"}
                    />
                  </View>
                  <View style={styles.inputSecondBodyContainer}>
                    <TextInput
                      onChangeText={(txt) =>
                        setDataSecondDecoration({
                          ...dataSecondDecoration,
                          block: txt,
                        })
                      }
                      value={dataSecondDecoration.block}
                      style={styles.bodyTextInput}
                      placeholder={"Block"}
                    />
                  </View>
                  <View style={styles.inputSecondBodyContainer}>
                    <TextInput
                      onChangeText={(txt) =>
                        setDataSecondDecoration({
                          ...dataSecondDecoration,
                          level: txt,
                        })
                      }
                      value={dataSecondDecoration.level}
                      style={styles.bodyTextInput}
                      placeholder={"level"}
                    />
                  </View>
                  <View style={styles.inputSecondBodyContainer}>
                    <TextInput
                      onChangeText={(txt) =>
                        setDataSecondDecoration({
                          ...dataSecondDecoration,
                          bedroom: txt,
                        })
                      }
                      value={dataSecondDecoration.bedroom}
                      style={styles.bodyTextInput}
                      placeholder={"Rooms"}
                    />
                  </View>
                  <View style={styles.inputSecondBodyContainer}>
                    <TextInput
                      onChangeText={(txt) =>
                        setDataSecondDecoration({
                          ...dataSecondDecoration,
                          price: txt,
                        })
                      }
                      value={dataSecondDecoration.price}
                      style={styles.bodyTextInput}
                      placeholder={"Price"}
                    />
                  </View>
                  <View style={styles.inputSecondBodyContainer}>
                    <TextInput
                      onChangeText={(txt) =>
                        setDataSecondDecoration({
                          ...dataSecondDecoration,
                          plotArea: txt,
                        })
                      }
                      value={dataSecondDecoration.plotArea}
                      style={styles.bodyTextInput}
                      placeholder={"Plot"}
                    />
                  </View>
                  <View style={styles.inputSecondBodyContainer}>
                    <TextInput
                      onChangeText={(txt) =>
                        setDataSecondDecoration({
                          ...dataSecondDecoration,
                          date: txt,
                        })
                      }
                      value={dataSecondDecoration.date}
                      style={styles.bodyTextInput}
                      placeholder={"Date"}
                    />
                  </View>
                  <View style={styles.inputSecondBodyContainer}>
                    <TextInput
                      onChangeText={(txt) =>
                        setDataSecondDecoration({
                          ...dataSecondDecoration,
                          completinDate: txt,
                        })
                      }
                      value={dataSecondDecoration.completinDate}
                      style={styles.bodyTextInput}
                      placeholder={"Date"}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <View style={styles.inputButtonBodyContainer}>
                  <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => addDecorationSecondRow()}
                  >
                    <Image style={styles.plusBtn} source={plus} />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: "#000",
                  width: "100%",
                  height: ".5%",
                  marginBottom: 20,
                  marginTop: 20,
                }}
              ></View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.commonBtn}
                  onPress={() => decorationRecordInsert()}
                >
                  <Text style={styles.commonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};
const mapStateToProps = (state) => ({
    token: state.auth.token,
  });
  const mapDispatchToProps = (dispatch) => ({
    createDecorationRecordHandler: (
      dynamicFirstInput,
      dynamicSecondInput,
    ) =>
      dispatch(
        insertDecorationRecord(
          dynamicFirstInput,
          dynamicSecondInput,
        )
      ),
  });
export default connect(mapStateToProps, mapDispatchToProps)(DecorationRecord);

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    paddingBottom: 50,
  },
  titleContainer: {
    height: "5%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  titleText: {
    color: "#4F4F4F",
    fontSize: 18,
    fontFamily: "poppins-semiBold",
  },
  tableHeader: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
    marginTop: 20,
  },
  headerTitleView: {
    width: "11.1%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerDecorationTitleView: {
    width: "12.5%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 8,
    textAlign: "center",
    fontFamily: "poppins-bold",
  },
  plusBtn: {
    width: 12,
    height: 12,
  },
  addBtn: {
    justifyContent: "center",
    backgroundColor: "#F6F9FB",
    borderWidth: 1,
    borderColor: "#E2ECF2",
    padding: 5,
    borderRadius: 14,
    marginTop: 15,
  },
  inputBodyContainer: {
    width: "11.1%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputSecondBodyContainer: {
    width: "12.5%",
    justifyContent: "center",
    alignItems: "center",
  },
  bodyTextInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#96A8B2",
    padding: 5,
    fontSize: 12,
    color: "#96A8B2",
    marginLeft: 2,
    marginRight: 2,
    fontFamily: "poppins-regular",
  },
  tableBody: {
    width: "100%",
    flexDirection: "row",
  },
  inputSecondBodyContainer: {
    width: "12.5%",
    justifyContent: "center",
    alignItems: "center",
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
    height: "15%",
    marginBottom: 20,
  },
});
