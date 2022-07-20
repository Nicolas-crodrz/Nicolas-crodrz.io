


const canvas = document.getElementById('particulas'); // Obtenemos el canvas
const ctx = canvas.getContext('2d'); 
canvas.width = window.innerWidth; 
canvas.height = window.innerHeight; 

let ArrayParticulas;

let mouse = {

  x: null,

  y: null,

  radius: (canvas.height / 80) * (canvas.width / 80)

};

window.addEventListener('mousemove', function (event) {

  mouse.x = event.x;

  mouse.y = event.y;

});


// Crear particulas
class Particula {

  constructor(x, y, direccionX, direccionY, size, color) {

    this.x = x;

    this.y = y;

    this.direccionX = direccionX;

    this.direccionY = direccionY;

    this.size = size;

    this.color = color;

  }

  // Funcion que dibuja la particula

  draw() { // Dibuja la particula

    ctx.beginPath(); // Inicia el camino

    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); // Dibuja una circunferencia

    ctx.fillStyle = '#FFF'; // Establece el color de la circunferencia

    ctx.fill(); // Rellena la circunferencia
    
  }

  // Funcion que actualiza la posicion de la particula
  update() {

    if (this.x > canvas.width || this.x < 0) {
      this.direccionX = -this.direccionX;
    }

    if (this.y > canvas.height || this.y < 0) {
      this.direccionY = -this.direccionY;
    }

    // detectar colisiones - posiciones del mouse - posiciones de la particula

    let dx = mouse.x - this.x; // Distancia entre el mouse y la particula

    let dy = mouse.y - this.y; // Distancia entre el mouse y la particula

    let distance = Math.sqrt(dx * dx + dy * dy); // Distancia entre el mouse y la particula

    if (distance < mouse.radius + this.size) { // Si la distancia es menor a la suma de los radios

      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) { // Si el mouse esta a la izquierda de la particula

        this.x += 10; // Mover la particula a la derecha
      }
      if (mouse.x > this.x && this.x > this.size * 10) { // Si el mouse esta a la derecha de la particula

        this.x -= 10; // Mover la particula a la izquierda
      }
      if (mouse.y < this.y && this.y < canvas.height - this.size * 10) { // Si el mouse esta arriba de la particula

        this.y += 10; // Mover la particula abajo
      }
      if (mouse.y > this.y && this.y > this.size * 10) { // Si el mouse esta abajo de la particula

        this.y -= 10; // Mover la particula arriba
      }

    }

    // Actualizar posicion de la particula

    this.x += this.direccionX;

    this.y += this.direccionY;

    // Dibujar la particula
    this.draw();

  }
}


// Crear array de particulas

function init() { // Funcion que init
  ArrayParticulas = [];  // Creamos un array de particulas
  let numeroParticulas = (canvas.height * canvas.width) / 50000; // Numero de particulas

  for (let i = 0; i < numeroParticulas; i++) { // Recorremos el array

    let size = (Math.random() * 5) + 1; // Tamaño de la particula
    let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2); // Posicion x de la particula
    let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2); // Posicion y de la particula
    let direccionX = (Math.random() * 5) - 2.5; // Direccion x de la particula
    let direccionY = (Math.random() * 5) - 2.5; // Direccion y de la particula
    //let color = '#8C5523'; // Color de la particula

    let color = '#' + Math.floor(Math.random() * 16777215).toString(16); // Color de la particula

    ArrayParticulas.push(new Particula(x, y, direccionX, direccionY, size, color)); // Añadimos la particula al array

  }
}



function connexion() { // Funcion conexion
  let valorOpacidad = 1; // Opacidad de la particula
  for (let a = 0; a < ArrayParticulas.length; a++) { // Recorremos el array

    for (let b = a; b < ArrayParticulas.length; b++) { // Recorremos el array

      let distance = ((ArrayParticulas[a].x - ArrayParticulas[b].x) *  
                       (ArrayParticulas[a].x - ArrayParticulas[b].x)) + 
                      ((ArrayParticulas[a].y - ArrayParticulas[b].y) * 
                       (ArrayParticulas[a].y - ArrayParticulas[b].y)); // Distancia entre las particulas

      if (distance < (canvas.width / 7) * (canvas.height / 7)) { // Si la distancia es menor a la suma de los radios

        valorOpacidad = 3 - (distance/20000); // Opacidad de la particula

        ctx.strokeStyle = 'rgba(80, 243, 250, ' + valorOpacidad + ')';  // establece el color de la linea

        ctx.lineWidth = 1; // Establece el grosor de la linea

        ctx.beginPath(); // Inicia el camino

        ctx.moveTo(ArrayParticulas[a].x, ArrayParticulas[a].y); // Posicion inicial de la linea

        ctx.lineTo(ArrayParticulas[b].x, ArrayParticulas[b].y); // Posicion final de la linea

        ctx.stroke(); // Dibuja la linea

      }
    }
  }
}


// animacion de la particula en loop

function animacion() { // Funcion animacion

  requestAnimationFrame(animacion); // Solicita una animacion

  ctx.clearRect(0, 0, innerWidth, innerHeight); // Limpia el canvas

  for (let i = 0; i < ArrayParticulas.length; i++) { // Recorremos el array

    ArrayParticulas[i].update(); // Actualizamos la posicion de la particula

  }

  connexion(); // Actualizamos la conexion de las particulas

}


window.addEventListener('recolocar', function () { // Evento recolocar

  canvas.width = innerWidth; // Establece el ancho del canvas

  canvas.height = innerHeight; // Establece el alto del canvas

  mouse.radius = (canvas.height / 80) * (canvas.height / 80); // Establece el radio del mouse

  init(); // Iniciamos la animacion


});


window.addEventListener('mouseout', function(){ // Evento mouseout

  mouse.x = undefined; // Establece el x del mouse

  mouse.y = undefined; // Establece el y del mouse

});

init(); // Iniciamos la animacion

animacion(); // Iniciamos la animacion


// particulas responsive


window.addEventListener('resize', function () { // Evento resize

  canvas.width = innerWidth; // Establece el ancho del canvas

  canvas.height = innerHeight; // Establece el alto del canvas

  mouse.radius = (canvas.height / 80) * (canvas.height / 80); // Establece el radio del mouse

  init(); // Iniciamos la animacion


});