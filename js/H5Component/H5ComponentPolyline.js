var H5ComponentPolyline = function(name,cfg){
  var component = new H5ComponentBase(name,cfg);

  //绘制网格线
  var w = cfg.width;
  var h = cfg.height;

  //加入一个画布(网格线背景)
  var cns = document.createElement('canvas');
  var ctx = cns.getContext('2d');
  cns.width = ctx.width = w;
  cns.height = ctx.height = h;
  component[0].appendChild(cns);
  var blank = 60;
  var blankW = (w-blank);
  var blankH = (h-blank);

  //水平网格线 100份 -> 10份
  var step = 10;
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#ff7575';

  window.ctx = ctx;

  for(var i=0;i<step+1;i++){
    var y = blankH/step * i+blank/2;
    ctx.moveTo(0+blank/2,y);
    ctx.lineTo(blankW+blank/2,y)
  }
//垂直线 (根据项目的个数去分)
step = cfg.data.length+1;
  for(var i=0;i<step+1;i++){
    var x = blankW/step * i+blank/2;
    ctx.moveTo(x,blank/2);
    ctx.lineTo(x,blankH+blank/2);
  }
  ctx.stroke();
  //绘制折线数据
  var cns = document.createElement('canvas');
  var ctx = cns.getContext('2d');
  cns.width = ctx.width = w;
  cns.height = ctx.height = h;
  component.append(cns);

  function drawing(per){
    ctx.clearRect(0,0,w,h);

    //绘制折线数据
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#cd1d1c';
    var x = 0;
    var y = 0;
    //画点
    for(var i in cfg.data){
      var item = cfg.data[i];
      x = (blankW/step)*i+(blankW/step)+blank/2;
      y = blankH*(1-item[1]*per)+blank/2;
      ctx.moveTo(x,y);
      ctx.arc(x,y,5,0,2*Math.PI);
      ctx.textAlign = 'center';//文字居中
      ctx.font = '15px Arial'
      cfg.data[i]&&ctx.fillText(cfg.data[i][0],x,blankH+blank/2+30);
    }
    //连线
    ctx.moveTo((blankW/step)+blank/2,blankH*(1-cfg.data[0][1]*per)+blank/2)
    // ctx.arc((w/step),h*(1-cfg.data[0][1]),15,0,2*Math.PI);
    for(var i=0;i<cfg.data.length;i++){
      item = cfg.data[i];
      x = (blankW/step)*i + (blankW/step)+blank/2;
      y = blankH*(1-item[1]*per)+blank/2;
      ctx.lineTo(x,y);
    }
    ctx.stroke();
    //绘制阴影
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255,118,118,.4)';
    ctx.lineTo(x,blankH+blank/2);
    ctx.lineTo(blankW/(cfg.data.length+1)+blank/2,blankH+blank/2);
    ctx.fillStyle='rgba(255,118,118,.4)';
    ctx.fill();
    //写数据
    for(var i=0;i<cfg.data.length;i++){
      item = cfg.data[i];
      x = (blankW/step)*i + (blankW/step)+blank/2;
      y = blankH*(1-item[1]*per)+blank/2;
      ctx.font = '24px Georgia';

      ctx.fillStyle = item[2] ? item[2] :'#595959'
      ctx.fillText((item[1]*100>>0)+"%",x-10,y-10);
    }

    ctx.stroke();
  }
  // drawing(.3);
  window.drawing = drawing;
  //假设
  component.on('onLoad',function(){
    //折线图伸展动画
    var s = 0;
    for(i=0;i<100;i++){
      setTimeout(function(){
        s+=0.01;
        drawing(s);
      },i*10+500)
    }
  })
  component.on('onLeave',function(){
    //折线图伸展动画
    var s = 1;
    for(i=0;i<100;i++){
      setTimeout(function(){
        s-=0.01;
        drawing(s);
      },i*10)
    }
  })
  return component;
}
