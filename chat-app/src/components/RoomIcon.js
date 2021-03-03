import React, { useContext } from 'react'
import { StyleSheet, Text, Touchable, View} from 'react-native'
import { TouchableOpacity} from 'react-native-gesture-handler'
import AuthContext from '../contexts/AuthContext'

export default function RoomIcon(props) {
    const {setRoomCode} = useContext(AuthContext)

    const gotoRoom = () => {
        console.log('presssed here ' + props.roomCode)
        setRoomCode(props.roomCode)
    }
    return (
        <TouchableOpacity style={styles.RoomIconContainer} onPress={() => gotoRoom()}>
            <Text style={styles.IconText}>{props.roomCode.charAt(2)}</Text>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    RoomIconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#2A2B2D',
        borderRadius: 20,
        minWidth: 60,
        minHeight: 60,
        maxWidth: 60,
        maxHeight: 50,
        zIndex: 1
    },
    IconText: {
        fontSize: 20,
        color: '#fff'
    }
})
