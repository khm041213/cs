var lastGridPos = {
  x : 0,
  y : 0
};

var handgate, targetgate;
var menuTimeoutId;

function touchToCanvasPos(touch)
{
  let domRect = document.getElementById('canvas').getBoundingClientRect();
  let position = [((touch.clientX - domRect.left)/(domRect.width)) * canvas.width,
    ((touch.clientY - domRect.top)/(domRect.height)) * canvas.height]
  return position;
}

function gateGrabEvent(grid)
{
  isOnGate=false;
  for(let i = 0; i < gateArray.length; i++){
    if(gateArray[i].x == Math.floor(grid[0]) && gateArray[i].y == Math.floor(grid[1])){
      isOnGate = true;
      isGrabWire=true;
      handgate = gateArray[i];
      targetgate = null;
      lastGridPos={x:grid[0],y:grid[1]};
    }
  }
}

function menuTimeoutEvent(grid)
{
  if(isOnGate)menuTimeoutId=setTimeout(MENU.show,MENU.delay,handgate,grid);
}

function clearMenuTimeoutEvent()
{
  clearTimeout(menuTimeoutId);
}

function gridMoveEvent(grid,touch)
{
  if(isOnGate==false)
  {
    let prev=canvasToGrid(...touch.prevPos);
    let delta=[grid[0]-prev[0],grid[1]-prev[1]];
    
    camera.x -= delta[0];
    camera.y -= delta[1];
  }
}

function gateReleaseEvent(grid,touch)
{
  if(isOnGate){
    for (let i = 0; i < gateArray.length; i++) {
      if (gateArray[i].x == Math.floor(grid[0]) && gateArray[i].y == Math.floor(grid[1])) {
        targetgate = gateArray[i];
      }
    }
    
    if(targetgate != null){
    
      if(handgate.gateID == targetgate.gateID && handgate.function != "SWITCH"){
        handgate.direction = (handgate.direction + 1) % 4
      } //게이트 회전
      
      else if(handgate.gateID == targetgate.gateID && GATE[handgate.function].onclick!==undefined){
        GATE[handgate.function].onclick(handgate);
        console.log(handgate)
      } //onclick 함수 실행
      
      else if(targetgate != null && handgate.geteID != targetgate.gateID){
        
        for(let i = 0; i < handgate.outputTargets.length; i++){
          
          if(handgate.outputTargets[i] == null){
            
            for(let j = 0; j < targetgate.isConnect.length; j++){
              
              if(targetgate.isConnect[j] == 0){
                
                console.log('연결가능상태');
                
                
                connect(handgate, i, targetgate, j)
                
                break;
              }
            }
            break;
          }
          else if(handgate.outputTargets[i].targetGate != targetgate && handgate.outputTargets.filter(x=>x!==null).length == GATE[handgate.function].output){
            
            for(let j = 0; j < handgate.outputTargets.length; j++)
            disconnect(handgate, j)
            console.log('disconnect')
            
          }
          else {
            console.log("handgate's output is full!")
            console.log(handgate)
          }
        }
      }
    }
    else{
      console.log("targetgate is null!");
      let outputlength = GATE[handgate.function].output;
      
      if(outputlength == 1 && handgate.outputTargets != null){
        disconnect(handgate, 0)
      }
      
      
    }
    return true;
  }
  return false;
}

function addGateEvent(grid,touch)
{
  if(!touch.isMove){
    GATELIST.place(grid)
    console.log('placed')
    return true;
  }
  return false;
}

var touchMap=new Map();
var touchStartEvents=
[
  function(grid)
  {
    var c=gridToCanvas(...grid);
    if(c[0]<0||c[1]<0||c[0]>canvas.width||c[1]>canvas.height)
    return true;
    return false;
  },
  MENU.onclick,
  GATELIST.onclick,
  SAVE.onclick,
  LOAD.onclick,
  ZOOM.in_onclick,
  ZOOM.out_onclick,
  gateGrabEvent,
  MENU.close,
  menuTimeoutEvent
];
var touchMoveEvents=
[
  ()=>MENU.isShow,
  clearMenuTimeoutEvent,
  function(grid)
  {
    lastGridPos={x:grid[0],y:grid[1]};
  },
  gridMoveEvent
];
var touchEndEvents=
[
  ()=>MENU.isShow,
  clearMenuTimeoutEvent,
  gateReleaseEvent,
  addGateEvent
];

function touchstart(touch)
{
  if(touch.isEventReturn)return;
  
  let gridPos=canvasToGrid(...touch.pos);
  
  for(let i=0;i<touchStartEvents.length;i++)
  {
    let func=touchStartEvents[i];
    if(func(gridPos,touch))
    {
      touch.isEventReturn=true;
      break;
    }
  }
}

function touchmove(touch)
{
  if(touch.isEventReturn)return;
  
  let gridPos=canvasToGrid(...touch.pos);
  
  for(let i=0;i<touchMoveEvents.length;i++)
  {
    let func=touchMoveEvents[i];
    if(func(gridPos,touch))
    {
      touch.isEventReturn=true;
      break;
    }
  }
}

function touchend(touch)
{
  if (touch.isEventReturn) return;

  let gridPos = canvasToGrid(...touch.pos);

  for (let i = 0; i < touchEndEvents.length; i++)
  {
    let func = touchEndEvents[i];
    if (func(gridPos, touch))
    {
      touch.isEventReturn = true;
      break;
    }
  }
}

window.ontouchstart = function(e){
  
  for(let i=0;i<e.touches.length;i++)
  {
    let t=e.touches[i];
    let id=t.identifier;
    
    if(!touchMap.has(id))
    {
      touchMap.set(id,
      {
        isEventReturn:false,
        isMove:false,
        pos:touchToCanvasPos(t),
        prevPos:touchToCanvasPos(t)
      });
      
      touchstart(touchMap.get(id));
    }
  }
}

window.ontouchmove = function(e){
  
  for(let i=0;i<e.targetTouches.length;i++)
  {
    let t=e.targetTouches[i];
    let id=t.identifier;
    
    if(touchMap.has(id))
    {
      let touch=touchMap.get(id);
      touch.prevPos=touch.pos;
      touch.pos=touchToCanvasPos(t);
      touch.isMove=true;
      
      touchmove(touch);
    }
  }
  
  
  
  if(!isOnGate){
    
  }
  else {
    isGrabWire = true;
  }
  
}

window.ontouchend = function(e){
  
  for(let i=0;i<e.changedTouches.length;i++)
  {
    let t=e.changedTouches[i];
    let id=t.identifier;
    
    if(touchMap.has(id))
    {
      let touch=touchMap.get(id);
      
      touchend(touch);
      touchMap.delete(id);
    }
  }
  
  isGrabWire = false;
}

window.onselectstart=()=>false;