const g = 0.8; // gravity
const jump = 20; // jump
const ground = 80;
const size = 40;

let xpos = 0;
let objectX; // start pumpkin outside the canvas
let objectXSpeed = -5; // speed of the pumpkin (moving left)

let x, y, h;
let score = 0; // initialize score
let passedObject = false; // flag to detect if the emoji has jumped over the pumpkin
let gameStarted = false; // flag to check if the game has started
let object; // variable to hold the randomly chosen emoji

function setup() {
  createCanvas(600, 600);

  x = width / 3;
  y = height - ground - size / 2;
  h = 0;

  // Set the initial position of the pumpkin outside the right canvas
  objectX = random(width, width + 100);

  // Randomly select the obj
  object = random() < 0.5 ? "🎃" : "🪦"; // 50% chance for each obj
}

function draw() {
  background(0);

  let gy = height - ground;

  xpos += 2;

  stroke(255);
  line(0, gy, width, gy);

  // Update obj's position
  if (gameStarted) {
    objectX += objectXSpeed; // move left
  }

  // Collision between the object and player
  let objectTop = gy - 50;
  let objectBaseLeft = objectX;
  let objectBaseRight = objectX + 40;

  if (y + size / 2 > objectTop && y - size / 2 < gy) {
    if (x + size / 2 > objectBaseLeft && x - size / 2 < objectBaseRight) {
      // Collision detected, game over
      objectSpeed = 0;
      fill(0);
      strokeWeight(2);
      textSize(45);
      textAlign(CENTER);
      text("GAME OVER🧛‍♀️", 300, 300);
      noLoop(); // Stop the game
    }
  }

  // Check if the emoji has jumped over the pumpkin successfully
  if (!passedObject && objectX < x - size / 2 && y < height - ground - size / 2) {
    score += 1; // Increment the score
    passedObject = true;
  }

  // Reset the pumpkin's position if it goes off the canvas
  if (objectX < -40) {
    objectX = random(width, width + 100); // set a new random position outside the canvas
    object = random() < 0.5 ? "🎃" : "🪦"; // Randomly select a new obj
    passedObject = false;
  }

  // Player
  textSize(50);
  text(object, objectX, gy - 10);

  if (xpos >= 600) {
    xpos = 0;
  }

  if (score >= 3) {
    text("🧛‍♀️", x, y + size / 3); // Draw the ghost emoji at the ellipse's position
  } else {
    text("👻", x, y + size / 3); // Draw the ghost emoji at the ellipse's position
  }

  y += h;

  if (y < height - ground - size / 2) {
    // in the air
    h += g;
  } else {
    h = 0;
    y = height - ground - size / 2;
  }

  // Display the score
  fill(255);
  textSize(25);
  textAlign(LEFT);
  text("Score: " + score, 30, 40);

  // Display instructions before the game starts
  if (!gameStarted) {
    fill(255);
    textSize(20);
    textAlign(CENTER);
    text("CLICK to start, then press SPACE to jump", width / 2, height / 2);
  }
}

function mousePressed() {
  gameStarted = true; // Set the flag to true when the mouse is pressed
}

function keyPressed() {
  if (key === " " && gameStarted) {
    // Check if the game has started
    if (y >= height - ground - size / 2) {
      // on the ground
      h = -jump;
    }
  }
}
