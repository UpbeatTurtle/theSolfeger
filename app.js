const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const video = document.getElementById('video');


ctx.fillText("Hello World", canvas.width/2, 80);

//All ze variables aqui:
const xLands = new Array(21).fill(null);
const yLands = new Array(21).fill(null);
const knucklesY = new Array(4).fill(null);
const cracklesY = new Array(4).fill(null);
const tipsY = new Array(4).fill(null);

let knucklesYavg = 0;
let cracklesYavg = 0;
let tipsYavg = 0;
let ncdiff = 0;
let ctdiff = 0;

let handx = null;
let handy = null;

let text = "Show me those hands!";

let mouseX = 0;
let mouseY = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const Sign = {
    do: "Do",
    re: "Re",
    mi: "Mi",
    fa: "Fa", 
    sol: "Sol",
    la: "La",
    ti: "Ti",
    none: "none"
}

const colorMap = {
  [Sign.do]: "rgb(250,248,148)",
  [Sign.re]: "pink",
  [Sign.mi]: "blue",
  [Sign.fa]: "orange",
  [Sign.sol]: "green",
  [Sign.la]: "purple",
  [Sign.ti]: "red",
  [Sign.none]: "black"
};


let currentSign = Sign.none;

let videoX = canvas.width/2 - 320/2; // left edge of video box
let videoY = 200;// top edge
const videoWidth = 320;
const videoHeight = 240;

const img = new Image();
img.src = 'img/kodalyhand-rows.png';

const eighth = new Image();
eighth.src = 'img/88572-200.png';

window.addEventListener('resize',(e) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    videoX = canvas.width/2 - 320/2;
});

canvas.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
});

ctx.imageSmoothingEnabled = true;
canvas.style.cursor = 'none';
function loop() {
    ctx.save()
    ctx.fillStyle = 'rgb(250,250,250)';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.restore();
    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1,1);
    ctx.drawImage(video, videoX, videoY, videoWidth, videoHeight);
    ctx.restore();
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.font = "20px Arial"
    ctx.font = "80px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(text, canvas.width/2 + 1, 483);

    ctx.font = "80px Arial";
    ctx.fillStyle = colorMap[currentSign];
    ctx.fillText(text, canvas.width/2, 480);
    ctx.drawImage(img, canvas.width/2 - 554/2, videoY + videoHeight + 120, 554, 242);

    ctx.fillStyle = "blue";
    ctx.font = "60px Arial";
    ctx.fillText("Welcome to the Solfeger!", canvas.width/2, 40);
    ctx.font = "30px Arial";
    ctx.fillText("Control the notes with Solfege Handsigns! Press 'a' to play a note, and 's' to play an octave higher!", canvas.width/2, 110);
    ctx.fillText("(You can also press 'q' and 'w' for a different sound)", canvas.width/2, 140);

    
    
        // ctx.beginPath();
        // ctx.arc(mouseX, mouseY, 5, 0, Math.PI * 2); // x, y, radius, startAngle, endAngle
        // ctx.fillStyle = 'blue';
        // ctx.fill();
        // ctx.closePath();

        ctx.drawImage(eighth, mouseX - 13, mouseY - 24, 30, 30);


        if (handx != null && handy != null) {
            for (let i = 0; i < 21; i++) {
                ctx.beginPath();
                ctx.arc(xLands[i], yLands[i], 5, 0, Math.PI * 2);
                ctx.fillStyle = 'green';
                ctx.fill();
                ctx.closePath();
            }
        }
    
    requestAnimationFrame(loop);
}
loop();

