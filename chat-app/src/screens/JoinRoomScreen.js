import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, TextInput, useWindowDimensions, PixelRatio } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AuthContext from '../contexts/AuthContext'
import firebase from 'firebase'
import 'firebase/firestore'

export default function JoinRoomScreen(props) {

    const [roomCodeInput, setRoomCodeInput] = useState('')
    const { setRoomCode, auth, firestore } = useContext(AuthContext)

    const joinRoom = async () => {
        const { uid } = auth.currentUser;
        const messageRefUser = firestore.collection('users').doc(uid);
        const checkRoomRef = firestore.collection('rooms').doc(roomCodeInput);
        var roomExists = false


        checkRoomRef.get()
            .then(async (docSnapShot) => {
                if (docSnapShot.exists) {
                    roomExists = true
                }
                else {
                    console.log('Room Doesn\'t exist')
                }
            })

        //TODO: change .then to async await
        messageRefUser.get()
            .then(async (docSnapShot) => {
                if (docSnapShot.exists) {
                    await messageRefUser.update({
                        currentRooms: firebase.firestore.FieldValue.arrayUnion(roomCodeInput)
                    })
                    setRoomCode(roomCodeInput)
                    props.showJoinRoom(false)
                }
                else {
                    await messageRefUser.set({
                        currentRooms: firebase.firestore.FieldValue.arrayUnion(roomCodeInput)
                    })
                    setRoomCode(roomCodeInput)
                    props.showJoinRoom(false)
                }
            })
    }

    const fontRatio = PixelRatio.getFontScale()
    const { width, height } = useWindowDimensions()
    var joinRoomPopupWidth = 400
    if (width < 1280) {
        joinRoomPopupWidth *= 0.75 * fontRatio
    }
    const styles = StyleSheet.create({
        JoinRoomContainer: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: 250 * fontRatio,
            width: joinRoomPopupWidth * fontRatio,
            borderRadius: 20,
            backgroundColor: '#fff',
            position: 'fixed',
            top: height / 2 - 125,
            left: width / 2 - joinRoomPopupWidth / 2,
            zIndex: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -1, },
            shadowOpacity: 0.9,
            shadowRadius: 50,
            elevation: 5,
        },
        JoinRoomTitle: {
            fontSize: 20,
            zIndex: 2,
        },
        JoinRoomTextInput: {
            height: 70 * fontRatio,
            width: joinRoomPopupWidth - 100,
            fontSize: 15 * fontRatio,
            backgroundColor: '#d5d8dc',
            borderRadius: 20,
            marginBottom: 10 * fontRatio,
            textAlign: 'center',
            outlineWidth: 0
        },
        DarkOverlay: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: width,
            height: height,
            backgroundColor: '#0b2946',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1,
            opacity: 0.8
        },
        JoinRoomHeader: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: joinRoomPopupWidth * fontRatio,
            maxWidth: joinRoomPopupWidth * fontRatio,
            maxHeight: 60 * fontRatio,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: '#3498db'
        },
        JoinRoomInputContainer: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        JoinRoomCloseButton: {
            position: 'absolute',
            top: 0,
            left: 0,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#3498db',

            maxWidth: 30 * fontRatio,
            maxHeight: 30 * fontRatio

        },
        CloseMenuText: {
            fontSize: 20,
            color: '#fff',
            padding: 5 * fontRatio,
        },
        JoinRoomSubmit: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            backgroundColor: '#3498db',
            maxHeight: 50 * fontRatio
        },
        JoinRoomButtonText: {
            color: '#fff',
            padding: 10 * fontRatio
        }

    })
    return (
        <>
            <View style={styles.JoinRoomContainer}>
                <View style={styles.JoinRoomHeader} >
                    <TouchableOpacity onPress={() => props.showJoinRoom(false)} style={styles.JoinRoomCloseButton}>
                        <Text style={styles.CloseMenuText}>X</Text>
                    </TouchableOpacity>
                    <Text style={styles.JoinRoomTitle}>Join a new room</Text>
                </ View>
                <View style={styles.JoinRoomInputContainer}>
                    <TextInput onChangeText={text => setRoomCodeInput(text)} style={styles.JoinRoomTextInput} placeholder='Enter room code'></TextInput>
                    <TouchableOpacity onPress={() => joinRoom()} style={styles.JoinRoomSubmit}>
                        <Text style={styles.JoinRoomButtonText}>Join Room</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.DarkOverlay}></View>
        </>
    )
}

