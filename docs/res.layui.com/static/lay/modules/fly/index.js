
/*!
 * 社区主入口
 */


layui.define(['lay', 'layer', 'laytpl', 'form', 'element', 'upload', 'util'], function(exports){
  
  var $ = layui.jquery
  ,layer = layui.layer
  ,laytpl = layui.laytpl
  ,form = layui.form
  ,element = layui.element
  ,upload = layui.upload
  ,util = layui.util
  ,device = layui.device()

  ,DISABLED = 'layui-btn-disabled';
  
  //阻止IE7以下访问
  if(device.ie && device.ie < 10){
    layer.alert('如果您非得使用 IE 浏览器访问Fly社区，那么请使用 IE11');
  }

  //全局设置 form
  form.set({
    autocomplete: 'off' //全局禁用 autocomplete
  });

  form.render('input');
  

  //在焦点处插入内容
  layui.focusInsert = function(obj, str){
    var result, val = obj.value;
    obj.focus();
    if(document.selection){ //ie
      result = document.selection.createRange(); 
      document.selection.empty(); 
      result.text = str; 
    } else {
      result = [val.substring(0, obj.selectionStart), str, val.substr(obj.selectionEnd)];
      //obj.focus();
      obj.value = result.join('');
    }
  };


  //数字前置补零
  layui.laytpl.digit = function(num, length, end){
    var str = '';
    num = String(num);
    length = length || 2;
    for(var i = num.length; i < length; i++){
      str += '0';
    }
    return num < Math.pow(10, length) ? str + (num|0) : num;
  };

  var fly = {

    dir: layui.cache.dir + '../../../res.layui.com/static/lay/modules/fly/' //模块路径
    
    //Ajax
    ,json: function(url, data, success, options){
      var that = this, type = typeof data === 'function';
      
      if(type){
        options = success
        success = data;
        data = {};
      }

      options = options || {};

      return $.ajax({
        type: options.type || 'post',
        dataType: options.dataType || 'json',
        data: data,
        url: url,
        success: function(res){
          res.status = 'status' in res ? res.status : res.code;

          if(res.status === 0) {
            success && success(res);
          } else if(res.status === 2){ //未绑定手机号
            that.setPhoneNotice();
          } else if(res.status === 3){ //未激活邮箱
            that.setEmailNotice();
          } else {
            layer.msg(res.msg || res.code, {shift: 6});
            options.error && options.error(res);
          }
        }, error: function(e){
          layer.msg('请求异常，请重试', {shift: 6});
          options.error && options.error(e);
        }
      });
    }

    //计算字符长度
    ,charLen: function(val){
      var arr = val.split(''), len = 0;
      for(var i = 0; i <  val.length ; i++){
        arr[i].charCodeAt(0) < 299 ? len++ : len += 2;
      }
      return len;
    }
    
    ,form: {}

    //简易编辑器
    ,layEditor: function(options){
      var html = ['<div class="layui-unselect fly-edit">'
        ,'<span type="face" title="表情"><i class="iconfont icon-yxj-expression" style="top: 1px;"></i></span>'
        ,'<span type="picture" title="图片：img[src]"><i class="iconfont icon-tupian"></i></span>'
        ,'<span type="href" title="超链接格式：a(href)[text]"><i class="iconfont icon-lianjie"></i></span>'
        ,'<span type="quote" title="引用"><i class="iconfont icon-yinyong" style="top: 1px;"></i></span>'
        ,'<span type="code" title="插入代码" class="layui-hide-xs"><i class="iconfont icon-emwdaima" style="top: 1px;"></i></span>'
        ,'<span type="hr" title="水平线">hr</span>'
        ,'<span type="preview" title="预览"><i class="iconfont icon-yulan1"></i></span>'
      ,'</div>'].join('');

      var closeTips = function(){
        layer.close(mod.face.index);
      };

      var log = {}, mod = {
        face: function(editor, self){ //插入表情
          var str = '', ul, face = fly.faces;
          for(var key in face){
            str += '<li title="'+ key +'"><img src="'+ face[key] +'"></li>';
          }
          str = '<ul id="LAY-editface" class="layui-clear" style="margin: -10px 0 0 -1px;">'+ str +'</ul>';
          
          layer.close(mod.face.index);
          mod.face.index = layer.tips(str, self, {
            tips: 3
            ,time: 0
            ,skin: 'layui-edit-face'
            ,tipsMore: true
          });

          $(document).off('click', closeTips).on('click', closeTips);

          $('#LAY-editface li').on('click', function(){
            var title = $(this).attr('title') + ' ';
            layui.focusInsert(editor[0], 'face' + title);
            editor.trigger('keyup');
          });
        }
        ,picture: function(editor){ //插入图片
          layer.open({
            type: 1
            ,id: 'fly-jie-upload'
            ,title: '插入图片'
            ,area: 'auto'
            ,shade: false
            ,area: '465px'
            ,fixed: false
            ,offset: [
              editor.offset().top - $(window).scrollTop() + 'px'
              ,editor.offset().left + 'px'
            ]
            ,skin: 'layui-layer-border'
            ,content: ['<ul class="layui-form layui-form-pane" style="margin: 20px;">'
              ,'<li class="layui-form-item">'
                ,'<label class="layui-form-label">URL</label>'
                ,'<div class="layui-input-inline">'
                    ,'<input required name="image" placeholder="支持直接粘贴远程图片地址" value="" class="layui-input">'
                  ,'</div>'
                  ,'<button type="button" class="layui-btn layui-btn-primary" id="uploadImg"><i class="layui-icon">&#xe67c;</i>上传图片</button>'
              ,'</li>'
              ,'<li class="layui-form-item" style="text-align: center;">'
                ,'<button type="button" lay-submit lay-filter="uploadImages" class="layui-btn">确认</button>'
              ,'</li>'
            ,'</ul>'].join('')
            ,success: function(layero, index){
              var image =  layero.find('input[name="image"]');

              //执行上传实例
              upload.render({
                elem: '#uploadImg'
                ,url: '/api/upload/'
                ,size: 300000000
                ,done: function(res){
                  if(res.status == 0){
                    image.val(res.url);
                  } else {
                    layer.msg(res.msg, {icon: 5});
                  }
                }
              });
              
              form.on('submit(uploadImages)', function(data){
                var field = data.field;
                if(!field.image) return image.focus();
                layui.focusInsert(editor[0], 'img['+ field.image + '] ');
                layer.close(index);
                editor.trigger('keyup');
              });
            }
          });
        }
        ,href: function(editor){ //超链接
          layer.prompt({
            title: '请输入合法链接'
            ,shade: false
            ,fixed: false
            ,id: 'LAY_flyedit_href'
            ,offset: [
              editor.offset().top - $(window).scrollTop() + 1 + 'px'
              ,editor.offset().left + 1 + 'px'
            ]
          }, function(val, index, elem){
            if(!/^http(s*):\/\/[\S]/.test(val)){
              layer.tips('请务必 http 或 https 开头', elem, {tips:1})
              return;
            }
            layui.focusInsert(editor[0], ' a('+ val +')['+ val + '] ');
            layer.close(index);
            editor.trigger('keyup');
          });
        }
        ,quote: function(editor){ //引用
          layer.prompt({
            title: '请输入引用内容'
            ,formType: 2
            ,maxlength: 10000
            ,shade: false
            ,id: 'LAY_flyedit_quote'
            ,offset: [
              editor.offset().top - $(window).scrollTop() + 1 + 'px'
              ,editor.offset().left + 1 + 'px'
            ]
            ,area: ['300px', '100px']
          }, function(val, index, elem){
            layui.focusInsert(editor[0], '[quote]\n  '+ val + '\n[/quote]\n');
            layer.close(index);
            editor.trigger('keyup');
          });
        }
        ,code: function(editor){ //插入代码
          layer.prompt({
            title: '请贴入代码'
            ,formType: 2
            ,maxlength: 10000
            ,shade: false
            ,id: 'LAY_flyedit_code'
            ,area: ['800px', '360px']
          }, function(val, index, elem){
            layui.focusInsert(editor[0], '[pre]\n'+ val + '\n[/pre]\n');
            layer.close(index);
            editor.trigger('keyup');
          });
        }
        ,hr: function(editor){ //插入水平分割线
          layui.focusInsert(editor[0], '[hr]\n');
          editor.trigger('keyup');
        }
        ,preview: function(editor, span){ //预览
          var othis = $(span), getContent = function(){
            var content = editor.val();
            return /^\{html\}/.test(content) 
              ? content.replace(/^\{html\}/, '')
            : fly.content(content)
          }, isMobile = device.ios || device.android;

          if(mod.preview.isOpen) return layer.close(mod.preview.index);

          mod.preview.index = layer.open({
            type: 1
            ,title: '预览'
            ,shade: false
            ,offset: 'r'
            ,id: 'LAY_flyedit_preview'
            ,area: [
              isMobile ? '100%' : '775px'
              ,'100%'
            ]
            ,scrollbar: isMobile ? false : true
            ,anim: -1
            ,isOutAnim: false
            ,content: '<div class="detail-body layui-text" style="margin:20px;">'+ getContent() +'</div>'
            ,success: function(layero){
              editor.on('keyup', function(val){
                layero.find('.detail-body').html(getContent());
              });
              mod.preview.isOpen = true;
              othis.addClass('layui-this');
            }
            ,end: function(){
              delete mod.preview.isOpen;
              othis.removeClass('layui-this');
            }
          });
        }
      };
      
      layui.use('face', function(face){
        options = options || {};
        fly.faces = face;
        $(options.elem).each(function(index){
          var that = this, othis = $(that), parent = othis.parent();
          parent.prepend(html);
          parent.find('.fly-edit span').on('click', function(event){
            var type = $(this).attr('type');
            mod[type].call(that, othis, this);
            if(type === 'face'){
              event.stopPropagation()
            }
          });
        });
      });
      
    }

    ,escape: function(html){
      return String(html||'').replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&quot;');
    }

    //内容转义
    ,content: function(content){
      var util = fly
      ,item = fly.faces;

      //支持的html标签
      var html = function(end){
        return new RegExp('\\n*\\|\\-'+ (end||'') +'(div|span|p|button|table|thead|th|tbody|tr|td|ul|li|ol|li|dl|dt|dd|h2|h3|h4|h5)([\\s\\S]*?)\\-\\|\\n*', 'g');
      };


      //XSS
      content = util.escape(content||'')

      //转义图片
      .replace(/img\[([^\s]+?)\]/g, function(img){
        return '<img src="' + img.replace(/(^img\[)|(\]$)/g, '') + '">';
      })

      //转义@
      .replace(/@(\S+)(\s+?|$)/g, '@<a href="javascript:;" class="fly-aite">$1</a>$2')

      //转义表情
      .replace(/face\[([^\s\[\]]+?)\]/g, function(face){
        var alt = face.replace(/^face/g, '');
        return '<img alt="'+ alt +'" title="'+ alt +'" src="' + item[alt] + '">';
      })

      //转义脚本
      .replace(/a(\(javascript:)(.+)(;*\))/g, 'a(javascript:layer.msg(\'非法脚本\');)')

      //转义链接
      .replace(/a\([\s\S]+?\)\[[\s\S]*?\]/g, function(str){
        var href = (str.match(/a\(([\s\S]+?)\)\[/)||[])[1];
        var text = (str.match(/\)\[([\s\S]*?)\]/)||[])[1];
        if(!href) return str;
        var rel =  /^(http(s)*:\/\/)\b(?!(\w+\.)*(sentsin.com|layui.com))\b/.test(href.replace(/\s/g, ''));
        return '<a href="'+ href +'" target="_blank"'+ (rel ? ' rel="nofollow"' : '') +'>'+ (text||href) +'</a>';
      })

      //转义横线
      .replace(/\[hr\]\n*/g, '<hr>')

      //转义表格
      .replace(/\[table\]([\s\S]*)\[\/table\]\n*/g, function(str){
        return str.replace(/\[(thead|th|tbody|tr|td)\]\n*/g, '<$1>')
        .replace(/\n*\[\/(thead|th|tbody|tr|td)\]\n*/g, '</$1>')

        .replace(/\[table\]\n*/g, '<table class="layui-table">')
        .replace(/\n*\[\/table\]\n*/g, '</table>');
      })

      //转义 div/span
      .replace(/\n*\[(div|span)([\s\S]*?)\]([\s\S]*?)\[\/(div|span)\]\n*/g, function(str){ 
        return str.replace(/\[(div|span)([\s\S]*?)\]\n*/g, '<$1 $2>')
        .replace(/\n*\[\/(div|span)\]\n*/g, '</$1>');
      })

      //转义列表
      .replace(/\[ul\]([\s\S]*)\[\/ul\]\n*/g, function(str){ 
        return str.replace(/\[li\]\n*/g, '<li>')
        .replace(/\n*\[\/li\]\n*/g, '</li>')

        .replace(/\[ul\]\n*/g, '<ul>')
        .replace(/\n*\[\/ul\]\n*/g, '</ul>');
      })

      //转义代码
      .replace(/\[pre\]([\s\S]*)\[\/pre\]\n*/g, function(str){
        return str.replace(/\[pre\]\n*/g, '<pre>')
        .replace(/\n*\[\/pre\]\n*/g, '</pre>');
      })

      //转义引用
      .replace(/\[quote\]([\s\S]*)\[\/quote\]\n*/g, function(str){
        return str.replace(/\[quote\]\n*/g, '<div class="layui-elem-quote">')
        .replace(/\n*\[\/quote\]\n*/g, '</div>');
      })

      //转义换行
      .replace(/\n/g, '<br>')

      return content;
    }

    //发送验证码
    ,sendAuthCode: function(options){
      options = $.extend({
        seconds: 60
        ,elemPhone: $('#L_phone')
        ,elemVercode: $('#L_vercode')
        ,elemImagecode: $('#L_imagecode')
        ,elemImage: $('.fly-imagecode')
      }, options);

      var seconds = options.seconds
      ,btn = $(options.elem)
      ,token = null
      ,sendType = 'phone'
      ,timer, countDown = function(loop){
        seconds--;
        if(seconds < 0){
          btn.removeClass(DISABLED).html('获取验证码');
          seconds = options.seconds;
          clearInterval(timer);
        } else {
          btn.addClass(DISABLED).html(seconds + '秒后可重新获取');
        }

        if(!loop){
          timer = setInterval(function(){
            countDown(true);
          }, 1000);
        }
      };

      //发送渠道名称
      var getTypeName = function(type){
        return ({
          phone: '手机'
          ,email: '邮箱'
        })[type];
      };

      //校验手机或邮箱合法性
      var checkPhoneEmail = function(value, callback){
        var that = this
        ,fn = function(type){
          typeof callback === 'function' && callback(type);
        };

        if(/^1\d{10}$/.test(value)){
          return fn('phone');
        } else if(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value)){
          return fn('email');
        }

        return '请输入正确的'+ (options.elemPhone.parent().prev('label').text() || '值'); 
      };

      //点击获取验证码按钮
      btn.on('click', function(){
        var elemPhone = options.elemPhone
        ,value = elemPhone.val() //手机或邮箱
        ,elemImagecode = options.elemImagecode
        ,valueImage = elemImagecode.val();

        if(seconds !== options.seconds) return;

        //校验手机号和邮箱
        var phoneEmail = checkPhoneEmail(value, function(type){
          sendType = type;
        });
        if(phoneEmail){
          elemPhone.focus();
          return layer.msg(phoneEmail);
        };

        //校验图形验证码
        if(!valueImage){
          elemImagecode.focus();
          return layer.msg('请输入图形验证码');
        };

        //发送请求
        fly.json('/auth/code', {
          value: value
          ,imagecode: valueImage
        }, function(res){
          layer.msg('验证码已发送至您的'+ getTypeName(sendType) +'，请注意查收', {
            icon: 1
            ,shade: 0
          });

          options.elemImagecode.val('')
          options.elemVercode.focus();
          options.elemImage.trigger('click');

          countDown();
        });

      });
    }
    
    //新消息通知
    ,newmsg: function(){
      var elemNotice = $('#FLY-notice')
      ,url = layui.url();

      //如果已经在消息页面，则不请求
      if(url.pathname[0] === 'user' && url.pathname[1] === 'message'){
        //return;
      }

      if(layui.cache.user.uid !== -1 && elemNotice[0]){
        fly.json('/message/nums/', {
          _: new Date().getTime()
        }, function(res){
          if(res.status === 0 && res.count > 0){
            var msg = $('<a href="/user/message/" class="layui-badge fly-nav-msg">'+ res.count +'</a>');
            elemNotice.append(msg);

            msg.on('click', function(){
              var thisA = this;
              //标记所有消息为已读
              fly.json('/message/read/', {}, function(res){
                location.href = thisA.href;
              });
              return false;
            })
          }
        });
      }
      return arguments.callee;
    }
    
    //手机绑定弹窗
    ,setPhoneNotice: function(){
      layer.open({
        type: 1
        ,id: 'LAY_Notice_add'
        ,title: '手机号绑定通知'
        ,content: '<div class="layui-text" style="padding: 20px;">您需要绑定手机号后，才可进行发帖/回帖等操作。</div>'
        ,btnAlign: 'c'
        ,btn: ['立即绑定', '朕偏不！']
        ,yes: function(){
          location.href = '/user/set/'
        }
        ,btn2: function(){
          layer.msg('少年，我看好你！');
        }
      });
    }

    //邮箱激活提示
    ,setEmailNotice: function(){
      layer.open({
        type: 1
        ,id: 'LAY_Notice_add'
        ,title: '邮箱激活通知'
        ,content: '<div class="layui-text" style="padding: 20px;">您需要激活邮箱后，才可进行发帖/回帖等操作。</div>'
        ,btnAlign: 'c'
        ,btn: ['前往激活', '朕偏不！']
        ,yes: function(){
          location.href = '/user/set/'
        }
        ,btn2: function(){
          layer.msg('少年，我看好你！');
        }
      });
    }
  };

  //加载扩展模块
  layui.config({
    base: fly.dir
  }).extend({
    im: 'im'
    ,face: 'face'
  });



  //点击事件
  util.event('fly-active', {
    //发送系统消息
    sendMessage: function(othis){
      var parentElem = othis.parent()
      ,userInfo = JSON.parse(decodeURIComponent(parentElem.data('user')));

      layer.prompt({
        formType: 2
        ,title: '发送消息'
        ,shade: false
        ,id: 'fly-layer-user-sendMessage'
      }, function(value){
        fly.json('/message/send', {
          content: value
          ,uid: userInfo.id
        }, function(res){
          layer.msg('发送消息成功', {icon: 1, shade: 0.5, time: 1000}, function(){
            location.reload();
          });
        });
      });
    }

    //用户状态
    ,updateUserStatus: function(othis){
      var parentElem = othis.parent()
      ,userInfo = JSON.parse(decodeURIComponent(parentElem.data('user')));

      layer.open({
        type: 1
        ,id: 'fly-layer-user-update'
        ,title: '更改用户帐号状态'
        ,area: 'auto'
        ,maxWidth: 1000
        ,shade: false
        ,content: ['<ul class="layui-form layui-form-pane" style="margin: 20px;">'
          ,'<li class="layui-form-item">'
            ,'<label class="layui-form-label">昵称</label>'
            ,'<div class="layui-input-block">'
              ,'<input lay-verify="required"  name="username" value="'+ userInfo.username +'" class="layui-input">'
            ,'</div>'
          ,'</li>'
          ,'<li class="layui-form-item">'
            ,'<label class="layui-form-label">用户状态</label>'
            ,'<div class="layui-input-block" style="width: 200px;">'
              ,'<select name="auth">'
                ,'<option value="-1" '+ (userInfo.auth == -1 ? 'selected' : '') +'>锁定</option>'
                ,'<option value="0" '+ (userInfo.auth >= 0 ? 'selected' : '') +'>正常</option>'
              ,'<select>'
            ,'</div>'
          ,'</li>'
          ,'<li class="layui-form-item layui-form-text">'
            ,'<label class="layui-form-label">签名</label>'
            ,'<div class="layui-input-block">'
              ,'<textarea name="sign" autocomplete="off" class="layui-textarea" style="min-height: 100px;">'+ (userInfo.sign || '') +'</textarea>'
            ,'</div>'
          ,'</li>'
          ,'<li class="layui-form-item" style="text-align: center;">'
            ,'<button type="submit" lay-submit lay-filter="updateUserInfo" class="layui-btn">提交</button>'
          ,'</li>'
        ,'</ul>'].join('')
        ,success: function(layero){
          form.render().on('submit(updateUserInfo)', function(data){
            var field = data.field;
            field.id = userInfo.id;
            fly.json('/brain/updateUserInfo/', field, function(res){
              layer.msg(res.msg, {
                shade: 0.5,
                icon: 1
                ,time: 1000
              }, function(){
                location.reload();
              });
            });
          });
        }
      });
    }

  });


  var _body = $('body');



  //头像
  if(device.android || device.ios){
    $('#LAY_header_avatar').on('click', function(){
      return false;
    })
  }

  //刷新图形验证码
  $('body').on('click', '.fly-imagecode', function(){
    this.src = '/auth/imagecode?t='+ new Date().getTime();
  });

  //头条轮播
  if($('#FLY_topline')[0]){
    layui.use('carousel', function(){
      var carousel = layui.carousel;
      
      var ins = carousel.render({
        elem: '#FLY_topline'
        ,width: '100%'
        ,height: '172px'
        ,anim: 'fade'
      });

      var resizeTopline = function(){
        var width = $(this).prop('innerWidth');
        if(width >= 1200){
          ins.reload({
            height: '172px'
          });
        } else if(width >= 992){
          ins.reload({
            height: '141px'
          });
        } else if(width >= 768){
          ins.reload({
            height: '166px'
          });
        }
      };

      resizeTopline()

      $(window).on('resize', resizeTopline);

    });
  }

  //签到
  var tplSignin = ['{{# if(d.signed){ }}'
    ,'<button class="layui-btn layui-btn-disabled">今日已签到</button>'
    ,'<span>获得了<cite>{{ d.experience }}</cite>飞吻</span>'
  ,'{{# } else { }}'
    ,'<button class="layui-btn layui-btn-danger" id="LAY_signin">今日签到</button>'
    ,'<span>可获得<cite>{{ d.experience }}</cite>飞吻</span>'
  ,'{{# } }}'].join('')
  ,tplSigninDay = '已连续签到<cite>{{ d.days }}</cite>天'

  ,signRender = function(data){
    laytpl(tplSignin).render(data, function(html){
      elemSigninMain.html(html);
    });
    laytpl(tplSigninDay).render(data, function(html){
      elemSigninDays.html(html);
    });
  }

  ,elemSigninHelp = $('#LAY_signinHelp')
  ,elemSigninTop = $('#LAY_signinTop')
  ,elemSigninMain = $('.fly-signin-main')
  ,elemSigninDays = $('.fly-signin-days');
  
  if(elemSigninMain[0]){
    fly.json('/sign/status', function(res){
      if(!res.data) return;
      signRender.token = res.data.token;
      signRender(res.data);
    });
  }
  $('body').on('click', '#LAY_signin', function(){
    var othis = $(this);
    if(othis.hasClass(DISABLED)) return;

    fly.json('/sign/in', {
      token: signRender.token || 1
    }, function(res){
      signRender(res.data);
    }, {
      error: function(){
        othis.removeClass(DISABLED);
      }
    });

    othis.addClass(DISABLED);
  });

  //签到说明
  elemSigninHelp.on('click', function(){
    layer.open({
      type: 1
      ,title: '签到说明'
      ,area: '300px'
      ,shade: 0.8
      ,shadeClose: true
      ,content: ['<div class="layui-text" style="padding: 20px;">'
        ,'<blockquote class="layui-elem-quote">“签到”可获得社区飞吻，规则如下</blockquote>'
        ,'<table class="layui-table">'
          ,'<thead>'
            ,'<tr><th>连续签到天数</th><th>每天可获飞吻</th></tr>'
          ,'</thead>'
          ,'<tbody>'
            ,'<tr><td>＜5</td><td>5</td></tr>'
            ,'<tr><td>≥5</td><td>10</td></tr>'
            ,'<tr><td>≥15</td><td>15</td></tr>'
            ,'<tr><td>≥30</td><td>20</td></tr>'
            ,'<tr><td>≥100</td><td>30</td></tr>'
            ,'<tr><td>≥365</td><td>50</td></tr>'
          ,'</tbody>'
        ,'</table>'
        ,'<ul style="padding-top: 0; padding-bottom: 0;">'
          ,'<li>中间若有间隔，则连续天数重新计算</li>'
          ,'<li style="color: #FF5722;">不可利用程序自动签到，否则飞吻清零</li>'
        ,'</ul>'
      ,'</div>'].join('')
    });
  });

  //签到活跃榜
  var tplSigninTop = ['{{# layui.each(d.data, function(index, item){ }}'
    ,'<li>'
      ,'<a href="/u/{{item.uid}}" target="_blank">'
        ,'<img src="{{item.user.avatar}}">'
        ,'<cite class="fly-link">{{item.user.username}}</cite>'
      ,'</a>'
      ,'{{# var date = new Date(item.time); if(d.index < 2){ }}'
        ,'<span class="fly-grey">签到于 {{ layui.laytpl.digit(date.getHours()) + ":" + layui.laytpl.digit(date.getMinutes()) + ":" + layui.laytpl.digit(date.getSeconds()) }}</span>'
      ,'{{# } else { }}'
        ,'<span class="fly-grey">已连续签到 <i>{{ item.days }}</i> 天</span>'
      ,'{{# } }}'
    ,'</li>'
  ,'{{# }); }}'
  ,'{{# if(d.data.length === 0) { }}'
    ,'{{# if(d.index < 2) { }}'
      ,'<li class="fly-none fly-grey">今天还没有人签到</li>'
    ,'{{# } else { }}'
      ,'<li class="fly-none fly-grey">还没有签到记录</li>'
    ,'{{# } }}'
  ,'{{# } }}'].join('');

  elemSigninTop.on('click', function(){
    var loadIndex = layer.load(1, {shade: 0.8});
    fly.json('/top/signin/', function(res){
      var tpl = $(['<div class="layui-tab layui-tab-brief" style="margin: 5px 0 0;">'
        ,'<ul class="layui-tab-title">'
          ,'<li class="layui-this">最新签到</li>'
          ,'<li>今日最快</li>'
          ,'<li>总签到榜</li>'
        ,'</ul>'
        ,'<div class="layui-tab-content fly-signin-list" id="LAY_signin_list">'
          ,'<ul class="layui-tab-item layui-show"></ul>'
          ,'<ul class="layui-tab-item">2</ul>'
          ,'<ul class="layui-tab-item">3</ul>'
        ,'</div>'
      ,'</div>'].join(''))
      ,signinItems = tpl.find('.layui-tab-item');

      layer.close(loadIndex);

      layui.each(signinItems, function(index, item){
        var html = laytpl(tplSigninTop).render({
          data: res.data[index]
          ,index: index
        });
        $(item).html(html);
      });

      layer.open({
        type: 1
        ,title: '签到活跃榜 - TOP 20'
        ,area: '300px'
        ,shade: 0.8
        ,shadeClose: true
        ,id: 'layer-pop-signintop'
        ,content: tpl.prop('outerHTML')
      });

    });
  });


  //回帖榜
  var tplReply = ['{{# layui.each(d.data, function(index, item){ }}'
    ,'<dd>'
      ,'<a>'
        ,'<img src="{{item.user.avatar}}">'
        ,'<cite>{{item.user.username}}</cite>'
        ,'<i>{{item["count(*)"]}}次回答</i>'
      ,'</a>'
    ,'</dd>'
  ,'{{# }); }}'
  ,'{{# if(d.data.length === 0){ }}'
    ,'<dt class="fly-none" style="height: auto; font-size: 14px; min-height: 0;">没有相关数据</dt>'
  ,'{{# } }}'].join('')
  ,elemReply = $('#LAY_replyRank');

  if(elemReply[0]){
    fly.json('/top/reply/', {
      limit: 20
    }, function(res){
      var html = laytpl(tplReply).render(res);
      elemReply.find('dl').html(html);
    });
  };

  //技术客服
  var tplCustomerService = ['{{# layui.each(d.data, function(index, item){ }}'
    ,'<dd>'
      ,'<a href1="/u/{{item.uid}}">'
        ,'<img src="{{item.user.avatar}}">'
        ,'<i>{{item.user.username}}</i>'
      ,'</a>'
    ,'</dd>'
  ,'{{# }); }}'
  ,'{{# if(d.data.length === 0){ }}'
    ,'<dt class="fly-none" style="height: auto; font-size: 14px; min-height: 0;">没有相关数据</dt>'
  ,'{{# } }}'].join('')
  ,elemCustomerService = $('#LAY_customerService');

  if(elemCustomerService[0]){
    fly.json('/role/list/', {
      authProduct: elemCustomerService.data('product')
      ,authType: 'customerService'
    }, function(res){
      var html = laytpl(tplCustomerService).render(res);
      elemCustomerService.find('dl').html(html);
    });
  };

  //相册
  if($(window).width() > 750){
    layer.photos({
      photos: '.photos'
      ,zIndex: 9999999999
      ,anim: -1
    });
  } else {
    $('body').on('click', '.photos img', function(){
      window.open(this.src);
    });
  }

  //监听搜索引擎外部搜索
  var searchAll = function(form){
    $(form).submit(function(){
      var input = $(this).find('input[name="q"]')
      ,val = input.val();

      if(val.replace(/\s/g, '') === ''){
        return false;
      }

      input.val('site:layui.com '+ input.val());
    });
  };

  searchAll('.fly-search-form');


  //弹出搜索框
  $('.LAY_search').on('click', function(){
    layer.open({
      type: 1
      ,title: false
      ,closeBtn: false
      //,shade: [0.1, '#fff']
      ,shadeClose: true
      ,maxWidth: 10000
      ,skin: 'fly-layer-search'
      ,content: ['<form action="https://www2.bing.com/search">'
        ,'<input autocomplete="off" placeholder="搜索内容，回车跳转" type="text" name="q">'
      ,'</form>'].join('')
      ,success: function(layero){
        var input = layero.find('input');
        input.focus();
        searchAll(layero.find('form'));
      }
    })
  });


  //执行发送验证码
  fly.sendAuthCode({
    elem: '#FLY-getvercode'
  });
  

  //新消息通知
  fly.newmsg();

  //发送激活邮件
  fly.activate = function(email, secret){
    fly.json('/api/activate/', {
      secret: secret
    }, function(res){
      if(res.status === 0){
        layer.alert('已成功将激活链接发送到了您的邮箱。<br>接受可能会稍有延迟，请注意查收。', {
          icon: 1
        });
      };
    });
  };

  $('#LAY-activate').on('click', function(){
    var othis = $(this);
    fly.activate(othis.attr('email'), othis.attr('secret'));
  });

  //点击@
  $('body').on('click', '.fly-aite', function(){
    var othis = $(this), text = othis.text();
    if(othis.attr('href') !== 'javascript:;'){
      return;
    }
    text = text.replace(/^@|（[\s\S]+?）/g, '');
    othis.attr({
      href: '/jump?username='+ text
      ,target: '_blank'
    });
  });

  //表单提交
  fly.onFormSubmit = function(filter, callback){
    form.on('submit('+ (filter || '*') +')', function(data){
      var action = $(data.form).attr('action')
      ,method = $(data.form).attr('method')
      ,button = $(data.elem);
      fly.json(action, data.field, function(res){
        var end = function(){
          if(typeof callback === 'function') return callback(data, res);

          if(res.action){
            location.href = res.action;
          } else {
            fly.form[action||button.attr('key')](data.field, data.form, res);
          }
        };
        if(res.status == 0){
          button.attr('alert') ? layer.alert(res.msg, {
            icon: 1,
            time: 10*1000,
            end: end
          }) : end();
        };
      }, {
        type: (filter && method) ? method : 'post'
      });
      return false;
    });
  };

  fly.onFormSubmit();

  //加载特定模块
  if(layui.cache.page && layui.cache.page !== 'index'){
    var extend = {};
    extend[layui.cache.page] = layui.cache.page;
    layui.extend(extend);
    layui.use(layui.cache.page);
  }
  
  //加载IM
  if(!device.android && !device.ios){
    //layui.use('im');
  }

  //加载编辑器
  fly.layEditor({
    elem: '.fly-editor'
  });

  //手机设备的简单适配
  var treeMobile = $('.site-tree-mobile')
  ,shadeMobile = $('.site-mobile-shade')

  treeMobile.on('click', function(){
    $('body').addClass('site-mobile');
  });

  shadeMobile.on('click', function(){
    $('body').removeClass('site-mobile');
  });

  //获取统计数据
  $('.fly-handles').each(function(){
    var othis = $(this);
    $.get('/api/handle?alias='+ othis.data('alias'), function(res){
      othis.html('（下载量：'+ res.number +'）');
    })
  });

  //tips
  _body.on('mouseenter', '*[lay-tips]', function(){
    var that = this
    ,othis = $(that)
    ,options = lay.options(that);
    
    if(othis.parent().hasClass('layui-nav-item')) return;
    
    that.timer = setTimeout(function(){
      var tips = options.content || othis.attr('lay-tips')
      ,marginLeft = options.marginLeft
      ,direction = options.direction
      ,bgcolor = options.bgcolor || '#24262F'
      ,index = layer.tips(tips, that, {
        tips: [direction || 3, bgcolor]
        ,time: -1
        ,anim: 5
        ,success: function(layero, index){
          if(marginLeft){
            layero.css('margin-left', marginLeft + 'px');
          }
        }
      })
      othis.data('index', index);
    }, options.delay || 300);
  }).on('mouseleave', '*[lay-tips]', function(){
    layer.close($(this).data('index'));
    clearTimeout(this.timer);
    delete this.timer;
  });
  
  //固定Bar
  (function(){
    if($('#LAY_brain')[0]){
      return;
    }
    util.fixbar({
      
    });
  }())
  

  exports('fly', fly);

});

