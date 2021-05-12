//Esta clase la hago porque necesito guardar las coordenadas de los espacios en blanco. Probé de dibujar un circulo en la clase
//board pero me retorna null cuando quiero acceder a las propiedades.


class EmptySpace {

    constructor(posX, posY, radius, colour, context) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.colour = colour;
        this.chip = null;
        this.context = context;
    }


    draw() {
        // los circulos que conforman el tablero de juego
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.context.lineWidth = 2;
        this.context.strokeStyle = this.colour;
        this.context.stroke();
        this.context.closePath();

    }

    isHitted(clickedX, clickedY) {
        return Math.sqrt((clickedX - this.posX) ** 2 + (clickedY - this.posY) ** 2) < this.radius
    }










}