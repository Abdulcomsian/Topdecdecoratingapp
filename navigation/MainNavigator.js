import React from "react";
import { Button, Text, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { logout } from "../Redux/action/auth/authActionTypes";
//import { useNavigation } from "@react-navigation/native";
import Store from "../Redux";
import LoginScreen from "../screens/Auth/Login";
import ForgetPassword from "../screens/Auth/ForgetPassword";
import MainScreen from "../screens/Main/MainScreen";
import NewJob from "../screens/Main/CreateNewJob";
import PlotDetail from "../screens/Main/PlotDetails";
import FormTemplate from "../screens/Main/FormTemplate";
import NewSiteInspection from "../screens/Main/CreateSite";
import AddPhotoComment from "../screens/Main/AddPhotosComment";
import SelectSummary from "../screens/Main/SelectSummary";
import SelectSummaryDetail from "../screens/Main/SelectSummaryDetail";
import ViewJob from "../screens/Jobs/ViewJobs";
import SelectProject from "../screens/Jobs/SelectProject";
import SearchJob from "../screens/Jobs/SearchJob";
import AllJobs from "../screens/Jobs/AllJobs";
import DetailsJob from "../screens/Jobs/DetailsJob";
import TotalSummary from "../screens/Jobs/TotalSummary";
import ListSupervisor from "../screens/Supervisor/ListSupervisor";
import CreateDecorataor from "../screens/Decorator/CreateDecorator";
import SearchDecorator from "../screens/Decorator/SearchDecorator";
import DecoratorDetails from "../screens/Decorator/DecoratorDetail";
import ProfileDecorator from "../screens/Decorator/ProfileView";
import ViewNotes from "../screens/Decorator/ViewNotesLog";
import NotesDetail from "../screens/Decorator/DetailNotes";
import DecoratorProfile from "../screens/Decorator/DecoratorProfile";
import CreateSupervisor from "../screens/Supervisor/CreateSupervisor";
import AssignedJobsList from "../screens/Supervisor/AssignedJobsList";
import SearchSupervisor from "../screens/Supervisor/SearchSupervisor";
import DetailSupervisor from "../screens/Supervisor/DetailSupervisor";
import ProfileSupervisor from "../screens/Supervisor/ProfileView";
import SplashScreen from "../screens/SplashScreen";
import HandOverForm from "../screens/Form/HandOver";
import MakeReady from "../screens/Form/MakeReady";
import WranntySannging from "../screens/Form/WranntySannging";
import QualityInssurance from "../screens/Form/QualityAnsurance";
import RemedialWork from "../screens/Form/RemedialWorkSheet";
import Scope from "../screens/Form/Scope";
import VerificationDetail from "../screens/Form/VerificationForm/VerificationDetails";
import DayWork from "../screens/Form/VerificationForm/AccurateDayWork";
import DecorationRecord from "../screens/Form/VerificationForm/DecorationRecord";
import MisCoat from "../screens/Form/VerificationForm/MisCoat";
import SiteInstruction from "../screens/Form/VerificationForm/SiteInstruction";
import VerificationWork from "../screens/Form/VerificationForm/VerificationOfWork";
import HealthSafety from "../screens/Form/HealthSafety/HealthSafetyDetail";
import AccidentReport from "../screens/Form/HealthSafety/AccidentReport";
import CleanUp from "../screens/Form/HealthSafety/CleanUp";
import ElectricalEquipment from "../screens/Form/HealthSafety/ElectricalEquipment";
import FridayPack from "../screens/Form/HealthSafety/FridayPack";
import HarmFulSubstance from "../screens/Form/HealthSafety/HarmFulSubstance";
import HealthSafetyInspection from "../screens/Form/HealthSafety/HealthSafetyInspection";
import HouseKepping from "../screens/Form/HealthSafety/HouseKepping";
import LadderCheckList from "../screens/Form/HealthSafety/LadderCheckList";
import MethodStatement from "../screens/Form/HealthSafety/MethodStatementRegister";
import IssueCard from "../screens/Form/HealthSafety/IssueRecordCard";
import PowerInspection from "../screens/Form/HealthSafety/PuwerInspection";
import SiteDecoration from "../screens/Form/HealthSafety/OnSiteDecoration";
import RecordofProject from "../screens/Form/HealthSafety/RecordOfProject";
import DailyBreifing from "../screens/Form/HealthSafety/DailyBreifingForm";
import SafeWork from "../screens/Form/HealthSafety/SafeWorkProcedure";
import Tbtcoshh from "../screens/Form/HealthSafety/TBT_COSHH";
import Tbtfire from "../screens/Form/HealthSafety/TBT_Fire";
import Tbtslip from "../screens/Form/HealthSafety/TBT_Slip";
import Covid from "../screens/Form/HealthSafety/Covid";
import Tbtform from "../components/common/tbtFrom";
import ListView from "../components/common/listView";
import Tbthouse from "../screens/Form/HealthSafety/TBT_HouseKeeping";
import Tbtmobile from "../screens/Form/HealthSafety/TBT_MobileElevated";
import Tbtrespiratory from "../screens/Form/HealthSafety/TBT_RespiratoryProtection";
import Tbtsilica from "../screens/Form/HealthSafety/TBT_SilicaDust";
import Tbtdrugs from "../screens/Form/HealthSafety/TBT_Drugs";
import Tbtvolience from "../screens/Form/HealthSafety/TBT_Volience";
import Tbtworking from "../screens/Form/HealthSafety/TBT_Working";
import TbtRegister from "../screens/Form/HealthSafety/TBT_TalkRegister";
import TbtInventory from "../screens/Form/HealthSafety/TBT_Inventory";
import EmailSend from "../screens/EamilSend";

const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = "Splash";

const MainNavigator = ({ navigation, route }) => {
  //   navigation.setOptions({ ...getHeaderTitle(route) });
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={getHeaderTitle("Splash")}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        //options={{ headerShown: false }}
        options={getHeaderTitle("LoginScreen")}
      />
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={getHeaderTitle("MainScreen")}
      />
      <Stack.Screen
        name="NewJob"
        component={NewJob}
        options={getHeaderTitle("NewJob")}
      />
      <Stack.Screen
        name="PlotDetails"
        component={PlotDetail}
        options={getHeaderTitle("PlotDetails")}
      />
      <Stack.Screen
        name="FormTemplate"
        component={FormTemplate}
        options={getHeaderTitle("FormTemplate")}
      />
      <Stack.Screen
        name="NewSiteInspection"
        component={NewSiteInspection}
        options={getHeaderTitle("NewSiteInspection")}
      />
      <Stack.Screen
        name="AddPhotoComment"
        component={AddPhotoComment}
        options={getHeaderTitle("AddPhotoComment")}
      />
      <Stack.Screen
        name="ViewJob"
        component={ViewJob}
        options={getHeaderTitle("ViewJob")}
      />
      <Stack.Screen
        name="SelectProject"
        component={SelectProject}
        options={getHeaderTitle("SelectProject")}
      />
      <Stack.Screen
        name="SearchJob"
        component={SearchJob}
        options={getHeaderTitle("SearchJob")}
      />
      <Stack.Screen
        name="CreateDecorataor"
        component={CreateDecorataor}
        options={getHeaderTitle("CreateDecorataor")}
      />
      <Stack.Screen
        name="SearchDecorator"
        component={SearchDecorator}
        options={getHeaderTitle("SearchDecorator")}
      />
      <Stack.Screen
        name="DecoratorDetails"
        component={DecoratorDetails}
        options={getHeaderTitle("DecoratorDetails")}
      />
      <Stack.Screen
        name="ViewNotes"
        component={ViewNotes}
        options={getHeaderTitle("ViewNotes")}
      />
      <Stack.Screen
        name="NotesDetail"
        component={NotesDetail}
        options={getHeaderTitle("NotesDetail")}
      />
      <Stack.Screen
        name="CreateSupervisor"
        component={CreateSupervisor}
        options={getHeaderTitle("CreateSupervisor")}
      />
      <Stack.Screen
        name="AssignedJobsList"
        component={AssignedJobsList}
        options={getHeaderTitle("AssignedJobsList")}
      />
      <Stack.Screen
        name="SearchSupervisor"
        component={SearchSupervisor}
        options={getHeaderTitle("SearchSupervisor")}
      />
      <Stack.Screen
        name="DetailSupervisor"
        component={DetailSupervisor}
        options={getHeaderTitle("DetailSupervisor")}
      />
      <Stack.Screen
        name="ProfileSupervisor"
        component={ProfileSupervisor}
        options={getHeaderTitle("ProfileSupervisor")}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={getHeaderTitle("ForgetPassword")}
      />
      <Stack.Screen
        name="SelectSummary"
        component={SelectSummary}
        options={getHeaderTitle("SelectSummary")}
      />
      <Stack.Screen
        name="SelectSummaryDetail"
        component={SelectSummaryDetail}
        options={getHeaderTitle("SelectSummaryDetail")}
      />
      <Stack.Screen
        name="DecoratorProfile"
        component={DecoratorProfile}
        options={getHeaderTitle("DecoratorProfile")}
      />
      <Stack.Screen
        name="ProfileDecorator"
        component={ProfileDecorator}
        options={getHeaderTitle("ProfileDecorator")}
      />
      <Stack.Screen
        name="HandOverForm"
        component={HandOverForm}
        options={getHeaderTitle("HandOverForm")}
      />
      <Stack.Screen
        name="MakeReady"
        component={MakeReady}
        options={getHeaderTitle("MakeReady")}
      />
      <Stack.Screen
        name="WranntySannging"
        component={WranntySannging}
        options={getHeaderTitle("WranntySannging")}
      />
      <Stack.Screen
        name="QualityInssurance"
        component={QualityInssurance}
        options={getHeaderTitle("QualityInssurance")}
      />
      <Stack.Screen
        name="RemedialWork"
        component={RemedialWork}
        options={getHeaderTitle("RemedialWork")}
      />
      <Stack.Screen
        name="Scope"
        component={Scope}
        options={getHeaderTitle("Scope")}
      />
      <Stack.Screen
        name="VerificationDetails"
        component={VerificationDetail}
        options={getHeaderTitle("VerificationDetails")}
      />
      <Stack.Screen
        name="DayWork"
        component={DayWork}
        options={getHeaderTitle("DayWork")}
      />
      <Stack.Screen
        name="DecorationRecord"
        component={DecorationRecord}
        options={getHeaderTitle("DecorationRecord")}
      />
      <Stack.Screen
        name="MisCoat"
        component={MisCoat}
        options={getHeaderTitle("MisCoat")}
      />
      <Stack.Screen
        name="SiteInstruction"
        component={SiteInstruction}
        options={getHeaderTitle("SiteInstruction")}
      />
      <Stack.Screen
        name="VerificationWork"
        component={VerificationWork}
        options={getHeaderTitle("VerificationWork")}
      />
      <Stack.Screen
        name="HealthSafety"
        component={HealthSafety}
        options={getHeaderTitle("HealthSafety")}
      />
      <Stack.Screen
        name="AccidentReport"
        component={AccidentReport}
        options={getHeaderTitle("AccidentReport")}
      />
      <Stack.Screen
        name="CleanUp"
        component={CleanUp}
        options={getHeaderTitle("CleanUp")}
      />
      <Stack.Screen
        name="ElectricalEquipment"
        component={ElectricalEquipment}
        options={getHeaderTitle("ElectricalEquipment")}
      />
      <Stack.Screen
        name="FridayPack"
        component={FridayPack}
        options={getHeaderTitle("FridayPack")}
      />
      <Stack.Screen
        name="HarmFulSubstance"
        component={HarmFulSubstance}
        options={getHeaderTitle("HarmFulSubstance")}
      />
      <Stack.Screen
        name="HealthSafetyInspection"
        component={HealthSafetyInspection}
        options={getHeaderTitle("HealthSafetyInspection")}
      />
      <Stack.Screen
        name="HouseKepping"
        component={HouseKepping}
        options={getHeaderTitle("HouseKepping")}
      />
      <Stack.Screen
        name="LadderCheckList"
        component={LadderCheckList}
        options={getHeaderTitle("LadderCheckList")}
      />
      <Stack.Screen
        name="MethodStatement"
        component={MethodStatement}
        options={getHeaderTitle("MethodStatement")}
      />
      <Stack.Screen
        name="IssueCard"
        component={IssueCard}
        options={getHeaderTitle("IssueCard")}
      />
      <Stack.Screen
        name="PowerInspection"
        component={PowerInspection}
        options={getHeaderTitle("PowerInspection")}
      />
      <Stack.Screen
        name="SiteDecoration"
        component={SiteDecoration}
        options={getHeaderTitle("SiteDecoration")}
      />
      <Stack.Screen
        name="RecordofProject"
        component={RecordofProject}
        options={getHeaderTitle("RecordofProject")}
      />
      <Stack.Screen
        name="DailyBreifing"
        component={DailyBreifing}
        options={getHeaderTitle("DailyBreifing")}
      />
      <Stack.Screen
        name="SafeWork"
        component={SafeWork}
        options={getHeaderTitle("SafeWork")}
      />
      <Stack.Screen
        name="TBTCOSHH"
        component={Tbtcoshh}
        options={getHeaderTitle("TBTCOSHH")}
      />
      <Stack.Screen
        name="TBTFIRE"
        component={Tbtfire}
        options={getHeaderTitle("TBTFIRE")}
      />
      <Stack.Screen
        name="TBTSLIP"
        component={Tbtslip}
        options={getHeaderTitle("TBTSLIP")}
      />
      <Stack.Screen
        name="Covid"
        component={Covid}
        options={getHeaderTitle("Covid")}
      />
      <Stack.Screen
        name="Tbtform"
        component={Tbtform}
        options={getHeaderTitle("Tbtform")}
      />
      <Stack.Screen
        name="ListView"
        component={ListView}
        options={getHeaderTitle("ListView")}
      />
      <Stack.Screen
        name="Tbthouse"
        component={Tbthouse}
        options={getHeaderTitle("Tbthouse")}
      />
      <Stack.Screen
        name="Tbtmobile"
        component={Tbtmobile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Tbtrespiratory"
        component={Tbtrespiratory}
        options={getHeaderTitle("Tbtrespiratory")}
      />
      <Stack.Screen
        name="Tbtsilica"
        component={Tbtsilica}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Tbtdrugs"
        component={Tbtdrugs}
        options={getHeaderTitle("Tbtdrugs")}
      />
      <Stack.Screen
        name="Tbtvolience"
        component={Tbtvolience}
        options={getHeaderTitle("Tbtvolience")}
      />
      <Stack.Screen
        name="Tbtworking"
        component={Tbtworking}
        options={getHeaderTitle("Tbtworking")}
      />
      <Stack.Screen
        name="TbtRegister"
        component={TbtRegister}
        options={getHeaderTitle("TbtRegister")}
      />
      <Stack.Screen
        name="TbtInventory"
        component={TbtInventory}
        options={getHeaderTitle("TbtInventory")}
      />
      <Stack.Screen
        name="AllJobs"
        component={AllJobs}
        options={getHeaderTitle("AllJobs")}
      />
      <Stack.Screen
        name="DetailsJob"
        component={DetailsJob}
        options={getHeaderTitle("DetailsJob")}
      />
      <Stack.Screen
        name="TotalSummary"
        component={TotalSummary}
        // options={{
        //   headerLeft: (props) => (
        //     <Text onPress={() => props.navigation.navigate("MainScreen")}>
        //       Back
        //     </Text>
        //   ),
        //   headerShown: true,
        // }}
        options={getHeaderTitle("TotalSummary")}
      />
      <Stack.Screen
        name="ListSupervisor"
        component={ListSupervisor}
        options={getHeaderTitle("ListSupervisor")}
      />
      <Stack.Screen
        name="EmailSend"
        component={EmailSend}
        options={getHeaderTitle("EmailSend")}
      />
    </Stack.Navigator>
  );
};
const getHeaderCommonSetting = () => {
  //const navigation = useNavigation();
  return {
    headerShown: true,
    headerTintColor: "#fff",
    headerStyle: {
      backgroundColor: "#1073AC",
    },
    headerTitleAlign: 'center' ,
    headerBackTitleVisible: false,
    headerTitleStyle: {
      alignSelf: "center",
      fontFamily: "poppins-regular",
    },
    headerRight: () => (
      <Button
        onPress={() => Store.dispatch(logout())}
        title="Logout"
        color={Platform.OS === "ios" ? "#fff" : "#1073AC"}
      />
    ),
  };
};
const getHeaderTitle = (routeName) => {
  //   const routeName =
  //     route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Splash":
      return { headerShown: false };
    case "LoginScreen":
      return { headerShown: false };

    case "EmailSend":
      return {
        ...getHeaderCommonSetting(),
      };
    case "MainScreen":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Home",
      };
    case "NewJob":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Create New Job",
      };
    case "PlotDetails":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "WorkFlow Details",
        // headerRight: () => (
        //    <TouchableOpacity style={{marginRight:50}} onPress={()=>sendEmail()}>
        //        <Image style={{width:30,height:30}} source={email}/>
        //    </TouchableOpacity>
        //   ),
      };
    case "NewSiteInspection":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Create New Job",
      };
    case "ViewJob":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "View Search Job",
      };
    case "SelectProject":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Select Project",
      };
    case "SearchJob":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Search Project",
      };
    case "CreateDecorataor":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Create Decorataor",
      };
    case "SearchDecorator":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Search Decorataor",
      };
    case "ViewNotes":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "View Notes Logs",
      };
    case "NotesDetail":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Detail Notes Logs",
      };
    case "CreateSupervisor":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Create Supervisor",
      };
    case "AssignedJobsList":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Assigned Job List",
      };
    case "SearchSupervisor":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Search Supervisor",
      };
    case "DetailSupervisor":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Supervisor Detail",
      };
    case "MakeReady":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Make Ready Sheet",
      };
    case "WranntySannging":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Pre Warranty Snagging",
      };
    case "QualityInssurance":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Quality Assurance Inspection",
      };
    case "RemedialWork":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Remedial Work Sheet",
      };
    case "Scope":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Scope",
      };
    case "VerificationDetails":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Verification Details",
      };
    case "DayWork":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Accurate Day Work Sheet",
      };
    case "DecorationRecord":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Decoration Record",
      };
    case "MisCoat":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Mis Coat",
      };
    case "SiteInstruction":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Site Instruction",
      };
    case "VerificationWork":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Verification Of Work",
      };
    case "HealthSafety":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Health Safety Details",
      };
    case "AccidentReport":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Accident Report Form",
      };
    case "CleanUp":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Notice to Clean up",
      };
    case "ElectricalEquipment":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Electrical Equipment",
      };
    case "FridayPack":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Friday Pack",
      };
    case "HarmFulSubstance":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Harm Ful Substance",
      };
    case "HealthSafetyInspection":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "HealthSafety Inspection",
      };
    case "HouseKepping":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "House Keeping Checklist",
      };
    case "LadderCheckList":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Ladder Check List",
      };
    case "MethodStatement":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Method Statement Register",
      };
    case "IssueCard":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Issue Record Card",
      };
    case "PowerInspection":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Power Inspection CheckList",
      };
    case "SiteDecoration":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "On Site Decoration",
      };
    case "RecordofProject":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Record Of Project",
      };
    case "DailyBreifing":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Daily Breifing Form",
      };
    case "SafeWork":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Safe Work Procedure",
      };
    case "TBTCOSHH":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "TBT COSHH",
      };
    case "TBTFIRE":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "TBT FIRE",
      };
    case "TBTSLIP":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "TBT SLIP TRIP & FALLS",
      };
    case "Covid":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Coronavirus",
      };
    case "Tbthouse":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "House Keeping",
      };
    case "Tbtmobile":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Mobile Elevated (MEWP)",
      };
    case "Tbtrespiratory":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Respiratory Protection (RPE)",
      };
    case "Tbtsilica":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Silica Dust",
      };
    case "Tbtdrugs":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Drugs and Alcohol",
      };
    case "Tbtvolience":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Violence and Aggression",
      };
    case "Tbtworking":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Working at Height",
      };
    case "TbtRegister":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Working at Height",
      };
    case "TbtInventory":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Working at Height Equipment",
      };
    case "AllJobs":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "All Jobs",
      };
    case "DetailsJob":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Job Details",
      };
    case "TotalSummary":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Total Job Summary",
      };
    case "ListSupervisor":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "List Of Supervisor",
      };
    case "DecoratorDetails":
      return {
        ...getHeaderCommonSetting(),
        headerTitle: "Decorator Detail",
      };
  }
};
export default MainNavigator;
