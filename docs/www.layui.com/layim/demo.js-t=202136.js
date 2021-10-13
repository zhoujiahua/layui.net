
/* layim demo */


layui.use(['layer', 'util', 'element'], function(){
  var $ = layui.jquery;
  var layer = layui.layer;
  var util = layui.util;
  var element = layui.element;
  var device = layui.device();
  
  //固定Bar
  util.fixbar({
    
  });
  
  layer.ready(function(){
    var local = layui.data('layui');
    return;
    layer.open({
      type: 1
      ,title: '重要公告' //不显示标题栏
      ,closeBtn: false
      ,area: '300px;'
      ,shade: false
      ,offset: 'b'
      ,id: 'LAY_layimNotice' //设定一个id，防止重复弹出
      ,btn: ['朕知道了']
      ,btnAlign: 'c'
      ,moveType: 1 //拖拽模式，0或者1
      ,content: ['<div class="layui-text">'
        ,'<a href="http://fly.layui.com/jie/3147/" target="_blank" style="color: #fff;"></a>'
      ,'</div>'].join('')
      ,skin: 'layui-layer-notice'
      ,success: function(layero){
        return;
        var btn = layero.find('.layui-layer-btn');
        btn.find('.layui-layer-btn0').attr({
          href: 'http://fly.layui.com/jie/15827/' //'http://fly.layui.com/jie/15695/'
          ,target: '_blank'
        });
      }
      ,end: function(){
        return;
        layui.data('layui', {
          key: 'notice_ddos'
          ,value: new Date().getTime()
        });
      }
    });
  });
  
  var active = {
    mobile: function(){
      var mobileHome = 'https://www.layui.com/layim/demo/mobile.html';
      if(device.android || device.ios){
        return location.href = mobileHome;
      }
      var index = layer.open({
        type: 2
        ,title: '移动版演示 （或手机扫右侧二维码预览）'
        ,content: mobileHome
        ,area: ['375px', '667px']
        ,shadeClose: true
        ,shade: 0.8
        ,end: function(){
          layer.close(index + 2);
        }
      });
      layer.photos({
        photos: {
          "data": [{
            "src": "../../res.layui.com/upload/2016_12/168_1488985841996_23077.png"/*tpa=https://cdn.layui.com/upload/2016_12/168_1481056358469_50288.png*/,
          }]
        }
        ,anim: 0
        ,shade: false
        ,success: function(layero){
          layero.css('margin-left', '350px');
        }
      });
    }
  };
  
  //点击获取授权
  $('body').on('click', '.layim-active', function(){
    var othis = $(this), type = othis.data('type');
    active[type] ? active[type].call(this, othis) : '';
  });
});