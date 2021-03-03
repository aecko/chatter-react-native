import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/theme'

const Paragraph = (props) => <Text style={styles.text} {...props} />

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 12,
    color: theme.colors.paragraphText
  },
})

export default Paragraph
