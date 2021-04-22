import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/Login'
import ForgetPassword from '../screens/Auth/ForgetPassword'
import MainScreen from '../screens/Main/MainScreen'
import NewJob from '../screens/Main/CreateNewJob'
import PlotDetail from '../screens/Main/PlotDetails'
import FormTemplate from '../screens/Main/FormTemplate'
import NewSiteInspection from '../screens/Main/CreateSite'
import AddPhotoComment from '../screens/Main/AddPhotosComment'
import SelectSummary from '../screens/Main/SelectSummary'
import SelectSummaryDetail from '../screens/Main/SelectSummaryDetail'
import ViewJob from '../screens/Jobs/ViewJobs'
import SelectProject from '../screens/Jobs/SelectProject'
import SearchJob from '../screens/Jobs/SearchJob'
import AllJobs from '../screens/Jobs/AllJobs'
import DetailsJob from '../screens/Jobs/DetailsJob'
import TotalSummary from '../screens/Jobs/TotalSummary'
import ListSupervisor from '../screens/Supervisor/ListSupervisor'
import CreateDecorataor from '../screens/Decorator/CreateDecorator'
import SearchDecorator from '../screens/Decorator/SearchDecorator'
import DecoratorDetails from '../screens/Decorator/DecoratorDetail'
import ViewNotes from '../screens/Decorator/ViewNotesLog'
import DecoratorProfile from '../screens/Decorator/DecoratorProfile'
import CreateSupervisor from '../screens/Supervisor/CreateSupervisor'
import SearchSupervisor from '../screens/Supervisor/SearchSupervisor'
import DetailSupervisor from '../screens/Supervisor/DetailSupervisor'
import SplashScreen from '../screens/SplashScreen'
import HandOverForm from '../screens/Form/HandOver'
import MakeReady from '../screens/Form/MakeReady'
import WranntySannging from '../screens/Form/WranntySannging'
import QualityInssurance from '../screens/Form/QualityAnsurance'
import RemedialWork from '../screens/Form/RemedialWorkSheet'
import Scope from '../screens/Form/Scope'
import VerificationDetail from '../screens/Form/VerificationForm/VerificationDetails'
import DayWork from '../screens/Form/VerificationForm/AccurateDayWork'
import DecorationRecord from '../screens/Form/VerificationForm/DecorationRecord'
import MisCoat from '../screens/Form/VerificationForm/MisCoat'
import SiteInstruction from '../screens/Form/VerificationForm/SiteInstruction'
import VerificationWork from '../screens/Form/VerificationForm/VerificationOfWork'
import HealthSafety from '../screens/Form/HealthSafety/HealthSafetyDetail'
import AccidentReport from '../screens/Form/HealthSafety/AccidentReport'
import CleanUp from '../screens/Form/HealthSafety/CleanUp'
import ElectricalEquipment from '../screens/Form/HealthSafety/ElectricalEquipment'
import FridayPack from '../screens/Form/HealthSafety/FridayPack'
import HarmFulSubstance from '../screens/Form/HealthSafety/HarmFulSubstance'
import HealthSafetyInspection from '../screens/Form/HealthSafety/HealthSafetyInspection'
import HouseKepping from '../screens/Form/HealthSafety/HouseKepping'
import LadderCheckList from '../screens/Form/HealthSafety/LadderCheckList'
import MethodStatement from '../screens/Form/HealthSafety/MethodStatementRegister'
import IssueCard from '../screens/Form/HealthSafety/IssueRecordCard'
import PuwerInspection from '../screens/Form/HealthSafety/PuwerInspection'
import SiteDecoration from '../screens/Form/HealthSafety/OnSiteDecoration'
import RecordofProject from '../screens/Form/HealthSafety/RecordOfProject'
import DailyBreifing from '../screens/Form/HealthSafety/DailyBreifingForm'
import SafeWork from '../screens/Form/HealthSafety/SafeWorkProcedure'
import Tbtcoshh from '../screens/Form/HealthSafety/TBT_COSHH'
import Tbtfire from '../screens/Form/HealthSafety/TBT_Fire'
import Tbtslip from '../screens/Form/HealthSafety/TBT_Slip'
import Covid from '../screens/Form/HealthSafety/Covid'
import Tbtform from '../components/common/tbtFrom'
import ListView from '../components/common/listView'
import Tbthouse from '../screens/Form/HealthSafety/TBT_HouseKeeping'
import Tbtmobile from '../screens/Form/HealthSafety/TBT_MobileElevated'
import Tbtrespiratory from '../screens/Form/HealthSafety/TBT_RespiratoryProtection'
import Tbtsilica from '../screens/Form/HealthSafety/TBT_SilicaDust'
import Tbtdrugs from '../screens/Form/HealthSafety/TBT_Drugs'
import Tbtvolience from '../screens/Form/HealthSafety/TBT_Volience'
import Tbtworking from '../screens/Form/HealthSafety/TBT_Working'
import TbtRegister from '../screens/Form/HealthSafety/TBT_TalkRegister'
import TbtInventory from '../screens/Form/HealthSafety/TBT_Inventory'

const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Splash';

export default function MainNavigator({ navigation, route }) {
    navigation.setOptions({ ...getHeaderTitle(route) });

    return (
        <Stack.Navigator headerMode="none" >
             <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{
                    headerShown: false,
                  }}
            />
           <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MainScreen"
                component={MainScreen}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="NewJob"
                component={NewJob}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="PlotDetails"
                component={PlotDetail}
                options={{
                    headerShown: true,
                  }}
            />
            <Stack.Screen
                name="FormTemplate"
                component={FormTemplate}
                options={{
                    headerShown: true,
                  }}
            />
            <Stack.Screen
                name="NewSiteInspection"
                component={NewSiteInspection}
                options={{
                    headerShown: true,
                  }}
            />
            <Stack.Screen
                name="AddPhotoComment"
                component={AddPhotoComment}
                options={{
                    headerShown: true,
                  }}
            />
            <Stack.Screen
                name="ViewJob"
                component={ViewJob}
                options={{
                    headerShown: true,
                  }}
            />
            <Stack.Screen
                name="SelectProject"
                component={SelectProject}
                options={{
                    headerShown: true,
                  }}
            />
            <Stack.Screen
                name="SearchJob"
                component={SearchJob}
                options={{
                    headerShown: true,
                  }}
            />
            <Stack.Screen
                name="CreateDecorataor"
                component={CreateDecorataor}
                options={{
                    headerShown: true,
                  }}
            />
            <Stack.Screen
                name="SearchDecorator"
                component={SearchDecorator}
                options={{
                    headerShown: true,
                  }}
            />
            <Stack.Screen
                name="DecoratorDetails"
                component={DecoratorDetails}
                options={{
                    headerShown: true,
                  }}
            />
            <Stack.Screen
                name="ViewNotes"
                component={ViewNotes}
                options={{
                    headerShown: true,
                  }}
            />
            <Stack.Screen
                name="CreateSupervisor"
                component={CreateSupervisor}
                options={{
                    headerShown: true,
                  }}
            />
            <Stack.Screen
                name="SearchSupervisor"
                component={SearchSupervisor}
                options={{
                    headerShown: true,
                  }}
            />
            <Stack.Screen
                name="DetailSupervisor"
                component={DetailSupervisor}
                options={{
                    headerShown: true,
                  }}
            />
            <Stack.Screen
                name="ForgetPassword"
                component={ForgetPassword}
                options={{
                    headerShown: false,
                  }}
            />
            <Stack.Screen
                name="SelectSummary"
                component={SelectSummary}
                options={{
                    headerShown: false,
                  }}
            />
            <Stack.Screen
                name="SelectSummaryDetail"
                component={SelectSummaryDetail}
                options={{
                    headerShown: false,
                  }}
            />
            <Stack.Screen
                name="DecoratorProfile"
                component={DecoratorProfile}
                options={{
                    headerShown: false,
                  }}
            />
            <Stack.Screen
                name="HandOverForm"
                component={HandOverForm}
                options={{
                    headerShown: false,
                  }}
            />
            <Stack.Screen
                name="MakeReady"
                component={MakeReady}
                options={{
                    headerShown: false,
                  }}
            />
            <Stack.Screen
                name="WranntySannging"
                component={WranntySannging}
                options={{
                    headerShown: false,
                  }}
            />
            <Stack.Screen
                name="QualityInssurance"
                component={QualityInssurance}
                options={{
                    headerShown: false,
                  }}
            />
            <Stack.Screen
                name="RemedialWork"
                component={RemedialWork}
                options={{
                    headerShown: false,
                  }}
            />
            <Stack.Screen
                name="Scope"
                component={Scope}
                options={{
                    headerShown: false,
                  }}
            />
            <Stack.Screen
                name="VerificationDetails"
                component={VerificationDetail}
                options={{
                    headerShown: false,
                  }}
            />
            <Stack.Screen
                name="DayWork"
                component={DayWork}
                options={{
                    headerShown: false,
                  }}
            />
            <Stack.Screen
                name="DecorationRecord"
                component={DecorationRecord}
                options={{
                    headerShown: false,
                  }}
            />
            <Stack.Screen
                name="MisCoat"
                component={MisCoat}
                options={{
                    headerShown: false,
                  }}
            />
            <Stack.Screen
                name="SiteInstruction"
                component={SiteInstruction}
                options={{
                    headerShown: false,
                  }}
            />
            <Stack.Screen
                name="VerificationWork"
                component={VerificationWork}
                options={{
                    headerShown: false,
                  }}
            />
            <Stack.Screen
                name="HealthSafety"
                component={HealthSafety}
                options={{
                    headerShown: false,
                  }}
            />
            <Stack.Screen
                name="AccidentReport"
                component={AccidentReport}
                options={{
                    headerShown: false,
                  }}
            />
            <Stack.Screen
                name="CleanUp"
                component={CleanUp}
                options={{
                    headerShown: false,
                  }}
            />
            <Stack.Screen
                name="ElectricalEquipment"
                component={ElectricalEquipment}
                options={{
                    headerShown: false,
                  }}
            />
            <Stack.Screen
                name="FridayPack"
                component={FridayPack}
                options={{
                    headerShown: false,
                  }}
            />
            <Stack.Screen
                name="HarmFulSubstance"
                component={HarmFulSubstance}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="HealthSafetyInspection"
                component={HealthSafetyInspection}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="HouseKepping"
                component={HouseKepping}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="LadderCheckList"
                component={LadderCheckList}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="MethodStatement"
                component={MethodStatement}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="IssueCard"
                component={IssueCard}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="PuwerInspection"
                component={PuwerInspection}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="SiteDecoration"
                component={SiteDecoration}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="RecordofProject"
                component={RecordofProject}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="DailyBreifing"
                component={DailyBreifing}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="SafeWork"
                component={SafeWork}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="TBTCOSHH"
                component={Tbtcoshh}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="TBTFIRE"
                component={Tbtfire}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="TBTSLIP"
                component={Tbtslip}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Covid"
                component={Covid}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Tbtform"
                component={Tbtform}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ListView"
                component={ListView}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Tbthouse"
                component={Tbthouse}
                options={{
                    headerShown: false,
                }}
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
                options={{
                    headerShown: false,
                }}
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
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Tbtvolience"
                component={Tbtvolience}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Tbtworking"
                component={Tbtworking}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="TbtRegister"
                component={TbtRegister}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="TbtInventory"
                component={TbtInventory}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="AllJobs"
                component={AllJobs}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="DetailsJob"
                component={DetailsJob}
                options={{
                    headerShown: false,
                }}
            />
             <Stack.Screen
                name="TotalSummary"
                component={TotalSummary}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ListSupervisor"
                component={ListSupervisor}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}

function getHeaderTitle(route) {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

    switch (routeName) {
        case 'Splash':
            return { headerShown: false };
        case 'LoginScreen':
            return { headerShown: false };
        
        case 'MainScreen':
            return { headerShown: true,
                    headerTintColor: '#fff',
                     headerStyle: {
                        backgroundColor: '#1073AC',
                    },  
                    headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular',  } 
                };
        case 'NewJob':
            return { headerShown: true,
                    headerTintColor: '#fff',
                    headerStyle: {
                    backgroundColor: '#1073AC',
                    },  
                    headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', },
                    headerTitle:"Create New Job"
                    };
        case 'PlotDetails':
            return { headerShown: true,
                    headerTintColor: '#fff',
                    headerStyle: {
                    backgroundColor: '#1073AC',
                    },  
                    headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular',  } ,
                    headerTitle:"Create New Job"
                    };
        case 'NewSiteInspection':
            return { headerShown: true,
                    headerTintColor: '#fff',
                    headerStyle: {
                    backgroundColor: '#1073AC',
                    },  
                    headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular',  } ,
                    headerTitle:"Create New Job"
                    };
        case 'ViewJob':
            return { headerShown: true,
                    headerTintColor: '#fff',
                    headerStyle: {
                    backgroundColor: '#1073AC',
                    },  
                    headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular',  } ,
                    headerTitle:"View Search Job"
                    };
       case 'SelectProject':
            return { headerShown: true,
                    headerTintColor: '#fff',
                    headerStyle: {
                    backgroundColor: '#1073AC',
                    },  
                    headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular',  } ,
                    headerTitle:"Select Project"
                    };
        case 'SearchJob':
            return { headerShown: true,
                    headerTintColor: '#fff',
                    headerStyle: {
                    backgroundColor: '#1073AC',
                    },  
                    headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular',  } ,
                    headerTitle:"Search Project"
                    };
        case 'CreateDecorataor':
            return { headerShown: true,
                    headerTintColor: '#fff',
                    headerStyle: {
                    backgroundColor: '#1073AC',
                    },  
                    headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular',  } ,
                    headerTitle:"Create Decorataor"
                    };
        case 'SearchDecorator':
            return { headerShown: true,
                    headerTintColor: '#fff',
                    headerStyle: {
                    backgroundColor: '#1073AC',
                    },  
                    headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular',  } ,
                    headerTitle:"Search Decorataor"
                    };
        case 'ViewNotes':
            return { headerShown: true,
                    headerTintColor: '#fff',
                    headerStyle: {
                    backgroundColor: '#1073AC',
                    },  
                    headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular',  } ,
                    headerTitle:"View Notes Logs"
                    };
        case 'CreateSupervisor':
            return { headerShown: true,
                    headerTintColor: '#fff',
                    headerStyle: {
                    backgroundColor: '#1073AC',
                    },  
                    headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular',  } ,
                    headerTitle:"Create Supervisor"
                    };
        case 'SearchSupervisor':
            return { headerShown: true,
                    headerTintColor: '#fff',
                    headerStyle: {
                    backgroundColor: '#1073AC',
                    },  
                    headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular',  } ,
                    headerTitle:"Search Supervisor"
                    }; 
        case 'DetailSupervisor':
            return { headerShown: true,
                    headerTintColor: '#fff',
                    headerStyle: {
                    backgroundColor: '#1073AC',
                    },  
                    headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                    headerTitle:"Supervisor Detail"
                    };
        case 'MakeReady':
            return { headerShown: true,
                    headerTintColor: '#fff',
                    headerStyle: {
                    backgroundColor: '#1073AC',
                    },  
                    headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                    headerTitle:"Make Ready Sheet"
                    }; 
        case 'WranntySannging':
            return { headerShown: true,
                    headerTintColor: '#fff',
                    headerStyle: {
                    backgroundColor: '#1073AC',
                    },  
                    headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                    headerTitle:"Wrannty Sannging"
                    };
         case 'RemedialWork':
            return { headerShown: true,
                    headerTintColor: '#fff',
                    headerStyle: {
                    backgroundColor: '#1073AC',
                    },  
                    headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                    headerTitle:"Remedial Work Sheet"
                    }; 
        case 'Scope':
            return { headerShown: true,
                     headerTintColor: '#fff',
                     headerStyle: {
                     backgroundColor: '#1073AC',
                    },  
                    headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                    headerTitle:"Scope"
                    };
        case 'VerificationDetails':
            return { headerShown: true,
                     headerTintColor: '#fff',
                     headerStyle: {
                     backgroundColor: '#1073AC',
                    },  
                    headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                    headerTitle:"Verification Details"
                    };
        case 'DayWork':
            return { headerShown: true,
                     headerTintColor: '#fff',
                     headerStyle: {
                     backgroundColor: '#1073AC',
                    },  
                    headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                    headerTitle:"Accurate Day Work Sheet"
                    };
        case 'DecorationRecord':
            return { headerShown: true,
                     headerTintColor: '#fff',
                     headerStyle: {
                     backgroundColor: '#1073AC',
                    },  
                    headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                    headerTitle:"Decoration Record"
                    };
        case 'MisCoat':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                    },  
                    headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                        headerTitle:"Mis Coat"
                    };
        case 'SiteInstruction':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                    },  
                    headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                        headerTitle:"Site Instruction"
                    };
        case 'VerificationWork':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                    },  
                    headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                        headerTitle:"Verification Of Work"
                    };
        case 'HealthSafety':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                    },  
                    headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                        headerTitle:"Health Safety Details"
                    };
        case 'AccidentReport':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                    },  
                    headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                        headerTitle:"Accident Report Form"
                    };
        case 'CleanUp':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                    },  
                    headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                        headerTitle:"Notice to Clean up"
                    };
        case 'ElectricalEquipment':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                    },  
                    headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                        headerTitle:"Electrical Equipment"
                    };
        case 'FridayPack':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                    },  
                    headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                        headerTitle:"Friday Pack"
                    };
        case 'HarmFulSubstance':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                    },  
                    headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                        headerTitle:"Harm Ful Substance"
                    };
        case 'HealthSafetyInspection':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                        },  
                        headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                            headerTitle:"HealthSafety Inspection"
                        };
        case 'HouseKepping':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                        },  
                        headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                            headerTitle:"House Keeping Checklist"
                        };
        case 'LadderCheckList':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                        },  
                        headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                            headerTitle:"Ladder Check List"
                        };
        case 'MethodStatement':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                        },  
                        headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                            headerTitle:"Method Statement Register"
                        };
        case 'IssueCard':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                        },  
                        headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                            headerTitle:"Issue Record Card"
                        };
        case 'PuwerInspection':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                        },  
                        headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                            headerTitle:"Puwer Inspection CheckList"
                        };
        case 'SiteDecoration':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                        },  
                        headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                            headerTitle:"On Site Decoration"
                        };
        case 'RecordofProject':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                        },  
                        headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                            headerTitle:"Record Of Project"
                        };
        case 'DailyBreifing':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                        },  
                        headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                            headerTitle:"Daily Breifing Form"
                        };
        case 'SafeWork':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                        },  
                        headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                            headerTitle:"Safe Work Procedure"
                        };
        case 'TBTCOSHH':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                        },  
                        headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                            headerTitle:"TBT COSHH"
                        };
        case 'TBTFIRE':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                        },  
                        headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                            headerTitle:"TBT FIRE"
                        };
        case 'TBTSLIP':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                        },  
                        headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                            headerTitle:"TBT SLIP TRIP & FALLS"
                        };
        case 'Covid':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                        },  
                        headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                            headerTitle:"Coronavirus"
                        };
        case 'Tbthouse':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                        },  
                        headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                            headerTitle:"House Keeping"
                        };
        case 'Tbtmobile':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                        },  
                        headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                            headerTitle:"Mobile Elevated (MEWP)"
                        };
        case 'Tbtrespiratory':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                        },  
                        headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                            headerTitle:"Respiratory Protection (RPE)"
                        };
        case 'Tbtsilica':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                        },  
                        headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                            headerTitle:"Silica Dust"
                        };
        case 'Tbtdrugs':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                        },  
                        headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                            headerTitle:"Drugs and Alcohol"
                        };
        case 'Tbtvolience':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                        },  
                        headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                            headerTitle:"Violence and Aggression"
                        };
        case 'Tbtworking':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                        },  
                        headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                            headerTitle:"Working at Height"
                        };
        case 'TbtRegister':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                        },  
                        headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                            headerTitle:"Working at Height"
                        };
        case 'TbtInventory':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                        },  
                        headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                            headerTitle:"Working at Height Equipment"
                        };
        case 'AllJobs':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                        },  
                        headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                            headerTitle:"All Jobs"
                        };
        case 'DetailsJob':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                        },  
                        headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                            headerTitle:"Detail Job"
                        };
        case 'TotalSummary':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                        },  
                        headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                            headerTitle:"Total Job Summary"
                        };
        case 'ListSupervisor':
            return { headerShown: true,
                        headerTintColor: '#fff',
                        headerStyle: {
                        backgroundColor: '#1073AC',
                        },  
                        headerTitleStyle: { alignSelf: 'center',fontFamily:'poppins-regular', } ,
                            headerTitle:"List Of Supervisor"
                        };
                                   
    }
}