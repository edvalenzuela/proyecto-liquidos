import React, { createContext, useState, useEffect } from 'react';

export const RecetaContext = createContext();

const RecetasContext = (props) => {
    const [recetas, setRecetas] = useState([]);
    const [buscar, setBuscar] = useState({
        nombre:'',
        categoria:''
    })

    const {nombre, categoria} = buscar;
    const [disponible, setDisponible] = useState(false);  //Mi Bandera

    useEffect(() => {
        try {
            if(disponible){
                const getRecetas = async () =>{
                    //capturo los ingredientes y categorias
                    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`
                    const resp = await fetch(url);
                    const {drinks} = await resp.json();
                    setRecetas(drinks);
                }
                getRecetas();
            }
        } catch (error) {
            
        }
    }, [buscar])

    return (
        <RecetaContext.Provider
            value={{
                recetas, //resultados de la busqueda
                setBuscar, //parametros del form
                setDisponible //flag
            }}
        >
            {props.children}
        </RecetaContext.Provider>
    );
}

export default RecetasContext;