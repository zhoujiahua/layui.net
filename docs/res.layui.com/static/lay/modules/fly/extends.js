
/*!
 * 扩展组件平台
 */
 
layui.define(['fly', 'element', 'carousel'], function(exports){

  var $ = layui.jquery;
  var layer = layui.layer;
  var util = layui.util;
  var laytpl = layui.laytpl;
  var form = layui.form;
  var laypage = layui.laypage;
  var fly = layui.fly;
  
  var element = layui.element;
  var upload = layui.upload;

  var carousel = layui.carousel;

  var THIS = 'layui-this';


  //banner 轮播
  var elemBanner = $('#FLY-extend-banner');
  carousel.render({
    elem: elemBanner
    ,width: '100%' //设置容器宽度
    ,height: elemBanner.data('height')
    ,arrow: 'none' //始终显示箭头
    ,anim: 'fade' //切换动画方式
    ,interval: 5000
  });


  //验证规则
  form.verify({
    resRequired: [
      /[\S]+/
      ,'请上传组件资源包'
    ]
  });

  //上传组件
  var elemRes = $('#FLY-extend-res')
  upload.render({
    elem: '#FLY-extend-upload'
    ,url: '/api/upload/file'
    ,accept: 'file'
    ,exts: 'zip|rar|7z'
    ,size: 3*1000*2014
    ,done: function(res){
      if(res.status == 0){
        elemRes.val(res.url);
        this.elem.find('p').html(res.filename);
        layer.msg('文件上传成功', {icon: 1});
      } else {
        layer.msg(res.msg, {icon: 5});
      }
    }
  });

  //提交成功后的回调
  fly.form['extendRelease'] = function(field, elem, res){
    layer.alert(res.msg, {
      icon: 1
      ,btnAlign: 'c'
      ,btn: ['朕已知晓']
      ,end: function(){
        location.href = '/user/extend/';
      }
    });
  };


  //文档导航切换
  element.tab({
    headerElem: '.fly-extend-doc-nav>li' //指定tab头元素项
    ,bodyElem: '.fly-extend-doc' //指定tab主体元素项
  });

  //获取hash来切换选项卡，假设当前地址的hash为lay-id对应的值
  var layid = location.hash.replace(/^#/, '');
  layid && $('.fly-extend-doc-nav>li[lay-id="'+ layid +'"]').trigger('click')

  //监听文档导航
  element.on('tab(extend-doc-nav)', function(){
    location.hash = this.getAttribute('lay-id');
  });

  util.fixbar({
    //bar1: '&#xe642;',
    click: function(type){
      if(type === 'bar1'){
        //location.href = '/jie/add/';
      }
    }
  });

  exports('extends', {});
  
});