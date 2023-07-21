export default class GameObject {
    constructor(position, radius, color, velocity, 
                    canvasWidth, canvasHeight){
        this.position = {
            x: position.x,
            y: position.y
        };
        this.radius = radius;
        this.color = color;
        if(velocity != null){
            this.velocity = {
                x: velocity.x,
                y: velocity.y
            };
        }
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.markedForDeletion = false;
    }

    update(){
        if(this.velocity != null){
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }
    }

    draw(ctx){
        ctx.beginPath();       
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}