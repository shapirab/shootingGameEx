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
let particles = [];

window.addEventListener('click', (e) => {
    angle = Math.atan2(e.clientY - center.y, e.clientX - center.x);
    let velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    };
    let particle = new Object(center, 5, 'gold', velocity);
    particles.push(particle);
    
});

function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);
    particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
    });
}

animate();