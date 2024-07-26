
let words = [];

//lalalalalal

function verifyWord() {
    let word = document.getElementById("word");
    let palabra = document.getElementById("palabra").value;
    let resultado = document.getElementById("resultado");
    ///localStorage.removeItem("local_words");
    
    /*if (palabra == "tren") {
        console.log("funciono");
        resultado += "<h3> Ganaste</h3>"
    } else {
        resultado += "<h3> Perdiste </h3>"
    }
    document.body.insertAdjacentHTML('beforeend', resultado)*/
 
    words = loadNewWords(palabra);
    let p = randomWords(words);
    console.log("Prueba: " +  p);

    word += `<p>${p}</p>`;
    document.body.insertAdjacentHTML('beforeend', word)
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

function loadNewWords(word){
    let localWords = loadWords();

   /*if (!Array.isArray(localWords)) {
        localWords = [];
    }*/

    localWords.push(word);  
      saveWords(localWords);
    return localWords;
}

function randomWords(listWords){
    let numberRandom = Math.floor(Math.random()* listWords.length);
    return listWords[numberRandom]; 
}


let listWords = loadWords();
console.log("Palabras iniciales: " + listWords);

//listWords = loadNewWords("Dato1");
//listWords = loadNewWords("Dato2");

console.log("Palabras finales: " + listWords);
