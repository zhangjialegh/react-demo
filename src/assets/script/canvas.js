//----------------------------------------------------------------------
const bkstar=document.getElementById('bkstar');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let W, H, nodes = [], edges = [];
window.addEventListener('resize',fn);
function fn(){
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  bkstar.style.width=W+'px';
  bkstar.style.height=H+'px';
  const gradient = ctx.createLinearGradient(0, 0, 0, H);
  gradient.addColorStop(0, 'rgb(201, 249, 239)');
  gradient.addColorStop(1, 'rgb(96, 174, 241)');
  ctx.fillStyle=gradient;
  ctx.fillRect(0,0,W,H);
  createParticles(W * H / 85000);
}
fn();

function createParticles(n){
  if(n !== nodes.length){
    nodes = [];
    edges = [];
    for(let i=0; i<n; i++){
      let node = {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        r: Math.random() > 0.9 ? Math.random() * 3 + 7 : Math.random() * 3 + 5,
        color: 'rgba(255, 255, 255, 0.5)'
      };
      nodes.push(node);
    }
  }
  for(let i=0, len=nodes.length; i<len; i++){
    for(let j=i+1; j<len; j++){
      edges.push({
        start: nodes[i],
        end: nodes[j]
      })
    }
  }
}

function update(){
  nodes.forEach(function(item, i) {
    item.x += item.vx;
    item.y += item.vy;
    if(item.x - item.r <= 0 || item.x + item.r >= W){
      item.vx *= -1;
    }
    if(item.y - item.r <= 0 || item.y + item.r >= H){
      item.vy *= -1;
    }
  });
}

function render(){
  ctx.clearRect(0, 0, W, H);
  ctx.fillRect(0, 0, W, H);
  
  nodes.forEach(function(item, i) {
    ctx.save();
    ctx.fillStyle = item.color;
    ctx.beginPath();
    ctx.arc(item.x, item.y, item.r, 0, 2*Math.PI);
    ctx.fill();
    ctx.restore();
  });
  
  edges.forEach(function(item) {
    let l = distance(item);
    let s = W > H ? W/8 : H/8;
    
    if(l > s) return;
    
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.globalAlpha = 1 - l/s;
    ctx.lineWidth = (1 - l/s) * 2;
    ctx.beginPath();
    ctx.moveTo(item.start.x, item.start.y);
    ctx.lineTo(item.end.x, item.end.y);
    ctx.stroke();
    ctx.restore();
  });
}

function distance(node){
  let x = Math.pow(node.start.x - node.end.x, 2);
  let y = Math.pow(node.start.y - node.end.y, 2);
  return Math.sqrt(x + y);
}

(function fn(){
  window.requestAnimationFrame(fn);
  update();
  render();
})();