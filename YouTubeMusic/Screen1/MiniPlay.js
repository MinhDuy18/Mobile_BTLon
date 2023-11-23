import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
const MiniPlay = ({ currentSong, onOpenFullPlayer }) => {
  if (!currentSong) {
    return null; // Không hiển thị gì nếu không có bài hát đang phát
  }
  // ham close
  
  return (
    <TouchableOpacity style={styles.container} onPress={onOpenFullPlayer}>
       
      <Image style={styles.image} source={{ uri: currentSong.image }} />
      <View style={styles.details}>
        <Text style={styles.songName}>{currentSong.name}</Text>
        <Text style={styles.artist}>{currentSong.singer}</Text>
      </View>
      <TouchableOpacity onPress={close}>
           <AntDesign name="close" size={24} color="black" />
      </TouchableOpacity>
     
      {/* Các icon hoặc control nhỏ như play/pause có thể được thêm vào đây */}
    </TouchableOpacity>
  );
};

// hàm khi bấm vào nút close thì tắt miniplay tren ListPlay
 
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  songName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  artist: {
    color: '#888888',
    fontSize: 14,
  },
});

export default MiniPlay;