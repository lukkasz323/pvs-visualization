'use strict';

class Visleaf {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.isVisible = false;
        this.hasPlayer = false;
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

function update(e, canvas, ctx, entities) {
    const visleaves = entities.visleaves;
    const canvasBounds = canvas.getBoundingClientRect();
    const mouse = {
        x: e.clientX - canvasBounds.x,
        y: e.clientY - canvasBounds.y,
    }

    // Logic
    {
        // Check collisions
        {
            visleaves.forEach(visleaf => {
                if (rectCircleColliding(visleaf, mouse.x, mouse.y, entities.player.radius)) {
                    visleaf.hasPlayer = true;
                } else {
                    visleaf.hasPlayer = false;
                }
            });
        }

        // Check visibility
        {
            visleaves.forEach(visleaf => {
                visleaf.isVisible = false;
            });

            if (visleaves[0].hasPlayer) {
                visleaves[0].isVisible = true;
                visleaves[1].isVisible = true;
            }
            if (visleaves[1].hasPlayer) {
                visleaves[1].isVisible = true;
                visleaves[0].isVisible = true;
                visleaves[2].isVisible = true;
            }
            if (visleaves[2].hasPlayer) {
                visleaves[2].isVisible = true;
                visleaves[1].isVisible = true;
            }
        }
    }

    // Draw
    {
        // Clear canvas
        {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Draw visleaves
        {
            ctx.fillStyle = 'gray';
            ctx.strokeStyle = 'blue';
            entities.visleaves.forEach(visleaf => {
                if (visleaf.isVisible) {
                    ctx.fillRect(visleaf.x, visleaf.y, visleaf.w, visleaf.h)
                }
                ctx.strokeRect(visleaf.x, visleaf.y, visleaf.w, visleaf.h)
            });
        }

        // Draw player
        {
            ctx.strokeStyle = 'green';
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, entities.player.radius, 0, 2 * Math.PI)
            ctx.stroke();
        }
    }
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

    addEventListener('mousemove', (e) => update(e, canvas, ctx, entities));

    console.log(canvas.getBoundingClientRect().y);
}