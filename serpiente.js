// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

// 2. Creamos la constante para el tamaño de cada celda
const TAMANIO_CELDA = 25;

// 3. Primera pintura del tablero al cargar la página
dibujarTodo();

// =========================
// FUNCIONES DE DIBUJO
// =========================

// 4. Función para limpiar el canvas
function limpiarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 5. Función para dibujar todo
function dibujarTodo() {
    limpiarCanvas();
    dibujarTablero();
}

// 6. Función para dibujar la cuadrícula
function dibujarTablero() {
    ctx.strokeStyle = "#164e63";
    ctx.lineWidth = 1;

    // Dibujar las líneas verticales
    for (let x = 0; x <= canvas.width; x = x + TAMANIO_CELDA) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // Dibujar las líneas horizontales
    for (let y = 0; y <= canvas.height; y = y + TAMANIO_CELDA) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}