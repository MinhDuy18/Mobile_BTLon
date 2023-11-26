import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSong } from './SongContext';
// import { AudioContext } from './AudioContext';
// import MiniPlay from './MiniPlay'
import PlayPageModal from './MiniPlayer';
import { Modal, ScrollView } from 'react-native-web';
const PlayList = ({route}) => {
   const albums = route.params.item;
   const playList =albums.songs;
   const { setSelectedSong } = useSong();
   function handleSongSelect(song) {
     setSelectedSong(song);
     console.log("handleSong id: " + song.id);
   }
   const handleRandomSong = () => {
        const randomIndex = Math.floor(Math.random() * playList.length);
        const randomSong = playList[randomIndex];
        handleSongSelect(randomSong);
}

    return (
        <ScrollView>
            <View style={styles.container}>
            <View style={styles.View1}>
                <View style={styles.Img_Style}>
                    <Image style={styles.img_name_list} source={playList[0].image} ></Image>
                    <Image style={styles.img_name_list} source={playList[1].image} ></Image>
                    <Image style={styles.img_name_list} source={playList[2].image} ></Image>
                    <Image style={styles.img_name_list} source={playList[3].image} ></Image>
                </View>
                <View style={styles.Text_Style}>
                    <Text style={styles.nameList}>{albums.title}</Text>
                    <Text style={styles.subTextlist}>Danh sách phát</Text>
                    <Text style={styles.subTextlist} >30 N lượt xem - 28 bản nhạc</Text>
                </View>
            </View>
            <View style={styles.buttom_Style}>
                <TouchableOpacity onPress={handleRandomSong}>
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
                <FlatList data={playList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {
                          // Lưu thông tin bài hát được chọn
                             handleSongSelect(item);
                          
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
export default PlayList;
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#000',
        height: 10000,

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
    }
})