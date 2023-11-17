import React, { useState, useEffect } from "react";
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
let sound;
const MyComponent = ({route,navigation}) => {
    const [colorLike, setColorLike] = React.useState('blue');
    const [name, setName] = React.useState("");
    const [singer, setSinger] = React.useState("");
    const [image, setImage] = React.useState("");
    const [duration, setDuration] = React.useState("");
    const [url, setUrl] = React.useState("");
    React.useEffect(()=>{
        const {name, singer, image, duration, url} = route.params;
        setName(name);
        setSinger(singer);
        setImage(image);
        setDuration(duration);
        setUrl(url);

    }
    ,[])
    useEffect(() => {
        if (route.params && route.params.url) {
          setUrl(route.params.url);
          playAudio(route.params.url);
        }
      }, [route.params?.url]);
     
      const playAudio = async (audioPath) => {
        try {
          if (sound) {
            await sound.unloadAsync(); // Ngừng audio trước khi phát audio mới
          }
      
          const { sound: newSound } = await Audio.Sound.createAsync({ uri: url });
          sound = newSound; // Lưu trữ audio mới
          sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
          await sound.playAsync();
        } catch (error) {
          console.log('Error loading sound: ', error);
        }
      };
      
      // Thêm useEffect để release resource khi component bị unmount
      useEffect(() => {
        return () => {
          if (sound) {
            sound.unloadAsync();
          }
        };
      }, []);
      const handlePlayWithoutPress = () => {
        if (url) {
          playAudio(url);
        }
      };
      const [sound, setSound] = useState(null);

  useEffect(() => {
    const { name, singer, image, duration, url } = route.params;
    
    const playAudio = async () => {
      try {
        const { sound: newSound } = await Audio.Sound.createAsync({ uri: url });
        setSound(newSound);
        await newSound.playAsync();
      } catch (error) {
        console.log('Error loading sound: ', error);
      }
    };

    playAudio();

    // Unload sound khi component bị unmount
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [route.params]);
    return (
        <View style={styles.view1}>
            <View style = {styles.header}>
                    <View style={styles.view5}>
                        <Text>Song</Text>
                    </View>
                    <View style={styles.view6}>
                        <Text>Video</Text>
                    </View>
            </View>
            
            <Image
                resizeMode="contain"
                source={
                    image
                }
                style={styles.image3}
            />
            <View style={styles.view7}>
            <AntDesign name="dislike2" size={24} color="black" />
                <View style={styles.image5}>
                    <Text style = {styles.text1}>{name}</Text>
                    <Text style = {styles.text2}>{singer}</Text>
                </View>
                {/*  */}
                <AntDesign name="like2" size={24} color="black" />
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
                    <View style={styles.view10}>
                        <Text>0:35</Text>
                    </View>
                </View>
                <View style={styles.view11}>
                    <Text>3:03</Text>
                </View>
            </View>
            <View style = {styles.options}>
                <AntDesign name="forward" size={30} color="black" />
                <AntDesign name="stepbackward" size={30} color="black" />
                <AntDesign name="playcircleo" size={60} color="black" onPress={handlePlayWithoutPress}/>
                <AntDesign name="stepforward" size={30} color="black" />
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
        backgroundColor: "#FFF",
        display: "flex",
        width: '100%',
        flexDirection: "column",
    },
    header: {
        alignSelf: "center",
        display: "flex",
        marginTop: 15,
        width: 156,
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
        width: 359,
        maxWidth: "100%",
        flexDirection: "column",
        aspectRatio: "1",
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
    text2:{
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
});
export default MyComponent;

