// 1. Obtener el canvas y su contexto
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

// 2. Tamaño de cada celda
const TAMANIO_CELDA = 25;

// 3. Crear el arreglo de la serpiente (la cabeza se ubica en el índice 0 al usar unshift)
let serpiente = [
    { x: 11, y: 11 },
    { x: 11, y: 10 },
    { x: 10, y: 10 },
    { x: 9, y: 10 }
];

// Variables globales para la comida, puntaje y control del juego
let comida = { x: 0, y: 0 };
let puntaje = 0;
let direccionActual = "derecha";
let intervaloSerpiente = null;

// Dibujar el tablero y la comida inicial al cargar la página
pintarComida();
dibujarTodo(); 

// ==============================
// FUNCIONES DEL TABLERO
// ==============================

// 4. Limpiar el canvas
function limpiarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 5. Dibujar todos los elementos
function dibujarTodo() {
    limpiarCanvas();
    dibujarTablero();
    pintarSerpiente();
    // Dibujar la comida usando un color diferente (ej. naranja)
    pintarParte(comida.x, comida.y, "#ff5722");
}

// 6. Dibujar la cuadrícula
function dibujarTablero() {
    ctx.strokeStyle = "#164e63";
    ctx.lineWidth = 1;

    // Líneas verticales
    for (
        let x = 0;
        x <= canvas.width;
        x = x + TAMANIO_CELDA
    ) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // Líneas horizontales
    for (
        let y = 0;
        y <= canvas.height;
        y = y + TAMANIO_CELDA
    ) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

// 7. Pintar una parte de la serpiente o la comida
function pintarParte(lineaX, lineaY, color) {
    let posicionX = lineaX * TAMANIO_CELDA;
    let posicionY = lineaY * TAMANIO_CELDA;

    // Color del cuadrado
    ctx.fillStyle = color;

    // Pintar el cuadrado
    ctx.fillRect(
        posicionX,
        posicionY,
        TAMANIO_CELDA,
        TAMANIO_CELDA
    );

    // Borde del cuadrado
    ctx.strokeStyle = "#080d1c";
    ctx.lineWidth = 1;

    ctx.strokeRect(
        posicionX,
        posicionY,
        TAMANIO_CELDA,
        TAMANIO_CELDA
    );
}

// ==============================
// FUNCIONES DE LA SERPIENTE
// ==============================

// 8. Recorrer y pintar la serpiente
function pintarSerpiente() {
    for (let indice = 0; indice < serpiente.length; indice++) {
        // La cabeza ahora es el primer elemento del arreglo (índice 0)
        if (indice === 0) {
            pintarParte(
                serpiente[indice].x,
                serpiente[indice].y,
                "#b6ff00"
            );
        } else {
            // El resto del arreglo será el cuerpo
            pintarParte(
                serpiente[indice].x,
                serpiente[indice].y,
                "#ff2bd6"
            );
        }
    }
}

// Partes 1 y 3: Funciones de movimiento en las 4 direcciones
function moverDerecha() {
    const cabeza = serpiente[0];
    const nuevaCabeza = { x: cabeza.x + 1, y: cabeza.y };
    serpiente.unshift(nuevaCabeza);
}

function moverIzquierda() {
    const cabeza = serpiente[0];
    const nuevaCabeza = { x: cabeza.x - 1, y: cabeza.y };
    serpiente.unshift(nuevaCabeza);
}

function moverArriba() {
    const cabeza = serpiente[0];
    const nuevaCabeza = { x: cabeza.x, y: cabeza.y - 1 };
    serpiente.unshift(nuevaCabeza);
}

function moverAbajo() {
    const cabeza = serpiente[0];
    const nuevaCabeza = { x: cabeza.x, y: cabeza.y + 1 };
    serpiente.unshift(nuevaCabeza);
}

// Parte 2 y 7: Actualizar la dirección actual desde los botones
function cambiarDireccion(direccion) {
    direccionActual = direccion;
}

// Partes 4, 5 y 6: Control de intervalos (Iniciar y Pausar)
function iniciarJuego() {
    document.getElementById("estado").innerText = "Jugando";
    if (!intervaloSerpiente) {
        intervaloSerpiente = setInterval(moverSerpiente, 1000);
    }
}

function pausarJuego() {
    document.getElementById("estado").innerText = "Pausado";
    clearInterval(intervaloSerpiente);
    intervaloSerpiente = null;
}

function reiniciarJuego() {
    pausarJuego();
    serpiente = [
        { x: 11, y: 11 },
        { x: 11, y: 10 },
        { x: 10, y: 10 },
        { x: 9, y: 10 }
    ];
    puntaje = 0;
    document.getElementById("puntaje").innerText = puntaje;
    document.getElementById("estado").innerText = "Listo";
    direccionActual = "derecha";
    pintarComida();
    dibujarTodo();
}

// Partes 7, 8, 9 y 10: Lógica principal de movimiento, comida y crecimiento
function moverSerpiente() {
    // 1. Mover según la dirección actual guardada
    if (direccionActual === "derecha") {
        moverDerecha();
    } else if (direccionActual === "izquierda") {
        moverIzquierda();
    } else if (direccionActual === "arriba") {
        moverArriba();
    } else if (direccionActual === "abajo") {
        moverAbajo();
    }

    // 2. Detectar si atrapa la comida (Parte 9 y 10)
    if (atrapaComida()) {
        puntaje++;
        document.getElementById("puntaje").innerText = puntaje;
        pintarComida(); // Generar nueva comida y mantener tamaño (crecimiento por no hacer pop)
    } else {
        // Si no come, elimina el último elemento para simular el desplazamiento
        serpiente.pop();
    }

    // 3. Redibujar todo en el canvas
    dibujarTodo();
}

// Parte 8: Generar posiciones aleatorias para la comida
function pintarComida() {
    const columnasMax = canvas.width / TAMANIO_CELDA;
    const filasMax = canvas.height / TAMANIO_CELDA;

    comida.x = Math.floor(Math.random() * columnasMax);
    comida.y = Math.floor(Math.random() * filasMax);
}

// Parte 9: Detectar colisión con la comida
function atrapaComida() {
    const cabeza = serpiente[0];
    if (cabeza.x === comida.x && cabeza.y === comida.y) {
        return true;
    }
    return false;
}