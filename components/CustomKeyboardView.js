import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { ScrollView } from 'react-native';
const ios = Platform.OS == 'ios';
const CustomKeyboardView = ({children, inChat}) => {
  let kavConfig = {};
  let scrollViewConfig ={};
  if(inChat){
    kavConfig = {keyboardVerticalOffset: 90}
    scrollViewConfig = {contentContainerStyle: {flex:1}}
  }
  return (
    <KeyboardAvoidingView
      behavior={ios ? 'padding': 'height'}
      style={{flex: 1, justifyContent: 'center'}}
      {...kavConfig}
    >
      <ScrollView
      style={{flex: 1}} 
      bounces={false}
      contentContainerStyle = {{flex: 1}}
      {...scrollViewConfig}
      >
        {children}

      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default CustomKeyboardView

const styles = StyleSheet.create({})