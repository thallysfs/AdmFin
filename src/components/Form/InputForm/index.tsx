import React, { useState } from 'react'
import { TextInputProps } from 'react-native'
import { Input } from '../Input'
import { Control, Controller } from 'react-hook-form'
import { Feather } from '@expo/vector-icons'

import { 
    Container,
} from './styles'

interface Props extends TextInputProps {
    control: Control
    name: string;
    iconName: React.ComponentProps<typeof Feather>['name']
}


export function InputForm({
    control,
    name,
    iconName,
    ...rest
}: Props){


  return(
    <Container>
        <Controller
        // control é o atributo que informa qual o form que controla esse input
            control={control}
            // render - qual input será renderizado
            render={({field: {onChange, value}}) =>(
                <Input
                onChangeText={onChange}
                value={value} 
                iconName={iconName}
                {...rest}
            />
            )}
            name={name}   
        />
    </Container>
  )
}
