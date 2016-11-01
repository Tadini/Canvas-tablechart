var H5 = function(){
  this.id = ('h5'+Math.random()).replace('.','_');
  this.el = $('<section class="h5" id="'+this.id+'">').hide();
  this.page = [];
  $('body').append(this.el);

  // 新增一个页
  /**
  *
  */
  this.addPage = function(name,text){
    var page = $('<div class="h5_page section">');
    if(name != undefined){
      page.addClass('h5_page_'+name);
    }
    if(text != undefined){
      page.text(text);
    }
    this.el.append(page);
    this.page.push(page);
    return this;
  }
  //新增一个组件
  this.addComponent = function(name,cfg){
    var cfg = cfg || {};
    cfg = $.extend({
      type:'base'
    },cfg);
    var component; //定义一个变量   存储组件元素
    var page = this.page.slice(-1)[0];
    switch (cfg.type) {
      case 'base':
        component = new H5ComponentBase(name,cfg);
        page.append(component);
      break;
      case 'bar':
        component = new H5ComponentBar(name,cfg);
      break;
      case 'pie':
        component = new H5ComponentPie(name,cfg);
      break;
      case 'point':
        component = new H5ComponentPoint(name,cfg);
      break;
      case 'polyline':
        component = new H5ComponentPolyline(name,cfg);
      break;
      case 'radar':
        component = new H5ComponentRadar(name,cfg);
      break;
      default:

    }
    component.appendTo(page)
    return this;
  }

  /*h5对象初始化呈现*/
  this.loader = function(imgData,firstPage){
    var self = this;
    var num = 0;
    this.el.fullpage({

      onLeave: function(index,nextIndex,direction){
        $(this).find('.h5_component').trigger('onLeave');
      },
      afterLoad: function(anchorLink,index){
        $(this).find('.h5_component').trigger('onLoad');

      }
    })
    
    if(firstPage){
      $.fn.fullpage.moveTo(firstPage);
    }
    if(!$.isArray(imgData)){
      console.error('请填入图片数组');
      return ;
    }
    $.each(imgData,function(index,item){
      var on = true;
      var img = new Image();
      img.src = item;
      $(img).on('load',function(){
        num++;
        // console.log(num)
        if(num==imgData.length){
          $('#loading').remove();
          self.page[0].find('.h5_component').trigger('onLoad');
              self.el.show();
        }
      })
      $(img).on('error',function(){
          on = false; 
          $('#loading').remove();
          self.page[0].find('.h5_component').trigger('onLoad');
              self.el.show();
          return false;
      })
      return on;
    })
  }
  return this;
}
