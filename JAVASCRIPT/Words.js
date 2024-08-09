
let spanishWords = ["gato", "perro", "caballo", "gallina", "tigre", "leon"]
let englishWords = ["cat", "dog", "horse", "hen", "tiger", "lion"]

let intervalId;
let numberRandom;
document.addEventListener('DOMContentLoaded', () => {
    //Input
    let palabra = document.getElementById("palabra");
    
    //DIV
    let word = document.getElementById("word");
    let resultado = document.getElementById("resultado");
    let spanish = document.getElementById("español");
    let english = document.getElementById("ingles")
    
    //Buttons
    let enter = document.getElementById("enviar");
    let pagList = document.querySelector('.pagListaPalabras');
    
    let prueba2 = document.getElementById("prueba");

    //Eventos
    pagList.addEventListener('click', function(event){
        window.location.href = '../HTML/lista_palabras.html'
    });

    palabra.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evita el comportamiento por defecto de la tecla Enter
            enter.click(); // Simula un clic en el botón
        }
    });
    enter.addEventListener('click', prueba);
    prueba2.addEventListener('click', listado);

    let listadoPrueba = []
    contador = 0
    function listado(){
        let listadoPrueba2= "Prueba" + (contador ++)

        listadoPrueba.push(listadoPrueba2);

        console.log(listadoPrueba);
    }

    function prueba() {
        //console.log(palabra.value);

        spanish.textContent = `Palabra en español: ${spanishWords[numberRandom]}`
        english.textContent = `Palabra en inglés: ${englishWords[numberRandom]}`
        console.log("Prueba 1:" + palabra.value.toLowerCase());

        // let palabraMinuscula = palabra.value.toLowerCase();


        if (englishWords[numberRandom] == palabra.value.toLowerCase()) {
            console.log("Funciono la traducción");
            resultado.innerHTML = `<h3> Es correcto </h3>`
            //clearInterval(intervalId); // Limpia el intervalo existente
            intervalId = null; 
            startUpdatingWords();
            randomWords();
            palabra.value=""
        } else {
            console.log("Fallaste");
            palabra.value=""
            resultado.innerHTML = `<h3> Fallaste </h3>`
        }
    }

    function randomWords() {
        //words = loadNewWords()    
        numberRandom = Math.floor(Math.random() * spanishWords.length);
        word.textContent = spanishWords[numberRandom];
    }

    function verifyWord() {
        //localStorage.removeItem("local_words");

        /*if (palabra == "tren") {
            console.log("funciono");
            resultado += "<h3> Ganaste</h3>"
            } else {
                resultado += "<h3> Perdiste </h3>"
        }
        document.body.insertAdjacentHTML('beforeend', resultado)*/

        /*words = loadNewWords(palabra);
        let p = randomWords(words);
        console.log("Prueba: " + p);
        
        let s = `<p>${p}</p>`;
        word.innerHTML = s*/
    }

    function startUpdatingWords() {
        if (intervalId) return;
        setTimeout(() => {
            clearInterval(intervalId);
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
        let localWords = localStorage.getItem("local_words")
        try {
            if (localWords)
                return JSON.parse(localWords);
            else
                return [];
        } catch (error) {
            console.error("Error al parsear el JSON: " + error);
            return [];
        }
    }

    function loadNewWords(word) {
        let localWords = loadWords();

        /*if (!Array.isArray(localWords)) {
            localWords = [];
            }*/

        localWords.push(word);
        saveWords(localWords);
        return localWords;
    }

    let listWords = loadWords();
    console.log("Palabras iniciales: " + listWords);

    //listWords = loadNewWord       s("Dato1");
    //listWords = loadNewWords("Dato2");

    console.log("Palabras finales: " + listWords);
    randomWords()
    startUpdatingWords()

})
