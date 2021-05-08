import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  CheckBox,
} from "react-native";
import { Text } from "native-base";
import { connect } from "react-redux";
import ViewPager from "@react-native-community/viewpager";
import { updateVerificationTopTabs } from "../../../Redux/action/auth/authActionTypes";

var tick = require("../../../assets/authScreen/check.png");
var disableTick = require("../../../assets/authScreen/disable.png");
var rightArrow = require("../../../assets/authScreen/right.png");
const VerificationDetails = (props) => {
  const {
    navigation,
    token,
    isJobId,
    verificationMiscoatInfo,
    verificationDecorationInfo,
    verificationSngInfo,
    updateVerificationTopTabs
  } = props;
  const { plot_id, plotName } = props.route.params;

  console.log("Verification Plot ID :", plot_id);
  const [tab, setTab] = useState({
    miscoat: true,
    decoration: false,
    snag: false,
  });
  const [isLeft, setIsLeft] = useState(1);
  const _ref = useRef(null);
  const [activeTab, setActiveTab] = useState("Miscoat");

  const selectTabManually = (tabName) => {
    if (tabName === "Miscoat") {
      _ref.current.setPage(0);
      setIsLeft(1);
      setActiveTab("Miscoat");
    } else if (tabName === "Decoration") {
      _ref.current.setPage(1);
      setActiveTab("Decoration");
    } else {
      _ref.current.setPage(2);
      setIsLeft(2);
      setActiveTab("Sang");
    }
  };
  //updating the top tab states
  const swicthTabChecked = async (key1, key2, key3, value1, value2, value3) => {
    setTab({ ...tab, [key1]: value1, [key2]: value2, [key3]: value3 });
  };

  const [miscotArray, setMiscotArray] = useState(verificationMiscoatInfo);
  const [decorationArray, setDecorationArray] = useState(
    verificationDecorationInfo
  );
  const [snagArray, setSnagArray] = useState(verificationSngInfo);

  const checkedForm = (index, type) => {
    if (type == "Miscoat") {
      const preData = [...miscotArray];
      const flag = preData[index].chekecd;
      const tilte_name = "";

      if (flag) {
        preData[index].chekecd = false;
        setMiscotArray(preData);
      } else {
        preData[index].chekecd = true;
        setMiscotArray(preData);
        //setSendData((oldArray) => [...oldArray, { title: preData[index].text, tab_Name: activeTab}])
      }
    } else if (type == "Decoration") {
      const preData = [...decoration];
      const flag = preData[index].chekecd;
      if (flag) {
        preData[index].chekecd = false;
        setDecorationArray(preData);
      } else {
        preData[index].chekecd = true;
        setDecorationArray(preData);
      }
    } else {
      const preData = [...snag];
      const flag = preData[index].chekecd;
      if (flag) {
        preData[index].chekecd = false;
        setSnagArray(preData);
      } else {
        preData[index].chekecd = true;
        setSnagArray(preData);
      }
    }
  };
  React.useEffect(() => {
    setMiscotArray(verificationMiscoatInfo);
    setDecorationArray(verificationDecorationInfo);
    setSnagArray(verificationSngInfo);
  }, [
    verificationMiscoatInfo,
    verificationDecorationInfo,
    verificationSngInfo,
  ]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await updateVerificationTopTabs(plot_id, token);
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.refText}>Date: 12-2-2021</Text>
        <Text style={styles.refText}>Ref id: 10099499</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{plotName}</Text>
      </View>
      <View style={styles.tabsContainer}>
        <View style={styles.tabsView}>
          <TouchableOpacity onPress={() => selectTabManually("Miscoat")}>
            <Text style={tab.miscoat ? styles.activeTabText : styles.tabText}>
              Miscoat
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => selectTabManually("Decoration")}>
            <Text
              style={tab.decoration ? styles.activeTabText : styles.tabText}
            >
              Main decoration
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => selectTabManually("Snag")}>
            <Text style={tab.snag ? styles.activeTabText : styles.tabText}>
              Snag
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.viewrPagerConatiner}>
          <ViewPager
            ref={_ref}
            orientation="horizontal"
            scrollEnabled
            pageMargin={0}
            onPageSelected={(page) => {
              if (page.nativeEvent.position === 0) {
                swicthTabChecked(
                  "miscoat",
                  "decoration",
                  "snag",
                  true,
                  false,
                  false
                );
                setIsLeft(1);
                setActiveTab("Miscoat");
              } else if (page.nativeEvent.position === 1) {
                swicthTabChecked(
                  "miscoat",
                  "decoration",
                  "snag",
                  false,
                  true,
                  false
                );
                setActiveTab("Decoration");
              } else {
                swicthTabChecked(
                  "miscoat",
                  "decoration",
                  "snag",
                  false,
                  false,
                  true
                );
                setActiveTab("Snag");
              }
            }}
            style={styles.viewPager}
            initialPage={0}
          >
            <View style={styles.pageView} key="1">
              {miscotArray.map((item, index) => (
                <View style={styles.listView}>
                  {item.tickSign ? (
                    <View style={{ width: "100%", flexDirection: "row" }}>
                      {item.tickSign && (
                        <View style={styles.tickSign}>
                          <Image source={tick} />
                        </View>
                      )}
                      <View style={styles.textArowTrueView}>
                        <TouchableOpacity
                          style={styles.textArrow}
                          disabled={item?.tickSign}
                          onPress={() =>
                            navigation.navigate(item.url, {
                              tabName: activeTab,
                              plot_id: plot_id,
                              index,
                            })
                          }
                        >
                          <Text
                            style={{
                              color: "#1073AC",
                              marginRight: 10,
                              fontFamily: "poppins-semiBold",
                              fontSize: 14,
                            }}
                          >
                            {item.text}
                          </Text>
                          <Image source={rightArrow} />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.checkBoxTueView}>
                        <CheckBox
                          value={item.chekecd}
                          onValueChange={() => checkedForm(index, "Miscoat")}
                          style={styles.checkbox}
                        />
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                    >
                      <View style={styles.textArowView}>
                        <TouchableOpacity
                          disabled={item?.tickSign}
                          onPress={() =>
                            navigation.navigate(item.url, {
                              tabName: activeTab,
                              plot_id: plot_id,
                              index,
                            })
                          }
                          style={styles.disbaleTextArrow}
                        >
                          <Text
                            style={{
                              color: "#96A8B2",
                              marginRight: 10,
                              fontFamily: "poppins-semiBold",
                              fontSize: 14,
                            }}
                          >
                            {item.text}
                          </Text>
                          <Image source={disableTick} />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.checkBoxView}>
                        <CheckBox
                          value={item.chekecd}
                          onValueChange={() =>
                            item?.tickSign ? checkedForm(index, "Miscoat") : {}
                          }
                          style={styles.checkbox}
                        />
                      </View>
                    </View>
                  )}
                </View>
              ))}
            </View>
            <View style={styles.pageView} key="2">
              {decorationArray.map((item, index) => (
                <View style={styles.listView}>
                  {item.tickSign ? (
                    <View style={{ width: "100%", flexDirection: "row" }}>
                      {item.tickSign && (
                        <View style={styles.tickSign}>
                          <Image source={tick} />
                        </View>
                      )}
                      <View style={styles.textArowTrueView}>
                        <TouchableOpacity
                          style={styles.textArrow}
                          disabled={item?.tickSign}
                          onPress={() =>
                            navigation.navigate(item.url, {
                              tabName: activeTab,
                              plot_id: plot_id,
                              index,
                            })
                          }
                          key={index}
                        >
                          <Text
                            style={{
                              color: "#1073AC",
                              marginRight: 10,
                              fontFamily: "poppins-semiBold",
                              fontSize: 14,
                            }}
                          >
                            {item.text}
                          </Text>
                          <Image source={rightArrow} />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.checkBoxTueView}>
                        <CheckBox
                          value={item.chekecd}
                          onValueChange={() => checkedForm(index, "Decoration")}
                          style={styles.checkbox}
                        />
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                    >
                      <View style={styles.textArowView}>
                        <TouchableOpacity
                          disabled={item?.tickSign}
                          onPress={() =>
                            navigation.navigate(item.url, {
                              tabName: activeTab,
                              plot_id: plot_id,
                              index,
                            })
                          }
                          style={styles.disbaleTextArrow}
                          key={index}
                        >
                          <Text
                            style={{
                              color: "#96A8B2",
                              marginRight: 10,
                              fontFamily: "poppins-semiBold",
                              fontSize: 14,
                            }}
                          >
                            {item.text}
                          </Text>
                          <Image source={disableTick} />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.checkBoxView}>
                        <CheckBox
                          value={item.chekecd}
                          onValueChange={() =>
                            item?.tickSign
                              ? checkedForm(index, "Decoration")
                              : {}
                          }
                          style={styles.checkbox}
                        />
                      </View>
                    </View>
                  )}
                </View>
              ))}
            </View>
            <View style={styles.pageView} key="3">
              {snagArray.map((item, index) => (
                <View style={styles.listView}>
                  {item.tickSign ? (
                    <View style={{ width: "100%", flexDirection: "row" }}>
                      {item.tickSign && (
                        <View style={styles.tickSign}>
                          <Image source={tick} />
                        </View>
                      )}
                      <View style={styles.textArowTrueView}>
                        <TouchableOpacity
                          style={styles.textArrow}
                          disabled={item?.tickSign}
                          onPress={() =>
                            navigation.navigate(item.url, {
                              tabName: activeTab,
                              plot_id: plot_id,
                              index,
                            })
                          }
                          key={index}
                        >
                          <Text
                            style={{
                              color: "#1073AC",
                              marginRight: 10,
                              fontFamily: "poppins-semiBold",
                              fontSize: 14,
                            }}
                          >
                            {item.text}
                          </Text>
                          <Image source={rightArrow} />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.checkBoxTueView}>
                        <CheckBox
                          value={item.chekecd}
                          onValueChange={() => checkedForm(index, "Snag")}
                          style={styles.checkbox}
                        />
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                    >
                      <View style={styles.textArowView}>
                        <TouchableOpacity
                          disabled={item?.tickSign}
                          onPress={() =>
                            navigation.navigate(item.url, {
                              tabName: activeTab,
                              plot_id: plot_id,
                              index,
                            })
                          }
                          style={styles.disbaleTextArrow}
                          key={index}
                        >
                          <Text
                            style={{
                              color: "#96A8B2",
                              marginRight: 10,
                              fontFamily: "poppins-semiBold",
                              fontSize: 14,
                            }}
                          >
                            {item.text}
                          </Text>
                          <Image source={disableTick} />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.checkBoxView}>
                        <CheckBox
                          value={item.chekecd}
                          onValueChange={() =>
                            item?.tickSign ? checkedForm(index, "Snag") : {}
                          }
                          style={styles.checkbox}
                        />
                      </View>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </ViewPager>
        </View>
      </View>
    </View>
  );
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
  isJobId: state.auth.isJobId,
  verificationMiscoatInfo: state.summary.verificationMiscoatInfo,
  verificationDecorationInfo: state.summary.verificationDecorationInfo,
  verificationSngInfo: state.summary.verificationSngInfo,
});
const mapDispatchToProps = (dispatch) => ({
  updateVerificationTopTabs: (plot_Id, token) =>
    dispatch(updateVerificationTopTabs(plot_Id, token)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerificationDetails);
const styles = StyleSheet.create({
  viewPager: {
    height: "100%",
    width: "100%",
  },
  mainContainer: {
    height: "100%",
    width: "100%",
  },
  tabsContainer: {
    height: "70%",
    marginTop: 20,
    width: "100%",
  },
  dateTimeContainer: {
    height: "10%",
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
  tabStyle: {
    width: "100%",
    backgroundColor: "#fff",
  },
  tabsView: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    justifyContent: "center",
    height: "10%",
  },
  titleContainer: {
    height: "5%",
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
  tabText: {
    margin: 10,
    color: "#797979",
    opacity: 0.5,
    fontFamily: "poppins-semiBold",
  },
  currentTab: {
    margin: 10,
  },
  activeTabText: {
    margin: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#1073AC",
    color: "#1073AC",
    fontFamily: "poppins-semiBold",
    paddingBottom: 10,
  },
  viewrPagerConatiner: {
    width: "100%",
    height: "90%",
    marginTop: 12,
  },
  pageView: {
    paddingLeft: 10,
    paddingRight: 10,
    height: "100%",
    width: "100%",
  },
  textArrow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#F6F9FB",
    borderColor: "#E2ECF2",
    borderRadius: 14,
    width: "100%",
  },
  disbaleTextArrow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#F6F9FB",
    borderColor: "#96A8B2",
    borderRadius: 14,
    width: "100%",
  },
  textArowView: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  textArowTrueView: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  listView: {
    width: "100%",
    height: 60,
    flexDirection: "row",
  },
  tickSign: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  checkBoxView: {
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
  },
  checkBoxTueView: {
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
  },
});
