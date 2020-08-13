import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  position: relative;
  /* align-items: center; */
  justify-content: center;

  padding: 0 30px ${Platform.OS === 'android' ? 120 : 40}px;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 32px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  text-align: left;
  margin: 24px 0;
`;

export const UserAvatarButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
`;
