import EnemyFactory from "./enemyFactory.js";
import Object from "./object.js";
import ProjectileFactory from "./projectileFactory.js";
import ExplosionParticlesFactory from "./explosionParticlesFactory.js";

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
let exposionParticles = [];

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

function removeEnemyIfOutOfBounds(enemy) {
  console.log(enemies);
  if (objectOutOfBounds(enemy)) {
    //The reason for the bug is that the enemies begin off bounds, 
    //and so are deleted as soon as they are created.
    //enemy.markedForDeletion = true;
  }
}
function removeParticleIfOutOfBounds(particle) {
  if (objectOutOfBounds(particle)) {
    particle.markedForDeletion = true;
  }
}

function spawnEnemies() {
  //TODO: work on this!!! Enemies should stop being created when the game is over
  let generator = setInterval(() => {   
    enemies.push(enemyFactory.generateEnemy());
    if(gameOver){
      clearInterval(generator);
    }
  }, 1000);
  
}

function calculateDistance(point_1, point_2){
  let distanceX = point_1.x - point_2.x;
  let distanceY = point_1.y - point_2.y;
  return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
}

function checkForHits(){
  projectiles.forEach((projectile) => {
    removeProjectileIfOutOfBounds(projectile);
    projectile.update();
    projectile.draw(ctx, canvas.width, canvas.height);
    enemies.forEach((enemy) => {
      
      if(calculateDistance(enemy.position, projectile.position) < enemy.radius + projectile.radius ){
        if(enemy.radius > 10){
          gsap.to(enemy, {radius: enemy.radius - 5});
        }
        else{
          enemy.markedForDeletion = true;
          projectile.markedForDeletion = true;
          generateExplosion(enemy);                   
        }
      }     
    });
  });
}

function generateExplosion(enemy){
  let explosionFactory = new ExplosionParticlesFactory(enemy);
  let explosionParticlesNum = 50;
  for(let i = 0; i < explosionParticlesNum; i++){
    exposionParticles.push(explosionFactory.generateParticle());
  } 
}

function objectOutOfBounds(gameObject){
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

  enemies = enemies.filter(enemy => !enemy.markedForDeletion);
  projectiles = projectiles.filter(projectile => !projectile.markedForDeletion);
  exposionParticles = exposionParticles.filter(particle => !particle.markedForDeletion);
  
  checkForHits();
  exposionParticles.forEach((explosionParitcle) => {
    explosionParitcle.update();
    explosionParitcle.draw(ctx);
    removeParticleIfOutOfBounds(explosionParitcle);
  });

  enemies.forEach((enemy) => {
      //TODO: this is a bug. With it no enemies are drwan.
      removeEnemyIfOutOfBounds(enemy);  
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
