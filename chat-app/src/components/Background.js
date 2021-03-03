import React, { useState } from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { theme } from '../core/theme'
import { useWindowDimensions } from 'react-native'


const Background = ({ children, widthModifier}) => {
  const { width } = useWindowDimensions()
  const size = widthModifier ? widthModifier : 0.5
  return (
    <ImageBackground
      source={require('../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}
    >
      <KeyboardAvoidingView style={[styles.container, containerWidth(width, size)]} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

const containerWidth = (width, size) => {
  return {
    minWidth: size * width,
    maxWidth: size * width
  }
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
})

export default Background
