/*饼图组件*/
var H5ComponentPie = function(name,cfg){
  var component = new H5ComponentBase(name,cfg);
  var w = cfg.width;
  var h = cfg.height;

  var cns = document.createElement('canvas');
  var ctx = cns.getContext('2d');
  cns.width = w;
  cns.height = h;
  component.append(cns);
  var blankW = 120;
  var r = w /2-blankW;
  //加入一个底图层
  ctx.beginPath();
  ctx.fillStyle = '#eee';
  ctx.strokeStyle = '#eee';
  ctx.lineWidth = 1;
  ctx.arc(r+blankW,r+blankW,r,0,2*Math.PI);
  ctx.fill();
  ctx.stroke();

  var colors = ['red','green','blue','orange','gray'];//备用颜色

  var sAngel = 1.5*Math.PI;//设置开始的角度在12点位置
  var eAngel = 0;//结束角度
  var aAngel = Math.PI*2;//100%的圆结束的角度



  var step = cfg.data.length;
  for(var i=0;i<step;i++){
    var item = cfg.data[i];
    var color = item[2]||(item[2]=colors.pop());

    eAngel = sAngel + aAngel*item[1];
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.moveTo(r+blankW,r+blankW);
    ctx.arc(r+blankW,r+blankW,r,sAngel,eAngel);
    ctx.fill();
    ctx.stroke();
    //加入所有的项目文本以及百分比
    var x = r+blankW + Math.sin(.5*Math.PI - (eAngel-sAngel)/2-sAngel)*r;
    var y = r+blankW + Math.cos(.5*Math.PI - (eAngel-sAngel)/2-sAngel)*r;

    //绘制折线
    ctx.strokeStyle = "#000";
    ctx.beginPath()
    ctx.moveTo(x,y);

    //???
    var txt = item[0];
    var tW = ctx.measureText(txt).width;
    var tH = 20;
    //???
    ctx.font = tH+'px Arial';
    var ym = y<(r+blankW) ? y-10:y+10;
    var xm = x<(r+blankW) ? x-20:x+20;
    var xml = x<(r+blankW) ? xm-20:xm+20;
    ctx.lineTo(xm,ym);
    ctx.lineTo(xml,ym);
    ctx.stroke()
     xml = x<(r+blankW) ? xml-15:xml+15;
     ctx.textAlign = x<(r+blankW) ? 'end':'start';
    ctx.fillText(item[0],xml,ym);
    ctx.textBaseline = y<(r+blankW) ? 'middle':'middle';
    sAngel = eAngel;

  }
  // ctx.beginPath();
  // ctx.arc(118.58791720197854,365.1722092687432,5,0,2*Math.PI);
  // ctx.textAlign = 'end';//'left';
  // ctx.fillText('ceshi',118,365)
  //
  // ctx.fill()
  //加入一个蒙版层
  var cns = document.createElement('canvas');
  var ctx = cns.getContext('2d');
  cns.width = w;
  cns.height = h;
  cns.style.zIndex=3;
  component.append(cns);

  //加入一个底图层
  ctx.fillStyle = '#eee';
  ctx.strokeStyle = '#eee';
  ctx.lineWidth = 1;

  //绘制生长动画
  var draw = function(per){
    ctx.clearRect(0,0,w,w);
    ctx.beginPath();
    ctx.moveTo(r+blankW,r+blankW);//决定画圆的中心点
    if(per<=0){
      ctx.arc(r+blankW,r+blankW,r,0,2*Math.PI,true);
    }else{
      ctx.arc(r+blankW,r+blankW,r,sAngel,sAngel+2*Math.PI*per,true);
    }
    ctx.fill();
    ctx.stroke();

  }
  // draw(0)
  //绘制一个数据层

  component.on('onLoad',function(){
    var scale = 0;
    for(var i=0;i<100;i++){
      setTimeout(function(){
        scale += .01;
        draw(scale)
      },i*10)
    }
  })
  component.on('onLeave',function(){
    var scale = 1;
    for(var i=0;i<100;i++){
      setTimeout(function(){
        scale -= .01;
        draw(scale)
      },i*10)
    }
  })
  return component;
}
