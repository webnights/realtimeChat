import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'

const StartPage = () => {
  return (
    <View style={styles.container} classname="bg-red-200">
          <ActivityIndicator size="large" color='gray'/>
    </View>
  )
}

export default StartPage

const styles = StyleSheet.create({

  container:{
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text:{
    fontSize: 50,
    color: '#000'
  }
})