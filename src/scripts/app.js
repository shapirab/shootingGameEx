import Object from "./object.js";

const canvas = document.querySelector(".main-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");

let center = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};
let player = new Object(center, 30, "white", null);
let angle = 0;
let projectiles = [];
let enemies = [];

window.addEventListener("click", (e) => {
  generateProjectile(e);
});

function generateProjectile(e) {
  angle = Math.atan2(e.clientY - center.y, e.clientX - center.x);
  let velocityFactor = 5;
  let velocity = {
    x: Math.cos(angle) * velocityFactor,
    y: Math.sin(angle) * velocityFactor,
  };
  let projectileColor = "rgb(255, 255, 255)";
  let projectileRadius = 3;
  let projectile = new Object(
    center,
    projectileRadius,
    projectileColor,
    velocity
  );
  projectiles.push(projectile);
}

function removeProjectileIfOutOfBounds(projectile, index) {
  if (projectileOutOfBounds(projectile)) {
    projectiles.splice(index, 1);
  }
}

function projectileOutOfBounds(projectile) {
  return (
    projectile.position.x > canvas.width ||
    projectile.position.x < 0 ||
    projectile.position.y > canvas.height ||
    projectile.position.y < 0
  );
}

function spawnEnemies() {
  setInterval(enemiesFactory, 1000);
}

function enemiesFactory() {
  let enemyRadius = getEnemyRadius();
  let enemyPosition = getEnemyPosition(enemyRadius);
  console.log(enemyPosition);
  let enemyAngle = Math.atan2(
    center.y - enemyPosition.y,
    center.x - enemyPosition.x
  );
  let enemyVelocity = {
    x: Math.cos(enemyAngle),
    y: Math.sin(enemyAngle),
  };
  let enemy = new Object(enemyPosition, enemyRadius, "gold", enemyVelocity);
  enemies.push(enemy);
}

function getEnemyPosition(enemyRadius){
  let x = 0;
  let y = 0;
  if(Math.random() < 0.5){
    x = Math.random() < 0.5 ? 0 - enemyRadius : canvas.width + enemyRadius;
    y = Math.random() * canvas.height;
  }
  else{
    x = Math.random() * canvas.width;
    y = Math.random() < 0.5 ? 0 - enemyRadius : canvas.height + enemyRadius;
  }

  return {
    x, y
  }
}

function getEnemyRadius(){
  let minRadius = 5;
  let maxRadius = 30;
  return Math.random() * (maxRadius - minRadius) + minRadius;
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
