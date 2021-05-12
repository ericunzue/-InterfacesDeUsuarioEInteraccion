document.addEventListener('DOMContentLoaded', () => {

    let canvas = document.getElementById('canvas');
    canvas.width = 1200;
    canvas.height = 600;
    let ctx = canvas.getContext('2d');

    let fourInLine = new Game(ctx, canvas.width, canvas.height);
    fourInLine.draw();

    canvas.addEventListener('mousedown', (eMouseDown) => {
        if (fourInLine.checkHit(eMouseDown.offsetX, eMouseDown.offsetY)) {
            canvas.addEventListener('mousemove', (eMouseMove) => {
                fourInLine.handlerDrag(eMouseMove.offsetX, eMouseMove.offsetY);
            });

        }
    });


    canvas.addEventListener('mouseup', (e) => {
        canvas.removeEventListener('mousemove', fourInLine.handlerDrag);
        fourInLine.dropChip(e.offsetX, e.offsetY);
        fourInLine.stopDragging();
    })
})