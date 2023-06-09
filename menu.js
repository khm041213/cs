const MENU=
{
  delay:500,
  default:
  [
    {
      name:'Delete',
      onclick:function(self)
      {
        MENU.close();
        self.outputTargets.forEach((t,i)=>
        {
          if(t!==null)
          {
            disconnect(self,i);
          }
        });
        
        let connectNum=self.isConnect.filter(x=>x==1).length;
        
        disconnectInput:for(let i=0;i<gateArray.length;i++)
        {
          let t=gateArray[i];
          
          for(let j=0;j<t.outputTargets.length;j++)
          {
            if(t.outputTargets[j]?.targetGate===self)
            {
              disconnect(t,j);
              connectNum--;
              if(connectNum==0)break disconnectInput;
            }
          }
        }
        
       
        
        gateArray.splice(gateArray.indexOf(self),1);
      },
      
      getColor: function() {
          return '#f00'
      }
    }
  ],
  isShow:false,
  menuList:[],
  position:null,
  fontSize:30,
  font:'굴림',
  padding:0.6,
  width:null,
  gate:null,
  show:function(gate,grid)
  {
    MENU.gate=gate;
    
    MENU.menuList=MENU.default.slice(0);
    let gateMenu=GATE[gate.function].menu;
    if(gateMenu!==undefined)MENU.menuList=MENU.menuList.concat(gateMenu);
    
    let pos=gridToCanvas(...grid);
    
    let padding=MENU.fontSize*MENU.padding;
    
    ctx.font=String(MENU.fontSize)+'px '+MENU.font;
    
    let w=0;
    MENU.menuList.forEach(m=>
    {
      if(m.name!==undefined)
      {
        let n=ctx.measureText(m.name).width;
        if(n>w)w=n;
      }
    });
    w=MENU.width=w+padding*2;
    
    MENU.height=MENU.fontSize+padding*2;
    let h=MENU.height*MENU.menuList.length;
    
    if(pos[0]+w>canvas.width)pos[0]-=w;
    if(pos[1]+h>canvas.height)pos[1]-=h;
    
    MENU.position=canvasToGrid(...pos);
    
    MENU.isShow=true;
  },
  onclick:function(grid)
  {
    if(!MENU.isShow)return;
    
    let pos=gridToCanvas(...MENU.position);
    let touch=gridToCanvas(...grid);
    
    let mp=[touch[0]-pos[0],touch[1]-pos[1]];
    
    let w=MENU.width,h=MENU.height;
    
    if(mp[0]<0||mp[1]<0||mp[0]>w||mp[1]>h*MENU.menuList.length)return false;
    
    let index=Math.floor(mp[1]/h);
    
    let func=MENU.menuList[index].onclick;
    if(func!==undefined)func(MENU.gate);
    
    return true;
  },
  draw:function()
  {
    if(!MENU.isShow)return;
    
    let pos=gridToCanvas(...MENU.position);
    
    ctx.font=String(MENU.fontSize)+'px '+MENU.font;
    
    let padding=MENU.fontSize*MENU.padding;
    let w=MENU.width;
    let h=MENU.height;
    
    MENU.menuList.forEach((m,i)=>
    {
      var [px,py]=pos;
      
      py+=h*i
      
      ctx.lineWidth=1;
      ctx.fillStyle='#fff'
      
      ctx.fillRect(px,py,w,h);
      ctx.strokeRect(px, py, w, h)
      
      ctx.fillStyle=(m.getColor?m.getColor(MENU.gate):undefined)??'#000';
      ctx.textAlign='left';
      ctx.textBaseline='middle';
      
      
      ctx.fillText(m.name,px+padding,py+h/2);
      
      
    });
  },
  close:function()
  {
    if(!MENU.isShow)return false;
    
    MENU.isShow=false;
    return true;
  }
};