import { Alert, Button, Text, View } from "react-native";

export default function CountButton() {

  function testButton(){
    Alert.alert('Un test d\'alert')
  }

  return (
    <View>
      <Text>Du text</Text>
      <Button
        onPress={testButton}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
      
  );
}