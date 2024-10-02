import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {

    const router = useRouter();

  return (
    <View>
          <Text>Login</Text>
           <Button title="Go to 회원가입" onPress={() => router.push('/login/register')} />
    </View>
  );
}
