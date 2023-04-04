import { View, Text, Button } from "react-native";
import * as React from 'react';
import { useQuery } from "@apollo/client";
import placesQuery from "../apollo/placesQuery";

export default function PlacesScreen ({ navigation }) {
  
  const { data, loading, error } = useQuery(placesQuery);
  if (loading) return (<Text>'Loading'</Text>);
  if (error) return (<Text>`Error ${error.message}`</Text>);

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
      
    </View>


  )
}