import React, { useState } from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const OfferImage = (props) => {
  const [image, setImage] = useState();

  const permissionsHandler = async () => {
    const permission = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    if (permission.status != 'granted') {
      Alert.alert('Camera Permission', 'Required Camera Permission Not Granted !', [{ text: 'Okay' }]);
      return false;
    }
    return true;
  };

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
      borderWidth: 1, width: 300, height: 250, borderColor: 'gray', borderRadius: 5, alignItems: 'center', justifyContent: 'center',alignSelf:'center'
    }}
    >
      {!image ? <MaterialIcons name="photo-library" size={30} color="black" onPress={imageHandler} /> : <Image style={{ height: '100%', width: '100%' }} resizeMode='cover' source={{ uri: image }} />}
    </View>
  );
};

export default OfferImage;