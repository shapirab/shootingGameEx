import GameObject from "../Models/object.js";

export default class Enemy extends GameObject {
  initEnemyObject(center){
    this.position = this.getEnemyPosition();
    this.radius = this.getEnemyRadius();
    this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    this.velocity = this.getVelocity(center);
  }

  getVelocity(center){
    let enemyAngle = Math.atan2(
      center.y - this.position.y,
      center.x - this.position.x
    );
    return {
      x: Math.cos(enemyAngle),
      y: Math.sin(enemyAngle),
    };
  }

  getEnemyRadius() {
    let minRadius = 5;
    let maxRadius = 30;
    return Math.random() * (maxRadius - minRadius) + minRadius;
  }

  getEnemyPosition() {
    let x = 0;
    let y = 0;
    if (Math.random() < 0.5) {
      x =
        Math.random() < 0.5 ? 0 - this.radius : this.canvasWidth + this.radius;
      y = Math.random() * this.canvasHeight;
    } else {
      x = Math.random() * this.canvasWidth;
      y =
        Math.random() < 0.5 ? 0 - this.radius : this.canvasHeight + this.radius;
    }

    return {
      x,
      y,
    };
  }

  enemyOutOfBounds(enemy) {
    return (
      enemy.position.x > this.canvasWidth ||
      enemy.position.x < 0 ||
      enemy.position.y > this.canvasHeight ||
      enemy.position.y < 0
    );
  }
}
