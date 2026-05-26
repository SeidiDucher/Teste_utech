import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParamList } from '../@types/navigation'

// Importação das telas
import {Home} from '../pages/Home/Home';
import {Trivia} from '../pages/Trivia/Trivia';
import {Resultado} from '../pages/Resultado/Resultado';

const Stack = createStackNavigator<RootStackParamList>();

export function AppRoutes(){
    return(
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false, //remove barra superior padrãopara criar um layout customizado
                cardStyle: { backgroundColor: '#121214' } //Fundo padrão escuro para o app
            }}
        >
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Trivia' component={Trivia} />
            <Stack.Screen name='Resultado' component={Resultado} />
        </Stack.Navigator>
    )
}