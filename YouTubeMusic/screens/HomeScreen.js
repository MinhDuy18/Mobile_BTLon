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
import MagnifyModal from "../components/MagnifyModal";
import { useSong } from "../components/SongContext";
import Header from "../components/Header";
import PlayList from "../components/PlayList";
import { useAccount } from "../components/AccountContext";

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
  const [songs, setSongs] = useState([]);
  const [visibleModalSearch, setVisibleModalSearch] = useState(false);
  const[visibleModalPlaylist,setVisibleModalPlaylist]=useState(true);
  const [songForYou, setSongForYou] = useState([]);
  const [mixed, setMixed] = useState([]);
  const[playList,setPlayList]=useState({});
  const {avatar} = useAccount();
  const { setSelectedSong } = useSong();
  function handleSongSelect(song) {
    setSelectedSong(song);
  }


  useEffect(() => {
    fetch("http://localhost:3000/song")
      .then((response) => response.json())
      .then((json) => {
        setSongs(json);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:3001/albums")
      .then((response) => response.json())
      .then((json) => {
        setMixed(json);
      });
  },[]);
  useEffect(onFilter, [filter]);
  function onFilter() {
    var list = songs.filter((item) => item.genres.includes(filter));
    if (list.length > 12) list = list.slice(0, 12);
    else if (list.length > 9) list = list.slice(0, 9);
    else if (list.length > 6) list = list.slice(0, 6);
    else if (list.length > 3) list = list.slice(0, 3);
    setSongForYou(list);
  }
  return (
    <LinearGradient
      colors={["#72374E", "#603772", "#0E0E0E"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0, 0.01, 0.6]}
      style={{ flex: 1 }}
    >
      <View>
        <Header setVisileModalSearch={setVisibleModalSearch} avatar={avatar} />
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
      <ScrollView style={{ marginBottom: 55 }}>
        {/* filter list  */}
        <FilterSong
          items={songForYou}
          filter={filter}
          setSong={handleSongSelect}
        />

        {/* listen again */}
        <ListenAgain items={songs} setSong={handleSongSelect} />
        {/* mixed for you */}
       <MixedCard items={mixed} setPlayList={setPlayList} setVisible={setVisibleModalPlaylist}/>

      </ScrollView>
      {/* magnify search */}
      <MagnifyModal visible={visibleModalSearch} onClose={() => setVisibleModalSearch(false)} />
    </LinearGradient>
  );
}
const styles = StyleSheet.create({});
