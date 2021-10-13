/** layer mobile demo */

!function(){

var demo = {};

//扫二维码
window.erweima && (erweima.onclick = function(){
  layer.open({
    type: 1,
    content: '<img src="./layer-mobile.png">'
  })
});

//小试牛刀
demo.trys = function(index){
  
  //信息框
  if(index === 0){
    layer.open({
      content: '移动版和PC版不能同时存在同一页面'
      ,btn: '我知道了'
    });
  } 
  
  //提示
  else if(index === 1){
    layer.open({
      content: 'hello layer'
      ,skin: 'msg'
      ,time: 2 //2秒后自动关闭
    });
  } 
  
  //询问框
  else if(index === 2){
    layer.open({
      content: '您确定要刷新一下本页面吗？'
      ,btn: ['刷新', '不要']
      ,yes: function(index){
        location.reload();
        layer.close(index);
      }
    });
  } 
  
  //底部对话框
  else if(index === 3){
    layer.open({
      content: '这是一个底部弹出的询问提示'
      ,btn: ['删除', '取消']
      ,skin: 'footer'
      ,yes: function(index){
        layer.open({content: '执行删除操作'})
      }
    });
  }
  
  //底部提示
  else if(index === 4){
    layer.open({
      content: '一个没有任何按钮的底部提示'
      ,skin: 'footer'
    });
  }
  
  //自定义标题风格
  else if(index === 5){
    layer.open({
      title: [
        '我是标题',
        'background-color: #FF4351; color:#fff;'
      ]
      ,content: '标题风格任你定义。'
    });
  }
  
  //页面层
  else if(index === 6){
    layer.open({
      type: 1
      ,content: '可传入任何内容，支持html。一般用于手机页面中'
      ,anim: 'up'
      ,style: 'position:fixed; bottom:0; left:0; width: 100%; height: 200px; padding:10px 0; border:none;'
    });
  }
  
  //loading层
  else if(index === 7){
    layer.open({type: 2});
  }
  
  //loading带文字
  else if(index === 8){
    layer.open({
      type: 2
      ,content: '加载中'
    });
  }
};

if(window.trys){
  var tryas = trys.getElementsByTagName('a');
  for(var i = 0, len = tryas.length; i < len; i++){
    (function(i){
      tryas[i].addEventListener('click', function(){
        demo.trys(i);
      });
    }(i));
  };
}


}();





