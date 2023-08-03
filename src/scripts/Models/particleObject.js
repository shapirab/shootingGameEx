import GameObject from "./object.js";

export default class ParticleObject extends GameObject {  
  
  particleOutOfBounds(particle) {
    return (
      particle.position.x > this.canvasWidth ||
      particle.position.x < 0 ||
      particle.position.y > this.canvasHeight ||
      particle.position.y < 0
    );
  }

  draw(ctx){
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}
