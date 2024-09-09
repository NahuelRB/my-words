document.addEventListener('DOMContentLoaded', () => {
    //VARIABLES
    let englishWords;
    let spanishWords;
    let numberRandom;
    let regresiva = 3;
    let countdownInterval;
    let contadorAciertos = 0;
    let listaContador = [];

    //INPUT
    let inputRepuesta = document.querySelector(".palabra");
    inputRepuesta.focus();

    //LABEL
    let labelRegresiva = document.querySelector(".regresiva")

    //DIV
    let divWord = document.querySelector(".word");
    let divResultado = document.querySelector(".resultado");
    //let divSpanish = document.querySelector(".español");
    let divEnglish = document.querySelector(".ingles")

    //BUTTONS
    let buttonEnviar = document.querySelector(".enviar");
    let buttonPagList = document.querySelector('.pagListaPalabras');
    let buttonOtraPalabra = document.querySelector('.otraPalabra')

    //FUNCIONES INICIALES
    function verificarRespuesta() {
        let contadorWords = [];
    
        //randomWords();
        startUpdatingWords();
        //console.log("f" + numberRandom)
        //divSpanish.textContent = `Palabra en español: ${spanishWords[numberRandom]}`
        divEnglish.textContent = `${englishWords[numberRandom]}`

        console.log("********************************");
        console.log("Verificar respuesta");

        let contadores = getCounter();

        if (englishWords[numberRandom] == inputRepuesta.value.toLowerCase()) {
            divResultado.innerHTML = `<h3 class="resultado"> Correcto </h3>`
        
            inputRepuesta.value = ""
            console.log("********   Correcto    ***************");
            console.log("Correcto");
            console.log("Contadores: " + contadores)
            console.log("Palabra: " + englishWords[numberRandom]);
            console.log("Ubicacion de la palabra: " + numberRandom);
            if (contadores[numberRandom] < 4 || contadores[numberRandom] == null) {
                contadores[numberRandom] = (contadores[numberRandom] || 0) + 1
                console.log("El contador es: " + contadores[numberRandom]);
                setCounter(contadores);
            } else {
                console.log("Desea eliminar la plabra?")
                console.log(contadores);
                let confirmacion = confirm('¿Estás seguro de que deseas continuar?');
                if(confirmacion){
                    console.log(spanishWords);
                    spanishWords.splice(numberRandom,1);
                    englishWords.splice(numberRandom,1);
                    contadores.splice(numberRandom,1)
                    setWordsSpanish(spanishWords);
                    setWordsEnglish(englishWords);
                    setCounter(contadores);
                    console.log(spanishWords);
                }
            }
        } else {
            //iniciarCuentaRegresiva()
            inputRepuesta.value = ""
            divResultado.innerHTML = `<h3 class="resultado"> Incorrecto </h3>`
            console.log("************   Incorrecto   ********************");
            inputRepuesta.focus(); 
            console.log("El contador entero: " + contadores);
            contadores[numberRandom] = 0;
            console.log("Se pasa a 0 el contador de la palabra: " + contadores);
            setCounter(contadores);
        }
    }

//Actualizar lista de palabras en español
function setWordsSpanish(word) {
    console.log("******   Guardando palabras en español en el LocalStorage   *********");
    console.log("Guardando palabras en español en el LocalStorage");
    console.log("Palabra: " + word.value);
    localStorage.setItem('list_words_spanish', JSON.stringify(word));
}
//Actualizar lista de palabras en ingles
function setWordsEnglish(word) {
    console.log("**********   Guardando palabras en ingles en el LocalStorage   *************");
    console.log("Guardando palabras en ingles en el LocalStorage");
    console.log("Palabra: " + word.value);
    localStorage.setItem('list_words_english', JSON.stringify(word));
}
//Actualizar lista de contadores
function setCounter(listCounter) {
    console.log("***************   Lista   ********************");
    console.log(listCounter);
    localStorage.setItem('list_counter', JSON.stringify(listCounter));
    return listCounter;
}

    function randomWords() {
        spanishWords = loadWords()
        numberRandom = Math.floor(Math.random() * spanishWords.length);
        divWord.textContent = spanishWords[numberRandom];
    }

    function startUpdatingWords() {
        let intervalId;
        //if (intervalId !== null) return;

        setTimeout(() => {
            clearInterval(intervalId);
            intervalId = null;
        }, 1000);
        intervalId = setInterval(() => {
            randomWords();
        }, 100);
    }


    function getCounter() {
        let listCounter = JSON.parse(localStorage.getItem('list_counter'));
        return listCounter;
    }

    function loadWords() {
        try {
            spanishWords = JSON.parse(localStorage.getItem('list_words_spanish'));
            englishWords = JSON.parse(localStorage.getItem('list_words_english'));
      
            if (spanishWords) {
                if (!localStorage.getItem('list_counter')) {
                    setCounter(Array(spanishWords.length).fill(0));
                }
                return spanishWords;
            } else {
                return [];
            }
        } catch (error) {
            console.error("Error al parsear el JSON: " + error);
            return [];
        }
    }

    let listWords = loadWords();
    console.log("Palabras iniciales: " + listWords);
    console.log("Palabras finales: " + listWords);
    randomWords()
    startUpdatingWords()

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
        countdownInterval = setInterval(cuentaRegresiva, 600);
    }


    //EVENTOS
    buttonPagList.addEventListener('click', function (event) {
        window.location.href = 'lista_palabras.html'
    });
    inputRepuesta.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            buttonEnviar.click();
        }
    });
    buttonOtraPalabra.addEventListener('click', function (event) {
        startUpdatingWords();
        randomWords();
    });
    buttonEnviar.addEventListener('click', verificarRespuesta);
})

