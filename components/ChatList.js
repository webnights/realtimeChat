import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ChatItem from './ChatItem';
import { useRouter } from 'expo-router';
const ChatList = ({ users, currentUser }) => {
  const router = useRouter();
    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                contentContainerStyle={styles.contentContainer}
                keyExtractor={(item) => Math.random().toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => 
                <ChatItem 
                noBorder={index+1 === users.length} 
                item={item} 
                index={index}
                currentUser={currentUser}
                router={router}
                />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    contentContainer: {
        flex: 1,
        paddingVertical: 25,
    },
});

export default ChatList;