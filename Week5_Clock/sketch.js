/*
 Hello World Wk5
 Digital Clock
 */

let font;
let points = [];
let r = 5;
let angle = 0;
let prevSec = -1; // To track 

function preload() {
  font = loadFont("SpaceMono-Bold.ttf");
}

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0);
  translate(30, height / 2);

  // Get current time
  let h = nf(hour(), 2);
  let m = nf(minute(), 2);
  let s = nf(second(), 2);
  let time = h + ':' + m + ':' + s;

  // Update time format if the current second is even
  if (s % 2 == 0) {
    time = h + ' ' + m + ' ' + s;
  }

  // Only update points if the second has changed
  if (s !== prevSec) {
    points = font.textToPoints(time, 0, 0, 150, {
      sampleFactor: 0.1,
      simplifyThreshold: 0
    });
    prevSec = s; // Update previous second
  }

  // Draw animated ellipses based on points
  for (let i = 0; i < points.length; i++) {
    let p = points[i];

    // Scatter effect based on mouse position
    let scatterX = map(mouseX, 0, width, -30, 30);
    let scatterY = map(mouseY, 0, height, -30, 30); 

    // Offset each ellipse position based on mouse proximity
    let d = dist(p.x, p.y, mouseX - 30, mouseY - height / 2); 
    let scatterOffset = (d < 50) ? map(d, 0, 50, 10, 0) : 0; // Decrease scatter with proximity

    push();
    fill(255); 
    // Apply scatter offset
    ellipse(p.x + scatterX * scatterOffset + r * sin(angle), p.y + scatterY * scatterOffset, 8, 8); 
    pop();
  }

  angle += 10; // Increment angle for animation
}