// 1. Obtener el canvas y su contexto
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

// 2. Tamaño de cada celda
const TAMANIO_CELDA = 25;

// 3. Crear el arreglo de la serpiente
const serpiente = [
    { x: 9, y: 10 },
    { x: 10, y: 10 },
    { x: 11, y: 10 },
    { x: 11, y: 11 }
];

// Dibujar el tablero al cargar la página
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

// 7. Pintar una parte de la serpiente
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

        // La última parte del arreglo será la cabeza
        if (indice == serpiente.length - 1) {
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