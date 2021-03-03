import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View, useWindowDimensions, Animated, PixelRatio } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import UsersRooms from '../components/UsersRooms'
import CreateRoomButton from './CreateRoomButton';
import JoinRoomButton from './JoinRoomButton'
export default function SideBarMenu(props) {

    const { width, height } = useWindowDimensions();
    var showRooms = false
    const [createRoom, showCreateRoom] = useState(false);
    const [joinRoom, showJoinRoom] = useState(false);
    const widthWithRooms = (width <800 ? width-90 : width)
    var widthModifier = 0.6;
    if (width < 800) {
        widthModifier = 0.8;
        showRooms = true
    }
    else {
        widthModifier = 0.3;
    }
    const fontRatio = PixelRatio.getFontScale()

    var slideAnim = useRef(new Animated.Value(-widthModifier * width * 2)).current;

    const slideIn = () => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
        }).start();
    };
    const slideOut = () => {
        Animated.timing(slideAnim, {
            toValue: -widthModifier * 1.1 * width,
            duration: 500,
            useNativeDriver: false
        }).start(() => props.setShowMenu(false));

    };
    if (props.showMenu == true) {
        slideIn()
    }
    const slideOutView = () => {
        slideOut()
    }


    const styles = StyleSheet.create({
        SideBarContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            position: 'absolute',
            top: 0,
            backgroundColor: '#46494d',
            minWidth: widthModifier * width,
            maxWidth: widthModifier * width,
            minHeight: height,
            maxHeight: height,
            zIndex: 2,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            shadowColor: '#000',
            shadowOffset: { width: 3 * fontRatio, height: 0 * fontRatio, },
            shadowOpacity: 0.7,
            shadowRadius: 50 * fontRatio,
            elevation: 5 * fontRatio,
        },
        SideBarHeader: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 0.1 * height,
            maxHeight: 0.1 * height,
            width: widthModifier * width
        },
        MenuTitleText: {
            fontSize: 25,
            color: '#fff',
            marginRight: 'auto',


        },
        MenuItemsContainer: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            minHeight: widthModifier * height,
            maxHeight: widthModifier * height,
            minWidth: (widthModifier - 0.02) * widthWithRooms,
            maxWidth: (widthModifier - 0.02) * widthWithRooms,

        },
        MenuItem: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#2DA8D8FF',

            minHeight: 0.05 * height,
            maxHeight: 0.05 * height,
            marginBottom: 20 * fontRatio,
            borderRadius: 25,

        },
        MenuItemText: {
            fontSize: 20,
            color: '#fff'
        },
        CloseMenuButton: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 30,
            marginRight: 'auto',
            marginLeft: 10 * fontRatio,
            backgroundColor: '#2DA8D8FF',
            width: 40 * fontRatio,
            maxWidth: 40 * fontRatio,
            height: 40 * fontRatio,
            borderRadius: 25
        },
        CloseMenuText: {
            fontSize: 20,
            color: '#fff',
            padding: 5 * fontRatio,
        }

    });

    return (
        <Animated.View style={[styles.SideBarContainer, { left: slideAnim }]}>
            {showRooms ? <UsersRooms /> : null}
            <View style={{flex:1, flexDirection:'column'}}>
                <View style={styles.SideBarHeader}>
                    <TouchableOpacity onPress={() => slideOutView()} style={styles.CloseMenuButton}>
                        <Text style={styles.CloseMenuText}>X</Text>
                    </TouchableOpacity>
                    <Text style={styles.MenuTitleText}>Menu</Text>
                </View>
                <View style={styles.MenuItemsContainer}>
                    <CreateRoomButton />
                    <JoinRoomButton />
                </View>
            </View>
        </Animated.View>

    )
}


