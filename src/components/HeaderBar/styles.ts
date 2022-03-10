import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'


export const Container = styled.View`
    background: ${({ theme }) => theme.colors.main};
    padding: ${RFValue(10)}px;
`;
