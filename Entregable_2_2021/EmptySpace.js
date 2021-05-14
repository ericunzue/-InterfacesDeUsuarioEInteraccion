//Esta clase la hago porque necesito guardar las coordenadas de los espacios en blanco. Probé de dibujar un circulo en la clase
//board pero me retorna null cuando quiero acceder a las propiedades.


class EmptySpace {

    //posible mejora: guardar X e Y de este espacio como atributo. Que el objeto guarde toda la información que pueda necesitar.
    constructor(posX, posY, radius, colour, context) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.colour = 'white';
        this.chip = null;
        this.context = context;
    }


    draw() {
        // los circulos que conforman el tablero de juego
        this.context.fillStyle = this.colour;
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.context.fill();
        this.context.closePath();

        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.context.stroke();
        this.context.closePath();
    }

    isHitted(clickedX, clickedY) {
        return Math.sqrt((clickedX - this.posX) ** 2 + (clickedY - this.posY) ** 2) < this.radius
    }

    setChip(chip) {
        this.chip = chip;
    }

    getChip() {
        return this.chip;
    }

    getColour() {
        return this.chip.getColour();
    }









}