import { View, Text, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { useQuery } from "@apollo/client";
import placesQuery from "../apollo/placesQuery";

export default function PlacesScreen ({ navigation }) {
  
  const { data, loading, error } = useQuery(placesQuery);
  if (loading) return (<Text>'Loading'</Text>);
  if (error) return (<Text>`Error ${error.message}`</Text>);

  async function handleLogout() {
    try {
      await AsyncStorage.removeItem('@accessToken');
      const token = await AsyncStorage.getItem('@accessToken')
      console.log(token)
      navigation.navigate('Home');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View>
      <Button
        title="Create place"
        onPress={() => navigation.navigate('CreatePlace')}
      />
      <Text>List:</Text>
      {data.places.data.map(item => {
        return (
          <>
            <Text>{item.attributes.title}</Text>
          </>
        )
      })}
      <Button
        title="Logout"
        onPress={handleLogout}
      />
      
    </View>


  )
}