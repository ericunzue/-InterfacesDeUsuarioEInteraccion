    class Chip {
        constructor(posX, posY, colour, radius, context) {
            this.posX = posX;
            this.posY = posY;
            this.colour = colour;
            // this.image = image;
            this.radius = radius;
            this.context = context;
            this.movable = true;
        }


        draw() {
            this.context.beginPath();
            this.context.fillStyle = this.colour;
            this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
            this.context.fill();
            this.context.closePath();


            this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
            this.context.stroke();
            this.context.closePath();

        }

        isHitted(clickedX, clickedY) {
            return Math.sqrt((clickedX - this.posX) ** 2 + (clickedY - this.posY) ** 2) < this.radius;
        }

        move(clickedX, clickedY) {
            if (this.movable) {
                this.posX = clickedX;
                this.posY = clickedY;
            }

        }

        setMovable() {
            this.movable = false;
        }

        getColour() {
            return this.colour;
        }

        // setImage(image) {
        //     this.image = image;
        // }


    }