import { useMutation } from '@apollo/client';
import * as React from 'react';
import { Text, TextInput, View } from "react-native";
import { Button } from 'react-native';
import registerMutation from '../apollo/registerMutation';

export default function RegisterScreen() {
  const [username,setUsername] = React.useState('');
  const [email,setEmail] = React.useState('');
  const [password,setPassword] = React.useState('');
  const [register, {data, loading, error }] = useMutation(registerMutation);
  
  async function handleSubmit() {
    let resp = await register({
      variables: { 
        input: {
          username: username,
          email: email,
          password: password
        } 
      } 
    });
    console.log(resp)
    
  }

  return (
    <View>
      <Text>Register:</Text>
      <TextInput
        onChangeText={setUsername}
        value={username}
        placeholder="username"
      />
      <TextInput
        onChangeText={setEmail}
        value={email}
        placeholder="email"
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