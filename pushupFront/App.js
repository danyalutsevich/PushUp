import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './tabs/Home';
import Profile from './tabs/Profile';
import Score from './tabs/Score';
import Testing from './tabs/Testing';
import Register from './tabs/Register';

import { Ionicons } from "@expo/vector-icons";
import * as SplashScreen from 'expo-splash-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';


// SplashScreen.preventAutoHideAsync();


export default function App() {

  const [rerender, setRerender] = useState(false);
  
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [cameraHasPermission, setCameraHasPermission] = useState(false);
  const [username, setUsername] = useState('joebiden');

  
  
  const CameraReadyContext = React.createContext(rerender);

  // load fonts and get camera permission
  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        'MonumentRegular': require('./assets/fonts/MonumentExtended-Regular.ttf'),
        'MonumentBlack': require('./assets/fonts/MonumentExtended-Black.ttf'),
        'MonumentLight': require('./assets/fonts/MonumentExtended-Light.ttf'),
      });
      setFontsLoaded(true);

      const { status } = await Camera.requestCameraPermissionsAsync();
      console.log(status === 'granted');
      setCameraHasPermission(status === 'granted');
    }
    )()

  }, []);



  if (fontsLoaded && cameraHasPermission) {
    SplashScreen.hideAsync();
  }
  else {
    return null;
  }

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  return (

    // <CameraReadyContext.Provider value={rerender}>
    <NavigationContainer onStateChange={(state) => {
      // console.log(state);
      setRerender(false);
      setTimeout(() => { setRerender(true) }, 1000);
    }}
    >


        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarStyle: {
              backgroundColor: '#E8E8E8',
            },
            tabBarItemStyle: {
              fontFamily: 'MonumentRegular',
              fontSize: 20,
            },
            tabBarLabelStyle: {
              fontFamily: 'MonumentRegular',
              // textTransform: 'uppercase',
              color: '#000',
            },
            tabBarIconStyle: {
              backgroundColor: '#000',
              color: '#000',
            },
            headerStyle: {
              backgroundColor: '#E8E8E8',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'MonumentBlack',
              textTransform: 'uppercase',
              fontSize: 30,
            },

          })}
          
        >
          <Tab.Screen name='Testing' component={Testing}
          initialParams={{
            cameraHasPermission: cameraHasPermission,
          }}
          options={{
            tabBarIcon: ({ color, focused }) => (
              focused ?
              <Ionicons name="tennisball" size={30} color={'#000'} /> :
              <Ionicons name="tennisball-outline" size={30} color={'#000'} />
              ),
            }} />

          <Tab.Screen name="Home" component={Home}
            initialParams={{
              // context: CameraReadyContext,

            }}


            options={{
              tabBarLabel: 'PushUp',
              tabBarIcon: ({ color, focused }) => (
                focused ?
                  <Ionicons name="ios-home" size={30} color={'#000'} /> :
                  <Ionicons name="ios-home-outline" size={30} color={'#000'} />
              ),
            }}
          />
          <Tab.Screen name="Score" component={Score}
            initialParams={{
              username: username,
            }}
            options={{
              tabBarLabel: 'Score',
              tabBarIcon: ({ color, focused }) => (
                focused ?
                  <Ionicons name="star" size={30} color={'#000'} /> :
                  <Ionicons name="star-outline" size={30} color={'#000'} />
              ),

            }}

          />
          <Tab.Screen name="Profile" component={Profile}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color, focused }) => (
                focused ?
                  <Ionicons name="ios-person" size={30} color={'#000'} /> :
                  <Ionicons name="ios-person-outline" size={30} color={'#000'} />

              ),

            }}
          />
        </Tab.Navigator>
        {/* </CameraReadyContext.Provider> */}
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',

  },
  header: {
    width: Dimensions.get('window').width,
    height: 50,
    position: 'relative',
    top: 0,
    backgroundColor: '#E8E8E8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 30,
    fontFamily: 'MonumentBlack',
  },
});