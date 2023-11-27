import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image} from 'react-native';
import { useAccount } from '../components/AccountContext';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setAvatar}=useAccount();
  const accounts = [
    {
      username: 'admin',
      password: 'admin',
      avt:"https://thuthuattienich.com/wp-content/uploads/2017/06/anh-dai-dien-facebook-cho-meo-de-thuong-27.jpg",
    },
  
  ];
  const handleLogin = () => {
    const account = accounts.find(
      account => account.username === email && account.password === password
    );
    if (account === undefined) {
      alert('Sai tài khoản hoặc mật khẩu!');
    } else {
      setAvatar(account.avt);
      navigation.navigate('BottomTab');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' ,backgroundColor:'black'}}>
      <View style={{position:'absolute',top:80 ,width:'100%'}}>
        <Image source={require('../img/YMusicLogo.svg')} style={{witdh:120,height:60, resizeMode:'contain'}}></Image>
      </View>
      <View style = {{flexDirection: "row", justifyContent:"space-between", alignItems: "center"}}>
          <AntDesign name="user" size={30} color="#fff" style = {{marginRight:10}}/>
          <TextInput
            placeholder="Username"
            placeholderTextColor={'gray'}
            value={email}
            onChangeText={text => setEmail(text)}
            style={{ borderWidth: 1, borderColor: 'gray',borderRadius:5, width: 300, marginVertical: 10, padding: 5,color:'white' }}
      />
      </View>
      <View style = {{flexDirection: "row", justifyContent:"space-between", alignItems: "center", }}>
         <MaterialIcons name="lock" size={30} color="#fff" style = {{marginRight:10}} />
         <TextInput
        placeholder="Password"
        placeholderTextColor={'gray'}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
        style={{ borderWidth: 1, borderColor: 'gray',borderRadius:5 ,width: 300, marginVertical: 10, padding: 5 ,color:'white'}}
      />
      </View>
      
      <Button title="Đăng nhập" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
