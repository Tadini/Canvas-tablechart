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

  ctx.beginPath();
  for(var i=0;i<step;i++){
    var rad = (2*Math.PI/360) * (360/step)*i;
    var x = r + Math.sin(rad)*r;
    var y = r + Math.cos(rad)*r;
    // console.log(rad,Math.sin(rad),Math.cos(rad),x,y)
    // ctx.arc(x,y,5,0,Math.PI*2)
    // ctx.font = '20px airal'
    // ctx.fillText(x.toFixed(2)+' , '+y.toFixed(2),x-20,y-10)
    // ctx.moveTo(r,r)
    ctx.lineTo(x,y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  for(var i=0;i<step;i++){
    var rad = (2*Math.PI/360) * (360/step)*i;
    var x = r + Math.sin(rad)*r*.5;
    var y = r + Math.cos(rad)*r*.5;
    // console.log(rad,Math.sin(rad),Math.cos(rad),x,y)
    // ctx.arc(x,y,5,0,Math.PI*2)
    // ctx.font = '20px airal'
    // ctx.fillText(x.toFixed(2)+' , '+y.toFixed(2),x-20,y-10)
    // ctx.moveTo(r,r)
    ctx.lineTo(x,y);
  }
  ctx.fillStyle = 'red';
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  var draw = function(per){

  }
  // component.on('onLoad')
  return component;
}
