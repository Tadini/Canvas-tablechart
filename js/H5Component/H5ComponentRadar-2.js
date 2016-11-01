/*雷达图组件*/
var H5ComponentRadar = function(name,cfg){
  var component = new H5ComponentBase(name,cfg);
  var w = cfg.width;
  var h = cfg.height;

  var cns = document.createElement('canvas');
  var ctx = cns.getContext('2d');
  cns.width = w;
  cns.height = h;
  component.append(cns);

  //画圆
  var x = w/2;
  var y = h/2;
  var r = w/2;
  var step = cfg.data.length;

  ctx.beginPath();
  ctx.arc(x,y,r,0,2*Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(r,r,r,0,2*Math.PI);
  // ctx.moveTo(r,0);
  // ctx.lineTo(r,2*r);
  // ctx.moveTo(0,r);
  // ctx.lineTo(2*r,r);
  ctx.stroke();


  //计算一个圆周上的坐标(计算多边形的顶点坐标)
  //已知:圆心坐标(a,b) 半径r, 角度 deg 弧度 rad
  // x = a+Math.sin(rad)*r;
  // y = b+Math.cos(rad)*r;
  // rad = 2*Math.PI/360 * (360/step)*i;

  //绘制网格背景(分面绘制,分为10份)
  for(var s=10;s>0;s--){
    drawBlock(r,(s/10));
  }
  var isBlue = false;
  function drawBlock(r,per){
    per = per===undefined?1:per;
    ctx.beginPath();
    for(var i=0;i<step;i++){
      var rad = (2*Math.PI/360) * (360/step)*i;
      var x = r + Math.sin(rad)*r*per;
      var y = r + Math.cos(rad)*r*per;

      ctx.lineTo(x,y);
    }
    ctx.fillStyle = (isBlue=!isBlue)?'#99c0ff':'#f1f9ff';
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  //绘制伞骨
  for(i=0;i<step;i++){
    var rad = (2*Math.PI/360) * (360/step)*i;
    var x = r + Math.sin(rad)*r;
    var y = r + Math.cos(rad)*r;

    ctx.moveTo(r,r);
    ctx.lineTo(x,y);
    //绘制项目文字
    var text = cfg.data[i][0];
    ctx.font = '20px Airal';
    ctx.fillStyle = '#ffc000';

    ctx.textAlign = x<w/2?'right':'left';

    ctx.fillText(text,x,y);
  }
  ctx.strokeStyle = '#e0e0e0'
  ctx.stroke();

  //数据层的开发
  //加入一个画布
  var cns = document.createElement('canvas');
  var ctx = cns.getContext('2d');
  cns.width = w;
  cns.height = h;
  component.append(cns);

  ctx.strokeStyle = '#f00';
  var draw = function(per){
    ctx.beginPath();
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = '#ff7676';
    //输出数据的折线
    for(var i=0;i<step;i++){
      var rad = (2*Math.PI/360) * (360/step)*i;
      var rate = cfg.data[i][1];
      var x = r + Math.sin(rad)*r*rate*per;
      var y = r + Math.cos(rad)*r*rate*per;

      ctx.lineTo(x,y);

    }
    ctx.closePath();
    ctx.stroke();

    //输出数据的点
    for(var i=0;i<step;i++){
      var rad = (2*Math.PI/360)*(360/step)*i;
      var rate = cfg.data[i][1];
      var x = r + Math.sin(rad)*r*rate*per;
      var y = r + Math.cos(rad)*r*rate*per;

      ctx.beginPath();
      ctx.arc(x,y,5,0,2*Math.PI);
      ctx.fill();
    }
  }
  window.draw = draw;
  var scale = 0;
  for(var i=0;i<100;i++){
    setTimeout(function(){
      scale += .01;
      draw(scale)
    },i*10)
  }
  // component.on('onLoad')
  return component;
}
