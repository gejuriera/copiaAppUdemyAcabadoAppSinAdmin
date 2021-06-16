import React,{useContext} from 'react';
import {Button,Text} from 'native-base'
import globalStyles from '../../styles/global'
import { useNavigation } from '@react-navigation/native'
import ReservaContext from '../../context/reserva/reservaContext'


const  BotonResumen =() =>{

    const navigation=useNavigation();

    //leer objeto de pedido
    const { reserva } = useContext(ReservaContext);

    if(reserva.length === 0 ) return null;

    return (
        <Button
        onPress={()=>navigation.navigate("ResumenReserva")}
        style={globalStyles.boton}
        >
            <Text
            style={globalStyles.botonTexto}
            >Reserva</Text>
        </Button>

    )
}

export default BotonResumen