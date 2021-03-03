import React, {useState} from 'react'
import Button from './Button'
import JoinRoomScreen from '../screens/JoinRoomScreen';
export default function JoinRoomButton() {
    const [joinRoom, showJoinRoom] = useState(false);
    return (
        <>
            <Button onPress={() => showJoinRoom(true)}>Join a Room</Button>
            { joinRoom ? <JoinRoomScreen showJoinRoom={showJoinRoom} /> : null}
        </>
    )
}