import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { doc, setDoc, Timestamp, collection, addDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Image } from 'expo-image';
import { blurhash, getRoomId } from '../constants/blurhash';
import { db } from '../firebaseConfig';


const ChatItem = ({ item, router, noBorder, currentUser }) => {
  const [lastMessage, setLastMessage] = useState(undefined)
      useEffect(() => {

          let roomId = getRoomId(currentUser?.userId, item?.userId);
          const docRef = doc(db, "rooms", roomId);
          const messagesRef = collection(docRef, "messages");
          const q = query(messagesRef, orderBy("createdAt", "asc"));
      
          let unsub = onSnapshot(q, (snapshot) => {
              let allMessages = snapshot.docs.map(doc => {
                  return doc.data();
              });
              setLastMessage(allMessages[0] ? allMessages[allMessages.length-1] : null);
          });
      
          return unsub;
      }, []);
    const openChatRoom = () =>{
      router.push({pathname: '/chatRoom', params: item})
    }
    const renderTime = () =>{
      if(lastMessage){
        let date = lastMessage?.createdAt;
        return (new Date(date?.seconds * 1000)).toString().split(' ').slice(0,3).join(' ');
      }
    }
    const renderLastMessage = () =>{
      if(typeof lastMessage == 'undefined') return 'Загрузка...'
      if(lastMessage){
        let message = lastMessage.text.length > 30 ? lastMessage.text.slice(0,30) + '...' : lastMessage.text;
        if(currentUser?.userId == lastMessage?.userId) return 'Вы: ' + message;
        return message;
      }
      else{
        return 'Поздоровайтесь :)'
      }
    }
    return (
        <TouchableOpacity 
        onPress={openChatRoom}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: wp(4),
          marginBottom: hp(1),
          paddingBottom: hp(0.5),
          borderBottomColor: '#e5e5e5',
          borderBottomWidth: noBorder ? 0 : 1
        }}>
            <Image
                source={{uri: item?.profileUrl}}
                style={styles.avatar}
                placeholder = {blurhash}
                transition={500}
            />
            <View style={styles.textContainer}>
                <View style={styles.nameTimeContainer}>
                    <Text style={styles.name}>{item?.username}</Text>
                    <Text style={styles.time}>{renderTime()}</Text>
                </View>
                <Text style={styles.lastMessage}>{renderLastMessage()}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    avatar: {
        height: hp(6),
        width: hp(6),
        borderRadius: hp(3),
    },
    textContainer: {
        flex: 1,
        marginLeft: wp(3),
        gap: hp(0.5),
    },
    nameTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    name: {
        fontSize: hp(1.8),
        fontWeight: '600',
        color: '#262626',
    },
    time: {
        fontSize: hp(1.6),
        fontWeight: '500',
        color: '#737373',
    },
    lastMessage: {
        fontSize: hp(1.6),
        fontWeight: '500',
        color: '#737373',
    },
});

export default ChatItem;