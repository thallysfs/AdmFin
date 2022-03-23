import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'


export const Container = styled.View`

`;

export const Header = styled.View`
    width: 100%;
    align-items: center
    height: ${RFValue(65)}px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: ${RFValue(30)}px;
    padding: 15px 25px;

`
// export const Content = styled.View`
//     padding: 0 24px;
// `;

export const Form = styled.View`
    justify-content: space-between;
    width: 100%;
    margin-top: 190px ;
    padding: 0 24px;

`;

export const Fields = styled.View`

`;

export const SelectItem = styled.View`
    flex: 1;
    backgroundColor: ${({ theme }) => theme.colors.background_secondary};
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
`;

