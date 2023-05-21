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

window.addEventListener("click", (e) => {
  generateProjectile(e);
});

function generateProjectile(e) {
  projectiles.push(projectileFactory.generateProjectile(e));
}

function removeProjectileIfOutOfBounds(projectile, index) {
  if (projectileFactory.projectileOutOfBounds(projectile)) {
    projectiles.splice(index, 1);
  }
}

function spawnEnemies() {
  setInterval(() => {
    enemies.push(enemyFactory.generateEnemy());
  }, 1000);
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.draw(ctx);
  projectiles.forEach((projectile, index) => {
    removeProjectileIfOutOfBounds(projectile, index);
    projectile.update();
    projectile.draw(ctx);
  });
  enemies.forEach((enemy) => {
    enemy.update();
    enemy.draw(ctx);
  });
}

animate();
spawnEnemies();
