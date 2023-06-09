var ctx = canvas.getContext("2d");
var w = 1600/1.2;
var h = 900/1.2;
canvas.width=w;
canvas.height=h;

var linewidth = 100;

var camera = {
  x : 0,
  y : 0,
  zoom : 100
};

const FPS = 60;

var gateArray=[];
var selectedGate;

var idnum = 0;
var isOnGate = 0;
var isGrabWire = false;


function canvasToGrid(x, y) {
  let p = (x - canvas.width / 2) / camera.zoom + camera.x;
  let q = (y - canvas.height / 2) / camera.zoom + camera.y;

  return [p, q];
}

function gridToCanvas(x, y) {
  let p = (x - camera.x) * camera.zoom + canvas.width / 2
  let q = (y - camera.y) * camera.zoom + canvas.height / 2

  return [p, q];
}

function rotate2d(x, y, a) {
  let dis = Math.sqrt((x) ** 2 + (y) ** 2)
  let theta1 = Math.atan2(y, x)
  let theta2 = a + theta1
  return [dis * Math.cos(theta2), dis * Math.sin(theta2)]
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
  }
  
  let s = GATE[temp.function]
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
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}







function gridDraw(){ //Grid를 그리는 함수

  let cx = ( -camera.x % 1 ) * camera.zoom;
  let cy = ( -camera.y % 1 ) * camera.zoom;
  
  ctx.beginPath();
  ctx.strokeStyle = '#777';
  
  for(let x = 0; x < canvas.width/2 + camera.zoom; x += camera.zoom){
    
    let lineX = x + cx + canvas.width / 2;
    
    ctx.moveTo(lineX, 0);
    ctx.lineTo(lineX, canvas.height);
    
  }
  
  for(let x = -camera.zoom; x > -canvas.width/2 - camera.zoom; x -= camera.zoom){
    
    let lineX = x + cx + canvas.width / 2;
    
    ctx.moveTo(lineX, 0);
    ctx.lineTo(lineX, canvas.height);
    
  }
  
  for(let y = 0; y < canvas.height/2 + camera.zoom + camera.zoom; y += camera.zoom){
    
    let lineY = y + cy + canvas.height / 2;
    
    ctx.moveTo(0, lineY);
    ctx.lineTo(canvas.width, lineY);
    
  }
  
  for(let y = -camera.zoom; y > -canvas.height/2 - camera.zoom; y -= camera.zoom){
    
    let lineY = y + cy + canvas.height / 2;
    
    ctx.moveTo(0, lineY);
    ctx.lineTo(canvas.width, lineY);
    
  }
  
  ctx.stroke();
  
} //그리드를 그리는 함수

function gateDraw(){
  for(let i =0; i < gateArray.length; i++){
    let temp = gateArray[i];
    
    let pos = gridToCanvas(temp.x, temp.y);
    
    ctx.translate(pos[0], pos[1]);
    ctx.scale(camera.zoom, camera.zoom);
    ctx.translate(0.5 , 0.5);
    ctx.rotate((temp.direction/2)*Math.PI);
    ctx.translate(-0.5, -0.5)
    
    GATE[temp.function].image(temp);
    
    
    
    ctx.lineWidth = 4/camera.zoom;
    ctx.stroke();
    ctx.lineWidth = 1;
    
    ctx.setTransform(1,0,0,1,0,0);
    
  }
}

function grabWireDraw(){
  if(isGrabWire == true){
    
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    
    let canvasPosition = gridToCanvas(handgate.x, handgate.y)
    let handPosition = gridToCanvas(lastGridPos.x, lastGridPos.y)
    
    ctx.moveTo(canvasPosition[0] + camera.zoom/2, canvasPosition[1] + camera.zoom/2)
    ctx.lineTo(handPosition[0], handPosition[1])
    
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.lineWidth = 1;
  }
}

function wireDraw(){
  for(let i = 0; i < gateArray.length; i++){
    for(let j = 0; j < gateArray[i].outputTargets.length; j++){
      if(gateArray[i].outputTargets[j] != null){
        
        let handgate = gateArray[i];
        let targetgate = gateArray[i].outputTargets[j].targetGate;
        
        let outputPos = GATE[handgate.function].outputPos;
        let inputPos = GATE[targetgate.function].inputPos;
        
        let temp1 = rotate2d(outputPos[j][0],outputPos[j][1],handgate.direction*Math.PI/2);
        
        let temp2 = rotate2d(inputPos[handgate.outputTargets[j].inputIndex][0],inputPos[handgate.outputTargets[j].inputIndex][1],targetgate.direction*Math.PI/2);
        
        let startPos = {
          x : (temp1[0] + 0.5),
          y : (temp1[1] + 0.5)
        }
        
        let endPos = {
          x : (temp2[0] + 0.5),
          y : (temp2[1] + 0.5)
        }
        
        
        let temp3 = gridToCanvas(startPos.x + handgate.x, startPos.y + handgate.y);
        let temp4 = gridToCanvas(endPos.x + targetgate.x, endPos.y + targetgate.y);
        
        if(handgate.output[j] == 0 || handgate.output[j] == null)
        ctx.strokeStyle = '#000'
        else if(handgate.output[j] == 1)
        ctx.strokeStyle = "#0f0"
        
        ctx.beginPath();
        
        ctx.moveTo(...temp3);
        ctx.lineTo(...temp4);
        
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.lineWidth = 1;
      }
    }
  }
}

function draw(){ //그리는 함수 모음
  //gateArray.forEach(x=>x.direction=Date.now()/1000%(Math.PI*2));
  gridDraw();
  wireDraw();
  gateDraw();
  grabWireDraw();
  
  MENU.draw();
  GATELIST.draw();
  SAVE.draw();
  LOAD.draw();
  ZOOM.draw();
  
} 


function logicCalc(){
  for(let i = 0; i < gateArray.length; i++){
    let temp = gateArray[i];
    
    let isNull = 0;
    
    if(GATE[temp.function].calc == undefined) continue;
    
    
    for(let j = 0; j < temp.input.length; j++){
      if(temp.input[j] == null){
        //isNull = true;
        //break;
        temp.input[j] = 0;
      }
    }
    if(isNull){
      for(let j = 0; j < GATE[temp.function].output; j++){
        temp.output[j] = null;
      }
      continue;
    }
    
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
  }
}


function disconnect(A, outputIndex){
  
  let temp = A.outputTargets[outputIndex]
  
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
}, 1000 / FPS)