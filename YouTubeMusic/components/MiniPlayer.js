import React, {useState, useEffect} from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import axios from 'axios';
import { useSong } from './SongContext';
const PlayPageModal = ({ visible}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [data, setData] = useState([]);
  const songContext = useSong();
  const selectedSong = songContext.selectedSong;
  const [songPlaying, setSongPlaying] = useState(selectedSong);
  
 
  // console.log(songPlaying.mp3);
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/song');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);
console.log(data);
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
  const stopAndUnload = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error stopping audio: ', error);
    }
  };
  if(!selectedSong) return null;
  // useEffect(() => {
  //   if (songPlaying && songPlaying !== song) {
  //     stopAndUnload();
  //     setSongPlaying(song);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [song]);
  const handlePlay = () => {
    playSelectedSong(selectedSong.mp3);
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
  // const onClose = () => {
  //   stopAndUnload();
  //   setSongPlaying(null);
  // };
  // const playNextSong = () => {
  //   const index = data.findIndex((item) => item.id === songPlaying.id);
  //   if (index < data.length - 1) {
  //     setSongPlaying(data[index + 1]);
  //     stopAndUnload();
  //     handlePlay();
  //   } else {
  //     setSongPlaying(data[0]);
  //     stopAndUnload();
  //     handlePlay();
  //   }
  // };
  // const playPreviousSong = () => {
  //     const index = data.findIndex((item) => item.id === songPlaying.id);
  //     if (index > 0) {
  //       setSongPlaying(data[index - 1]);
  //       stopAndUnload();
  //       handlePlay();
  //     } else {
  //       setSongPlaying(data[data.length - 1]);
  //       stopAndUnload();
  //       handlePlay();
  //     }

  // };
  return (
      <TouchableOpacity style={styles.container} >
       <Image style={styles.image} source={{ uri: selectedSong.image }} />
       <View style={styles.details}>
         <Text style={styles.songName}>{selectedSong.name}</Text>
         <Text style={styles.artist}>{selectedSong.singer}</Text>
       </View>
       <View style = {{width: 100, flexDirection: "row", justifyContent:"space-around"}}>
          <TouchableOpacity >
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
          <TouchableOpacity >
              <AntDesign name="stepforward" size={24} color="black" />
          </TouchableOpacity>
       </View>
       <TouchableOpacity>
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
