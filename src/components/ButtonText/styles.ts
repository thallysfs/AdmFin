import styled from 'styled-components/native';

export const Title = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.header};
  margin-left: 7px;
`;

