let creature;
let button, resetButton;

//set the method to move through the noise values
let xoff = 0;
let col = 50;

function setup() {
  createCanvas(600, 600);

  colorMode(HSB, 50);

  creature = new Creature(createVector(width * 0.5, height * 0.5), 42);
  
  // Feed button
  button = createButton('Feed');
  button.position(230,450);
  button.mousePressed(feedCreature);
  
  // Reset button
  resetButton = createButton('Reset');
  resetButton.position(330, 450);
  resetButton.mousePressed(resetCreature);
}

function draw() {
  background(0);
  creature.render();

  col = map(noise(xoff), 0, 10, 0, 150);

  xoff += 0.01;
}

// Function for the mousePressed
function feedCreature () {
  creature.rad += 5;
}

// Reset the size of the creature
function resetCreature () {
  creature.rad = 42;
}

class Creature {
  constructor(pos, rad) {
    this.pos = {
      x: pos.x,
      y: pos.y,
    };
    this.rad = rad;
  }

  face() {
    push();

    fill(col, 100, 100); // Use noise-based color for the face
    noStroke();
    let cnt = 20;
    beginShape();
    let time = frameCount / 100;
    for (let i = 0; i <= cnt; i++) {
      let face = map(i, 0, cnt, 0, TWO_PI);
      let r = this.rad * (0.8 + noise(sin(face) + 1, cos(face) + 1, time) * 1.5);
      let x = this.pos.x + r * cos(face) + 1;
      let y = this.pos.y + r * sin(face) + 1;
      curveVertex(x, y);
    }
    endShape(CLOSE);
    pop();

    return this;
  }

  antenna() {
    push();
    stroke(255);
    strokeWeight(3);
    line(this.pos.x * 0.8, this.pos.y * 0.6, this.pos.x + 5, this.pos.y); //left
    line(this.pos.x * 1.2, this.pos.y * 0.6, this.pos.x - 5, this.pos.y); //right

    noStroke();
    let cnt = 50;
    let time = frameCount / 100;

    // Left "antenna"
    beginShape();
    fill(col, 100, 100);
    for (let i = 0; i <= cnt; i++) {
      let angle = map(i, 0, cnt, 0, TWO_PI);
      let r = 20 * (0.8 + noise(sin(angle) + 2, cos(angle) + 2, time) * 0.2);
      let x = this.pos.x - 60 + r * cos(angle);
      let y = this.pos.y - 130 + r * sin(angle);
      curveVertex(x, y);
    }
    endShape(CLOSE);

    // Right "antenna"
    beginShape();
    fill(col, 100, 100);
    for (let i = 0; i <= cnt; i++) {
      let angle = map(i, 0, cnt, 0, TWO_PI);
      let r = 20 * (0.8 + noise(sin(angle) + 2, cos(angle) + 2, time) * 0.2);
      let x = this.pos.x + 60 + r * cos(angle);
      let y = this.pos.y - 130 + r * sin(angle);
      curveVertex(x, y);
    }
    endShape(CLOSE);

    pop();
    return this;
  }

  eyes() {
    push();
    noStroke();
    fill(255);
    ellipse(this.pos.x - 20, this.pos.y - 5, 40);
    ellipse(this.pos.x + 20, this.pos.y - 5, 40);
    fill(0); //eyeball
    ellipse(this.pos.x - 20, this.pos.y - 5, map(mouseX, 8, width, 10, 20));
    ellipse(this.pos.x + 20, this.pos.y - 5, map(mouseX, 8, width, 10, 20));
    pop();

    return this;
  }

  render() {
    this.antenna();
    this.face();
    this.eyes();
  }
}
