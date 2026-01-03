const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const base = { x: 400, y: 300 };
const link1 = 100;
const link2 = 80;

let angle1 = 0;
let angle2 = 0;

let object = { x: 300, y: 320, picked: false };
let target = { x: 520, y: 320 };

function drawArm() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate joint positions
    const joint1 = {
        x: base.x + link1 * Math.cos(angle1),
        y: base.y + link1 * Math.sin(angle1)
    };

    const joint2 = {
        x: joint1.x + link2 * Math.cos(angle1 + angle2),
        y: joint1.y + link2 * Math.sin(angle1 + angle2)
    };

    // Draw arm
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(base.x, base.y);
    ctx.lineTo(joint1.x, joint1.y);
    ctx.lineTo(joint2.x, joint2.y);
    ctx.stroke();

    // Draw joints
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(base.x, base.y, 6, 0, Math.PI * 2);
    ctx.arc(joint1.x, joint1.y, 6, 0, Math.PI * 2);
    ctx.arc(joint2.x, joint2.y, 6, 0, Math.PI * 2);
    ctx.fill();

    // Object
    if (!object.picked) {
        ctx.fillStyle = "red";
        ctx.fillRect(object.x - 10, object.y - 10, 20, 20);
    } else {
        object.x = joint2.x;
        object.y = joint2.y;
        ctx.fillStyle = "green";
        ctx.fillRect(object.x - 10, object.y - 10, 20, 20);
    }

    // Target
    ctx.strokeStyle = "green";
    ctx.strokeRect(target.x - 15, target.y - 15, 30, 30);
}

function startSimulation() {
    let step = 0;
    const interval = setInterval(() => {
        if (step < 60) {
            angle1 -= 0.02;
            angle2 += 0.03;
        } else if (step === 60) {
            object.picked = true;
        } else if (step < 140) {
            angle1 += 0.02;
            angle2 -= 0.03;
        } else {
            object.picked = false;
            object.x = target.x;
            object.y = target.y;
            clearInterval(interval);
        }

        drawArm();
        step++;
    }, 50);
}

drawArm();
