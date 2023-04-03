import { useMutation } from '@apollo/client';
import * as React from 'react';
import { Button, Text, TextInput, View } from "react-native";
import loginMutation from '../apollo/loginMutation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [username,setUsername] = React.useState('');
  const [password,setPassword] = React.useState('');
  const [login, { data, loading, error}] = useMutation(loginMutation);

  async function handleSubmit() {
    try {
      let resp = await login({
        variables: { 
          input: {identifier: username, password: password} 
        } 
      });
      
      await AsyncStorage.setItem('@accessToken', resp.data.login.jwt);
      /*
      const key = await AsyncStorage.getItem('@accessToken')
      console.log(key)
      */
      
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