import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import * as React from 'react';
import { useMutation, useQuery } from "@apollo/client";
//import placeQuery from "../apollo/placeQuery";
import updatePlaceMutation from "../apollo/updatePlaceMutation";
import placesQuery from "../apollo/placesQuery";

export default function InspectPlaceScreen ({ route, navigation }) {
  const placeData = route.params.data;

  const [title,setTitle] = React.useState(placeData.attributes.title);
  const [address,setAddress] = React.useState(placeData.attributes.address);
  const [latitude,setLatitude] = React.useState(placeData.attributes.latitude.toString());
  const [longitude,setLongitude] = React.useState(placeData.attributes.longitude.toString());

  const [patchPlace] = useMutation(updatePlaceMutation, {refetchQueries: [placesQuery]});

  async function handleSubmit(){
    try {
      let resp = await patchPlace({
        variables: {
          id: placeData.id,
          data: {
            title,
            address,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          },
        } 
      });
      navigation.navigate('Places');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View>

      <Text>Edit Place - {placeData.attributes.title}</Text>


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
        title="Update"
        onPress={handleSubmit}
      />


    </View>
  )
}
