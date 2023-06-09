const SAVE = {
  execute : function(){
    let temp = JSON.stringify(gateArray,(k,v)=>{
      if(k=='targetGate')return undefined;
      return v;
    });
    navigator.clipboard.writeText(temp);
    
    alert('copied on clipboard!');
    
    let $textarea = document.createElement("textarea");
    
    // body 요소에 존재해야 복사가 진행됨
    document.body.appendChild($textarea);
    
    // 복사할 특정 텍스트를 임시의 textarea에 넣어주고 모두 셀렉션 상태
    $textarea.value = temp;
    $textarea.select();
    
    // 복사 후 textarea 지우기
    document.execCommand('copy');
    document.body.removeChild($textarea);
  },
  
  size : 70,
  padding : 10,
  
  draw : function(){
    
    ctx.translate(SAVE.padding, SAVE.padding);
    ctx.scale(SAVE.size, SAVE.size);
    
    ctx.lineWidth = 4/SAVE.size
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = '#000';
    
    ctx.fillRect(0,0,1,1);
    ctx.strokeRect(0,0,1,1);
    
    ctx.beginPath();
    
    ctx.moveTo(0.2, 0.2);
    ctx.lineTo(0.65,0.2);
    ctx.lineTo(0.8,0.35);
    ctx.lineTo(0.8,0.8);
    ctx.lineTo(0.2,0.8);
    ctx.lineTo(0.2,0.2);
    
    ctx.moveTo(0.35,0.2);
    ctx.lineTo(0.35,0.4);
    ctx.lineTo(0.65,0.4);
    ctx.lineTo(0.65,0.2);
    
    ctx.moveTo(0.55,0.2);
    ctx.lineTo(0.55,0.3);
    
    ctx.moveTo(0.3,0.8);
    ctx.lineTo(0.3,0.55);
    ctx.lineTo(0.7,0.55);
    ctx.lineTo(0.7,0.8);
    
    ctx.stroke();
    
    ctx.setTransform(1,0,0,1,0,0);
    ctx.lineWidth = 1;
  },
  
  onclick : function(touch){
    let pos = gridToCanvas(...touch);
    let relapos = [pos[0] - SAVE.padding, pos[1] - SAVE.padding];
    
    if(relapos[0] < 0 || relapos[0] > SAVE.size || relapos[1] < 0 || relapos[1] > SAVE.size) return false;
    
    SAVE.execute();
    return true;
  }
}

const LOAD = {
  execute : function(){
    let loaddata = prompt("json을 입력하세요");
    
    loaddata = JSON.parse(loaddata);
    
    for(let i = 0; i < loaddata.length; i++){
      
      let temp = loaddata[i];
      
        for(let j = 0; j < temp.outputTargets.length; j++){
          
          if(temp.outputTargets[j] != null){
            
            for(let k = 0; k < loaddata.length; k++){
              
              if(temp.outputTargets[j].targetGateId == loaddata[k] .gateID){ 
                temp.outputTargets[j].targetGate = loaddata[k];
                break;
            }
          }
        }
      }
    }
    
    let temp = 0;
    loaddata.forEach(gate=>{if(temp<gate.gateID)temp=gate.gateID});
    /*for(let i = 0; i < loaddata.length; i++){
      if(temp < loaddata[i].gateID) temp = loaddata[i].gateID;
    }*/
    
    idnum = temp+1;
    
    gateArray = loaddata;
    
  },
  
  size : 70,
  padding : 10,
  
  draw : function(){
    ctx.translate(LOAD.padding, LOAD.padding + SAVE.size + SAVE.padding);
    ctx.scale(LOAD.size, LOAD.size);
    
    ctx.lineWidth = 4 / SAVE.size
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = '#000';
    
    ctx.fillRect(0, 0, 1, 1);
    ctx.strokeRect(0, 0, 1, 1);
    
    ctx.beginPath();
    
    ctx.moveTo(0.4,0.2);
    ctx.lineTo(0.4,0.5);
    ctx.lineTo(0.3,0.5);
    ctx.lineTo(0.5,0.7);
    ctx.lineTo(0.7,0.5);
    ctx.lineTo(0.6,0.5);
    ctx.lineTo(0.6,0.2);
    ctx.lineTo(0.4,0.2);
    
    ctx.moveTo(0.2,0.8);
    ctx.lineTo(0.8,0.8);
    
    ctx.stroke();
    
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.lineWidth = 1;
  },
  
  onclick : function(touch){
    let pos = gridToCanvas(...touch);
    let relapos = [pos[0] - LOAD.padding, pos[1] - LOAD.padding - SAVE.padding - SAVE.size];
    
    if (relapos[0] < 0 || relapos[0] > LOAD.size || relapos[1] < 0 || relapos[1] > LOAD.size) return false;
    
    try{
      LOAD.execute();
    } catch (e) {
      alert('데이터 파싱 에러\n\n'+e);
    }
    return true;
  }
}