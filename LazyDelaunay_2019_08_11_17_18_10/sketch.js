const _W = 1920;
const _H = 1080;
const rows = 10;
const cols = 10;

let stepX = _W / (cols - 2);
let stepY = _H / (rows - 2);

let points = [];
let colors = [];

function setup() {
  createCanvas(_W, _H);

  for (let x = 0; x < cols; x++) {
    points[x] = [];
    let startX = -stepX + x * stepX;
    for (let y = 0; y < rows; y++) {
      let startY = -stepY + y * stepY;
      points[x][y] = createVector(random(startX, startX + stepX),
        random(startY, startY + stepY));
      //colors.push(color(random(50,255), random(100,255), random(100,255), 20));
      colors.push(color(random(50, 200), 20));
    }
  }
  background(0);
}

function drawGrid(x, y) {
  if (x == 0) {
    line(0, y * stepY, _W, y * stepY);
  }
  if (y == 0) {
    line(x * stepX, 0, x * stepX, _H);
  }
}


let t = 0;
let firstFrame = true;
function draw() {
  
  t += 0.003;
  for (let x = 0; x < cols; x++) {
    let startX = x * stepX;


    for (let y = 0; y < rows; y++) {
      points[x][y] = getPointPositionFromNoise(x, y, t);
      let startY = y * stepY;

      strokeWeight(2);
      let cur = points[x][y];
      let r = noise(x + y, y * x);
      // if (r <= 0.2)
      //     drawAsTriangle(x,y,t);
      // else if (r <= 0.4)
      //     drawAsTriangle2(x,y,t);
      // else
      drawAsSquare(x, y, t);


    }


  }
  if (firstFrame)
  {
    firstFrame = false;
    for(let i = 0; i < colors.length; i++) {
      colors[i].setAlpha(10);
    }
  }
  
}

function drawAsSquare(x, y, t) {
  if (x < points.length - 1 && y < points[x].length - 1) {

    fill(colors[(x * cols + y) % colors.length])
    beginShape();

    vertex(points[x][y].x, points[x][y].y);
    vertex(points[x + 1][y].x, points[x + 1][y].y);
    vertex(points[x + 1][y + 1].x, points[x + 1][y + 1].y);
    vertex(points[x][y + 1].x, points[x][y + 1].y);
    endShape();
  }
}

function drawAsTriangle(x, y, t) {
  if (x < points.length - 1 && y < points[x].length - 1) {
    fill(colors[(x * cols + y) % colors.length])
    beginShape();

    vertex(points[x][y].x, points[x][y].y);
    vertex(points[x + 1][y].x, points[x + 1][y].y);
    vertex(points[x + 1][y + 1].x, points[x + 1][y + 1].y);
    endShape(CLOSE);
    fill(colors[(y * rows + x) % colors.length])

    beginShape();
    vertex(points[x][y].x, points[x][y].y);
    vertex(points[x + 1][y + 1].x, points[x + 1][y + 1].y);
    vertex(points[x][y + 1].x, points[x][y + 1].y);
    endShape(CLOSE);
  }
}

function drawAsTriangle2(x, y, t) {
  if (x < points.length - 1 && y < points[x].length - 1) {
    fill(colors[(x * cols + y) % colors.length])
    beginShape();

    vertex(points[x][y].x, points[x][y].y); // A
    vertex(points[x + 1][y].x, points[x + 1][y].y); // B
    vertex(points[x][y + 1].x, points[x][y + 1].y); // A

    endShape(CLOSE);
    fill(colors[(y * rows + x) % colors.length])
    beginShape();
    vertex(points[x + 1][y].x, points[x + 1][y].y); // B
    vertex(points[x + 1][y + 1].x, points[x + 1][y + 1].y); // A

    vertex(points[x][y + 1].x, points[x][y + 1].y); // A


    endShape(CLOSE);
  }
}

function getPointPositionFromNoise(x, y, t) {
  let startX = -stepX + x * stepX;
  let startY = -stepY + y * stepY;
  return createVector(startX + noise((x * stepX) + (y * stepX) + t) * stepX,
    startY + noise((y * stepY) + (x * stepX) + t) * stepY);
}

function getPointPositionFromWave(x, y, t) {
  let startX = -stepX + x * stepX;
  let startY = -stepY + y * stepY;
  let valx = map(sin(t + x + y), -1, 1, 0, 1) * 0.5;
  let valy = map(sin(t + x - y), -1, 1, 0, 1) * 0.8;
  return createVector(startX + valx * stepX,
    startY + valy * stepY);
}