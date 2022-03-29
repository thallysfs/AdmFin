import React, { useState } from 'react'
import { TextInputProps } from 'react-native'
import { Input } from '../Input'
import { Control, Controller } from 'react-hook-form'
import { Feather } from '@expo/vector-icons'

import { 
    Container,
    Error
} from './styles'

interface Props extends TextInputProps {
    control: Control
    name: string;
    iconName: React.ComponentProps<typeof Feather>['name']
    error?: string;
}


export function InputForm({
    control,
    name,
    iconName,
    error,
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
        { error && <Error>{ error }</Error>}
    </Container>
  )
}
