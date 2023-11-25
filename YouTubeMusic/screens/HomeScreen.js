import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import FilterCard from "../components/FilterCard";
import ListenAgain from "../components/ListenAgain";
import MixedCard from "../components/MixedCard";
import FilterSong from "../components/FilterSong";
import { Avatar } from "react-native-paper";
import MagnifyModal from "../components/MagnifyModal";
import { useSong } from "../components/SongContext";
export default function HomeScreen() {
  const filter_list = [
    "Energy",
    "Relax",
    "Happy",
    "Exercise",
    "Party",
    "Concentrate",
    "Sad",
    "Romantic",
    "Sleep",
  ];
  const [filter, setFilter] = useState("");
  // listen again
  const [songs, setSongs] = useState([]);
  const [visible, setVisible] = useState(false);
  const [songForYou, setSongForYou] = useState([]);
  const numColumns = 6;
  const{setSelectedSong}=useSong();
  const handleSongSelect = (song) => {
    setSelectedSong(song);
  };
  useEffect(() => {
    fetch("http://localhost:3000/song")
      .then((response) => response.json())
      .then((json) => {
        setSongs(json);
      });
  }, []);
  useEffect(onFilter, [filter]);
  function onFilter() {
    var list = songs.filter((item) => item.genres.includes(filter));
    if (list.length > 12) list = list.slice(0, 12);
    else if (list.length > 9) list = list.slice(0, 9);
    else if (list.length > 6) list = list.slice(0, 6);
    else if (list.length > 3) list = list.slice(0, 3);
    setSongForYou(list);
  }
  const [mixed, setMixed] = useState([
    { id: 1, name: "Pink Ponk", img: "image 1.png" },
    { id: 2, name: "Pink Ponk", img: "image 1.png" },
    { id: 3, name: "Pink Ponk", img: "image 1.png" },
    { id: 4, name: "Pink Ponk", img: "image 1.png" },
    { id: 5, name: "Pink Ponk", img: "image 1.png" },
    { id: 6, name: "Pink Ponk", img: "image 1.png" },
  ]);
  return (
    <LinearGradient
      colors={["#72374E", "#603772", "#0E0E0E"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0, 0.01, 0.6]}
      style={{ flex: 1 }}
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            height: 64,
            paddingLeft: 16,
            alignItems: "center",
          }}
        >
          <View>
            <Image
              source={require("../img/YMusicLogo.svg")}
              style={{
                height: 24,
                width: 80,
                resizeMode: "contain",
              }}
            ></Image>
          </View>
          <View
            style={{
              width: 244,
              paddingRight: 30,
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity
              style={{ alignItems: "flex-end" }}
              onPress={() => setVisible(true)}
            >
              <Image
                source={require("../img/search.png")}
                style={{ width: 30, height: 30 }}
              ></Image>
            </TouchableOpacity>
          </View>
          <View style={{ width: 54, paddingRight: 20 }}>
            <TouchableOpacity
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Avatar.Image size={26} source={require("../img/avt.png")} />
            </TouchableOpacity>
          </View>
        </View>
{/* filter */}
        <ScrollView horizontal={true} showsVerticalScrollIndicator>
          {filter_list.map((item) => (
            <FilterCard
              item={item}
              onFilter={() => setFilter(item)}
              
              key={item}
            />
          ))}
        </ScrollView>
      </View>
      <ScrollView style={{marginBottom:55}}>
        <View>
          <Text
            style={{
              fontSize: 24,
              fontStyle: "roboto",
              color: "white",
              fontWeight: "bold",
              marginLeft: 16,
            }}
          >
            {filter}
          </Text>
{/* filter list  */}
            <FilterSong items={songForYou}/>
        </View>
{/* listen again */}
        <Text
          style={{
            fontSize: 24,
            fontStyle: "roboto",
            color: "white",
            fontWeight: "bold",
            marginLeft: 16,
          }}
        >
          Listen again
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          directionalLockEnabled={true}
          alwaysBounceVertical={false}
        >
          <FlatList
            key={"#"}
            keyExtractor={(item) => "#" + item.id}
            contentContainerStyle={{ alignSelf: "flex-start" }}
            numColumns={numColumns}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={songs}
            renderItem={({ item, index }) => (
              <TouchableOpacity >
                   <ListenAgain item={item} key={index}/>
                  
              </TouchableOpacity>
             
             
            )}
          />
        </ScrollView>
{/* mixed for you */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: 24,
              fontStyle: "roboto",
              color: "white",
              fontWeight: "bold",
              marginLeft: 16,
            }}
          >
            Mixed for you
          </Text>
        </View>
        <FlatList
          horizontal
          numColumns={1}
          data={mixed}
          renderItem={({ item, index }) => (
            
            <MixedCard item={item} key={index} />
          )}
        ></FlatList>
      </ScrollView>
{/* magnify search */}
      <MagnifyModal visible={visible} onClose={() => setVisible(false)} />
    </LinearGradient>
  );
}
const styles = StyleSheet.create({});
