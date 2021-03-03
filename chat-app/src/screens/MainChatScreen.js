import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, useWindowDimensions, PixelRatio } from 'react-native';
import AuthContext from '../contexts/AuthContext';
import ChatMessage from '../components/ChatMessage';
import SendMessageForm from '../components/SendMessageForm';
import NavBar from '../components/NavBar'
import 'firebase/firestore';
import UsersRooms from '../components/UsersRooms';
import Welcome from './Welcome';
import { useDocumentData } from 'react-firebase-hooks/firestore';


const io = require('socket.io-client')
const socketEndpoint = 'http://192.168.10.118:4167'


export default function MainChatScreen({ navigation }) {
  //firebase user auth
  const { auth, firestore, messages, } = useContext(AuthContext);

  const { width, height } = useWindowDimensions()
  const fontRatio = PixelRatio.getFontScale()
  const userRef = firestore.collection('users').doc(auth.currentUser.uid)
  const [userDetails] = useDocumentData(userRef)
  var showRooms = false
  var chatBoxWidth = width;
  console.log(userDetails)
  if (width >= 800) {
    chatBoxWidth = width - 90
    showRooms = true
  }
  //firestore setup

  //socket.io states
  const [connected, setConnected] = useState('false');
  const [pingData, setPingData] = useState('');


  const scrollViewRef = useRef();

  useEffect(() => {
    //scrollViewRef.current.scrollToEnd({ animated: false })
    //var socket = io(socketEndpoint);
  }, [messages])


  const ShowMessages = () => {
    return messages && messages.slice(0).reverse().map(msg => <ChatMessage key={msg.id} message={msg} />)
  }


  const stylesChatBox = StyleSheet.create({
    chatRoomContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#2A2B2DFF',
      alignItems: 'center',
      justifyContent: 'center',
      maxHeight: 0.93 * height,
      maxWidth: width,
      alignSelf: 'stretch'
    },
    messagesContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      flexGrow: 100,
      maxHeight: 0.86 * height,
      minHeight: 0.86 * height,
      padding: 10 * fontRatio,
    },
    SentMessageContainer: {
      flex: 1,
      flexDirection: 'row-reverse',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 20 * fontRatio,
      marginBottom: 10 * fontRatio,
      marginLeft: 50 * fontRatio,
      marginRight: 10 * fontRatio,


    },
    SentMessageText: {
      fontSize: 15,
      backgroundColor: '#2DA8D8FF',
      color: 'black',
      marginRight: 10 * fontRatio,
      borderRadius: 0,
      padding: 8 * fontRatio,
      maxWidth: 0.1 * width
    },
    ReceivedMessageContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: 10 * fontRatio,
      marginBottom: 1 * fontRatio,
      marginLeft: 1 * fontRatio,
      marginRight: 10 * fontRatio,
      minHeight: 'auto'

    },
    ReceivedMessageText: {
      fontSize: 15,
      backgroundColor: '#D9514EFF',
      color: '#fff',
      marginLeft: 10 * fontRatio,
      borderRadius: 25,
      padding: 8 * fontRatio,
      alignSelf: 'center',
      maxWidth: 100
    },
    profileImage: {
      width: 50 * fontRatio,
      height: 50 * fontRatio,
      borderRadius: 25,
      alignSelf: 'center'
    }
  });

  return (
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', minHeight: height, maxHeight: height }}>
      {showRooms && userDetails ? <UsersRooms /> : null}
      <View>
        <NavBar navigation={navigation} />
        {userDetails ?
          <>
            <View style={{ minHeight: 0.93 * height, maxHeight: 0.93 * height, minWidth: chatBoxWidth }}>
              <View style={stylesChatBox.chatRoomContainer}>
                <ScrollView
                  contentContainerStyle={stylesChatBox.messagesContainer}
                  ref={scrollViewRef}>
                  {ShowMessages()}
                </ScrollView>
              </View>
              <SendMessageForm />
            </View>
          </> : <Welcome />}
      </View>
    </View>


  )
}
