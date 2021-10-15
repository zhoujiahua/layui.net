/* 
  layuiAdmin 官网主页 
*/

layui.config({
  version: 20180323
}).use(['element', 'carousel', 'layer', 'util'], function(){
  var $ = layui.$
  ,element = layui.element
  ,carousel = layui.carousel
  ,util = layui.util;

  
  //工具条
  util.fixbar({
    bgcolor: '#353544'
    ,click: function(type){
      
    }
  });
  
  //轮播实例
  carousel.render({
    elem: '#LAY_preview'
    ,width: '100%'
    ,height: '619px'
    ,anim: 'fade'
    ,indicator: 'outside'
  });
  
  carousel.on('change(preview)', function(obj){
    var titleElem = '.alone-preview-title'
    ,title = ['iframe 版', '单页版', '手机预览'];
    
    $(titleElem).children('span').eq(obj.index).addClass('layui-show').siblings().removeClass('layui-show');
  });  
  
  //Tips
  $('*[lay-tips]').on('mouseenter', function(){
    var content = $(this).attr('lay-tips');
    
    this.index = layer.tips('<div style="padding: 10px; font-size: 14px; color: #eee;">'+ content + '</div>', this, {
      time: -1
      ,maxWidth: 280
      ,tips: [3, '#3A3D49']
    });
  }).on('mouseleave', function(){
    layer.close(this.index);
  });
  
  //尺寸适应
  $(window).on('resize', function(){
    
  });
  
  
  var active = {
    "mobile-demo": function(othis){
      othis.removeClass('layui-this');
      
      var index = layer.open({
        type: 2
        ,title: false //'移动端演示 （或手机扫右侧二维码预览）'
        ,closeBtn: false
        ,content: 'pro/'
        ,area: ['375px', '667px']
        ,shadeClose: true
        ,shade: 0.8
        ,end: function(){
          layer.closeAll();
        }
      });
      layer.photos({
        photos: {
          "data": [{
            "src": "../../res.layui.com/upload/2021_4/168_1617643238223_53889.png"/*tpa=https://cdn.layui.com/upload/2021_4/168_1617643238223_53889.png*/,
          }]
        }
        ,anim: 0
        ,shade: false
        ,success: function(layero){
          layero.css('margin-left', '350px');
          layer.tips('或手机扫二维码查看演示', layero, {
            tips: 1
            ,time: 0
          });
        }
      });
    }
  };
  
  //点击
  $('body').on('click', '.layuiadmin-active', function(){
    var othis = $(this), type = othis.data('type');
    active[type] ? active[type].call(this, othis) : '';
  });
   
  
  
  //公告
  layui.data('layui', {
    key: 'notice_layuiAdmin20180108'
    ,remove: true
  });
  return;
  

  if(local.notice_layuiAdmin20180108) return;
  
  layer.open({
    type: 1
    ,title: 'layuiAdmin 授权限时开启'
    ,closeBtn: false
    ,area: '300px;'
    ,shade: false
    ,offset: 'b'
    ,id: 'LAY_Notice' //设定一个id，防止重复弹出
    ,btn: ['朕知道了']
    ,btnAlign: 'c'
    ,moveType: 1
    ,content: ['<div class="layui-text">'
      ,'当前为 layuiAdmin.Pro Beta 版本持续迭代中，现在授权可享受前 500 名特惠。'
    ,'</div>'].join('')
    ,skin: 'layui-layer-notice'
    ,success: function(layero){
      var btn = layero.find('.layui-layer-btn');
      btn.find('.layui-layer-btn0').attr({
        href: '#get'
      });
    }
    ,end: function(){
      layui.data('layui', {
        key: 'notice_layuiAdmin20180108'
        ,value: new Date().getTime()
      });
    }
  });


});

