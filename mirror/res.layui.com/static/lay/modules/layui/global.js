
/*!
 * layui 官网
 */

layui.define(['code', 'element', 'table', 'util', 'carousel', 'laytpl'], function(exports){
  var $ = layui.jquery
  ,element = layui.element
  ,layer = layui.layer
  ,form = layui.form
  ,util = layui.util
  ,carousel = layui.carousel
  ,laytpl = layui.laytpl
  ,device = layui.device()

  ,$win = $(window), $body = $('body');

  //ban iframe
  ;!function(){self!==parent&&(location.href="//www.baidu.com/")}();


  //阻止 IE7 以下访问
  if(device.ie && device.ie < 8){
    layer.alert('Layui 最低支持 IE8，而您当前使用的是古老的 IE'+ device.ie + '，体验将会不佳！');
  }

  var home = {
    //获取高级浏览器
    getBrowser: function(){
      var ua = navigator.userAgent.toLocaleLowerCase()
      ,mimeType = function(option, value) {
        var mimeTypes = navigator.mimeTypes;
        for (var key in mimeTypes) {
          if (mimeTypes[key][option] && mimeTypes[key][option].indexOf(value) !== -1) {
            return true;
          }
        }
        return;
      };
      if(ua.match(/chrome/)){
        if(mimeType('type', '360') || mimeType('type', 'sogou')) return;
        if(ua.match(/edg\//)) return 'edge';
        return 'chrome'
      } else if(ua.match(/firefox/)){
        return 'firefox';
      }
      
      return;
    }
  };

  var elemHome = $('#LAY_home');
  var local = layui.data('layui');

  //初始弹窗
  layer.ready(function(){

    //升级提示
    if(local.version && local.version !== layui.v){
      layer.open({
        type: 1
        ,title: '更新提示' //不显示标题栏
        ,closeBtn: false
        ,area: '300px;'
        ,shade: false
        ,offset: 'b'
        ,id: 'LAY_updateNotice' //设定一个id，防止重复弹出
        ,btn: ['更新日志', '我知道了']
        ,btnAlign: 'c'
        ,moveType: 1 //拖拽模式，0或者1
        ,content: ['<div class="layui-text">'
          ,'layui 已发布新版本：：<strong style="padding-right: 10px; color: #fff;">v'+ layui.v + '</strong>'
        ,'</div>'].join('')
        ,skin: 'layui-layer-notice'
        ,yes: function(index){
          layer.close(index);
          setTimeout(function(){
            location.href = '/doc/base/changelog.html';
          }, 500);
        }
        ,end: function(){
          layui.data('layui', {
            key: 'version'
            ,value: layui.v
          });
        }
      });
    }
    layui.data('layui', {
      key: 'version'
      ,value: layui.v
    });
  });

  //头部搜索
  ;!function(){
    var elemComponentSelect = $(['<select lay-search lay-filter="component">'
      ,'<option value="">搜索组件模块</option>'
      ,'<option value="element/layout.html">grid 栅格布局</option>'
      ,'<option value="element/layout.html#admin">layout admin 布局</option>'
      ,'<option value="element/color.html">color 颜色</option>'
      ,'<option value="element/icon.html">iconfont 字体图标</option>'
      ,'<option value="base/element.html#css">font 字体大小 颜色</option>'
      ,'<option value="element/anim.html">animation 动画</option>'
      ,'<option value="element/button.html">button 按钮</option>'
      ,'<option value="element/form.html">form 表单组</option>'
      ,'<option value="element/form.html#input">input 输入框</option>'
      ,'<option value="element/form.html#select">select 下拉选择框</option>'
      ,'<option value="element/form.html#checkbox">checkbox 复选框</option>'
      ,'<option value="element/form.html#switch">switch 开关</option>'
      ,'<option value="element/form.html#radio">radio 单选框</option>'
      ,'<option value="element/form.html#textarea">textarea 文本域</option>'
      ,'<option value="element/nav.html">nav 导航菜单</option>'
      ,'<option value="element/menu.html">menu 基础通用菜单</option>'
      ,'<option value="element/nav.html#breadcrumb">breadcrumb 面包屑</option>'
      ,'<option value="element/tab.html">tabs 选项卡</option>'
      ,'<option value="element/progress.html">progress 进度条</option>'
      ,'<option value="element/panel.html">panel 面板 / card</option>'
      ,'<option value="element/collapse.html">collapse 折叠面板/手风琴</option>'
      ,'<option value="element/table.html">table 表格元素</option>'
      ,'<option value="element/badge.html">badge 徽章</option>'
      ,'<option value="element/timeline.html">timeline 时间线</option>'
      ,'<option value="element/auxiliar.html#blockquote">blockquote 引用块</option>'
      ,'<option value="element/auxiliar.html#fieldset">fieldset 字段集</option>'
      ,'<option value="element/auxiliar.html#hr">hr 分割线</option>'
      
      ,'<option value="modules/layer.html">layer 弹出层/弹窗综合</option>'
      ,'<option value="modules/laydate.html">laydate 日期时间选择器</option>'
      ,'<option value="modules/laypage.html">laypage 分页</option>'
      ,'<option value="modules/laytpl.html">laytpl 模板引擎</option>'
      ,'<option value="modules/table.html">table 数据表格</option>'
      ,'<option value="modules/form.html">form 表单模块</option>'
      ,'<option value="modules/upload.html">upload 文件/图片上传</option>'
      ,'<option value="modules/dropdown.html">dropdown 下拉菜单</option>'
      ,'<option value="modules/dropdown.html#contextmenu">contextmenu 右键菜单</option>'
      ,'<option value="modules/transfer.html">transfer 穿梭框</option>'
      ,'<option value="modules/tree.html">tree 树形菜单</option>'
      ,'<option value="modules/colorpicker.html">colorpicker 颜色选择器</option>'
      ,'<option value="modules/element.html">element 常用元素操作</option>'
      ,'<option value="modules/slider.html">slider 滑块</option>'
      ,'<option value="modules/rate.html">rate 评分</option>'
      ,'<option value="modules/carousel.html">carousel 轮播/跑马灯</option>'
      ,'<option value="modules/layedit.html">layedit 富文本编辑器</option>'
      ,'<option value="modules/flow.html">flow 信息流/图片懒加载</option>'
      ,'<option value="modules/util.html">util 工具集</option>'
      ,'<option value="modules/code.html">code 代码文本行修饰</option>'

      ,'<option value="/layim/">layim</option>'
      ,'<option value="/layuiadmin/">layuiadmin</option>'
    ,'</select>'
    ,'<i class="layui-icon layui-icon-search"></i>'].join(''));

    $('.component').append(elemComponentSelect);
    form.render('select', 'LAY-site-header-component');

    //搜索组件
    form.on('select(component)', function(data){
      var value = data.value;
      location.href = /^\//.test(value) ? value : ('../../www.layui.com/doc/'+ value);
    });
  }();

  //顶部轮播 TIPS
  var notice = function(options, elemParter){
    var local = layui.data('layui');

    options = options || {};

    if(device.mobile) return;

    //是否不显示 tips
    var keyName = 'notice_topnav_'+ options.key
    ,notParter = local[keyName] && new Date().getTime() - local[keyName] < (options.tipsInterval || 1000*60*30); //默认 30 分钟出现一次

    if(!options.tips) layer.close(layer.tipsIndex);

    if(!notParter && options.tips){
      var tipsIndex = layer.tipsIndex = layer.tips(
        ['<a href="'+ options.url +'" target="_blank" style="display: block; line-height: 30px; padding: 10px; text-align: center; font-size: 14px; background-image: linear-gradient(to right,#8510FF,#D025C2,#FF8B2D,#FF0036); color: #fff; '+ (options.tipsCss || '') +'">' 

          //阿里云经典：background-image: linear-gradient(to right,#8510FF,#D025C2,#FF8B2D,#FF0036);
          //阿里云活动：background-image: linear-gradient(to right,#8510FF,#D025C2,#F64E2C,#FF0036);
          
          //腾讯经典：background-image: linear-gradient(to right,#1242A4,#1746A1,#CFAE71,#1746A1);

          ,options.desc || ''
        ,'</a>'].join('')
        ,elemParter
        ,{
          tips: (options.tipsStyle ? new Function('return '+ options.tipsStyle)() : [3, '#9F17E9'])

          //阿里云经典：[3, '#9F17E9']
          //腾讯云经典：[3, '#1443A3'] //[3, '#803ED9'] 

          ,skin: 'layui-hide-xs'
          ,maxWidth: 320
          ,time: 0
          ,anim: 5
          ,tipeMore: true
          ,success: function(layero, index){
            layero.find('.layui-layer-content').css({
              'padding': 0
            });
            layero.find('a').on('click', function(){
              elemParter.trigger('click');
            });

            //隐藏小箭头
            var tipsG = layero.find('.layui-layer-TipsG');
            if(tipsG.css('left') !== '5px'){
              tipsG.hide();
            }

            //移动端样式
            if(elemParter.parent().css('display') === 'none'){
              layero.css({
                left: '50%'
                ,top: '80px'
                ,'margin-left': -(layero.width()/2)
              });
              tipsG.hide();
            }
          }
        }
      )
      //点击链接
      elemParter.on('click', function(){
        layui.data('layui', {
          key: keyName
          ,value: new Date().getTime()
        });
        layer.close(tipsIndex);
      });
    }

  };

  //头部轮播
  ;!function(){
    var noticeElem = $('.site-notice');
    if(device.mobile || !noticeElem[0]) return;

    (function(data){
      data = data || [];
      data = layui.sort(data, 'sort', true); //优先级排序

      var tpl = ['{{# if(d.length > 0){ }}'
      ,'<div class="layui-carousel" id="layui-spm-event-parter" lay-filter="site-top-carousel">'
        ,'<div carousel-item>'
          ,'{{# layui.each(d, function(index, v){ '
            ,'var tg = v.ad ? "tg" : "";'
            ,'var style = v.tipsCss || "";'
          ,'}}'
          ,'<div>'
            ,'<a href="{{ v.url }}" target="_blank" class="{{ tg }} tg-{{ v.key }}" data-tips="{{ v.tips }}">'
              ,'<cite style="{{ style }}">{{ v.title }} {{# if(v.hot){ }}<span class="layui-badge-dot" style="margin-top: -5px;"></span>{{# } }}</cite>'
            ,'</a>'
            ,'<style>'
              ,'{{# if(v.ad){ }} .site-notice a.tg-{{ v.key }} cite{padding-right:25px;} {{# } }}'
              ,'{{# if(v.ad){ }}.site-notice a.tg-{{ v.key }}:after{content:"{{ v.ad }}"} {{# } }}'
            ,'</style>'
          ,'</div>'
          ,'{{# }); }}'
        ,'</div>'
      ,'</div>'
      ,'{{# } }}'].join('');

      laytpl(tpl).render(data, function(html){
        var elem = '.site-notice .layui-carousel';
        noticeElem.html(html);

        //轮播实例
        carousel.render({
          elem: elem
          ,width: '100%' //设置容器宽度
          ,height: '100%'
          ,arrow: 'none' //始终显示箭头
          ,indicator: 'none' //指示器位置
          ,anim: 'fade' //切换动画方式
          ,interval: 5000 //自动切换的时间间隔
        });

        notice(data[0], $(elem).children('div').children('div').eq(0).find('a'));
        carousel.on('change(site-top-carousel)', function(obj){
          notice(data[obj.index], obj.item.find('a'));
        });

      });
    })([{"classname":"toptg","key":"toptg-notice","title":"layui 官网下线公告","url":"../www.layui.com/about/notice.html","CONFIG_TIME":"9/26/2021, 6:25:48 PM","tips":"","tipsCss":"background-image: linear-gradient(to right,#359FD4,#36B5C8,#25D8AB","hot":"1"}]);
  }();

  //头部动态导航
  ;!function(){
    var elemNavTop = $('#LAY_NAV_TOP')
    ,browser = home.getBrowser();

    if(!(browser === 'edge' || browser === 'chrome' || browser === 'firefox')) return;
    if(!elemNavTop[0]) return;

    (function(data){
      data = data || [];
      data = data[0] || {};

      var content = data.content;
      if(!content) return;

      elemNavTop.append(content);

      elemNavTop.find('.layui-nav-bar').remove();
      elemNavTop.find('.layui-nav-item').off('mouseenter').off('mouseleave')
      element.render('nav');
    })([{"classname":"toptg","key":"toptg-notice","title":"layui 官网下线公告","url":"../www.layui.com/about/notice.html","CONFIG_TIME":"9/26/2021, 6:25:48 PM","tips":"","tipsCss":"background-image: linear-gradient(to right,#359FD4,#36B5C8,#25D8AB","hot":"1"}]);
  }();

  //弹出公告
  ;!function(){
    (function(data){
      data = data || [];
      data = data[0] || {};
      
      var content = data.content;
      if(!content) return;

      var hasClickNotice = local.popup_notice && new Date().getTime() - local.popup_notice < (data.tipsInterval || 1000*60*60*24*3);

      if(hasClickNotice) return;

      setTimeout(function(){
        layer.open({
          type: 1
          ,title: data.title || '公告'
          ,area: device.mobile ? ['90%', '90%'] : ['800px', '520px']
          ,shade: false
          //,offset: 'b'
          ,id: 'LAY_Notice' //设定一个id，防止重复弹出
          ,skin: 'site-popup-notice'
          ,resize: false
          ,content: content
          ,success: function(layero, index){
            layero.find('a').on('click', function(){
              layer.close(index);
            });
          }
          ,end: function(){
            layui.data('layui', {
              key: 'popup_notice'
              ,value: new Date().getTime()
            });
          }
        });
      }, 500);

    })([{
      "classname": "popup",
      "key": "popup-notice",
      "title": "layui 重要公告",
      "url": "",
      "CONFIG_TIME": "9/26/2021, 6:26:53 PM",
      "content": "<style>\n.site-popup-notice{background-image: linear-gradient(to right,#359FD4,#36B5C8,#25D8AB); }\n.site-popup-notice .layui-layer-title{border-bottom-color: rgba(255,255,255,.1);}\n.site-popup-notice .site-content{color: #fff;}\n</style>\n\n<div class=\"site-content layui-text\" style=\"width: auto !important; min-height: auto; padding: 20px;\">\n<p>\n        所有对 layui 为之热爱、鞭策、奉献，和支持过的开发者：\n<br>请接受我用意念和字节传达的深深歉意。这是一个无力、无奈，甚至无助的决定：\n      </p>\n    \n      <blockquote class=\"layui-elem-quote layui-quote-nm\" style=\"border-color: rgba(255,255,255,.3);\">\n        <em style=\"font-style: normal; color: #fff !important;\">layui 官网将于 <strong>2021年10月13日</strong> 进行下线。</em>\n      </blockquote>\n      \n      <p>届时，包括新版下载、文档和示例在内的所有框架日常维护工作，将全部迁移到 Github 和 Gitee。\n      <br>此后，layui 仍会在代码托管平台所活跃，且 2.7 正式版也将在其间首发。而 layui 官网将不复存在。<br>这不是终结，只是重归到开源的纯粹中来。\n      </p>\n      \n      <p>再者，对于 layuiAdmin 和 layim 专区，将会迁移到新站进行保留，以便老用户还能下载使用，且此二者不再面向新用户。</p>\n      \n      <p>过去五年，layui 有幸被应用在不计其数的 Web 平台，在前端工程化迅速席来的浪潮中，我们仍然感受到一丝来自于 jQuery 的余晖，这是一种带有热量的冰冷（反之亦可）。使命已达，便纵有万般遗憾，更与何人说？！</p>\n      \n      <p>最后，请大家怀揣对 Web 前端技术的热忱，去拥抱 Vue.js、拥抱 Element UI、拥抱更好的新时代，\n      <br>以及，所有那些值得去追求的美好事物。</p>\n      \n      <p>—— 贤心</p>\n\n<div class=\"layui-btn-container\" style=\"margin-top: 15px; text-align: right;\">\n      <a href=\"https://gitee.com/sentsin/layui/issues\" target=\"_blank\" rel=\"nofollow\" class=\"layui-btn\" style=\"background: rgba(255,255,255,.3);\" >我有话说</a> \n    </div>\n</div>",
      "tipsCss": "background-image: linear-gradient(to right,#359FD4,#36B5C8,#25D8AB"
    }]);

  }();


  //点击事件
  var events = {
    //联系方式
    contactInfo: function(){
      layer.alert('<div class="layui-text">如有合作意向，可联系：<br>邮箱：xianxin@layui-inc.com</div>', {
        title:'联系'
        ,btn: false
        ,shadeClose: true
      });
    }
    //公众号
    ,weixinmp: function(){
      layer.photos({
        photos: {
          data: [{
            alt: 'layui 公众号'
            ,"src": "https://cdn.layui.com/upload/2017_8/168_1501890714998_68095.jpg" //原图地址
            ,"thumb": "https://cdn.layui.com/upload/2017_8/168_1501890714998_68095.jpg" //缩略图地址
          }]
        }
      })
    }
  };

  $body.on('click', '*[site-event]', function(){
    var othis = $(this)
    ,attrEvent = othis.attr('site-event');
    events[attrEvent] && events[attrEvent].call(this, othis);
  });


  //切换版本
  form.on('select(tabVersion)', function(data){
    var value = data.value;
    location.href = value === 'new' ? '/' : ('/' + value + '/doc/');
  });
  

  //首页 banner
  setTimeout(function(){
    $('.site-zfj').addClass('site-zfj-anim');
    setTimeout(function(){
      $('.site-desc').addClass('site-desc-anim')
    }, 5000)
  }, 100);


  //数字前置补零
  var digit = function(num, length, end){
    var str = '';
    num = String(num);
    length = length || 2;
    for(var i = num.length; i < length; i++){
      str += '0';
    }
    return num < Math.pow(10, length) ? str + (num|0) : num;
  };


  //下载倒计时
  var setCountdown = $('#setCountdown');
  if($('#setCountdown')[0]){
    $.get('/api/getTime', function(res){
      util.countdown(new Date(2017,7,21,8,30,0), new Date(res.time), function(date, serverTime, timer){
        var str = digit(date[1]) + ':' + digit(date[2]) + ':' + digit(date[3]);
        setCountdown.children('span').html(str);
      });
    },'jsonp');
  }


  //Adsense
  ;!function(){
    var len = $('.adsbygoogle').length;
    try {
      for(var i = 0; i < len; i++){
        (adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e){
      console.error(e)
    }
  }();
  


  //展示当前版本
  $('.site-showv').html(layui.v);

  //获取Github数据
  var getStars = $('#getStars');
  if(getStars[0]){
    var res = {"stargazers_count":'8.1k'}
      getStars.html(res.stargazers_count);
  }
  
  //首页操作
  (function(){
    var elemDowns = $('.site-showdowns');
    //获取下载数
    if(elemDowns[0]){
          var res = {"number":2356878,"title":"layui下载量"};
          elemDowns.html(res.number);
    }
    
    //记录下载
    $('.site-down').on('click',function(e){
      var othis = $(this)
      ,local = layui.data('layui')
      ,setHandle = function(){

      };
      if(!local.disclaimer){
        e.preventDefault();

        layer.confirm([
          '<div class="layui-text" style="padding: 10px 0;">'
          ,'请先阅读《<a href="/www.layui.com/about/disclaimer.html" target="_blank">layui 开源界面框架免责声明</a>》'
          ,'，再进行下载</div>'
        ].join(''), {
          title: '下载提示'
          ,btn: ['已阅读', '取消']
          ,maxWidth: 750
        }, function(index){
          layui.data('layui', {
            key: 'disclaimer'
            ,value: new Date().getTime()
          });
          layer.close(index);

          othis[0].click();
          setHandle();
        });
      } else {
        setHandle();
      }
    });
  })();
  
  
  //固定Bar
  util.fixbar({
    showHeight: 60
    ,css: function(){
      if(global.pageType === 'demo'){
        return {bottom: 75}
      }
    }()
  });
  
  //窗口scroll
  ;!function(){
    var main = $('.site-menu'), scroll = function(){
      var stop = $(window).scrollTop();

      if($(window).width() <= 992) return;
      var bottom = $('.footer').offset().top - $(window).height();

      if(stop > 60){ //211
        if(!main.hasClass('site-fix')){
          main.addClass('site-fix').css({
            width: main.parent().width()
          });
        }
      }else {     
        if(main.hasClass('site-fix')){
          main.removeClass('site-fix').css({
            width: 'auto'
          });
        }
      }
      stop = null;
    };
    scroll();
    $(window).on('scroll', scroll);
  }();

  //示例页面滚动
  $(window).on('scroll', function(){
    /*
    var elemDate = $('.layui-laydate,.layui-colorpicker-main')
    if(elemDate[0]){
      elemDate.each(function(){
        var othis = $(this);
        if(!othis.hasClass('layui-laydate-static')){
          othis.remove();
        }
      });
      $('input').blur();
    }
    */

    var elemTips = $('.layui-table-tips');
    if(elemTips[0]) elemTips.remove();

    if($('.layui-layer')[0]){
      layer.closeAll('tips');
    }
  });
  
  //代码修饰
  layui.code({
    elem: 'pre'
  });
  
  //目录
  var siteDir = $('.site-dir');
  if(siteDir[0] && $(window).width() > 750){
    layer.ready(function(){
      layer.open({
        type: 1
        ,content: siteDir
        ,skin: 'layui-layer-dir'
        ,area: 'auto'
        ,maxHeight: $(window).height() - 300
        ,title: '目录'
        ,closeBtn: false
        ,offset: 'r'
        ,shade: false
        ,success: function(layero, index){
          layer.style(index, {
            marginLeft: -15
          });
        }
      });
    });
    siteDir.find('li').on('click', function(){
      var othis = $(this);
      othis.find('a').addClass('layui-this');
      othis.siblings().find('a').removeClass('layui-this');
    });
  }

  //在textarea焦点处插入字符
  var focusInsert = function(str){
    var start = this.selectionStart
    ,end = this.selectionEnd
    ,offset = start + str.length

    this.value = this.value.substring(0, start) + str + this.value.substring(end);
    this.setSelectionRange(offset, offset);
  };

  //演示页面
  $('body').on('keydown', '#LAY_editor, .site-demo-text', function(e){
    var key = e.keyCode;
    if(key === 9 && window.getSelection){
      e.preventDefault();
      focusInsert.call(this, '  ');
    }
  });

  var editor = $('#LAY_editor')
  ,iframeElem = $('#LAY_demo')
  ,runCodes = function(){
    if(!iframeElem[0]) return;
    var html = editor.val();

    var iframeDocument = iframeElem.prop('contentWindow').document;
    iframeDocument.open();
    iframeDocument.write(html);
    iframeDocument.close();

  };
  $('#LAY_demo_run').on('click', runCodes), runCodes();

  //让导航在最佳位置
  var setScrollTop = function(thisItem, elemScroll){
    if(thisItem[0]){
      var itemTop = thisItem.offset().top
      ,winHeight = $(window).height();
      if(itemTop > winHeight - 160){
        elemScroll.animate({'scrollTop': itemTop - winHeight/2}, 200);
      }
    }
  }

  //让选中的菜单保持在可视范围内
  util.toVisibleArea({
    scrollElem: $('.layui-side-scroll').eq(0)
    ,thisElem: $('.site-demo-nav').find('dd.layui-this')
  });

  util.toVisibleArea({
    scrollElem: $('.layui-side-scroll').eq(1)
    ,thisElem: $('.site-demo-table-nav').find('li.layui-this')
  });
  


  //查看代码
  $(function(){
    var DemoCode = $('#LAY_democode');
    DemoCode.val([
      DemoCode.val()
      ,'<body>'
      ,global.preview
      ,'\n<script src="//res.layui.com/layui/dist/layui.js" charset="utf-8"></script>'
      ,'\n<!-- 注意：如果你直接复制所有代码到本地，上述 JS 路径需要改成你本地的 -->'
      ,$('#LAY_democodejs').html()
      ,'\n</body>\n</html>'
    ].join(''));
  });

  //点击查看代码选项
  element.on('tab(demoTitle)', function(obj){
    if(obj.index === 1){
      if(device.ie && device.ie < 9){
        layer.alert('强烈不推荐你通过ie8/9 查看代码！因为，所有的标签都会被格式成大写，且没有换行符，影响阅读');
      }
    }
  })


  //手机设备的简单适配
  var treeMobile = $('.site-tree-mobile')
  ,shadeMobile = $('.site-mobile-shade')

  treeMobile.on('click', function(){
    $('body').addClass('site-mobile');
  });

  shadeMobile.on('click', function(){
    $('body').removeClass('site-mobile');
  });



  //愚人节
  ;!function(){
    if(elemHome.data('date') === '4-1'){
      return
      if(local['20180401']) return;

      elemHome.addClass('site-out-up');
      setTimeout(function(){
        layer.photos({
          photos: {
            "data": [{
              "src": "//cdn.layui.com/upload/2018_4/168_1522515820513_397.png",
            }]
          }
          ,anim: 2
          ,shade: 1
          ,move: false
          ,end: function(){
            layer.msg('愚公，快醒醒！', {
              shade: 1
            }, function(){
              layui.data('layui', {
                key: '20180401'
                ,value: true
              });
            });
          }
          ,success: function(layero, index){
            elemHome.removeClass('site-out-up');

            layero.find('#layui-layer-photos').on('click', function(){
              layer.close(layero.attr('times'));
            }).find('.layui-layer-imgsee').remove();
          }
        });
      }, 1000*3);
    }
  }();

  //获取文档图标数据
  home.getIconData = function(){
    var $ = layui.$
    ,iconData = []
    ,iconListElem = $('.site-doc-icon li');

    iconListElem.each(function(){
      var othis = $(this);
      iconData.push({
        title: $.trim(othis.find('.doc-icon-name').text())
        ,fontclass: $.trim(othis.find('.doc-icon-fontclass').text())
        ,unicode: $.trim(othis.find('.doc-icon-code').html())
      });
    });
    
    $('.site-h1').html('<textarea style="width: 100%; height: 600px;">'+ JSON.stringify(iconData) + '</textarea>');
  };


  exports('global', home);
});