/* map-bg.js — amber animated link-analysis background for InvestigateAI content pages.
   Self-contained, non-interactive, sits behind page content. Honest note: this is an
   ambient/decorative network, not the live case-file chart (that lives on landing.html). */
(function(){
  if(document.getElementById("mapbg"))return;
  var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  var cv=document.createElement("canvas");cv.id="mapbg";
  function attach(){(document.body||document.documentElement).appendChild(cv);}
  if(document.body)attach();else document.addEventListener("DOMContentLoaded",attach);
  var ctx=cv.getContext("2d"),W,H,dpr;
  var seed=99;function rnd(){seed=(seed*1103515245+12345)&0x7fffffff;return seed/0x7fffffff;}
  var N=[],L=[],SEA=[];
  function build(){
    N=[];L=[];SEA=[];
    var hubN=7,hubs=[];
    for(var i=0;i<hubN;i++)hubs.push({x:W*(0.08+rnd()*0.84),y:H*(0.08+rnd()*0.84),hub:true,r:3+rnd()*2.5,ph:rnd()*6.28,amp:4+rnd()*6,spd:0.18+rnd()*0.28});
    N=hubs.slice();
    hubs.forEach(function(h){var m=5+(rnd()*11|0);for(var j=0;j<m;j++){var a=rnd()*6.28,rr=22+rnd()*70;var n={x:h.x+Math.cos(a)*rr,y:h.y+Math.sin(a)*rr,r:1.4+rnd()*2,ph:rnd()*6.28,amp:3+rnd()*4,spd:0.18+rnd()*0.3};N.push(n);L.push([h,n]);}});
    for(var k=0;k<12;k++)L.push([hubs[rnd()*hubN|0],hubs[rnd()*hubN|0]]);
    for(var s=0;s<150;s++)SEA.push({x:rnd()*W,y:rnd()*H,r:0.5+rnd()*1.7,ph:rnd()*6.28,amp:2+rnd()*5,spd:0.15+rnd()*0.3});
    N.forEach(function(n){n.bx=n.x;n.by=n.y;});SEA.forEach(function(p){p.bx=p.x;p.by=p.y;});
  }
  function size(){W=window.innerWidth;H=window.innerHeight;dpr=Math.min(2,window.devicePixelRatio||1);cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);build();}
  window.addEventListener("resize",function(){clearTimeout(window.__mbt);window.__mbt=setTimeout(size,200);});
  var t0=(window.performance&&performance.now())||Date.now();
  function osc(n,t){n.cx=n.bx+(reduce?0:Math.sin(t*n.spd+n.ph)*n.amp);n.cy=n.by+(reduce?0:Math.cos(t*n.spd*0.9+n.ph)*n.amp);}
  function frame(now){
    var t=(now-t0)/1000;ctx.clearRect(0,0,W,H);
    ctx.globalCompositeOperation="lighter";
    var g1=ctx.createRadialGradient(W*0.18,H*0.86,0,W*0.18,H*0.86,Math.max(W,H)*0.55);g1.addColorStop(0,"rgba(205,120,40,0.06)");g1.addColorStop(1,"rgba(205,120,40,0)");ctx.fillStyle=g1;ctx.fillRect(0,0,W,H);
    var g2=ctx.createRadialGradient(W*0.86,H*0.2,0,W*0.86,H*0.2,Math.max(W,H)*0.5);g2.addColorStop(0,"rgba(90,140,180,0.045)");g2.addColorStop(1,"rgba(90,140,180,0)");ctx.fillStyle=g2;ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation="source-over";
    SEA.forEach(function(p){p.cx=p.bx+(reduce?0:Math.sin(t*p.spd+p.ph)*p.amp);p.cy=p.by+(reduce?0:Math.cos(t*p.spd*0.9+p.ph)*p.amp);ctx.beginPath();ctx.arc(p.cx,p.cy,p.r,0,6.29);ctx.fillStyle="rgba(224,161,90,0.15)";ctx.fill();});
    N.forEach(function(n){osc(n,t);});
    L.forEach(function(e){ctx.beginPath();ctx.moveTo(e[0].cx,e[0].cy);ctx.lineTo(e[1].cx,e[1].cy);ctx.strokeStyle="rgba(210,170,110,0.10)";ctx.lineWidth=0.6;ctx.stroke();});
    N.forEach(function(n){ctx.beginPath();ctx.arc(n.cx,n.cy,n.r,0,6.29);ctx.fillStyle="#0a0c0f";ctx.fill();ctx.lineWidth=1;ctx.strokeStyle=n.hub?"rgba(240,170,80,0.5)":"rgba(200,150,90,0.32)";ctx.stroke();});
    if(!reduce)requestAnimationFrame(frame);
  }
  function start(){size();requestAnimationFrame(frame);}
  if(document.body)start();else document.addEventListener("DOMContentLoaded",start);
})();
