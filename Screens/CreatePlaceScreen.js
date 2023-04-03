import * as React from 'react';
import { Button, Text, TextInput, View } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import createPlaceMutation from '../apollo/createPlaceMutation';
import { useMutation } from '@apollo/client';

export default function CreatePlaceScreen({ navigation }) {
  const [title,setTitle] = React.useState('');
  const [address,setAddress] = React.useState('');
  const [latitude,setLatitude] = React.useState('0');
  const [longitude,setLongitude] = React.useState('0');

  const [postPlace, { data, loading, error}] = useMutation(createPlaceMutation);
  
  async function handleSubmit() {
    try {
      
      let resp = await postPlace({
        variables: { 
          data: {
            title,
            address,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          } 
        } 
      });
      navigation.navigate('Places');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View>
      <Text>Create Place</Text>
      <TextInput
        onChangeText={setTitle}
        value={title}
        placeholder="title"
      />
      <TextInput
        onChangeText={setAddress}
        value={address}
        placeholder="address"
      />
      <TextInput
        onChangeText={setLatitude}
        keyboardType = 'numeric'
        value={latitude}
        placeholder="latitude"
      />
      <TextInput
        onChangeText={setLongitude}
        keyboardType = 'numeric'
        value={longitude}
        placeholder="longitude"
      />
      <Button
        title="Submit"
        onPress={handleSubmit}
      />
    </View>
  );

}