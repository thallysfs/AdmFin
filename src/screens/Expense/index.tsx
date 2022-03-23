import React from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Image } from 'react-native'
import { HeaderBar } from '../../components/HeaderBar'
import RNPickerSelect from 'react-native-picker-select';

import { 
  Container, 
  Fields, 
  Form, 
  Header,
  Title,
  SelectItem 
} from './styles'
import SendMoneySvg from '../../assets/sendMoney.svg'
import { InputForm } from '../../components/Form/InputForm'
import { useForm } from 'react-hook-form'
import { Button } from '../../components/Form/Button'
import { ScrollView } from 'react-native-gesture-handler'

export function Expense(){

  const {
    control,
    handleSubmit
  } = useForm();

  function handleRegister(form: any){
    console.log(form)
  }

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior='position'>
      <ScrollView>         
        <Container>
          <HeaderBar />
          <Header>
            <Title>Despesas</Title>
            <SendMoneySvg width="320" height="160" />
          </Header>
            <Form>
              <Fields>
                <InputForm
                  name="descrition" 
                  control={control}
                  placeholder="Descrição"
                  iconName='align-left'
                />
                <InputForm
                  name="value" 
                  control={control}
                  placeholder="Valor"
                  iconName='dollar-sign'
                />
                <InputForm
                  name="obs" 
                  control={control}
                  placeholder="Observação"
                  iconName='align-left'
                />

              </Fields>
              <Button 
                title='Salvar'
                onPress={handleSubmit(handleRegister)}
              />
            </Form>
          </Container>
        </ScrollView>   
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}
