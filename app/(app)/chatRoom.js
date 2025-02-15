import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import COLORS from '../../constants/Colors';
import MessageList from '../../components/MessageList';
import { Feather } from '@expo/vector-icons';
import CustomKeyBoardView from '../../components/CustomKeyboardView'
import { getRoomId } from '../../constants/blurhash';
import { doc, setDoc, Timestamp, collection, addDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useAuth } from '../../context/authContext';


const ChatRoom = () => {
    const textRef = useRef('');
    const item = useLocalSearchParams();
    const router = useRouter();
    const {user} = useAuth();
    const [messages, setMessages] = useState([]);
    const inputRef = useRef(null)

    useEffect(() => {
      createRoomIfNotExist();
  
      let roomId = getRoomId(user?.userId, item?.userId);
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
      const q = query(messagesRef, orderBy("createdAt", "asc"));
  
      let unsub = onSnapshot(q, (snapshot) => {
          let allMessages = snapshot.docs.map(doc => {
              return doc.data();
          });
          setMessages([...allMessages]);
      });
  
      return unsub;
  }, []);

    const createRoomIfNotExist = async() =>{
      let roomId = getRoomId(user?.userId, item?.userId);
      await setDoc(doc(db, 'rooms', roomId), {
        roomId,
        createdAt: Timestamp.fromDate(new Date())
      })
    }

    const handleSendMessage = async () =>{
        let message = textRef.current.trim();
        if(!message) return;
        try {
          let roomId = getRoomId(user?.userId, item?.userId);
          const docRef = doc(db, 'rooms', roomId);
          const messageRef = collection(docRef, 'messages')
          textRef.current = '';
          if(inputRef) inputRef?.current?.clear()
          const newDoc = await addDoc(messageRef, {
            userId: user?.userId,
            text: message,
            profileUrl: user?.profileUrl,
            senderName: user?.username,
            createdAt: Timestamp.fromDate(new Date())
          })

         

        } catch (e) {
          Alert.alert('Сообщение: ', e.message )
        }
    }

    return (
       <CustomKeyBoardView inChat={true}>
         <View style={styles.container}>
            <StatusBar style="dark" />
            <ChatRoomHeader user={item} router={router} />
            <View style={{borderBottomWidth: 3, borderColor: COLORS.gray, marginTop: 10}}></View>

            <View style={{flex: 1, justifyContent: 'space-between', backgroundColor: '#fafafa', overflow: 'visible'}}>
              <View style={{flex: 1}}>
                <MessageList messages={messages} currentUser = {user}/>
              </View>
              <View style={{paddingTop: 8, backgroundColor: '#fff'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, borderWidth: 1, borderColor: COLORS.darkGray,  backgroundColor: COLORS.gray, marginHorizontal: 12}}>
                      <TextInput
                        ref={inputRef}
                        onChangeText={value => textRef.current = value}
                        placeholder='Ваше сообщение...'
                        style={{fontSize: hp(2), flex: 1, marginRight: 2}}
                        
                      />
                      <TouchableOpacity style={{marginRight: 15}} >
                        <Feather name='image' size={hp(2.7)} color={COLORS.accent}/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleSendMessage} >
                        <Feather name='send' size={hp(2.7)} color={COLORS.accent}/>
                      </TouchableOpacity>
                    </View>
                  
              </View>
            </View>
        </View>
       </CustomKeyBoardView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default ChatRoom;