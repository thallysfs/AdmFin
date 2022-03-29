import styled, {css} from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize';

interface Props{
    isFocused: boolean;
}

export const Container = styled.View`
    width: 100%
`;

export const Error = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) =>theme.fonts.primary_400};
    color: ${({ theme }) =>theme.colors.error}
    margin: 4px 0;
`;


