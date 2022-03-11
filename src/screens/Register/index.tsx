import React, { useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Text, TouchableWithoutFeedback } from 'react-native';
import { Button } from '../../components/Form/Button';
import { CircularIcon } from '../../components/CircularIcon'
import { HeaderBar } from '../../components/HeaderBar'
import { Input } from '../../components/Form/Input';
import { 
  Container,
  Content,
  Header,
  Title,
  WrapeIcons,
  Form,
  Fields 
} from './styles'

export function Register(){
  const [page, setPage] = useState('user')
  const [activeIcon1, setActiveIcon1] = useState(true)
  const [activeIcon2, setActiveIcon2] = useState(false)
  const [activeIcon3, setActiveIcon3] = useState(false)

  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')

  const [nameCard, setNameCard] = useState('')
  const [closingDay, setClosingDay] = useState('')
  const [color, setColor] = useState('')

  const [category, setCategory] = useState('')

  function handlePage(page: string){
    if(page == 'user'){
      setActiveIcon1(true);
      setActiveIcon2(false);
      setActiveIcon3(false);
    }
    if(page == 'card'){
      setActiveIcon1(false);
      setActiveIcon2(true);
      setActiveIcon3(false);
    }
    if(page == 'category'){
      setActiveIcon1(false);
      setActiveIcon2(false);
      setActiveIcon3(true);
    }

    setPage(page);
  }

  return(
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <HeaderBar />
          <Header>
            <Title>Cadastro</Title>
            <WrapeIcons>
              <CircularIcon 
                key={1} 
                name='Cadastrar responsável' 
                nameIcon='user-plus' 
                onPress={() => handlePage('user')} 
                active={activeIcon1}
              />
              <CircularIcon 
                key={2} 
                name='Cadastrar cartão' 
                nameIcon='credit-card'
                onPress={() => handlePage('card')} 
                active={activeIcon2}
              />
              <CircularIcon 
                key={3} 
                name='Cadastrar categoria' 
                nameIcon='tag'
                onPress={() => handlePage('category')} 
                active={activeIcon3}
              />
            </WrapeIcons>
          </Header>
          <Content>
          {/* Tela cadastro de usuário */}
          { page === 'user' &&
            <Form>
              <Fields>
                <Input 
                  iconName='align-left'
                  placeholder='Nome'
                  keyboardType='default'
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={setName}
                  value={name}
                />
                <Input 
                  iconName='calendar'
                  placeholder='Data de nascimento'
                  keyboardType='number-pad'
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={setAge}
                  value={age}
                />
                <Input 
                  iconName='activity'
                  placeholder='Sexo'
                  keyboardType='default'
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={setGender}
                  value={gender}
                />
              </Fields>

              <Button
                title='Salvar'
                enabled={true}
                loading={false}
              />
            </Form> 
          }

          {/* Tela cadastro de cartão */}
          {
            page === 'card' &&
            <Form>
              <Fields>
                <Input 
                  iconName='align-left'
                  placeholder='Nome cartão'
                  keyboardType='default'
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={setNameCard}
                  value={nameCard}
                />
                <Input 
                  iconName='calendar'
                  placeholder='Dia do fechamento'
                  keyboardType='number-pad'
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={setClosingDay}
                  value={closingDay}
                />
                <Input 
                  iconName='edit-3'
                  placeholder='Cor(hexadecimal)'
                  keyboardType='default'
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={setColor}
                  value={color}
                />
              </Fields>
              <Button 
                title='Salvar'
                enabled={true}
                loading={false}
              />
            </Form> 
          }

          {/* Tela cadastro de categoria */}
          {
            page == 'category' &&
            <Form>
              <Fields>
                <Input 
                  iconName='align-left'
                  placeholder='Categoria'
                  keyboardType='default'
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={setCategory}
                  value={category}
                />
              </Fields>

              <Button
                title='Salvar'
                enabled={true}
                loading={false}
              />
            </Form> 
          }

          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
