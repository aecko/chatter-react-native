import { StyleSheet, Dimensions } from 'react-native';

const stylesChatBox = StyleSheet.create({
    chatRoomContainer: {
        
        flex: 1,
        backgroundColor: '#2A2B2DFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    messagesContainer: {
        flex: 1,
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'flex-start',
        maxWidth: Dimensions.get('window').width,
        maxHeight: 0.86*Dimensions.get('window').height, 
        minHeight: 0.86*Dimensions.get('window').height, 

    },
    SentMessageContainer: {
        flex: 1,
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: 'auto',
    },
    SentMessageText:{
        fontSize: 15,
        backgroundColor: '#2DA8D8FF',
        color: 'black',
        marginRight: 10,
        borderRadius: 25,
        padding: 8,
        alignSelf: 'center',
        maxWidth: '70%'
    },
    ReceivedMessageContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexGrow: 1,
        minHeight: 'auto'
 
    },
    ReceivedMessageText: {
        fontSize: 15,
        backgroundColor: '#D9514EFF',
        color: '#fff',
        marginLeft: 10,
        borderRadius: 25,
        padding: 8,
        alignSelf: 'center',
        maxWidth: '70%'
    },
    profileImage :{
        width: 50,
        height: 50,
        borderRadius: 25,
        alignSelf: 'center'
    }
});
export default stylesChatBox;