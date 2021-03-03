import React from 'react'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'

export default function LoadingScreen() {

    const { width, height } = useWindowDimensions()
    const styles = StyleSheet.create({
        LoadingScreen: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            width: width,
            height: height,
            backgroundColor: '#2A2B2D',
            zIndex: 5
        },
        LogoText: {
            fontSize: 30,
            color: '#fff',
        },
    })
    return (
        <View style={styles.LoadingScreen}>
            <Text style={styles.LogoText}>Chatter</Text>
            <Text style={{
                fontSize: 20,
                color: '#fff',
            }}>Loading...</Text>
        </View>
    )
}


