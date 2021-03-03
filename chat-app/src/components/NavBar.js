import React, { useContext, useState } from 'react'
import { View, StyleSheet, Text, Dimensions, Image, useWindowDimensions, PixelRatio } from 'react-native'
import AuthContext from '../contexts/AuthContext';
import { TouchableOpacity, } from 'react-native-gesture-handler'

import SideBarMenu from './SideBarMenu';

export default function NavBar({ navigation }) {
    const { width, height } = useWindowDimensions();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const { auth } = useContext(AuthContext);
    const fontRatio = PixelRatio.getFontScale()
    const userInfo = () => {
        if (auth.currentUser != null) {
            const { displayName, photoURL } = auth.currentUser

            return (
                <View style={styles.UserInfoContainer}>
                    <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)}>
                        <Image style={styles.UserProfilePic} source={{ uri: photoURL }}></Image>
                    </TouchableOpacity>
                    <Text style={styles.UserNameTitle}>{displayName}</Text>
                </View>
            )
        }
    }

    const SignOut = () => {
        if (auth.currentUser != null) {

            return auth.currentUser && (
                <View style={styles.AccountDropdownView}>
                    <TouchableOpacity style={styles.SignOutButton} onPress={() => auth.signOut().then(navigation.reset({
                        index: 0,
                        routes: [{ name: 'StartScreen' }],
                    }))}>
                        <Text>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    const styles = StyleSheet.create({
        NavContainer: {
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#2DA8D8FF',
            justifyContent: 'flex-start',
            alignItems: 'center',
            minHeight: 0.07 * height,
            maxHeight: 0.07 * height,
            overflow: 'visible',
            borderTopLeftRadius: 10,
            zIndex: 2,
        },
        LogoText: {
            fontSize: 30 * fontRatio,
            color: '#fff',

        },
        UserInfoContainer: {
            flex: 1,
            flexDirection: 'row-reverse',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginLeft: 'auto',
            marginRight: 20 * fontRatio,

        },
        UserNameTitle: {
            paddingRight: 10 * fontRatio,
            fontSize: 20 * fontRatio,
            color: '#fff',

        },
        UserProfilePic: {
            width: 50 * fontRatio,
            height: 50 * fontRatio,
            borderRadius: 25
        },
        AccountDropdownView: {
            marginRight: 10 * fontRatio,
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            maxWidth: 100 * fontRatio,
            borderRadius: 10,


        },
        SignOutButton: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 18,
            padding: 10 * fontRatio,
            backgroundColor: '#fff',
            borderRadius: 10,
            width: 100 * fontRatio,
            height: 0.05 * height

        },
        OpenMenuButton: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 30,
            marginLeft: 0.3 * fontRatio,
            backgroundColor: '#2DA8D8FF',
            width: 40 * fontRatio,
            maxWidth: 40 * fontRatio,
            height: 40 * fontRatio,
            borderRadius: 25,

        },
        OpenMenuText: {
            fontSize: 20,
            color: '#fff',
            padding: 5 * fontRatio,
        },

    })

    return (
        <View style={styles.NavContainer}>
            <TouchableOpacity onPress={() => setShowMenu(true)} style={styles.OpenMenuButton}>
                <View>
                    <Text style={styles.OpenMenuText}>☰</Text>
                </View>
            </TouchableOpacity>
            {showMenu ? <SideBarMenu showMenu={showMenu} setShowMenu={setShowMenu} /> : null}
            <Text style={styles.LogoText}>Chatter</Text>
            {userInfo()}
            {dropdownVisible ? SignOut() : null}
        </View>
    )
}
