import { StyleSheet, Text, View } from 'react-native'
import LottieView from 'lottie-react-native'
import React from 'react'

const Loading = ({size}) => {
  return (
    <View style={{height:size, aspectRatio: 1}}>
      <LottieView style={styles.lottie} source={require('../assets/loading_animation.json')} autoPlay loop/>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    lottie:{
        flex:1
    }
})