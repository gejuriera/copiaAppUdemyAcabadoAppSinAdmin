
import 'react-native-gesture-handler';
import React from 'react';


import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import NuevaReserva from './views/NuevaReserva'
import Habitacion from './views/Habitacion'
import DetalleHabitacion from './views/DetalleHabitacion'
import FormularioReserva from './views/FormularioReserva'
import ProgresoDeReserva from './views/ProgresoDeReserva'
import ResumenReserva from './views/ResumenReserva'

//importar state de context
import FirebaseState from './context/firebase/firebaseState'
import ReservaState from './context/reserva/reservaState'

//componentes
import BotonResumen from './components/ui/BotonResumen'

const Stack = createStackNavigator();




const App = () => {


  return (
    <>
      <FirebaseState>
        <ReservaState>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#1c5c9b'
              },
              headerTitleStyle: {
                fontWeight: "bold"
              },
              headerTintColor:'#FFFFFF'
            }}
          >

            <Stack.Screen
              name="NuevaReserva"
              component={NuevaReserva}
              options={{
                title: 'Nueva Reserva'
              }}
            />

            <Stack.Screen
              name="DetalleHabitacion"
              component={DetalleHabitacion}
              options={{
                title: 'Detalle Habitacion'
              }}
            />

            <Stack.Screen
              name="FormularioReserva"
              component={FormularioReserva}
              options={{
                title: 'Ordenar Reserva'
              }}
            />

            <Stack.Screen
              name="ResumenReserva"
              component={ResumenReserva}
              options={{
                title: 'Resumen de reserva'
              }}
            />

            <Stack.Screen
              name="ProgresoDeReserva"
              component={ProgresoDeReserva}
              options={{
                title: 'Progreso'
              }}
            />

            <Stack.Screen
              name="Habitacion"
              component={Habitacion}
              options={{
                title: 'Nuestras Habitaciones',
                headerRight: props => <BotonResumen/>
              }}
            />

          </Stack.Navigator>
        </NavigationContainer>
        </ReservaState>
      </FirebaseState>

    </>
  );
};



export default App;
