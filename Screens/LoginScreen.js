import * as React from 'react';
import { Alert, Button, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const [username,setUsername] = React.useState('');
  const [password,setPassword] = React.useState('');
  
  function handleSubmit() {
    Alert.alert(username, password)
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