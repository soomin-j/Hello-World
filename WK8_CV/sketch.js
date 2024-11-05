let video;
let handPose;
let hands = [];
let brush;
let px = 0;
let py = 0;

function preload() {
  handPose = ml5.handPose({ flipped: true });
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);
  brush = createGraphics(640, 480);
  brush.clear(); // transparent bg

  video = createCapture(VIDEO, { flipped: true });
  video.hide();
  handPose.detectStart(video, gotHands);
}

function draw() {
  image(video, 0, 0);
  if (hands.length > 0) {
    let hand = hands[0];
    let index = hand.index_finger_tip;
    let thumb = hand.thumb_tip;
    let wrist = hand.wrist;

    let x = (index.x + thumb.x) * 0.5;
    let y = (index.y + thumb.y) * 0.5;
    let d = dist(index.x, index.y, thumb.x, thumb.y);

    // Draw with finger brush
    if (d < 20) {
      brush.stroke(53, 252, 209);
      brush.strokeWeight(8);
      brush.line(px, py, x, y);
    }

    if (d > 50) {
      brush.erase(255, 255);
      brush.ellipse(wrist.x, wrist.y, 80, 80);
      brush.noErase();
    }
    px = x;
    py = y;
  }
  image(brush, 0, 0);
}
