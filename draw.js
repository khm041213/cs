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
    ctx.translate(-0.5, -0.5);
    
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
    
    let canvasPosition = gridToCanvas(handgate.x, handgate.y);
    let handPosition = gridToCanvas(lastGridPos.x, lastGridPos.y);
    
    ctx.moveTo(canvasPosition[0] + camera.zoom/2, canvasPosition[1] + camera.zoom/2);
    ctx.lineTo(handPosition[0], handPosition[1]);
    
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
        };
        
        let endPos = {
          x : (temp2[0] + 0.5),
          y : (temp2[1] + 0.5)
        };
        
        
        let temp3 = gridToCanvas(startPos.x + handgate.x, startPos.y + handgate.y);
        let temp4 = gridToCanvas(endPos.x + targetgate.x, endPos.y + targetgate.y);
        
        if(handgate.output[j] == 0 || handgate.output[j] == null)
        ctx.strokeStyle = '#000';
        else if(handgate.output[j] == 1)
        ctx.strokeStyle = "#0f0";
        
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