import React, { useState } from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const ProductImageHandler = (props) => {
  const [image, setImage] = useState();

 

  const imageHandler = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!permission) {
      return;
    }
    const imgFile = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.8 });
    setImage(imgFile.uri);
    props.onImageTaken(imgFile.uri);
  };

  return (
    <View style={{
      borderWidth: 1, width: 150, height: 150, borderColor: 'gray', borderRadius: 5, alignItems: 'center', justifyContent: 'center',alignSelf:'center'
    }}
    >
      {!image ? <MaterialIcons name="photo-library" size={30} color="black" onPress={imageHandler} /> : <Image style={{ height: '100%', width: '100%' }} resizeMode='contain' source={{ uri: image }} />}
    </View>
  );
};

export default ProductImageHandler;