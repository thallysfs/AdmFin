import React, { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, StyleSheet, Alert } from 'react-native'
import { HeaderBar } from '../../components/HeaderBar'
import firestore from '@react-native-firebase/firestore'
import RNPickerSelect from "react-native-picker-select";
import { InputForm } from '../../components/Form/InputForm'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup' 
import SendMoneySvg from '../../assets/sendMoney.svg'
import { useForm } from 'react-hook-form'
import { Button } from '../../components/Form/Button'
import { ScrollView } from 'react-native-gesture-handler'

import { 
  Container, 
  Fields, 
  Form, 
  Header,
  Title,
  SelectItem,
} from './styles'


interface FormData {
  description: string;
  value: number;
  obs: string;
}

interface PropsCategory {
  id: string;
  category: string;
}

interface PropsUser {
  id: string;
  name: string;
}

interface PropsCard {
  id: string;
  nameCard: string;
}

const schema = Yup.object().shape({
  description: Yup
    .string()
    .required('Informa uma descrição'),
  value: Yup
    .number()
    .required('Informe o valor da despesa')
    .typeError('O valor deve ser numério')
    .positive('O Valor não pode ser negativo'),
  obs: Yup.string()
})



export function Expense(){
  const[category, setCategory] = useState('');
  const[card, setCard] = useState('');
  const[user, setUser] = useState('');
  const[userList, setUserList] = useState<PropsUser[]>([]);
  const[cardList, setCardList] = useState<PropsCard[]>([]);
  const[categoryList, setCategoryList] = useState<PropsCategory[]>([]);

  //associação do resolverdor com as regras do Yup
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  //listar categorias
  function onCategoryList(){
    firestore()
    .collection('category')
    .get()
    .then(response =>{
      const dataCategory = response.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }) as PropsCategory[]
      setCategoryList(dataCategory);
    })
    .catch(error => console.error(error));
  }

  //listar usuarios
  function onUserList(){
    firestore()
    .collection('User')
    .get()
    .then(response =>{
      const dataUser = response.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }) as PropsUser[]
      setUserList(dataUser);
    })
    .catch(error => console.error(error))
  }

    //listar cartões
    function onCardList(){
    firestore()
    .collection('card')
    .get()
    .then(response =>{
      const dataCard = response.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }) as PropsCard[]
      setCardList(dataCard);
    })
    .catch(error => console.error(error))
  }

  //useFocus ao invés do useEffect pq navigationTabs não atualiza página
  useFocusEffect(useCallback(()=>{
    onCategoryList();
    onUserList();
    onCardList();

    console.log(categoryList)
    console.log(userList)
    console.log(cardList)
  }, []));


  async function handleRegister(form: FormData){
    //validando o que não foi possível no Yup
    if(!category)
      return Alert.alert('Categoria','Selecione uma categoria');    
      
    if(!user)
      return Alert.alert('Responsável','Selecione um responsável');    

    //setando alguma coisa no obs
    form.obs = form.obs === '' ? '' : form.obs
      
    // criando objetos de dados a serem enviados
    const data = {
      card: card,
      category: category,
      date: firestore.FieldValue.serverTimestamp(),
      description: form.description,
      obs: form.obs,
      user: user
    }
    console.log(data)

    //salvar dados no firestore
    firestore()
          .collection('expense')
          .add({
            card: card,
            category: category,
            creatAt: firestore.FieldValue.serverTimestamp(),
            description: form.description,
            obs: form.obs,
            user: user,
            value: form.value
          })
          .then(()=>{
            setCard('')
            setCategory('')
            setUser('')
            //Alert.alert('Cadastrado', `Cartão *${nameCard}* cadastrado com sucesso!`)
          })
          .catch((error)=> console.log(error))
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
                  name="description" 
                  control={control}
                  placeholder="Descrição"
                  iconName='align-left'
                  error={errors.description && errors.description.message}
                />
                <InputForm
                  name="value" 
                  control={control}
                  placeholder="Valor"
                  iconName='dollar-sign'
                  keyboardType='numeric'
                  error={errors.value && errors.value.message}
                />
                <InputForm
                  name="obs" 
                  control={control}
                  placeholder="Observação"
                  iconName='align-left'
                  error={errors.obs && errors.obs.message}
                />
                <SelectItem>
                  <RNPickerSelect
                    placeholder={{ label: "Selecione uma categoria", value: null }}
                    onValueChange={(value) => setCategory(value)}
                    style={pickerSelectStyles}
                    items={
                      categoryList.map( cat =>{
                        return {
                          key: cat.id, label: cat.category, value: cat.category
                        }
                      }
                      )
                    }
                  /> 
                </SelectItem>
                <SelectItem>
                  <RNPickerSelect
                    placeholder={{ label: "Selecione um responsável", value: null }}
                    onValueChange={(value) => setUser(value)}
                    style={pickerSelectStyles}
                    items={
                      userList.map( user =>{
                        return {
                          key: user.id, label: user.name, value: user.name
                        }
                      }
                      )
                    }
                  /> 
                </SelectItem>
                <SelectItem>
                  <RNPickerSelect
                    placeholder={{ label: "Selecione um cartão", value: null }}
                    onValueChange={(value) => setCard(value)}
                    style={pickerSelectStyles}
                    items={
                      cardList.map( card =>{
                        return {
                          key: card.id, label: card.nameCard, value: card.nameCard
                        }
                      }
                      )
                    }
                  /> 
                </SelectItem>

              </Fields>
              {/* <Button 
                title='Categoria'
                onPress={showCat}
              /> */}
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

// Estilização do picker
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30 // to ensure the text is never behind the icon
  }
});
