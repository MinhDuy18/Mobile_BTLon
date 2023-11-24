import React , {useEffect}from 'react';
import { Modal, Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const PlayPageModal = ({ visible, song, setSong,onClose, sound, isPlaying, setIsPlaying, playbackInstance, data}) => {
 
  if (!visible) {
    return null;
  }
  useEffect(() => {
    if (!visible) {
      stopAllSounds();
    }
  }, [visible]);
  console.log(song);
  console.log(data)
 
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
  const stopAllSounds = () => {
    if (sound) {
        sound.stopAsync();
    }
    if (playbackInstance) {
        playbackInstance.stopAsync();
    }
    // Dừng toàn bộ các âm thanh khác nếu cần
};
  const handleClose = () => {
    onClose();
    setIsPlaying(false); // Đặt isPlaying thành false khi đóng modal
    console.log("isPlaying in PlayPage", isPlaying); // Kiểm tra giá trị isPlaying sau khi đóng modal
    stopAllSounds();
  
}

  useEffect(() => {
    console.log("isPlaying in PlayPage", isPlaying); // Log giá trị isPlaying sau mỗi lần thay đổi
  }, [isPlaying]);

  const playNextSong = async () => {
    // Xác định index của bài hát hiện tại trong danh sách
    
    const currentIndex = data.findIndex(item => item.id === song.id);


    // Nếu không tìm thấy hoặc bài hát hiện tại là bài cuối cùng trong danh sách, không làm gì cả
    if (currentIndex === -1 || currentIndex === data.length - 1) {
      return;
    }

    // Lấy thông tin của bài hát kế tiếp từ danh sách
    const nextSong = data[currentIndex + 1];
    console.log("nextSong", nextSong);

    // Ngừng phát bài hát hiện tại
    if (sound) {
      await sound.stopAsync();
    }

    // Phát bài hát kế tiếp
    if (sound && nextSong) {
      try {
        await sound.unloadAsync(); // Hủy tải tệp âm thanh
        await sound.loadAsync({ uri: nextSong.mp3 }); // Tải bài hát mới
        await sound.playAsync(); // Phát bài hát mới

        // Cập nhật thông tin bài hát mới và trạng thái phát nhạc
        setIsPlaying(true);
        setSong(nextSong);
       
      } catch (error) {
        console.error('Error playing next song: ', error);
      }
    }
  }

  const playPreviousSong = async () => {
    // Xác định index của bài hát hiện tại trong danh sách
    const currentIndex = data.findIndex(item => item.id === song.id);

    // Nếu không tìm thấy hoặc bài hát hiện tại là bài đầu tiên trong danh sách, không làm gì cả
    if (currentIndex === -1 || currentIndex === 0) {
      return;
    }

    // Lấy thông tin của bài hát trước đó từ danh sách
    const previousSong = data[currentIndex - 1];
    console.log("previousSong", previousSong);

    // Ngừng phát bài hát hiện tại
    if (sound) {
      await sound.stopAsync();
    }

    // Phát bài hát trước đó
    if (sound && previousSong) {
      try {
        await sound.unloadAsync(); // Hủy tải tệp âm thanh
        await sound.loadAsync({ uri: previousSong.mp3 }); // Tải bài hát mới
        await sound.playAsync(); // Phát bài hát mới

        // Cập nhật thông tin bài hát mới và trạng thái phát nhạc
        setIsPlaying(true);
        setSong(previousSong);
       
      } catch (error) {
        console.error('Error playing previous song: ', error);
      }
    }
  };
  
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={() => onClose()}
    backdropOpacity={0} // Thêm thuộc tính backdropOpacity để tạo nền modal trong suốt
   
    >
      
     
      
          <View style = {styles.container}>
            <TouchableOpacity>
              <View style = {styles.modalStyleSub}>
                      <Image style={styles.image} source={{ uri: song.image }} />
                  <View style={styles.details}>
                    <Text style={styles.songName}>{song.name}</Text>
                    <Text style={styles.artist}>{song.singer}</Text>
                  </View>
                  <View style  = {styles.ButtomController}>
                      <TouchableOpacity onPress={playPreviousSong}>
                        <AntDesign name="stepbackward" size={24} color="black" />
                      </TouchableOpacity>
                      <AntDesign
                                name={isPlaying ? "pausecircleo" : "playcircleo"}
                                size={24}
                                color="black"
                                onPress={pauseAudio}
                            />
                      <TouchableOpacity onPress={playNextSong}>
                        <AntDesign name="stepforward" size={24} color="black" />
                      </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={handleClose}>
                <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
              </View>
          
       </TouchableOpacity>
            </View>
       {/* Các icon hoặc control nhỏ như play/pause có thể được thêm vào đây */}
  
    
    
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
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: 100,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: '#ffffff',
      padding: 10,
      borderRadius: 8,
      marginBottom: 10,
     
      // Đặt giá trị zIndex cao hơn để modal hiển thị trên các phần tử khác
    },
    modalStyleSub: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    modalFullScreen: {
      height: '100%',
      width: '100%',
      backgroundColor: '#000000',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalNormal: {
      // Define kích thước và kiểu dáng cho modal khi không mở rộng fullscreen
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: '#ffffff',
      padding: 10,
      borderRadius: 8,
      marginBottom: 10,
    },
    
    modalContent: {
      backgroundColor: '#000',
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      color: '#000', // Thêm màu chữ cho modalContent
      flexDirection: 'row',
      zIndex:9999,
      pointerEvents: 'auto'
     
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
      ButtomController: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: 150,
      },
  });

export default PlayPageModal;
