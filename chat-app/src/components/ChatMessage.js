import React, { useContext } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import AuthContext from '../contexts/AuthContext';
import stylesChatBox from '../styles/chatBoxStyle';

export default function ChatMessage(props) {
    const { auth } = useContext(AuthContext)
    const { text, uid, photoURL } = props.message;
    const getContainerStyle = () => {
        if (uid === auth.currentUser.uid) {
            return stylesChatBox.SentMessageContainer 
        }
        else{
            return stylesChatBox.ReceivedMessageContainer
        }
    }
    const getTextStyle = () => {
        if (uid === auth.currentUser.uid) {
            return stylesChatBox.SentMessageText
        }
        else{
            return stylesChatBox.ReceivedMessageText
        }
    }
    return (
        <View style={getContainerStyle()}>
            <Image style={stylesChatBox.profileImage} source={{uri: photoURL}}/>
            <Text style={getTextStyle()}>{text}</Text>
        </View >
    )
}
