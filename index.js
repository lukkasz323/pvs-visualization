'use strict';

class Visleaf {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }
}

function rectCircleColliding(rect, x, y, r) {
    const circle = {x: x, y: y, r: r}

    const distX = Math.abs(circle.x - rect.x - rect.w / 2);
    const distY = Math.abs(circle.y - rect.y - rect.h / 2);

    if (distX > (rect.w / 2 + circle.r)) { return false; }
    if (distY > (rect.h / 2 + circle.r)) { return false; }

    if (distX <= (rect.w / 2)) { return true; } 
    if (distY <= (rect.h / 2)) { return true; }

    var dx = distX-rect.w / 2;
    var dy = distY-rect.h / 2;
    return (dx * dx + dy * dy) <= (circle.r * circle.r);
}

function update(e, ctx, entities) {
    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Draw visleaves
    ctx.strokeStyle = 'blue';
    entities.visleaves.forEach(visleaf => {
        if (rectCircleColliding(visleaf, e.clientX, e.clientY, entities.player.radius)) {
            ctx.strokeRect(visleaf.x, visleaf.y, visleaf.w, visleaf.h)
        }
    });

    // Draw player
    ctx.strokeStyle = 'black';
    ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, entities.player.radius, 0, 2 * Math.PI)
        ctx.stroke();
}

// Main
{
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    const entities = {
        player: {radius: 16},
        visleaves: [
            new Visleaf(40, 40, 64, 128),
            new Visleaf(40, 168, 196, 64),
            new Visleaf(172, 40, 64, 128),
        ],
    };

    addEventListener('mousemove', (e) => update(e, ctx, entities));
}