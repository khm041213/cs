var ctx = canvas.getContext("2d");
var w = window.innerWidth;
var h = window.innerHeight;
canvas.width=w;
canvas.height=h;

var camera = {
  x : 0,
  y : 0,
  zoom : 100
};

const FPS = 60;

var gateArray=[];

var idnum = 0;
var isOnGate = 0;
var isGrabWire = false;


function canvasToGrid(x, y) {
  let p = (x - canvas.width / 2) / camera.zoom + camera.x;
  let q = (y - canvas.height / 2) / camera.zoom + camera.y;

  return [p, q];
}

function gridToCanvas(x, y) {
  let p = (x - camera.x) * camera.zoom + canvas.width / 2;
  let q = (y - camera.y) * camera.zoom + canvas.height / 2;

  return [p, q];
}

function rotate2d(x, y, a) {
  let dis = Math.sqrt((x) ** 2 + (y) ** 2);
  let theta1 = Math.atan2(y, x);
  let theta2 = a + theta1;
  return [dis * Math.cos(theta2), dis * Math.sin(theta2)];
}

function addGate(selectedGate, px, py){
  let temp = {
    function : selectedGate,
    gateID : idnum,
    
    
    x : px,
    y : py,
    direction : 0,
    
    input : [],
    isConnect : [],
    
    output : [],
    outputTargets : []
  };
  
  let s = GATE[temp.function];
  if(s == undefined) throw('this function is not defined!')
  else {
    for(let i = 0; i < s.input; i++){
      temp.input[i] = null;
      temp.isConnect[i] = 0;
    }
    
    for(let i = 0; i < s.output; i++){
      
      temp.output[i] = null;
      temp.outputTargets[i] = null;
    }
  }
  if(temp.function == "SWITCH"){
    temp.output[0] = 0;
  }
  
  
  gateArray.push(temp);
  idnum++;
  
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}


function logicCalc(){
  for(let i = 0; i < gateArray.length; i++){
    let temp = gateArray[i];
    
    //let isNull = 0;
    
    if(GATE[temp.function].calc == undefined) continue;
    
    
    for(let j = 0; j < temp.input.length; j++){
      if(temp.input[j] == null){
        //isNull = true;
        //break;
        temp.input[j] = 0;
      }
    }
    /*if(isNull){
      for(let j = 0; j < GATE[temp.function].output; j++){
        temp.output[j] = null;
      }
      continue;
    }*/
    
    temp.output = GATE[temp.function].calc(temp);
    
  }
}


function logicStep(){
  for(let i = 0; i < gateArray.length; i++){
    if(gateArray[i].function=='CROSS')continue;
    for(let j = 0; j < GATE[gateArray[i].function].output; j++){
      let temp = gateArray[i].outputTargets[j];
      
      if(temp == null || temp == undefined) continue;
      temp.targetGate.input[temp.inputIndex] = gateArray[i].output[j];
      
      if(temp.targetGate.function=='CROSS')
      {
        let stack=[temp.targetGate];
        
        while(stack.length>0)
        {
          let gate=stack.pop();
          if(gate.function=='CROSS')
          {
            gate.output=GATE[gate.function].calc(gate);
          }
          for(let k=0; k < GATE[gate.function].output; k++)
          {
            let temp2 = gate.outputTargets[k];
            
            if(temp2 == null || temp2 == undefined) continue;
            
            temp2.targetGate.input[temp2.inputIndex] = gate.output[k];
            
            if(temp2.targetGate.function=='CROSS')stack.push(temp2.targetGate);
          }
        }
      }
    }
  }
}


function connect(A, outputIndex, B, inputIndex){
  
  B.isConnect[inputIndex] = 1;
  
  A.outputTargets[outputIndex] = {
    targetGate : B,
    inputIndex : inputIndex,
    targetGateId : B.gateID
  };
}


function disconnect(A, outputIndex){
  
  let temp = A.outputTargets[outputIndex];
  
  if(temp==null) return false;
  temp.targetGate.isConnect[temp.inputIndex] = 0;
  temp.targetGate.input[temp.inputIndex] = null;
  
  A.outputTargets[outputIndex] = null;
}

const event = setInterval(function(){
  try{
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    
    logicCalc();
    logicStep();
    draw();
    
    
  }
  catch (e) {
    clearInterval(event);
    alert(e.stack);
  }
}, 1000 / FPS);

window.onresize=function()
{
  canavs.width=w = window.innerWidth;
  canvas.height=h = window.innerHeight;
};