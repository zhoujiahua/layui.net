(function (window, ClipboardJS, layui) {
  console.log("Welcome to the layui mirror site.");
  console.log("Layui技术交流群：849254735");
  console.log("管理员邮箱：lance@88.com");
  console.log("管理员QQ：1151710686");
  layui.use(["layer", "form"], function () {
    var $ = layui.jquery;
    var form = layui.form;
    var layer = layui.layer;
    var clipboard = new ClipboardJS("#qqInfo");

    setLayuiThemeDark();
    form.on('switch(header-theme-mode)', function (event) {
      var isFormSwitch = $('.layui-form-switch').hasClass('layui-form-onswitch');
      setLayuiThemeDark(isFormSwitch);

    });

    function setLayuiThemeDark(isFormSwitch) {
      var themeId = $('#layuicss-theme-dark');
      if (isFormSwitch) {
        if (themeId) themeId.remove();
        createScriptElement();
      } else {
        themeId.remove();
      }
    }

    function createScriptElement() {
      var link = document.createElement('link');
      link.setAttribute('media', 'all');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('id', 'layuicss-theme-dark');
      link.setAttribute('href', '/static/dist/docs/2/css/layui-theme-dark.css');
      document.head.appendChild(link);
    }

    clipboard.on("success", function (e) {
      // console.info("Action:", e.action);
      // console.info("Text:", e.text);
      // console.info("Trigger:", e.trigger);
      e.clearSelection();
      layer.msg("复制群号成功：" + e.text, {icon: 1});
    });

    clipboard.on("error", function (e) {
      // console.error("Action:", e.action);
      // console.error("Trigger:", e.trigger);
      layer.msg("复制群号错误，请尝试手动复制或者输入。", {icon: 2});
    });
  });
})(window, ClipboardJS, layui);
