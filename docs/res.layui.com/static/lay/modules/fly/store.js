/**

 @Name: 应用市场
 @Author: xuxinyu

 */


layui.define(['fly', 'carousel', 'rate', 'laypage'], function(exports){
  var $ = layui.jquery
  ,element = layui.element
  ,carousel = layui.carousel
  ,rate = layui.rate
  ,laypage = layui.laypage
  ,form = layui.form
  ,util = layui.util;

  //轮播渲染
  var elemBanner = $('#LAY-store-banner'), ins1 = carousel.render({
    elem: elemBanner
    ,width: '100%'
    ,height: elemBanner.height() + 'px'
    ,arrow: 'none'
    ,interval: 6000
    ,anim: 'fade'
  });
  $(window).on('resize', function(){
    var width = $(this).prop('innerWidth');
    ins1.reload({
      height: (width > 768 ? 460 : 115) + 'px'
    });
  });
  //监听轮播切换事件
  carousel.on('change(LAY-store-banner)', function(obj){
    $('.shop-banner').css('background', obj.item.data('color'));
  });

  //搜索区域固定在上
  var topbar = $('#LAY-topbar')
  ,topbarScroll = topbar.find('.input-search')
  ,fixTop = function(){
    var top = $(window).scrollTop();
    if(top > 200){
      topbar.height(topbar.height())
      topbarScroll.addClass('scroll');
    } else {
      topbar.height('auto')
      topbarScroll.removeClass('scroll');
    }
  };

  fixTop(), $(window).on('scroll', fixTop);

  //监听排序
  form.on('select(storeOrder)', function(obj){
    var pathname = location.pathname
    ,byExp = /(\/*)(\bby\b)(\/[^\/]+)(\/*)/
    ,pageExp = /(\/*)(\bpage\b)(\/[^\/]+)(\/*)/;

    //如果末尾没有 / ，则追加
    if(!/\/$/.test(pathname)){
      pathname += '/';
    }

    //如果存在排序路由
    if(byExp.test(pathname)){
      pathname = pathname.replace(byExp, '$1$2/'+ obj.value +'$4');
      console.log(1)
    } else if(pageExp.test(pathname)){ //如果存在分页路由
      pathname = pathname.replace(pageExp, '/by/'+ obj.value + '$1$2$3$4');
    } else {
      pathname = pathname + 'by/'+ obj.value +'/';
    }

    //跳转
    location.href = pathname + location.search + location.hash;
  });


  //固定 bar
  util.fixbar({
    //bar1: '&#xe642;',
    click: function(type){
      if(type === 'bar1'){
        //location.href = '/jie/add/';
      }
    }
  });

  exports('store', {}); 
});