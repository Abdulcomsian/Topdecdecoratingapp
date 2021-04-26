import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainNavigator from './navigation/MainNavigator';
import { loadAsync } from "expo-font";
import rootReducer from './Redux/rootReducer';
import thunk from "redux-thunk";
import { Provider } from 'react-redux'
import {createStore,applyMiddleware,compose} from 'redux';
// import * as SplashScreen from "expo-splash-screen";

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const Stack = createStackNavigator();
export default function App() {
  // const [isLoadingComplete, setLoadingComplete] = React.useState(false);
        React.useEffect(() => {
          async function loadResourcesAndDataAsync() {
            try {
           await loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            'poppins-semiBold': require("./assets/fonts/Poppins-SemiBold.ttf"),
            "poppins-regular": require("./assets/fonts/Poppins-Regular.ttf"),
            "poppins-medium": require("./assets/fonts/Poppins-Medium.ttf"),
            "poppins-italic": require("./assets/fonts/Poppins-Italic.ttf"),
            "poppins-bold": require("./assets/fonts/poppins-bold.ttf"),
            });
            // await SplashScreen.preventAutoHideAsync();
          } catch (e) {
            // We might want to provide this error information to an error reporting service //Montserrat-SemiBold
            console.warn(e);
          } finally {
            setLoadingComplete(true);
        // await SplashScreen.hideAsync();
          }
        }
        loadResourcesAndDataAsync();
           }, [])
          //  if (!isLoadingComplete) {
  // else
          return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Main" component={MainNavigator}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
  );}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeView: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color:'black'
  }
});