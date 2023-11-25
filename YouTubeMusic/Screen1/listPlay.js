import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, Modal,FlatList, TouchableOpacity , ScrollView,PanResponder, Animated} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AudioContext } from './AudioContext';
import MiniPlay from './MiniPlay'
import PlayPageModal from './PlayPageModal';
import { Audio } from 'expo-av';
import { on } from 'events';

const listPlay = ({ navigation, route }) => {
    const [data, setData] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [sound, setSound] = useState(null);
    const [playbackInstance, setPlaybackInstance] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false); // Thêm biến isPlaying
    // const[song, setSong]=useState(null);
    const openModalWithSong = (song) => {
        setSelectedSong(song); // Lưu thông tin bài hát được chọn
        setModalVisible(true); // Hiển thị Modal
        onPlay();

    };
    // const audioContext = useContext(AudioContext);
    // const { audioURL,isPlaying, setIsPlaying, setAudioURL } = audioContext;
    // useEffect(() => {
    //     if (isPlaying) {
    //         pause();
    //     }
    // }, []);
    // useEffect(() => {
    //     const loadSound = async () => {
    //         if (audioURL) {
    //           const { sound: audioSound } = await Audio.Sound.createAsync({ uri: selectedSong.url });
    //           setSound(audioSound);
    //         }
    //       };
    
    //     loadSound();
    
    //     return () => {
    //       if (sound) {
    //         sound.unloadAsync();
    //       }
    //     };
    //   }, [audioURL]);
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

    // const { currentSong } = route.params || {};
   
    console.log(data);
    // useEffect(() => {
    //     // Kiểm tra nếu có bài hát được chọn, phát bài hát đó
    //     if (selectedSong) {
    //         navigation.navigate('playPage', {
    //             name: selectedSong.name,
    //             singer: selectedSong.singer,
    //             image: selectedSong.image,
    //             duration: selectedSong.duration,
    //             url: selectedSong.mp3,
    //             id: selectedSong.id,
    //         });
    //         // openModalWithSong(selectedSong);
    //     }
    //     // if (selectedSong) {

    //     //     openModalWithSong(selectedSong);
    //     //    console.log(selectedSong);
    //     // }
    // }, [selectedSong]);
    
    const playRandomSong = () => {
        if (data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomSong = data[randomIndex];
            // Chuyển hướng đến trang phát nhạc với bài hát ngẫu nhiên được chọn
            navigation.navigate('playPage', {
                name: randomSong.name,
                singer: randomSong.singer,
                image: randomSong.image,
                duration: randomSong.duration,
                url: randomSong.mp3,
                id: randomSong.id,
            });
        }
    };
    console.log('Selected Song:', selectedSong);
    const onPlay = async () => {
        if (selectedSong && selectedSong.url) {
            const { sound: audioSound } = await Audio.Sound.createAsync({ uri: selectedSong.url });
            setSound(audioSound);

            try {
                await audioSound.playAsync();
                console.log('Playing audio');
            } catch (error) {
                console.error('Error playing audio: ', error);
            }
        } else {
            console.error('Invalid song or URL');
        }
    };
     
      const playAudio = async () => {
        try {
          if (sound && selectedSong && selectedSong.url) {
            await sound.loadAsync({ uri: selectedSong.url });
            await sound.playAsync();
            console.log('Playing audio');
          } else {
            console.error('Invalid song or URL');
          }
        } catch (error) {
          console.log('Error playing audio: ', error);
        }
      };
      const playSelectedSong = async (songURL) => {
        if (songURL) {
            try {
                const { sound: audioSound } = await Audio.Sound.createAsync({ uri: songURL });
                setSound(audioSound);
    
                await audioSound.playAsync();
                console.log('Playing audio');
                setIsPlaying(true); // Cập nhật trạng thái đang phát
                // Kiểm tra giá trị isPlaying sau một khoảng thời gian
                setTimeout(() => {
                    console.log('Is playing?', isPlaying);
                }, 1000); // Ví dụ: Kiểm tra sau 1 giây
            } catch (error) {
                console.error('Error playing audio: ', error);
            }
        } else {
            console.error('Invalid song URL');
        }
    };
    
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.View1}>
                    <View style={styles.Img_Style}>
                        <Image style={styles.img_name_list} source={require('../img/Song1.png')} ></Image>
                        <Image style={styles.img_name_list} source={require('../img/Song1.png')} ></Image>
                        <Image style={styles.img_name_list} source={require('../img/Song1.png')} ></Image>
                        <Image style={styles.img_name_list} source={require('../img/Song1.png')} ></Image>
                    </View>
                    <View style={styles.Text_Style}>
                        <Text style={styles.nameList}>Việt Suy</Text>
                        <Text style={styles.subTextlist}>Danh sách phát</Text>
                        <Text style={styles.subTextlist} >30 N lượt xem - 28 bản nhạc</Text>
                    </View>
                </View>
                <View style={styles.buttom_Style}>
                    <TouchableOpacity onPress={playRandomSong}>
                        <View style={styles.butomNext}>
                            <AntDesign name="swap" size={24} color="#000" />
                            <Text style={styles.text_bottomNext}>Trộn bài</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.buttomAdd_Style}>
                        <MaterialIcons name="add-to-photos" size={24} color="#fff" />
                        <Text style={styles.textAdd_Style}>Lưu vào thư viện</Text>
                    </View>
                    <Ionicons name="ellipsis-vertical-sharp" size={24} color="#fff" />
                </View>
                <View>
                    <FlatList data={data}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {
                                setSelectedSong(item); // Lưu thông tin bài hát được chọn
                                setModalVisible(true);
                                playSelectedSong(item.mp3)
                                // onPlay();
                                // alert(item.name)
                                // alert(item.mp3)
                                //openModalWithSong(item);
                            }}>
                                <View style={styles.song_Style}>
                                    <Image style={styles.img_Song_Style} resizeMode='contain' source={item.image}></Image>
                                    <View style={styles.Resize_Text} >
                                        <Text style={styles.name_Song_Style}>{item.name}</Text>
                                        <View style={styles.sub_Song}>
                                            <Text style={styles.singer_Song_Style}>{item.singer}</Text>
                                            <Text style={styles.duration_Song_Style}>{item.duration}</Text>
                                        </View>
                                    </View>
                                    <Ionicons name="ellipsis-vertical-sharp" size={24} color="#fff" />
                                </View>
                            </TouchableOpacity>
                        )}
                    >
                    </FlatList>
                </View>
                <View>
                  {selectedSong && (
                    <View style = {styles.modalWrapper}>
                        <PlayPageModal
                    visible={modalVisible}
                    song={selectedSong}
                    setSong={setSelectedSong}
                    onClose={() => {
                        setModalVisible(false);
                     
                        setIsPlaying(false);
                      
        
                       
                        // Đặt isPlaying thành false khi đóng modal
                    }}
                    sound={sound}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying} // Truyền setIsPlaying xuống PlayPageModal
                    playbackInstance={playbackInstance}
                    data={data}
                    
            />
                    </View>
                )}
                </View>
               
                
                {/* {selectedSong && (
                    <PlayPageModal
                        visible={modalVisible}
                        song={selectedSong}
                        onClose={() => setModalVisible(false)}
                    />
                )} */}
                {/* Hiển thị MiniPlay nếu có thông tin bài hát */}
                {/* {currentSong && <MiniPlay currentSong={currentSong} />} */}
            </View>
        </ScrollView>
    )
}
export default listPlay;
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#000',
        height: 10000,
        zIndex: 1,
        position: 'relative',

    },
    View1: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    Img_Style: {
        width: '50%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 30,
        marginLeft: 10,
    },
    Text_Style: {
        width: '50%',
        justifyContent: 'center',

    },
    img_name_list: {
        height: 100,
        width: '48%',
    },
    nameList: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 30,
    },
    subTextlist: {
        color: '#FFFFFFB3',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    butomNext: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 120,
        height: 35,
        alignItems: 'center',
        borderRadius: 30,
    },
    text_bottomNext: {
        color: '#000',
        fontSize: 15,
        fontWeight: 600,
    },
    buttom_Style: {
        width: '100%',
        height: 80,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttomAdd_Style: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 200,
        height: 35,
        alignItems: 'center',
        borderRadius: 30,
        borderWidth: '0.5px',
        borderColor: '#fff',
    },
    textAdd_Style: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 600,
    },
    img_Song_Style: {
        height: 60,
        width: 60,
    },
    song_Style: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#000',
        zIndex:999
    },
    name_Song_Style: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 600,
        marginLeft: 10,
        marginTop: 10,
    },
    singer_Song_Style: {
        color: '#FFFFFFB3',
        fontSize: 15,
        fontWeight: 600,
        marginLeft: 10,
    },
    duration_Song_Style: {
        color: '#FFFFFFB3',
        fontSize: 15,
        fontWeight: 600,
        marginLeft: 10,
    },
    sub_Song: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%',
    },
    Resize_Text: {
        width: '60%',
        textAlign: 'left',
    },
    modalWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999, // Đặt zIndex cao để modal hiển thị trên top
    },
    modalOverlay: {
        position: 'absolute',
        bottom: 0,
        height: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền trong suốt để tương tác với các thành phần phía sau
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:0
      },
      modalContainer: {
        width: '80%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        overflow: 'hidden', // Để tránh các vùng không mong muốn khi sử dụng borderRadius
      },
      modalContent: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
});