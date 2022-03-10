import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useTheme } from 'styled-components'

// Telas para navegar
import { Home } from '../screens/Home';
import { Register } from '../screens/Register';
import { Expense } from '../screens/Expense'
import { Report } from '../screens/Report'
import { Login } from '../screens/Login'

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes(){
    //acessando o nosso tema de cores e fonts
    const theme = useTheme();

    return(
        <Navigator
        //estilizando a tab
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.main,
                tabBarInactiveTintColor: theme.colors.text_detail,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 68,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0
                }
            }}
        >
            {/* Telas abaixo: */}
            <Screen 
                name="Home"
                component={Login}
                //essa desestruturação de size e color é para pegar dinamicamente a cor para o ícone.
                // se selecionado é uma cor, senão outra. Se eu definir uma cor, ela ficará fixa independente da seleção
                options={{
                    tabBarIcon: (({ size, color }) => 
                        <Feather 
                            name="home"
                            size={45}
                            color={color}
                        />
                    )
                }}
            />        
            <Screen 
                name="Despesa"
                component={Expense}
                options={{
                    tabBarIcon: (({ size, color }) => 
                        <Feather 
                            name="dollar-sign"
                            size={45}
                            color={color}
                        />
                    )
                }}
            />              
            <Screen 
                name="Cadastrar"
                component={Register}
                options={{
                    tabBarIcon: (({ size, color }) => 
                        <Feather 
                            name="plus-square"
                            size={45}
                            color={color}
                        />
                    )
                }}
            />            
            <Screen 
                name="Relatorio"
                component={Report}
                options={{
                    tabBarIcon: (({ size, color }) => 
                        <Feather 
                            name="pie-chart"
                            size={45}
                            color={color}
                        />
                    )
                }}
            />
        </Navigator>
    )
}
