import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize';


export const Container = styled.View`

`;

export const Content = styled.View`
    padding: 125px 24px;
`;
export const Header = styled.View`
    width: 100%;
    align-items: center
    height: ${RFValue(65)}px;
`;

export const Title = styled.Text`
    position: absolute;
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: ${RFValue(30)}px;
    margin-bottom: 55px;
`;

export const WrapeIcons  = styled.View`
    width: 100%;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    position: absolute;
    margin-top: 60px;
    padding: 0 24px;
`;

export const Form = styled.View`
    justify-content: space-between;
    width: 100%;

`;

export const Fields = styled.View`
    margin-bottom: 170px;
`;
