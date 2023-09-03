import './Section1.css'
import React, { useState } from 'react';

export default function Section1() {

    const [inputValue, setInputValue] = useState('');
    const [labelValue, setLabelValue] = useState('');
    const [listaPalabras, setListaPalabras] = useState([
        {
            id: 1,
            palIngles: "red",
            palEspañol: "rojo",
            estado: true,
        },
        {
            id: 2,
            palIngles: "house",
            palEspañol: "casa",
            estado: true,
        },
        {
            id: 3,
            palIngles: "tree",
            palEspañol: "arbol",
            estado: true,
        }
    ]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const [indicePalabra, setIndicePalabra] = useState(0);
    const [mostrarBotonPresionar, setMostrarBotonPresionar] = useState(true);
    //let indicePalabraTemp = indicePalabra;
    let currentIndex = indicePalabra;
    const handleButtonClick = () => {


        //listaPalabras.forEach((dato) => {
        /*if (inputValue === listaPalabras.palEspañol) {
            console.log("funciono");
            console.log(dato.id - 1);
        }*/
        for (let i = 0; i < listaPalabras.length; i++) {
            if (inputValue === listaPalabras[i].palEspañol) {
                console.log("funciono");
            }
        }
        // });

        console.log(currentIndex);
        console.log(indicePalabra);
        if (currentIndex < listaPalabras.length) {
            setIndicePalabra(currentIndex + 1);
        } else if (currentIndex === listaPalabras.length1) {
            console.log("se acabo la lista");
            setInputValue("");
            console.log(listaPalabras.length);
            setMostrarBotonPresionar(false);
        }
        setInputValue("");
    };

    const botonResultados = (
        <button> Boton resultados</button>
    );


    let temporaryInput = ''; // Variable para almacenar temporalmente el valor del campo

    const p = listaPalabras.map((data) =>
        <li key={data.id}>
            {data.id}
            {data.palIngles}
        </li>
    );

    return (

        <div className="content-section1">
            <div className="content-palabra">
                <ul>
                    {p}
                </ul>
                <br /><br />

                <br /><br />


                <label> palabra en inglés: {indicePalabra < listaPalabras.length ? listaPalabras[indicePalabra].palIngles : 'Fin de la lista'} </label>
                <input
                    type="text"
                    placeholder='Ingresa la palabra en español'
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <Button onPresionar={handleButtonClick} sacarBoton={setMostrarBotonPresionar} />
                <Button mostrarBotonResultados={indicePalabra === listaPalabras.length} />
            </div>
        </div>
    );
}

function Button({ onPresionar, mostrarBotonResultados, sacarBoton }) {

    const cargarPalabra = () => {
        const nuevoDato = "Palabra";
        //setInputWord(nuevoDato);
        onPresionar(nuevoDato);
    }

    return (
        <>
            {sacarBoton ? null : (
                <Button sacarBoton={sacarBoton} />
            )}
        

            {mostrarBotonResultados && (
                <button>Resultados</button>
            )}
        </>
    );
}

