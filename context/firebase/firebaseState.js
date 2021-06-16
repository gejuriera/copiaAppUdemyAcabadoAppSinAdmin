import React, { useReducer } from 'react';

import firebase from '../../firebase'
import FirebaseReducer from './firebaseReducer'
import FirebaseContext from "./firebaseContext"

import _ from 'lodash'

import { OBTENER_PRODUCTOS_EXITO } from '../../types'

const FirebaseState = props => {
    
    //crear state inicial
    const initialState = {
        habitacion: []
    }

    //useReducer con dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(FirebaseReducer, initialState)

    //Funcion que se ejecuta para traer los productos
    const obtenerProductos = () => {
      
        //consultar firebase
        firebase.db
            .collection('productos')
            .where('existencia', '==', true) //traer solo los q tengan existencia true
            .onSnapshot(manejarSnapshot);
        function manejarSnapshot(snapshot){
            let habitaciones = snapshot.docs.map(doc =>{
                return{
                    id: doc.id,
                    ...doc.data()
                }
            });
            //ordenar por categorias con lodash
            habitaciones=_.sortBy(habitaciones,'categoria')
            


            //Tenemos resultados de la base de datos
            dispatch({
                type: OBTENER_PRODUCTOS_EXITO,
                payload: habitaciones
    
            });
        }
    }

    return (
        <FirebaseContext.Provider
            value={{
                habitacion: state.habitacion,
                firebase,
                obtenerProductos
            }}
        >
            {props.children}
        </FirebaseContext.Provider>

    )


}

export default FirebaseState



