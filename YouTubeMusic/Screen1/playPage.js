import React, { useState, useEffect, useContext } from "react";
import {
    FlatList,
    ScrollView,
    View,
    StyleSheet,
    Image,
    Text,
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import axios from 'axios';
import Slider from '@react-native-community/slider';
import { TouchableOpacity } from "react-native-web";
import { AudioContext } from "./AudioContext";

let sound;
const MyComponent = ({ route, navigation }) => {
    const [id, setId] = useState(0); // id của bài hát đang được chọn
    const [name, setName] = useState("");
    const [singer, setSinger] = useState("");
    const [image, setImage] = useState("");
    const [duration, setDuration] = useState(0);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [url, setUrl] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [data, setData] = useState([]); // State để lưu trữ danh sách các bài hát từ JSON Server
    const [playedTime, setPlayedTime] = useState(0);
    const [remainingTime, setRemainingTime] = useState(0);

    
    

    const audioContext = useContext(AudioContext); // Lấy context
  const { audioURL, isPlaying1, setAudioURL, setIsPlaying1 } = audioContext; 
        
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
    //Lấy danh sách tất cả  bài hát từ json-server

    console.log(data);




    useEffect(() => {
        const { id, name, singer, image, duration, url } = route.params;
        setId(id);
        setName(name);
        setSinger(singer);
        setImage(image);
        setDuration(convertTimeStringToSeconds(duration));
        setUrl(url);
        // setAudioURL(url);
        setIsPlaying(isPlaying);
        playAudio(url);

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [route.params]);

    

    const playAudio = async (audioPath) => {
        try {
            if (sound) {
                await sound.unloadAsync();
            }

            const { sound: newSound, status } = await Audio.Sound.createAsync({ uri: audioPath });
            sound = newSound;
            sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
            await sound.playAsync();
            //setDuration(convertTimeStringToSeconds(duration));
            setDuration(status.durationMillis / 1000); // Cập nhật duration
            setIsPlaying(isPlaying);
        } catch (error) {
            console.log('Error loading sound: ', error);
        }
    };
    // const onPlaybackStatusUpdate = (status) => {
    //     if (status.positionMillis !== undefined) {
    //         setCurrentPosition(status.positionMillis / 1000); // Cập nhật currentPosition
    //         setPlayedTime(status.positionMillis / 1000); // Cập nhật playedTime
    //         setRemainingTime((status.durationMillis - status.positionMillis) / 1000); // Tính remainingTime
    
    //         // Đồng bộ hóa playedTime với thời gian phát trong trạng thái status
    //         setPlayedTime(status.positionMillis / 1000);
    //     }
    // };

    // const onPlaybackStatusUpdate = (status) => {
    //     if (status.positionMillis !== undefined && status.durationMillis !== undefined) {
    //         setDuration(status.durationMillis / 1000);
    //         setPlayedTime(status.positionMillis / 1000);
    //         setRemainingTime((status.durationMillis - status.positionMillis) / 1000);
            
    //         // Kiểm tra xem âm thanh có đang phát không trước khi cập nhật currentPosition
    //         if (status.isPlaying) {
    //             setCurrentPosition(status.positionMillis / 1000);
    //         }
    //     }
    // };
    const onPlaybackStatusUpdate = (status) => {
        if (status.positionMillis !== undefined && status.durationMillis !== undefined) {
            setDuration(status.durationMillis / 1000);
            setPlayedTime(status.positionMillis / 1000);
            setRemainingTime((status.durationMillis - status.positionMillis) / 1000);
            
            if (status.isPlaying) {
                setCurrentPosition(status.positionMillis / 1000);
            } else {
                // Nếu bài hát đã dừng, giữ nguyên giá trị currentPosition.
                setCurrentPosition(currentPosition);
            }
        }
    };

    const handlePlayPause = async () => {
        if (sound) {
            if (isPlaying) {
                await sound.pauseAsync();
                setIsPlaying(false);
                setCurrentPosition(currentPosition); // Giữ nguyên thời gian khi tạm dừng
            } else {
                await sound.playAsync();
                setIsPlaying(true);
            }
        }
    };
    // tìm song theo id
    const findSong = (id) => {
        const song = data.find((item) => item.id === id);
        return song;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (isPlaying) {
                setCurrentPosition((prevPosition) => {
                    const newPosition = prevPosition + 1;
                    return newPosition <= duration ? newPosition : duration;
                });
            }
        }, 1000);
    
        return () => clearInterval(interval);
    }, [duration, isPlaying]);

    const handleNextSong = () => { // Xử lý khi nhấn nút next
        const nextSong = findSong(id + 1);
        if (nextSong) {
            setId(nextSong.id);
            setName(nextSong.name);
            setSinger(nextSong.singer);
            setImage(nextSong.image);
            setDuration(convertTimeStringToSeconds(nextSong.duration));
            setUrl(nextSong.mp3);
            playAudio(nextSong.mp3);
        }
    }

    // Xử lý khi nhấn nút prev
    const handlePrevSong = () => {
        const prevSong = findSong(id - 1);
        if (prevSong) {
            setId(prevSong.id);
            setName(prevSong.name);
            setSinger(prevSong.singer);
            setImage(prevSong.image);
            setDuration(convertTimeStringToSeconds(prevSong.duration));
            
            setUrl(prevSong.mp3);
            playAudio(prevSong.mp3);
        }
    }


    const convertTimeStringToSeconds = (timeString) => {
        try {
            const [minutes, seconds] = timeString.split(':').map(Number);
            return minutes * 60 + seconds;
        } catch (error) {
            console.error('Lỗi khi chuyển đổi chuỗi thời lượng', error);
            return 0;
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleSliderChange = (value) => {
        setPlayedTime(value);
    };
    
   
    // const handleSliderComplete = async (value) => {
    //     if (sound) {
    //         await sound.setPositionAsync(value * 1000); // Chuyển đổi giây thành mili giây
    //         if (isPlaying) { // Kiểm tra nếu nhạc đang được phát
    //             setPlayedTime(value);
    //             setCurrentPosition(value); // Chỉ cập nhật currentPosition khi nhạc đang phát
    //         }
    //         if (!isPlaying) {
    //             await sound.playFromPositionAsync(value * 1000);
    //             setIsPlaying(true);
    //         }
    //     }
    // };

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
     const [colorLike, setColorLike] = useState('black');
    const [colorDislike, setColorDislike] = useState('black');

    const handleDownButtonPress = () => {
        // Lưu thông tin bài hát đang phát vào route.params
        navigation.navigate('listPlay', {
          currentSong: {
            id: id,
            name: name,
            singer: singer,
            image: image,
            duration: duration,
            url: url
          }
        });
        audioContext.setAudioURL(audioURL);
        audioContext.setIsPlaying(isPlaying);
      };
    return (
        <View style={styles.view1}>
            <TouchableOpacity style={styles.header} onPress = {handleDownButtonPress}>
                  <AntDesign name="down" size={30} color="black" />   
            </TouchableOpacity>

            <Image
                resizeMode="contain"
                source={
                    image
                }
                style={styles.image3}
            />
            <View style={styles.view7}>
                <TouchableOpacity onPress={() => (
                    setColorLike("black"),
                    setColorDislike("blue")
                )}>
                     <AntDesign name="dislike2" size={24} color= {colorDislike} />   
                </TouchableOpacity>
               
                <View style={styles.image5}>
                    <Text style={styles.text1}>{name}</Text>
                    <Text style={styles.text2}>{singer}</Text>
                </View>
                {/*  */}
               
                <TouchableOpacity onPress={() => (
                    setColorLike("blue"),
                    setColorDislike("black")
                )}>
                      <AntDesign name="like2" size={24} color={colorLike} />
                </TouchableOpacity>
            </View>
            <View style={styles.view8}>
                <View style={styles.view9}>
                    <Image
                        resizeMode="contain"
                        source={{
                            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/99be1b58-4b65-451b-bd29-2da65737a020?apiKey=6861cb893c484cb8bc5ad74d90012a87&",
                        }}
                        style={styles.image7}
                    />

                </View>

            </View>
          
            <View style={styles.audioBar}>
           
            <Slider
                
                style={{ width: '100%', height: 40 }}
                minimumValue={0}
                maximumValue={duration}
                value={playedTime} // Thay đổi từ currentPosition sang playedTime
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

            <View style={styles.options}>
                <AntDesign name="forward" size={30} color="black" />
                <AntDesign name="stepbackward" size={30} color="black" onPress={handlePrevSong} />
                <AntDesign
                    name={isPlaying ? "pausecircleo" : "playcircleo"}
                    size={60}
                    color="black"
                    onPress={handlePlayPause}
                />
                <AntDesign name="stepforward" size={30} color="black" onPress={handleNextSong} />
                <AntDesign name="retweet" size={30} color="black" />
            </View>

            <View style={styles.view12}>
                <View style={styles.view13}>
                    <View style={styles.view14}>
                        <Text>Up Next</Text>
                    </View>
                    <View style={styles.view16}>
                        <Text>Lyrics</Text>
                    </View>
                    <View style={styles.view17}>
                        <Text>Related</Text>
                    </View>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    view1: {
        backgroundColor: "#fff",
        display: "flex",
        width: '100%',
        flexDirection: "column",
    },
    header: {
        alignSelf: "center",
        display: "flex",
        marginTop: 33,
        width: 360,
        maxWidth: "100%",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 20,
        padding: "0 20px",
        flexDirection: 'row',

    },
    view2: {
        alignSelf: "center",
        display: "flex",
        marginTop: 14,
        width: 364,
        maxWidth: "100%",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 20,
        padding: "0 20px",
    },
    view3: {
        color: "#1D1B20",
        fontVariantNumeric: "lining-nums proportional-nums",
        fontFeatureSettings: "'dlig' on, 'ss02' on",
        letterSpacing: 0.14,
        alignSelf: "center",
        margin: "auto 0",
        font: "500 14px/143% Roboto, sans-serif ",
    },
    image1: {
        fill: "#1D1B20",
        overflow: "hidden",
        alignSelf: "stretch",
        position: "relative",
        display: "flex",
        width: 24,
        maxWidth: "100%",
        flexDirection: "column",
        aspectRatio: "1",
    },
    image2: {
        overflow: "hidden",
        alignSelf: "center",
        position: "relative",
        display: "flex",
        width: 46,
        maxWidth: "100%",
        flexDirection: "column",
        margin: "auto 0",
        aspectRatio: "2.71",
    },
    view4: {
        alignSelf: "center",
        display: "flex",
        marginTop: 34,
        width: 156,
        maxWidth: "100%",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 20,
        padding: "0 20px",
        flexDirection: 'row',
    },
    view5: {
        color: "#000",
        alignSelf: "stretch",
        whiteSpace: "nowrap",
        borderRadius: 32.5,
        backgroundColor: "rgba(0, 0, 0, 0.07)",
        width: 91,
        maxWidth: "100%",
        padding: "11px 28px 11px 26px",
        font: "500 17px/127% Product Sans Medium, sans-serif ",
    },
    view6: {
        color: "#000",
        alignSelf: "center",
        whiteSpace: "nowrap",
        margin: "auto 0",
        font: "400 17px/127% Product Sans, sans-serif ",
    },
    image3: {
        overflow: "hidden",
        alignSelf: "center",
        position: "relative",
        display: "flex",
        marginTop: 34,
        width: 380,
        maxWidth: "100%",
        flexDirection: "column",
        aspectRatio: "1",
        height: 300
    },
    view7: {
        alignSelf: "center",
        display: "flex",
        marginTop: 33,
        width: 360,
        maxWidth: "100%",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 20,
        padding: "0 20px",
        flexDirection: 'row',
    },
    image4: {
        overflow: "hidden",
        alignSelf: "start",
        position: "relative",
        display: "flex",
        width: 26,
        maxWidth: "100%",
        flexDirection: "column",
        aspectRatio: "1",
    },
    image5: {
        justifyContent: "center",
        alignItems: "center",
    },
    text1: {
        color: "#000",
        alignSelf: "center",
        whiteSpace: "nowrap",
        margin: "auto 0",
        fontWeight: "bold", // Ví dụ: đặt fontWeight là bold
        fontSize: 18, // Ví dụ: đặt fontSize là 18
        // Các thuộc tính style khác
    },
    text2: {
        color: "gray",
        alignSelf: "center",
        whiteSpace: "nowrap",
        margin: "auto 0",
        fontWeight: "bold", // Ví dụ: đặt fontWeight là bold
        fontSize: 18, // Ví dụ: đặt fontSize là 18
        // Các thuộc tính style khác
    },
    image6: {
        overflow: "hidden",
        alignSelf: "start",
        position: "relative",
        display: "flex",
        width: 26,
        maxWidth: "100%",
        flexDirection: "column",
        aspectRatio: "1",
    },
    view8: {
        alignSelf: "center",
        display: "flex",
        marginTop: 30,
        width: 358,
        maxWidth: "100%",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 20,
        padding: "0 20px",
        flexDirection: 'row',
    },
    view9: { alignSelf: "end", display: "flex", flexDirection: "column" },
    image7: {
        overflow: "hidden",
        alignSelf: "stretch",
        position: "relative",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        aspectRatio: "6.29",
    },
    view10: {
        color: "#000",
        alignSelf: "stretch",
        whiteSpace: "nowrap",
        font: "500 13px/127% Product Sans Medium, sans-serif ",
    },
    view11: {
        color: "#000",
        alignSelf: "end",
        marginTop: 20,
        whiteSpace: "nowrap",
        font: "500 13px/127% Product Sans Medium, sans-serif ",
    },
    image8: {
        overflow: "hidden",
        alignSelf: "center",
        position: "relative",
        display: "flex",
        marginTop: 39,
        width: 317,
        maxWidth: "100%",
        flexDirection: "column",
        aspectRatio: "4.53",
    },
    view12: {
        borderRadius: "20px 20px 0px 0px",
        background:
            "linear-gradient(180deg, rgba(255, 233, 244, 0.62) 0%, #FFF 100%)",
        alignSelf: "stretch",
        marginTop: 21,
        width: "100%",
        flexGrow: "1",
        flexDirection: "row",
        padding: "16px 43px 10px 41px",
        justifyContent: "space-between",
    },
    view13: {
        alignSelf: "stretch",
        display: "flex",
        width: "100%",
        justifyContent: "space-around",
        gap: 20,
        flexDirection: 'row',
    },
    view14: {
        color: "#49454F",
        textAlign: "center",
        marginTop: 24,
        font: "400 18px/89% Product Sans, sans-serif ",

    },
    view15: { alignSelf: "end", display: "flex", flexDirection: "column" },
    image9: {
        strokeWidth: 4,
        stroke: "rgba(0, 0, 0, 0.40)",
        overflow: "hidden",
        alignSelf: "stretch",
        position: "relative",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        aspectRatio: "11",
    },
    view16: {
        color: "#49454F",
        textAlign: "center",
        alignSelf: "stretch",
        marginTop: 20,
        font: "400 18px/89% Product Sans, sans-serif ",
    },
    view17: {
        color: "#49454F",
        textAlign: "center",
        marginTop: 24,
        font: "400 18px/89% Product Sans, sans-serif ",
    },
    image10: {
        strokeWidth: 4,
        stroke: "#000",
        overflow: "hidden",
        alignSelf: "center",
        position: "relative",
        display: "flex",
        marginTop: 29,
        width: 110,
        maxWidth: "100%",
        flexDirection: "column",
        aspectRatio: "27.5",
    },
    options: {
        alignSelf: "center",
        display: "flex",
        marginTop: 10,
        width: 360,
        maxWidth: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        padding: "0 20px",
        flexDirection: 'row',
    },
    audioBar: {
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
export default MyComponent; 