import React, {useState, useEffect} from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import axios from 'axios';

import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSong } from './SongContext';
import useAudioPlayer from './UseAudioProvider';
const PlayPageModal = ({ visible}) => {
  // const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [data, setData] = useState([]);
  const songContext = useSong();
  // const {setSelectedSong} = useSong();
  // const selectedSong = songContext.selectedSong;
  const {setSelectedSong, selectedSong} = songContext;
  const [songPlaying, setSongPlaying] = useState(selectedSong);
  const [isExpanded, setIsExpanded] = useState(false);
  // const [visibleModal, setVisibleModal] = useState(false);
  const { isPlaying,currentPosition,onPlaybackStatusUpdate, setCurrentPosition, setIsPlaying , duration, playedTime, remainingTime, setDuration, setPlayedTime, setRemainingTime} = useAudioPlayer();

  useEffect(() => {
    if (selectedSong) {
      setDuration(selectedSong.duration || 0); // Cập nhật duration từ selectedSong
    }
  }, [selectedSong]);   
  // Sử dụng các giá trị trả về từ audioPlayer ở đây
  const handleUpButtonPress = () => {
    setIsExpanded(true); // Đảo ngược trạng thái khi nút "up" được ấn
  };
// 
const handleDownButtonPress = () => {
  setIsExpanded(false); // Đảo ngược trạng thái khi nút "up" được ấn
};
  const handleSongSelect = (song) => {
    setSelectedSong(song);
    console.log(song);
  };

  // console.log(songPlaying.mp3);
  useEffect(() => {
    if ((songPlaying && songPlaying !== selectedSong) || !sound) {
      stopAndUnload();
      setSongPlaying(selectedSong);
    }
  }, [selectedSong, songPlaying, sound]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        if (currentPosition !== undefined) {
          setPlayedTime(currentPosition);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPlaying, currentPosition]);
  

  
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
      audioSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      const status = await audioSound.getStatusAsync();
      if (status.isLoaded) {
        setDuration(status.durationMillis / 1000);
      }
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

  const playNextSong = () => {
    const index = data.findIndex((item) => item.id === songPlaying.id);
    if (index < data.length - 1) {
      handleSongSelect(data[index + 1]);
      stopAndUnload();
      handlePlay();
    } else {
      handleSongSelect(data[0]);
      stopAndUnload();
      handlePlay();
    }
  };
  const playPreviousSong = () => {
      const index = data.findIndex((item) => item.id === songPlaying.id);
      if (index > 0) {
        handleSongSelect(data[index - 1]);
        stopAndUnload();
        handlePlay();
      } else {
        handleSongSelect(data[data.length - 1]);
        stopAndUnload();
        handlePlay();
      }

  };



  
  // Xử lý timing duration
  const convertTimeStringToSeconds = (timeString) => {
    try {
        const [minutes, seconds] = timeString.split(':').map(Number);
        return minutes * 60 + seconds;
    } catch (error) {
        console.error('Lỗi khi chuyển đổi chuỗi thời lượng', error);
        return 0;
    }
};

// Cập nhật thời gian hiện tại và thời lượng của bài hát



const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
// Trước khi gán giá trị mới cho playedTime, kiểm tra xem giá trị có tồn tại không
const handleSliderChange = (value) => {
    setPlayedTime(value);
};

const handleSliderComplete = async (value) => {
  if (sound) {
      await sound.setPositionAsync(value * 1000); // Chuyển đổi giây thành mili giây
      if (isPlaying) { // Kiểm tra nếu nhạc đang được phát
          setPlayedTime(value);
          setCurrentPosition(value); // Chỉ cập nhật currentPosition khi nhạc đang phát
      }
      if (!isPlaying) {
          await sound.playFromPositionAsync(value * 1000);
          setIsPlaying(true);
      }
  }
};

const handleRetWeet = async () => {
  if (sound) {
    try {
      // Stop the current audio
      await sound.stopAsync();
      await sound.setPositionAsync(0); // Reset the position to the beginning
      await sound.playAsync(); // Replay the audio
      setIsPlaying(true); // Set playing state to true
    } catch (error) {
      console.error('Error replaying audio: ', error);
    }
  }
};


  return (
      <TouchableOpacity  style={styles.container} >
      <Image style={styles.image} source={{ uri: selectedSong.image }} />
      <View style={styles.details}>
        <Text style={styles.songName}>{selectedSong.name}</Text>
        <Text style={styles.artist}>{selectedSong.singer}</Text>
      </View>
      <View style = {{width: 100, flexDirection: "row", justifyContent:"space-around"}}>
         <TouchableOpacity onPress={playPreviousSong}>
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
         <TouchableOpacity onPress={playNextSong}>
             <AntDesign name="stepforward" size={24} color="black" />
         </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleUpButtonPress}>
           <AntDesign name="up" size={24} color="black" />
      </TouchableOpacity>
      <Modal visible={isExpanded} transparent animationType='slide'>
        <TouchableOpacity style={styles.expandedContainer}>
        <TouchableOpacity style = {{width:60, height:60}} onPress={handleDownButtonPress}>
             <AntDesign name="down" size={30} color="black" />
        </TouchableOpacity>
            <View style = {styles.ModalContainer}>
               <Image style = {{width:300, height:300}} resizeMode='contain' source={selectedSong.image}></Image>
            </View>
            <View style = {styles.TitleSong}>
                <AntDesign name="dislike2" size={24} color="black" />
                <View style = {{width: "60%", height: 30, alignItems:"center", justifyContent:"center"}}>
                    <Text style = {{fontSize: 20, fontWeight: "bold"}}>{selectedSong.name}</Text>
                    <Text style = {{fontSize: 15, fontWeight: "bold", color:"grey"}}>{selectedSong.singer}</Text>
                </View>
                <AntDesign name="like2" size={24} color="black" />
            </View>
            <View style={styles.audioBar}>
           
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={0}
              maximumValue={duration}
              value={playedTime} // Giá trị của thanh trượt phải được liên kết với playedTime
              minimumTrackTintColor="#000000"
              maximumTrackTintColor="#FFFFFF"
              onSlidingComplete={handleSliderComplete}
              onValueChange={handleSliderChange}
            />

           </View>
           <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 46, marginBottom: 5 }}>
               <Text style={styles.timeText}>{formatTime(currentPosition)}</Text>
               <Text style={styles.timeText}>{formatTime(remainingTime)}</Text>
             
           </View>
            <View style = {{flexDirection: "row", justifyContent:"space-around", marginTop: 70}}>
                <TouchableOpacity onPress={playNextSong}>
                    <AntDesign name="stepbackward" size={35} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                <AntDesign
                  name={isPlaying ? "pausecircleo" : "playcircleo"}
                   size={35}
                   color="black"
                   onPress={ isPlaying ? pauseAudio : handlePlay}
           />
                  </TouchableOpacity> 
                <TouchableOpacity onPress={playPreviousSong}>
                    <AntDesign name="stepforward" size={35} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleRetWeet}>
                <AntDesign name="retweet" size={35} color="black" />
                  </TouchableOpacity>
            </View>
        </TouchableOpacity>
      </Modal>
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
      ModalContainer: {
        marginTop: -30,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 400,
      },
      TitleSong: {
        marginTop: -30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        height: 50,
      },
      expandedContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 0,
        // Các kiểu dáng và thuộc tính khác của màn hình mở rộng
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
      audioBar: {
        marginTop:50,
        height: 3,
        width: '80%',
        backgroundColor: 'white',
        marginLeft: 30

    },
    progress: {
        height: '100%', // Chiều cao của thanh tiến triển bằng với thanh thời lượng
        backgroundColor: 'black',
    },
    timeText: {
        color: '#000',
        marginTop: 10,
        marginLeft: 30
    },
  });

export default PlayPageModal;