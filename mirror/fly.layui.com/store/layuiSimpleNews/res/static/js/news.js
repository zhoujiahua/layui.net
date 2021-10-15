/**
 
 @Name: layuiSimpleNews - 极简新闻资讯模板
 @Author: star1029
 @Copyright
 
 */


layui.define(['element', 'form', 'laypage', 'upload', 'carousel'], function(exports){
  var $ = layui.$
  ,element = layui.element
  ,form = layui.form
  ,laypage = layui.laypage
  ,carousel = layui.carousel;

  //头部——点击切换
  var headNav = $(".news-header").find(".header-nav")
  $(".news-header").find("#switch").on('click', function(){
    if(headNav.hasClass("close")){
      $(".news-header").children(".layui-container").height(60 + headNav.height());
      headNav.removeClass("close");
    }else{
      $(".news-header").children(".layui-container").height(50);
      headNav.addClass("close");
    };
  });

  //头部——搜索框
  $(".news-header").find(".header-search").children("input").on('keydown', function(e){
    if(e.keyCode === 13){
      e.preventDefault();       
      window.location.href = "search.html";
    };
  });
  //底部——微信、微博
  $(".news-footer").find("#wechat").hover(
    function(){ $(".news-footer").find("#code").fadeIn(); },
    function(){ $(".news-footer").find("#code").fadeOut(); }
  );
  $(".news-footer").find("#weibo").hover(
    function(){ $(".news-footer").find("#code").fadeIn(); },
    function(){ $(".news-footer").find("#code").fadeOut(); }
  );
  //初始化
  var scrChange = function(){
    var scr = $(document).scrollTop()
    ,height = document.body.offsetHeight - 140 + $(document).scrollTop();  
    if(document.body.clientWidth >= 751){
      $(".news-detail").find("#detail-handel").css("top", scr);
      $("#silde").css("top", height);
    }else{
      $(".news-detail").find("#detail-handel").css("top", 70);
      $("#silde").css("top", "auto");
    }
  }
  ,liAppend = function(){
    var navLi = $(".news-header").find(".header-nav").children(".more").find(".hida");
    if(document.body.clientWidth >= 751){
      $(".news-header").find(".header-nav").children("li").children(".hida").parent("li").remove();
    }else{
      if($(".news-header").find(".header-nav").children("li").children("a").hasClass("hida")){ }
      else{
        navLi.clone().appendTo( $(".news-header").find(".header-nav") ).wrap('<li class="layui-nav-item"></li>');
      }
    }
  };
  $(function(){
    scrChange();
    liAppend();
    $("#silde").children("#refresh").on('click', function(){
      window.location.reload();
    });
    $("#silde").children("#scroll").on('click', function(){
      $("html,body").animate({scrollTop: 0}, 500);
    });
    $(".news-user").find(".userCont").children(".layui-tab-content").find(".article").children("li").each(function(index){
       if(index%2 != 0){
        $(this).addClass("even");
       }
    });
  });
  //侧边栏固定
  $(window).resize(function(){   
    scrChange();
    liAppend();
  });
  window.onscroll = scrChange;
  //首页——轮播
  carousel.render({
    elem: '#newsIndex'
    ,width: '100%'
    ,height: '400px'
    ,arrow: 'none' 
  });
  //详情页——跳转评论
  $(".news-detail").find("#detail-handel").find(".review").on('click', function(){
    var height = $(".news-detail").find(".detail-comment").offset().top - 20;
    $('html,body').animate({scrollTop: height}, 800);
    $(".news-detail").find(".detail-comment").find("textarea").focus();
  });
  //详情页——关注
  $(".news-detail").find(".detail-side").find(".focusOn").on('click', function(){
    layer.msg('关注成功！');
    this.innerHTML = '已关注';
  });
  //详情页——喜欢
  $(".news-detail").find("#detail-handel").find(".collect").on('click', function(){
    $(this).find("i")[0].style.color = '#F66';
    layer.msg('已收藏！');
  });
  //详情页——回复点赞
  $(".news-detail").find("#replyCont").children("li").each(function(){
    $(this).find("span").filter(".goods").children("i").on('click', function(){
      this.style.color = '#fbac81';
      layer.msg('已点赞！');
    });
    $(this).find("a").filter(".reply").on('click', function(){
      var reply = $(this);
      reply.before('<div class="content"><textarea placeholder="写下您想说的评论吧..." class="layui-textarea"></textarea><div class="btn"><button class="layui-btn btn-revert">回复</button></div></div>')
      reply.parent(".readCom").find(".btn-revert").on('click', function(){
        $(this).parents(".content").remove();
        layer.msg('已回复！');
        reply.show();
      });
      reply.hide();
    });
  });
  //详情页——分页
  laypage.render({
    elem: 'detailPage'
    ,count: 50
    ,theme: '#627794'
    ,layout: ['page', 'next']
  });
  //搜索页——时间
  var pushDate = new Date()
  ,pushDateYear = pushDate.getFullYear()
  ,pushDateMon = pushDate.getMonth() + 1
  ,pushDateDay = pushDate.getDate()
  ,pushDateHour = pushDate.getHours()
  ,pushDateMin = pushDate.getMinutes()
  $(".news-search").find(".pushTime").html(pushDateYear + '-' + pushDateMon + '-' + pushDateDay + ' ' + pushDateHour + ':' + pushDateMin)
  //搜索页——关注
  $(".news-search").find(".userList").find(".focusOn").each(function(){
    $(this).on('click', function(){
      layer.msg('关注成功！');
      this.innerHTML = '已关注';
    });
  })
  //登录页——弹框
  $(".news-login").find("#getCode").on('click', function(){
    layer.msg('验证码已发送');
  });
  form.on('submit(newsLogin)', function(data){
    window.location.href = "user.html";
  });
  //个人中心——分页——评论
  laypage.render({
    elem: 'userComPage'
    ,count: 50
    ,theme: '#627794'
    ,layout: ['page', 'next']
  });
  //个人中心——分页——文章
  laypage.render({
    elem: 'userArtPage'
    ,count: 50
    ,theme: '#627794'
    ,layout: ['page', 'next']
  });
  //个人中心——发表新闻
  $(".news-user").find("#pushNews").on('click', function(){
    layer.open({
      type: 2
      ,title: '发布文章'
      ,area: ['720px', '660px']
      ,offset: '170px'
      ,shade: 0.7
      ,skin: 'news-pushCont'
      ,content: 'iframe.html'
      ,success: function(layero, index){
        window['layui-layer-iframe'+ index].layui.form.on('submit(publishNews)', function(data){
          layer.close(index);
        });  
      }
    });
  });
  //个人中心——删除文章
  var userArt =  $(".news-user").children(".userCont").children(".layui-tab-content").find(".article");
  $(".news-user").find("#upDel").on('click', function(){
    $(".news-user").find("#batchDel").toggle();
    $(".news-user").find("#cancelDel").toggle();
    userArt.children("li").each(function(){
      $(this).children(".layui-form-checkbox").toggle();
    });
  });
  $(".news-user").find("#cancelDel").on('click', function(){
    $(".news-user").find("#batchDel").toggle();
    $(".news-user").find("#cancelDel").toggle();
    userArt.children("li").each(function(){
      $(this).children("input")[0].checked = false;
      $(this).children(".layui-form-checkbox").hide();
    });
    form.render('checkbox');
  });
  $(".news-user").find("#batchDel").on('click', function(){
    userArt.children("li").each(function(){
      if($(this).children(".layui-form-checkbox").hasClass("layui-form-checked")){
        $(this).remove();
      }
    });
    userArt.children("li").each(function(index){
      $(this).removeClass("even");
      if(index%2 != 0){
        $(this).addClass("even");
      }
    });
  });
  exports('news', {}); 
})