import { View, Text, Button, StyleSheet, Pressable, ScrollView } from "react-native";
import * as React from 'react';
import { useMutation, useQuery } from "@apollo/client";
import placesQuery from "../apollo/placesQuery";
import deletePlaceMutation from "../apollo/deletePlaceMutation";

export default function PlacesScreen ({ navigation }) {

  const [destroyPlace] = useMutation(deletePlaceMutation, {refetchQueries: [placesQuery]});

  const { data, loading, error } = useQuery(placesQuery);
  if (loading) return (<Text>'Loading'</Text>);
  if (error) return (<Text>`Error ${error.message}`</Text>);

  async function handleDelete(id){
    try {
      let resp = await destroyPlace({
        variables: {
          id
        } 
      });
      //navigation.navigate('Places');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ScrollView>

      <Text>List:</Text>

      {data.places.data.map(item => {
        return (
          <View key={item.id} style={styles.placeItem} >
            <Pressable
              style={styles.placeButton}
              onPress={() => navigation.navigate('InspectPlace', {data: item})}
            >
              <Text style={styles.whiteText}>{item.attributes.title}</Text>
            </Pressable>
            <Pressable 
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={{color: "red"}}> X </Text>
            </Pressable>
          </View>
        )
      })}

      <Button
        title="Create place"
        onPress={() => navigation.navigate('CreatePlace')}
      />
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  placeItem: {
    display: "flex",
    flexDirection: "row"
  },  
  placeButton: {
    backgroundColor: "#44DD88",
    color: "white",
    borderColor: "green",
    marginBottom:4,
    padding: 4,
    width: 240,
    borderWidth: 2,
    borderRadius: 4
  },
  deleteButton: {
    backgroundColor: "#DD444455",
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 4,
    width: 30,
    height: 30,
    marginLeft: 100,
    display: "flex",
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center'
  },
  whiteText: {
    color: "white",
    textAlign: "center"
  }
});