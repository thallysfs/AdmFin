import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'


export const Container = styled.View`
    padding: 0 24px;
    background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
    align-items: center;
    margin-top: 106px;
`;

export const Form = styled.View`
  width: 100%;
  margin: 64px 0;
  align-items: center;
  margin-top:109px;

`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: ${RFValue(30)}px;
  margin-bottom: 55px;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
