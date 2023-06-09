const GATE = {
  "SWITCH" : {
    input : 0,
    output: 1,
    
    inputPos : [[]],
    outputPos : [[0, 0]],
    
    image : function(self){
      ctx.strokeStyle = "#000"
      ctx.beginPath();
      
      ctx.moveTo(0.9, 0.9);
      ctx.lineTo(0.1, 0.9);
      ctx.lineTo(0.1, 0.1);
      ctx.lineTo(0.9, 0.1);
      ctx.lineTo(0.9, 0.9);
      
      if(self.output[0] == 1){
        ctx.fillStyle = "#0f0";
        ctx.fillRect(0.1,0.1,0.8,0.8)
        
      }
    },
    
    onclick : function(self){
      self.output[0] = +!self.output[0];
    }
  },
  
  "CROSS" : {
    input : 1,
    output : 3,
    
    inputPos : [[0, 0.2]],
    outputPos : [[0, -0.4],[-0.4, 0],[0.4, 0]],
    
    image : function(self){
      ctx.strokeStyle = "#000"
      ctx.beginPath();
      
      ctx.moveTo(0.1,0.7);
      ctx.lineTo(0.9,0.7);
      ctx.lineTo(0.9,0.3);
      ctx.lineTo(0.7,0.3);
      ctx.lineTo(0.7,0.1);
      ctx.lineTo(0.3,0.1);
      ctx.lineTo(0.3,0.3);
      ctx.lineTo(0.1,0.3);
      ctx.lineTo(0.1,0.7);
      
    },
    
    calc : function(self){
      return [self.input[0], self.input[0], self.input[0]]
    },
    
    menu:
    [
      {
        name:'disconnect 1',
        onclick:function(self)
        {
          disconnect(self,0);
        },
        getColor : function(self){
          if(self.outputTargets[0]==null){
            return '#aaa'
          }
          else{
            return '#000'
          }
        }
      },
      {
        name:'disconnect 2',
        onclick:function(self)
        {
          disconnect(self,1);
        },
        getColor: function(self) {
          if (self.outputTargets[1] == null) {
            return '#aaa'
          }
          else {
            return '#000'
          }
        }
      },
      {
        name:'disconnect 3',
        onclick:function(self)
        {
          disconnect(self,2);
        },
        getColor: function(self) {
          if (self.outputTargets[2] == null) {
            return '#aaa'
          }
          else {
            return '#000'
          }
        }
      }
    ]
  },
  
  "LAMP" : {
    input : 1,
    output : 0,
    
    inputPos : [[0,0]],
    outputPos : [[]],
    
    image : function(self){
      ctx.strokeStyle = "#000";
      ctx.beginPath();
      
      ctx.moveTo(0,0);
      ctx.lineTo(1,0);
      ctx.lineTo(1,1);
      ctx.lineTo(0,1);
      ctx.lineTo(0,0);
      
      if(self.input[0] == 1){
        ctx.fillStyle = "#ff0";
        ctx.fillRect(0,0,1,1);
      }
      else{
        ctx.fillStyle = '#000';
        ctx.fillRect(0,0,1,1);
      }
    }
  },
  
  "AND" : {
    input : 2,
    output : 1,
    
    inputPos : [[-0.4, -0.1],[-0.4,0.1]],
    outputPos : [[0.4, 0]],
    
    
    image : function(self){
      ctx.strokeStyle = "#000"
      ctx.beginPath();
      
      ctx.moveTo(0.6,0.2);
      ctx.lineTo(0.1,0.2);
      ctx.lineTo(0.1,0.8);
      ctx.lineTo(0.6,0.8);
      ctx.arc(0.6,0.5,0.3,Math.PI/2,Math.PI*3/2,true);
      
    },
    
    calc : function(self){
      return [self.input[0]&self.input[1]];
    }
  },
  
  "OR" : {
    input : 2,
    output : 1,
    
    inputPos : [[-0.21, -0.1], [-0.21, 0.1]],
    outputPos : [[0.4,0]],
    
    image : function(self){
      ctx.strokeStyle = "#000";
      ctx.beginPath();
      
      ctx.moveTo(0.6,0.2);
      ctx.lineTo(0.1,0.2);
      ctx.moveTo(0.1,0.8);
      ctx.lineTo(0.6,0.8);
      
      ctx.arc(0.6, 0.5, 0.3, Math.PI/2, Math.PI*3/2, true);
      
      ctx.moveTo(0.1,0.8);
      ctx.arc(0.3 - 13/40, 0.5, 13/40, Math.PI/2 - Math.asin(5/13), Math.PI*3/2 + Math.asin(5/13), true);
      
    },
    
    calc : function(self){
      return [self.input[0]|self.input[1]]
    }
  },
    
  "NOT" : {
    input : 1,
    output : 1,
    
    inputPos : [[-0.4, 0]],
    outputPos : [[0.4, 0]],
    
    image : function(self){
      ctx.strokeStyle = "#000";
      ctx.beginPath();
      
      ctx.moveTo(0.75,0.5);
      ctx.lineTo(0.1,0.15);
      ctx.lineTo(0.1,0.85);
      ctx.lineTo(0.75,0.5);
      
      ctx.moveTo(0.9,0.5);
      ctx.arc(0.825, 0.5, 0.075, 0, Math.PI*2)
      
    },
    
    calc : function(self){
      return [+!self.input[0]]
    }
  },
  
  "NAND" : {
    input : 2,
    output : 1,
    
    inputPos : [[-0.4, -0.1], [-0.4, 0.1]],
    outputPos : [[0.4, 0]],
    
    image: function(self){
      ctx.strokeStyle = "#000"
      ctx.beginPath();
      
      ctx.moveTo(0.45,0.2);
      ctx.lineTo(0.1,0.2);
      ctx.lineTo(0.1,0.8);
      ctx.lineTo(0.45,0.8);
      ctx.arc(0.45,0.5,0.3,Math.PI/2,Math.PI*3/2,true);
      
      ctx.moveTo(0.9,0.5)
      ctx.arc(0.825, 0.5, 0.075, 0, Math.PI*2)
    },
    
    calc : function(self){
      return [+!(self.input[0]&self.input[1])]
    }
  },
  
  "NOR": {
    input: 2,
    output: 1,
  
    inputPos: [[-0.21, -0.1], [-0.21, 0.1]],
    outputPos: [[0.4, 0]],
  
    image: function(self) {
      ctx.strokeStyle = "#000";
      ctx.beginPath();
  
      ctx.moveTo(0.45, 0.2);
      ctx.lineTo(0.1, 0.2);
      ctx.moveTo(0.1, 0.8);
      ctx.lineTo(0.45, 0.8);
  
      ctx.arc(0.45, 0.5, 0.3, Math.PI / 2, Math.PI * 3 / 2, true);
  
      ctx.moveTo(0.1, 0.8);
      ctx.arc(0.3 - 13 / 40, 0.5, 13 / 40, Math.PI / 2 - Math.asin(5 / 13), Math.PI * 3 / 2 + Math.asin(5 / 13), true);
  
      ctx.moveTo(0.9, 0.5)
      ctx.arc(0.825, 0.5, 0.075, 0, Math.PI * 2)
    },
  
    calc: function(self) {
      return [+!(self.input[0] | self.input[1])]
    }
  },
  
  "XOR": {
    input: 2,
    output: 1,
  
    inputPos: [[-0.21, -0.1], [-0.21, 0.1]],
    outputPos: [[0.4, 0]],
  
    image: function(self) {
      ctx.strokeStyle = "#000";
      ctx.beginPath();
  
      ctx.moveTo(0.6, 0.2);
      ctx.lineTo(0.2, 0.2);
      ctx.moveTo(0.2, 0.8);
      ctx.lineTo(0.6, 0.8);
  
      ctx.arc(0.6, 0.5, 0.3, Math.PI / 2, Math.PI * 3 / 2, true);
  
      ctx.moveTo(0.1, 0.8);
      ctx.arc(0.3 - 13 / 40, 0.5, 13 / 40, Math.PI / 2 - Math.asin(5 / 13), Math.PI * 3 / 2 + Math.asin(5 / 13), true);
      
      ctx.moveTo(0.2, 0.8);
      ctx.arc(0.4 - 16 / 40, 0.5, 15 / 40, Math.PI / 2 - Math.asin(5 / 8), Math.PI * 3 / 2 + Math.asin(5 / 8), true);
    },
  
    calc: function(self) {
      return [self.input[0]^self.input[1]]
    }
  },
  
  "XNOR": {
    input: 2,
    output: 1,
  
    inputPos: [[-0.21, -0.1], [-0.21, 0.1]],
    outputPos: [[0.4, 0]],
  
    image: function(self) {
      ctx.strokeStyle = "#000";
      ctx.beginPath();
  
      ctx.moveTo(0.45, 0.2);
      ctx.lineTo(0.2, 0.2);
      ctx.moveTo(0.2, 0.8);
      ctx.lineTo(0.45, 0.8);
  
      ctx.arc(0.45, 0.5, 0.3, Math.PI / 2, Math.PI * 3 / 2, true);
  
      ctx.moveTo(0.1, 0.8);
      ctx.arc(0.3 - 13 / 40, 0.5, 13 / 40, Math.PI / 2 - Math.asin(5 / 13), Math.PI * 3 / 2 + Math.asin(5 / 13), true);
  
      ctx.moveTo(0.2, 0.8);
      ctx.arc(0.4 - 16 / 40, 0.5, 15 / 40, Math.PI / 2 - Math.asin(5 / 8), Math.PI * 3 / 2 + Math.asin(5 / 8), true);
  
  
      ctx.moveTo(0.9, 0.5)
      ctx.arc(0.825, 0.5, 0.075, 0, Math.PI * 2)
    },
  
    calc: function(self) {
      return [+!(self.input[0] ^ self.input[1])]
    }
  }
  
  /*,
  
  "SANS" : {
    input: 1,
    output: 10,
    
    inputPos:[[0,0]],
    outputPos:[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    
    image : function(self){
      
      ctx.moveTo(0.9,0.5)
      ctx.arc(0.5,0.5,0.4,0,Math.PI*2);
    },
    
    calc: function(self){
      return [self.input[0],self.input[0],self.input[0],self.input[0],self.input[0],self.input[0],self.input[0],self.input[0],self.input[0],self.input[0]]
    }
  }*/
}