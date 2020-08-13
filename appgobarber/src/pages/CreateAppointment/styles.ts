import styled, { css } from 'styled-components/native';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import { Provider } from '../Dashboard';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: 40px;
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
  margin-left: 16px;
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;

  margin-left: auto;
`;

export const Content = styled.ScrollView``;

export const ProvidersListContainer = styled.View`
  height: 112px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px;
`;

interface ProviderContainerProps {
  selected: boolean;
}

export const ProviderContainer = styled(RectButton)<ProviderContainerProps>`
  flex-direction: row;
  align-items: center;
  background: #3e3b47;
  padding: 8px 12px;
  margin-right: 16px;
  border-radius: 10px;

  ${props =>
    props.selected &&
    css`
      background: #ff9000;
    `}
`;

export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

interface ProviderNameProps {
  selected: boolean;
}

export const ProviderName = styled.Text<ProviderNameProps>`
  margin-left: 8px;
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: #f4ede8;

  ${props =>
    props.selected &&
    css`
      color: #232119;
    `}
`;

export const Calendar = styled.View``;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  font-size: 24px;
  margin: 0 24px 24px;
`;

export const OpenDayPickerButton = styled(RectButton)`
  height: 46px;
  background: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px;
`;

export const OpenDayPickerButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: #232129;
`;

export const Schedule = styled.View`
  padding: 24px 0 16px;
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  color: #999591;
  font-family: 'RobotoSlab-Regular';
  margin: 0 24px 12px;
`;

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 24 },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

interface HourProps {
  available: boolean;
  selected: boolean;
}

export const Hour = styled(RectButton)<HourProps>`
  padding: 12px;
  background: #3b3b47;
  border-radius: 10px;
  margin-right: 8px;

  ${props =>
    !props.available &&
    css`
      opacity: 0.3;
    `}
  ${props =>
    props.selected &&
    css`
      background: #ff9000;
    `}
`;

interface HourTextProps {
  selected: boolean;
}

export const HourText = styled.Text<HourTextProps>`
  color: #f4ede8;
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  ${props =>
    props.selected &&
    css`
      color: #232129;
    `}
`;

export const CreateAppointmentButton = styled(RectButton)`
  height: 50px;
  background: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px 24px;
`;

export const CreateAppointmentButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #232129;
`;
