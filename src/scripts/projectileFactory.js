import Object from "./object.js";

export default class ProjectileFactory{
    constructor(center, canvasWidth, canvasHeight){
        this.center = center;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }

    generateProjectile(e) {
        let angle = Math.atan2(e.clientY - this.center.y, e.clientX - this.center.x);
        let velocityFactor = 5;
        let velocity = {
            x: Math.cos(angle) * velocityFactor,
            y: Math.sin(angle) * velocityFactor,
        };
        let projectileColor = "rgb(255, 255, 255)";
        let projectileRadius = 3;
        return new Object(
            this.center,
            projectileRadius,
            projectileColor,
            velocity
        );
    }

    projectileOutOfBounds(projectile) {
        return (
          projectile.position.x > this.canvasWidth ||
          projectile.position.x < 0 ||
          projectile.position.y > this.canvasHeight ||
          projectile.position.y < 0
        );
    }
}