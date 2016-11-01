// 基本图文组件对象

var H5ComponentBase = function (name,cfg){
  var cfg = cfg || {};
  var id = ('h5_c_'+Math.random()).replace('.','_');
  //把当前的组件类型添加到样式中进行标记
  var cls = 'h5_component_'+cfg.type;
  var component = $('<div id="'+id+'" class="h5_component '+cls+' h5_component_name_'+name+'">');

  cfg.width&& component.width(cfg.width/2);
  cfg.height&& component.height(cfg.height/2);
  cfg.text && component.text(cfg.text);

  cfg.css&& component.css(cfg.css);

  if(cfg.center === true){
    component.css({
      marginLeft: (cfg.width/4*(-1))+'px',
      left:'50%'
    })
  }
  cfg.bg && component.css('backgroundImage','url('+cfg.bg+')');
  component.on('onLoad',function(){
    component.addClass(cls+'_load').removeClass(cls+'_leave')
    cfg.animateIn && component.animate(cfg.animateIn).delay(cfg.delay);
    return false;
  })
  component.on('onLeave',function(){
    component.addClass(cls+'_leave').removeClass(cls+'_load')
    cfg.animateOut && component.animate(cfg.animateOut).delay(cfg.delay);
    return false;
  }).trigger('onLeave');
  return component;
}
