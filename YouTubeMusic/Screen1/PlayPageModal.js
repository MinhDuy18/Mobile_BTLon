import React from 'react';
import { Modal, Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const PlayPageModal = ({ visible, song, onClose, onPlay }) => {
  if (!visible) {
    return null;
  }
  console.log(song);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose()}
    >
      <TouchableOpacity style={styles.container} >
       
       <Image style={styles.image} source={{ uri: song.image }} />
       <View style={styles.details}>
         <Text style={styles.songName}>{song.name}</Text>
         <Text style={styles.artist}>{song.singer}</Text>
       </View>
       <TouchableOpacity onPress={onClose}>
            <AntDesign name="close" size={24} color="black" />
       </TouchableOpacity>
      
       {/* Các icon hoặc control nhỏ như play/pause có thể được thêm vào đây */}
     </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
    // container: {
    //   flex: 1,
    //   justifyContent: 'flex-end',
    //   alignItems: 'center',
    //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // },
    container: {
        marginTop: 550,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
      },
    modalContent: {
      width: '100%',
      height: 100,
      backgroundColor: '#000',
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      color: '#000', // Thêm màu chữ cho modalContent
      flexDirection: 'row',
     
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

export default PlayPageModal;
