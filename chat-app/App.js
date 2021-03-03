//import react features
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform, useWindowDimensions, } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

//import conponents


//import contexts
import AuthContext from './src/contexts/AuthContext'

//import firebase utils
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import * as FirebaseCore from 'expo-firebase-core';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore';

//import mobile google signin
import * as GoogleSignIn from 'expo-google-sign-in';


import { Provider } from 'react-native-paper'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  MainChatScreen
} from './src/screens'


//initilase firebase
if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseCore.DEFAULT_APP_OPTIONS);
} else {
  firebase.app(); // if already initialized, use that one
}
const auth = firebase.auth();
const firestore = firebase.firestore()


//create navigator stack
const Stack = createStackNavigator()

export default function App() {
  //states
  const [userMobile, setUserMobile] = useState(null);
  const [user] = useAuthState(auth);
  const [roomCode, setRoomCode] = useState('$KVUXRARV9U')
  const [loadingApp, setLoadingApp] = useState(true)
  const { width, height } = useWindowDimensions()

  const messageRef = firestore.collection('rooms').doc(roomCode).collection('messages')
  const query = messageRef.orderBy('createdAt', 'desc').limit(25);
  const [messages] = useCollectionData(query)

  useEffect(() => {
    if (Platform.OS == 'android' || Platform.OS == 'ios') {
      initAsync()
    }
  }, [])



  //setup context provider values
  const value = { auth, firestore, messageRef, messages, setRoomCode, roomCode, setLoadingApp }

  //style sheet for app
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      flex: 1,
      flexDirection: 'row',
      flexGrow: 0,
      justifyContent: 'flex-start',
      backgroundColor: '#2A2B2D',
      zIndex: -1,
      width: width,
      height: height
    },
    OtherContainer: {
      flex: 1,
      flexDirection: 'column',
    }
  });

  //////////////google sign in stuff


  const initAsync = async () => {
    await GoogleSignIn.initAsync();
    _syncUserWithStateAsync();
  };

  const _syncUserWithStateAsync = async () => {
    const userMobileNew = await GoogleSignIn.signInSilentlyAsync();
    const credential = firebase.auth.GoogleAuthProvider.credential(userMobileNew.idToken, userMobileNew.accessToken)
    // login with credential
    console.log('logged in with credentials: uid : ' + userMobileNew.idToken);
    auth.signInWithCredential(credential);
    //setUserMobile(userMobileNew)
  };


  const signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    setUserMobile(null)
  };
  const signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        _syncUserWithStateAsync();
        console.log('signed in')
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };
  ///////////
  return (
    <View style={styles.container}>
      <AuthContext.Provider value={value}>
        <Provider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName= {user ? "Welcome" : "StartScreen"}
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="StartScreen" component={StartScreen} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
              <Stack.Screen
                name="ForgotPasswordScreen"
                component={ForgotPasswordScreen}
              />
              <Stack.Screen name="ChatBox" component={MainChatScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </AuthContext.Provider>
    </View>
  )
}