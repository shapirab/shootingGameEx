import GameObject from '../scripts/Models/object.js';
import ProjectileFactory from '../scripts/factories/projectileFactory.js';
//import ExplosionParticlesFactory from "./factories/explosionParticlesFactory.js";
import Enemy from "./Models/enemyObject.js";
import ParticleObject from './Models/particleObject.js';

const canvas = document.querySelector(".main-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");

let center = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};
let player = new GameObject(center, 30, "white", null);
let projectiles = [];
let enemies = [];
let explosionParticles = [];

let projectileFactory = new ProjectileFactory(
  center,
  canvas.width,
  canvas.height
);
let gameOver = false;

window.addEventListener("click", (e) => {
  if (!gameOver) {
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

function removeParticleIfOutOfBounds(particle) {
  if (objectOutOfBounds(particle)) {
    particle.markedForDeletion = true;
  }
}

function spawnEnemies() {
  let generator = setInterval(() => {
    let enemy = new Enemy({x: 0, y: 0}, 10, 'gold', {x: 0, y: 0}, canvas.width, canvas.height);
    enemy.initEnemyObject(center);
    enemies.push(enemy);
    if (gameOver) {
      clearInterval(generator);
    }
  }, 1000);
}

function calculateDistance(point_1, point_2) {
  let distanceX = point_1.x - point_2.x;
  let distanceY = point_1.y - point_2.y;
  return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
}

function checkForHits() {
  projectiles.forEach((projectile) => {
    removeProjectileIfOutOfBounds(projectile);
    projectile.update();
    projectile.draw(ctx, canvas.width, canvas.height);
    enemies.forEach((enemy) => {
      if (
        calculateDistance(enemy.position, projectile.position) <
        enemy.radius + projectile.radius
      ) {
        if (enemy.radius > 10) {
          gsap.to(enemy, { radius: enemy.radius - 5 });
        } else {
          enemy.markedForDeletion = true;
          projectile.markedForDeletion = true;
          generateExplosion(enemy);
        }
      }
    });
  });
}

function generateExplosion(enemy) {
  let explosionParticlesNum = 50;
  for (let i = 0; i < explosionParticlesNum; i++) {
    let explosionParticle = generateParticle(enemy);
    explosionParticles.push(explosionParticle);
  }
}

function generateParticle(enemy){
  let minRadius = 2;
  let maxRadius = 5;
  let position = {
    x: enemy.position.x,
    y: enemy.position.y,
  };
  let radius = Math.random() * (maxRadius - minRadius) + minRadius;
  let color = enemy.color;
  let velocity = {
    x: (Math.random() - 0.5) * 3,
    y: (Math.random() - 0.5) * 3,
  };
  radius = radius;
  color = color;
  position = position;
  velocity = velocity;
  return new ParticleObject(position, radius, color, velocity, canvas.width, canvas.height);
}

function objectOutOfBounds(gameObject) {
  return (
    gameObject.position.x > canvas.width ||
    gameObject.position.x < 0 ||
    gameObject.position.y > canvas.height ||
    gameObject.position.y < 0
  );
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  player.draw(ctx);

  enemies = enemies.filter((enemy) => !enemy.markedForDeletion);
  projectiles = projectiles.filter(
    (projectile) => !projectile.markedForDeletion
  );
  explosionParticles = explosionParticles.filter(
    (particle) => !particle.markedForDeletion
  );

  checkForHits();
  explosionParticles.forEach((explosionParticle, index) => {   
    explosionParticle.update();
    if(explosionParticle.alpha <= 0.01){
      explosionParticles.splice(index, 1);
    }
    else{
      explosionParticle.draw(ctx);
    }
    removeParticleIfOutOfBounds(explosionParticle);
  });

  enemies.forEach((enemy) => {
    if (
      calculateDistance(enemy.position, player.position) <
      enemy.radius + player.radius
    ) {
      gameOver = true;
    }
    if (!gameOver) {
      enemy.update();
    }
    enemy.draw(ctx);
  });
}

animate();
spawnEnemies();
