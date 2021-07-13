// variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// event listeners
eventListeners();
function eventListeners() {
    // cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // cuando el documento inicia
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        // console.log(tweets);
        crearHTML();
    });
}

// funciones
function agregarTweet(e) {
    e.preventDefault();
    // console.log('aregando tweet');

    // text area donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;
    
    // validación
    if(tweet === "") {
        // console.log('no puede ir vacío');
        mostrarError('Texto no válido');
        return; // evita que se ejecuten más líneas de código
    }

    const error = document.querySelector('p.error');
    if(error) {
        error.remove();
    }

    const tweetObj = {
        id: Date.now(),
        texto: tweet
        /* 
           tweet: tweet Ó
           tweet 
        */
    }

    // añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];
    
    // una vez agregado, crear html
    crearHTML();

    // reinciar el formulario
    formulario.reset();
}

function sincronizarStorage() {
    // agrega los tweets actuales a localStorage
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // insertarlo en el contenido
    const contenido = document.querySelector('#contenido');

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0) {
        // agregar el mensaje de error al html
        contenido.appendChild(mensajeError);
        /* .length solo existe en querySalectorAll */
    }

    // elimina la alerta después de 3s
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

// muestra un listado de los tweets
function crearHTML() {
    limpiarHTML();
    if(tweets.length > 0) {
        tweets.forEach( tweet => {
            // agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            // añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            // crear el HTML
            const li = document.createElement('li');
            li.textContent = tweet.texto;

            // asignar el boton
            li.appendChild(btnEliminar);

            // insertarlo en el html
            listaTweets.appendChild(li);
        });
    }
    sincronizarStorage();
}

function borrarTweet(id) {
    // console.log('tweet borrado', id);
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}

// limpiar el html
function limpiarHTML() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}