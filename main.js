// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {
  constructor(x, y, valX, valY, color, size) {
    this.x = x
    this.y = y
    this.valx = valX
    this.valy = valY
    this.color = color
    this.size = size
  }

  draw() {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    ctx.fill()
  }

  update() {
    if (this.x + this.size >= width) {
      this.valx = -(this.valx)
    }

    if (this.x - this.size <= 0) {
      this.valx = -(this.valx)
    }

    if (this.y + this.size >= height) {
      this.valy = -(this.valy)
    }

    if(this.y - this.size <= 0) {
      this.valy = -(this.valy)
    }

    this.x += this.valx
    this.y += this.valy
  }

  collisionDetect() {
  for (const ball of balls) {
    if (this !== ball) {
      const dx = this.x - ball.x;
      const dy = this.y - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + ball.size) {
        ball.color = this.color = randomRGB();
      }
    }
  }
}
}

const balls = [];
while (balls.length < 15) {
  const size = random(10, 20)
  const ball = new Ball(
    random(0+size, width-size),
    random(0 + size, height-size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  )
  balls.push(ball)
}

const loop = () => {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)"
  ctx.fillRect(0, 0, width, height)

  balls.map((ball) => {
    ball.draw()
    ball.update()
    ball.collisionDetect()
  })

  requestAnimationFrame(loop);
}

loop()
