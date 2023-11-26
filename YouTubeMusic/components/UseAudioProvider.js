import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

const useAudioPlayer = (songURL, selectedSong) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [playedTime, setPlayedTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [duration, setDuration] = useState(0);

    console.log("playedTime: " + playedTime);
    console.log("remainingTime: " + remainingTime);
    console.log("duration: " + duration);
    console.log("currentPosition: " + currentPosition);
    console.log("isPlaying: " + isPlaying);

  useEffect(() => {
    if (selectedSong && selectedSong.duration) {
      setDuration(convertTimeStringToSeconds(selectedSong.duration)); // Cập nhật duration từ selectedSong
    }
  }, [selectedSong]);

  

  useEffect(() => {
    const initializeAudio = async () => {
      try {
        const { sound: audioSound } = await Audio.Sound.createAsync({ uri: songURL });
        setSound(audioSound);
      } catch (error) {
        console.error('Error initializing audio: ', error);
      }
    };

    initializeAudio();
  }, [songURL]);
  const playAudio = async () => {
    if (sound) {
      try {
        if (isPlaying) {
          // ...
          await sound.pauseAsync();
                  setIsPlaying(false);
        } else {
          await sound.playAsync();
          sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
          setIsPlaying(true);
          // Lấy dữ liệu duration khi bài hát được play
          const status = await sound.getStatusAsync();
          if (status.isLoaded) {
            setDuration(status.durationMillis / 1000);
          }
        }
      } catch (error) {
        console.error('Error toggling play/pause: ', error);
      }
    }
  };
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
          sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
          const status = await sound.getStatusAsync();
            if (status.isLoaded) {
                setDuration(status.durationMillis / 1000);
            }
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error('Error playing audio: ', error);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setPlayedTime((prevPlayedTime) => prevPlayedTime + 1);
      }
    }, 1000);
  
    return () => clearInterval(interval);
  }, [isPlaying]);
  const convertTimeStringToSeconds = (timeString) => {
    try {
      const [minutes, seconds] = timeString.split(':').map(Number);
      return minutes * 60 + seconds;
    } catch (error) {
      console.error('Lỗi khi chuyển đổi chuỗi thời lượng', error);
      return 0;
    }
  };
  
  const onPlaybackStatusUpdate = (status) => {
    if (status.positionMillis !== undefined && status.durationMillis !== undefined) {
      const newPosition = status.positionMillis / 1000; // Thời gian đã phát được tính từ status
      const newDuration = status.durationMillis / 1000; // Thời lượng bài hát tính từ status
  
      setPlayedTime(newPosition);
      setRemainingTime(newDuration - newPosition);
  
      // Cập nhật các giá trị khác nếu cần thiết
      setDuration(newDuration);
      setCurrentPosition(newPosition);
      setIsPlaying(status.isPlaying);
    }
  };
  


  // Các hàm và giá trị khác cần thiết cho việc điều khiển âm thanh

  return { isPlaying, playSelectedSong, currentPosition, setCurrentPosition, setIsPlaying, playedTime, remainingTime, duration, setDuration, setPlayedTime, setRemainingTime , onPlaybackStatusUpdate};
};

export default useAudioPlayer;
