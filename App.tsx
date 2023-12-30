import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function App() {
  const [selectedImage, setSelectedImage] = useState('');

  let options = {
    storageOptions:{
      path: 'image',
    }
  }
  const ImagePicker = () => {
    launchImageLibrary(options, response => {
      setSelectedImage(response.assets[0].uri)
    })
  }
  
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{height:400, width:'100%'}}>
        <Image style={{height:400, width:'100%'}} source={{uri:selectedImage}}/>
      </View>
    <TouchableOpacity style={styles.btn} onPress={() =>{
      ImagePicker()
    }}>
      <Text> Upload photo </Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn:{
    marginTop:20,
    height:50,
    width:'60%',
    backgroundColor: 'skyblue',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems:'center',
    alignSelf:'center'
  }
});
