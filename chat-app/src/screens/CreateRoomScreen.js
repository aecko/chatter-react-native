import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, TextInput, useWindowDimensions, PixelRatio } from 'react-native'
import AuthContext from '../contexts/AuthContext'
import { TouchableOpacity} from 'react-native-gesture-handler'
import firebase from 'firebase'
import 'firebase/firestore'

export default function CreateRoomScreen(props) {

    const [roomName, setRoomName] = useState('')
    const [roomCodeGen, setRoomCodeGen] = useState('')
    const { auth, firestore, setRoomCode } = useContext(AuthContext)


    const createRoom = async () => {
        const roomCode = '$' + Math.random().toString(36).replace('0.', '').toUpperCase()
        const { uid, photoURL, displayName } = auth.currentUser
        const roomRef = firestore.collection('rooms').doc(roomCode);
        const userRef = firestore.collection('users').doc(uid)
        await roomRef.set({
            RoomName: roomName,
            RoomOwner: uid,
        })
        const time = firebase.firestore.Timestamp.now()
        await roomRef.collection('messages').add({
            text: displayName + ' created this room',
            createdAt: time,
            uid,
            photoURL
        })
        userRef.get()
            .then(async (docSnapShot) => {
                console.log(docSnapShot)
                if (docSnapShot.exists) {
                    console.log(docSnapShot.data())
                    await userRef.update({
                        currentRooms: firebase.firestore.FieldValue.arrayUnion(roomCode)
                    })
                }
                else {
                    await userRef.set({
                        currentRooms: firebase.firestore.FieldValue.arrayUnion(roomCode)
                    })
                }
            })

        setRoomCode(roomCode)
        setRoomCodeGen(roomCode)
    }


    const fontRatio = PixelRatio.getFontScale()
    const { width, height } = useWindowDimensions()
    var createRoomPopupWidth = 400
    if (width < 1280) {
        createRoomPopupWidth *= 0.75 * fontRatio
    }
    const styles = StyleSheet.create({
        CreateRoomContainer: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: 250 * fontRatio,
            width: createRoomPopupWidth * fontRatio,
            borderRadius: 20,
            backgroundColor: '#fff',
            position: 'fixed',
            top: height / 2 - 125,
            left: width / 2 - createRoomPopupWidth / 2,
            zIndex: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -1, },
            shadowOpacity: 0.9,
            shadowRadius: 50,
            elevation: 5,
        },
        CreateRoomTitle: {
            fontSize: 20,
            zIndex: 2,
        },
        CreateRoomTextInput: {
            height: 70 * fontRatio,
            width: createRoomPopupWidth - 100,
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
        CreateRoomHeader: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: createRoomPopupWidth * fontRatio,
            maxHeight: 60 * fontRatio,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: '#3498db'
        },
        CreateRoomInputContainer: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        CreateRoomCloseButton: {
            position: 'absolute',
            top: 0,
            left: 0,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#3498db',
            marginTop: 15 * fontRatio,
            marginLeft: 15 * fontRatio,
            maxWidth: 30 * fontRatio,
            maxHeight: 30 * fontRatio

        },
        CloseMenuText: {
            fontSize: 20,
            color: '#fff',
            padding: 5 * fontRatio,
        },
        CreateRoomSubmit: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            backgroundColor: '#3498db',
            maxHeight: 50 * fontRatio
        },
        CreateRoomButtonText: {
            color: '#fff',
            padding: 10 * fontRatio
        }

    })
    return (
        <>
            <View style={styles.CreateRoomContainer}>
                <View style={styles.CreateRoomHeader} >
                    <TouchableOpacity onPress={() => props.showCreateRoom(false)} style={styles.CreateRoomCloseButton}>
                        <Text style={styles.CloseMenuText}>X</Text>
                    </TouchableOpacity>
                    <Text style={styles.CreateRoomTitle}>Create a new room</Text>
                </ View>
                <View style={styles.CreateRoomInputContainer}>
                    {roomCodeGen != '' ?
                        <>
                            <Text style={{ fontSize: 20 * fontRatio }} >Room Code:</Text>
                            <Text style={{ fontSize: 15 * fontRatio }} >{roomCodeGen}</Text>
                        </> :
                        <>
                            <TextInput onChangeText={text => setRoomName(text)} style={styles.CreateRoomTextInput} placeholder='Enter the name of the new room'></TextInput>
                            <TouchableOpacity onPress={() => createRoom()} style={styles.CreateRoomSubmit}>
                                <Text style={styles.CreateRoomButtonText}>Create Room</Text>
                            </TouchableOpacity>
                        </>
                    }
                </View>
            </View>
            <View style={styles.DarkOverlay}></View>
        </>
    )
}

