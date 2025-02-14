import { View, Text, ScrollView } from 'react-native';
import MessageItem from './MessageItem';
import React from 'react';

const MessageList = ({ messages, currentUser }) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 10 }}>
            {messages.map((message, index) => (
                <MessageItem key={index} message={message} currentUser={currentUser} />
            ))}
        </ScrollView>
    );
}

export default MessageList;