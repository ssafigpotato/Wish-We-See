import { View } from 'react-native';
import styled from 'styled-components/native';

const TextTest = styled.Text`
  color: ${(props) => props.theme.colors.lightBlue};
  font-family: ${(props) => props.theme.fonts.PretendardBold};
  font-size: 30px;
`

export default function HomeScreen() {
  return (
    <View>
      <TextTest>홈입니다.</TextTest>
    </View>
  );
}
