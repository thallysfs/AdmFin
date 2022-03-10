import React, { useState } from 'react'
import { Container,IconWrape, Subtitle } from './styles'
import { Feather } from '@expo/vector-icons'
import { TouchableOpacity, TouchableOpacityProps} from 'react-native';


interface Props extends TouchableOpacityProps{
    nameIcon: React.ComponentProps<typeof Feather>['name'];
    name: string;
    active?: boolean;
}

export function CircularIcon({nameIcon, name, active=false, ...rest}: Props){
    const nameNew : string[] = name.split(" ", 2 );

  return(
    <Container>
    <TouchableOpacity {...rest}>
        <IconWrape isActive={active}>
            <Feather
                name={nameIcon}
                size={24}
            />
        </IconWrape>
    </TouchableOpacity>    
        <Subtitle>
            {`${nameNew[0]} \n ${nameNew[1]}`}
        </Subtitle>
    </Container>
  )
}
