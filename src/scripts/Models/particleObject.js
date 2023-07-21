import GameObject from "./object.js";

export default class ParticleObject extends GameObject{
    constructor(alphaValue, enemy){
        super();
        this.alpha = alphaValue;
        this.enemy = enemy; 
        this.radius = this.getParticleRadius();
    }

    update(){
        super();
        this.alpha += 0.1;
    }

    draw(ctx){
        super(ctx);
    }

    getParticleRadius(){
        let minRadius = 2;
        let maxRadius = 5;
        return Math.random() * (maxRadius - minRadius) + minRadius;
    }
}