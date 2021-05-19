class Board {


    constructor(context) {
        this.context = context;
        this.chips = [];
        this.board = [
            []
        ]; // representa el tablero donde voy a dibujar los espacios en blanco
        this.row = 5;
        this.col = 8;
        this.moves = 40;
        this.turn = true;
        this.tie = false;
        this.winner = false;

        this.createBoard();


    }

    draw() {

        this.boardBackground();
        this.drawTitle(270, 50, 'Four Up - TPE_2 User Interfaces', '40px verdana', "#18a4e1");
        this.drawTitle(500, 80, 'Insert chips on top', '20px helvetica', "#000000");

        for (let row = 0; row < this.row; row++) {
            for (let col = 0; col < this.col; col++) {
                this.board[col][row].draw();
            }
        }

        this.chips.forEach(chip => {
            chip.drawImage();

        })

        if (this.turn) { //Muestra quien juega
            this.drawTitle(25, 100, 'Red plays', '25px verdana', "#FF0000");

        } else {
            this.drawTitle(1050, 100, 'Blue plays', '25px verdana', "#0000FF");

        }

        if (this.tie) {
            this.endGame();
            this.showModal('¡¡Ups!!', 'There is a tie')
        } else {
            if (this.winner) {

                this.endGame();
                if (!this.turn) {

                    this.showModal('¡¡You win!!', 'RED');
                } else {
                    this.showModal('¡¡You win!!', 'BLUE');

                }
            }
        }
    }

    getSelectedChip(clickedX, clickedY) {
        for (let index = 0; index < this.chips.length; index++) {
            if (this.turn) {

                if (this.chips[index].isHitted(clickedX, clickedY) && (this.chips[index].getColour() == "#FF0000") && (this.chips[index].isMovable() && (!this.chips[index].isPlaced()))) {
                    this.changeChipsState(false); //Estas lineas no permiten que seleccionar otra ficha hasta no dejarla en el tablero
                    this.chips[index].setMovable(true); //Vuelvo todas inamovibles excepto la que ya toqué
                    return this.chips[index];
                }
            } else {
                if (this.chips[index].isHitted(clickedX, clickedY) && (this.chips[index].getColour() == "#0000FF") && (this.chips[index].isMovable() && (!this.chips[index].isPlaced()))) {
                    this.changeChipsState(false); //Estas lineas no permiten que seleccionar otra ficha hasta no dejarla en el tablero
                    this.chips[index].setMovable(true); //Vuelvo todas inamovibles excepto la que ya toqué
                    return this.chips[index];
                }
            }
        }
        return null;
    }


    createBoard() { //crea la matriz con los espacios en blanco

        let x = 0;
        let y = 0;
        let posX = 0;
        let posY = 0;

        for (let row = 0; row < 640; row += 90) {

            this.board[x] = [];
            y = 0;
            for (let col = 0; col < 400; col += 90) {
                posX = row + 285;
                posY = col + 145;
                let emptySpace = new EmptySpace(posX, posY, 35, this.context);
                this.board[x][y] = emptySpace;
                y++;
            }
            x++;
        }
        this.createPlayerChips(80, 150, "#FF0000"); //Crea 20 fichas de color rojo
        this.createPlayerChips(1100, 150, "#0000FF"); //Crea 20 fichas de color azul
    }


    createPlayerChips(x, y, colour) { //crea las fichas
        let image = new Image();
        image.src = "img/chip.png";
        image.onload = () => {
            for (let i = 0; i < 20; i++) {
                let chip = new Chip(x, y, colour, image, 35, this.context);
                this.chips.push(chip);
                let pos = this.chips.indexOf(chip);

                chip.drawImage();
                y += 20;
            }
        }
    }


    boardBackground() { // fondo del board

        this.context.beginPath();
        this.context.strokeRect(219, 97, 750, 450);
        this.context.fillStyle = "#18a4e1";
        this.context.fillRect(219, 97, 750, 450);
        this.context.closePath();
    }


    drawTitle(x, y, text, font, colour) {

        this.context.beginPath();
        this.context.lineCap = "butt";
        this.context.lineWidth = 2;
        this.context.fillStyle = colour;
        this.context.font = font;
        this.context.strokeText(text, x, y);
        this.context.fillText(text, x, y);
        this.context.closePath();
    }


    detectColumn(clickedX, clickedY, chip) { //Arreglo con las posiciones(columnas) válidas para insertar una ficha
        let col1 = this.board[0][0];
        let col2 = this.board[1][0];
        let col3 = this.board[2][0];
        let col4 = this.board[3][0];
        let col5 = this.board[4][0];
        let col6 = this.board[5][0];
        let col7 = this.board[6][0];
        let col8 = this.board[7][0];
        let cols = [col1, col2, col3, col4, col5, col6, col7, col8];

        for (let index = 0; index < cols.length; index++) {
            if (cols[index].isHitted(clickedX, clickedY)) {
                return index;
            }
        }
        return -1;
    }

    showModal(modalTitle, modalMessage) {
        $("#modalTitle").text(modalTitle);
        $("#modalMessage").text(modalMessage);
        $("#modalCenter").modal("show");
    }

    lastPosition(col) { // traigo la última posicion ocupada para saber donde insertar la ficha

        let colum = this.board[col];

        for (let index = colum.length - 1; index >= 0; index--) {
            if (colum[index].getChip() == null) {
                return [colum[index], col, index]; //Me devuleve un arreglo de Objeto/atributos.x=col, y=index;;
            }
        }
        return null;
    }


    dropChip(chip, clickedX, clickedY) {


        let col = this.detectColumn(clickedX, clickedY);

        if ((col != -1) && (col != null) && (!this.winner)) {

            let emptySpace = this.lastPosition(col);
            let posX = emptySpace[0].posX;
            let posY = emptySpace[0].posY;
            let x = emptySpace[1];
            let y = emptySpace[2];


            let pos = this.chips.indexOf(chip);
            chip.move(posX, posY);
            this.changeChipsState(true); //Si coloco una ficha al esto las vuelvo movibles
            this.board[x][y].setChip(chip);
            this.chips[pos].setIsPlaced(); //Y a la que inserté la vuelvo inamovible.
            this.thereIsAWinner(chip);
            this.setTurn();
            this.moves--;


        }
        if ((!this.winner && (this.moves == 0))) { //empate
            this.tie = true;
        }

    }

    changeChipsState(movable) {
        this.chips.forEach(chip => {
            chip.setMovable(movable);
        });
    }


    setTurn() { // cambia el valor del turno

        this.turn = !this.turn;
    }


    /*
    Estos métodos para comprobar si hay ganador recorren siempre toda la matriz en busca de  coincidencias. 
	Los adapté del mismo juego pero realizado en JAVA como TP especial para programación1 libre
    Para mejorar:  que la comprobación se haga desde la última ficha insertada. 
	*/

    //BUSCA MATCHING HORIZONTAL
    horizontalMatching(chip) {

        let count = 0;
        let match = false;

        for (let row = 0; row < this.row; row++) {
            count = 0;
            for (let col = 0; col < this.col; col++) {
                if (this.board[col][row].getChip() != null && this.board[col][row].getColour() == chip.getColour()) {
                    count++;
                    if (count == 4) {
                        match = true;
                    }
                } else {
                    count = 0;
                }
            }
        }
        return match;
    }

    //BUSCA MATCHING VERTICAL

    columnMatching(chip) {

        let count = 0;
        let match = false;

        for (let col = 0; col < this.col; col++) {
            count = 0;
            for (let row = 0; row < this.row; row++) {
                if (this.board[col][row].getChip() != null && this.board[col][row].getColour() == chip.getColour()) {
                    count++;
                    if (count == 4) {
                        match = true;
                    }
                } else {
                    count = 0;
                }
            }
        }
        return match;
    }


    //BUSCA MATCHING EN DIAGONALES

    diagonalMatching(chip) {

        /*
         *Para buscar en la diagonal primaria comienzo en la primer columna y ultima fila. Cada vez que me desplazo con los For uso los while para trazar
         *las diagonales umando 1 a row y col.
         *Para la diagonal secundaria comienzo desde la ultima fila y columna. Me desplazo hacia arriba con el for y trazo la diagonal. En este caso restando
         *1 a row y col.		
         */
        let count;
        let maxF = this.row - 1;
        let maxC = this.col - 1;
        let match = false;

        for (let col = 0; col <= maxC; col++) { // busca en el plano de la diagonal primaria
            for (let row = maxC; row >= 0; row--) {
                count = 0;
                if (col == 0 || row == 0) {
                    let auxC = col;
                    let auxF = row;
                    while ((auxC <= (maxC)) && (auxF <= (maxF))) {
                        if (this.board[auxC][auxF].getChip() != null && this.board[auxC][auxF].getColour() == chip.getColour()) {
                            count++;
                            if (count == 4) {
                                match = true;
                            }
                        } else {
                            count = 0;
                        }
                        auxF++;
                        auxC++;
                    }
                }
            }
        }

        if (!match) { // busca en el plano de la diagonal secundaria
            for (let col = maxC; col >= 0; col--) {
                for (let row = maxF; row >= 0; row--) {
                    count = 0;
                    if (col == 0 || row == 0) {
                        let auxC = col;
                        let auxF = row;
                        while ((auxC >= 0) && (auxF <= (maxF))) {
                            if (this.board[auxC][auxF].getChip() != null && this.board[auxC][auxF].getColour() == chip.getColour()) {
                                count++;
                                if (count == 4) {
                                    match = true;
                                }
                            } else {
                                count = 0;
                            }
                            auxF++;
                            auxC--;
                        }
                    }
                }
            }
        }
        return match;

    }



    thereIsAWinner(chip) {

        if (this.horizontalMatching(chip) || this.columnMatching(chip) || this.diagonalMatching(chip)) {
            return this.winner = true;

        } else {
            return this.winner = false;
        }
    }

    endGame() {
        this.chips.forEach(chip => {
            chip.setMovable();
        });
    }


}