import './Section1.css'
import React, { useState } from 'react';

export default function Section1() {

    const [inputValue, setInputValue] = useState('');
    const [labelValue, setLabelValue] = useState('');
    const [listaPalabras, setListaPalabras] = useState([]);

    const palabrasIngles = ["red","yellow","blue"];

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = () => {
        setLabelValue(inputValue);
        setListaPalabras([...listaPalabras, inputValue])
        setInputValue("");
    };

    let temporaryInput = ''; // Variable para almacenar temporalmente el valor del campo

    return (

        <div className="content-section1">
            <div className="content-palabra">
                <label> Dato ingresado: {listaPalabras}</label>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <Button onPresionar={handleButtonClick} />

            </div>
        </div>
    );
}

function Button({ onPresionar }) {

    const cargarPalabra = () => {
        const nuevoDato = "Palabra";
        //setInputWord(nuevoDato);
        onPresionar(nuevoDato);
    }

    return (
        <>
            <button onClick={cargarPalabra}>
                Presionar
            </button>
        </>
    );
}

