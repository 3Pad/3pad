// get the canvas element
var canvas = document.getElementById('canvas');

// get a reference to the drawing context
var ctx = canvas.getContext('2d');

// create an array to hold the confetti pieces
var confetti = [];

// create a function to generate a random number within a given range
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// create a function to generate a random color
function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

// create a function to generate a random size for the confetti pieces
function randomSize() {
  return Math.floor(Math.random() * 10) + 10;
}

// create a function to generate a random velocity for the confetti pieces
function randomVelocity() {
  return random(-10, 10);
}

// create a function to generate a random angle for the confetti pieces
function randomAngle() {
  return random(0, 2 * Math.PI);
}

// create a function to draw a single confetti piece on the canvas
function drawConfetti(confetti) {
  ctx.beginPath();
  ctx.arc(confetti.x, confetti.y, confetti.size, 0, 2 * Math.PI);
  ctx.fillStyle = confetti.color;
  ctx.fill();
}

// create a function to update the position of the confetti pieces
function updateConfetti() {
  confetti.forEach(function(c) {
    // update the x and y position of the confetti piece
    c.x += c.vx;
    c.y += c.vy;

    // if the confetti piece has fallen off the bottom of the screen,
    // generate new values for its position, size, velocity, and angle
    if (c.y > canvas.height) {
      c.x = random(0, canvas.width);
      c.y = random(-100, 0);
      c.size = randomSize();
      c.vx = randomVelocity();
      c.vy = randomVelocity();
      c.angle = randomAngle();
    }
  });
}

// create a function to animate the confetti
function animateConfetti() {
  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // update the position of the confetti pieces
  updateConfetti();

  // draw the confetti pieces on the canvas
  confetti.forEach(drawConfetti);

  // animate the confetti again on the next frame
  requestAnimationFrame(animateConfetti);
}

// create a function to initialize the confetti
function startConfetti() {
  // generate a random position, size, velocity, and angle for each confetti piece
  for (var i = 0; i < 100; i++) {
    confetti.push({
      x: random(0, canvas.width),
      y: random(-100, 0),
      size: randomSize(),
      color: randomColor(),
      vx: randomVelocity(),
      vy: randomVelocity(),
      angle: randomAngle()
    });
  }

  // start animating the confetti
  animateConfetti();
}

// start the confetti when the page loads
window.addEventListener('load', startConfetti);
