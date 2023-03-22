'use strict';

class Visleaf {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }
}

function RectCircleColliding(rect, x, y, r) {
    const circle = {x: x, y: y, r: r}

    const distX = Math.abs(circle.x - rect.x - rect.w / 2);
    const distY = Math.abs(circle.y - rect.y - rect.h / 2);

    if (distX > (rect.w / 2 + circle.r)) { return false; }
    if (distY > (rect.h / 2 + circle.r)) { return false; }

    if (distX <= (rect.w / 2)) { return true; } 
    if (distY <= (rect.h / 2)) { return true; }

    var dx = distX-rect.w / 2;
    var dy = distY-rect.h / 2;
    return ((dx * dx + dy * dy) <= (circle.r * circle.r));
}

function update(e, ctx, entities) {
    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Draw visleaves
    ctx.strokeStyle = 'blue';
    entities.visleaves.forEach(visleaf => {
        ctx.strokeRect(visleaf.x, visleaf.y, visleaf.w, visleaf.h)
    });

    // Draw player
    const playerRadius = 16;

    ctx.strokeStyle = 'black';
    entities.visleaves.forEach(visleaf => {
        if (RectCircleColliding(visleaf, e.clientX, e.clientY, playerRadius)) {
            ctx.strokeStyle = 'red';
        }
    });

    ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, playerRadius, 0, 2 * Math.PI)
        ctx.stroke();
}

// Main
{
    const fps = 60;

    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    const entities = {
        visleaves: [
            new Visleaf(40, 40, 64, 128),
            new Visleaf(40, 168, 196, 64),
            new Visleaf(172, 40, 64, 128),
        ],
    };

    addEventListener('mousemove', (e) => update(e, ctx, entities));
}