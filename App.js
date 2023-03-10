import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CountButton from './components/CountButton';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text style={styles.red}>Open up App.js to start working on your app!</Text>
      <CountButton/>
      <StatusBar style="auto" />
    </View>
  );
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
