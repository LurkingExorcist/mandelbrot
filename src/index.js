const math = require('mathjs');
const { createColors } = require('color-map');

const canvas = document.getElementById('cnvs');
const width = 20;
const height = 20;

canvas.width = width;
canvas.height = height;

let image = math.zeros(width, height);
const ctx = canvas.getContext('2d');

const drawDot = (x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 1, 1);
};

const 
  pmin = -2.5, 
  pmax = 1.5, 
  qmin = -2, 
  qmax = 2,
  max_iterations = 255,
  infinity_border = 10;

const linspace = (min, max, fractions) => {
  const range = max - min;
  return [...new Array(fractions)].map((_, i) => 
    +math.format(
      math.evaluate(`${min} + (${range}/${fractions})*${i}`), {precision: 14}
    )
  );
}

const abs = c => math.sqrt(math.add(c.re*c.re, c.im*c.im));

// console.log(math)
// console.log(linspace(pmin, pmax, width))
const prange = linspace(pmin, pmax, width);
const qrange = linspace(qmin, qmax, height);

prange.forEach((p, ip) => {
  qrange.forEach((q, iq) => {
    const c = math.complex(p, q);
    // console.log(c)
    let z = 0;

    for(let k = 0; k < max_iterations; k++){
      z = math.add(math.square(z), c);

      if(abs(z) > infinity_border){
        // console.log(c);
        image._data[ip][iq] = k;
        break;
      }
    }
  })
})

// image = math.transpose(image);
// console.log(image);

const render = () => 
  image._data.forEach((p, i) => {
  p.forEach((q, j) => {
    if(q != 0){
      q = 255 - (q*3 % 255);
      drawDot(i, j, `rgba(${q}, ${q}, ${q})`);
    }else{
      drawDot(i, j, `rgba(0, 0, 0)`);
    }
  })
});

render();

// let z = 0;
// for(let i = 0; i < 3; i++){
//   z = math.add(math.square(z), math.complex(2, i));
// }

// console.log(z)