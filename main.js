const bgChanger = () => {
  if (this.scrollY > this.innerHeight / 2) {
    firstSection.classList.add("bg-active");
  } else {
    firstSection.classList.remove("bg-active");
  }

  if (this.scrollY > this.innerHeight / 1.2) {
    secondSection.classList.add("bg-active-second");
  } else {
    secondSection.classList.remove("bg-active-second");
  }
};

let firstSection = document.getElementById("first-section");
let secondSection = document.getElementById("second-section");
window.addEventListener("scroll", bgChanger);

const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

let mouse = {
  x: undefined,
  y: undefined
};

let maxRadius = 40;

let colorArray = ["#605A8C", "#7C76A6", "#485059", "#79838C", "#B4BBBF"];

window.addEventListener("mousemove", function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minimumRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  };

  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minimumRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}

let circleArray = [];

function init() {
  circleArray = [];

  for (let index = 0; index < 800; index++) {
    var radius = Math.random() * 3 + 1;
    var x = Math.random() * (innerWidth - radius * 2);
    var y = Math.random() * (innerHeight - radius * 2);
    var dx = (Math.random() - 0.5) * 3;
    var dy = (Math.random() - 0.5) * 3;
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let index = 0; index < circleArray.length; index++) {
    circleArray[index].update();
  }
}

init();
animate();
