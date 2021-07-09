import React,{useEffect} from "react";
import { StyleSheet, View, Text,StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainNavigator from "./navigation/MainNavigator";
import { loadAsync } from "expo-font";
import rootReducer from "./Redux/rootReducer";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import SignatureComponent from "./components/SignatureComponent";
import * as SplashScreen from "expo-splash-screen";
import Store from './Redux'
const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const Stack = createStackNavigator();
const App=()=> {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  useEffect(() => {
    StatusBar.setBarStyle('dark-content')
    async function loadResourcesAndDataAsync() {
      try {
        await loadAsync({
          //Roboto: require("native-base/Fonts/Roboto.ttf"),
          //Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
          "poppins-semiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
          "poppins-regular": require("./assets/fonts/Poppins-Regular.ttf"),
          "poppins-medium": require("./assets/fonts/Poppins-Medium.ttf"),
          "poppins-italic": require("./assets/fonts/Poppins-Italic.ttf"),
          "poppins-bold": require("./assets/fonts/poppins-bold.ttf"),
        });
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        // We might want to provide this error information to an error reporting service //Montserrat-SemiBold
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        await SplashScreen.hideAsync();
      }
    }
    loadResourcesAndDataAsync();
  }, []);

    return (!isLoadingComplete?
    <View style={{ flex: 1 }}/>:
      <Provider store={Store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Main' component={MainNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  
}

export default App
