import { useMutation } from '@apollo/client';
import * as React from 'react';
import { Button, Text, TextInput, View } from "react-native";
import loginMutation from '../apollo/loginMutation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserStore } from '../lib/store/user';

export default function LoginScreen({ navigation }) {
  const [username,setUsername] = React.useState('felix');
  const [password,setPassword] = React.useState('mouette');
  const [login, { data, loading, error}] = useMutation(loginMutation);
  const { setConnected } = useUserStore();

  async function handleSubmit() {
    try {
      let resp = await login({
        variables: { 
          input: {identifier: username, password: password} 
        } 
      });
      
      await AsyncStorage.setItem('@accessToken', resp.data.login.jwt);
      setConnected(true);

    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <View>
      <Text>Login:</Text>
      <TextInput
        onChangeText={setUsername}
        value={username}
        placeholder="username"
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="password"
      />
      <Button
        title="Submit"
        onPress={handleSubmit}
      />
    </View>
  );
}