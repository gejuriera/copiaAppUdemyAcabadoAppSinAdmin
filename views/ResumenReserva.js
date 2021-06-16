import React, { useContext, useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import ReservaContext from '../context/reserva/reservaContext'
import {
    Container, Content, List,
    ListItem, Thumbnail, Text, Left, Body, Button, H1, Footer, FooterTab
} from 'native-base'
import globalStyles from '../styles/global'
import { useNavigation } from '@react-navigation/native'
import firebase from '../firebase'

const ResumenReserva = () => {

    const navigation = useNavigation();
    //funcion elimina un producto de la reserva
    const confirmarEliminacion = id =>{
        Alert.alert(
            'Deseas eliminar este servicio?',
            'Una vez eliminado no se puede recuperar',
            [
                {
                    text:"Confirmar",
                    onPress:()=>{
                        //eliminar del state
                        eliminarProducto(id);
                        
                    }
                },
                { text: 'Cancelar', style:'cancel'}
            ]
            )

    }

    //funcion que redireccion a progreso reserva

    const progresoReserva = () =>{
        Alert.alert(
            'Revisa tu pedido',
            'Una vez que realizas tu pedido, no podras cambiarlo',
            [
                {
                    text:"Confirmar",
                    onPress: async ()=>{

                        //crear el objeto
                        const reservaObj = {
                            tiempo:0,
                            completado: false,
                            total : Number(total),
                            orden: reserva,//aray
                            creado:Date.now()
                        }
                            try{
                                const reserva= await firebase.db.collection('ordenes').add(reservaObj)
                                pedidoRealizado(reserva.id)

                                //redireccionar a progreso
                                navigation.navigate('ProgresoDeReserva')
                            }
                            catch(error){
                                console.log(error)
                            }
                        

                        
                        //escribir el pedido a firebase


                        navigation.navigate('ProgresoDeReserva')
                    }
                },
                { text: 'Revisar', style:'cancel'}
            ]
            )
    }


    //contextPedido
    const { reserva, total, mostrarResumen,eliminarProducto,pedidoRealizado } = useContext(ReservaContext);

    useEffect(() => {
        calcularTotal();
    }, [reserva]);

    const calcularTotal = () => {
        let nuevoTotal = 0;
        nuevoTotal = reserva.reduce((nuevoTotal, articulo) =>
            nuevoTotal + articulo.total, 0);
        mostrarResumen(nuevoTotal)

    }

    return (
        <Container style={globalStyles.contenedor}>
            <Content style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>Resumen Pedido</H1>
                {reserva.map((habitaciones, i) => {
                    const { cantidad, nombre, imagen, id, precio } = habitaciones
                    return (
                        <List key={id + i}>
                            <ListItem
                                thumbnail>
                                <Left>
                                    <Thumbnail large square source={{ uri: imagen }} />
                                </Left>
                                <Body>
                                    <Text>{nombre}</Text>
                                    <Text>Cantidad: {cantidad}</Text>
                                    <Text>Precio: ${precio}</Text>
                                    <Button
                                        onPress={()=>confirmarEliminacion(id)}
                                        full
                                        danger
                                        style ={{marginTip:20}}
                                    >
                                        <Text
                                        style={[globalStyles.botonTexto,{color:"#FFF"}]}
                                        >Eliminar
                                        </Text>
                                    </Button>

                                </Body>

                            </ListItem>

                        </List>

                    )
                })}

                <Text style={globalStyles.cantidad}>Total a Pagar: ${total}</Text>
                <Button

                    onPress={() => navigation.navigate('Habitacion')}
                    style={[globalStyles.boton, { marginTop: 30 }]}
                    full

                >
                    <Text
                        style={globalStyles.botonTexto}>
                        Seguir Pidiendo
                        </Text>
                </Button>
            </Content>

            <Footer>
                <FooterTab>
                    <Button

                        onPress={() => progresoReserva()}
                        style={[globalStyles.boton, { marginTop:0 }]}
                        full

                    >
                        <Text
                            style={globalStyles.botonTexto}>
                            Ordenar Reserva
                                     </Text>
                    </Button>

                </FooterTab>
            </Footer>
            
           
        </Container >
    );
};

export default ResumenReserva