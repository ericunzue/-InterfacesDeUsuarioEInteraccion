class Board {
    constructor(context){
        this.context = context;
        this.chips = [];
        this.chips.push(new Chip(50,50,'red',100,this.context));
    }

    draw(){
        this.chips.forEach(chip => {
            chip.draw();
        })
    }
    getSelectedChip(clickedX, clickedY){
        for (let index = 0; index < this.chips.length; index++) {
            if(this.chips[index].isHitted(clickedX, clickedY)){
                return this.chips[index];
            }
        }
        return null;
        // this.chips.forEach(chip => {
        //     if(chip.isHitted(clickedX, clickedY))
        //         return chip;
        // });
        // return null;
    }
}