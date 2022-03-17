import React, { useState } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { CircularIcon } from '../../components/CircularIcon'
import { HeaderBar } from '../../components/HeaderBar'
import firestore from '@react-native-firebase/firestore'
import uuid from 'react-native-uuid'

import { 
  Container,
  Content,
  Fields,
  Form,
  Header,
  Title,
  WrapeIcons,
} from './styles'
import { Nunito_200ExtraLight } from '@expo-google-fonts/nunito';
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';

interface FormData {
  category: string;
}


export function Register(){
  const [page, setPage] = useState('user')
  const [activeIcon1, setActiveIcon1] = useState(true)
  const [activeIcon2, setActiveIcon2] = useState(false)
  const [activeIcon3, setActiveIcon3] = useState(false)

  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')

  const [nameCard, setNameCard] = useState('')
  const [closingDay, setClosingDay] = useState(0)
  const [color, setColor] = useState('')

  const [category, setCategory] = useState('')

  //estados para o botão
  const [enabled, setEnabled] = useState(true)
  const [loading, setLoading] = useState(false)


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

  //cadastro de categoria
  async function handleAddCategory(){
    if(category === ''){
      setEnabled(false);
      setLoading(true);

      Alert.alert('Erro', 'Favor inserir uma categoria')
    }
    else {
        firestore()
       .collection('category')
       .add({
         category
       })
       .then(()=>{
           Alert.alert('Cadastrado', `*${category}* cadastrado(a) com sucesso!`)
       })
       .catch((error)=> console.log(error))

      setCategory('')
      handlePage('')
    }


    setEnabled(true);
    setLoading(false);
    
  }

  //cadastro de usuário
  async function handleAddUser(){
    if(name === '' || age === '' || gender ===''){
      setEnabled(false);
      setLoading(true);

      Alert.alert('Erro', 'Favor inserir todos os dados')
    }
    else {
      let id = String(uuid.v4());

        firestore()
        .collection('User')
        .add({
          age,
          gender,
          id,
          createdAt: firestore.FieldValue.serverTimestamp(),
          name
        })
        .then(()=>{
            Alert.alert('Cadastrado', `Usuário *${name}* cadastrado(a) com sucesso!`)
        })
        .catch((error)=> console.log(error))

      setName('');
      setAge('');
      setGender('');
      handlePage('')
    }
  
  
      setEnabled(true);
      setLoading(false);
      
    }

  //cadastro de cartão
  async function handleAddCard(){
    if(nameCard === '' || closingDay === 0 || color ===''){
        setEnabled(false);
        setLoading(true);

        Alert.alert('Erro', 'Favor inserir todos os dados')
      }
      else {
        let colorHash = `#${color}`;
        let id = String(uuid.v4());

          firestore()
          .collection('card')
          .add({
            closingDay,
            colorHash,
            id,
            nameCard
          })
          .then(()=>{
              Alert.alert('Cadastrado', `Cartão *${nameCard}* cadastrado com sucesso!`)
              setNameCard('')
              setClosingDay(0)
              setColor('')
              handlePage('')
          })
          .catch((error)=> console.log(error))
    }
  }
  return(
    <KeyboardAvoidingView enabled behavior={Platform.OS === "ios" ? "padding" : "height"}>
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
                enabled={enabled}
                loading={loading}
                onPress={handleAddUser}
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
                  onChangeText={value => setClosingDay(Number(value))}
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
                onPress={handleAddCard}
              />
            </Form> 
          }

          {/* Tela cadastro de categoria */}
          {
            page == 'category' &&
            <Form>
              <Fields style={{paddingBottom: 128}}>
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
                enabled={enabled}
                loading={loading}
                onPress={handleAddCategory}
              />
            </Form> 
          }
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}


