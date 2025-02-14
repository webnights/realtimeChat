import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from '../constants/Colors';
const MessageItem = ({ message, currentUser })  => {
    if (currentUser?.userId === message?.userId) {
        // Мое сообщение
        return (
            <View style={styles.myMessageContainer}>
                <View style={styles.myMessageBox}>
                    <Text style={styles.messageText}>
                        {message?.text}
                    </Text>
                </View>
            </View>
        );
    } else {
        // Сообщение другого пользователя
        return (
            <View style={styles.otherMessageContainer}>
                <View style={styles.otherMessageBox}>
                    <Text style={styles.messageText}>
                        {message?.text}
                    </Text>
                </View>
            </View>
        );
    }
}
export default MessageItem;
const styles = StyleSheet.create({
    myMessageContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: hp(1),
        marginRight: wp(1),
    },
    myMessageBox: {
        width: wp(70),
        backgroundColor: 'white',
        borderColor: '#e5e5e5',
        borderRadius: hp(2),
        padding: hp(1.5),
        alignSelf: 'flex-end',
    },
    otherMessageContainer: {
        width: wp(80),
        marginLeft: wp(3),
        marginBottom: hp(1),
    },
    otherMessageBox: {
        backgroundColor: COLORS.lightBlue,
        borderColor: '#c7d2fe',
        borderRadius: hp(2),
        padding: hp(1.5),
        paddingHorizontal: wp(4),
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: hp(1.9),
    },
});