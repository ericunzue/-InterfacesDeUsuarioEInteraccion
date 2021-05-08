class Board {
    constructor(context) {
        this.context = context;
        this.chips = [];
        this.board = [];

        this.drawPlayerChips(1010, 360, "#0000FF", 20);
        this.drawPlayerChips(40, 360, "#FF0000", 0);

    }

    draw() {

        this.chips.forEach(chip => {
            chip.draw();
        })
        this.drawBoard();

    }

    getSelectedChip(clickedX, clickedY) {
        for (let index = 0; index < this.chips.length; index++) {
            if (this.chips[index].isHitted(clickedX, clickedY)) {
                return this.chips[index];
            }
        }
        return null;
    }

    drawBoard() {
        let pointer = 0;
        let x = 0;
        let y = 0;
        let colour = "#FF0000";
        for (let row = 0; row < 640; row += 90) {
            for (let col = 0; col < 400; col += 90) {
                x = row + 285;
                y = col + 145;
                this.board[pointer] = this.drawCircle(x, y, 40);
                pointer++;
                console.log(this.board);
            }
        }

    }

    drawCircle(x, y, radius) {
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
        this.context.stroke();
        this.context.closePath();
    }

    drawPlayerChips(x, y, colour, pointer) {

        for (let i = 0; i < 120; i += 6) {
            let chip = new Chip((x + Math.floor(Math.random() * 150 + 1)), (y + i), colour, 40, this.context);
            this.chips.push(chip);
            pointer++;
        }

    }



}