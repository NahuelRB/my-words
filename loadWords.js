let spanishWords = ["gato", "perro", "caballo", "gallina", "tigre", "leon"]
let englishWords = ["cat", "dog", "horse", "hen", "tiger", "lion"]


let listado = document.getElementById("list");
let word = document.getElementById("word");
let cargar = document.getElementById("cargar");

cargar.addEventListener("click", cargarMostrar)

word.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita el comportamiento por defecto de la tecla Enter
        cargar.click(); // Simula un clic en el botón
    }
});

function cargarMostrar(){    
    word.focus()
    if(word.value != "")
        spanishWords.push(word.value);

    let ul = document.createElement('ul');
    let div = document.createElement('div');

    spanishWords.slice(0).forEach(word =>{
        let li = document.createElement('li');
        li.textContent=word;
        ul.appendChild(li);
    });

    listado.innerHTML=''
    listado.appendChild(ul);
    console.log(listado)
    word.value =""
}

cargarMostrar()

document.addEventListener('DOMContentLoaded',()=>{
    
})