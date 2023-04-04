import { Button, Text, View } from "react-native";
import { useUserStore } from '../lib/store/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {

  const { connected, setConnected } = useUserStore();
  console.log('connected:', connected)
  

  async function handleLogout() {
    try {
      await AsyncStorage.removeItem('@accessToken');
      const token = await AsyncStorage.getItem('@accessToken')
      console.log('disconnected')
      setConnected(false);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {connected == true && (<Text>connected</Text>)}
      {!connected && (<Text>not connected</Text>)}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {!connected &&(
          <>
            <Button
              title="Login"
              onPress={() => navigation.navigate('Login')}
            />
            <Button
              title="Register"
              onPress={() => navigation.navigate('Register')}
            />
          </>
        )}
        {connected == true &&(
          <Button
            title="Places"
            onPress={() => navigation.navigate('Places')}
          />
        )}
      </View>

      <View>
      {connected == true && (
        <Button
          title="Logout"
          onPress={handleLogout}
        />
      )}
      </View>
    </>
  );
}