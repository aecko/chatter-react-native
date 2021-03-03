import React from 'react'
import { View } from 'react-native'
import Paragraph from '../components/Paragraph'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import CreateRoomButton from '../components/CreateRoomButton'
import JoinRoomButton from '../components/JoinRoomButton'
import Background from '../components/Background'


export default function Welcome() {
    return (
        <>
            <Background widthModifier={1}>
                <Header>Welcome to Chatter</Header>
                <Paragraph>Looks like you haven't joined any rooms yet...</Paragraph>
                <Paragraph>Get started by pressing either button below</Paragraph>
                <CreateRoomButton />
                <JoinRoomButton />
            </Background>
        </>
    )
}