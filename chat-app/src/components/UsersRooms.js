import React, { useContext, useEffect, useState } from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import {  StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import AuthContext from '../contexts/AuthContext'
import RoomIcon from './RoomIcon'

export default function UsersRooms() {
    const { firestore, auth,} = useContext(AuthContext)

    const userRef = firestore.collection('users').doc(auth.currentUser.uid)
    const [userDetails] = useDocumentData(userRef)
    const { setLoadingApp } = useContext(AuthContext)
    const {width, height} = useWindowDimensions()

    if(userDetails){
        setLoadingApp(false)
    }
    const styles = StyleSheet.create({
        RoomsContainer: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#171818',
            minHeight: height,
            maxHeight: height,
            maxWidth: 90,
            minWidth: 90,
            paddingTop: 15,
            zIndex: 3
        }
    })
    return (
        <View style={styles.RoomsContainer}>
            {userDetails ? userDetails.currentRooms.map((roomCode, i) => <RoomIcon key={i} roomCode={roomCode} />) : null}
        </View>
    )
}


