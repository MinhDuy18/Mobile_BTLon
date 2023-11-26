

import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image , ScrollView} from 'react-native'
import React , {useState, useEffect}from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useSong } from '../components/SongContext';

const explorePage = () => {
  const [data, setData] = useState([]);
  const { setSelectedSong } = useSong();
  const handleSongSelect = (song) => {
    setSelectedSong(song);
    console.log(song);
    };
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
const dataToShow = data.slice(0, 4);
  return (
    <ScrollView>
      <View style = {styles.container}>
          <View style = {styles.ExploHeader}>
             <TouchableOpacity style = {styles.Explo}>
                  <Ionicons name="ios-musical-notes-outline" size={30} color="black" />
                  <Text style = {styles.text1}>Bản phát hành mới</Text>
             </TouchableOpacity>
             <TouchableOpacity style = {styles.Explo}>
             <FontAwesome name="line-chart" size={30} color="black" />
                  <Text style = {styles.text1}>Bảng xếp hạng</Text>
             </TouchableOpacity>
             <TouchableOpacity style = {styles.Explo}>
             <MaterialIcons name="insert-emoticon" size={30} color="black" />
                  <Text style = {styles.text1}>Tâm trạng và thể loại</Text>
             </TouchableOpacity>
          </View>
          <View style = {styles.MidBar}>
              <Text style = {styles.text1}>Bài hát hàng đầu</Text>
              <TouchableOpacity style = {styles.buttonXemThem}>
                  <Text style = {styles.text2}>Xem thêm</Text>
              </TouchableOpacity>
          </View>
           <View>
                      <FlatList data={dataToShow}
                          keyExtractor={(item) => item.id.toString()}
                          renderItem={({ item }) => (
                               <TouchableOpacity onPress={() => {
                                handleSongSelect(item);
                             
                                }}>
                                  <View style={styles.song_Style}>
                                      <Image style={styles.img_Song_Style} resizeMode='contain' source={item.image}></Image>
                                      <View style={styles.Resize_Text} >
                                          <Text style={styles.name_Song_Style}>{item.name}</Text>
                                          <View style={styles.sub_Song}>
                                              <Text style={styles.singer_Song_Style}>{item.singer}</Text>
                                               {/* <Text style={styles.duration_Song_Style}>{item.duration}</Text>  */}
                                          </View>
                                      </View>
                                      <Ionicons name="ellipsis-vertical-sharp" size={24} color="#fff" />
                                  </View>
                               </TouchableOpacity>
                          )}
                          initialNumToRender={4}
                          maxToRenderPerBatch={4}
                      >
                      </FlatList>
                  </View>
                  <View style = {styles.ViewTamTrang}>
                      <Text style = {styles.text1}>Tâm trạng và thể loại</Text>
                      <TouchableOpacity style = {styles.buttonXemThem}>
                          <Text style = {styles.text2}>Xem thêm</Text>
                      </TouchableOpacity>
                  </View>
      </View>
    </ScrollView>
  )
}

export default explorePage
const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center',
      backgroundColor:'black',
    },
    ExploHeader:{
      width:'100%',
     
      alignItems:'center',
    },
    Explo:{
      flexDirection:'row',
      width: "100%",
      height:50,
      backgroundColor:'grey',
      borderRadius:10,
      marginTop:10,
      marginBottom:10,
     paddingLeft:30,
      alignItems:'center',
     gap: 10
    },
    text1:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        marginLeft:10,
        marginTop:10,

    },
    text2:{
      color:'white',
      fontSize:10,
      fontWeight:'400',
      marginLeft:10,
      marginTop:10,

  },
    MidBar:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        height:80,
        marginTop:10,
        marginBottom:10,
        alignItems:'center',
    },
    buttonXemThem:{
        width:100,
        height:30,
        borderWidth:1,
        borderColor:'grey',
        borderRadius:10,
        marginRight:10,
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center'
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
  sub_Song: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
},
Resize_Text: {
    width: '60%',
    textAlign: 'left',
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
  ViewTamTrang: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Để căn giữa các phần tử theo chiều dọc
  },
  
})