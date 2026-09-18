// STEP 1: local statistical demo. No live betting connection.
const results = [7,2,9,4,6,1,8,3,5,0,7,6,2,8,4,9,1,5,3,6];
let seconds = 60;
let logs = [];

function type(n){return n>=5?'BIG':'SMALL'}
function update(){
  const period = Date.now().toString().slice(0,13);
  document.querySelector('#period').textContent = period;
  document.querySelector('#timer').textContent = seconds;
  const big = results.filter(n=>n>=5).length/results.length*100;
  const small = 100-big;
  document.querySelector('#big').textContent = big.toFixed(0)+'%';
  document.querySelector('#small').textContent = small.toFixed(0)+'%';
  document.querySelector('#recent').textContent = type(results[0]);
  let s=1; for(let i=1;i<results.length;i++){if(type(results[i])===type(results[0]))s++;else break}
  document.querySelector('#streak').textContent = type(results[0])+' Ã—'+s;

  // Conservative demo rule: only signal when historical split is sufficiently uneven.
  const edge = Math.abs(big-small);
  let sig='NO SIGNAL', conf=50;
  if(edge>=20){sig=big>small?'BIG':'SMALL'; conf=Math.min(75,50+edge/2)}
  document.querySelector('#signal').textContent=sig;
  document.querySelector('#confidence').textContent=sig==='NO SIGNAL'?'Insufficient statistical edge':conf.toFixed(0)+'% statistical confidence';
  document.querySelector('#bar').style.width=conf+'%';

  document.querySelector('#history').innerHTML=results.slice(0,12).map(n=>`<div class="ball ${n>=5?'big':'small'}">${n}</div>`).join('');
}
setInterval(()=>{seconds--;if(seconds<0){seconds=60;results.unshift(Math.floor(Math.random()*10));results.splice(30);};update()},1000);
update();
