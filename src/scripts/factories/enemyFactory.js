import Object from "../Models/object.js";

export default class EnemyFactory {
  constructor(canvasWidth, canvasHeight, center) {
    //this.enemies = [];
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.center = center;
  }

  generateEnemy() {
    let enemyRadius = this.getEnemyRadius();
    let enemyPosition = this.getEnemyPosition(enemyRadius);
    let enemyColor = `hsl(${Math.random() * 360}, 50%, 50%)`;
    let enemyAngle = Math.atan2(
      this.center.y - enemyPosition.y,
      this.center.x - enemyPosition.x
    );
    let enemyVelocity = {
      x: Math.cos(enemyAngle),
      y: Math.sin(enemyAngle),
    };
    return new Object(enemyPosition, enemyRadius, enemyColor, enemyVelocity);
    //this.enemies.push(enemy);
  }

  getEnemyPosition(enemyRadius) {
    let x = 0;
    let y = 0;
    if (Math.random() < 0.5) {
      x =
        Math.random() < 0.5 ? 0 - enemyRadius : this.canvasWidth + enemyRadius;
      y = Math.random() * this.canvasHeight;
    } else {
      x = Math.random() * this.canvasWidth;
      y =
        Math.random() < 0.5 ? 0 - enemyRadius : this.canvasHeight + enemyRadius;
    }

    return {
      x,
      y,
    };
  }

  getEnemyRadius() {
    let minRadius = 5;
    let maxRadius = 30;
    return Math.random() * (maxRadius - minRadius) + minRadius;
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
