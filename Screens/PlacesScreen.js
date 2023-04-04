import { View, Text, Button, StyleSheet, Pressable } from "react-native";
import * as React from 'react';
import { useQuery } from "@apollo/client";
import placesQuery from "../apollo/placesQuery";

export default function PlacesScreen ({ navigation }) {
  console.log('in place')
  const { data, loading, error } = useQuery(placesQuery);
  if (loading) return (<Text>'Loading'</Text>);
  if (error) return (<Text>`Error ${error.message}`</Text>);

  return (
    <View>

      <Text>List:</Text>
      {data.places.data.map(item => {
        return (
            <Pressable
              key={item.id}
              style={styles.button}
              onPress={() => navigation.navigate('InspectPlace', {placeId: item.id})}
            >
              <Text>{item.attributes.title}</Text>
            </Pressable>
        )
      })}

      <Button
        title="Create place"
        onPress={() => navigation.navigate('CreatePlace')}
      />
      
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#44DD88",
    color: "white",
    borderColor: "black",
    marginBottom:4,
    padding: 4,
    width: 160,
    borderRadius: 4
  },
});