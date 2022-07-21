
window.addEventListener('scroll', function() { // hace que el scroll se active

    let sobreMi = document.getElementById('sobreMi'); // obtiene el id del elemento
    let sobreMiPos = sobreMi.getBoundingClientRect().top; // obtiene la posicion del elemento

    let izq = document.getElementById('izq'); // obtiene el id del elemento
    let izqPos = izq.getBoundingClientRect().top; // obtiene la posicion del elemento

    let der = document.getElementById('der'); // obtiene el id del elemento
    let derPos = der.getBoundingClientRect().top; // obtiene la posicion del elemento

    let titulo = document.getElementById('encabezado'); // obtiene el id del elemento
    let tituloPos = titulo.getBoundingClientRect().top; // obtiene la posicion del elemento



    let pantalla = window.innerHeight / 1.5; // obtiene la altura de la pantalla
    

    if (sobreMiPos < pantalla) { // si la pos del elemento es menor a la altura de la pantalla

      sobreMi.style.animation = 'aparecer 1.5s ease-in-out forwards'; // ejecuta la animacion

    }else{ // si no

      sobreMi.style.opacity = '0'; // oculta el elemento

    }

    if (izqPos < pantalla) { // si la pos del elemento es menor a la altura de la pantalla

      izq.style.animation = 'aparecer 1.5s ease-in-out forwards'; // ejecuta la animacion

    }else{ // si no

      izq.style.opacity = '0'; // oculta el elemento

    }

    if (derPos < pantalla) { // si la pos del elemento es menor a la altura de la pantalla

      der.style.animation = 'aparecer2 1.5s ease-in-out forwards'; // ejecuta la animacion

    }else{ // si no

      der.style.opacity = '0'; // oculta el elemento

    }


    if (tituloPos < pantalla) { // si la pos del elemento es menor a la altura de la pantalla

      titulo.style.animation = 'aparecer 1s ease-in forwards'; // ejecuta la animacion

    }else{ // si no

      titulo.style.opacity = '0'; // oculta el elemento

    }
});




