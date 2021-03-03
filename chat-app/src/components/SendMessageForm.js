import React, { useContext, useState, } from 'react'
import { StyleSheet, Text, View, Image, TextInput, Dimensions, useWindowDimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import AuthContext from '../contexts/AuthContext';
import firebase from 'firebase'
import 'firebase/firestore'


export default function SendMessageForm(props) {
    const { width, height } = useWindowDimensions()
    const [messageText, onChangeText] = useState('')
    const { auth, messageRef } = useContext(AuthContext)


    const sendMessage = async () => {
        const { uid, photoURL } = auth.currentUser
        await messageRef.add({
            text: messageText,
            createdAt: firebase.firestore.Timestamp.now(),
            uid,
            photoURL
        });
        onChangeText('')
    }

    const styles = StyleSheet.create({
        NewMessageContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignContent: 'center',
            minHeight: 0.07 * height,
            maxHeight: 0.07 * height,
            backgroundColor: '#fff',
            borderRadius: 15,
            zIndex: 2,
            maxWidth: '100%'
        },
        TextInput: {
            fontSize: 20,
            minWidth: '85%',
            maxWidth: '85%',
            padding: 7,
            borderRadius: 15,

        },
        SendMessageContainer: {
            flex: 1,
            flexGrow: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#2DA8D8FF',
            flexBasis: 100,
            maxHeight: 0.07 * height,
        },
        SendText: {
            color: '#fff',
        },
        SendMessageButton: {

        }
    });

    return (
        <View style={styles.NewMessageContainer}>
            <TextInput multiline={true} onSubmitEditing={() => sendMessage()} style={styles.TextInput} value={messageText} onChangeText={text => onChangeText(text)} placeholder='Enter your message' t></TextInput>
            <View style={styles.SendMessageContainer}>
                <TouchableOpacity style={styles.SendMessageButton} onPress={() => sendMessage()}>
                    <Text style={styles.SendText}>Send</Text>
                </TouchableOpacity>
            </View>

        </View>
    )


}

