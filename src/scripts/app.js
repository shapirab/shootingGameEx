import EnemyFactory from "./enemyFactory.js";
import Object from "./object.js";
import ProjectileFactory from "./projectileFactory.js";

const canvas = document.querySelector(".main-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");

let center = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};
let player = new Object(center, 30, "white", null);
let projectiles = [];
let enemies = [];

let projectileFactory = new ProjectileFactory
                            (center, canvas.width, canvas.height);
let enemyFactory = new EnemyFactory(canvas.width, canvas.height, center);
let gameOver = false;

window.addEventListener("click", (e) => {
  if(!gameOver){
    generateProjectile(e);   
  }
});

function generateProjectile(e) {
  projectiles.push(projectileFactory.generateProjectile(e));
}

function removeProjectileIfOutOfBounds(projectile) {
  if (projectileFactory.projectileOutOfBounds(projectile)) {
    projectile.markedForDeletion = true;
  }
}

function spawnEnemies() {
  setInterval(() => {
    enemies.push(enemyFactory.generateEnemy());
  }, 1000);
}

function calculateDistance(point_1, point_2){
  let distanceX = point_1.x - point_2.x;
  let distanceY = point_1.y - point_2.y;
  return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  player.draw(ctx);

  enemies = enemies.filter(enemy => !enemy.markedForDeletion);
  projectiles = projectiles.filter(projectile => !projectile.markedForDeletion);
  projectiles.forEach((projectile) => {
    removeProjectileIfOutOfBounds(projectile);
    projectile.update();
    projectile.draw(ctx);
    enemies.forEach((enemy) => {
      if(calculateDistance(enemy.position, projectile.position) < enemy.radius + projectile.radius ){
        enemy.markedForDeletion = true;
        projectile.markedForDeletion = true;
      }     
    });
  });
  enemies.forEach((enemy) => {
      if(calculateDistance(enemy.position, player.position) < enemy.radius + player.radius){
        gameOver = true;
      }
      if(!gameOver){
        enemy.update();
      }
      enemy.draw(ctx);
  });
}

animate();
spawnEnemies();
