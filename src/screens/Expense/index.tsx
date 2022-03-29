import React, { useState, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Text, StyleSheet, Alert } from 'react-native'
import { HeaderBar } from '../../components/HeaderBar'
import firestore from '@react-native-firebase/firestore'
import uuid from 'react-native-uuid'
import RNPickerSelect from "react-native-picker-select";

import { 
  Container, 
  Fields, 
  Form, 
  Header,
  Title,
  SelectItem, 
  ModalStyle
} from './styles'
import SendMoneySvg from '../../assets/sendMoney.svg'
import { InputForm } from '../../components/Form/InputForm'
import { useForm } from 'react-hook-form'
import { Button } from '../../components/Form/Button'
import { ScrollView } from 'react-native-gesture-handler'
import { Picker } from '@react-native-picker/picker'


interface FormData {
  description: string;
  value: number;
  category: string;
  card?: string;
  user: string;
  obs: string;
}

interface PropsCategory {
  id: string;
  category: string;
}

export function Expense(){
  const[category, setCategory] = useState();
  const[card, setCard] = useState();
  const[user, setUser] = useState();
  const[userList, setUserList] = useState<[]>([]);
  const[cardList, setCardList] = useState<[]>([]);
  const[categoryList, setCategoryList] = useState<PropsCategory[]>([]);

  const[language, setLanguage] = useState('');

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
      })
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
      })
      setCardList(dataCard);
    })
    .catch(error => console.error(error))
  }


  useFocusEffect(useCallback(()=>{
    onCategoryList();
    onUserList();
    onCardList();

    console.log(categoryList)
    console.log(userList)
    console.log(cardList)
  }, []));

  function showCat(){
    Alert.alert('Categoria', category)
  }

  const {
    control,
    handleSubmit
  } = useForm();

  function handleRegister(form: FormData){
    const data = {
      card: form.card,
      category: category,
      date: firestore.FieldValue.serverTimestamp(),
      description: form.description,
      id: String(uuid.v4()),
      obs: form.obs,
      user: form.user
    }
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
