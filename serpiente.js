// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

// 2. Tamaño de cada celda
const TAMANIO_CELDA = 25;

// 3. Variables del juego
let serpiente = [];
let direccion = "derecha";
let siguienteDireccion = "derecha";
let puntaje = 0;
let velocidad = 150; // Variable de velocidad requerida (Punto 3)
let juegoActivo = false;
let intervalo = null;
let comida = { x: 15, y: 10 };

// FUNCIONALIDAD ADICIONAL NUEVA (Punto 4): Obstáculos estáticos en el tablero
let obstaculos = [];

// 4. Primera pintura del juego al cargar la página
reiniciarJuego();

// =========================
// FUNCIONES DE DIBUJO
// =========================

function limpiarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
    limpiarCanvas();
    dibujarTablero();
    pintarObstaculos();
    pintarComida();
    pintarSerpiente();
}

function dibujarTablero() {
    ctx.strokeStyle = "#164e63";
    ctx.lineWidth = 1;

    for (let x = 0; x <= canvas.width; x = x + TAMANIO_CELDA) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y <= canvas.height; y = y + TAMANIO_CELDA) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function pintarParte(lineaX, lineaY, color) {
    let posicionX = lineaX * TAMANIO_CELDA;
    let posicionY = lineaY * TAMANIO_CELDA;

    ctx.fillStyle = color;
    ctx.fillRect(posicionX, posicionY, TAMANIO_CELDA, TAMANIO_CELDA);

    ctx.strokeStyle = "#080d1c";
    ctx.lineWidth = 2;
    ctx.strokeRect(posicionX, posicionY, TAMANIO_CELDA, TAMANIO_CELDA);
}

// =========================
// SERPIENTE
// =========================

function pintarSerpiente() {
    for (let indice = 0; indice < serpiente.length; indice++) {
        if (indice == 0) {
            pintarParte(serpiente[indice].x, serpiente[indice].y, "#b6ff00");
        } else {
            pintarParte(serpiente[indice].x, serpiente[indice].y, "#ff2bd6");
        }
    }
}

// =========================
// OBSTÁCULOS (Funcionalidad Adicional)
// =========================

function generarObstaculosIniciales() {
    obstaculos = [
        { x: 8, y: 5 },
        { x: 15, y: 15 },
        { x: 5, y: 18 }
    ];
    document.getElementById("obstaculosCount").innerText = obstaculos.length;
}

function pintarObstaculos() {
    for (let i = 0; i < obstaculos.length; i++) {
        let posicionX = obstaculos[i].x * TAMANIO_CELDA;
        let posicionY = obstaculos[i].y * TAMANIO_CELDA;

        ctx.fillStyle = "#64748b"; // Color gris de bloque sólido
        ctx.fillRect(posicionX + 2, posicionY + 2, TAMANIO_CELDA - 4, TAMANIO_CELDA - 4);
    }
}

function agregarObstaculoNuevo() {
    let nuevoX = parseInt(Math.random() * (canvas.width / TAMANIO_CELDA));
    let nuevoY = parseInt(Math.random() * (canvas.height / TAMANIO_CELDA));

    // Validar que no caiga sobre la serpiente, comida u otro obstáculo
    for (let i = 0; i < serpiente.length; i++) {
        if (serpiente[i].x == nuevoX && serpiente[i].y == nuevoY) {
            agregarObstaculoNuevo();
            return;
        }
    }

    if (comida.x == nuevoX && comida.y == nuevoY) {
        agregarObstaculoNuevo();
        return;
    }

    obstaculos.push({ x: nuevoX, y: nuevoY });
    document.getElementById("obstaculosCount").innerText = obstaculos.length;
}

// =========================
// COMIDA
// =========================

function pintarComida() {
    let posicionX = comida.x * TAMANIO_CELDA;
    let posicionY = comida.y * TAMANIO_CELDA;

    ctx.fillStyle = "#ff4040";
    ctx.fillRect(
        posicionX + 3,
        posicionY + 3,
        TAMANIO_CELDA - 6,
        TAMANIO_CELDA - 6
    );
}

function generarComida() {
    comida.x = parseInt(Math.random() * (canvas.width / TAMANIO_CELDA));
    comida.y = parseInt(Math.random() * (canvas.height / TAMANIO_CELDA));

    // Validar que no caiga sobre la serpiente o los obstáculos
    for (let indice = 0; indice < serpiente.length; indice++) {
        if (comida.x == serpiente[indice].x && comida.y == serpiente[indice].y) {
            generarComida();
            return;
        }
    }

    for (let i = 0; i < obstaculos.length; i++) {
        if (comida.x == obstaculos[i].x && comida.y == obstaculos[i].y) {
            generarComida();
            return;
        }
    }
}

// =========================
// INICIAR Y REINICIAR
// =========================

function iniciarJuego() {
    if (juegoActivo == false) {
        juegoActivo = true;

        document.getElementById("estado").innerText = "Jugando";
        document.getElementById("mensaje").innerText = "¡Cuidado con los bloques grises!";

        intervalo = setInterval(moverSerpiente, velocidad);
    }
}

function reiniciarJuego() {
    clearInterval(intervalo);

    serpiente = [
        { x: 5, y: 10 },
        { x: 4, y: 10 },
        { x: 3, y: 10 }
    ];

    direccion = "derecha";
    siguienteDireccion = "derecha";
    puntaje = 0;
    juegoActivo = false;
    intervalo = null;

    comida = { x: 15, y: 10 };
    generarObstaculosIniciales();

    document.getElementById("puntaje").innerText = puntaje;
    document.getElementById("estado").innerText = "Listo";
    document.getElementById("mensaje").innerText = "Presiona iniciar para comenzar.";

    dibujarTodo();
}

// =========================
// PAUSAR JUEGO
// =========================

function pausarJuego() {
    if (juegoActivo == true) {
        clearInterval(intervalo);
        juegoActivo = false;

        document.getElementById("estado").innerText = "Pausado";
        document.getElementById("mensaje").innerText = "Presiona iniciar para continuar.";
    } else {
        iniciarJuego();
    }
}

// =========================
// CAMBIAR DIRECCIÓN
// =========================

function cambiarDireccion(nuevaDireccion) {
    if (nuevaDireccion == "arriba" && direccion != "abajo") siguienteDireccion = "arriba";
    if (nuevaDireccion == "abajo" && direccion != "arriba") siguienteDireccion = "abajo";
    if (nuevaDireccion == "izquierda" && direccion != "derecha") siguienteDireccion = "izquierda";
    if (nuevaDireccion == "derecha" && direccion != "izquierda") siguienteDireccion = "derecha";
}

document.addEventListener("keydown", function(evento) {
    if (evento.key == "ArrowUp") cambiarDireccion("arriba");
    if (evento.key == "ArrowDown") cambiarDireccion("abajo");
    if (evento.key == "ArrowLeft") cambiarDireccion("izquierda");
    if (evento.key == "ArrowRight") cambiarDireccion("derecha");
});

// =========================
// MOVIMIENTO DE LA SERPIENTE
// =========================

function moverSerpiente() {
    direccion = siguienteDireccion;

    let cabeza = {
        x: serpiente[0].x,
        y: serpiente[0].y
    };

    if (direccion == "arriba") cabeza.y--;
    if (direccion == "abajo") cabeza.y++;
    if (direccion == "izquierda") cabeza.x--;
    if (direccion == "derecha") cabeza.x++;

    // Comprobar bordes
    if (cabeza.x < 0 || cabeza.y < 0 || cabeza.x >= canvas.width / TAMANIO_CELDA || cabeza.y >= canvas.height / TAMANIO_CELDA) {
        terminarJuego();
        return;
    }

    // Comprobar choque con el cuerpo
    for (let indice = 0; indice < serpiente.length; indice++) {
        if (cabeza.x == serpiente[indice].x && cabeza.y == serpiente[indice].y) {
            terminarJuego();
            return;
        }
    }

    // Comprobar choque con los obstáculos (Funcionalidad Adicional)
    for (let i = 0; i < obstaculos.length; i++) {
        if (cabeza.x == obstaculos[i].x && cabeza.y == obstaculos[i].y) {
            terminarJuego();
            return;
        }
    }

    serpiente.unshift(cabeza);

    // Comprobar si comió
    if (cabeza.x == comida.x && cabeza.y == comida.y) {
        puntaje = puntaje + 10;
        document.getElementById("puntaje").innerText = puntaje;

        // Cada 30 puntos agregamos un nuevo obstáculo al tablero
        if (puntaje % 30 == 0) {
            agregarObstaculoNuevo();
            document.getElementById("mensaje").innerText = "¡Nuevo obstáculo añadido al mapa!";
        }

        generarComida();
    } else {
        serpiente.pop();
    }

    dibujarTodo();
}

// =========================
// FIN DEL JUEGO
// =========================

function terminarJuego() {
    clearInterval(intervalo);
    juegoActivo = false;

    document.getElementById("estado").innerText = "Game Over";
    document.getElementById("mensaje").innerText = "Fin del juego. Presiona Reiniciar.";

    dibujarTodo();
}