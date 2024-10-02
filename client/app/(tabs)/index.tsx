import { View, Text } from "react-native";
import VoiceComponent from "@/components/Voice";
import TestComponent from "@/components/TestComponent";
// import LocationComponent from "@/components/Location";

export default function HomeScreen() {
  return (
    <View>
      <Text>홈입니다.?</Text>
      <VoiceComponent />
      <TestComponent />
      {/* <LocationComponent /> */}
    </View>
  );
}
