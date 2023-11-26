import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const PlayList = ({ visible, onClose, playListt, setSong }) => {
  const playList = {
    id: 1,
    title: "Happy vibes",
    image:
      "https://th.bing.com/th/id/OIP.HAyqbpwQoYcw6v06W0eApAHaHa?rs=1&pid=ImgDetMain",
    songs: [
      {
        id: 1,
        title: "json-server",
        name: "Ngày mai người ta lấy chồng",
        duration: "6:02",
        singer: "Thành Đạt",
        image:
          "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/f/9/3/9/f9390ab7a26adbe59739fe2ba9470ee1.jpg",
        mp3: "https://res.cloudinary.com/djkmqg6tr/video/upload/v1700206941/NG%C3%80Y_MAI_NG%C6%AF%E1%BB%9CI_TA_L%E1%BA%A4Y_CH%E1%BB%92NG_-_TH%C3%80NH_%C4%90%E1%BA%A0T_x_%C4%90%C3%94NG_THI%C3%8AN_%C4%90%E1%BB%A8C___OFFICIAL_MV___Ng%C3%A0y_H%C3%B4m_%E1%BA%A4y_Em_%C4%90i_Trong_M%C6%B0a_1_kjq78y.mp4",
        genres: ["Energy", "Sad", "Romantic", "Sleep"],
      },
      {
        id: 2,
        title: "json-server",
        name: "Đông kiếm em",
        duration: "4:07",
        singer: "Vũ",
        image:
          "https://s.mxmcdn.net/images-storage/albums4/7/2/0/0/8/3/38380027_350_350.jpg",
        mp3: "https://res.cloudinary.com/djkmqg6tr/video/upload/v1700304864/DongKiemEmGuitarVersion-VuHienRau-5840952_i1dyar.mp3",

        genres: ["Relax", "Happy", "Exercise"],
      },
      {
        id: 3,
        title: "json-server",
        name: "Răng Khôn",
        duration: "3:52",
        singer: "Phí Phương Anh, RIN9",
        image:
          "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/b/7/b/5/b7b5b99e4aa374702ce8ee64858a9bbb.jpg",
        mp3: "https://res.cloudinary.com/djkmqg6tr/video/upload/v1700303532/RangKhon-PhiPhuongAnhTheFaceRIN9-7006388_d8f3pd.mp3",
        genres: ["Relax", "Party", "Concentrate"],
      },
    ],
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="none"
        transparent={false}
        visible={visible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="arrow-back-outline" size={26} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default PlayList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    height: "100%",
    backgroundColor: "#222222",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
});
