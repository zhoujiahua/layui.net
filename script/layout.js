(function (window, ClipboardJS, layui) {
  console.log("Welcome to the layui mirror site.");
  console.log("Layui技术交流群：849254735");
  console.log("管理员邮箱：lance@88.com");
  console.log("管理员QQ：1151710686");
  layui.use(["layer"], function () {
    var layer = layui.layer;
    var clipboard = new ClipboardJS("#qqInfo");
    clipboard.on("success", function (e) {
      // console.info("Action:", e.action);
      // console.info("Text:", e.text);
      // console.info("Trigger:", e.trigger);
      e.clearSelection();
      layer.msg("复制群号成功：" + e.text, { icon: 1 });
    });

    clipboard.on("error", function (e) {
      // console.error("Action:", e.action);
      // console.error("Trigger:", e.trigger);
      layer.msg("复制群号错误，请尝试手动复制或者输入。", { icon: 2 });
    });
  });
})(window, ClipboardJS, layui);
