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

    let listWords = loadWords();
    console.log("Palabras: " + listWords);
    randomWords()
    startUpdatingWords()

    //FUNCIONES INICIALES
    function verificarRespuesta() {
        let contadorWords = [];

        //randomWords();
        //startUpdatingWords();
        //console.log("f" + numberRandom)
        //divSpanish.textContent = `Palabra en español: ${spanishWords[numberRandom]}`
        divEnglish.textContent = `${englishWords[numberRandom]}`

        console.log("********************************");
        console.log("Verificar respuesta");
        let contadores = getCounter();

        if (englishWords[numberRandom] == inputRepuesta.value.toLowerCase()) {

            divResultado.innerHTML = `<h3> Correcto </h3>`
            inputRepuesta.value = ""
            console.log("********   Correcto    ***************");
            console.log("Correcto");
            console.log("Contadores: " + contadores)
            console.log("Palabra: " + englishWords[numberRandom]);
            console.log("Ubicacion de la palabra: " + numberRandom);
            if (contadores[numberRandom] < 2 || contadores[numberRandom] == null) {
                contadores[numberRandom] = (contadores[numberRandom] || 0) + 1
                console.log("El contador es: " + contadores[numberRandom]);
                setCounter(contadores);
                startUpdatingWords();
            } else {
                console.log("Desea eliminar la plabra?")
                console.log(contadores);
                let confirmacion = confirm('¿Estás seguro de que deseas continuar?');
                if (confirmacion) {
                    console.log(spanishWords);
                    spanishWords.splice(numberRandom, 1);
                    englishWords.splice(numberRandom, 1);
                    contadores.splice(numberRandom, 1)
                    setWordsSpanish(spanishWords);
                    setWordsEnglish(englishWords);
                    setCounter(contadores);
                    console.log(spanishWords);
                } else {
                    contadores[numberRandom] = 0;
                    setCounter(contadores);
                    console.log(contadores);
                }
                startUpdatingWords();
            }
        } else {
            inputRepuesta.value = ""
            divResultado.innerHTML = `<h3> Incorrecto </h3>`
            console.log("************   Incorrecto   ********************");
            inputRepuesta.focus();
            console.log("El contador entero: " + contadores);
            contadores[numberRandom] = 0;
            console.log("Se pasa a 0 el contador de la palabra: " + contadores);
            setCounter(contadores);
            iniciarCuentaRegresiva()
        }
    }

    //ACTUALIZAR LISTA DE PALABRAS EN ESPAÑOL
    function setWordsSpanish(word) {
        console.log("******   Guardando palabras en español en el LocalStorage   *********");
        console.log("Guardando palabras en español en el LocalStorage");
        console.log("Palabra: " + word.value);
        localStorage.setItem('list_words_spanish', JSON.stringify(word));
    }
    //ACTUALIZAR LISTA DE PALABRAS EN INGLES
    function setWordsEnglish(word) {
        console.log("**********   Guardando palabras en ingles en el LocalStorage   *************");
        console.log("Guardando palabras en ingles en el LocalStorage");
        console.log("Palabra: " + word.value);
        localStorage.setItem('list_words_english', JSON.stringify(word));
    }
    //ACTUALIZAR LISTA DE CONTADORES
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
        console.log("A VER AHORA");
        let intervalId;

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



    //FUNCIONES CUENTA REGRESIVA
    function iniciarCuentaRegresiva() {
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
        regresiva = 3;
        countdownInterval = setInterval(cuentaRegresiva, 500);
    }
    function cuentaRegresiva() {
        if (regresiva <= 0) {
            clearInterval(countdownInterval);
            //location.reload();
            divResultado.innerHTML = `<h3> Vuelva a intentarlo </h3>`
            // Cambia el estilo del h3
            //let heading = divResultado.querySelector("h3");
            //divResultado.style.width = "100%";

            startUpdatingWords();
            labelRegresiva.hidden = true;
        } else {
            console.log("entro");
            labelRegresiva.hidden = false;
            labelRegresiva.textContent = regresiva;
            regresiva--;
        }
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

