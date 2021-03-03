import React, {useState} from 'react'
import Button from './Button'
import CreateRoomScreen from '../screens/CreateRoomScreen'
export default function CreateRoomButton() {
    const [createRoom, showCreateRoom] = useState(false);
    return (
        <>
            <Button onPress={() => showCreateRoom(true)}>Create a Room</Button>
            { createRoom ? <CreateRoomScreen showCreateRoom={showCreateRoom} /> : null}
        </>
    )
}