/* map-bg.js - amber animated link-analysis background for InvestigateAI content pages.
   A full-viewport network of bubbles and links (echoing the landing map). The page content
   sits on top and "crops" it, so the uncovered side gutters always reveal populated,
   link-rich regions rather than empty dark. Non-interactive; density/brightness scale with
   the viewport. Hidden on narrow screens (handled by the page's injected style).
   Honest note: this is an ambient/decorative network, not the live case-file chart
   (that lives on the link map at index.html). */
(function(){
  if(document.getElementById("mapbg"))return;
  var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  var cv=document.createElement("canvas");cv.id="mapbg";
  function attach(){(document.body||document.documentElement).appendChild(cv);}
  if(document.body)attach();else document.addEventListener("DOMContentLoaded",attach);
  var ctx=cv.getContext("2d"),W,H,dpr,gutter=0;
  var seed=99;function rnd(){seed=(seed*1103515245+12345)&0x7fffffff;return seed/0x7fffffff;}
  var N=[],L=[],SEA=[];
  function build(){
    N=[];L=[];SEA=[];
    gutter=Math.max(20,(W-1200)/2);
    var area=W*H;
    var hubN=Math.max(12,Math.min(52,Math.round(area/105000)));
    var hubIdx=[];
    for(var i=0;i<hubN;i++){
      var hx=W*(0.02+rnd()*0.96),hy=H*(0.03+rnd()*0.94),hi=N.length;
      N.push({x:hx,y:hy,hub:true,r:3+rnd()*2.6,ph:rnd()*6.28,amp:3+rnd()*5,spd:0.16+rnd()*0.28});
      hubIdx.push(hi);
      var m=7+(rnd()*10|0);
      for(var j=0;j<m;j++){
        var a=rnd()*6.28,rr=16+rnd()*96;
        N.push({x:hx+Math.cos(a)*rr,y:hy+Math.sin(a)*rr,r:1.3+rnd()*2,ph:rnd()*6.28,amp:2.4+rnd()*4,spd:0.18+rnd()*0.3});
        L.push([hi,N.length-1]);
      }
    }
    // bridge nearby hubs into a web
    for(var a2=0;a2<hubIdx.length;a2++)for(var b2=a2+1;b2<hubIdx.length;b2++){
      var na=N[hubIdx[a2]],nb=N[hubIdx[b2]];
      if(Math.hypot(na.x-nb.x,na.y-nb.y)<W*0.16&&rnd()<0.5)L.push([hubIdx[a2],hubIdx[b2]]);
    }
    var seaN=Math.max(220,Math.min(560,Math.round(area/8500)));
    for(var s=0;s<seaN;s++)SEA.push({x:rnd()*W,y:rnd()*H,r:0.5+rnd()*1.7,ph:rnd()*6.28,amp:2+rnd()*4,spd:0.15+rnd()*0.3});
    N.forEach(function(n){n.bx=n.x;n.by=n.y;});SEA.forEach(function(p){p.bx=p.x;p.by=p.y;});
  }
  function size(){W=window.innerWidth;H=window.innerHeight;dpr=Math.min(2,window.devicePixelRatio||1);cv.width=W*dpr;cv.height=H*dpr;cv.style.width=W+"px";cv.style.height=H+"px";ctx.setTransform(dpr,0,0,dpr,0,0);build();}
  window.addEventListener("resize",function(){clearTimeout(window.__mbt);window.__mbt=setTimeout(size,200);});
  var t0=(window.performance&&performance.now())||Date.now();
  function osc(n,t){n.cx=n.bx+(reduce?0:Math.sin(t*n.spd+n.ph)*n.amp);n.cy=n.by+(reduce?0:Math.cos(t*n.spd*0.9+n.ph)*n.amp);}
  function frame(now){
    var t=(now-t0)/1000;ctx.clearRect(0,0,W,H);
    ctx.globalCompositeOperation="lighter";
    // warm/cool wash on the gutters so the sides never read as flat black
    var lw=ctx.createLinearGradient(0,0,gutter,0);lw.addColorStop(0,"rgba(160,95,42,0.14)");lw.addColorStop(1,"rgba(160,95,42,0)");ctx.fillStyle=lw;ctx.fillRect(0,0,gutter,H);
    var rw=ctx.createLinearGradient(W,0,W-gutter,0);rw.addColorStop(0,"rgba(72,112,152,0.11)");rw.addColorStop(1,"rgba(72,112,152,0)");ctx.fillStyle=rw;ctx.fillRect(W-gutter,0,gutter,H);
    var g1=ctx.createRadialGradient(gutter*0.5,H*0.7,0,gutter*0.5,H*0.7,Math.max(W,H)*0.45);g1.addColorStop(0,"rgba(214,128,48,0.10)");g1.addColorStop(1,"rgba(214,128,48,0)");ctx.fillStyle=g1;ctx.fillRect(0,0,W,H);
    var g2=ctx.createRadialGradient(W-gutter*0.5,H*0.25,0,W-gutter*0.5,H*0.25,Math.max(W,H)*0.4);g2.addColorStop(0,"rgba(95,145,185,0.09)");g2.addColorStop(1,"rgba(95,145,185,0)");ctx.fillStyle=g2;ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation="source-over";
    SEA.forEach(function(p){p.cx=p.bx+(reduce?0:Math.sin(t*p.spd+p.ph)*p.amp);p.cy=p.by+(reduce?0:Math.cos(t*p.spd*0.9+p.ph)*p.amp);ctx.beginPath();ctx.arc(p.cx,p.cy,p.r,0,6.29);ctx.fillStyle="rgba(228,168,95,0.30)";ctx.fill();});
    N.forEach(function(n){osc(n,t);});
    L.forEach(function(e){ctx.beginPath();ctx.moveTo(N[e[0]].cx,N[e[0]].cy);ctx.lineTo(N[e[1]].cx,N[e[1]].cy);ctx.strokeStyle="rgba(222,178,112,0.22)";ctx.lineWidth=0.8;ctx.stroke();});
    N.forEach(function(n){ctx.beginPath();ctx.arc(n.cx,n.cy,n.r,0,6.29);ctx.fillStyle="#0c0e12";ctx.fill();ctx.lineWidth=1.1;ctx.strokeStyle=n.hub?"rgba(248,190,100,0.85)":"rgba(234,174,94,0.58)";ctx.stroke();});
    if(!reduce)requestAnimationFrame(frame);
  }
  function start(){size();requestAnimationFrame(frame);}
  if(document.body)start();else document.addEventListener("DOMContentLoaded",start);
})();
