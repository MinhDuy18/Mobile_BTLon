import React, {useState, useEffect} from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';
const PlayPageModal = ({ visible, song, onClose}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  console.log("mp3 ne "+ song.mp3);
  if (!song) {
    return null; // Không hiển thị gì nếu không có bài hát đang phát
  }
  const playSelectedSong = async (songURL) => {
    try {
      if (!sound) {
        const { sound: audioSound } = await Audio.Sound.createAsync({ uri: songURL });
        setSound(audioSound);
        await audioSound.playAsync();
        setIsPlaying(true);
      } else {
        if (isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false);
        } else {
          await sound.playAsync();
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error('Error playing audio: ', error);
    }
  };
  // useEffect(() => {
  //   if (sound) {
  //     // Nếu có âm thanh đang phát, dừng nó trước khi chuyển sang bài hát mới
  //     stopAndUnload();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [song]); 
  const handlePlay = () => {
    playSelectedSong(song.mp3);
  };
  const pauseAudio = async () => {
    if (sound) {
      try {
        if (isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false); // Tạm dừng âm nhạc và đặt isPlaying thành false
        } else {
          await sound.playAsync();
          setIsPlaying(true); // Tiếp tục phát âm nhạc và đặt isPlaying thành true
        }
      } catch (error) {
        console.error('Error toggling play/pause: ', error);
      }
    }
  };
  return (
      <TouchableOpacity style={styles.container} >
       <Image style={styles.image} source={{ uri: song.image }} />
       <View style={styles.details}>
         <Text style={styles.songName}>{song.name}</Text>
         <Text style={styles.artist}>{song.singer}</Text>
       </View>
       <View style = {{width: 100, flexDirection: "row", justifyContent:"space-around"}}>
          <TouchableOpacity>
               <AntDesign name="stepbackward" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
          <AntDesign
                   name={isPlaying ? "pausecircleo" : "playcircleo"}
                    size={24}
                    color="black"
                    onPress={ isPlaying ? pauseAudio : handlePlay}
            />
          </TouchableOpacity>
          <TouchableOpacity>
              <AntDesign name="stepforward" size={24} color="black" />
          </TouchableOpacity>
       </View>
       <TouchableOpacity onPress={onClose}>
            <AntDesign name="close" size={24} color="black" />
       </TouchableOpacity>
{/* Các icon hoặc control nhỏ như play/pause có thể được thêm vào đây */}
     </TouchableOpacity>
  
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
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
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