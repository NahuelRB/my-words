let spanishWords = ["gato", "perro", "caballo", "gallina", "tigre", "leon"]
let englishWords = ["cat", "dog", "horse", "hen", "tiger", "lion"]


let listado = document.getElementById("list");
let word = document.getElementById("word");
let cargar = document.getElementById("cargar");

cargar.addEventListener("click", loadWords)

word.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita el comportamiento por defecto de la tecla Enter
        cargar.click(); // Simula un clic en el botón
    }
});

//Cargando palabras a la lista
function loadWords() {
    let prueba = JSON.parse(localStorage.getItem('list_of_words')) || []
    /* if (!Array.isArray(prueba)) {
         prueba = [];
     }*/

    console.log("Cargando palabras");
    word.focus()

    prueba.push(word.value)
    if (word.value != "") {
        saveWords(prueba);
        word.value = ""
    }
    showList()
}

//Guardar la lista en LocalStorage
function saveWords(word) {
    console.log("Guardando palabra en LocalStorage")
    localStorage.setItem('list_of_words', JSON.stringify(word));
}

//Mostrando lista armada
function showList() {

    let localWords = JSON.parse(localStorage.getItem('list_of_words')) || []

    /*if (!Array.isArray(localWords)) {
        localWords = [];
    }*/
    listado.innerHTML = '';
    console.log("Mostrando lista")
    console.log(localWords)

    let ul = document.createElement('ul');
    ul.style.listStyleType = 'none';

    //let div = document.createElement('div');
    //let botonX = document.createElement('button')

    localWords.slice(0).forEach((word, index) => {
        let li = document.createElement('li');
        li.textContent = word;

        let botonX = document.createElement('button')
        botonX.textContent = "X";
        botonX.id = `btn-${index}`
        botonX.className = 'btn btn-danger btn-sm';

        botonX.addEventListener('click', function () {
            localWords.splice(index, 1);
            localStorage.setItem('list_of_words', JSON.stringify(localWords));
            showList()
        });

        li.className = 'list-group-item';


        ul.appendChild(li);
        li.appendChild(botonX);
    });
    listado.appendChild(ul);
}
document.addEventListener('DOMContentLoaded', () => {
    showList()
})