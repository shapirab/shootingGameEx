import Object from "./object.js";

const canvas = document.querySelector('.main-canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');

let center = {
    x: canvas.width / 2,
    y: canvas.height / 2
}
let player = new Object(center, 30, 'white', null);
let angle = 0;
let projectiles = [];

window.addEventListener('click', (e) => {
    angle = Math.atan2(e.clientY - center.y, e.clientX - center.x);
    let velocityFactor = 5;
    let velocity = {
        x: Math.cos(angle) * velocityFactor,
        y: Math.sin(angle) * velocityFactor
    };
    let projectileColor = 'rgb(255, 255, 255)';
    let projectileRadius = 3;
    let projectile = new Object(center, projectileRadius, projectileColor, velocity);
    projectiles.push(projectile);
    
});

function removeProjectileIfOutOfBounds(projectile, index){
    if(projectileOutOfBounds(projectile)){
        projectiles.splice(index, 1);
    }
}

function projectileOutOfBounds(projectile){
    return projectile.position.x > canvas.width ||
            projectile.position.x < 0 || 
            projectile.position.y > canvas.height ||
            projectile.position.y < 0;
}

function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);
    projectiles.forEach((projectile, index) => {
        removeProjectileIfOutOfBounds(projectile, index);
        projectile.update();
        projectile.draw(ctx);
    });
}

animate();