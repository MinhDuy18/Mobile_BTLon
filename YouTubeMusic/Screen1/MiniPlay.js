import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MiniPlay = ({song}) => {
  return (
    <View style={styles.container}>
      <Text>{song.id}</Text>
      <Text>{song.name}</Text>
      <Text>{song.singer}</Text>
    </View>
  )
}
export default MiniPlay

const styles = StyleSheet.create({
  container:{
    position:"absolute",
    bottom:50,
    width:window.innerWidth,
    height:100,
    backgroundColor:"white",
    justifyContent:"center",
    alignItems:"center",
  }
})