class Game {
    constructor(context, width, height) {
        this.context = context;
        this.board = new Board(this.context);
        this.mode = '';
        this.selectedChip = null;
        this.width = width;
        this.height = height;
    }

    draw() {
        this.context.clearRect(0, 0, this.width, this.height);
        this.board.draw();
    }

    checkHit(clickedX, clickedY) {
        let selectedChip = this.board.getSelectedChip(clickedX, clickedY);
        if (selectedChip) {
            this.mode = 'dragging';
            this.selectedChip = selectedChip;
            return true;
        }
        return false;
    }
    handlerDrag(clickedX, clickedY) {
        if (this.mode === 'dragging' && this.selectedChip) {
            this.selectedChip.move(clickedX, clickedY);
            this.draw();
        }
    }

    stopDragging() {
        this.mode = 'standBy';
    }

    checkMove() {
        if (this.board.checkMove(this.selectedChip)) {

        }
    }

    detectPosition(clickedX, clickedY) {
        let col = this.board.detectColumn(clickedX, clickedY);
        console.log(col);
        if (col <= 0) {
            let row = this.board.lastPosition(col);
            this.selectedChip.move(col, row);
            this.draw();

        }
    }

}