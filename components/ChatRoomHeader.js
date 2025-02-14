import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import COLORS from '../constants/Colors';

const ChatRoomHeader = ({ user, router }) => {
    return (
        <Stack.Screen
            options={{
                title: '',
                headerShadowVisible: false,
                headerLeft: () => (
                    <View style={styles.headerLeftContainer}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Entypo name="chevron-left" size={hp(4)} color="#737373" />
                        </TouchableOpacity>
                        <View style={styles.userInfoContainer}>
                            <Image
                                source={{ uri: user?.profileUrl }}
                                style={styles.profileImage}
                            />
                            <Text style={styles.username}>{user?.username || 'User'}</Text>
                        </View>
                        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                          <Ionicons name="call" size={hp(2.8)} color={COLORS.accent} />
                          <Ionicons name="videocam" size={hp(2.8)} color={COLORS.accent} />
                        </View>
                    </View>
                ),
                headerRight: () =>{
                 
                }
            }}
        />
    );
};

const styles = StyleSheet.create({
    headerLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: wp(4),
        width: wp(90)
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(3),
    },
    profileImage: {
        height: hp(6),
        width: hp(6),
        borderRadius: hp(3),
    },
    username: {
        fontSize: hp(2),
        fontWeight: '600',
        color: '#262626',
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 8, // В React Native нет gap, можно использовать marginRight для первого элемента
    },
});

export default ChatRoomHeader;