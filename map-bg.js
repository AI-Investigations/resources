/* map-bg.js - amber animated link-analysis background for InvestigateAI content pages.
   Non-interactive, sits behind the page. The network is concentrated in the side gutters
   (left/right of the centred 1200px content column), so the visible uncovered strips show
   fragments of links and entities, with the rest cropped behind the content.
   Honest note: this is an ambient/decorative network, not the live case-file chart
   (that lives on the link map at index.html). */
(function(){
  if(document.getElementById("mapbg"))return;
  var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  var cv=document.createElement("canvas");cv.id="mapbg";
  function attach(){(document.body||document.documentElement).appendChild(cv);}
  if(document.body)attach();else document.addEventListener("DOMContentLoaded",attach);
  var ctx=cv.getContext("2d"),W,H,dpr,COL=1200;
  var seed=99;function rnd(){seed=(seed*1103515245+12345)&0x7fffffff;return seed/0x7fffffff;}
  var N=[],L=[],SEA=[],gutter=0;
  function build(){
    N=[];L=[];SEA=[];
    gutter=Math.max(20,(W-COL)/2);
    // two gutter bands; allow ~34px bleed inward (toward the content edge) for the cropped look
    var bands=[{x0:-12,x1:gutter+34},{x0:W-gutter-34,x1:W+12}];
    var per=gutter>200?5:gutter>110?4:3;
    var hubIdx=[];
    bands.forEach(function(b){
      for(var i=0;i<per;i++){
        var hx=b.x0+(b.x1-b.x0)*(0.15+rnd()*0.7);
        var hy=H*(0.05+(i+rnd())/per*0.9);
        var hi=N.length;
        N.push({x:hx,y:hy,hub:true,r:3+rnd()*2.4,ph:rnd()*6.28,amp:3+rnd()*5,spd:0.16+rnd()*0.28});
        hubIdx.push(hi);
        var m=6+(rnd()*9|0),reach=22+gutter*0.55;
        for(var j=0;j<m;j++){
          var a=rnd()*6.28,rr=14+rnd()*reach;
          N.push({x:hx+Math.cos(a)*rr,y:hy+Math.sin(a)*rr,r:1.3+rnd()*2,ph:rnd()*6.28,amp:2.5+rnd()*4,spd:0.18+rnd()*0.3});
          L.push([hi,N.length-1]);
        }
      }
    });
    // chain hubs on the same side into loose vertical webs
    for(var a2=0;a2<hubIdx.length;a2++)for(var b2=a2+1;b2<hubIdx.length;b2++){
      var na=N[hubIdx[a2]],nb=N[hubIdx[b2]];
      if((na.x<W/2)===(nb.x<W/2)&&Math.abs(na.y-nb.y)<H*0.5&&rnd()<0.45)L.push([hubIdx[a2],hubIdx[b2]]);
    }
    // POI sea, also confined to the gutter bands
    for(var s=0;s<150;s++){var bb=bands[s%2];SEA.push({x:bb.x0+(bb.x1-bb.x0)*rnd(),y:rnd()*H,r:0.5+rnd()*1.6,ph:rnd()*6.28,amp:2+rnd()*4,spd:0.15+rnd()*0.3});}
    N.forEach(function(n){n.bx=n.x;n.by=n.y;});SEA.forEach(function(p){p.bx=p.x;p.by=p.y;});
  }
  function size(){W=window.innerWidth;H=window.innerHeight;dpr=Math.min(2,window.devicePixelRatio||1);cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);build();}
  window.addEventListener("resize",function(){clearTimeout(window.__mbt);window.__mbt=setTimeout(size,200);});
  var t0=(window.performance&&performance.now())||Date.now();
  function osc(n,t){n.cx=n.bx+(reduce?0:Math.sin(t*n.spd+n.ph)*n.amp);n.cy=n.by+(reduce?0:Math.cos(t*n.spd*0.9+n.ph)*n.amp);}
  function frame(now){
    var t=(now-t0)/1000;ctx.clearRect(0,0,W,H);
    ctx.globalCompositeOperation="lighter";
    var g1=ctx.createRadialGradient(gutter*0.5,H*0.82,0,gutter*0.5,H*0.82,Math.max(W,H)*0.4);g1.addColorStop(0,"rgba(205,120,40,0.07)");g1.addColorStop(1,"rgba(205,120,40,0)");ctx.fillStyle=g1;ctx.fillRect(0,0,W,H);
    var g2=ctx.createRadialGradient(W-gutter*0.5,H*0.22,0,W-gutter*0.5,H*0.22,Math.max(W,H)*0.36);g2.addColorStop(0,"rgba(90,140,180,0.05)");g2.addColorStop(1,"rgba(90,140,180,0)");ctx.fillStyle=g2;ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation="source-over";
    SEA.forEach(function(p){p.cx=p.bx+(reduce?0:Math.sin(t*p.spd+p.ph)*p.amp);p.cy=p.by+(reduce?0:Math.cos(t*p.spd*0.9+p.ph)*p.amp);ctx.beginPath();ctx.arc(p.cx,p.cy,p.r,0,6.29);ctx.fillStyle="rgba(224,161,90,0.16)";ctx.fill();});
    N.forEach(function(n){osc(n,t);});
    L.forEach(function(e){ctx.beginPath();ctx.moveTo(N[e[0]].cx,N[e[0]].cy);ctx.lineTo(N[e[1]].cx,N[e[1]].cy);ctx.strokeStyle="rgba(210,170,110,0.11)";ctx.lineWidth=0.6;ctx.stroke();});
    N.forEach(function(n){ctx.beginPath();ctx.arc(n.cx,n.cy,n.r,0,6.29);ctx.fillStyle="#0a0c0f";ctx.fill();ctx.lineWidth=1;ctx.strokeStyle=n.hub?"rgba(240,170,80,0.55)":"rgba(200,150,90,0.34)";ctx.stroke();});
    if(!reduce)requestAnimationFrame(frame);
  }
  function start(){size();requestAnimationFrame(frame);}
  if(document.body)start();else document.addEventListener("DOMContentLoaded",start);
})();
