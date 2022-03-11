import React, { useState } from 'react'
import { Image, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native'
import { 
    Container,
    Header,
    Title,
    Form,
    Footer
 } from './styles'

 import { useTheme } from 'styled-components'
import Logo from '../../../assets/logo.png'
import { Input } from '../../components/Form/Input'
import { PasswordInput } from '../../components/Form/PasswordInput'
import { Button } from '../../components/Form/Button'
import { ButtonText } from '../../components/ButtonText'

export function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const theme = useTheme();
  return(
    <KeyboardAvoidingView behavior='position' enabled>
      {/* O TouchableWithoutFeedback captura toques na tela, quando capturar, o onPress ativa o
      fechamento do teclado */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <Image source={Logo} style={{ width: 100, height:100 }}/>
          </Header>   
          <Form>
            <Title>Login</Title>
            <Input 
                iconName='mail'
                placeholder='E-mail'
                keyboardType='email-address'
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={setEmail}
                value={email}
            />
            <PasswordInput 
                iconName='lock'
                placeholder='Senha'
                onChangeText={setPassword}
                value={password}
            />    
        </Form> 
        <Button 
              title='Login'
              enabled={true}
              loading={false}
            />
        <Footer>
          <ButtonText title='Criar conta' />
          <ButtonText title='Esqueci a senha' />
        </Footer> 
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
