import * as React from 'react';
import { Text, TextInput, View } from "react-native";

export default function RegisterScreen() {
  const [username,setUsername] = React.useState('');
  const [email,setEmail] = React.useState('');
  const [password,setPassword] = React.useState('');
  
  return (
    <View>
      <Text>Login:</Text>
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
      
    </View>
  );
}