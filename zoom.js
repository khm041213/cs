const ZOOM = {
  in : function(){
    camera.zoom *= 1.1;
  },
  
  out : function(){
    camera.zoom *= 0.9;
  },
  
  size : 40,
  padding : 10,
  
  
  draw: function() {
    
    let saveloadheight = SAVE.padding + SAVE.size + LOAD.padding + LOAD.size;
    
    ctx.translate(ZOOM.padding, ZOOM.padding + saveloadheight);
    ctx.scale(ZOOM.size, ZOOM.size);
  
    ctx.lineWidth = 2 / ZOOM.size;
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = '#000';
  
    //ctx.fillRect(0, 0, 1, 1);
    //ctx.strokeRect(0, 0, 1, 1);
  
    ctx.beginPath();
    
    ctx.arc(0.6,0.3,0.3,0,Math.PI*2,true);
    ctx.moveTo(0.6 - 0.3/Math.sqrt(2), 0.3 + 0.3/Math.sqrt(2));
    ctx.lineTo(0.1,0.9);
    
    ctx.moveTo(0.4,0.3);
    ctx.lineTo(0.8,0.3);
    ctx.moveTo(0.6,0.1);
    ctx.lineTo(0.6,0.5);
  
    ctx.stroke();
  
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.lineWidth = 1;
    
    
    ctx.translate(ZOOM.padding, ZOOM.padding *2 + saveloadheight + ZOOM.size);
    ctx.scale(ZOOM.size, ZOOM.size);
    
    ctx.lineWidth = 2 / ZOOM.size;
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = '#000';
    
    //ctx.fillRect(0, 0, 1, 1);
    //ctx.strokeRect(0, 0, 1, 1);
    
    ctx.beginPath();
    
    ctx.arc(0.6, 0.3, 0.3, 0, Math.PI * 2, true);
    ctx.moveTo(0.6 - 0.3 / Math.sqrt(2), 0.3 + 0.3 / Math.sqrt(2));
    ctx.lineTo(0.1, 0.9);
    
    ctx.moveTo(0.4,0.3);
    ctx.lineTo(0.8,0.3);
    
    ctx.stroke();
    
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.lineWidth = 1;
  },
  
  in_onclick: function(touch) {
    
    let offset = SAVE.padding + SAVE.size + LOAD.padding + LOAD.size;
    
    let pos = gridToCanvas(...touch);
    let relapos = [pos[0] - ZOOM.padding, pos[1] - ZOOM.padding - offset];
  
    if (relapos[0] < 0 || relapos[0] > ZOOM.size || relapos[1] < 0 || relapos[1] > ZOOM.size) return false;

    ZOOM.in();
    return true;
  },
  
  out_onclick: function(touch) {
    
    let offset = SAVE.padding + SAVE.size + LOAD.padding + LOAD.size + ZOOM.size + ZOOM.padding;
    
    let pos = gridToCanvas(...touch);
    let relapos = [pos[0] - ZOOM.padding, pos[1] - ZOOM.padding - offset];
  
    if (relapos[0] < 0 || relapos[0] > ZOOM.size || relapos[1] < 0 || relapos[1] > ZOOM.size) return false;

    ZOOM.out();
    return true;
  }
}