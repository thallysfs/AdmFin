import React from 'react'
import { Feather } from '@expo/vector-icons'
import { Container } from './styles'
import { BorderlessButton, BorderlessButtonProps } from 'react-native-gesture-handler';

interface Props extends BorderlessButtonProps{
    color?: string;
}


export function HeaderBar({ color, ...rest }: Props){

  return(
    <Container>
        <BorderlessButton style={{ left: 350 }}>
            <Feather
                name='more-vertical'
                size={24}
            />
        </BorderlessButton>
    </Container>
  )
}
