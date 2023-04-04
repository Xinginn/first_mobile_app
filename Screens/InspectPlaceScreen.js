import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import * as React from 'react';
import { useQuery } from "@apollo/client";
import placeQuery from "../apollo/placeQuery";

export default function InspectPlaceScreen ({ route }) {
  const placeId = parseInt(route.params.placeId);
  
  const { data, loading, error } = useQuery(placeQuery, {variables: { id: placeId}});
  if (loading) return (<Text>'Loading'</Text>);
  if (error) return (<Text>`Error ${error.message}`</Text>);

  
  const [title,setTitle] = React.useState('');
  const [address,setAddress] = React.useState('');
  const [latitude,setLatitude] = React.useState('0');
  const [longitude,setLongitude] = React.useState('0');
  

  function handleSubmit(){
    return
  }

  return (
    <View>

      <Text>Edit Place # {placeId}</Text>
      <Text>{JSON.stringify(data.place.data.attributes.title)}</Text>

      <Button
        title="Submit"
        onPress={handleSubmit}
      />


    </View>
  )
}
