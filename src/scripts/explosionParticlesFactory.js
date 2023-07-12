import Object from "./object.js";

export default class ExplosionParticlesFactory {
  constructor(enemy, canvasWidth, canvasHeight) {
    this.enemy = enemy;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  generateParticle() {
    let minRadius = 2;
    let maxRadius = 5;
   
    let position = {
      x: this.enemy.position.x,
      y: this.enemy.position.y,
    };
    let radius = Math.random() * (maxRadius - minRadius) + minRadius;
    let color = this.enemy.color;
    let velocity = {
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 10
    };
    return new Object(position, radius, color, velocity);
  }
  
  particleOutOfBounds(particle) {
    return (
      particle.position.x > this.canvasWidth ||
      particle.position.x < 0 ||
      particle.position.y > this.canvasHeight ||
      particle.position.y < 0
    );
}
}
