document.addEventListener('DOMContentLoaded', () => {
    //ELEMENTOS DEL DOM
    let listado = document.querySelector(".list_of_words");
    let inputWordSpanish = document.querySelector(".wordSpanish");
    let inputWordEnglish = document.querySelector(".wordEnglish");
    let buttonCargar = document.querySelector(".cargar");
    let buttonHome = document.querySelector(".home");

    //Mostrando lista armada
    function showList() {
        let localWordsSpanish = JSON.parse(localStorage.getItem('list_words_spanish')) || []
        let localWordsEnglish = JSON.parse(localStorage.getItem('list_words_english')) || []

        listado.innerHTML = '';
        console.log("*************   Mostrando listas   *****************")
        console.log(localWordsSpanish)
        console.log(localWordsEnglish)

        let ul = document.createElement('ul');
        //ul.style.listStyleType = 'none';

        localWordsSpanish.forEach((word, index) => {
            let li = document.createElement('li');
            li.className = 'lista'

            let span = document.createElement('span')
            let span2 = document.createElement('span')

            span.className = 'span'
            span2.className = 'span2'

            let label = document.createElement('label')
            let botonX = document.createElement('button')

            label.textContent = word
            botonX.textContent = "X";
            botonX.id = `btn-${index}`
            botonX.className = 'btn btn-danger btn-sm prueba';

            botonX.addEventListener('click', function () {
                localWordsSpanish.splice(index, 1);
                localStorage.setItem('list_words_spanish', JSON.stringify(localWordsSpanish));
                localWordsEnglish.splice(index, 1);
                localStorage.setItem('list_words_english', JSON.stringify(localWordsEnglish));
                showList()
            });

            span.appendChild(label);
            span2.appendChild(botonX);
            li.appendChild(span)
            li.appendChild(span2)
            ul.appendChild(li);
        });
        listado.appendChild(ul);
    }
    //Guardar la lista en LocalStorage
    function saveWordsSpanish(word) {
        console.log("Guardando palabras en español en el LocalStorage");
        console.log("Palabra: " + word.value);
        localStorage.setItem('list_words_spanish', JSON.stringify(word));
    }
    function saveWordsEnglish(word) {
        console.log("Guardando palabras en ingles en el LocalStorage");
        console.log("Palabra: " + word.value);
        localStorage.setItem('list_words_english', JSON.stringify(word));
    }

    //Cargando palabras a la lista
    function loadWords() {
        let listSpanishLocal = JSON.parse(localStorage.getItem('list_words_spanish')) || []
        let listEnglishLocal = JSON.parse(localStorage.getItem('list_words_english')) || []

        console.log("Cargando palabras");

        if (inputWordSpanish.value.trim() != "" && inputWordEnglish.value.trim() != "") {
            listSpanishLocal.push(inputWordSpanish.value.trim().toLowerCase());
            listEnglishLocal.push(inputWordEnglish.value.trim().toLowerCase());
            console.log(listEnglishLocal);
            console.log(listSpanishLocal);
            saveWordsSpanish(listSpanishLocal);
            saveWordsEnglish(listEnglishLocal);
            inputWordSpanish.value = ""
            inputWordEnglish.value = ""
            inputWordSpanish.focus();
        } else {
            console.log("Debe ingresar palabras")
            alert("Debe ingresar palabras")
        }
        showList()
    }


    //EVENTOS
    buttonCargar.addEventListener('click', loadWords);

    document.addEventListener('keydown', function (event) {
        if (event.ctrlKey && event.key === 'ArrowLeft') {
            window.history.back();
            event.preventDefault();
        }
    });
    buttonHome.addEventListener('click', function (event) {
        window.history.back();
    });

    inputWordSpanish.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            buttonCargar.click();
        }
    });

    inputWordEnglish.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evita el comportamiento por defecto de la tecla Enter
            buttonCargar.click(); // Simula un clic en el botón
        }
    });

    // INICIALIZACIÓN
    inputWordSpanish.focus();
    showList();
})