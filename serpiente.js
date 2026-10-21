// 1. Obtener el canvas y el contexto
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

// 2. Tamaño de cada celda
const TAMANIO_CELDA = 25;

// 3. Dibujar el tablero al cargar
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

    // PRUEBA 1: cuadrado en (5,5)
    pintarParte(5, 5);

    // PRUEBA 2: cuadrado en (10,2)
    pintarParte(10, 2);

    // PRUEBA 3: cuadrado pegado al borde inferior
    pintarParte(5, 23);

    // PRUEBA 4: cuadrado pegado al borde derecho
    pintarParte(23, 2);

    // PRUEBA 5: cuadrado pegado al borde izquierdo
    pintarParte(0, 8);

    // PRUEBA 6: cuadrado en una esquina diferente de (0,0)
    pintarParte(23, 23);
}

// 6. Dibujar la cuadrícula
function dibujarTablero() {
    ctx.strokeStyle = "#164e63";
    ctx.lineWidth = 1;

    // Líneas verticales
    for (let x = 0; x <= canvas.width; x = x + TAMANIO_CELDA) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // Líneas horizontales
    for (let y = 0; y <= canvas.height; y = y + TAMANIO_CELDA) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

// 7. Pintar una parte en las coordenadas indicadas
function pintarParte(lineaX, lineaY) {
    // Convertir las coordenadas de la cuadrícula
    // a posiciones reales dentro del canvas
    let posicionX = lineaX * TAMANIO_CELDA;
    let posicionY = lineaY * TAMANIO_CELDA;

    // Color de relleno
    ctx.fillStyle = "#ff2bd6";

    // Pintar el cuadrado
    ctx.fillRect(
        posicionX,
        posicionY,
        TAMANIO_CELDA,
        TAMANIO_CELDA
    );

    // Color del borde
    ctx.strokeStyle = "#00f0ff";
    ctx.lineWidth = 2;

    // Dibujar el borde del cuadrado
    ctx.strokeRect(
        posicionX,
        posicionY,
        TAMANIO_CELDA,
        TAMANIO_CELDA
    );
}