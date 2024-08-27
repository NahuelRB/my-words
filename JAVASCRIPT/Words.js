
//let spanishWords = ["gato", "perro", "caballo", "gallina", "tigre", "leon"]
let englishWords
let spanishWords

let intervalId;
let numberRandom;

let labelRegresiva = document.querySelector(".regresiva")
document.addEventListener('DOMContentLoaded', () => {
    //INPUT
    let inputRepuesta = document.querySelector(".palabra");


    //DIV
    let word = document.querySelector(".word");
    let resultado = document.querySelector(".resultado");
    let spanish = document.querySelector(".español");
    let english = document.querySelector(".ingles")

    //BUTTONS
    let buttonEnviar = document.querySelector(".enviar");
    let buttonPagList = document.querySelector('.pagListaPalabras');
    let buttonOtraPalabra = document.querySelector('.otraPalabra')

    let prueba2 = document.querySelector(".prueba");

    
    let listadoPrueba = []
    contador = 0
    function listado() {
        let listadoPrueba2 = "Prueba " + (contador++)
        
        listadoPrueba.push(listadoPrueba2);

        console.log(listadoPrueba);
    }
    
    
    
    function prueba() {
        spanish.textContent = `Palabra en español: ${spanishWords[numberRandom]}`
        english.textContent = `Palabra en inglés: ${englishWords[numberRandom]}`
        console.log("Prueba 1:" + inputRepuesta.value.toLowerCase());
        
        if (englishWords[numberRandom] == inputRepuesta.value.toLowerCase()) {
            console.log("Funciono la traducción");
            resultado.innerHTML = `<h3> Es correcto </h3>`
            //intervalId = null;
            startUpdatingWords();
            randomWords();
            inputRepuesta.value = ""
        } else {
            iniciarCuentaRegresiva()
            console.log("Fallaste");
            inputRepuesta.value = ""
            resultado.innerHTML = `<h3> Fallaste </h3>`
        }
    }
    
    function randomWords() {
        spanishWords = loadNewWords()
        numberRandom = Math.floor(Math.random() * spanishWords.length);
        word.textContent = spanishWords[numberRandom];
    }
    
    function startUpdatingWords() {
        if (intervalId !== null) return;
        
        setTimeout(() => {
            clearInterval(intervalId);
            intervalId = null;
        }, 1000);
        
        intervalId = setInterval(() => {
            randomWords();
        }, 100);
    }
    
    function saveWords(words) {
        let jsonWords = JSON.stringify(words);
        localStorage.setItem("local_words", jsonWords);
    }
    
    function loadWords() {
        try {
            spanishWords = JSON.parse(localStorage.getItem('list_words_spanish'));
            englishWords = JSON.parse(localStorage.getItem('list_words_english'));
            if (spanishWords) {
                return spanishWords;
            } else {
                return [];
            }
        } catch (error) {
            console.error("Error al parsear el JSON: " + error);
            return [];
        }
    }
    
    function loadNewWords(word) {
        let localWords = loadWords();
        
        return localWords;
    }
    
    
    let listWords = loadWords();
    console.log("Palabras iniciales: " + listWords);
    
    console.log("Palabras finales: " + listWords);
    randomWords()
    startUpdatingWords()

    let regresiva = 3;
let countdownInterval;

function cuentaRegresiva() {
    if (regresiva <= 0) {
        clearInterval(countdownInterval);
        location.reload();
    } else {
        console.log("entro");
        labelRegresiva.hidden = false;
        labelRegresiva.textContent = regresiva;
        regresiva--;
    }
}

function iniciarCuentaRegresiva() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    regresiva = 3;
    countdownInterval = setInterval(cuentaRegresiva, 1000);
}


    //EVENTOS
    buttonPagList.addEventListener('click', function (event) {
        window.location.href = 'lista_palabras.html'
    });
    inputRepuesta.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evita el comportamiento por defecto de la tecla Enter
            buttonEnviar.click(); // Simula un clic en el botón
        }
    });
    buttonOtraPalabra.addEventListener('click', function (event) {
        randomWords();
        startUpdatingWords();
    });
    buttonEnviar.addEventListener('click', prueba);
})

