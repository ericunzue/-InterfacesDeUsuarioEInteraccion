class Board {


    constructor(context) {
        this.context = context;
        this.chips = [];
        this.board = [
            []
        ]; // representa el tablero donde voy a dibujar los espacios en blanco
        this.row = 5;
        this.col = 8;
        this.createPlayerChips(80, 150, "#FF0000"); //Crea 20 fichas de color rojo
        this.createPlayerChips(1100, 150, "#0000FF"); //Crea 20 fichas de color azul
        this.createBoard();

    }

    draw() {

        this.chips.forEach(chip => {
            chip.draw();
        })
        this.createBoard();

    }

    getSelectedChip(clickedX, clickedY) {
        for (let index = 0; index < this.chips.length; index++) {
            if (this.chips[index].isHitted(clickedX, clickedY)) {
                return this.chips[index];
            }
        }
        return null;
    }

    createBoard() {

        let x = 0;
        let y = 0;
        let posX = 0;
        let posY = 0;
        let colour = "#000000";
        for (let row = 0; row < 640; row += 90) {

            this.board[x] = [];
            y = 0;
            for (let col = 0; col < 400; col += 90) {
                posX = row + 285;
                posY = col + 145;
                let emptySpace = new EmptySpace(posX, posY, 35, colour, this.context);
                this.board[x][y] = emptySpace;
                this.board[x][y].draw();

                y++;
            }
            x++;
        }
    }





    createPlayerChips(x, y, colour) { //crea las fichas

        for (let i = 0; i < 20; i++) {
            let chip = new Chip(x, y, colour, 35, this.context);
            this.chips.push(chip);
            y += 20;
        }
    }


    detectColumn(clickedX, clickedY, chip) { //Hice un arreglo con las posiciones validas para insertar una ficha
        let col1 = this.board[0][0];
        let col2 = this.board[1][0];
        let col3 = this.board[2][0];
        let col4 = this.board[3][0];
        let col5 = this.board[4][0];
        let col6 = this.board[5][0];
        let col7 = this.board[6][0];
        let col8 = this.board[7][0];
        let columnas = [col1, col2, col3, col4, col5, col6, col7, col8];



        for (let index = 0; index < columnas.length; index++) {
            if (columnas[index].isHitted(clickedX, clickedY)) {

                return index;

            }
        }


    }

    lastPosition(col) { // traigo la última posicion ocupada para saber donde insertar la ficha
        let i = 0;
        let columnas = this.board[col];

        for (let index = columnas.length - 1; index > 0; index--) {

            if (columnas[index].chip == null) {

                return [columnas[index], col, index];
            }
        }
        return null;
    }




    // dropChip(chip, col, clickedX, clickedY) {

    //     let i = 0;
    //     let maxR = this.row - 1;
    //     let completeCol = true;

    //     while ((i <= maxR) && (this.board[col][i].emptySpace.chip == null)) {
    //         i++;
    //         columnaCompleta = true;
    //     }
    //     this.board[col][i - 1] = chip;
    //     chip.move(clickedX, clickedY);
    //     columnaCompleta = false;


    // }



}