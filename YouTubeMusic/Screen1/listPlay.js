import React from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
function listPlay(){
    return(
        <View style = {styles.container}>
          <View style = {styles.View1}>
            <View style = {styles.Img_Style}>
                    <Image style = {styles.img_name_list} source = {require('../img/Song1.png')} ></Image>
                    <Image style = {styles.img_name_list} source = {require('../img/Song1.png')} ></Image>
                    <Image style = {styles.img_name_list} source = {require('../img/Song1.png')} ></Image>
                    <Image style = {styles.img_name_list} source = {require('../img/Song1.png')} ></Image>
            </View>
            <View style = {styles.Text_Style}>
                <Text style = {styles.nameList}>Việt Suy</Text>
                <Text style = {styles.subTextlist}>Danh sách phát</Text>
                <Text style = {styles.subTextlist} >30 N lượt xem - 28 bản nhạc</Text>
            </View>
          </View>
          <View style = {styles.buttom_Style}>
                <View style = {styles.butomNext}> 
                    <AntDesign name="swap" size={24} color="#000" />
                    <Text style = {styles.text_bottomNext}>Trộn bài</Text>           
                </View>
                <View style = {styles.buttomAdd_Style}>
                    <MaterialIcons name="add-to-photos" size={24} color="#fff" />
                    <Text style = {styles.textAdd_Style}>Lưu vào thư viện</Text>
                </View>
                <Ionicons name="ellipsis-vertical-sharp" size={24} color="#fff" />
          </View>
           
        </View>
    )
}
export default listPlay;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      
    },
    View1:{
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
    nameList:{
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 30,
    },
    subTextlist:{
        color: '#FFFFFFB3',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    butomNext:{
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent:'space-around',
        width: 120,
        height: 35,
        alignItems: 'center',
        borderRadius: 30,
    },
    text_bottomNext:{
        color: '#000',
        fontSize: 15,
        fontWeight: 600,
    },
    buttom_Style:{
        width: '100%',
        height: 80,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttomAdd_Style:{
        flexDirection: 'row',
        justifyContent:'space-around',
        width: 200,
        height: 35,
        alignItems: 'center',
        borderRadius: 30,
        borderWidth: '0.5px',
        borderColor: '#fff',
    },
    textAdd_Style:{
        color: '#fff',
        fontSize: 15,
        fontWeight: 600,
    }
})