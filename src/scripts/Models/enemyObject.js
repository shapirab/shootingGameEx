import GameObject from "../Models/object.js";

export default class Enemy extends GameObject {
  constructor(canvasWidth, canvasHeight, center) {
    let preliminaryPosition = {
      x: 0,
      y: 0
    }

    let preliminaryRadius = 50;

    let preliminaryColor = "#fff";
    let preliminaryVelocity = {
      x: 0,
      y: 0
    }
    
    super(preliminaryPosition, preliminaryRadius, 
      preliminaryColor, preliminaryVelocity, canvasWidth, canvasHeight);
    
    
    this.position = this.getEnemyPosition();
    this.radius = this.getEnemyRadius();
    this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    
    this.center = center;
    let enemyAngle = Math.atan2(
      this.center.y - this.position.y,
      this.center.x - this.position.x
    );
    this.velocity = {
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
