const W = 500;
const H = 500;
const Xoffset = W / 2.0;
const Yoffset = H / 2.0;
const gridx = W / 10;
let canvas;
const gridy = H / 10;
const stepx = 1.0 / W;
const stepy = 1.0 / H;

var camPos;
var buffer;
var s;
function setup() {
    colorMode(RGB, 255);
    camPos = createVector(0,0, -1.0);

    canvas = createCanvas(W, H);
    buffer = createImage(W, H);
    //background(122);
    var r = new Ray(camPos, createVector(0, 0, 0) - camPos);
    s = new Sphere(createVector(0,0, 4.0), 1.0, color(255,255, 255, 255));
}

function writeColor(image, x, y, pixelcolor) {
    const index = (x + y * width) * 4;
    image.pixels[index] = red(pixelcolor);
    image.pixels[index + 1] = green(pixelcolor);
    image.pixels[index + 2] = blue(pixelcolor);
    image.pixels[index + 3] = alpha(pixelcolor);
  }


  function writeCanvas(x, y, pixelcolor) {
    const index = (x + y * width) * 4;
    pixels[index] = red(pixelcolor);
    pixels[index + 1] = green(pixelcolor);
    pixels[index + 2] = blue(pixelcolor);
    pixels[index + 3] = alpha(pixelcolor);
  }
  var time = 0.0;
  function draw()
  {
      //background(155);
      loadPixels();
      for (let y = 0; y < height; y++) {
            for (let x = 0; x < height; x++) {
                let r = (x* 255.0 / width) * cos % 255;
                let g = ((height -y) * 255.0 / height) % 255;;
                let b =  ((width -x) * 255.0 / width) % 255;;

                let c = color(r,g,b,255);
                writeCanvas(x, y, c);
            }
        }

      updatePixels();
  }
// function draw() {
//     let deltaTime = window.performance.now() - canvas._pInst._lastFrameTime;
//     time += deltaTime / 100.0;

//     buffer.loadPixels();

//     for (let x = 0; x < width; x++) {
//         for (let y = 0; y < height; y++) {
//             let r = (x* 255.0 / width) * cos(time) % 255;
//             let g = ((height -y) * 255.0 / height) % 255;;
//             let b =  ((width -x) * 255.0 / width) % 255;;

//             let c = color(r,g,b,255);
//             writeColor(buffer, x , y, c);
//         }
//     }


//             //let ray = new Ray(camPos, createVector(x,y, 0.0).sub(camPos), Infinity);
//             //let result = s.Intersect(ray);

//             // if (result)
//             //     writeColor(buffer, ix, iy, result);

//             // TODO: Generate ray
//             // Intersect with h

//     buffer.updatePixels();
//     image(buffer, 0, 0);
//     //noLoop();
// }