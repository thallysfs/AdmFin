import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native'

interface Props {
    isActive: boolean;
}


export const Container = styled.View`

`;

export const IconWrape = styled.View<Props>`
    background: ${({ theme }) => theme.colors.background_secondary};

    justify-content: center;
    align-items: center;

    width: ${RFValue(55)}px;
    height: ${RFValue(55)}px;

    border-radius: 50px;
    
    ${({ isActive, theme}) => isActive && css`
        border: 1px solid ${({theme}) => theme.colors.main};
    `};

`;

export const Subtitle = styled.Text`
    color: ${({theme}) => theme.colors.text_detail};
    font-family: ${({theme}) => theme.fonts.sub_title};
    font-size: ${RFValue(15)}px;
`;
