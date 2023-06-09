const GATELIST = {
  width: 300,
  height: 100,
  
  gateSize : 50,
  
  functionList : Object.keys(GATE),
  
  selectnum : 0,
  
  dummyself : {
    input : [0],
    output : [0]
  },

  draw: function() {
    let cx = w / 2;
    let cy = h;
    
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 5;
    ctx.fillStyle = "#fff";
    
    ctx.beginPath();
    
    ctx.moveTo(cx - GATELIST.width/2, cy-GATELIST.height);
    ctx.fillRect(cx - GATELIST.width/2, cy -GATELIST.height, GATELIST.width, GATELIST.height);
    ctx.strokeRect(cx - GATELIST.width/2, cy -GATELIST.height, GATELIST.width, GATELIST.height);
    
    ctx.lineWidth = 1;
    
    let size = GATELIST.height * 4 / 5
    
    ctx.translate(cx - size/2, cy - GATELIST.height/2 - size/2);
    ctx.scale(size, size);
    
    GATE[GATELIST.functionList[GATELIST.selectnum]].image(GATELIST.dummyself);
    
    ctx.lineWidth = 4/camera.zoom;
    ctx.stroke();
    ctx.lineWidth = 1;
    
    ctx.setTransform(1,0,0,1,0,0);
    
    
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.font = '20px 굴림'
    ctx.fillText(GATELIST.functionList[GATELIST.selectnum],cx,cy - GATELIST.height * 7/6)
  },
  
  onclick : function(touch){
    let cx = w / 2;
    let cy = h;
    
    let pos = gridToCanvas(...touch);
    
    let windowpos = [cx - GATELIST.width/2, cy - GATELIST.height];
    
    let pos2 = [pos[0] - windowpos[0], pos[1] - windowpos[1]];
    
    if(pos2[0] < 0 || pos2[0] > GATELIST.width || pos2[1] < 0|| pos2[1] > GATELIST.height){
      return false;
    }
    
    let length = GATELIST.functionList.length
    
    if(pos2[0] < GATELIST.width/3){
      GATELIST.selectnum -= 1;
    }
    else if(pos2[0] > GATELIST.width * 2/3){
      GATELIST.selectnum += 1;
    }
    
    GATELIST.selectnum = (GATELIST.selectnum+length) % length;
    
    return true;
  },
  
  place : function(touch){
    let pos = [Math.floor(touch[0]), Math.floor(touch[1])];
    
    addGate(GATELIST.functionList[GATELIST.selectnum], ...pos)
  }
  
}