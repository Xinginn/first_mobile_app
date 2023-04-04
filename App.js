import * as React from 'react';

import { StyleSheet, Text, View, Button} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import PlacesScreen from './Screens/PlacesScreen';
import CreatePlaceScreen from './Screens/CreatePlaceScreen';
import { useEffect } from 'react/cjs/react.development';
import { useUserStore } from './lib/store/user';
import HomeScreen from './Screens/HomeScreen';
import InspectPlaceScreen from './Screens/InspectPlaceScreen';


const httpLink = createHttpLink({
  uri: 'https://digitalcampus.nerdy-bear.com/graphql',
});

const authLink = setContext( async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem('@accessToken')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


const Stack = createNativeStackNavigator();
const Loader = () => <Text>Loading...</Text>;

export default function App() {
	const [connected, setConnected] = React.useState(undefined);
  const { connected: connectedStore } = useUserStore();

	useEffect(() => {
		async function checkToken() {
			const token = await AsyncStorage.getItem('@accessToken');
			if (!token) return setConnected(false);

			return setConnected(true);
		}

		checkToken();
	}, [connectedStore]);


  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        
        <Stack.Navigator>
          {!connected && (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
          )}
          {connected == true && (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Places" component={PlacesScreen} />
              <Stack.Screen name="InspectPlace" component={InspectPlaceScreen} />
              <Stack.Screen name="CreatePlace" component={CreatePlaceScreen} />
            </>
          )}
        </Stack.Navigator>

      </NavigationContainer>
    </ApolloProvider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a8f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  red: {
    color: "red",
  }
});
