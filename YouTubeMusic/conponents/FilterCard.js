import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

const Filter = ({item}) => {
  return (
    <View style={{height:84,margin:6,paddingTop:32,paddingBottom:16}}>
    <TouchableOpacity style={{height:36,borderRadius:8, justifyContent:'center',alignItems:'center',backgroundColor:'rgba(255,255,255,.1)'}}>
      <Text style={{fontSize:14,color:'white',marginHorizontal:12}}>{item}</Text>
    </TouchableOpacity>
    </View>
  )
}
export default Filter

const styles = StyleSheet.create({})