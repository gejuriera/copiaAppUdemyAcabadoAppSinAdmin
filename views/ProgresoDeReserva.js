import React,{useContext,useEffect,useState} from 'react';
import {View,StyleSheet} from 'react-native';
import { Container,Text,H1,H3,Button} from 'native-base';

import globalStyles from '../styles/global'
import { useNavigation } from '@react-navigation/native'
import ReservaContext from '../context/reserva/reservaContext'
const ProgresoDeReserva = () =>{

    const { idpedido } =useContext(ReservaContext)

    return (
        <Text>{idpedido}</Text>
    );
}

export default ProgresoDeReserva