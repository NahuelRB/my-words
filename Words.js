
let spanishWords = ["gato", "perro","caballo","gallina","tigre","leon"]
let englishWords = ["cat","dog","horse","hen","tiger","lion"]
//lalalalalal
let intervalId;
let numberRandom;
document.addEventListener('DOMContentLoaded', () => {
    let word = document.getElementById("word");
    let palabra = document.getElementById("palabra");
    let resultado = document.getElementById("resultado");

    function prueba(){
        console.log(palabra.value);
        console.log(numberRandom);
        console.log(englishWords[numberRandom]);

        if(englishWords[numberRandom] == palabra.value){
            console.log("Funciono la traducción");
        }else{
            console.log("Fallaste");
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
        if (intervalId) return; // Evita iniciar múltiples intervalos
        
        intervalId = setInterval(() => {
            randomWords();
        }, 100);
        
        setTimeout(() => {
            clearInterval(intervalId);
        }, 1000);
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
    
    /*function randomWords(word){
        let numberRandom = Math.floor(Math.random()* words.length);
        word.textContent = words[numberRandom]; 
        }*/
       
       
       let listWords = loadWords();
       console.log("Palabras iniciales: " + listWords);
       
       //listWords = loadNewWord       s("Dato1");
       //listWords = loadNewWords("Dato2");
       
       console.log("Palabras finales: " + listWords);
       startUpdatingWords()
       
       enviar.addEventListener('click',prueba);
    })